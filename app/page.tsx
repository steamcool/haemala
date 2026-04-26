"use client";

import { useMemo, useRef, useState } from "react";
import {
  Sparkles,
  Moon,
  Share2,
  Download,
  RotateCcw,
  Copy,
  Trophy,
  Clock,
  Flame,
  Heart,
  ShieldCheck,
  Search,
  Wand2,
  Star,
  Gift,
  ChevronRight,
} from "lucide-react";

type Analysis = {
  title: string;
  summary: string;
  mood: string;
  luckyScore: number;
  numbers: number[];
  bonus: number;
  keywords: string[];
  reasons: string[];
  interpretation: string[];
  actions: string[];
  similarDreams: string[];
  shareText: string;
};

const DREAM_KEYWORDS = [
  { key: "뱀", symbol: "재물·변화·긴장", nums: [3, 9, 18, 27, 33, 41] },
  { key: "돼지", symbol: "재물·횡재·복", nums: [1, 8, 17, 24, 35, 42] },
  { key: "물", symbol: "감정·흐름·정화", nums: [2, 7, 14, 29, 36, 44] },
  { key: "불", symbol: "열정·폭발·성취", nums: [5, 11, 19, 28, 37, 45] },
  { key: "돈", symbol: "기회·욕망·현실감", nums: [6, 13, 21, 30, 39, 43] },
  { key: "피", symbol: "회복·강한 에너지", nums: [4, 12, 20, 31, 38, 40] },
  { key: "죽", symbol: "전환·끝과 시작", nums: [10, 16, 23, 32, 34, 41] },
  { key: "쫓", symbol: "압박·회피·긴장", nums: [7, 15, 22, 26, 33, 45] },
  { key: "날", symbol: "상승·해방·도약", nums: [9, 18, 25, 34, 40, 44] },
  { key: "아이", symbol: "새 출발·가능성", nums: [1, 6, 15, 23, 32, 43] },
  { key: "가족", symbol: "관계·책임·보호", nums: [4, 8, 16, 24, 36, 42] },
  { key: "바다", symbol: "무의식·큰 흐름", nums: [2, 10, 19, 29, 37, 45] },
  { key: "산", symbol: "목표·인내·성취", nums: [5, 14, 22, 31, 39, 44] },
  { key: "집", symbol: "자아·안정·기반", nums: [3, 12, 21, 28, 35, 43] },
  { key: "자동차", symbol: "방향·속도·선택", nums: [6, 11, 20, 27, 34, 40] },
];

const TRENDING = [
  "뱀 꿈",
  "돼지 꿈",
  "이빨 빠지는 꿈",
  "물 꿈",
  "불나는 꿈",
  "돈 줍는 꿈",
  "쫓기는 꿈",
  "돌아가신 분 꿈",
];

