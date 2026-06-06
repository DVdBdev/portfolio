import type { GitHubActivity, GitHubRepo } from "@/types/github";

// Mock data — replace with live API adapter when ready
const mockRepos: GitHubRepo[] = [
  {
    id: 1,
    name: "ml-pipeline-designer",
    description: "Visual ML pipeline designer for Databricks workflows",
    language: "Python",
    stargazers_count: 0,
    forks_count: 0,
    html_url: "https://github.com/dvdbdev/ml-pipeline-designer",
    updated_at: "2026-05-06T00:00:00Z",
    topics: ["machine-learning", "databricks", "python", "tooling"],
  },
  {
    id: 2,
    name: "journey",
    description: "Full-stack blogging and journaling platform",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    html_url: "https://github.com/dvdbdev/journey",
    updated_at: "2026-05-03T00:00:00Z",
    topics: ["nextjs", "typescript", "supabase", "fullstack"],
  },
  {
    id: 3,
    name: "experiment-tracker",
    description: "Lightweight ML experiment tracking for Python workflows",
    language: "Python",
    stargazers_count: 0,
    forks_count: 0,
    html_url: "https://github.com/dvdbdev/experiment-tracker",
    updated_at: "2026-04-29T00:00:00Z",
    topics: ["mlops", "python", "experiments"],
  },
  {
    id: 4,
    name: "portfolio",
    description: "Personal engineering portfolio — telemetry-inspired dashboard",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    html_url: "https://github.com/dvdbdev/portfolio",
    updated_at: "2026-05-07T00:00:00Z",
    topics: ["nextjs", "typescript", "portfolio"],
  },
];

const mockActivity: GitHubActivity = {
  repos: mockRepos,
  totalStars: 0,
  languages: {
    TypeScript: 45,
    Python: 40,
    SQL: 10,
    CSS: 5,
  },
};

/**
 * Fetch GitHub activity.
 * Currently returns mock data. To enable live data, implement the
 * fetchLiveGitHubActivity() function below using the GitHub REST API.
 */
export async function fetchGitHubActivity(): Promise<GitHubActivity> {
  // TODO: Replace with live adapter
  // return fetchLiveGitHubActivity("dvdbdev");
  return mockActivity;
}

// Live API adapter (not yet active)
// async function fetchLiveGitHubActivity(username: string): Promise<GitHubActivity> {
//   const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`, {
//     headers: { Accept: "application/vnd.github+json" },
//     next: { revalidate: 3600 },
//   });
//   if (!res.ok) throw new Error("GitHub API error");
//   const repos: GitHubRepo[] = await res.json();
//   const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
//   return { repos, totalStars, languages: {} };
// }
