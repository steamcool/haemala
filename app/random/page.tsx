"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Mode = "choice" | "luck" | "mood" | "mission";

type Result = {
  title: string;
  verdict: string;
  score: number;
  reason: string;
  action: string;
  tags: string[];
};

const modes: { id: Mode; name: string; desc: string }[] = [
  { id: "choice", name: "랜덤 선택", desc: "할지 말지, A/B 선택" },
  { id: "luck", name: "오늘 운세", desc: "오늘의 흐름 확인" },
  { id: "mood", name: "기분 전환", desc: "지금 상태 리셋" },
  { id: "mission", name: "오늘 미션", desc: "가볍게 실행할 행동" },
];

const samples = [
  "오늘 운동 갈까 말까",
  "치킨 먹을까 말까",
  "연락할까 말까",
  "지금 공부할까 쉴까",
  "주말에 나갈까 집에 있을까",
];

const verdicts = {
  choice: ["해라", "말아라", "조금만 해라", "오늘은 보류", "작게 시작해라"],
  luck: ["상승 흐름", "정리의 날", "기회 포착", "무리 금지", "귀인운 있음"],
  mood: ["리셋 필요", "움직이면 풀림", "쉬어야 회복", "정리하면 안정", "가볍게 웃어라"],
  mission: ["10분 산책", "물 한 컵", "책상 정리", "메모 3줄", "연락 하나"],
};

const reasons = [
  "지금은 고민을 오래 끌수록 에너지만 빠지는 흐름입니다.",
  "작게 실행하면 손해보다 정보가 더 많이 쌓이는 상황입니다.",
  "과몰입을 줄이고 선택지를 단순화하는 쪽이 유리합니다.",
  "오늘은 큰 결정보다 가벼운 확인과 테스트가 적합합니다.",
  "기분과 체력이 판단에 영향을 주고 있으니 속도를 낮추는 게 좋습니다.",
  "완벽한 답보다 빠른 첫 행동이 결과를 바꿀 가능성이 큽니다.",
];

const actions = [
  "딱 10분만 해보고 계속할지 다시 판단하세요.",
  "지금 바로 가장 작은 행동 하나만 실행하세요.",
  "오늘은 결론보다 기록을 남기는 쪽으로 가세요.",
  "선택지를 2개로 줄이고 더 가벼운 쪽을 고르세요.",
  "30분 뒤에도 같은 생각이면 실행하세요.",
  "돈, 시간, 감정 소모가 크면 오늘은 보류하세요.",
];

const tagPool = [
  "직감",
  "타이밍",
  "가벼운실행",
  "무리금지",
  "기회",
  "리셋",
  "정리",
  "재시도",
  "속도조절",
  "오늘운",
];

