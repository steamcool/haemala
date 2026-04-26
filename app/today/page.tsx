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

const STORAGE_KEY = "haemala_today_history_v2";

const themes = [
  {
    theme: "전환의 흐름",
    keyword: "변화",
    message: "오늘은 작은 선택 하나가 전체 흐름을 바꾸기 좋은 날입니다.",
  },
  {
    theme: "안정의 흐름",
    keyword: "균형",
    message: "크게 흔들기보다 차분하게 정돈된 조합이 어울리는 날입니다.",
  },
  {
    theme: "확장의 흐름",
    keyword: "기회",
    message: "새로운 시도와 연결되는 숫자 흐름이 강하게 잡힙니다.",
  },
  {
    theme: "집중의 흐름",
    keyword: "선택",
    message: "많은 것보다 핵심 하나에 집중하기 좋은 날입니다.",
  },
  {
    theme: "회복의 흐름",
    keyword: "정리",
    message: "복잡한 생각을 덜어내고 다시 정돈하기 좋은 흐름입니다.",
  },
  {
    theme: "상승의 흐름",
    keyword: "진입",
    message: "망설이던 일을 작게 시작하기 좋은 흐름입니다.",
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

function hashString(input: string) {
  let h = 2166136261;

  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }

  return h >>> 0;
}

function mulberry32(seed: number) {
  return function random() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(items: T[], random: () => number) {
  const arr = [...items];

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

function scoreNumbers(numbers: number[]) {
  const sum = numbers.reduce((a, b) => a + b, 0);
  const odd = numbers.filter((n) => n % 2 === 1).length;
  const low = numbers.filter((n) => n <= 22).length;
  const ranges = new Set(numbers.map((n) => Math.ceil(n / 9))).size;
  const gaps = numbers.slice(1).map((n, i) => n - numbers[i]);
  const closePairs = gaps.filter((g) => g <= 2).length;

  let score = 45;

  if (sum >= 95 && sum <= 185) score += 20;
  else if (sum >= 80 && sum <= 205) score += 10;
  else score -= 8;

  if (odd >= 2 && odd <= 4) score += 18;
  else score += 6;

  if (low >= 2 && low <= 4) score += 14;
  else score += 5;

  if (ranges >= 4) score += 14;
  else if (ranges === 3) score += 7;
  else score -= 6;

  if (closePairs <= 1) score += 6;
  else score -= 4;

  return Math.max(1, Math.min(100, score));
}

function generateTodayResult(): TodayResult {
  const dateKey = getDateKey();
  const themeSeed = hashString(`haemala-theme-${dateKey}`);
  const selectedTheme = themes[themeSeed % themes.length];

  const seed = hashString(`haemala-today-${dateKey}-${selectedTheme.keyword}`);
  const random = mulberry32(seed);

  let best: number[] = [];
  let bestScore = -999;

  for (let attempt = 0; attempt < 160; attempt++) {
    const localRandom = mulberry32(hashString(`${seed}-${attempt}-${random()}`));
    const candidate = shuffle(
      Array.from({ length: 45 }, (_, i) => i + 1),
      localRandom
    )
      .slice(0, 6)
      .sort((a, b) => a - b);

    const score = scoreNumbers(candidate) + localRandom() * 4;

    if (score > bestScore) {
      best = candidate;
      bestScore = score;
    }
  }

  const bonusPool = Array.from({ length: 45 }, (_, i) => i + 1).filter(
    (n) => !best.includes(n)
  );

  const bonusRandom = mulberry32(hashString(`bonus-${dateKey}`));
  const bonus = shuffle(bonusPool, bonusRandom)[0];

  return {
    dateKey,
    numbers: best,
    bonus,
    theme: selectedTheme.theme,
    keyword: selectedTheme.keyword,
    score: scoreNumbers(best),
    message: selectedTheme.message,
    createdAt: new Date().toISOString(),
  };
}

function formatKoreanDate(dateKey: string) {
  const [year, month, day] = dateKey.split("-");
  return `${year}년 ${Number(month)}월 ${Number(day)}일`;
}

function getNumberTone(num: number) {
  if (num <= 9) return "시작";
  if (num <= 18) return "전개";
  if (num <= 27) return "중심";
  if (num <= 36) return "확장";
  return "완성";
}

export default function TodayPage() {
  const [result, setResult] = useState<TodayResult | null>(null);
  const [history, setHistory] = useState<TodayResult[]>([]);
  const [copied, setCopied] = useState(false);
  const [revealed, setRevealed] = useState(0);

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

  useEffect(() => {
    if (!result) return;

    setRevealed(0);
    const timers = Array.from({ length: 7 }, (_, index) =>
      window.setTimeout(() => setRevealed(index + 1), 100 * index + 120)
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [result]);

  const report = useMemo(() => {
    if (!result) return null;

    const sum = result.numbers.reduce((a, b) => a + b, 0);
    const odd = result.numbers.filter((n) => n % 2 === 1).length;
    const even = 6 - odd;
    const low = result.numbers.filter((n) => n <= 22).length;
    const high = 6 - low;
    const ranges = new Set(result.numbers.map((n) => Math.ceil(n / 9))).size;

    return {
      sum,
      odd,
      even,
      low,
      high,
      ranges,
      summary: `오늘의 키워드는 '${result.keyword}'입니다.`,
      detail: `합계 ${sum}, 홀짝 ${odd}:${even}, 저고 ${low}:${high}, 번호대 ${ranges}구간 분산으로 구성되었습니다. 오늘 날짜를 기준으로 고정되는 조합이며, 새로고침해도 같은 리포트가 유지됩니다.`,
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
      `메시지: ${result.message}`,
      "https://www.haemala.com/today",
    ].join("\n");

    await navigator.clipboard.writeText(text);
    setCopied(true);
  }

  return (
    <main className="min-h-screen bg-[#0b0b0c] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0b0c]/80 backdrop-blur-2xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          <Link href="/" className="text-lg font-black tracking-[-0.04em]">
            해말아
          </Link>

          <nav className="hidden gap-8 text-sm font-semibold text-white/50 sm:flex">
            <Link href="/dream-lotto" className="hover:text-white">
              꿈해몽
            </Link>
            <Link href="/today" className="text-[#d7b46a]">
              오늘
            </Link>
            <Link href="/random" className="hover:text-white">
              랜덤
            </Link>
          </nav>

          <Link
            href="/random"
            className="rounded-full bg-white px-5 py-2.5 text-sm font-black text-black"
          >
            랜덤
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-white/10 blur-[130px]" />
        <div className="absolute right-0 top-36 h-[380px] w-[380px] rounded-full bg-[#d7b46a]/20 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-16 sm:pt-20">
          <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-black tracking-[0.18em] text-[#d7b46a]">
            DAILY FIXED REPORT
          </p>

          <h1 className="mt-7 max-w-5xl text-6xl font-black leading-[0.9] tracking-[-0.09em] sm:text-7xl lg:text-8xl">
            오늘의 흐름을
            <br />
            하나의 리포트로.
          </h1>

          <p className="mt-7 max-w-2xl text-lg font-medium leading-8 tracking-[-0.03em] text-white/55">
            날짜 기준으로 하루에 하나만 고정되는 번호 리포트입니다. 오늘 다시
            열어도 같은 결과가 유지되고, 내일은 새로운 흐름이 표시됩니다.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div
          id="today-result-card"
          className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white p-5 text-black shadow-2xl shadow-black/40 sm:p-8"
        >
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-[#d7b46a]/30 blur-[90px]" />

          <div className="relative rounded-[2rem] bg-[#111113] p-6 text-white sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-black tracking-[0.16em] text-[#d7b46a]">
                  {result ? formatKoreanDate(result.dateKey) : "오늘"}
                </p>
                <h2 className="mt-3 text-5xl font-black leading-[0.95] tracking-[-0.08em]">
                  {result?.theme ?? "오늘의 흐름"}
                </h2>
              </div>

              <div className="rounded-full bg-white px-4 py-2 text-sm font-black text-black">
                흐름 {result?.score ?? 0}/100
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-2.5 sm:gap-3">
              {(result?.numbers ?? []).map((num, index) => (
                <div
                  key={num}
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl text-xl font-black shadow-lg transition duration-500 sm:h-20 sm:w-20 sm:text-2xl ${
                    revealed > index
                      ? "translate-y-0 bg-white text-black opacity-100 shadow-black/30"
                      : "translate-y-4 bg-white/10 text-white/0 opacity-0"
                  }`}
                >
                  {num}
                </div>
              ))}

              {result && (
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl border border-[#d7b46a]/40 bg-[#d7b46a]/15 text-xl font-black text-[#d7b46a] transition duration-500 sm:h-20 sm:w-20 sm:text-2xl ${
                    revealed > 6 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`}
                >
                  +{result.bonus}
                </div>
              )}
            </div>

            <div className="mt-8 rounded-[1.75rem] bg-white p-6 text-black">
              <p className="text-xs font-black tracking-[0.16em] text-black/35">
                TODAY KEYWORD
              </p>
              <h3 className="mt-3 text-5xl font-black tracking-[-0.08em]">
                {result?.keyword}
              </h3>
              <p className="mt-4 text-sm font-semibold leading-7 text-black/58">
                {result?.message}
              </p>
            </div>
          </div>

          <div className="relative mt-5 grid gap-3 sm:grid-cols-4">
            <div className="rounded-[1.5rem] bg-black p-5 text-white">
              <p className="text-xs font-black text-white/35">합계</p>
              <p className="mt-2 text-3xl font-black">{report?.sum ?? 0}</p>
            </div>
            <div className="rounded-[1.5rem] bg-black p-5 text-white">
              <p className="text-xs font-black text-white/35">홀짝</p>
              <p className="mt-2 text-3xl font-black">
                {report?.odd ?? 0}:{report?.even ?? 0}
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-black p-5 text-white">
              <p className="text-xs font-black text-white/35">저고</p>
              <p className="mt-2 text-3xl font-black">
                {report?.low ?? 0}:{report?.high ?? 0}
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-black p-5 text-white">
              <p className="text-xs font-black text-white/35">분산</p>
              <p className="mt-2 text-3xl font-black">
                {report?.ranges ?? 0}구간
              </p>
            </div>
          </div>

          <div className="relative mt-5 rounded-[2rem] bg-[#d7b46a] p-6 text-black">
            <p className="text-xs font-black tracking-[0.16em] text-black/40">
              DAILY INTERPRETATION
            </p>
            <h3 className="mt-3 text-3xl font-black tracking-[-0.06em]">
              {report?.summary}
            </h3>
            <p className="mt-4 text-sm font-semibold leading-7 text-black/60">
              {report?.detail}
            </p>
          </div>

          <div className="relative mt-6 grid gap-3 sm:grid-cols-2">
            <button
              onClick={copyResult}
              className="rounded-full bg-black px-7 py-4 text-base font-black text-white transition hover:-translate-y-0.5"
            >
              {copied ? "복사 완료" : "결과 복사"}
            </button>

            <Link
              href="/dream-lotto"
              className="rounded-full bg-black/5 px-7 py-4 text-center text-base font-black text-black transition hover:-translate-y-0.5"
            >
              꿈 해몽 번호 보기
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
              }\n오늘의 키워드: ${result.keyword}\n${result.message}`}
            />
          )}
        </div>

        <aside className="grid gap-5">
          <div className="rounded-[2.5rem] bg-[#d7b46a] p-8 text-black">
            <p className="text-sm font-black tracking-[0.16em] text-black/40">
              DAILY LOOP
            </p>
            <h2 className="mt-4 text-5xl font-black leading-[0.95] tracking-[-0.08em]">
              하루에 한 번,
              <br />
              다시 확인.
            </h2>
            <p className="mt-5 text-sm font-bold leading-7 text-black/55">
              오늘의 번호는 날짜 기준으로 고정됩니다. 매일 새 리포트가 생기므로
              재방문 구조를 만들기에 가장 좋은 페이지입니다.
            </p>
          </div>

          <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.05] p-7">
            <p className="text-sm font-black tracking-[0.16em] text-[#d7b46a]">
              RECENT 7 DAYS
            </p>
            <h3 className="mt-3 text-4xl font-black tracking-[-0.07em]">
              방문 기록
            </h3>

            <div className="mt-6 space-y-3">
              {history.length === 0 ? (
                <p className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-sm font-semibold text-white/45">
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
                    className="w-full rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-left transition hover:-translate-y-0.5 hover:bg-white/[0.08]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-black text-white/35">
                          {formatKoreanDate(item.dateKey)}
                        </p>
                        <p className="mt-1 text-xl font-black tracking-[-0.04em]">
                          {item.keyword}
                        </p>
                      </div>
                      <p className="rounded-full bg-white px-3 py-1 text-xs font-black text-black">
                        {item.score}
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {item.numbers.map((num) => (
                        <span
                          key={`${item.dateKey}-${num}`}
                          className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-xs font-black text-black"
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

      {result && (
        <section className="mx-auto max-w-7xl px-5 pb-10">
          <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.05] p-7">
            <p className="text-sm font-black tracking-[0.16em] text-[#d7b46a]">
              NUMBER TONE
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {result.numbers.map((num) => (
                <div
                  key={`tone-${num}`}
                  className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/[0.04] px-5 py-4"
                >
                  <span className="text-2xl font-black">{num}</span>
                  <span className="text-sm font-black text-white/45">
                    {getNumberTone(num)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-5 pb-10">
        <div className="rounded-[2.5rem] border border-dashed border-white/15 bg-white/[0.04] p-8 text-center">
          <p className="text-sm font-black text-white/35">SPONSORED AREA</p>
          <p className="mt-2 text-sm font-semibold text-white/45">
            애드센스 승인 후 자연스럽게 삽입할 수 있는 광고 영역입니다.
          </p>
        </div>
      </section>

      <section className="bg-[#d7b46a] px-5 py-14 text-center text-black">
        <h2 className="text-5xl font-black tracking-[-0.08em]">
          꿈이 기억난다면,
          <br />
          더 개인적인 리포트로.
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-sm font-bold leading-7 text-black/55">
          오늘의 번호가 매일 보는 흐름이라면, 꿈 해몽 번호는 사용자의 이야기를
          반영하는 가장 강한 진입점입니다.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/dream-lotto"
            className="rounded-full bg-black px-8 py-4 text-base font-black text-white"
          >
            꿈 해몽 번호 보기
          </Link>
          <Link
            href="/random"
            className="rounded-full bg-black/10 px-8 py-4 text-base font-black text-black"
          >
            랜덤 번호
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#0b0b0c]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-xs font-semibold text-white/38 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 해말아. All rights reserved.</p>

          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="hover:text-white">
              개인정보처리방침
            </Link>
            <Link href="/contact" className="hover:text-white">
              문의
            </Link>
            <Link href="/dream-lotto" className="hover:text-white">
              꿈해몽
            </Link>
            <Link href="/today" className="hover:text-white">
              오늘
            </Link>
            <Link href="/random" className="hover:text-white">
              랜덤
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}