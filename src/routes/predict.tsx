import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { SiteHeader, PageShell, RiskBadge } from "@/components/site-header";
import { segments, timeOptions, predictRisk, type Weather, type PredictionInput } from "@/lib/saferoad-data";

export const Route = createFileRoute("/predict")({
  head: () => ({
    meta: [
      { title: "Risk Prediction — SafeRoad AI" },
      {
        name: "description",
        content:
          "Estimate road accident risk from segment, lighting, weather, surface condition and traffic density with an explainable scoring model.",
      },
      { property: "og:title", content: "Risk Prediction — SafeRoad AI" },
      {
        property: "og:description",
        content: "Interactive accident risk calculator with contributor breakdown and precautions.",
      },
    ],
  }),
  component: Predict,
});

const fieldClass =
  "mt-1.5 w-full rounded-md border border-input bg-secondary px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring";

function Predict() {
  const [input, setInput] = useState<PredictionInput>({
    segmentId: "SEG-01",
    timeOfDay: "evening-peak",
    weather: "Clear",
    surface: "Dry",
    traffic: 65,
  });

  const result = useMemo(() => predictRisk(input), [input]);
  const max = result.contributors[0]?.value ?? 1;

  return (
    <>
      <SiteHeader />
      <PageShell
        title="Predictive risk assessment"
        subtitle="Combine corridor history with live conditions to estimate accident likelihood before you travel."
      >
        <div className="grid gap-6 lg:grid-cols-5">
          <section className="rounded-xl border border-border bg-card p-6 lg:col-span-2">
            <h2 className="text-lg font-semibold">Trip parameters</h2>
            <div className="mt-5 space-y-5">
              <label className="block text-sm font-medium">
                Road segment
                <select
                  className={fieldClass}
                  value={input.segmentId}
                  onChange={(e) => setInput({ ...input, segmentId: e.target.value })}
                >
                  {segments.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-sm font-medium">
                Time of day / lighting
                <select
                  className={fieldClass}
                  value={input.timeOfDay}
                  onChange={(e) => setInput({ ...input, timeOfDay: e.target.value })}
                >
                  {timeOptions.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-sm font-medium">
                Weather conditions
                <select
                  className={fieldClass}
                  value={input.weather}
                  onChange={(e) => setInput({ ...input, weather: e.target.value as Weather })}
                >
                  {["Clear", "Rain", "Fog", "Storm"].map((w) => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-sm font-medium">
                Road surface
                <select
                  className={fieldClass}
                  value={input.surface}
                  onChange={(e) =>
                    setInput({ ...input, surface: e.target.value as PredictionInput["surface"] })
                  }
                >
                  {["Dry", "Wet", "Potholes", "Construction"].map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-sm font-medium">
                <span className="flex items-center justify-between">
                  Traffic density
                  <span className="tabular-nums text-muted-foreground">{input.traffic}%</span>
                </span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={input.traffic}
                  onChange={(e) => setInput({ ...input, traffic: Number(e.target.value) })}
                  className="mt-3 w-full accent-[var(--primary)]"
                />
              </label>
            </div>
          </section>

          <section className="space-y-6 lg:col-span-3">
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Predicted risk score</p>
                  <p className="mt-1 text-6xl font-bold tabular-nums">{result.score}</p>
                  <p className="text-xs text-muted-foreground">out of 100</p>
                </div>
                <RiskBadge tier={result.tier} />
              </div>
              <div className="mt-5 h-2.5 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${result.score}%`,
                    backgroundColor: `var(--risk-${result.tier.toLowerCase()})`,
                  }}
                />
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold">Key risk contributors</h2>
              <ul className="mt-4 space-y-3">
                {result.contributors.map((c) => (
                  <li key={c.label}>
                    <div className="flex items-center justify-between text-sm">
                      <span>{c.label}</span>
                      <span className="tabular-nums text-muted-foreground">+{c.value}</span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${Math.round((c.value / max) * 100)}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <ShieldCheck className="size-4 text-primary" /> Recommended precautions
              </h2>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {result.precautions.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </PageShell>
    </>
  );
}
