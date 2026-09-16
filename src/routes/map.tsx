import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MapPin } from "lucide-react";
import { SiteHeader, PageShell, RiskBadge } from "@/components/site-header";
import { segments, tierFor, type RiskTier } from "@/lib/saferoad-data";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Risk Map — SafeRoad AI" },
      {
        name: "description",
        content:
          "Explore monitored road corridors and hazard hotspots colour-coded by danger level, with telemetry and risk factors per segment.",
      },
      { property: "og:title", content: "Risk Map — SafeRoad AI" },
      { property: "og:description", content: "Interactive corridor hazard map with risk and road-type filters." },
    ],
  }),
  component: RiskMap;
});

const LAT = [12.8, 13.12] as const;
const LNG = [77.5, 77.72] as const;

function RiskMap() {
  const [riskFilter, setRiskFilter] = useState<"All" | RiskTier>("All");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [selectedId, setSelectedId] = useState<string>("SEG-01");

  const types = useMemo(() => ["All", ...new Set(segments.map((s) => s.roadType))], []);
  const visible = segments.filter(
    (s) =>
      (riskFilter === "All" || tierFor(s.riskScore) === riskFilter) &&
      (typeFilter === "All" || s.roadType === typeFilter),
  );
  const selected = segments.find((s) => s.id === selectedId) ?? visible[0] ?? segments[0]!;

  const pos = (lat: number, lng: number) => ({
    left: `${((lng - LNG[0]) / (LNG[1] - LNG[0])) * 100}%`,
    top: `${(1 - (lat - LAT[0]) / (LAT[1] - LAT[0])) * 100}%`,
  });

  return (
    <>
      <SiteHeader />
      <PageShell
        title="Corridor risk map"
        subtitle="Hazard hotspots across the monitored network. Select a marker to inspect segment telemetry."
      >
        <div className="flex flex-wrap gap-3">
          <label className="text-sm">
            <span className="mr-2 text-muted-foreground">Risk level</span>
            <select
              className="rounded-md border border-input bg-secondary px-3 py-1.5 text-sm"
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value as "All" | RiskTier)}
            >
              {["All", "Low", "Moderate", "High", "Critical"].map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm">
            <span className="mr-2 text-muted-foreground">Road type</span>
            <select
              className="rounded-md border border-input bg-secondary px-3 py-1.5 text-sm"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              {types.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <div className="ml-auto flex items-center gap-4 text-xs text-muted-foreground">
            {(["Low", "Moderate", "High", "Critical"] as RiskTier[]).map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <span
                  className="size-2.5 rounded-full"
                  style={{ backgroundColor: `var(--risk-${t.toLowerCase()})` }}
                />
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-secondary/40 lg:col-span-2">
            <svg className="absolute inset-0 size-full opacity-40" aria-hidden>
              <defs>
                <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
                  <path d="M48 0H0V48" fill="none" stroke="var(--border)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              <path
                d="M8% 70% Q 40% 40%, 92% 24%"
                fill="none"
                stroke="var(--muted-foreground)"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
            </svg>
            {visible.map((s) => {
              const tier = tierFor(s.riskScore);
              const active = s.id === selected.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setSelectedId(s.id)}
                  style={pos(s.lat, s.lng)}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  aria-label={s.name}
                >
                  <span
                    className={`block rounded-full ${active ? "size-6 ring-4 ring-primary/40" : "size-4"} transition-all`}
                    style={{ backgroundColor: `var(--risk-${tier.toLowerCase()})` }}
                  />
                </button>
              );
            })}
            {visible.length === 0 && (
              <p className="absolute inset-0 grid place-items-center text-sm text-muted-foreground">
                No corridors match these filters.
              </p>
            )}
          </div>

          <aside className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-start justify-between gap-3">
              <h2 className="flex items-start gap-2 text-base font-semibold">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                {selected.name}
              </h2>
              <RiskBadge tier={tierFor(selected.riskScore)} />
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
              {[
                ["Risk score", String(selected.riskScore)],
                ["Road type", selected.roadType],
                ["Length", `${selected.lengthKm} km`],
                ["Avg speed", `${selected.avgSpeedKmph} km/h`],
                ["Incidents (30d)", String(selected.incidents30d)],
                ["Past accidents", String(selected.pastAccidents)],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">{k}</dt>
                  <dd className="mt-0.5 font-semibold tabular-nums">{v}</dd>
                </div>
              ))}
            </dl>
            <h3 className="mt-6 text-sm font-semibold">Risk factors</h3>
            <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
              {selected.factors.map((f) => (
                <li key={f} className="flex gap-2">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  {f}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </PageShell>
    </>
  );
}
