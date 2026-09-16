# Road Sense AI

Build SafeRoad AI (Road Sense Suite), an intelligent road accident risk monitoring and safety analytics web application.

Key features and routes to implement:
1. Navigation & Header: Professional safety intelligence layout with logo, nav links (Dashboard, Risk Prediction, Risk Map, Accident History, Analytics, About), live status indicator, and safety disclaimer note.
2. Dashboard (/): Live risk overview with KPI stat cards (Monitored Segments, High-Risk Corridors, 30-day Incident Count, Active Alerts), a prioritized list of high-risk corridors with severity badges, real-time alert feed, and contextual road safety recommendations based on sample corridor data (e.g., Bengaluru arterial roads like Outer Ring Road, Hosur Road, Electronic City Flyover, Bellary Road, Old Madras Road).
3. Risk Prediction (/predict): Interactive predictive assessment calculator. Users input parameters: Road Segment, Time of Day/Lighting, Weather Conditions (Clear, Rain, Fog, Storm), Road Surface (Dry, Wet, Potholes, Construction), and Traffic Density. Returns a dynamic risk score (0-100), risk tier (Low, Moderate, High, Critical), key risk contributor breakdown, and actionable precautions.
4. Risk Map (/map): Interactive map view showing monitored corridors and hazard hotspots color-coded by danger level (green, amber, red). Clicking markers displays segment telemetry, past accident count, and risk factors. Includes filters for risk level and road type.
5. Accident History (/history): Comprehensive incident log table with search, severity filters (Fatal, Serious, Minor), weather filters, and sorting. Shows incident ID, date/time, segment, primary cause, vehicles involved, and status.
6. Analytics (/analytics): Visual safety intelligence charts (accidents by time of day, weather vs incident correlation, top hazardous intersections, collision severity distribution, and monthly safety trends).
7. About (/about): Explains the risk scoring model, evaluation factors, system architecture, and educational decision-support disclaimer.

Design with a modern, high-contrast dashboard aesthetic (dark mode compatible), crisp typography, clean status badges, and realistic sample data.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://road-alert-suite.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/743d31af-01ac-4874-b9df-4aa3d36d0805).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
