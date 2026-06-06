import { fetchGitHubActivity } from "@/lib/github";
import GitHubActivityClient from "./GitHubActivityClient";

export default async function GitHubActivity() {
  const data = await fetchGitHubActivity();
  return <GitHubActivityClient data={data} />;
}
