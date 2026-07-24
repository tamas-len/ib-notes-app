import { NextResponse } from "next/server";
import { getFolderContents } from "@/lib/content";


export async function GET(
    request: Request
) {

    const { searchParams } = new URL(request.url);

    const path = searchParams.get("path");


    if (!path) {
        return NextResponse.json(
            {error:"Missing path"},
            {status:400}
        );
    }


    try {

        const contents = await getFolderContents(path);

        return NextResponse.json(contents);

    } catch(error){

        return NextResponse.json(
            {
                error:"Could not read GitHub folder"
            },
            {
                status:500
            }
        );
    }
}