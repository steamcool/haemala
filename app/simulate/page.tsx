"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const typeName: Record<string, string> = {
  drive: "돌진형 실행가",
  analysis: "분석형 보류가",
  sense: "직감형 감각러",
  safe: "안전형 방어자",
};

const scenarios = [
  "고백할까 말까",
  "퇴사/이직할까 말까",
  "연락할까 말까",
  "살까 말까",
  "시작할까 말까",
  "손절할까 말까",
];

function getResult(type: string, scenario: string, choice: string) {
  const seed = `${type}-${scenario}-${choice}`;
  const value = seed.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const score = 45 + (value % 46);

  const risk =
    type === "drive" ? "과속 리스크" :
    type === "analysis" ? "타이밍 상실 리스크" :
    type === "sense" ? "감정 과몰입 리스크" :
    "기회 회피 리스크";

  const verdict =
    score >= 78 ? "해도 된다" :
    score >= 62 ? "조건부로 해라" :
    score >= 50 ? "조금 더 보고 해라" :
    "오늘은 말아라";

  return { score, risk, verdict };
}

export default function SimulatePage() {
const type = "analysis";

  const [scenario, setScenario] = useState(scenarios[0]);
  const [choice, setChoice] = useState("한다");

  const result = useMemo(
    () => getResult(type, scenario, choice),
    [type, scenario, choice]
  );

  return (
    <main className="min-h-screen bg-[#f7f3ec] px-5 py-10 text-[#17130f]">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="text-sm font-black text-black/50">
            ← HAEMALA
          </Link>
          <Link href="/test/play" className="text-sm font-black text-black/50">
            테스트 다시하기
          </Link>
        </div>

        <section className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-2xl shadow-black/10 md:p-10">
          <p className="text-sm font-black text-black/40">DECISION SIMULATOR</p>

          <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
            그래서 지금,
            <br />
            할까 말까?
          </h1>

          <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-black/60">
            현재 성향은 <b>{typeName[type] || "분석형 보류가"}</b>입니다.
            아래 상황을 고르면 오늘의 선택 결과를 시뮬레이션합니다.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-[1.5rem] bg-[#faf8f3] p-5">
              <p className="mb-3 text-sm font-black text-black/40">고민 상황</p>
              <div className="grid gap-2">
                {scenarios.map((item) => (
                  <button
                    key={item}
                    onClick={() => setScenario(item)}
                    className={`rounded-2xl px-4 py-3 text-left font-black transition ${
                      scenario === item
                        ? "bg-black text-white"
                        : "bg-white text-black hover:bg-black/5"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] bg-[#faf8f3] p-5">
              <p className="mb-3 text-sm font-black text-black/40">선택 방향</p>
              <div className="grid grid-cols-2 gap-3">
                {["한다", "말아본다"].map((item) => (
                  <button
                    key={item}
                    onClick={() => setChoice(item)}
                    className={`rounded-2xl px-4 py-5 text-lg font-black transition ${
                      choice === item
                        ? "bg-black text-white"
                        : "bg-white text-black hover:bg-black/5"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="mt-6 rounded-[1.5rem] bg-black p-6 text-white">
                <p className="text-sm font-black text-white/50">오늘의 판정</p>
                <h2 className="mt-3 text-4xl font-black">{result.verdict}</h2>

                <div className="mt-6">
                  <div className="mb-2 flex justify-between text-sm font-black">
                    <span>성공 가능성</span>
                    <span>{result.score}%</span>
                  </div>
                  <div className="h-4 rounded-full bg-white/10">
                    <div
                      className="h-4 rounded-full bg-white"
                      style={{ width: `${result.score}%` }}
                    />
                  </div>
                </div>

                <p className="mt-5 leading-7 text-white/70">
                  주의할 점은 <b>{result.risk}</b>입니다. 오늘은 감정적으로
                  밀어붙이기보다, 선택 후 감당 가능한 손실선을 먼저 정하세요.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-3">
            <Link
              href="/today"
              className="rounded-2xl border border-black/10 bg-white px-5 py-4 text-center font-black"
            >
              오늘의 결정운 보기
            </Link>
            <Link
              href="/random"
              className="rounded-2xl border border-black/10 bg-white px-5 py-4 text-center font-black"
            >
              랜덤 결정기
            </Link>
            <Link
              href="/dream-lotto"
              className="rounded-2xl border border-black/10 bg-white px-5 py-4 text-center font-black"
            >
              꿈 로또 보기
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}