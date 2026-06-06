export interface TelemetryEvent {
  id: string;
  timestamp: string;
  message: string;
  level: "info" | "debug" | "warn" | "success";
  system?: string;
}

export const telemetryEvents: TelemetryEvent[] = [
  {
    id: "t1",
    timestamp: "2026-06-06T14:00:00",
    message: "Finalizing portfolio content, cleaning up project copy and timeline",
    level: "success",
    system: "portfolio",
  },
  {
    id: "t2",
    timestamp: "2026-06-05T10:30:00",
    message: "Reworked portfolio structure with telemetry-style project cards",
    level: "info",
    system: "portfolio",
  },
  {
    id: "t3",
    timestamp: "2026-06-04T09:15:00",
    message: "Started shaping portfolio into a darker dashboard-inspired design",
    level: "info",
    system: "portfolio",
  },
  {
    id: "t4",
    timestamp: "2026-05-30T16:00:00",
    message: "Wrapped up BASF internship, documented final project progress",
    level: "success",
    system: "basf-internship",
  },
  {
    id: "t5",
    timestamp: "2026-05-15T11:20:00",
    message: "Improved testing framework reporting, Markdown output and optional coverage",
    level: "success",
    system: "testing-framework",
  },
  {
    id: "t6",
    timestamp: "2026-04-18T13:45:00",
    message: "Worked on Gherkin-inspired test flow for agent skill validation",
    level: "info",
    system: "testing-framework",
  },
  {
    id: "t7",
    timestamp: "2026-03-22T10:00:00",
    message: "Built no-code calculation flow for sensor-based time series data",
    level: "success",
    system: "calculation-builder",
  },
  {
    id: "t8",
    timestamp: "2026-02-14T09:30:00",
    message: "Improved Dash UI for self-service AI configuration workflows",
    level: "info",
    system: "self-service-ai",
  },
  {
    id: "t9",
    timestamp: "2026-01-10T14:00:00",
    message: "Worked on modular model configuration, KNN and regression workflows",
    level: "debug",
    system: "self-service-ai",
  },
  {
    id: "t10",
    timestamp: "2025-11-28T11:15:00",
    message: "Connected configuration steps to Databricks/Spark execution logic",
    level: "info",
    system: "self-service-ai",
  },
  {
    id: "t11",
    timestamp: "2025-10-17T09:00:00",
    message: "Built reusable Dash components for internal data tooling",
    level: "success",
    system: "self-service-ai",
  },
  {
    id: "t12",
    timestamp: "2025-09-22T08:30:00",
    message: "Started BASF internship, onboarding into data, AI, and internal tooling work",
    level: "info",
    system: "basf-internship",
  },
];
