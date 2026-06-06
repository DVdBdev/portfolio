export type ProjectStatus = "production" | "active" | "experimental" | "archived" | "paused";

export interface TelemetryMetric {
  label: string;
  value: string;
  unit?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  systemRole: string;
  stack: string[];
  challenge: string;
  status: ProjectStatus;
  metrics: TelemetryMetric[];
  link?: string;
  repo?: string;
}
