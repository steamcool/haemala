"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import ShareResultButtons from "../components/ShareResultButtons";

type LottoResult = {
  id: string;
  numbers: number[];
  bonus: number;
  createdAt: string;
  score: number;
  sum: number;
  odd: number;
  low: number;
};

function hashString(input: string) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle(arr: number[], rand: () => number) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function scoreNumbers(numbers: number[]) {
  const sum = numbers.reduce((a, b) => a + b, 0);
  const odd = numbers.filter((n) => n % 2).length;
  const low = numbers.filter((n) => n <= 22).length;
  const ranges = new Set(numbers.map((n) => Math.ceil(n / 9))).size;

  let score = 45;

  if (sum >= 95 && sum <= 185) score += 20;
  if (odd >= 2 && odd <= 4) score += 18;
  if (low >= 2 && low <= 4) score += 14;
  if (ranges >= 4) score += 12;

  return Math.min(score, 100);
}

function generateBalanced(): LottoResult {
  const seed = hashString(`${Date.now()}-${Math.random()}`);
  const rand = mulberry32(seed);

  let best: number[] = [];
  let bestScore = -1;

  for (let i = 0; i < 120; i++) {
    const r = mulberry32(hashString(`${seed}-${i}-${rand()}`));
    const candidate = shuffle(
      Array.from({ length: 45 }, (_, i) => i + 1),
      r
    )
      .slice(0, 6)
      .sort((a, b) => a - b);

    const s = scoreNumbers(candidate) + r() * 5;

    if (s > bestScore) {
      best = candidate;
      bestScore = s;
    }
  }

  const pool = Array.from({ length: 45 }, (_, i) => i + 1).filter(
    (n) => !best.includes(n)
  );

  const bonus = shuffle(pool, rand)[0];

  return {
    id: Date.now().toString(),
    numbers: best,
    bonus,
    createdAt: new Date().toISOString(),
    score: scoreNumbers(best),
    sum: best.reduce((a, b) => a + b, 0),
    odd: best.filter((n) => n % 2).length,
    low: best.filter((n) => n <= 22).length,
  };
}

export default function RandomPage() {
  const [result, setResult] = useState<LottoResult | null>(null);
  const [revealed, setRevealed] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const r = generateBalanced();
    setResult(r);
  }, []);

  useEffect(() => {
    if (!result) return;

    setRevealed(0);
    const timers = Array.from({ length: 7 }, (_, i) =>
      setTimeout(() => setRevealed(i + 1), 90 * i + 120)
    );

    return () => timers.forEach(clearTimeout);
  }, [result]);

  function regenerate() {
    const r = generateBalanced();
    setResult(r);
    setCopied(false);
  }

  async function copy() {
    if (!result) return;

    await navigator.clipboard.writeText(
      `추천 번호: ${result.numbers.join(", ")} + ${result.bonus}`
    );

    setCopied(true);
  }

  const even = result ? 6 - result.odd : 0;
  const high = result ? 6 - result.low : 0;

  return (
    <main className="min-h-screen bg-[#0b0b0c] text-white">
      {/* HEADER */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          <Link href="/" className="font-black">해말아</Link>

          <div className="flex gap-6 text-sm text-white/60">
            <Link href="/dream-lotto">꿈해몽</Link>
            <Link href="/today">오늘</Link>
            <Link href="/random" className="text-[#d7b46a]">랜덤</Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <h1 className="text-7xl font-black tracking-[-0.08em] leading-[0.9]">
          빠르게,
          <br />
          그러나 균형 있게.
        </h1>

        <p className="mt-6 text-white/50 max-w-xl">
          무작위 후보를 여러 번 생성한 뒤, 균형이 좋은 조합만 선별합니다.
        </p>
      </section>

      {/* RESULT */}
      <section className="mx-auto max-w-7xl px-5 pb-20">
        <div className="rounded-[2rem] bg-white text-black p-8 shadow-xl">

          <div className="flex justify-between">
            <h2 className="text-4xl font-black">랜덤 리포트</h2>
            <div className="font-black">{result?.score}/100</div>
          </div>

          {/* numbers */}
          <div className="flex gap-3 mt-8 flex-wrap">
            {result?.numbers.map((n, i) => (
              <div
                key={n}
                className={`w-16 h-16 flex items-center justify-center rounded-xl text-xl font-black transition ${
                  revealed > i
                    ? "bg-black text-white"
                    : "bg-black/10 text-transparent"
                }`}
              >
                {n}
              </div>
            ))}
            <div className={`w-16 h-16 flex items-center justify-center rounded-xl border ${
              revealed > 6 ? "opacity-100" : "opacity-0"
            }`}>
              +{result?.bonus}
            </div>
          </div>

          {/* stats */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div>
              <p className="text-xs text-black/40">합계</p>
              <p className="text-2xl font-black">{result?.sum}</p>
            </div>
            <div>
              <p className="text-xs text-black/40">홀짝</p>
              <p className="text-2xl font-black">{result?.odd}:{even}</p>
            </div>
            <div>
              <p className="text-xs text-black/40">저고</p>
              <p className="text-2xl font-black">{result?.low}:{high}</p>
            </div>
          </div>

          {/* actions */}
          <div className="grid grid-cols-2 gap-3 mt-10">
            <button
              onClick={regenerate}
              className="bg-black text-white py-4 rounded-full font-black"
            >
              다시 생성
            </button>

            <button
              onClick={copy}
              className="bg-black/10 py-4 rounded-full font-black"
            >
              {copied ? "복사 완료" : "복사"}
            </button>
          </div>

          <ShareResultButtons
            targetId="random-result-card"
            fileName="random"
            shareText={`번호: ${result?.numbers.join(", ")}`}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#d7b46a] text-black py-16 text-center">
        <h2 className="text-4xl font-black">
          더 개인적인 결과를 원한다면
        </h2>

        <Link
          href="/dream-lotto"
          className="mt-6 inline-block bg-black text-white px-8 py-4 rounded-full font-black"
        >
          꿈 해몽 번호
        </Link>
      </section>
    </main>
  );
}