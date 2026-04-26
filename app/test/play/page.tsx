"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type TraitKey = "drive" | "analysis" | "sense" | "safe";

const questions: {
  q: string;
  a: { text: string; score: Record<TraitKey, number> }[];
}[] = [
  {
    q: "갑자기 좋은 기회가 왔다. 그런데 정보가 부족하다.",
    a: [
      { text: "일단 잡고 보완한다", score: { drive: 3, analysis: 0, sense: 1, safe: 0 } },
      { text: "자료를 더 모은다", score: { drive: 0, analysis: 3, sense: 0, safe: 1 } },
      { text: "느낌이 좋으면 간다", score: { drive: 1, analysis: 0, sense: 3, safe: 0 } },
      { text: "리스크부터 계산한다", score: { drive: 0, analysis: 1, sense: 0, safe: 3 } },
    ],
  },
  {
    q: "주변 사람들이 다 말린다. 그래도 마음은 간다.",
    a: [
      { text: "내 선택이니까 간다", score: { drive: 3, analysis: 0, sense: 2, safe: 0 } },
      { text: "왜 말리는지 분석한다", score: { drive: 0, analysis: 3, sense: 0, safe: 1 } },
      { text: "내 감이 맞는지 본다", score: { drive: 1, analysis: 0, sense: 3, safe: 0 } },
      { text: "일단 멈춘다", score: { drive: 0, analysis: 1, sense: 0, safe: 3 } },
    ],
  },
  {
    q: "선택 후 실패할 가능성이 보인다.",
    a: [
      { text: "실패해도 경험이다", score: { drive: 3, analysis: 0, sense: 1, safe: 0 } },
      { text: "실패 원인을 미리 제거한다", score: { drive: 0, analysis: 3, sense: 0, safe: 1 } },
      { text: "불안하면 안 한다", score: { drive: 0, analysis: 1, sense: 2, safe: 2 } },
      { text: "손해가 크면 포기한다", score: { drive: 0, analysis: 1, sense: 0, safe: 3 } },
    ],
  },
  {
    q: "시간이 별로 없다. 오늘 안에 결정해야 한다.",
    a: [
      { text: "빠르게 결정한다", score: { drive: 3, analysis: 0, sense: 1, safe: 0 } },
      { text: "핵심 기준만 뽑는다", score: { drive: 1, analysis: 3, sense: 0, safe: 0 } },
      { text: "마음이 끌리는 쪽으로 간다", score: { drive: 1, analysis: 0, sense: 3, safe: 0 } },
      { text: "중요하면 미룬다", score: { drive: 0, analysis: 1, sense: 0, safe: 3 } },
    ],
  },
  {
    q: "결정하고 나서 후회한 적이 많다.",
    a: [
      { text: "그래도 안 하는 것보다 낫다", score: { drive: 3, analysis: 0, sense: 1, safe: 0 } },
      { text: "다음엔 기준표를 만든다", score: { drive: 0, analysis: 3, sense: 0, safe: 1 } },
      { text: "그때 감정이 중요했다", score: { drive: 0, analysis: 0, sense: 3, safe: 0 } },
      { text: "이제는 더 조심한다", score: { drive: 0, analysis: 1, sense: 0, safe: 3 } },
    ],
  },
];

const resultMap = {
  drive: {
    name: "돌진형 실행가",
    desc: "고민보다 실행이 빠른 타입입니다. 기회를 잡는 힘은 강하지만, 감정이 올라왔을 때 과속할 수 있습니다.",
    advice: "오늘은 바로 움직이되, 최소한의 손실 제한선을 정하고 시작하세요.",
  },
  analysis: {
    name: "분석형 보류가",
    desc: "근거가 쌓여야 움직이는 타입입니다. 실수는 적지만, 타이밍을 놓칠 위험이 있습니다.",
    advice: "오늘은 100점짜리 확신보다 70점짜리 실행을 목표로 하세요.",
  },
  sense: {
    name: "직감형 감각러",
    desc: "상황의 공기와 느낌을 빠르게 읽는 타입입니다. 사람 문제에는 강하지만 기분에 흔들릴 수 있습니다.",
    advice: "오늘은 느낌을 믿되, 결정 전 딱 한 번만 숫자로 검증하세요.",
  },
  safe: {
    name: "안전형 방어자",
    desc: "손해를 피하는 능력이 강한 타입입니다. 안정적이지만, 좋은 변화도 위험으로 볼 수 있습니다.",
    advice: "오늘은 완전한 안전보다 감당 가능한 작은 도전을 선택하세요.",
  },
};

