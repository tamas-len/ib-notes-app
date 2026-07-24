import { NextRequest, NextResponse } from "next/server";
import { octokit, githubConfig } from "@/lib/github";


export async function POST(request: NextRequest) {

  const body = await request.json();

  const {
    title,
    subject,
    language,
    content,
  } = body;


  const branchName =
    `submission-${Date.now()}`;


  // Get main branch
  const mainBranch =
    await octokit.rest.repos.getBranch({
      owner: githubConfig.owner,
      repo: githubConfig.repo,
      branch: "main",
    });


  // Create branch
  await octokit.rest.git.createRef({
    owner: githubConfig.owner,
    repo: githubConfig.repo,
    ref: `refs/heads/${branchName}`,
    sha: mainBranch.data.commit.sha,
  });


  // Create markdown file path

  const filePath =
    `content/ib/${subject}/community/${title}.md`;


  // Create markdown content

  const markdown = `
---
title: ${title}
subject: ${subject}
language: ${language}
---

${content}
`;


  // Create file

  await octokit.rest.repos.createOrUpdateFileContents({

    owner: githubConfig.owner,
    repo: githubConfig.repo,

    path: filePath,

    message: `Add community note: ${title}`,

    content:
      Buffer
        .from(markdown)
        .toString("base64"),

    branch: branchName,

  });


    // Create pull request

    const pullRequest =
    await octokit.rest.pulls.create({

    owner: githubConfig.owner,
    repo: githubConfig.repo,
    title: `Add community note: ${title}`,
    head: branchName,
    base: "main",
    body: `
    ## New community note
    **Subject:** ${subject}
    **Language:** ${language}
    Submitted through IB Notes Platform.
    `,
    });

    return NextResponse.json({
    success:true,
    branch:branchName,
    file:filePath,
    pullRequest:
        pullRequest.data.html_url,
    });

}