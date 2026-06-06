export interface StackNode {
  id: string;
  label: string;
  category: "language" | "framework" | "platform" | "tooling" | "ml" | "data";
  description: string;
  relatedProjects?: string[];
  x: number;
  y: number;
}

export interface StackEdge {
  source: string;
  target: string;
}
