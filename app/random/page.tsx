"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import ShareResultButtons from "../components/ShareResultButtons";

type LottoResult = {
  id: string;
  numbers: number[];
  bonus: number;
  createdAt: string;
  balanceScore: number;
  sum: number;
  oddCount: number;
  lowCount: number;
  mood: string;
};

const moods = [
  "균형형 조합",
  "차분한 흐름",
  "변화 중심",
  "상승 흐름",
  "안정 중심",
  "분산형 조합",
];

const STORAGE_KEY = "haemala_random_history_v1";

function pickUniqueNumbers(count: number, min = 1, max = 45) {
  const pool = Array.from({ length: max - min + 1 }, (_, i) => i + min);
  const picked: number[] = [];

  while (picked.length < count && pool.length > 0) {
    const index = Math.floor(Math.random() * pool.length);
    picked.push(pool[index]);
    pool.splice(index, 1);
  }

  return picked.sort((a, b) => a - b);
}

function getRangeScore(numbers: number[]) {
  const ranges = [0, 0, 0, 0, 0];

  numbers.forEach((n) => {
    if (n <= 9) ranges[0] += 1;
    else if (n <= 18) ranges[1] += 1;
    else if (n <= 27) ranges[2] += 1;
    else if (n <= 36) ranges[3] += 1;
    else ranges[4] += 1;
  });

  return ranges.filter(Boolean).length * 12;
}

function getBalanceScore(numbers: number[]) {
  const sum = numbers.reduce((a, b) => a + b, 0);
  const oddCount = numbers.filter((n) => n % 2 === 1).length;
  const lowCount = numbers.filter((n) => n <= 22).length;

  let score = 40;

  if (sum >= 100 && sum <= 180) score += 20;
  else if (sum >= 85 && sum <= 200) score += 12;
  else score += 5;

  if (oddCount >= 2 && oddCount <= 4) score += 20;
  else score += 10;

  if (lowCount >= 2 && lowCount <= 4) score += 15;
  else score += 7;

  score += Math.min(getRangeScore(numbers), 25);

  return Math.min(score, 100);
}

function generateBalancedResult(): LottoResult {
  let best = pickUniqueNumbers(6);
  let bestScore = getBalanceScore(best);

  for (let i = 0; i < 80; i++) {
    const candidate = pickUniqueNumbers(6);
    const score = getBalanceScore(candidate);

    if (score > bestScore) {
      best = candidate;
      bestScore = score;
    }

    if (score >= 92) break;
  }

  const bonusPool = Array.from({ length: 45 }, (_, i) => i + 1).filter(
    (n) => !best.includes(n)
  );

  const bonus = bonusPool[Math.floor(Math.random() * bonusPool.length)];
  const sum = best.reduce((a, b) => a + b, 0);
  const oddCount = best.filter((n) => n % 2 === 1).length;
  const lowCount = best.filter((n) => n <= 22).length;

  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    numbers: best,
    bonus,
    createdAt: new Date().toISOString(),
    balanceScore: bestScore,
    sum,
    oddCount,
    lowCount,
    mood: moods[Math.floor(Math.random() * moods.length)],
  };
}

