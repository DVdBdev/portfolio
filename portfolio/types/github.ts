export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  updated_at: string;
  topics: string[];
}

export interface GitHubActivity {
  repos: GitHubRepo[];
  totalStars: number;
  languages: Record<string, number>;
}
