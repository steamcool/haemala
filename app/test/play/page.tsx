"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const questions = [
  {
    title: "고민이 생기면 나는 보통",
    options: [
      { text: "충분히 생각하고 결정한다", type: "careful" },
      { text: "일단 마음이 가는 쪽을 고른다", type: "intuitive" },
      { text: "손해가 적은 쪽을 계산한다", type: "practical" },
    ],
  },
  {
    title: "선택지가 많을 때 나는",
    options: [
      { text: "기준을 세우고 하나씩 비교한다", type: "careful" },
      { text: "끌리는 선택지를 먼저 본다", type: "intuitive" },
      { text: "가장 현실적인 선택을 고른다", type: "practical" },
    ],
  },
  {
    title: "중요한 결정을 앞두면",
    options: [
      { text: "정보를 더 찾아본다", type: "careful" },
      { text: "내 감각을 믿는다", type: "intuitive" },
      { text: "비용과 리스크를 따진다", type: "practical" },
    ],
  },
  {
    title: "후회가 걱정될 때 나는",
    options: [
      { text: "더 오래 고민한다", type: "careful" },
      { text: "그래도 하고 싶은 쪽을 고른다", type: "intuitive" },
      { text: "후폭풍이 적은 쪽을 택한다", type: "practical" },
    ],
  },
  {
    title: "친구가 조언을 구하면 나는",
    options: [
      { text: "장단점을 같이 정리해준다", type: "careful" },
      { text: "네 마음이 뭔지 묻는다", type: "intuitive" },
      { text: "현실적으로 가능한지 본다", type: "practical" },
    ],
  },
  {
    title: "갑자기 기회가 생기면",
    options: [
      { text: "조건을 먼저 확인한다", type: "careful" },
      { text: "느낌이 좋으면 잡는다", type: "intuitive" },
      { text: "실익이 있으면 움직인다", type: "practical" },
    ],
  },
  {
    title: "내가 가장 피하고 싶은 것은",
    options: [
      { text: "성급한 선택", type: "careful" },
      { text: "마음에 없는 선택", type: "intuitive" },
      { text: "손해 보는 선택", type: "practical" },
    ],
  },
  {
    title: "나에게 좋은 결정이란",
    options: [
      { text: "충분히 납득되는 결정", type: "careful" },
      { text: "내 마음이 살아있는 결정", type: "intuitive" },
      { text: "현실적으로 유지 가능한 결정", type: "practical" },
    ],
  },
];

export default function TestPlayPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState({
    careful: 0,
    intuitive: 0,
    practical: 0,
  });

  const current = questions[step];
  const progress = useMemo(
    () => Math.round(((step + 1) / questions.length) * 100),
    [step]
  );

  function choose(type: "careful" | "intuitive" | "practical") {
    const nextScores = {
      ...scores,
      [type]: scores[type] + 1,
    };

    setScores(nextScores);

    if (step === questions.length - 1) {
      const result = Object.entries(nextScores).sort(
        (a, b) => b[1] - a[1]
      )[0][0];

      router.push(`/test/result?type=${result}`);
      return;
    }

    setStep(step + 1);
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <section className="mx-auto max-w-2xl">
        <div className="mb-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">
              {step + 1} / {questions.length}
            </p>
            <p className="text-sm font-medium text-gray-500">{progress}%</p>
          </div>

          <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-gray-900 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Question</p>

          <h1 className="mt-3 text-2xl font-bold leading-snug text-gray-900">
            {current.title}
          </h1>

          <div className="mt-8 grid gap-3">
            {current.options.map((option) => (
              <button
                key={option.text}
                onClick={() =>
                  choose(option.type as "careful" | "intuitive" | "practical")
                }
                className="rounded-2xl border border-gray-200 bg-white p-4 text-left transition hover:border-gray-400 hover:bg-gray-50 active:scale-[0.99]"
              >
                <span className="text-base font-semibold text-gray-800">
                  {option.text}
                </span>
              </button>
            ))}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          정답은 없습니다. 지금 가장 가까운 답을 고르세요.
        </p>
      </section>
    </main>
  );
}