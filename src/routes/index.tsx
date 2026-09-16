import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, Activity, Route as RouteIcon, Siren, ArrowRight, Lightbulb } from "lucide-react";
import { SiteHeader, RiskBadge } from "@/components/site-header";
import { segments, alerts, recommendations, kpis, tierFor } from "@/lib/saferoad-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SafeRoad AI — Live Road Accident Risk Dashboard" },
      {
        name: "description",
        content:
          "Monitor high-risk road corridors, live safety alerts and 30-day incident trends with the SafeRoad AI Road Sense Suite.",
      },
      { property: "og:title", content: "SafeRoad AI — Live Road Accident Risk Dashboard" },
      {
        property: "og:description",
        content: "Live corridor risk scores, alerts and safety recommendations for urban road networks.",
      },
    ],
  }),
  component: Dashboard,
});

function Stat({
  icon: Icon,
  label,
  value,
  note,
}: {
  icon: typeof Activity;
  label: string;
  value: string | number;
  note: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
        <Icon className="size-4 text-primary" />
      </div>
      <p className="mt-3 text-3xl font-bold tabular-nums">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{note}</p>
    </div>
  );
}

function Dashboard() {
  const ranked = [...segments].sort((a, b) => b.riskScore - a.riskScore);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Live risk overview</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Bengaluru arterial network · model refreshed every 5 minutes
            </p>
          </div>
          <Link
            to="/predict"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Run a risk assessment <ArrowRight className="size-4" />
          </Link>
        </div>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat icon={RouteIcon} label="Monitored segments" value={kpis.monitoredSegments} note="Across 5 corridors" />
          <Stat
            icon={AlertTriangle}
            label="High-risk corridors"
            value={kpis.highRiskCorridors}
            note="Score 65 and above"
          />
          <Stat icon={Activity} label="30-day incidents" value={kpis.incidents30d} note="All severities combined" />
          <Stat icon={Siren} label="Active alerts" value={kpis.activeAlerts} note="High or critical level" />
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <section className="rounded-xl border border-border bg-card lg:col-span-2">
            <header className="border-b border-border px-5 py-4">
              <h2 className="text-lg font-semibold">Prioritised high-risk corridors</h2>
              <p className="text-xs text-muted-foreground">Ranked by composite risk score</p>
            </header>
            <ul className="divide-y divide-border">
              {ranked.map((s) => {
                const tier = tierFor(s.riskScore);
                return (
                  <li key={s.id} className="px-5 py-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate font-medium">{s.name}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {s.roadType} · {s.lengthKm} km · {s.incidents30d} incidents in 30 days · avg{" "}
                          {s.avgSpeedKmph} km/h
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <RiskBadge tier={tier} />
                        <span className="w-9 text-right text-lg font-bold tabular-nums">{s.riskScore}</span>
                      </div>
                    </div>
                    <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${s.riskScore}%`,
                          backgroundColor: `var(--risk-${tier.toLowerCase()})`,
                        }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="rounded-xl border border-border bg-card">
            <header className="border-b border-border px-5 py-4">
              <h2 className="text-lg font-semibold">Real-time alert feed</h2>
              <p className="text-xs text-muted-foreground">Today · newest first</p>
            </header>
            <ul className="divide-y divide-border">
              {alerts.map((a) => (
                <li key={a.id} className="px-5 py-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs text-muted-foreground">
                      {a.time} · {a.id}
                    </span>
                    <RiskBadge tier={a.level} />
                  </div>
                  <p className="mt-2 text-sm font-medium">{a.segment}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{a.message}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-8">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Lightbulb className="size-4 text-primary" /> Contextual safety recommendations
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {recommendations.map((r) => (
              <article key={r.title} className="rounded-xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold">{r.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{r.body}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