function getNumberTone(num: number) {
  if (num <= 10) return "초반";
  if (num <= 20) return "전개";
  if (num <= 30) return "중심";
  if (num <= 40) return "확장";
  return "마무리";
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export default function RandomPage() {
  const [result, setResult] = useState<LottoResult | null>(null);
  const [history, setHistory] = useState<LottoResult[]>([]);
  const [copied, setCopied] = useState(false);
  const resultRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const first = generateBalancedResult();
    setResult(first);

    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setHistory(JSON.parse(saved).slice(0, 5));
      } catch {
        setHistory([]);
      }
    }
  }, []);

  const report = useMemo(() => {
    if (!result) return null;

    const evenCount = 6 - result.oddCount;
    const highCount = 6 - result.lowCount;

    return {
      evenCount,
      highCount,
      summary:
        result.balanceScore >= 90
          ? "구간, 홀짝, 합계가 안정적으로 분산된 조합입니다."
          : result.balanceScore >= 80
            ? "전체 균형이 무난한 조합입니다."
            : "조금 개성이 강한 흐름의 조합입니다.",
      detail: `합계 ${result.sum}, 홀수 ${result.oddCount}개, 짝수 ${evenCount}개로 구성되었습니다. 낮은 번호 ${result.lowCount}개와 높은 번호 ${highCount}개가 섞여 있어 한쪽으로 크게 치우치지 않는 흐름입니다.`,
    };
  }, [result]);

  function createNewResult() {
    const next = generateBalancedResult();
    setResult(next);
    setCopied(false);

    const nextHistory = [next, ...history].slice(0, 5);
    setHistory(nextHistory);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextHistory));
  }

  async function copyResult() {
    if (!result) return;

    const text = [
      "해말아 랜덤 번호 리포트",
      `추천 번호: ${result.numbers.join(", ")}`,
      `보너스: ${result.bonus}`,
      `균형 점수: ${result.balanceScore}/100`,
      "https://www.haemala.com/random",
    ].join("\n");

    await navigator.clipboard.writeText(text);
    setCopied(true);
  }

  return (
    <main className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f]">
      <header className="sticky top-0 z-50 border-b border-black/5 bg-[#f5f5f7]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
          <Link href="/" className="text-sm font-semibold tracking-tight">
            해말아
          </Link>

          <nav className="hidden gap-8 text-xs font-semibold text-neutral-500 sm:flex">
            <Link href="/dream-lotto" className="hover:text-black">
              꿈해몽
            </Link>
            <Link href="/today" className="hover:text-black">
              오늘
            </Link>
            <Link href="/random" className="text-black">
              랜덤
            </Link>
          </nav>

          <Link
            href="/today"
            className="rounded-full bg-black px-4 py-1.5 text-xs font-bold text-white"
          >
            오늘 번호
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-14 text-center sm:py-20">
        <p className="text-sm font-bold text-neutral-500">Random Report</p>

        <h1 className="mt-4 text-6xl font-black leading-[0.92] tracking-[-0.08em] sm:text-7xl">
          빠르게,
          <br />
          그러나 균형 있게.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg font-semibold leading-8 tracking-[-0.03em] text-neutral-600">
          단순 랜덤이 아니라 홀짝, 구간, 합계 밸런스를 함께 고려해 보기 좋은
          번호 조합을 생성합니다.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-5 pb-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div
          id="random-result-card"
          ref={resultRef}
          className="rounded-[2.75rem] bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-10"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-bold text-neutral-400">추천 번호</p>
              <h2 className="mt-2 text-4xl font-black tracking-[-0.06em]">
                {result?.mood ?? "균형형 조합"}
              </h2>
            </div>

            <div className="rounded-full bg-[#f5f5f7] px-4 py-2 text-sm font-black text-neutral-600">
              균형 {result?.balanceScore ?? 0}/100
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2 sm:gap-3">
            {(result?.numbers ?? []).map((num) => (
              <div
                key={num}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-lg font-black text-white shadow-sm sm:h-16 sm:w-16 sm:text-xl"
              >
                {num}
              </div>
            ))}

            {result && (
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f5f5f7] text-lg font-black text-black ring-1 ring-black/10 sm:h-16 sm:w-16 sm:text-xl">
                +{result.bonus}
              </div>
            )}
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-[1.5rem] bg-[#f5f5f7] p-5">
              <p className="text-xs font-bold text-neutral-400">합계</p>
              <p className="mt-2 text-3xl font-black">{result?.sum ?? 0}</p>
            </div>
            <div className="rounded-[1.5rem] bg-[#f5f5f7] p-5">
              <p className="text-xs font-bold text-neutral-400">홀짝</p>
              <p className="mt-2 text-3xl font-black">
                {result?.oddCount ?? 0}:{report?.evenCount ?? 0}
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-[#f5f5f7] p-5">
              <p className="text-xs font-bold text-neutral-400">저고</p>
              <p className="mt-2 text-3xl font-black">
                {result?.lowCount ?? 0}:{report?.highCount ?? 0}
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-[2rem] bg-[#1d1d1f] p-6 text-white">
            <p className="text-sm font-bold text-white/40">Report</p>
            <h3 className="mt-3 text-2xl font-black tracking-[-0.05em]">
              {report?.summary}
            </h3>
            <p className="mt-4 text-sm font-semibold leading-7 text-white/65">
              {report?.detail}
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <button
              onClick={createNewResult}
              className="rounded-full bg-black px-7 py-4 text-base font-bold text-white transition hover:-translate-y-0.5"
            >
              새 번호 생성
            </button>

            <button
              onClick={copyResult}
              className="rounded-full bg-[#f5f5f7] px-7 py-4 text-base font-bold text-black ring-1 ring-black/5 transition hover:-translate-y-0.5"
            >
              {copied ? "복사 완료" : "결과 복사"}
            </button>
          </div>

          {result && (
            <ShareResultButtons
              targetId="random-result-card"
              fileName="haemala-random-result"
              shareText={`해말아 랜덤 번호 리포트\n추천 번호: ${result.numbers.join(
                ", "
              )}\n보너스: ${result.bonus}\n균형 점수: ${
                result.balanceScore
              }/100`}
            />
          )}
        </div>

        <aside className="grid gap-5">
          <div className="rounded-[2.5rem] bg-[#1d1d1f] p-7 text-white shadow-sm">
            <p className="text-sm font-bold text-white/40">Balance Logic</p>
            <h2 className="mt-4 text-4xl font-black leading-[1] tracking-[-0.07em]">
              무작위에도
              <br />
              보기 좋은 균형을.
            </h2>
            <p className="mt-5 text-sm font-semibold leading-7 text-white/62">
              생성 후보를 여러 번 만들고, 합계·홀짝·구간 분산이 더 안정적인
              조합을 선택합니다. 당첨 예측이 아니라 보기 좋은 조합 필터입니다.
            </p>
          </div>

          <div className="rounded-[2.5rem] bg-white p-7 shadow-sm ring-1 ring-black/5">
            <p className="text-sm font-bold text-neutral-400">번호 해석</p>
            <div className="mt-5 space-y-3">
              {(result?.numbers ?? []).map((num) => (
                <div
                  key={`tone-${num}`}
                  className="flex items-center justify-between rounded-2xl bg-[#f5f5f7] px-4 py-3"
                >
                  <span className="font-black">{num}</span>
                  <span className="text-sm font-bold text-neutral-500">
                    {getNumberTone(num)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-10">
        <div className="rounded-[2.5rem] border border-dashed border-black/10 bg-white/60 p-8 text-center">
          <p className="text-sm font-bold text-neutral-400">Ad Space</p>
          <p className="mt-2 text-sm font-semibold text-neutral-500">
            광고 삽입 예정 영역입니다.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-5 pb-16 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-[2.5rem] bg-white p-7 shadow-sm ring-1 ring-black/5">
          <p className="text-sm font-bold text-neutral-400">History</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.06em]">
            최근 생성 기록
          </h2>
          <p className="mt-3 text-sm font-semibold leading-7 text-neutral-600">
            이 기록은 브라우저에만 저장됩니다. 회원가입이나 서버 저장은
            사용하지 않습니다.
          </p>
        </div>

        <div className="grid gap-3">
          {history.length === 0 ? (
            <div className="rounded-[2rem] bg-white p-6 text-sm font-semibold text-neutral-500 shadow-sm ring-1 ring-black/5">
              아직 저장된 기록이 없습니다. 새 번호를 생성하면 이곳에 최근 결과가
              표시됩니다.
            </div>
          ) : (
            history.map((item) => (
              <button
                key={item.id}
                onClick={() => setResult(item)}
                className="rounded-[2rem] bg-white p-5 text-left shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap gap-2">
                    {item.numbers.map((num) => (
                      <span
                        key={`${item.id}-${num}`}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-xs font-black text-white"
                      >
                        {num}
                      </span>
                    ))}
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f5f7] text-xs font-black ring-1 ring-black/10">
                      +{item.bonus}
                    </span>
                  </div>

                  <div className="text-sm font-bold text-neutral-400">
                    {formatTime(item.createdAt)}
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </section>

      <section className="bg-black px-5 py-14 text-center text-white">
        <h2 className="text-4xl font-black tracking-[-0.06em]">
          오늘의 흐름도 확인해보세요.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm font-semibold leading-7 text-white/60">
          랜덤 조합이 빠른 선택이라면, 오늘의 번호는 매일 다시 확인하기 좋은
          흐름형 리포트입니다.
        </p>

        <Link
          href="/today"
          className="mt-7 inline-block rounded-full bg-white px-7 py-4 text-base font-bold text-black"
        >
          오늘의 번호 보기
        </Link>
      </section>

      <footer className="border-t border-black/5 bg-[#f5f5f7]">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-xs font-semibold text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 해말아. All rights reserved.</p>

          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="hover:text-black">
              개인정보처리방침
            </Link>
            <Link href="/contact" className="hover:text-black">
              문의
            </Link>
            <Link href="/dream-lotto" className="hover:text-black">
              꿈해몽
            </Link>
            <Link href="/today" className="hover:text-black">
              오늘
            </Link>
            <Link href="/random" className="hover:text-black">
              랜덤
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}