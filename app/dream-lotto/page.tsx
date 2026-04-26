"use client";

import { useMemo, useState } from "react";

type LottoSet = {
  id: string;
  title: string;
  numbers: number[];
  bonus: number;
  reason: string;
  tone: string;
};

type DreamSignal = {
  label: string;
  weight: number;
  desc: string;
};

const DREAM_KEYWORDS: Record<string, DreamSignal> = {
  돼지: { label: "재물운", weight: 9, desc: "재물·횡재 상징이 강한 꿈" },
  똥: { label: "횡재운", weight: 10, desc: "전통적으로 강한 금전 상징" },
  물: { label: "흐름운", weight: 7, desc: "기회와 이동, 변화의 흐름" },
  바다: { label: "확장운", weight: 8, desc: "큰 판, 큰 변화, 장기운" },
  불: { label: "상승운", weight: 8, desc: "에너지·성과·주목의 상징" },
  돈: { label: "금전운", weight: 9, desc: "직접적인 재물 심상" },
  금: { label: "귀인운", weight: 9, desc: "가치·성과·인정의 상징" },
  용: { label: "대운", weight: 10, desc: "강한 상승과 전환의 상징" },
  뱀: { label: "변화운", weight: 8, desc: "전환·재생·기민함의 상징" },
  피: { label: "생명운", weight: 7, desc: "강한 에너지와 회복의 심상" },
  아기: { label: "시작운", weight: 7, desc: "새로운 기회와 출발" },
  집: { label: "기반운", weight: 6, desc: "안정·기초·생활 기반" },
  산: { label: "성취운", weight: 7, desc: "목표·극복·성취의 상징" },
  하늘: { label: "상승운", weight: 7, desc: "시야 확장과 높은 목표" },
  조상: { label: "보호운", weight: 8, desc: "조언·보호·기억의 심상" },
  대통령: { label: "권위운", weight: 8, desc: "권위·승진·사회적 인정" },
  연예인: { label: "인기운", weight: 6, desc: "주목·표현·외부 평가" },
  죽음: { label: "전환운", weight: 8, desc: "끝과 새 시작의 상징" },
  결혼: { label: "결합운", weight: 7, desc: "계약·연결·관계 확장" },
  비행기: { label: "도약운", weight: 8, desc: "이동·상승·큰 변화" },
};

const luckyAnchors = [3, 7, 8, 9, 11, 14, 17, 21, 23, 27, 31, 33, 37, 40, 42, 44];

function hashString(input: string) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
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

function pickUnique(
  rng: () => number,
  count: number,
  bias: number[],
  avoid: number[] = []
) {
  const result = new Set<number>();
  const avoidSet = new Set(avoid);

  while (result.size < count) {
    const useBias = rng() < 0.45 && bias.length > 0;
    const raw = useBias
      ? bias[Math.floor(rng() * bias.length)]
      : Math.floor(rng() * 45) + 1;

    const n = Math.min(45, Math.max(1, raw));

    if (!avoidSet.has(n)) result.add(n);
  }

  return Array.from(result).sort((a, b) => a - b);
}

function analyzeDream(text: string) {
  const clean = text.trim();
  const found = Object.entries(DREAM_KEYWORDS)
    .filter(([key]) => clean.includes(key))
    .map(([key, value]) => ({ key, ...value }))
    .sort((a, b) => b.weight - a.weight);

  const score = Math.min(
    100,
    Math.max(38, found.reduce((sum, item) => sum + item.weight * 7, 34))
  );

  const main = found[0] ?? {
    key: "직감",
    label: "직감운",
    weight: 5,
    desc: "꿈의 구체적 분위기와 개인적 직감 중심",
  };

  return { found, score, main };
}

function makeLottoSets(text: string): LottoSet[] {
  const baseSeed = hashString(`${text}|haemala-dream-lotto|2026`);
  const analysis = analyzeDream(text);
  const keywordBias = analysis.found.flatMap((item) => {
    const h = hashString(item.key + item.label);
    return [
      (h % 45) + 1,
      ((h >>> 3) % 45) + 1,
      luckyAnchors[(h >>> 5) % luckyAnchors.length],
    ];
  });

  const bias = [...new Set([...keywordBias, ...luckyAnchors])];

  const names = [
    "꿈기운 핵심 조합",
    "재물 흐름 보강 조합",
    "반전운 균형 조합",
    "고점 노림수 조합",
    "안정형 분산 조합",
  ];

  return names.map((title, idx) => {
    const rng = mulberry32(baseSeed + idx * 99991 + 77);
    const numbers = pickUnique(rng, 6, bias);
    const bonus = pickUnique(rng, 1, bias, numbers)[0];

    const tones = [
      "핵심 상징을 가장 강하게 반영한 조합입니다.",
      "금전·기회 흐름을 넓게 분산한 조합입니다.",
      "낮은 수와 높은 수의 균형을 의도한 조합입니다.",
      "꿈의 강한 이미지를 공격적으로 반영한 조합입니다.",
      "과열을 줄이고 안정감을 높인 조합입니다.",
    ];

    return {
      id: `${baseSeed}-${idx}`,
      title,
      numbers,
      bonus,
      tone: tones[idx],
      reason: `${analysis.main.label}을 중심으로 홀짝, 고저, 구간 분산을 섞었습니다.`,
    };
  });
}

