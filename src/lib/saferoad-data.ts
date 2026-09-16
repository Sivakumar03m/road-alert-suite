export type RiskTier = "Low" | "Moderate" | "High" | "Critical";

export type Segment = {
  id: string;
  name: string;
  city: string;
  roadType: "Arterial" | "Highway" | "Flyover" | "Junction" | "Ring Road";
  lengthKm: number;
  riskScore: number;
  incidents30d: number;
  pastAccidents: number;
  avgSpeedKmph: number;
  factors: string[];
  lat: number;
  lng: number;
};

export const segments: Segment[] = [
  {
    id: "SEG-01",
    name: "Outer Ring Road — Marathahalli to Silk Board",
    city: "Bengaluru",
    roadType: "Ring Road",
    lengthKm: 11.4,
    riskScore: 88,
    incidents30d: 34,
    pastAccidents: 412,
    avgSpeedKmph: 24,
    factors: ["Peak-hour congestion", "Frequent lane weaving", "Poor merge visibility"],
    lat: 12.9352,
    lng: 77.6845,
  },
  {
    id: "SEG-02",
    name: "Hosur Road — Madiwala to Attibele",
    city: "Bengaluru",
    roadType: "Highway",
    lengthKm: 18.2,
    riskScore: 81,
    incidents30d: 27,
    pastAccidents: 366,
    avgSpeedKmph: 46,
    factors: ["High-speed differential", "Night-time visibility", "Heavy truck mix"],
    lat: 12.8452,
    lng: 77.6602,
  },
  {
    id: "SEG-03",
    name: "Electronic City Flyover",
    city: "Bengaluru",
    roadType: "Flyover",
    lengthKm: 9.6,
    riskScore: 74,
    incidents30d: 19,
    pastAccidents: 231,
    avgSpeedKmph: 58,
    factors: ["Over-speeding", "Sharp ramp curvature", "Rain-induced skid"],
    lat: 12.8452,
    lng: 77.6612,
  },
  {
    id: "SEG-04",
    name: "Bellary Road — Hebbal to Airport",
    city: "Bengaluru",
    roadType: "Highway",
    lengthKm: 21.8,
    riskScore: 66,
    incidents30d: 14,
    pastAccidents: 188,
    avgSpeedKmph: 71,
    factors: ["Fog pockets after midnight", "Long monotonous stretch"],
    lat: 13.0856,
    lng: 77.5911,
  },
  {
    id: "SEG-05",
    name: "Old Madras Road — Indiranagar to Hoskote",
    city: "Bengaluru",
    roadType: "Arterial",
    lengthKm: 16.1,
    riskScore: 59,
    incidents30d: 11,
    pastAccidents: 154,
    avgSpeedKmph: 38,
    factors: ["Unsignalled crossings", "Two-wheeler density"],
    lat: 12.9915,
    lng: 77.6822,
  },
  {
    id: "SEG-06",
    name: "Sarjapur Road — Iblur to Dommasandra",
    city: "Bengaluru",
    roadType: "Arterial",
    lengthKm: 13.5,
    riskScore: 52,
    incidents30d: 9,
    pastAccidents: 137,
    avgSpeedKmph: 29,
    factors: ["Construction diversions", "Narrow shoulders"],
    lat: 12.9081,
    lng: 77.6996,
  },
  {
    id: "SEG-07",
    name: "Nice Road — Kanakapura Junction",
    city: "Bengaluru",
    roadType: "Junction",
    lengthKm: 4.2,
    riskScore: 44,
    incidents30d: 6,
    pastAccidents: 92,
    avgSpeedKmph: 64,
    factors: ["Toll-plaza deceleration", "Wildlife crossing at dusk"],
    lat: 12.8887,
    lng: 77.5421,
  },
  {
    id: "SEG-08",
    name: "Tumkur Road — Yeshwantpur to Nelamangala",
    city: "Bengaluru",
    roadType: "Highway",
    lengthKm: 19.4,
    riskScore: 37,
    incidents30d: 4,
    pastAccidents: 78,
    avgSpeedKmph: 67,
    factors: ["Service-road merging", "Wet-surface aquaplaning"],
    lat: 13.0287,
    lng: 77.5219,
  },
];

export function tierFor(score: number): RiskTier {
  if (score >= 80) return "Critical";
  if (score >= 65) return "High";
  if (score >= 45) return "Moderate";
  return "Low";
}

export const tierClass: Record<RiskTier, string> = {
  Low: "bg-risk-low/15 text-risk-low border-risk-low/30",
  Moderate: "bg-risk-moderate/15 text-risk-moderate border-risk-moderate/30",
  High: "bg-risk-high/15 text-risk-high border-risk-high/30",
  Critical: "bg-risk-critical/15 text-risk-critical border-risk-critical/30",
};

