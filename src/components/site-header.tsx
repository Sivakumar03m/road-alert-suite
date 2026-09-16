import { Link } from "@tanstack/react-router";
import { ShieldAlert, Radio } from "lucide-react";

const nav = [
  { to: "/", label: "Dashboard" },
  { to: "/predict", label: "Risk Prediction" },
  { to: "/map", label: "Risk Map" },
  { to: "/history", label: "Accident History" },
  { to: "/analytics", label: "Analytics" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-md bg-primary/15 text-primary">
            <ShieldAlert className="size-5" />
          </span>
          <span className="leading-tight">
            <span className="block text-base font-bold tracking-tight">SafeRoad AI</span>
            <span className="block text-[11px] uppercase tracking-widest text-muted-foreground">
              Road Sense Suite
            </span>
          </span>
        </Link>

        <nav className="order-3 flex w-full flex-wrap items-center gap-1 md:order-2 md:w-auto md:flex-1">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              activeProps={{ className: "bg-accent text-foreground font-medium" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="order-2 ml-auto flex items-center gap-2 rounded-full border border-risk-low/30 bg-risk-low/10 px-3 py-1 text-xs font-medium text-risk-low md:order-3">
          <Radio className="size-3.5 animate-pulse" />
          Live monitoring active
        </div>
      </div>
      <p className="border-t border-border bg-secondary/40 px-4 py-1.5 text-center text-[11px] text-muted-foreground">
        Educational decision-support only — risk scores are modelled estimates, not official traffic advisories.
      </p>
    </header>
  );
}

export function PageShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h1>
      <p className="mt-1 max-w-3xl text-sm text-muted-foreground">{subtitle}</p>
      <div className="mt-8">{children}</div>
    </main>
  );
}

export function RiskBadge({ tier }: { tier: "Low" | "Moderate" | "High" | "Critical" }) {
  const map = {
    Low: "border-risk-low/30 bg-risk-low/15 text-risk-low",
    Moderate: "border-risk-moderate/30 bg-risk-moderate/15 text-risk-moderate",
    High: "border-risk-high/30 bg-risk-high/15 text-risk-high",
    Critical: "border-risk-critical/30 bg-risk-critical/15 text-risk-critical",
  } as const;
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${map[tier]}`}
    >
      {tier}
    </span>
  );
}
