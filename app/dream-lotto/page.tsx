"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import ShareResultButtons from "../components/ShareResultButtons";
import PremiumAdSlot from "../components/PremiumAdSlot";

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
  insight: string;
  createdAt: string;
};

const STORAGE_KEY = "haemala_dream_history_v4";

const symbolRules = [
  {
    keys: ["물", "바다", "강", "비", "파도", "수영", "홍수"],
    symbol: "흐름",
    emotion: "정화",
    theme: "감정이 정리되는 꿈",
    tone: "오래 남아 있던 감정이 천천히 풀리는 흐름입니다.",
  },
  {
    keys: ["돈", "지갑", "금", "보석", "동전", "복권", "상자"],
    symbol: "기회",
    emotion: "기대",
    theme: "가능성이 커지는 꿈",
    tone: "아직 확정되지 않은 기회가 가까이 있는 흐름입니다.",
  },
  {
    keys: ["불", "화재", "태양", "빛", "촛불", "폭발"],
    symbol: "전환",
    emotion: "에너지",
    theme: "변화가 강한 꿈",
    tone: "머뭇거리던 상태에서 한 번 방향이 바뀌는 흐름입니다.",
  },
  {
    keys: ["하늘", "날다", "비행", "새", "구름", "우주"],
    symbol: "확장",
    emotion: "자유",
    theme: "시야가 넓어지는 꿈",
    tone: "닫혀 있던 생각이 넓어지고 선택지가 늘어나는 흐름입니다.",
  },
  {
    keys: ["집", "방", "문", "가족", "침대", "부엌"],
    symbol: "안정",
    emotion: "회복",
    theme: "내면을 정돈하는 꿈",
    tone: "바깥보다 안쪽을 먼저 정리해야 하는 흐름입니다.",
  },
  {
    keys: ["길", "차", "버스", "기차", "여행", "역", "계단"],
    symbol: "이동",
    emotion: "선택",
    theme: "방향을 고르는 꿈",
    tone: "멈춘 자리보다 다음 방향을 의식하는 흐름입니다.",
  },
  {
    keys: ["사람", "친구", "연인", "아이", "아기", "동물", "강아지", "고양이"],
    symbol: "관계",
    emotion: "연결",
    theme: "관계의 신호가 있는 꿈",
    tone: "혼자만의 선택보다 누군가와의 연결이 강하게 남는 흐름입니다.",
  },
];

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

function normalizeDream(text: string) {
  return text
    .replace(/\s+/g, " ")
    .replace(/[^\u3131-\u318E\uAC00-\uD7A3a-zA-Z0-9\s]/g, "")
    .trim()
    .toLowerCase();
}

function pickRule(dream: string) {
  const text = normalizeDream(dream).replace(/\s+/g, "");

  return (
    symbolRules.find((rule) => rule.keys.some((key) => text.includes(key))) ?? {
      keys: [],
      symbol: "직감",
      emotion: "탐색",
      theme: "의미를 찾아가는 꿈",
      tone: "아직 분명하지 않지만 무의식이 어떤 신호를 붙잡고 있는 흐름입니다.",
    }
  );
}