export const tierHex: Record<RiskTier, string> = {
  Low: "var(--risk-low)",
  Moderate: "var(--risk-moderate)",
  High: "var(--risk-high)",
  Critical: "var(--risk-critical)",
};

/* ---------------- Alerts ---------------- */

export type Alert = {
  id: string;
  time: string;
  segment: string;
  message: string;
  level: RiskTier;
};

export const alerts: Alert[] = [
  {
    id: "ALR-2291",
    time: "08:42",
    segment: "Outer Ring Road",
    message: "Sudden congestion build-up detected near Kadubeesanahalli — rear-end collision risk elevated.",
    level: "Critical",
  },
  {
    id: "ALR-2288",
    time: "08:15",
    segment: "Hosur Road",
    message: "Wet surface reported after overnight rain; braking distance up ~35%.",
    level: "High",
  },
  {
    id: "ALR-2284",
    time: "07:58",
    segment: "Electronic City Flyover",
    message: "Average speed 22% above advisory limit on the down-ramp.",
    level: "High",
  },
  {
    id: "ALR-2279",
    time: "06:30",
    segment: "Bellary Road",
    message: "Low-visibility fog pocket cleared near Yelahanka. Advisory downgraded.",
    level: "Moderate",
  },
  {
    id: "ALR-2271",
    time: "05:10",
    segment: "Old Madras Road",
    message: "Street lighting outage restored between KR Puram and Hoskote.",
    level: "Low",
  },
];

export const recommendations = [
  {
    title: "Stagger commute on Outer Ring Road",
    body: "Risk peaks between 08:30–10:00. Shifting travel by 40 minutes lowers exposure by roughly a third.",
  },
  {
    title: "Increase headway on Hosur Road",
    body: "With wet surfaces and heavy truck mix, keep a four-second gap instead of the usual two.",
  },
  {
    title: "Respect ramp advisories on the Electronic City Flyover",
    body: "Most incidents here begin with entry-speed overshoot on curved ramps, not with traffic volume.",
  },
  {
    title: "Plan airport runs before midnight fog",
    body: "Bellary Road visibility drops sharply after 00:30. Leave earlier or add buffer time.",
  },
];

/* ---------------- Incident history ---------------- */

export type Severity = "Fatal" | "Serious" | "Minor";
export type Weather = "Clear" | "Rain" | "Fog" | "Storm";

export type Incident = {
  id: string;
  datetime: string;
  segment: string;
  cause: string;
  vehicles: number;
  severity: Severity;
  weather: Weather;
  status: "Closed" | "Under review" | "Investigating";
};

const causes = [
  "Over-speeding",
  "Sudden lane change",
  "Rear-end collision",
  "Wet-surface skid",
  "Signal violation",
  "Pedestrian crossing",
  "Fatigue / drowsiness",
  "Pothole swerve",
];
const statuses: Incident["status"][] = ["Closed", "Under review", "Investigating"];
const severities: Severity[] = ["Fatal", "Serious", "Minor"];
const weathers: Weather[] = ["Clear", "Rain", "Fog", "Storm"];

export const incidents: Incident[] = Array.from({ length: 64 }, (_, i) => {
  const seg = segments[(i * 3) % segments.length]!;
  const day = ((i * 5) % 28) + 1;
  const month = (i % 6) + 1;
  const hour = (i * 7) % 24;
  return {
    id: `INC-${(4820 - i).toString()}`,
    datetime: `2026-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")} ${String(hour).padStart(2, "0")}:${String((i * 13) % 60).padStart(2, "0")}`,
    segment: seg.name.split(" — ")[0]!,
    cause: causes[i % causes.length]!,
    vehicles: (i % 4) + 1,
    severity: severities[i % 3 === 0 ? (i % 9 === 0 ? 0 : 1) : 2]!,
    weather: weathers[i % weathers.length]!,
    status: statuses[i % statuses.length]!,
  };
});

/* ---------------- Analytics series ---------------- */

export const byTimeOfDay = [
  { bucket: "00–03", accidents: 41 },
  { bucket: "03–06", accidents: 28 },
  { bucket: "06–09", accidents: 96 },
  { bucket: "09–12", accidents: 63 },
  { bucket: "12–15", accidents: 54 },
  { bucket: "15–18", accidents: 88 },
  { bucket: "18–21", accidents: 119 },
  { bucket: "21–24", accidents: 72 },
];

export const weatherCorrelation = [
  { weather: "Clear", accidents: 214, severityIndex: 38 },
  { weather: "Rain", accidents: 167, severityIndex: 64 },
  { weather: "Fog", accidents: 92, severityIndex: 79 },
  { weather: "Storm", accidents: 48, severityIndex: 88 },
];

