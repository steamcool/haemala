import OpenAI from "openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const situation = body?.situation;

    if (!situation) {
      return NextResponse.json(
        { error: "situation이 없습니다." },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY가 없습니다. .env.local을 확인하세요." },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "너는 연애 상황을 냉정하고 현실적으로 분석하는 상담형 AI다. 한국어로 답하고, 너무 길지 않게 정리한다.",
        },
        {
          role: "user",
          content: situation,
        },
      ],
    });

    return NextResponse.json({
      result:
        completion.choices[0]?.message?.content ||
        "분석 결과를 만들지 못했습니다.",
    });
  } catch (error: any) {
    console.error("AI_ANALYZE_ERROR:", error);

    return NextResponse.json(
      {
        error: "AI 분석 실패",
        detail: error?.message || "알 수 없는 오류",
      },
      { status: 500 }
    );
  }
}