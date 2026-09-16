import { createFileRoute } from "@tanstack/react-router";
import { Info } from "lucide-react";
import { SiteHeader, PageShell } from "@/components/site-header";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the Model — SafeRoad AI" },
      {
        name: "description",
        content:
          "How SafeRoad AI scores road accident risk: evaluation factors, weighting, system architecture and the limits of the model.",
      },
      { property: "og:title", content: "About the Model — SafeRoad AI" },
      { property: "og:description", content: "Risk scoring methodology, factors and architecture behind SafeRoad AI." },
    ],
  }),
  component: About,
});

const factors = [
  ["Segment history", "Past accident density, severity mix and corridor geometry set the baseline score."],
  ["Time & lighting", "Peak hours and unlit night windows carry the highest incremental weight."],
  ["Weather", "Rain, fog and storms raise both crash likelihood and expected severity."],
  ["Road surface", "Wet surfaces, potholes and active construction reduce grip and narrow usable width."],
  ["Traffic density", "Congestion drives rear-end and lane-change conflicts even at low speeds."],
];

const tiers = [
  ["Low", "0–44", "Normal caution. Standard following distance."],
  ["Moderate", "45–64", "Stay alert at merges and junctions; avoid distraction."],
  ["High", "65–79", "Reduce speed, widen headway, consider alternate timing."],
  ["Critical", "80–100", "Defer or reroute if the trip is not essential."],
];

function About() {
  return (
    <>
      <SiteHeader />
      <PageShell
        title="About SafeRoad AI"
        subtitle="A transparent, explainable risk-scoring layer over road corridor history and live conditions."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <section className="rounded-xl border border-border bg-card p-6 lg:col-span-2">
            <h2 className="text-lg font-semibold">The risk scoring model</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Each assessment starts from a corridor baseline derived from historical incident density, then adds
              weighted contributions from current conditions. The total is clamped to a 0–100 scale and mapped to a
              risk tier. Every contribution is shown separately so a score can always be traced back to the factors
              that produced it — no hidden black-box output.
            </p>
            <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Evaluation factors
            </h3>
            <dl className="mt-3 space-y-4">
              {factors.map(([k, v]) => (
                <div key={k}>
                  <dt className="text-sm font-medium">{k}</dt>
                  <dd className="text-sm text-muted-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <div className="space-y-6">
            <section className="rounded-xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold">Risk tiers</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {tiers.map(([name, range, note]) => (
                  <li key={name}>
                    <div className="flex items-center justify-between">
                      <span className="font-medium" style={{ color: `var(--risk-${name!.toLowerCase()})` }}>
                        {name}
                      </span>
                      <span className="tabular-nums text-muted-foreground">{range}</span>
                    </div>
                    <p className="text-muted-foreground">{note}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold">System architecture</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>Corridor registry with geometry, speed profile and incident history</li>
                <li>Condition inputs: time, lighting, weather, surface, traffic density</li>
                <li>Weighted scoring engine with per-factor attribution</li>
                <li>Presentation layer: dashboard, hazard map, history log and analytics</li>
              </ul>
            </section>
          </div>
        </div>

        <section className="mt-6 flex gap-3 rounded-xl border border-risk-moderate/30 bg-risk-moderate/10 p-5 text-sm">
          <Info className="mt-0.5 size-4 shrink-0 text-risk-moderate" />
          <p className="text-muted-foreground">
            <span className="font-semibold text-foreground">Educational decision-support disclaimer. </span>
            SafeRoad AI runs on representative sample data and a demonstrative scoring model. It is not an official
            traffic advisory and must not be used as the sole basis for travel, enforcement or emergency decisions.
            Always follow posted signage and instructions from traffic authorities.
          </p>
        </section>
      </PageShell>
    </>
  );
}