export const hazardousIntersections = [
  { name: "Silk Board Junction", accidents: 74 },
  { name: "Marathahalli Bridge", accidents: 61 },
  { name: "KR Puram Hanging Bridge", accidents: 55 },
  { name: "Hebbal Flyover Loop", accidents: 47 },
  { name: "Attibele Check Post", accidents: 39 },
];

export const severityDistribution = [
  { name: "Minor", value: 412 },
  { name: "Serious", value: 168 },
  { name: "Fatal", value: 41 },
];

export const monthlyTrend = [
  { month: "Jan", accidents: 118, fatalities: 9 },
  { month: "Feb", accidents: 104, fatalities: 7 },
  { month: "Mar", accidents: 121, fatalities: 11 },
  { month: "Apr", accidents: 97, fatalities: 6 },
  { month: "May", accidents: 88, fatalities: 5 },
  { month: "Jun", accidents: 133, fatalities: 12 },
  { month: "Jul", accidents: 142, fatalities: 13 },
  { month: "Aug", accidents: 126, fatalities: 8 },
];

/* ---------------- Risk model ---------------- */

export type PredictionInput = {
  segmentId: string;
  timeOfDay: string;
  weather: Weather;
  surface: "Dry" | "Wet" | "Potholes" | "Construction";
  traffic: number; // 0-100
};

export const timeOptions = [
  { value: "morning-peak", label: "Morning peak (07:00–10:00)", weight: 16 },
  { value: "midday", label: "Midday, daylight (10:00–16:00)", weight: 4 },
  { value: "evening-peak", label: "Evening peak (16:00–20:00)", weight: 19 },
  { value: "night-lit", label: "Night, well lit (20:00–23:00)", weight: 13 },
  { value: "night-unlit", label: "Night, poor lighting (23:00–05:00)", weight: 24 },
];

const weatherWeight: Record<Weather, number> = { Clear: 2, Rain: 14, Fog: 21, Storm: 26 };
const surfaceWeight: Record<PredictionInput["surface"], number> = {
  Dry: 1,
  Wet: 13,
  Potholes: 18,
  Construction: 22,
};

export type Contributor = { label: string; value: number };

export function predictRisk(input: PredictionInput): {
  score: number;
  tier: RiskTier;
  contributors: Contributor[];
  precautions: string[];
} {
  const seg = segments.find((s) => s.id === input.segmentId) ?? segments[0]!;
  const base = Math.round(seg.riskScore * 0.32);
  const time = timeOptions.find((t) => t.value === input.timeOfDay) ?? timeOptions[0]!;
  const traffic = Math.round((input.traffic / 100) * 18);
  const w = weatherWeight[input.weather];
  const s = surfaceWeight[input.surface];

  const raw = base + time.weight + w + s + traffic;
  const score = Math.max(4, Math.min(99, raw));
  const tier = tierFor(score);

  const contributors: Contributor[] = [
    { label: `Segment history — ${seg.name.split(" — ")[0]!}`, value: base },
    { label: `Time & lighting — ${time.label.split(" (")[0]!}`, value: time.weight },
    { label: `Weather — ${input.weather}`, value: w },
    { label: `Road surface — ${input.surface}`, value: s },
    { label: "Traffic density", value: traffic },
  ].sort((a, b) => b.value - a.value);

  const precautions: string[] = [];
  if (tier === "Critical" || tier === "High")
    precautions.push("Consider deferring the trip or choosing an alternate corridor if possible.");
  precautions.push(
    input.weather === "Clear"
      ? "Maintain a two-second following distance and avoid distraction at merges."
      : "Increase following distance to at least four seconds and switch on low-beam headlights.",
  );
  if (input.surface !== "Dry")
    precautions.push("Brake earlier and avoid sharp steering — grip is reduced on this surface.");
  if (input.traffic > 60)
    precautions.push("Expect stop-and-go waves; watch two vehicles ahead to anticipate braking.");
  if (input.timeOfDay === "night-unlit")
    precautions.push("Reduce speed by 15–20 km/h at night; reaction distance grows with low visibility.");
  precautions.push(`Historical hotspot note: ${seg.factors[0]!.toLowerCase()} is the leading factor here.`);
  return { score, tier, contributors, precautions };
}

export const kpis = {
  monitoredSegments: segments.length,
  highRiskCorridors: segments.filter((s) => s.riskScore >= 65).length,
  incidents30d: segments.reduce((a, s) => a + s.incidents30d, 0),
  activeAlerts: alerts.filter((a) => a.level === "High" || a.level === "Critical").length,
};
