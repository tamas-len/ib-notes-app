import { octokit } from "./github";


const owner = process.env.GITHUB_OWNER!;
const repo = process.env.GITHUB_REPO!;


export async function getFolderContents(path: string) {

  const response = await octokit.rest.repos.getContent({
    owner,
    repo,
    path,
  });


  if (!Array.isArray(response.data)) {
    throw new Error("Path is not a folder");
  }


  return response.data
    .filter(item => item.type === "dir" || item.name.endsWith(".md"))
    .map(item => ({
      name: item.name,
      path: item.path,
      type: item.type
    }));
}