"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import ShareResultButtons from "../components/ShareResultButtons";

type DreamResult = {
  id: string;
  dream: string;
  numbers: number[];
  bonus: number;
  symbol: string;
  emotion: string;
  theme: string;
  score: number;
  summary: string;
  detail: string;
  createdAt: string;
};

const STORAGE_KEY = "haemala_dream_history_v2";

const symbolRules = [
  {
    keys: ["물", "바다", "강", "비", "파도", "수영"],
    symbol: "흐름",
    emotion: "정화",
    theme: "감정이 정리되는 꿈",
    base: [3, 8, 12, 19, 27, 36],
  },
  {
    keys: ["돈", "지갑", "금", "보석", "동전", "복권"],
    symbol: "기회",
    emotion: "기대",
    theme: "가능성이 커지는 꿈",
    base: [7, 11, 18, 24, 33, 42],
  },
  {
    keys: ["불", "화재", "태양", "빛", "촛불"],
    symbol: "전환",
    emotion: "에너지",
    theme: "변화가 강한 꿈",
    base: [1, 9, 16, 25, 34, 45],
  },
  {
    keys: ["하늘", "날다", "비행", "새", "구름"],
    symbol: "확장",
    emotion: "자유",
    theme: "시야가 넓어지는 꿈",
    base: [5, 14, 21, 28, 37, 44],
  },
  {
    keys: ["집", "방", "문", "가족", "침대"],
    symbol: "안정",
    emotion: "회복",
    theme: "내면을 정돈하는 꿈",
    base: [4, 10, 17, 22, 31, 40],
  },
  {
    keys: ["길", "차", "버스", "기차", "여행", "역"],
    symbol: "이동",
    emotion: "선택",
    theme: "방향을 고르는 꿈",
    base: [2, 13, 20, 29, 35, 43],
  },
  {
    keys: ["사람", "친구", "연인", "아이", "아기", "동물"],
    symbol: "관계",
    emotion: "연결",
    theme: "관계의 신호가 있는 꿈",
    base: [6, 15, 23, 30, 38, 41],
  },
];

function makeSeed(text: string) {
  return Array.from(text).reduce(
    (sum, char, index) => sum + char.charCodeAt(0) * (index + 7),
    173
  );
}

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function pickRule(dream: string) {
  const text = dream.replace(/\s+/g, "").toLowerCase();

  return (
    symbolRules.find((rule) => rule.keys.some((key) => text.includes(key))) ?? {
      keys: [],
      symbol: "직감",
      emotion: "탐색",
      theme: "의미를 찾아가는 꿈",
      base: [6, 12, 19, 26, 32, 39],
    }
  );
}

function createNumbers(dream: string, base: number[]) {
  const seed = makeSeed(dream);
  const selected = new Set<number>();

  base.forEach((num, index) => {
    const shift = Math.floor(seededRandom(seed + index * 13) * 11);
    selected.add(((num + shift - 1) % 45) + 1);
  });

  let cursor = seed;

  while (selected.size < 6) {
    cursor += 23;
    selected.add(Math.floor(seededRandom(cursor) * 45) + 1);
  }

  const numbers = Array.from(selected).slice(0, 6).sort((a, b) => a - b);
  const pool = Array.from({ length: 45 }, (_, i) => i + 1).filter(
    (n) => !numbers.includes(n)
  );

  const bonus = pool[Math.floor(seededRandom(seed + 911) * pool.length)];

  return { numbers, bonus };
}

function getScore(numbers: number[]) {
  const sum = numbers.reduce((a, b) => a + b, 0);
  const odd = numbers.filter((n) => n % 2 === 1).length;
  const range = new Set(numbers.map((n) => Math.ceil(n / 9))).size;

  let score = 45;
  if (sum >= 95 && sum <= 185) score += 25;
  if (odd >= 2 && odd <= 4) score += 18;
  if (range >= 4) score += 12;

  return Math.min(score, 100);
}