export default function DreamLottoPage() {
  const [dream, setDream] = useState("");
  const [submitted, setSubmitted] = useState("");

  const analysis = useMemo(() => analyzeDream(submitted), [submitted]);
  const sets = useMemo(
    () => (submitted ? makeLottoSets(submitted) : []),
    [submitted]
  );

  const canSubmit = dream.trim().length >= 2;

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-950">
      <section className="mx-auto max-w-6xl px-5 py-8 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
          <div className="bg-gradient-to-br from-indigo-950 via-slate-950 to-purple-950 px-6 py-10 text-white sm:px-10">
            <p className="mb-3 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black text-white/80">
              꿈해몽 기반 로또 번호 생성기
            </p>

            <h1 className="max-w-3xl text-4xl font-black tracking-tight sm:text-6xl">
              어젯밤 꿈을 입력하면
              <br />
              오늘의 번호 조합을 뽑아드립니다
            </h1>

            <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-white/70 sm:text-lg">
              돼지, 똥, 물, 불, 용, 돈, 조상 같은 꿈의 상징을 분석해
              번호를 만듭니다. 저장 없이 브라우저 안에서만 작동합니다.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {["DB 없음", "무료 사용", "즉시 생성"].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/10 p-4 text-sm font-black"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 p-5 sm:p-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[1.7rem] border border-slate-200 bg-slate-50 p-5">
              <label className="text-sm font-black text-slate-700">
                꿈 내용을 적어주세요
              </label>

              <textarea
                value={dream}
                onChange={(e) => setDream(e.target.value)}
                placeholder="예: 큰 돼지가 집으로 들어왔고, 마당에 맑은 물이 흘렀어요."
                className="mt-3 min-h-[190px] w-full resize-none rounded-3xl border border-slate-200 bg-white p-5 text-base font-semibold leading-7 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
              />

              <button
                disabled={!canSubmit}
                onClick={() => setSubmitted(dream.trim())}
                className="mt-4 w-full rounded-3xl bg-slate-950 px-6 py-4 text-base font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-indigo-950 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:hover:translate-y-0"
              >
                꿈기운 번호 생성하기
              </button>

              <div className="mt-4 rounded-3xl bg-white p-4 text-sm font-semibold leading-6 text-slate-500">
                이 서비스는 재미와 콘텐츠용입니다. 로또 당첨을 보장하지
                않습니다. 과도한 구매는 피하고, 소액으로만 즐기세요.
              </div>
            </div>

            <div className="rounded-[1.7rem] border border-slate-200 bg-white p-5">
              <p className="text-sm font-black text-slate-500">오늘의 꿈기운</p>

              {submitted ? (
                <>
                  <div className="mt-4 flex items-end gap-3">
                    <strong className="text-5xl font-black">
                      {analysis.score}
                    </strong>
                    <span className="pb-2 text-sm font-black text-slate-500">
                      / 100
                    </span>
                  </div>

                  <p className="mt-3 text-xl font-black">
                    {analysis.main.label}
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
                    {analysis.main.desc}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {(analysis.found.length
                      ? analysis.found
                      : [{ key: "직감", label: "기본운", weight: 5 }]
                    ).map((item) => (
                      <span
                        key={item.key}
                        className="rounded-full bg-indigo-50 px-3 py-2 text-xs font-black text-indigo-700"
                      >
                        #{item.key} · {item.label}
                      </span>
                    ))}
                  </div>
                </>
              ) : (
                <div className="mt-5 rounded-3xl bg-slate-50 p-6 text-sm font-semibold leading-7 text-slate-500">
                  꿈을 입력하면 상징 키워드, 기운 점수, 추천 번호 조합이
                  표시됩니다.
                </div>
              )}
            </div>
          </div>
        </div>

        {sets.length > 0 && (
          <section className="mt-8">
            <div className="mb-4 flex items-end justify-between gap-3">
              <div>
                <p className="text-sm font-black text-indigo-700">
                  추천 번호 5세트
                </p>
                <h2 className="text-3xl font-black">꿈 기반 번호 조합</h2>
              </div>
              <button
                onClick={() => {
                  setDream("");
                  setSubmitted("");
                }}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-600"
              >
                다시하기
              </button>
            </div>

            <div className="grid gap-4">
              {sets.map((set, index) => (
                <article
                  key={set.id}
                  className="rounded-[1.7rem] border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className="text-xs font-black text-slate-400">
                        SET {index + 1}
                      </p>
                      <h3 className="mt-1 text-xl font-black">{set.title}</h3>
                      <p className="mt-2 text-sm font-semibold text-slate-500">
                        {set.tone} {set.reason}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {set.numbers.map((n) => (
                        <span
                          key={n}
                          className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-base font-black text-white shadow-sm"
                        >
                          {n}
                        </span>
                      ))}
                      <span className="px-1 text-xl font-black text-slate-300">
                        +
                      </span>
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-base font-black text-white shadow-sm">
                        {set.bonus}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "왜 이 번호인가요?",
              body: "꿈속 상징어를 숫자 시드로 바꾸고, 고저·홀짝·구간 분산을 적용했습니다.",
            },
            {
              title: "패턴형인가요?",
              body: "고정 번호표가 아니라 입력한 꿈 문장에 따라 결과가 달라지는 방식입니다.",
            },
            {
              title: "개인정보 저장하나요?",
              body: "아니요. 입력값은 서버나 DB에 저장하지 않고 현재 화면에서만 사용합니다.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-[1.7rem] border border-slate-200 bg-white p-5"
            >
              <h3 className="text-lg font-black">{item.title}</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
                {item.body}
              </p>
            </div>
          ))}
        </section>
      </section>
    </main>
  );
}