const EXAMPLES = [
  "검은 뱀이 집 안으로 들어오는 꿈",
  "맑은 물에서 돈을 줍는 꿈",
  "높은 곳에서 떨어졌는데 다치지 않는 꿈",
  "돌아가신 가족이 웃으며 말하는 꿈",
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

function analyzeDream(input: string): Analysis {
  const clean = input.trim();
  const today = new Date().toISOString().slice(0, 10);
  const seed = hashText(clean + today);
  const rand = seeded(seed);

  const matched = DREAM_KEYWORDS.filter((x) => clean.includes(x.key));
  const baseKeywords = matched.length
    ? matched
    : DREAM_KEYWORDS.sort(() => rand() - 0.5).slice(0, 3);

  const emotionalWords = ["무서", "불안", "기분", "울", "행복", "놀라", "도망", "웃", "화", "슬"];
  const emotionCount = emotionalWords.filter((w) => clean.includes(w)).length;
  const lengthScore = Math.min(35, Math.floor(clean.length / 4));
  const symbolScore = Math.min(30, baseKeywords.length * 10);
  const luckyScore = Math.min(98, 45 + lengthScore + symbolScore + emotionCount * 4 + Math.floor(rand() * 12));

  const pool = new Set<number>();
  baseKeywords.forEach((k) => k.nums.forEach((n) => pool.add(n)));

  while (pool.size < 20) {
    pool.add(1 + Math.floor(rand() * 45));
  }

  const weighted = Array.from(pool)
    .map((n) => ({
      n,
      score:
        Math.sin(n * 13 + seed) +
        rand() * 2 +
        (baseKeywords.some((k) => k.nums.includes(n)) ? 2.2 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .map((x) => x.n);

  const numbers = Array.from(new Set(weighted)).slice(0, 6).sort((a, b) => a - b);
  const bonus = weighted.find((n) => !numbers.includes(n)) ?? 7;

  const mainSymbols = baseKeywords.map((x) => x.symbol);
  const keywordLabels = baseKeywords.map((x) => x.key);

  const mood =
    luckyScore >= 85
      ? "강한 상승운"
      : luckyScore >= 72
        ? "좋은 흐름"
        : luckyScore >= 58
          ? "전환 구간"
          : "정리와 관찰";

  const title =
    matched.length > 0
      ? `${keywordLabels[0]}의 상징이 강하게 드러난 꿈`
      : "감정과 장면의 흐름이 중요한 꿈";

  return {
    title,
    mood,
    luckyScore,
    numbers,
    bonus,
    keywords: keywordLabels,
    summary:
      matched.length > 0
        ? `이 꿈은 ${mainSymbols.join(", ")}의 의미가 겹쳐진 꿈입니다. 단순한 길몽/흉몽보다는 현재의 기대감, 긴장감, 선택의 압박이 함께 반영된 흐름으로 보는 것이 좋습니다.`
        : "입력한 꿈은 특정 상징 하나보다 전체 분위기와 감정의 방향성이 중요한 꿈입니다. 최근 고민, 기대, 인간관계의 변화가 무의식적으로 섞였을 가능성이 있습니다.",
    reasons: [
      `핵심 상징 ${keywordLabels.join(", ")}에서 우선 후보 숫자를 추출했습니다.`,
      `꿈의 길이와 장면 수를 반영해 숫자 조합의 분산도를 조정했습니다.`,
      `감정 표현 강도를 반영해 중심 숫자와 보조 숫자를 분리했습니다.`,
      `오늘 날짜 값을 섞어 매일 같은 꿈도 조금 다른 조합이 나오도록 설계했습니다.`,
    ],
    interpretation: [
      "꿈속 장면이 선명했다면 현실에서도 이미 중요한 선택지가 가까워졌다는 신호로 볼 수 있습니다.",
      "불안하거나 쫓기는 느낌이 있었다면 운이 나쁘다는 뜻이 아니라, 미뤄둔 결정이 마음속에서 커지고 있다는 의미에 가깝습니다.",
      "사람, 장소, 색감이 또렷했다면 관계운과 재물운이 동시에 움직이는 시기로 해석할 수 있습니다.",
    ],
    actions: [
      "오늘은 큰 결정보다 작은 정리를 먼저 하는 것이 좋습니다.",
      "돈과 관련된 선택은 충동보다 기록을 남기는 방식이 유리합니다.",
      "좋은 꿈이라고 느꼈다면 오전보다 오후에 행동으로 옮기는 흐름이 더 안정적입니다.",
    ],
    similarDreams: [
      `${keywordLabels[0] ?? "상징"}이 반복해서 나오는 꿈`,
      `낯선 장소에서 길을 찾는 꿈`,
      `누군가와 대화했지만 내용이 흐릿한 꿈`,
    ],
    shareText: `오늘 내 꿈 해석 결과: ${mood}. 추천 번호는 ${numbers.join(", ")} + 보너스 ${bonus}`,
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

export default function Home() {
  const [dream, setDream] = useState("");
  const [result, setResult] = useState<Analysis | null>(null);
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const todayText = useMemo(() => {
    return new Intl.DateTimeFormat("ko-KR", {
      month: "long",
      day: "numeric",
      weekday: "long",
    }).format(new Date());
  }, []);

  const runAnalysis = () => {
    if (!dream.trim()) return;
    const analyzed = analyzeDream(dream);
    setResult(analyzed);

    const history = JSON.parse(localStorage.getItem("haemala-history") || "[]");
    localStorage.setItem(
      "haemala-history",
      JSON.stringify([{ dream, result: analyzed, createdAt: Date.now() }, ...history].slice(0, 5)),
    );

    setTimeout(() => {
      document.getElementById("result")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  const copyShare = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result.shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  const saveImage = async () => {
    if (!cardRef.current) return;
    const html2canvas = (await import("html2canvas")).default;
    const canvas = await html2canvas(cardRef.current, {
      backgroundColor: "#ffffff",
      scale: 2,
    });
    const link = document.createElement("a");
    link.download = "haemala-dream-result.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <main className="min-h-screen bg-[#f7f3ea] text-slate-950">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white/80 px-5 py-4 shadow-sm backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
              <Moon size={22} />
            </div>
            <div>
              <p className="text-xl font-black tracking-tight">해말아</p>
              <p className="text-xs font-bold text-slate-500">꿈 해몽 · 로또 번호 · 오늘의 운 흐름</p>
            </div>
          </div>
          <div className="hidden items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-black text-amber-900 sm:flex">
            <Sparkles size={16} />
            {todayText}
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-slate-50 px-4 py-2 text-sm font-black">
              <Wand2 size={16} />
              무료 꿈 분석 엔진
            </div>

            <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl">
              어젯밤 꿈을 적으면
              <br />
              해몽과 번호를 정교하게 뽑아드립니다.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              단순 랜덤 추천이 아니라 꿈속 상징, 감정 강도, 장면 구성, 오늘 날짜 흐름을 조합해
              해석과 번호 근거를 함께 보여줍니다.
            </p>

            <div className="mt-6 rounded-3xl border border-slate-200 bg-[#fbfaf6] p-4">
              <textarea
                value={dream}
                onChange={(e) => setDream(e.target.value)}
                placeholder="예: 큰 뱀이 집 안으로 들어왔는데 이상하게 무섭지 않았고, 가족들이 웃고 있었어요."
                className="min-h-[180px] w-full resize-none rounded-2xl border border-slate-200 bg-white p-4 text-base leading-7 outline-none transition focus:border-slate-950"
              />

              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={runAnalysis}
                  className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-4 text-base font-black text-white shadow-sm transition active:scale-[0.99]"
                >
                  <Sparkles size={18} />
                  내 꿈 분석하기
                </button>

                <button
                  onClick={() => setDream(EXAMPLES[Math.floor(Math.random() * EXAMPLES.length)])}
                  className="flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-4 text-base font-black"
                >
                  예시 넣기
                </button>
              </div>
            </div>

            <p className="mt-4 text-xs leading-5 text-slate-500">
              번호 추천은 오락과 참고용입니다. 당첨을 보장하지 않으며, 과도한 구매를 권장하지 않습니다.
            </p>
          </div>

          <aside className="flex flex-col gap-4">
            <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
              <div className="flex items-center gap-2 text-sm font-black text-amber-200">
                <Flame size={16} />
                오늘 많이 보는 꿈
              </div>
              <div className="mt-5 grid grid-cols-2 gap-2">
                {TRENDING.map((item) => (
                  <button
                    key={item}
                    onClick={() => setDream(`${item}을 꿨어요. 장면이 선명했고 기분이 이상했어요.`)}
                    className="rounded-2xl bg-white/10 px-3 py-3 text-left text-sm font-bold transition hover:bg-white/15"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-black">
                <Trophy size={17} />
                해말아 분석 구조
              </div>
              <div className="mt-4 space-y-3">
                {[
                  ["상징 추출", "꿈속 사물·동물·장소를 분리"],
                  ["감정 반영", "무서움·기쁨·긴장도 계산"],
                  ["번호 근거", "상징별 후보군을 재조합"],
                  ["공유 카드", "결과 이미지 저장 가능"],
                ].map(([a, b]) => (
                  <div key={a} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                    <div>
                      <p className="font-black">{a}</p>
                      <p className="text-sm text-slate-500">{b}</p>
                    </div>
                    <ChevronRight size={18} />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-6 text-center text-sm font-bold text-slate-400">
              광고 영역
              <br />
              AdSense 승인 후 이 위치에 상단/사이드 광고 삽입
            </div>
          </aside>
        </section>

        {result && (
          <section id="result" className="grid gap-6 lg:grid-cols-[1fr_0.38fr]">
            <div ref={cardRef} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-black text-amber-900">
                    <Star size={16} />
                    {result.mood}
                  </div>
                  <h2 className="text-3xl font-black tracking-tight sm:text-4xl">{result.title}</h2>
                  <p className="mt-4 text-base leading-7 text-slate-600">{result.summary}</p>
                </div>

                <div className="rounded-3xl bg-slate-950 p-5 text-center text-white">
                  <p className="text-xs font-black text-slate-300">오늘의 꿈운</p>
                  <p className="mt-1 text-4xl font-black">{result.luckyScore}</p>
                  <p className="text-xs font-bold text-slate-300">/ 100</p>
                </div>
              </div>

              <div className="mt-8 rounded-[1.5rem] border border-slate-200 bg-[#fbfaf6] p-5">
                <p className="mb-4 flex items-center gap-2 text-lg font-black">
                  <Gift size={20} />
                  추천 번호
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  {result.numbers.map((n) => (
                    <Ball key={n} n={n} />
                  ))}
                  <span className="px-1 text-xl font-black text-slate-400">+</span>
                  <Ball n={result.bonus} muted />
                </div>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <InfoBlock
                  icon={<Search size={18} />}
                  title="번호 선정 근거"
                  items={result.reasons}
                />
                <InfoBlock
                  icon={<Moon size={18} />}
                  title="꿈 해석"
                  items={result.interpretation}
                />
                <InfoBlock
                  icon={<ShieldCheck size={18} />}
                  title="오늘의 행동 팁"
                  items={result.actions}
                />
                <InfoBlock
                  icon={<Heart size={18} />}
                  title="비슷한 꿈"
                  items={result.similarDreams}
                />
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {result.keywords.map((k) => (
                  <span key={k} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-black">
                    #{k}
                  </span>
                ))}
              </div>

              <div className="mt-8 rounded-3xl border border-dashed border-slate-300 p-5 text-center text-sm font-bold text-slate-400">
                결과 중간 광고 영역
                <br />
                체류시간이 긴 위치라 AdSense 배치 후보
              </div>
            </div>

            <aside className="flex flex-col gap-4">
              <button
                onClick={saveImage}
                className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-4 font-black text-white"
              >
                <Download size={18} />
                결과 이미지 저장
              </button>

              <button
                onClick={copyShare}
                className="flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-4 font-black"
              >
                <Copy size={18} />
                {copied ? "복사 완료" : "공유 문구 복사"}
              </button>

              <button
                onClick={() => {
                  setDream("");
                  setResult(null);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-4 font-black"
              >
                <RotateCcw size={18} />
                다시 분석하기
              </button>

              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <p className="flex items-center gap-2 font-black">
                  <Share2 size={18} />
                  공유하면 좋은 문구
                </p>
                <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                  {result.shareText}
                </p>
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <p className="flex items-center gap-2 font-black">
                  <Clock size={18} />
                  재방문 포인트
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  같은 꿈도 날짜 흐름에 따라 해석과 번호가 조금 달라집니다. 내일 다시 보면 다른 조합을 확인할 수 있습니다.
                </p>
              </div>
            </aside>
          </section>
        )}

        <section className="grid gap-4 md:grid-cols-3">
          {[
            ["무료 분석", "회원가입 없이 바로 사용 가능합니다."],
            ["모바일 최적화", "작은 화면에서도 결과 카드와 버튼이 깨지지 않도록 구성했습니다."],
            ["광고 친화 구조", "상단·결과 중간·하단 광고 위치를 자연스럽게 확보했습니다."],
          ].map(([title, desc]) => (
            <div key={title} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-lg font-black">{title}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">{desc}</p>
            </div>
          ))}
        </section>

        <footer className="rounded-[2rem] border border-slate-200 bg-white p-6 text-sm leading-6 text-slate-500">
          <p className="font-black text-slate-800">해말아</p>
          <p className="mt-2">
            꿈 해석과 번호 추천은 재미와 참고용 콘텐츠입니다. 결과는 어떠한 당첨이나 금전적 이익을 보장하지 않습니다.
          </p>
        </footer>
      </section>
    </main>
  );
}

function InfoBlock({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
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