function hashString(input: string) {
  let h = 1779033703 ^ input.length;
  for (let i = 0; i < input.length; i++) {
    h = Math.imul(h ^ input.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return h >>> 0;
}

function rng(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(list: T[], random: () => number) {
  return list[Math.floor(random() * list.length)];
}

function makeResult(mode: Mode, input: string, spin: number): Result {
  const seed = hashString(`${mode}|${input}|${spin}|haemala-random`);
  const random = rng(seed);

  const score = Math.floor(51 + random() * 49);
  const title = pick(verdicts[mode], random);
  const selectedTags = Array.from(
    new Set([
      pick(tagPool, random),
      pick(tagPool, random),
      pick(tagPool, random),
    ])
  ).slice(0, 3);

  return {
    title,
    verdict:
      mode === "choice"
        ? score >= 75
          ? "강하게 실행"
          : score >= 62
            ? "작게 실행"
            : "보류 추천"
        : score >= 80
          ? "좋은 흐름"
          : score >= 65
            ? "보통 이상"
            : "속도 조절",
    score,
    reason: pick(reasons, random),
    action: pick(actions, random),
    tags: selectedTags,
  };
}

export default function RandomPage() {
  const [mode, setMode] = useState<Mode>("choice");
  const [input, setInput] = useState("");
  const [spin, setSpin] = useState(1);

  const result = useMemo(
    () => makeResult(mode, input.trim() || "오늘의 랜덤", spin),
    [mode, input, spin]
  );

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-950">
      <section className="mx-auto max-w-6xl px-5 py-8 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
          <div className="bg-gradient-to-br from-slate-950 via-indigo-950 to-fuchsia-950 px-6 py-10 text-white sm:px-10">
            <p className="mb-4 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black text-white/80">
              HAEMALA RANDOM
            </p>

            <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
              오늘의 랜덤 선택
              <br />
              한 번 눌러서 정해보세요
            </h1>

            <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-white/70">
              고민, 운세, 기분, 미션을 버튼 하나로 뽑습니다. 회원가입 없이
              바로 쓰는 무료 랜덤 콘텐츠입니다.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-4">
              {modes.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setMode(item.id)}
                  className={`rounded-2xl border p-4 text-left transition ${
                    mode === item.id
                      ? "border-white bg-white text-slate-950"
                      : "border-white/10 bg-white/10 text-white hover:bg-white/15"
                  }`}
                >
                  <p className="text-sm font-black">{item.name}</p>
                  <p
                    className={`mt-1 text-xs font-semibold ${
                      mode === item.id ? "text-slate-500" : "text-white/55"
                    }`}
                  >
                    {item.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 p-5 sm:p-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[1.7rem] border border-slate-200 bg-slate-50 p-5">
              <label className="text-sm font-black text-slate-700">
                고민이나 주제를 입력하세요
              </label>

              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="예: 오늘 운동 갈까 말까?"
                className="mt-3 min-h-[160px] w-full resize-none rounded-3xl border border-slate-200 bg-white p-5 text-base font-semibold leading-7 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
              />

              <div className="mt-3 flex flex-wrap gap-2">
                {samples.map((sample) => (
                  <button
                    key={sample}
                    onClick={() => setInput(sample)}
                    className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-black text-slate-600"
                  >
                    {sample}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setSpin((v) => v + 1)}
                className="mt-5 w-full rounded-3xl bg-slate-950 px-6 py-4 text-base font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-indigo-700"
              >
                랜덤 결과 다시 뽑기
              </button>

              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                {["즉시결과", "무료", "저장없음"].map((v) => (
                  <div
                    key={v}
                    className="rounded-2xl bg-white p-3 text-xs font-black text-slate-500"
                  >
                    {v}
                  </div>
                ))}
              </div>
            </div>

            <article className="rounded-[1.7rem] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-black text-indigo-700">
                    랜덤 결과
                  </p>
                  <h2 className="mt-2 text-4xl font-black tracking-tight">
                    {result.title}
                  </h2>
                </div>

                <div className="rounded-3xl bg-slate-950 px-5 py-4 text-center text-white">
                  <p className="text-xs font-black text-white/50">점수</p>
                  <p className="text-3xl font-black">{result.score}</p>
                </div>
              </div>

              <div className="mt-5 rounded-3xl bg-indigo-50 p-5">
                <p className="text-sm font-black text-indigo-700">
                  {result.verdict}
                </p>
                <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">
                  {result.reason}
                </p>
              </div>

              <div className="mt-4 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-black text-slate-700">
                  지금 할 행동
                </p>
                <p className="mt-2 text-lg font-black leading-7">
                  {result.action}
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {result.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-3 py-2 text-xs font-black text-slate-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Link
                  href="/today"
                  className="rounded-3xl bg-slate-950 px-5 py-4 text-center text-sm font-black text-white transition hover:bg-indigo-700"
                >
                  더 진지하게 판단받기
                </Link>
                <Link
                  href="/dream-lotto"
                  className="rounded-3xl border border-slate-200 bg-white px-5 py-4 text-center text-sm font-black text-slate-700 transition hover:bg-slate-50"
                >
                  꿈해몽 로또 보기
                </Link>
              </div>
            </article>
          </div>
        </div>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "완전 고정 패턴 아님",
              body: "선택 모드, 입력 문장, 다시 뽑기 횟수를 조합해 매번 다른 결과를 만듭니다.",
            },
            {
              title: "모바일 우선 구조",
              body: "짧은 입력, 큰 버튼, 카드형 결과로 스마트폰에서 빠르게 소비되도록 설계했습니다.",
            },
            {
              title: "내부 이동 강화",
              body: "결과 확인 후 /today, /dream-lotto로 이어지게 만들어 체류 흐름을 늘립니다.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-[1.7rem] border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h3 className="text-lg font-black">{item.title}</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
                {item.body}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-[2rem] bg-slate-950 p-6 text-white sm:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-black text-white/50">
                오늘 고민이 더 크다면
              </p>
              <h2 className="mt-2 text-3xl font-black">해말아 판단으로 이동</h2>
              <p className="mt-2 text-sm font-semibold text-white/60">
                랜덤보다 구체적인 판단이 필요하면 오늘의 해말아를 사용하세요.
              </p>
            </div>

            <Link
              href="/today"
              className="rounded-3xl bg-white px-7 py-4 text-center text-base font-black text-slate-950 transition hover:-translate-y-0.5"
            >
              /today 바로가기
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}