import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  const { postId, side, fingerprint } = await req.json();

  // 중복 체크
  const { data: exists } = await supabase
    .from("vote_logs")
    .select("*")
    .eq("post_id", postId)
    .eq("fingerprint", fingerprint);

  if (exists && exists.length > 0) {
    return NextResponse.json({ error: "이미 투표함" });
  }

  // 로그 기록
  await supabase.from("vote_logs").insert({
    post_id: postId,
    fingerprint,
  });

  // 기존 votes 가져오기
  const { data } = await supabase
    .from("votes")
    .select("*")
    .eq("post_id", postId)
    .single();

  const votesA = side === "A" ? (data?.votes_a || 0) + 1 : data?.votes_a || 0;
  const votesB = side === "B" ? (data?.votes_b || 0) + 1 : data?.votes_b || 0;

  await supabase.from("votes").upsert({
    post_id: postId,
    votes_a: votesA,
    votes_b: votesB,
  });

  return NextResponse.json({ votesA, votesB });
}