"use client";

import { useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";

type PickSet = {
  id: string;
  title: string;
  numbers: number[];
  bonus: number;
  score: number;
  mood: string;
  summary: string;
  reason: string[];
  balance: {
    sum: number;
    odd: number;
    even: number;
    low: number;
    high: number;
    spread: number;
  };
};

const DREAM_TAGS = [
  { key: "물", label: "흐름", tone: "감정·재물 흐름" },
  { key: "불", label: "폭발", tone: "전환·추진력" },
  { key: "돈", label: "재물", tone: "기회·이익" },
  { key: "사람", label: "관계", tone: "인연·협력" },
  { key: "동물", label: "본능", tone: "직감·생존력" },
  { key: "하늘", label: "상승", tone: "도약·확장" },
  { key: "길", label: "진행", tone: "방향·선택" },
  { key: "집", label: "기반", tone: "안정·보호" },
  { key: "문", label: "개방", tone: "새 국면" },
  { key: "바다", label: "대운", tone: "큰 흐름" },
  { key: "산", label: "성취", tone: "목표·극복" },
  { key: "아이", label: "시작", tone: "새 가능성" },
  { key: "차", label: "이동", tone: "속도·변화" },
  { key: "비", label: "정화", tone: "해소·회복" },
  { key: "빛", label: "징조", tone: "발견·해답" },
];

const MOODS = [
  "금운 상승형",
  "전환 돌파형",
  "관계 확장형",
  "기회 포착형",
  "직감 강화형",
  "회복 안정형",
  "새 국면 개방형",
  "숨은 운 발견형",
];

function hashText(text: string) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function cryptoRand(max: number) {
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return arr[0] % max;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function normalize(nums: number[]) {
  return [...nums].sort((a, b) => a - b);
}

function hasWeakPattern(nums: number[]) {
  const sorted = normalize(nums);
  const consecutive = sorted.filter((n, i) => i > 0 && n === sorted[i - 1] + 1).length;
  const sum = sorted.reduce((a, b) => a + b, 0);
  const odd = sorted.filter((n) => n % 2 === 1).length;
  const zoneMap = sorted.reduce<Record<number, number>>((acc, n) => {
    const zone = Math.floor((n - 1) / 10);
    acc[zone] = (acc[zone] || 0) + 1;
    return acc;
  }, {});
  const maxZone = Math.max(...Object.values(zoneMap));
  return consecutive >= 3 || sum < 85 || sum > 190 || odd === 0 || odd === 6 || maxZone >= 5;
}

function weightedNumber(seed: number, dream: string, used: Set<number>) {
  const chars = [...dream];
  const signal = chars.reduce((acc, ch, idx) => acc + ch.charCodeAt(0) * (idx + 11), seed);

  let best = 1;
  let bestScore = -Infinity;

  for (let n = 1; n <= 45; n++) {
    if (used.has(n)) continue;

    const noise = cryptoRand(100000) / 100000;
    const textAffinity = Math.sin((signal + n * 89) % 997) * 0.52;
    const dreamAffinity = Math.cos((seed + n * n * 17) % 991) * 0.38;
    const centerBias = 1 - Math.abs(23 - n) / 23;
    const antiObvious = Math.abs(Math.sin(n * 13.37 + seed)) * 0.24;

    const score = noise * 0.82 + textAffinity + dreamAffinity + centerBias * 0.18 + antiObvious;

    if (score > bestScore) {
      bestScore = score;
      best = n;
    }
  }

  return best;
}

function createPick(dream: string, index: number): PickSet {
  const seed = hashText(`${dream}-${Date.now()}-${cryptoRand(999999)}-${index}`);
  const used = new Set<number>();

  let tries = 0;
  while (used.size < 6 && tries < 300) {
    used.add(weightedNumber(seed + tries * 193, dream, used));
    tries++;
  }

  let numbers = normalize([...used]);

  let repair = 0;
  while (hasWeakPattern(numbers) && repair < 100) {
    const temp = new Set(numbers);
    temp.delete(numbers[cryptoRand(numbers.length)]);
    while (temp.size < 6) {
      temp.add(weightedNumber(seed + cryptoRand(999999), dream, temp));
    }
    numbers = normalize([...temp]);
    repair++;
  }

  const bonusPool = Array.from({ length: 45 }, (_, i) => i + 1).filter((n) => !numbers.includes(n));
  const bonus = bonusPool[cryptoRand(bonusPool.length)];

  const sum = numbers.reduce((a, b) => a + b, 0);
  const odd = numbers.filter((n) => n % 2 === 1).length;
  const even = 6 - odd;
  const low = numbers.filter((n) => n <= 22).length;
  const high = 6 - low;
  const spread = numbers[5] - numbers[0];

  const score = clamp(
    78 +
      Math.round(
        (spread / 45) * 8 +
          (3 - Math.abs(3 - odd)) * 3 +
          (3 - Math.abs(3 - low)) * 3 +
          cryptoRand(8)
      ),
    78,
    98
  );

  const mood = MOODS[(seed + index + cryptoRand(MOODS.length)) % MOODS.length];

  return {
    id: crypto.randomUUID(),
    title: `${mood} · ${index + 1}번 리딩`,
    numbers,
    bonus,
    score,
    mood,
    summary:
      score >= 92
        ? "균형, 분산, 꿈 신호 반영도가 모두 높은 상위 조합입니다."
        : score >= 86
        ? "번호대가 안정적으로 분산된 실전형 조합입니다."
        : "과도한 규칙성을 제거한 보정형 조합입니다.",
    reason: [
      `합계 ${sum}: 극단적인 저합·고합을 피하고 중간 안정권으로 조정했습니다.`,
      `홀짝 ${odd}:${even}: 한쪽 편향을 줄여 조합 밀도를 보정했습니다.`,
      `저고 ${low}:${high}: 1~22와 23~45 구간을 나누어 분산도를 확인했습니다.`,
      `간격 ${spread}: 번호가 붙어 보이는 단순 배열을 피했습니다.`,
    ],
    balance: { sum, odd, even, low, high, spread },
  };
}

function getSignals(dream: string) {
  const found = DREAM_TAGS.filter((x) => dream.includes(x.key));
  return found.length ? found.slice(0, 5) : DREAM_TAGS.slice(0, 3);
}

function Ball({ n }: { n: number }) {
  return (
    <div className="relative grid h-12 w-12 place-items-center rounded-full border border-amber-200/70 bg-[radial-gradient(circle_at_30%_25%,#fff7c2_0%,#facc15_28%,#b7791f_70%,#5f370e_100%)] text-lg font-black text-black shadow-[0_0_22px_rgba(250,204,21,0.35)] sm:h-14 sm:w-14">
      <span className="absolute left-2 top-1 h-3 w-3 rounded-full bg-white/70 blur-[1px]" />
      {n}
    </div>
  );
}

export default function Home() {
  const [dream, setDream] = useState("");
  const [picks, setPicks] = useState<PickSet[]>([]);
  const [loading, setLoading] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const signals = useMemo(() => getSignals(dream), [dream]);

  const generate = () => {
    if (!dream.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setPicks(Array.from({ length: 5 }, (_, i) => createPick(dream.trim(), i)));
      setLoading(false);
    }, 550);
  };

  const saveImage = async () => {
    if (!resultRef.current) return;
    const canvas = await html2canvas(resultRef.current, {
      backgroundColor: "#09090b",
      scale: 2,
      useCORS: true,
    });
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `haemala-premium-${Date.now()}.png`;
    link.click();
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#07070a] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(250,204,21,0.22),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.18),transparent_30%),linear-gradient(180deg,#09090b_0%,#11100b_50%,#050505_100%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:42px_42px]" />

      <section className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-8 sm:px-8 lg:py-12">
        <header className="relative overflow-hidden rounded-[2rem] border border-amber-300/25 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-xl sm:p-10">
          <div className="absolute right-[-80px] top-[-90px] h-72 w-72 rounded-full bg-amber-300/20 blur-3xl" />

          <div className="mb-7 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-amber-300/40 bg-amber-300/10 px-4 py-2 text-xs font-black text-amber-200">
              HAEMALA PREMIUM READING
            </span>
            <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold text-zinc-300">
              DB 없음 · 무료 · 이미지 저장 가능
            </span>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <h1 className="text-5xl font-black tracking-[-0.06em] text-white sm:text-7xl lg:text-8xl">
                해말아
                <span className="mt-3 block bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600 bg-clip-text text-3xl text-transparent sm:text-5xl">
                  꿈을 번호로 번역하다
                </span>
              </h1>
              <p className="mt-6 max-w-3xl text-base font-semibold leading-8 text-zinc-300 sm:text-lg">
                입력한 꿈의 상징, 현재 보안 난수, 번호 분산, 홀짝 균형, 합계 안정성,
                구간 편향 회피를 결합해 매번 다른 번호 리포트를 생성합니다.
              </p>
            </div>

            <div className="rounded-[1.7rem] border border-amber-300/20 bg-black/30 p-5">
              <p className="text-sm font-black text-amber-200">오늘의 리딩 방식</p>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                {["꿈 신호", "분산 보정", "패턴 제거", "이미지 저장"].map((x) => (
                  <div key={x} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 font-bold">
                    {x}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-xl sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-black text-amber-200">DREAM INPUT</p>
                <h2 className="mt-1 text-2xl font-black">꿈 내용 입력</h2>
              </div>
              <div className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-black text-amber-200">
                {dream.length}자
              </div>
            </div>

            <textarea
              value={dream}
              onChange={(e) => setDream(e.target.value)}
              placeholder="예: 낯선 바닷가에서 금빛 문을 열었고, 안쪽에 돈과 밝은 빛이 보였어요."
              className="mt-5 min-h-[240px] w-full resize-none rounded-[1.5rem] border border-amber-300/20 bg-black/35 p-5 text-base font-semibold leading-7 text-white outline-none placeholder:text-zinc-500 focus:border-amber-300/70 focus:shadow-[0_0_40px_rgba(250,204,21,0.12)]"
            />

            <div className="mt-5 flex flex-wrap gap-2">
              {signals.map((s) => (
                <span
                  key={s.key}
                  className="rounded-full border border-amber-300/25 bg-amber-300/10 px-3 py-2 text-xs font-black text-amber-100"
                >
                  #{s.label} · {s.tone}
                </span>
              ))}
            </div>

            <button
              onClick={generate}
              disabled={!dream.trim() || loading}
              className="mt-6 w-full rounded-[1.5rem] bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600 px-6 py-5 text-lg font-black text-black shadow-[0_18px_50px_rgba(250,204,21,0.22)] transition hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:from-zinc-600 disabled:to-zinc-700 disabled:text-zinc-300"
            >
              {loading ? "꿈 신호 해석 중..." : "프리미엄 번호 리포트 생성"}
            </button>
          </div>

          <aside className="rounded-[2rem] border border-amber-300/15 bg-black/35 p-5 shadow-2xl backdrop-blur-xl sm:p-7">
            <p className="text-sm font-black text-amber-200">QUALITY ENGINE</p>
            <h2 className="mt-1 text-2xl font-black">패턴형 추천 제거 로직</h2>

            <div className="mt-6 space-y-4">
              {[
                ["고정표 배제", "입력 문장과 실시간 보안 난수를 섞어 같은 꿈도 다른 결과를 만듭니다."],
                ["분산 검사", "특정 번호대에 몰리는 조합을 감지하고 다시 보정합니다."],
                ["극단값 회피", "합계가 지나치게 낮거나 높은 조합은 리포트에서 제외합니다."],
                ["근거 생성", "각 조합마다 합계·홀짝·저고·간격을 따로 설명합니다."],
              ].map(([a, b]) => (
                <div key={a} className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-5">
                  <p className="font-black text-white">{a}</p>
                  <p className="mt-2 text-sm font-medium leading-6 text-zinc-400">{b}</p>
                </div>
              ))}
            </div>

            <p className="mt-5 rounded-[1.4rem] border border-amber-300/20 bg-amber-300/10 p-4 text-sm font-bold leading-6 text-amber-100">
              로또는 확률 게임입니다. 이 서비스는 당첨 보장이 아니라 재미, 해석, 체류 경험을 위한 운세형 콘텐츠입니다.
            </p>
          </aside>
        </section>

        {picks.length > 0 && (
          <section
            ref={resultRef}
            className="rounded-[2rem] border border-amber-300/20 bg-[#09090b] p-5 shadow-2xl sm:p-8"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-black text-amber-200">RESULT REPORT</p>
                <h2 className="mt-1 text-3xl font-black sm:text-4xl">오늘의 꿈 번호 리포트</h2>
                <p className="mt-2 text-sm font-semibold text-zinc-400">
                  꿈 신호 기반 추천 5조합 · 보너스 후보 포함
                </p>
              </div>

              <button
                onClick={saveImage}
                className="rounded-2xl border border-amber-300/30 bg-amber-300 px-5 py-3 text-sm font-black text-black shadow-[0_12px_35px_rgba(250,204,21,0.25)]"
              >
                결과 이미지 저장
              </button>
            </div>

            <div className="mt-7 grid gap-5">
              {picks.map((pick) => (
                <article
                  key={pick.id}
                  className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.055]"
                >
                  <div className="border-b border-white/10 bg-gradient-to-r from-white/[0.08] to-amber-300/[0.08] p-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <h3 className="text-xl font-black text-white">{pick.title}</h3>
                        <p className="mt-2 text-sm font-semibold text-zinc-400">{pick.summary}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="rounded-2xl border border-amber-300/25 bg-amber-300/10 px-4 py-3 text-center">
                          <p className="text-xs font-black text-amber-200">해석 점수</p>
                          <p className="text-2xl font-black text-amber-300">{pick.score}</p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-center">
                          <p className="text-xs font-black text-zinc-400">보너스</p>
                          <p className="text-2xl font-black text-white">{pick.bonus}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                      {pick.numbers.map((n) => (
                        <Ball key={n} n={n} />
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4 p-5 lg:grid-cols-[0.8fr_1.2fr]">
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        ["합계", pick.balance.sum],
                        ["홀짝", `${pick.balance.odd}:${pick.balance.even}`],
                        ["저고", `${pick.balance.low}:${pick.balance.high}`],
                        ["간격", pick.balance.spread],
                      ].map(([a, b]) => (
                        <div key={a} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                          <p className="text-xs font-black text-zinc-500">{a}</p>
                          <p className="mt-1 text-xl font-black text-white">{b}</p>
                        </div>
                      ))}
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {pick.reason.map((r) => (
                        <p
                          key={r}
                          className="rounded-2xl border border-white/10 bg-black/25 p-4 text-sm font-semibold leading-6 text-zinc-300"
                        >
                          {r}
                        </p>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        <footer className="pb-6 text-center text-xs font-bold text-zinc-500">
          HAEMALA · 무료 운세형 번호 리딩 서비스 · 당첨 보장 없음
        </footer>
      </section>
    </main>
  );
}