import { NextResponse, NextRequest } from "next/server";
import { generateSingleBullet } from "@/lib/ai/bulletPointGenerator";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { input, context } = body;

    // Validate input exists
    if (!input || typeof input !== "string") {
      return NextResponse.json(
        {
          error: "Input text is required!", // ✅ Changed "message" to "error"
        },
        { status: 400 },
      );
    }

    // Validate input is not too short
    if (input.trim().length < 3) {
      return NextResponse.json(
        { error: "Please write at least 3 characters before improving" },
        { status: 400 },
      );
    }

    // Validate input is not too long
    if (input.length > 1000) {
      return NextResponse.json(
        { error: "Input too long. Please keep under 1000 characters." },
        { status: 400 },
      );
    }

    // ✅ FIXED: Added await!
    const improved = await generateSingleBullet(input.trim(), context);

    return NextResponse.json({
      success: true,
      bullet: improved,
    });
  } catch (error: unknown) {
    console.error("API error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to improve bullet point",
      },
      { status: 500 },
    );
  }
}
