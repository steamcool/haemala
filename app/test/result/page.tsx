"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const results = {
  careful: {
    label: "신중 분석형",
    title: "당신은 납득 가능한 선택을 선호합니다",
    desc: "감정만으로 움직이기보다 충분히 비교하고 확인한 뒤 결정하는 편입니다. 안정감 있는 선택을 잘하지만, 때로는 고민이 길어져 기회를 놓칠 수 있습니다.",
    advice: "오늘은 기준을 3개만 정하고, 그 기준을 통과하면 더 고민하지 않는 방식이 좋습니다.",
  },
  intuitive: {
    label: "직감 추진형",
    title: "당신은 마음이 움직이는 선택에 강합니다",
    desc: "복잡하게 따지기보다 끌림과 감각을 중요하게 봅니다. 빠르게 움직이는 장점이 있지만, 순간 감정에 선택이 흔들릴 수 있습니다.",
    advice: "오늘은 하고 싶은 이유와 하지 말아야 할 이유를 각각 하나씩만 적어보세요.",
  },
  practical: {
    label: "현실 균형형",
    title: "당신은 손실과 가능성을 함께 봅니다",
    desc: "감정이나 이상보다 실제로 가능한지, 유지할 수 있는지를 중요하게 봅니다. 현실감이 뛰어나지만, 가끔은 너무 안전한 선택만 할 수 있습니다.",
    advice: "오늘은 손해가 적은 선택보다 나중에 후회가 적을 선택을 우선해보세요.",
  },
};

function ResultContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") as keyof typeof results;
  const result = results[type] ?? results.careful;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <section className="mx-auto max-w-2xl">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">테스트 결과</p>

          <div className="mt-4 inline-flex rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700">
            {result.label}
          </div>

          <h1 className="mt-5 text-3xl font-bold leading-tight text-gray-900">
            {result.title}
          </h1>

          <p className="mt-5 text-base font-medium leading-7 text-gray-600">
            {result.desc}
          </p>

          <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <p className="text-sm font-semibold text-gray-800">
              오늘의 선택 팁
            </p>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              {result.advice}
            </p>
          </div>

          <div className="mt-8 grid gap-3">
            <Link
              href="/test/play"
              className="flex h-14 items-center justify-center rounded-2xl bg-gray-900 text-base font-semibold text-white transition hover:bg-gray-800"
            >
              다시 테스트하기
            </Link>

            <Link
              href="/"
              className="flex h-14 items-center justify-center rounded-2xl border border-gray-200 bg-white text-base font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              해말아 홈으로
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          결과는 참고용이며, 중요한 결정은 충분한 정보와 상황 판단을 함께 고려하세요.
        </p>
      </section>
    </main>
  );
}

export default function TestResultPage() {
  return (
    <Suspense fallback={null}>
      <ResultContent />
    </Suspense>
  );
}