export default function TestPlayPage() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<TraitKey, number>>({
    drive: 0,
    analysis: 0,
    sense: 0,
    safe: 0,
  });
  const [done, setDone] = useState(false);

  const topKey = useMemo(() => {
    return (Object.keys(scores) as TraitKey[]).sort((a, b) => scores[b] - scores[a])[0];
  }, [scores]);

  const total = Math.max(1, Object.values(scores).reduce((a, b) => a + b, 0));

  function choose(score: Record<TraitKey, number>) {
    const next = { ...scores };
    Object.keys(score).forEach((key) => {
      const trait = key as TraitKey;
      next[trait] += score[trait];
    });

    setScores(next);

    if (step >= questions.length - 1) {
      setDone(true);
    } else {
      setStep(step + 1);
    }
  }

  const result = resultMap[topKey];

  return (
    <main className="min-h-screen bg-[#f7f3ec] px-5 py-10 text-[#17130f]">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="text-sm font-black text-black/50">
            ← HAEMALA
          </Link>
          <p className="text-sm font-black text-black/40">
            {done ? "RESULT" : `${step + 1} / ${questions.length}`}
          </p>
        </div>

        <section className="grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
          <aside className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-xl shadow-black/5">
            <p className="text-sm font-black text-black/40">LIVE TENDENCY</p>
            <h2 className="mt-3 text-3xl font-black">{resultMap[topKey].name}</h2>
            <p className="mt-3 leading-7 text-black/60">
              현재 당신은 <b>{resultMap[topKey].name}</b> 쪽으로 기울고 있습니다.
            </p>

            <div className="mt-8 space-y-5">
              {[
                ["drive", "실행"],
                ["analysis", "분석"],
                ["sense", "직감"],
                ["safe", "안전"],
              ].map(([key, label]) => {
                const value = Math.round((scores[key as TraitKey] / total) * 100);
                return (
                  <div key={key}>
                    <div className="mb-2 flex justify-between text-sm font-black">
                      <span>{label}</span>
                      <span>{value}%</span>
                    </div>
                    <div className="h-3 rounded-full bg-black/10">
                      <div
                        className="h-3 rounded-full bg-black transition-all"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>

          <section className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-xl shadow-black/5 md:p-8">
            {!done ? (
              <>
                <p className="text-sm font-black text-black/40">QUESTION</p>
                <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">
                  {questions[step].q}
                </h1>

                <div className="mt-8 grid gap-3">
                  {questions[step].a.map((answer) => (
                    <button
                      key={answer.text}
                      onClick={() => choose(answer.score)}
                      className="rounded-2xl border border-black/10 bg-[#faf8f3] p-5 text-left text-lg font-black transition hover:-translate-y-0.5 hover:bg-black hover:text-white"
                    >
                      {answer.text}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <p className="text-sm font-black text-black/40">FINAL RESULT</p>
                <h1 className="mt-4 text-4xl font-black md:text-6xl">{result.name}</h1>
                <p className="mt-6 text-lg font-medium leading-8 text-black/65">
                  {result.desc}
                </p>

                <div className="mt-8 rounded-[1.5rem] bg-black p-6 text-white">
                  <p className="text-sm font-black text-white/50">오늘의 해말아 조언</p>
                  <p className="mt-3 text-xl font-black leading-8">{result.advice}</p>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={`/simulate?type=${topKey}`}
                    className="rounded-2xl bg-black px-7 py-4 text-center font-black text-white shadow-xl shadow-black/20"
                  >
                    지금 선택 시뮬레이션하기
                  </Link>
                  <button
                    onClick={() => {
                      setStep(0);
                      setDone(false);
                      setScores({ drive: 0, analysis: 0, sense: 0, safe: 0 });
                    }}
                    className="rounded-2xl border border-black/10 bg-white px-7 py-4 font-black"
                  >
                    다시 테스트
                  </button>
                </div>
              </>
            )}
          </section>
        </section>
      </div>
    </main>
  );
}