"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import ShareResultButtons from "../components/ShareResultButtons";

type TodayResult = {
  dateKey: string;
  numbers: number[];
  bonus: number;
  theme: string;
  keyword: string;
  score: number;
  message: string;
  createdAt: string;
};

const STORAGE_KEY = "haemala_today_history_v1";

const themes = [
  {
    theme: "전환의 흐름",
    keyword: "변화",
    message: "작은 선택이 흐름을 바꾸기 좋은 날입니다.",
  },
  {
    theme: "안정의 흐름",
    keyword: "균형",
    message: "크게 흔들리기보다 차분한 조합이 어울리는 날입니다.",
  },
  {
    theme: "확장의 흐름",
    keyword: "기회",
    message: "새로운 시도와 연결되는 숫자 흐름이 강조됩니다.",
  },
  {
    theme: "집중의 흐름",
    keyword: "선택",
    message: "많은 것보다 핵심 하나에 집중하기 좋은 날입니다.",
  },
  {
    theme: "회복의 흐름",
    keyword: "정리",
    message: "복잡한 생각을 덜어내고 다시 정돈하기 좋은 날입니다.",
  },
];

function getDateKey(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function makeSeed(text: string) {
  return text.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function generateTodayResult(): TodayResult {
  const dateKey = getDateKey();
  const seed = makeSeed(dateKey);

  const pool = Array.from({ length: 45 }, (_, i) => i + 1);
  const picked: number[] = [];
  let cursor = seed;

  while (picked.length < 6) {
    cursor += 17;
    const index = Math.floor(seededRandom(cursor) * pool.length);
    picked.push(pool[index]);
    pool.splice(index, 1);
  }

  picked.sort((a, b) => a - b);

  cursor += 31;
  const bonus = pool[Math.floor(seededRandom(cursor) * pool.length)];

  const sum = picked.reduce((a, b) => a + b, 0);
  const oddCount = picked.filter((n) => n % 2 === 1).length;
  const rangeCount = new Set(picked.map((n) => Math.ceil(n / 9))).size;

  let score = 50;
  if (sum >= 100 && sum <= 180) score += 20;
  if (oddCount >= 2 && oddCount <= 4) score += 15;
  if (rangeCount >= 4) score += 15;

  const selectedTheme = themes[seed % themes.length];

  return {
    dateKey,
    numbers: picked,
    bonus,
    theme: selectedTheme.theme,
    keyword: selectedTheme.keyword,
    score: Math.min(score, 100),
    message: selectedTheme.message,
    createdAt: new Date().toISOString(),
  };
}

function formatKoreanDate(dateKey: string) {
  const [year, month, day] = dateKey.split("-");
  return `${year}년 ${Number(month)}월 ${Number(day)}일`;
}

export default function TodayPage() {
  const [result, setResult] = useState<TodayResult | null>(null);
  const [history, setHistory] = useState<TodayResult[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const today = generateTodayResult();
    setResult(today);

    const saved = window.localStorage.getItem(STORAGE_KEY);
    let list: TodayResult[] = [];

    if (saved) {
      try {
        list = JSON.parse(saved);
      } catch {
        list = [];
      }
    }

    const exists = list.some((item) => item.dateKey === today.dateKey);
    const nextHistory = exists ? list : [today, ...list].slice(0, 7);

    setHistory(nextHistory);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextHistory));
  }, []);

  const report = useMemo(() => {
    if (!result) return null;

    const sum = result.numbers.reduce((a, b) => a + b, 0);
    const odd = result.numbers.filter((n) => n % 2 === 1).length;
    const even = 6 - odd;
    const low = result.numbers.filter((n) => n <= 22).length;
    const high = 6 - low;

    return {
      sum,
      odd,
      even,
      low,
      high,
      summary: `오늘의 키워드는 '${result.keyword}'입니다.`,
      detail: `합계 ${sum}, 홀짝 ${odd}:${even}, 저고 ${low}:${high} 구성입니다. 한쪽으로 과하게 치우치지 않고, 오늘의 흐름에 맞춰 차분하게 분산된 조합입니다.`,
    };
  }, [result]);

  async function copyResult() {
    if (!result) return;

    const text = [
      "해말아 오늘의 번호 리포트",
      `날짜: ${formatKoreanDate(result.dateKey)}`,
      `추천 번호: ${result.numbers.join(", ")}`,
      `보너스: ${result.bonus}`,
      `오늘의 키워드: ${result.keyword}`,
      "https://www.haemala.com/today",
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
            <Link href="/today" className="text-black">
              오늘
            </Link>
            <Link href="/random" className="hover:text-black">
              랜덤
            </Link>
          </nav>

          <Link
            href="/random"
            className="rounded-full bg-black px-4 py-1.5 text-xs font-bold text-white"
          >
            랜덤
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-14 text-center sm:py-20">
        <p className="text-sm font-bold text-neutral-500">Today Report</p>

        <h1 className="mt-4 text-6xl font-black leading-[0.92] tracking-[-0.08em] sm:text-7xl">
          오늘의 흐름을
          <br />
          번호로.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg font-semibold leading-8 tracking-[-0.03em] text-neutral-600">
          하루에 하나. 오늘 날짜를 기준으로 고정되는 번호 리포트입니다.
          내일 다시 오면 새로운 흐름을 확인할 수 있습니다.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-5 pb-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div
          id="today-result-card"
          className="rounded-[2.75rem] bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-10"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-bold text-neutral-400">
                {result ? formatKoreanDate(result.dateKey) : "오늘"}
              </p>
              <h2 className="mt-2 text-4xl font-black tracking-[-0.06em]">
                {result?.theme ?? "오늘의 흐름"}
              </h2>
            </div>

            <div className="rounded-full bg-[#f5f5f7] px-4 py-2 text-sm font-black text-neutral-600">
              흐름 {result?.score ?? 0}/100
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

          <div className="mt-8 rounded-[2rem] bg-[#f5f5f7] p-6">
            <p className="text-sm font-bold text-neutral-400">Keyword</p>
            <h3 className="mt-3 text-4xl font-black tracking-[-0.06em]">
              {result?.keyword}
            </h3>
            <p className="mt-4 text-sm font-semibold leading-7 text-neutral-600">
              {result?.message}
            </p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-[1.5rem] bg-[#f5f5f7] p-5">
              <p className="text-xs font-bold text-neutral-400">합계</p>
              <p className="mt-2 text-3xl font-black">{report?.sum ?? 0}</p>
            </div>
            <div className="rounded-[1.5rem] bg-[#f5f5f7] p-5">
              <p className="text-xs font-bold text-neutral-400">홀짝</p>
              <p className="mt-2 text-3xl font-black">
                {report?.odd ?? 0}:{report?.even ?? 0}
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-[#f5f5f7] p-5">
              <p className="text-xs font-bold text-neutral-400">저고</p>
              <p className="mt-2 text-3xl font-black">
                {report?.low ?? 0}:{report?.high ?? 0}
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
              onClick={copyResult}
              className="rounded-full bg-black px-7 py-4 text-base font-bold text-white transition hover:-translate-y-0.5"
            >
              {copied ? "복사 완료" : "결과 복사"}
            </button>

            <Link
              href="/random"
              className="rounded-full bg-[#f5f5f7] px-7 py-4 text-center text-base font-bold text-black ring-1 ring-black/5 transition hover:-translate-y-0.5"
            >
              랜덤도 보기
            </Link>
          </div>

          {result && (
            <ShareResultButtons
              targetId="today-result-card"
              fileName="haemala-today-result"
              shareText={`해말아 오늘의 번호 리포트\n날짜: ${formatKoreanDate(
                result.dateKey
              )}\n추천 번호: ${result.numbers.join(", ")}\n보너스: ${
                result.bonus
              }\n오늘의 키워드: ${result.keyword}`}
            />
          )}
        </div>

        <aside className="grid gap-5">
          <div className="rounded-[2.5rem] bg-[#1d1d1f] p-7 text-white shadow-sm">
            <p className="text-sm font-bold text-white/40">Daily Loop</p>
            <h2 className="mt-4 text-4xl font-black leading-[1] tracking-[-0.07em]">
              하루에 한 번,
              <br />
              다시 확인.
            </h2>
            <p className="mt-5 text-sm font-semibold leading-7 text-white/62">
              오늘의 번호는 날짜 기준으로 고정됩니다. 새로고침해도 같은 결과가
              유지되고, 다음 날 새로운 리포트를 확인할 수 있습니다.
            </p>
          </div>

          <div className="rounded-[2.5rem] bg-white p-7 shadow-sm ring-1 ring-black/5">
            <p className="text-sm font-bold text-neutral-400">방문 기록</p>
            <h3 className="mt-3 text-3xl font-black tracking-[-0.06em]">
              최근 7일
            </h3>

            <div className="mt-5 space-y-3">
              {history.length === 0 ? (
                <p className="rounded-2xl bg-[#f5f5f7] p-4 text-sm font-semibold text-neutral-500">
                  기록이 아직 없습니다.
                </p>
              ) : (
                history.map((item) => (
                  <button
                    key={item.dateKey}
                    onClick={() => {
                      setResult(item);
                      setCopied(false);
                    }}
                    className="w-full rounded-2xl bg-[#f5f5f7] p-4 text-left transition hover:-translate-y-0.5"
                  >
                    <p className="text-xs font-bold text-neutral-400">
                      {formatKoreanDate(item.dateKey)}
                    </p>
                    <p className="mt-1 font-black">{item.keyword}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {item.numbers.map((num) => (
                        <span
                          key={`${item.dateKey}-${num}`}
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-[11px] font-black text-white"
                        >
                          {num}
                        </span>
                      ))}
                    </div>
                  </button>
                ))
              )}
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

      <section className="bg-black px-5 py-14 text-center text-white">
        <h2 className="text-4xl font-black tracking-[-0.06em]">
          꿈이 기억난다면,
          <br />
          꿈 해몽 번호로 이어가세요.
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm font-semibold leading-7 text-white/60">
          오늘의 번호가 매일 보는 흐름이라면, 꿈 해몽 번호는 가장 개인적인
          리포트입니다.
        </p>

        <Link
          href="/dream-lotto"
          className="mt-7 inline-block rounded-full bg-white px-7 py-4 text-base font-bold text-black"
        >
          꿈 해몽 번호 보기
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