function generateDreamResult(dream: string): DreamResult {
  const rule = pickRule(dream);
  const { numbers, bonus } = createNumbers(dream, rule.base);
  const score = getScore(numbers);

  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    dream,
    numbers,
    bonus,
    symbol: rule.symbol,
    emotion: rule.emotion,
    theme: rule.theme,
    score,
    summary: `${rule.symbol}의 상징이 중심에 있는 꿈입니다.`,
    detail: `이 꿈은 '${rule.symbol}'과 '${rule.emotion}'의 흐름으로 해석됩니다. 번호는 꿈의 핵심 단어, 문장 길이, 문자 패턴, 구간 균형을 함께 반영해 생성했습니다. 결과는 당첨 예측이 아니라 꿈을 번호 리포트로 바꾸는 오락·참고용 콘텐츠입니다.`,
    createdAt: new Date().toISOString(),
  };
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function getNumberMeaning(num: number) {
  if (num <= 9) return "시작";
  if (num <= 18) return "전개";
  if (num <= 27) return "중심";
  if (num <= 36) return "확장";
  return "완성";
}

export default function DreamLottoPage() {
  const [dream, setDream] = useState("");
  const [result, setResult] = useState<DreamResult | null>(null);
  const [history, setHistory] = useState<DreamResult[]>([]);
  const [copied, setCopied] = useState(false);

  const canGenerate = dream.trim().length >= 2;

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved).slice(0, 5);
      setHistory(parsed);
      if (parsed[0]) {
        setResult(parsed[0]);
        setDream(parsed[0].dream);
      }
    } catch {
      setHistory([]);
    }
  }, []);

  const stats = useMemo(() => {
    if (!result) return null;

    const sum = result.numbers.reduce((a, b) => a + b, 0);
    const odd = result.numbers.filter((n) => n % 2 === 1).length;
    const even = 6 - odd;
    const low = result.numbers.filter((n) => n <= 22).length;
    const high = 6 - low;

    return { sum, odd, even, low, high };
  }, [result]);

  function handleGenerate() {
    if (!canGenerate) return;

    const next = generateDreamResult(dream.trim());
    setResult(next);
    setCopied(false);

    const nextHistory = [next, ...history].slice(0, 5);
    setHistory(nextHistory);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextHistory));
  }

  async function copyResult() {
    if (!result) return;

    const text = [
      "해말아 꿈 해몽 번호 리포트",
      `꿈: ${result.dream}`,
      `상징: ${result.symbol}`,
      `감정: ${result.emotion}`,
      `추천 번호: ${result.numbers.join(", ")}`,
      `보너스: ${result.bonus}`,
      "https://www.haemala.com/dream-lotto",
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
            <Link href="/dream-lotto" className="text-black">
              꿈해몽
            </Link>
            <Link href="/today" className="hover:text-black">
              오늘
            </Link>
            <Link href="/random" className="hover:text-black">
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
        <p className="text-sm font-bold text-neutral-500">Dream Report</p>

        <h1 className="mt-4 text-6xl font-black leading-[0.92] tracking-[-0.08em] sm:text-7xl">
          꿈을 읽고,
          <br />
          번호로 남기다.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg font-semibold leading-8 tracking-[-0.03em] text-neutral-600">
          기억나는 장면을 적으면 꿈의 상징, 감정, 흐름을 분석해 번호
          리포트로 정리합니다.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-5 pb-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2.75rem] bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-8">
          <p className="text-sm font-bold text-neutral-400">Input</p>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.06em]">
            꿈의 장면을 적어주세요.
          </h2>

          <textarea
            value={dream}
            onChange={(e) => setDream(e.target.value)}
            placeholder="예: 바다 위를 걷다가 하늘로 날아오르는 꿈을 꿨어요."
            className="mt-6 min-h-48 w-full resize-none rounded-[2rem] border border-black/5 bg-[#f5f5f7] p-5 text-base font-semibold leading-7 outline-none transition placeholder:text-neutral-400 focus:bg-white focus:ring-2 focus:ring-black"
          />

          <div className="mt-4 flex items-center justify-between text-xs font-bold text-neutral-400">
            <span>장소, 인물, 감정이 들어가면 더 좋습니다.</span>
            <span>{dream.trim().length}자</span>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!canGenerate}
            className="mt-6 w-full rounded-full bg-black px-7 py-4 text-base font-bold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:hover:translate-y-0"
          >
            꿈 해몽 번호 생성
          </button>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[2rem] bg-[#f5f5f7] p-5">
              <p className="text-sm font-bold text-neutral-400">Private</p>
              <p className="mt-2 text-sm font-semibold leading-7 text-neutral-600">
                입력한 꿈은 서버에 저장하지 않습니다.
              </p>
            </div>

            <div className="rounded-[2rem] bg-[#f5f5f7] p-5">
              <p className="text-sm font-bold text-neutral-400">Archive</p>
              <p className="mt-2 text-sm font-semibold leading-7 text-neutral-600">
                최근 결과는 내 브라우저에만 남습니다.
              </p>
            </div>
          </div>
        </div>

        <div
          id="dream-result-card"
          className="rounded-[2.75rem] bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-10"
        >
          {!result ? (
            <div className="flex min-h-[560px] flex-col items-center justify-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-black text-2xl font-black text-white">
                꿈
              </div>

              <h2 className="mt-6 text-4xl font-black tracking-[-0.06em]">
                리포트가 여기에 표시됩니다.
              </h2>

              <p className="mt-4 max-w-md text-sm font-semibold leading-7 text-neutral-600">
                꿈을 입력하면 상징, 감정, 번호, 해석 리포트가 한 번에
                생성됩니다.
              </p>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-bold text-neutral-400">
                    {result.theme}
                  </p>
                  <h2 className="mt-2 text-4xl font-black tracking-[-0.06em]">
                    {result.symbol}의 꿈
                  </h2>
                </div>

                <div className="rounded-full bg-[#f5f5f7] px-4 py-2 text-sm font-black text-neutral-600">
                  해석 {result.score}/100
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-2 sm:gap-3">
                {result.numbers.map((num) => (
                  <div
                    key={num}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-lg font-black text-white shadow-sm sm:h-16 sm:w-16 sm:text-xl"
                  >
                    {num}
                  </div>
                ))}

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f5f5f7] text-lg font-black text-black ring-1 ring-black/10 sm:h-16 sm:w-16 sm:text-xl">
                  +{result.bonus}
                </div>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-[1.5rem] bg-[#f5f5f7] p-5">
                  <p className="text-xs font-bold text-neutral-400">상징</p>
                  <p className="mt-2 text-2xl font-black">{result.symbol}</p>
                </div>
                <div className="rounded-[1.5rem] bg-[#f5f5f7] p-5">
                  <p className="text-xs font-bold text-neutral-400">감정</p>
                  <p className="mt-2 text-2xl font-black">{result.emotion}</p>
                </div>
                <div className="rounded-[1.5rem] bg-[#f5f5f7] p-5">
                  <p className="text-xs font-bold text-neutral-400">합계</p>
                  <p className="mt-2 text-2xl font-black">{stats?.sum}</p>
                </div>
              </div>

              <div className="mt-8 rounded-[2rem] bg-[#1d1d1f] p-6 text-white">
                <p className="text-sm font-bold text-white/40">Report</p>
                <h3 className="mt-3 text-2xl font-black tracking-[-0.05em]">
                  {result.summary}
                </h3>
                <p className="mt-4 text-sm font-semibold leading-7 text-white/65">
                  {result.detail}
                </p>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button
                  onClick={copyResult}
                  className="rounded-full bg-black px-7 py-4 text-base font-bold text-white transition hover:-translate-y-0.5"
                >
                  {copied ? "복사 완료" : "결과 복사"}
                </button>

                <Link
                  href="/today"
                  className="rounded-full bg-[#f5f5f7] px-7 py-4 text-center text-base font-bold text-black ring-1 ring-black/5 transition hover:-translate-y-0.5"
                >
                  오늘 번호도 보기
                </Link>
              </div>

              <ShareResultButtons
                targetId="dream-result-card"
                fileName="haemala-dream-result"
                shareText={`해말아 꿈 해몽 번호 리포트\n상징: ${
                  result.symbol
                }\n감정: ${result.emotion}\n추천 번호: ${result.numbers.join(
                  ", "
                )}\n보너스: ${result.bonus}`}
              />
            </>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-10">
        <div className="rounded-[2.5rem] border border-dashed border-black/10 bg-white/60 p-8 text-center">
          <p className="text-sm font-bold text-neutral-400">Ad Space</p>
          <p className="mt-2 text-sm font-semibold text-neutral-500">
            광고 삽입 예정 영역입니다.
          </p>
        </div>
      </section>

      {result && (
        <section className="mx-auto max-w-6xl px-5 pb-10">
          <div className="rounded-[2.5rem] bg-white p-7 shadow-sm ring-1 ring-black/5">
            <p className="text-sm font-bold text-neutral-400">
              Number Meaning
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {result.numbers.map((num) => (
                <div
                  key={`meaning-${num}`}
                  className="flex items-center justify-between rounded-2xl bg-[#f5f5f7] px-5 py-4"
                >
                  <span className="text-xl font-black">{num}</span>
                  <span className="text-sm font-bold text-neutral-500">
                    {getNumberMeaning(num)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto grid max-w-6xl gap-5 px-5 pb-16 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-[2.5rem] bg-[#1d1d1f] p-7 text-white shadow-sm">
          <p className="text-sm font-bold text-white/40">Dream Archive</p>
          <h2 className="mt-4 text-4xl font-black leading-[1] tracking-[-0.07em]">
            최근 꿈을
            <br />
            다시 열어보기.
          </h2>
          <p className="mt-5 text-sm font-semibold leading-7 text-white/62">
            결과는 브라우저에만 저장됩니다. 회원가입이나 서버 저장 없이 최근
            꿈 리포트를 다시 확인할 수 있습니다.
          </p>
        </div>

        <div className="grid gap-3">
          {history.length === 0 ? (
            <div className="rounded-[2rem] bg-white p-6 text-sm font-semibold text-neutral-500 shadow-sm ring-1 ring-black/5">
              아직 저장된 꿈 리포트가 없습니다.
            </div>
          ) : (
            history.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setResult(item);
                  setDream(item.dream);
                  setCopied(false);
                }}
                className="rounded-[2rem] bg-white p-5 text-left shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-bold text-neutral-400">
                      {formatTime(item.createdAt)}
                    </p>
                    <h3 className="mt-1 text-xl font-black tracking-[-0.04em]">
                      {item.symbol} · {item.emotion}
                    </h3>
                    <p className="mt-2 line-clamp-1 text-sm font-semibold text-neutral-500">
                      {item.dream}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {item.numbers.map((num) => (
                      <span
                        key={`${item.id}-${num}`}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-xs font-black text-white"
                      >
                        {num}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </section>

      <section className="bg-black px-5 py-14 text-center text-white">
        <h2 className="text-4xl font-black tracking-[-0.06em]">
          꿈이 없다면,
          <br />
          오늘의 흐름으로.
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm font-semibold leading-7 text-white/60">
          꿈 해몽 번호는 가장 개인적인 리포트입니다. 더 빠르게 보고 싶다면
          오늘의 번호나 랜덤 번호를 확인해보세요.
        </p>

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/today"
            className="rounded-full bg-white px-7 py-4 text-base font-bold text-black"
          >
            오늘의 번호
          </Link>
          <Link
            href="/random"
            className="rounded-full bg-white/10 px-7 py-4 text-base font-bold text-white ring-1 ring-white/15"
          >
            랜덤 번호
          </Link>
        </div>
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