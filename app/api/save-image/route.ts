import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const { image } = await request.json();
    if (!image || !image.startsWith("data:image/png;base64,")) {
      return NextResponse.json({ error: "Invalid image format" }, { status: 400 });
    }

    const base64Data = image.replace(/^data:image\/png;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");
    
    const outputPath = path.join(process.cwd(), "public", "images", "retro_tv_clean.png");
    fs.writeFileSync(outputPath, buffer);

    return NextResponse.json({ success: true, path: "/images/retro_tv_clean.png" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
