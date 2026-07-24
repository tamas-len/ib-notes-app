import { NextResponse } from "next/server";
import { octokit } from "@/lib/github";


const owner = process.env.GITHUB_OWNER!;
const repo = process.env.GITHUB_REPO!;


export async function POST(
  request: Request
) {

  const body = await request.json();


  const {
    path,
    content,
    title
  } = body;



  if (!path || !content) {

    return NextResponse.json(
      {
        error:"Missing data"
      },
      {
        status:400
      }
    );

  }



  try {


    // get main branch

    const main =
      await octokit.rest.git.getRef({
        owner,
        repo,
        ref:"heads/main"
      });



    const branchName =
      `submission-${Date.now()}`;



    // create branch

    await octokit.rest.git.createRef({

      owner,
      repo,

      ref:
        `refs/heads/${branchName}`,

      sha:
        main.data.object.sha

    });



    // create file

    await octokit.rest.repos.createOrUpdateFileContents({

      owner,

      repo,

      path,

      message:
        `Add submission: ${title}`,

      content:
        Buffer
        .from(content)
        .toString("base64"),

      branch:
        branchName

    });



    // create PR

    const pr =
      await octokit.rest.pulls.create({

        owner,

        repo,

        title:
          `New note submission: ${title}`,

        head:
          branchName,

        base:
          "main"

      });



    return NextResponse.json({

      success:true,

      url:
        pr.data.html_url

    });



  } catch(error){


    console.error(error);


    return NextResponse.json(

      {
        error:
          "GitHub submission failed"
      },

      {
        status:500
      }

    );

  }

}