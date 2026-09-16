import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, ArrowUpDown } from "lucide-react";
import { SiteHeader, PageShell } from "@/components/site-header";
import { incidents, type Severity, type Weather } from "@/lib/saferoad-data";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "Accident History — SafeRoad AI" },
      {
        name: "description",
        content:
          "Searchable incident log with severity, weather and cause filters across monitored road segments.",
      },
      { property: "og:title", content: "Accident History — SafeRoad AI" },
      { property: "og:description", content: "Browse, filter and sort recorded road incidents by segment and severity." },
    ],
  }),
  component: History,
});

const sevClass: Record<Severity, string> = {
  Fatal: "border-risk-critical/30 bg-risk-critical/15 text-risk-critical",
  Serious: "border-risk-high/30 bg-risk-high/15 text-risk-high",
  Minor: "border-risk-moderate/30 bg-risk-moderate/15 text-risk-moderate",
};

function History() {
  const [q, setQ] = useState("");
  const [sev, setSev] = useState<"All" | Severity>("All");
  const [weather, setWeather] = useState<"All" | Weather>("All");
  const [asc, setAsc] = useState(false);

  const rows = useMemo(() => {
    const filtered = incidents.filter(
      (i) =>
        (sev === "All" || i.severity === sev) &&
        (weather === "All" || i.weather === weather) &&
        (q.trim() === "" ||
          [i.id, i.segment, i.cause].some((f) => f.toLowerCase().includes(q.trim().toLowerCase()))),
    );
    return filtered.sort((a, b) => (asc ? 1 : -1) * a.datetime.localeCompare(b.datetime));
  }, [q, sev, weather, asc]);

  return (
    <>
      <SiteHeader />
      <PageShell
        title="Accident history"
        subtitle="Recorded incidents across the monitored network, with cause, severity and investigation status."
      >
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-60 flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by incident ID, segment or cause"
              className="w-full rounded-md border border-input bg-secondary py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <select
            className="rounded-md border border-input bg-secondary px-3 py-2 text-sm"
            value={sev}
            onChange={(e) => setSev(e.target.value as "All" | Severity)}
          >
            {["All", "Fatal", "Serious", "Minor"].map((s) => (
              <option key={s} value={s}>
                {s === "All" ? "All severities" : s}
              </option>
            ))}
          </select>
          <select
            className="rounded-md border border-input bg-secondary px-3 py-2 text-sm"
            value={weather}
            onChange={(e) => setWeather(e.target.value as "All" | Weather)}
          >
            {["All", "Clear", "Rain", "Fog", "Storm"].map((w) => (
              <option key={w} value={w}>
                {w === "All" ? "All weather" : w}
              </option>
            ))}
          </select>
          <button
            onClick={() => setAsc((v) => !v)}
            className="inline-flex items-center gap-2 rounded-md border border-input bg-secondary px-3 py-2 text-sm"
          >
            <ArrowUpDown className="size-4" /> {asc ? "Oldest first" : "Newest first"}
          </button>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">{rows.length} incidents shown</p>

        <div className="mt-3 overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full min-w-200 text-sm">
            <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                {["Incident", "Date & time", "Segment", "Primary cause", "Vehicles", "Weather", "Severity", "Status"].map(
                  (h) => (
                    <th key={h} className="px-4 py-3 font-medium">
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((i) => (
                <tr key={i.id} className="hover:bg-accent/40">
                  <td className="px-4 py-3 font-mono text-xs">{i.id}</td>
                  <td className="whitespace-nowrap px-4 py-3 tabular-nums text-muted-foreground">{i.datetime}</td>
                  <td className="px-4 py-3">{i.segment}</td>
                  <td className="px-4 py-3 text-muted-foreground">{i.cause}</td>
                  <td className="px-4 py-3 tabular-nums">{i.vehicles}</td>
                  <td className="px-4 py-3 text-muted-foreground">{i.weather}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold ${sevClass[i.severity]}`}
                    >
                      {i.severity}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{i.status}</td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-muted-foreground">
                    No incidents match these filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </PageShell>
    </>
  );
}