function shuffle<T>(items: T[], random: () => number) {
  const arr = [...items];

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

function scoreCandidate(numbers: number[]) {
  const sum = numbers.reduce((a, b) => a + b, 0);
  const odd = numbers.filter((n) => n % 2 === 1).length;
  const low = numbers.filter((n) => n <= 22).length;
  const ranges = new Set(numbers.map((n) => Math.ceil(n / 9))).size;
  const gaps = numbers.slice(1).map((n, i) => n - numbers[i]);
  const closePairs = gaps.filter((g) => g <= 2).length;

  let score = 42;

  if (sum >= 95 && sum <= 185) score += 20;
  else if (sum >= 80 && sum <= 205) score += 12;
  else score -= 10;

  if (odd >= 2 && odd <= 4) score += 18;
  else score += 5;

  if (low >= 2 && low <= 4) score += 14;
  else score += 4;

  if (ranges >= 4) score += 16;
  else if (ranges === 3) score += 8;
  else score -= 8;

  if (closePairs <= 1) score += 8;
  else score -= 8;

  return Math.max(1, Math.min(100, score));
}

function generateNumbers(dream: string, symbol: string, emotion: string) {
  const normalized = normalizeDream(dream);
  const today = new Date().toISOString().slice(0, 10);

  const entropy = `${normalized}|${symbol}|${emotion}|${today}|${normalized.length}`;
  const seed = hashString(entropy);
  const random = mulberry32(seed);

  let best: number[] = [];
  let bestScore = -999;

  for (let attempt = 0; attempt < 180; attempt++) {
    const localRandom = mulberry32(hashString(`${entropy}|${attempt}|${random()}`));

    const candidate = shuffle(
      Array.from({ length: 45 }, (_, i) => i + 1),
      localRandom
    )
      .slice(0, 6)
      .sort((a, b) => a - b);

    const finalScore = scoreCandidate(candidate) + localRandom() * 4.7;

    if (finalScore > bestScore) {
      best = candidate;
      bestScore = finalScore;
    }
  }

  const bonusPool = Array.from({ length: 45 }, (_, i) => i + 1).filter(
    (n) => !best.includes(n)
  );

  const bonus = shuffle(bonusPool, mulberry32(hashString(`${entropy}|bonus`)))[0];

  return {
    numbers: best,
    bonus,
    score: scoreCandidate(best),
  };
}

function generateDreamResult(dream: string): DreamResult {
  const rule = pickRule(dream);
  const { numbers, bonus, score } = generateNumbers(
    dream,
    rule.symbol,
    rule.emotion
  );

  const sum = numbers.reduce((a, b) => a + b, 0);
  const odd = numbers.filter((n) => n % 2 === 1).length;
  const even = 6 - odd;
  const low = numbers.filter((n) => n <= 22).length;
  const high = 6 - low;

  return {
    id: `${Date.now()}-${hashString(dream).toString(16)}`,
    dream,
    numbers,
    bonus,
    symbol: rule.symbol,
    emotion: rule.emotion,
    theme: rule.theme,
    score,
    summary: `${rule.symbol}의 상징이 가장 강하게 잡혔습니다.`,
    insight: rule.tone,
    detail: `이번 조합은 합계 ${sum}, 홀짝 ${odd}:${even}, 저고 ${low}:${high}로 구성되었습니다. 꿈의 핵심 단어를 고정 번호에 대입하지 않고, 문장 길이·문자 분포·상징 키워드·날짜 값을 섞은 뒤 여러 후보 중 균형이 좋은 조합만 선별했습니다. 결과는 당첨 예측이 아니라 오락 및 참고용 리포트입니다.`,
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
  const [isReading, setIsReading] = useState(false);
  const [revealed, setRevealed] = useState(0);

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
        setRevealed(7);
      }
    } catch {
      setHistory([]);
    }
  }, []);

  useEffect(() => {
    if (!result || isReading) return;

    setRevealed(0);
    const timers = Array.from({ length: 7 }, (_, index) =>
      window.setTimeout(() => setRevealed(index + 1), 120 * index + 120)
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [result, isReading]);

  const stats = useMemo(() => {
    if (!result) return null;

    const sum = result.numbers.reduce((a, b) => a + b, 0);
    const odd = result.numbers.filter((n) => n % 2 === 1).length;
    const even = 6 - odd;
    const low = result.numbers.filter((n) => n <= 22).length;
    const high = 6 - low;
    const ranges = new Set(result.numbers.map((n) => Math.ceil(n / 9))).size;

    return { sum, odd, even, low, high, ranges };
  }, [result]);

  function handleGenerate() {
    if (!canGenerate || isReading) return;

    setCopied(false);
    setIsReading(true);
    setRevealed(0);

    window.setTimeout(() => {
      const next = generateDreamResult(dream.trim());
      setResult(next);

      const nextHistory = [next, ...history].slice(0, 5);
      setHistory(nextHistory);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextHistory));

      setIsReading(false);
    }, 850);
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
      `해석: ${result.insight}`,
      "https://www.haemala.com/dream-lotto",
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
            <Link href="/dream-lotto" className="text-[#d7b46a]">
              꿈해몽
            </Link>
            <Link href="/today" className="hover:text-white">
              오늘
            </Link>
            <Link href="/random" className="hover:text-white">
              랜덤
            </Link>
          </nav>

          <Link
            href="/today"
            className="rounded-full bg-white px-5 py-2.5 text-sm font-black text-black"
          >
            오늘 번호
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-white/10 blur-[130px]" />
        <div className="absolute right-0 top-36 h-[380px] w-[380px] rounded-full bg-[#d7b46a]/20 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-16 sm:pt-20">
          <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-black tracking-[0.18em] text-[#d7b46a]">
            DREAM SYMBOL REPORT
          </p>

          <h1 className="mt-7 max-w-5xl text-6xl font-black leading-[0.9] tracking-[-0.09em] sm:text-7xl lg:text-8xl">
            꿈의 장면을
            <br />
            번호 리포트로 바꾼다.
          </h1>

          <p className="mt-7 max-w-2xl text-lg font-medium leading-8 tracking-[-0.03em] text-white/55">
            고정 패턴 번호가 아니라, 꿈의 문장 구조와 상징 신호를 섞어 여러 후보를
            만들고 그중 균형이 좋은 조합만 선별합니다.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl sm:p-8">
          <p className="text-sm font-black tracking-[0.16em] text-[#d7b46a]">
            INPUT
          </p>

          <h2 className="mt-4 text-4xl font-black leading-[0.95] tracking-[-0.07em]">
            기억나는 장면을
            <br />
            그대로 적어주세요.
          </h2>

          <textarea
            value={dream}
            onChange={(e) => setDream(e.target.value)}
            placeholder="예: 바다 위를 걷다가 하늘로 날아오르는 꿈을 꿨어요."
            className="mt-7 min-h-56 w-full resize-none rounded-[2rem] border border-white/10 bg-black/35 p-5 text-base font-semibold leading-7 text-white outline-none transition placeholder:text-white/25 focus:border-[#d7b46a]/60 focus:bg-black/55"
          />

          <div className="mt-4 flex items-center justify-between text-xs font-bold text-white/35">
            <span>장소, 인물, 감정이 들어가면 더 입체적입니다.</span>
            <span>{dream.trim().length}자</span>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!canGenerate || isReading}
            className="mt-7 w-full rounded-full bg-[#d7b46a] px-7 py-4 text-base font-black text-black transition hover:-translate-y-0.5 hover:bg-[#e7c77b] disabled:cursor-not-allowed disabled:bg-white/15 disabled:text-white/35 disabled:hover:translate-y-0"
          >
            {isReading ? "꿈의 신호 분석 중..." : "꿈 해몽 번호 생성"}
          </button>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm font-black text-white/35">PRIVATE</p>
              <p className="mt-2 text-sm font-semibold leading-7 text-white/50">
                입력한 꿈은 서버에 저장하지 않습니다.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm font-black text-white/35">NO BASE PATTERN</p>
              <p className="mt-2 text-sm font-semibold leading-7 text-white/50">
                상징별 고정 번호표를 그대로 쓰지 않습니다.
              </p>
            </div>
          </div>
        </div>

        <div
          id="dream-result-card"
          className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white p-5 text-black shadow-2xl shadow-black/40 sm:p-8"
        >
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-[#d7b46a]/30 blur-[90px]" />

          {!result && !isReading && (
            <div className="relative flex min-h-[620px] flex-col justify-between rounded-[2rem] bg-[#111113] p-7 text-white">
              <div>
                <p className="text-sm font-black tracking-[0.16em] text-[#d7b46a]">
                  RESULT
                </p>
                <h2 className="mt-5 text-5xl font-black leading-[0.95] tracking-[-0.08em]">
                  아직 해석 전입니다.
                </h2>
                <p className="mt-5 max-w-md text-sm font-semibold leading-7 text-white/50">
                  꿈을 입력하면 상징, 감정, 번호, 해석 카드가 이곳에 표시됩니다.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div
                    key={n}
                    className="h-24 rounded-[1.5rem] border border-white/10 bg-white/[0.06]"
                  />
                ))}
              </div>
            </div>
          )}

          {isReading && (
            <div className="relative flex min-h-[620px] flex-col items-center justify-center rounded-[2rem] bg-[#111113] p-7 text-center text-white">
              <div className="h-20 w-20 animate-pulse rounded-full bg-[#d7b46a]" />
              <h2 className="mt-8 text-5xl font-black tracking-[-0.08em]">
                꿈을 읽는 중
              </h2>
              <p className="mt-5 max-w-md text-sm font-semibold leading-7 text-white/50">
                문장 구조, 상징 키워드, 번호 균형을 함께 계산하고 있습니다.
              </p>
            </div>
          )}

          {result && !isReading && (
            <div className="relative">
              <div className="rounded-[2rem] bg-[#111113] p-6 text-white sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-black tracking-[0.16em] text-[#d7b46a]">
                      {result.theme}
                    </p>
                    <h2 className="mt-3 text-5xl font-black leading-[0.95] tracking-[-0.08em]">
                      {result.symbol}의 꿈
                    </h2>
                  </div>

                  <div className="rounded-full bg-white px-4 py-2 text-sm font-black text-black">
                    해석 {result.score}/100
                  </div>
                </div>

                <p className="mt-6 max-w-xl text-base font-semibold leading-8 text-white/58">
                  {result.insight}
                </p>

                <div className="mt-8 flex flex-wrap gap-2.5 sm:gap-3">
                  {result.numbers.map((num, index) => (
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

                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl border border-[#d7b46a]/40 bg-[#d7b46a]/15 text-xl font-black text-[#d7b46a] transition duration-500 sm:h-20 sm:w-20 sm:text-2xl ${
                      revealed > 6
                        ? "translate-y-0 opacity-100"
                        : "translate-y-4 opacity-0"
                    }`}
                  >
                    +{result.bonus}
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-[1.5rem] bg-black/[0.04] p-5">
                  <p className="text-xs font-black text-black/35">상징</p>
                  <p className="mt-2 text-3xl font-black tracking-[-0.05em]">
                    {result.symbol}
                  </p>
                </div>

                <div className="rounded-[1.5rem] bg-black/[0.04] p-5">
                  <p className="text-xs font-black text-black/35">감정</p>
                  <p className="mt-2 text-3xl font-black tracking-[-0.05em]">
                    {result.emotion}
                  </p>
                </div>

                <div className="rounded-[1.5rem] bg-black/[0.04] p-5">
                  <p className="text-xs font-black text-black/35">분산</p>
                  <p className="mt-2 text-3xl font-black tracking-[-0.05em]">
                    {stats?.ranges}구간
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-[2rem] bg-[#d7b46a] p-6 text-black">
                <p className="text-xs font-black tracking-[0.16em] text-black/40">
                  INTERPRETATION
                </p>
                <h3 className="mt-3 text-3xl font-black tracking-[-0.06em]">
                  {result.summary}
                </h3>
                <p className="mt-4 text-sm font-semibold leading-7 text-black/60">
                  {result.detail}
                </p>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-[1.5rem] bg-black p-5 text-white">
                  <p className="text-xs font-black text-white/35">합계</p>
                  <p className="mt-2 text-3xl font-black">{stats?.sum}</p>
                </div>

                <div className="rounded-[1.5rem] bg-black p-5 text-white">
                  <p className="text-xs font-black text-white/35">홀짝</p>
                  <p className="mt-2 text-3xl font-black">
                    {stats?.odd}:{stats?.even}
                  </p>
                </div>

                <div className="rounded-[1.5rem] bg-black p-5 text-white">
                  <p className="text-xs font-black text-white/35">저고</p>
                  <p className="mt-2 text-3xl font-black">
                    {stats?.low}:{stats?.high}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button
                  onClick={copyResult}
                  className="rounded-full bg-black px-7 py-4 text-base font-black text-white transition hover:-translate-y-0.5"
                >
                  {copied ? "복사 완료" : "결과 복사"}
                </button>

                <Link
                  href="/today"
                  className="rounded-full bg-black/5 px-7 py-4 text-center text-base font-black text-black transition hover:-translate-y-0.5"
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
                )}\n보너스: ${result.bonus}\n${result.insight}`}
              />
            </div>
          )}
        </div>
      </section>

      {result && (
        <section className="mx-auto max-w-7xl px-5 pb-10">
          <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.05] p-7">
            <p className="text-sm font-black tracking-[0.16em] text-[#d7b46a]">
              NUMBER MEANING
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {result.numbers.map((num) => (
                <div
                  key={`meaning-${num}`}
                  className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/[0.04] px-5 py-4"
                >
                  <span className="text-2xl font-black">{num}</span>
                  <span className="text-sm font-black text-white/45">
                    {getNumberMeaning(num)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <PremiumAdSlot />

      <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-16 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-[2.5rem] bg-[#d7b46a] p-8 text-black">
          <p className="text-sm font-black tracking-[0.16em] text-black/40">
            ARCHIVE
          </p>
          <h2 className="mt-4 text-5xl font-black leading-[0.95] tracking-[-0.08em]">
            최근 꿈을
            <br />
            다시 열어보기.
          </h2>
          <p className="mt-5 text-sm font-bold leading-7 text-black/55">
            결과는 브라우저에만 저장됩니다. 서버 저장이나 회원가입 없이 최근
            리포트를 다시 확인할 수 있습니다.
          </p>
        </div>

        <div className="grid gap-3">
          {history.length === 0 ? (
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 text-sm font-semibold text-white/45">
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
                className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-5 text-left transition hover:-translate-y-0.5 hover:bg-white/[0.08]"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-black text-white/35">
                      {formatTime(item.createdAt)}
                    </p>
                    <h3 className="mt-1 text-xl font-black tracking-[-0.04em]">
                      {item.symbol} · {item.emotion}
                    </h3>
                    <p className="mt-2 line-clamp-1 text-sm font-semibold text-white/45">
                      {item.dream}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {item.numbers.map((num) => (
                      <span
                        key={`${item.id}-${num}`}
                        className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-xs font-black text-black"
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

      <section className="bg-[#d7b46a] px-5 py-14 text-center text-black">
        <h2 className="text-5xl font-black tracking-[-0.08em]">
          꿈이 없다면,
          <br />
          오늘의 흐름으로.
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-sm font-bold leading-7 text-black/55">
          꿈 해몽 번호는 가장 개인적인 리포트입니다. 더 빠르게 보고 싶다면
          오늘의 번호나 랜덤 번호를 확인해보세요.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/today"
            className="rounded-full bg-black px-8 py-4 text-base font-black text-white"
          >
            오늘의 번호
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