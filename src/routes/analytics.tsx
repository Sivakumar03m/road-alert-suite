import { createFileRoute } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SiteHeader, PageShell } from "@/components/site-header";
import {
  byTimeOfDay,
  weatherCorrelation,
  hazardousIntersections,
  severityDistribution,
  monthlyTrend,
} from "@/lib/saferoad-data";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Safety Analytics — SafeRoad AI" },
      {
        name: "description",
        content:
          "Charts covering accidents by time of day, weather correlation, hazardous intersections, severity mix and monthly safety trends.",
      },
      { property: "og:title", content: "Safety Analytics — SafeRoad AI" },
      { property: "og:description", content: "Visual road safety intelligence across time, weather and location." },
    ],
  }),
  component: Analytics,
});

const axis = { stroke: "var(--muted-foreground)", fontSize: 12 };
const tooltipStyle = {
  backgroundColor: "var(--popover)",
  border: "1px solid var(--border)",
  borderRadius: 8,
  color: "var(--popover-foreground)",
  fontSize: 12,
};
const sevColors = ["var(--risk-moderate)", "var(--risk-high)", "var(--risk-critical)"];

function Panel({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <h2 className="text-base font-semibold">{title}</h2>
      <p className="mb-4 text-xs text-muted-foreground">{subtitle}</p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {children as React.ReactElement}
        </ResponsiveContainer>
      </div>
    </section>
  );
}

function Analytics() {
  return (
    <>
      <SiteHeader />
      <PageShell
        title="Safety analytics"
        subtitle="Patterns behind the incident record — when, where and under what conditions crashes cluster."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <Panel title="Accidents by time of day" subtitle="Three-hour buckets, last 12 months">
            <BarChart data={byTimeOfDay}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="bucket" {...axis} />
              <YAxis {...axis} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--accent)" }} />
              <Bar dataKey="accidents" fill="var(--primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </Panel>

          <Panel title="Weather vs incidents" subtitle="Volume against average severity index">
            <BarChart data={weatherCorrelation}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="weather" {...axis} />
              <YAxis {...axis} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--accent)" }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="accidents" name="Incidents" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              <Bar
                dataKey="severityIndex"
                name="Severity index"
                fill="var(--risk-critical)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </Panel>

          <Panel title="Top hazardous intersections" subtitle="Recorded accidents per location">
            <BarChart data={hazardousIntersections} layout="vertical" margin={{ left: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
              <XAxis type="number" {...axis} />
              <YAxis type="category" dataKey="name" width={150} {...axis} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--accent)" }} />
              <Bar dataKey="accidents" fill="var(--risk-high)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </Panel>

          <Panel title="Collision severity distribution" subtitle="Share of all recorded incidents">
            <PieChart>
              <Pie
                data={severityDistribution}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={3}
              >
                {severityDistribution.map((_, idx) => (
                  <Cell key={idx} fill={sevColors[idx]} stroke="var(--card)" />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </Panel>

          <section className="rounded-xl border border-border bg-card p-5 lg:col-span-2">
            <h2 className="text-base font-semibold">Monthly safety trend</h2>
            <p className="mb-4 text-xs text-muted-foreground">Total incidents and fatalities per month</p>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="month" {...axis} />
                  <YAxis {...axis} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Line
                    type="monotone"
                    dataKey="accidents"
                    name="Incidents"
                    stroke="var(--primary)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="fatalities"
                    name="Fatalities"
                    stroke="var(--risk-critical)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>
      </PageShell>
    </>
  );
}
