import { NextResponse } from "next/server";
import { octokit, githubConfig } from "@/lib/github";

export async function GET() {
  const repo = await octokit.rest.repos.get({
    owner: githubConfig.owner,
    repo: githubConfig.repo,
  });

  return NextResponse.json({
    name: repo.data.name,
    description: repo.data.description,
    message: "GitHub connection works!",
  });
}