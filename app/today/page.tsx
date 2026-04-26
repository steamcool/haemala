"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Sparkles,
  Moon,
  Gift,
  Flame,
  ShieldCheck,
  Copy,
  RefreshCcw,
  Share2,
  ArrowRight,
  Clock,
  Star,
  Heart,
  Compass,
  TrendingUp,
} from "lucide-react";

type TodayResult = {
  dateText: string;
  title: string;
  score: number;
  mood: string;
  numbers: number[];
  bonus: number;
  keywords: string[];
  summary: string;
  advice: string[];
  avoid: string[];
  luckyActions: string[];
  shareText: string;
};

const KEYWORDS = [
  "재물운",
  "관계운",
  "선택운",
  "정리운",
  "상승운",
  "기회운",
  "직감운",
  "회복운",
  "이동운",
  "집중운",
];

const DREAM_TOPICS = [
  "뱀 꿈",
  "돼지 꿈",
  "돈 줍는 꿈",
  "물 꿈",
  "불나는 꿈",
  "이빨 빠지는 꿈",
  "쫓기는 꿈",
  "높은 곳 꿈",
];

function hashText(text: string) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }
  return Math.abs(h >>> 0);
}

function seeded(seed: number) {
  let value = seed % 2147483647;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function makeTodayResult(): TodayResult {
  const now = new Date();
  const dateKey = now.toISOString().slice(0, 10);
  const dateText = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(now);

  const seed = hashText(`haemala-today-${dateKey}`);
  const rand = seeded(seed);

  const pickedKeywords = [...KEYWORDS]
    .sort(() => rand() - 0.5)
    .slice(0, 3);

  const score = 62 + Math.floor(rand() * 34);

  const mood =
    score >= 90
      ? "강한 상승 흐름"
      : score >= 82
        ? "기회가 열리는 날"
        : score >= 74
          ? "균형 잡힌 좋은 날"
          : score >= 66
            ? "천천히 풀리는 날"
            : "정리와 관찰이 필요한 날";

  const title =
    score >= 85
      ? "오늘은 직감과 실행력이 같이 살아나는 날입니다"
      : score >= 75
        ? "오늘은 작게 움직일수록 운이 모이는 날입니다"
        : "오늘은 서두르기보다 흐름을 읽는 것이 유리합니다";

  const pool = new Set<number>();
  while (pool.size < 18) {
    const base = 1 + Math.floor(rand() * 45);
    pool.add(base);
  }

  pickedKeywords.forEach((_, i) => {
    pool.add(((seed >> (i + 2)) % 45) + 1);
    pool.add(((seed >> (i + 5)) % 45) + 1);
  });

  const ranked = Array.from(pool)
    .map((n) => ({
      n,
      weight: Math.sin(n * 17 + seed) + rand() * 2.5 + (n % 3 === 0 ? 0.4 : 0),
    }))
    .sort((a, b) => b.weight - a.weight)
    .map((x) => x.n);

  const numbers = Array.from(new Set(ranked)).slice(0, 6).sort((a, b) => a - b);
  const bonus = ranked.find((n) => !numbers.includes(n)) ?? 7;

  return {
    dateText,
    title,
    score,
    mood,
    numbers,
    bonus,
    keywords: pickedKeywords,
    summary: `오늘의 핵심 키워드는 ${pickedKeywords.join(", ")}입니다. 큰 변화보다 작은 선택이 쌓이면서 흐름이 좋아지는 날입니다. 특히 오전에는 정리, 오후에는 실행 쪽으로 움직이면 결과가 더 안정적으로 이어질 가능성이 높습니다.`,
    advice: [
      "오늘은 감으로만 결정하기보다 메모를 남기고 비교한 뒤 움직이는 것이 좋습니다.",
      "연락, 정리, 신청, 확인처럼 미뤄둔 일을 처리하면 운의 흐름이 가벼워집니다.",
      "금전과 관련된 선택은 충동 구매보다 필요한 것과 불필요한 것을 나누는 쪽이 유리합니다.",
    ],
    avoid: [
      "확신 없는 약속을 즉흥적으로 잡는 것",
      "기분에 따라 돈을 쓰는 것",
      "확인하지 않고 중요한 내용을 넘기는 것",
    ],
    luckyActions: [
      "오전 중 책상이나 휴대폰 사진 정리",
      "오후에 짧은 산책 또는 이동",
      "오늘 본 꿈이나 인상 깊은 장면 기록하기",
    ],
    shareText: `해말아 오늘의 운세: ${mood}. 오늘의 추천 번호는 ${numbers.join(", ")} + 보너스 ${bonus}`,
  };
}

function Ball({ n, muted = false }: { n: number; muted?: boolean }) {
  return (
    <div
      className={`flex h-12 w-12 items-center justify-center rounded-full border text-lg font-black shadow-sm ${
        muted
          ? "border-slate-300 bg-white text-slate-500"
          : "border-slate-950 bg-slate-950 text-white"
      }`}
    >
      {n}
    </div>
  );
}

function InfoCard({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
      <p className="mb-4 flex items-center gap-2 font-black">
        {icon}
        {title}
      </p>
      <div className="space-y-3">
        {items.map((item) => (
          <p key={item} className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function TodayPage() {
  const [copied, setCopied] = useState(false);
  const result = useMemo(() => makeTodayResult(), []);

  const copyShare = async () => {
    await navigator.clipboard.writeText(result.shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <main className="min-h-screen bg-[#f7f3ea] text-slate-950">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white/80 px-5 py-4 shadow-sm backdrop-blur">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
              <Moon size={22} />
            </div>
            <div>
              <p className="text-xl font-black tracking-tight">해말아</p>
              <p className="text-xs font-bold text-slate-500">오늘의 꿈운 · 번호 흐름</p>
            </div>
          </Link>

          <Link
            href="/"
            className="hidden rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-black sm:block"
          >
            꿈 분석하기
          </Link>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-black text-amber-900">
              <CalendarDays size={16} />
              {result.dateText}
            </div>

            <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl">
              오늘의 꿈운과
              <br />
              추천 번호 흐름
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              매일 날짜 흐름을 기준으로 오늘의 운세 점수, 핵심 키워드, 추천 번호, 피해야 할 행동을
              정리합니다. 꿈을 꾸지 않았더라도 하루의 흐름을 가볍게 점검할 수 있습니다.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-[0.8fr_1.2fr]">
              <div className="rounded-[1.5rem] bg-slate-950 p-6 text-center text-white">
                <p className="text-sm font-black text-slate-300">오늘의 운세 점수</p>
                <p className="mt-2 text-6xl font-black">{result.score}</p>
                <p className="text-sm font-bold text-slate-300">/ 100</p>
                <p className="mt-4 rounded-full bg-white/10 px-4 py-2 text-sm font-black text-amber-200">
                  {result.mood}
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-slate-200 bg-[#fbfaf6] p-6">
                <p className="flex items-center gap-2 text-lg font-black">
                  <Sparkles size={19} />
                  {result.title}
                </p>
                <p className="mt-4 text-sm leading-7 text-slate-600">{result.summary}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {result.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-black"
                    >
                      #{keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <aside className="flex flex-col gap-4">
            <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
              <p className="flex items-center gap-2 font-black text-amber-200">
                <Gift size={18} />
                오늘의 추천 번호
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                {result.numbers.map((n) => (
                  <Ball key={n} n={n} />
                ))}
                <span className="text-xl font-black text-slate-400">+</span>
                <Ball n={result.bonus} muted />
              </div>

              <p className="mt-5 text-sm leading-6 text-slate-300">
                오늘 날짜값, 키워드 흐름, 숫자 분산도를 조합한 오락용 추천 번호입니다.
              </p>
            </div>

            <button
              onClick={copyShare}
              className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 font-black shadow-sm ring-1 ring-slate-200"
            >
              <Copy size={18} />
              {copied ? "복사 완료" : "오늘 운세 공유 문구 복사"}
            </button>

            <Link
              href="/"
              className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-4 font-black text-white"
            >
              <Moon size={18} />
              내 꿈 직접 분석하기
            </Link>

            <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-6 text-center text-sm font-bold text-slate-400">
              광고 영역
              <br />
              Today 상단/사이드 광고 후보
            </div>
          </aside>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <InfoCard
            icon={<ShieldCheck size={18} />}
            title="오늘 하면 좋은 것"
            items={result.advice}
          />
          <InfoCard
            icon={<Compass size={18} />}
            title="오늘 피하면 좋은 것"
            items={result.avoid}
          />
          <InfoCard
            icon={<Star size={18} />}
            title="오늘의 행운 행동"
            items={result.luckyActions}
          />
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="flex items-center gap-2 text-lg font-black">
              <Clock size={19} />
              왜 매일 결과가 달라지나요?
            </p>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              해말아의 오늘 페이지는 날짜값을 기준으로 결과를 생성합니다. 그래서 같은 사람이 다시 들어와도
              하루 단위로 다른 키워드, 다른 점수, 다른 번호 조합을 확인할 수 있습니다. 이 구조는 매일 가볍게
              확인하는 재방문형 콘텐츠에 맞춰 설계되어 있습니다.
            </p>

            <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
              <p className="font-black text-slate-900">오늘의 공유 문구</p>
              <p className="mt-2">{result.shareText}</p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="flex items-center gap-2 text-lg font-black">
              <Flame size={19} />
              많이 보는 꿈 키워드
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {DREAM_TOPICS.map((topic) => (
                <Link
                  key={topic}
                  href="/"
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-black transition hover:bg-white"
                >
                  {topic}
                </Link>
              ))}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link
                href="/dream-lotto"
                className="flex items-center justify-between rounded-2xl bg-slate-950 p-5 font-black text-white"
              >
                꿈 번호 바로 보기
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/random"
                className="flex items-center justify-between rounded-2xl border border-slate-300 bg-white p-5 font-black"
              >
                랜덤 꿈 보기
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-6 text-center text-sm font-bold text-slate-400">
          광고 영역
          <br />
          본문 하단 디스플레이 광고 후보
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {[
            {
              icon: <TrendingUp size={20} />,
              title: "재방문형 콘텐츠",
              desc: "오늘 페이지는 매일 바뀌는 결과를 보여주기 때문에 반복 방문 명분이 생깁니다.",
            },
            {
              icon: <Share2 size={20} />,
              title: "공유 친화 구조",
              desc: "오늘의 운세와 번호를 짧은 문장으로 복사해 카톡이나 커뮤니티에 공유할 수 있습니다.",
            },
            {
              icon: <RefreshCcw size={20} />,
              title: "내부 순환 강화",
              desc: "오늘 운세에서 꿈 분석, 랜덤 꿈, 꿈 번호 페이지로 자연스럽게 이동하도록 연결했습니다.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
                {item.icon}
              </div>
              <p className="text-lg font-black">{item.title}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.desc}</p>
            </div>
          ))}
        </section>

        <footer className="rounded-[2rem] border border-slate-200 bg-white p-6 text-sm leading-6 text-slate-500">
          <p className="font-black text-slate-800">해말아 오늘의 꿈운</p>
          <p className="mt-2">
            오늘의 운세와 번호 추천은 재미와 참고용 콘텐츠입니다. 결과는 당첨, 수익, 금전적 이익을 보장하지
            않습니다.
          </p>
        </footer>
      </section>
    </main>
  );
}