"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const presets = [
  "연락할까 말까",
  "살까 말까",
  "먹을까 말까",
  "갈까 말까",
  "시작할까 말까",
  "그만둘까 말까",
  "고백할까 말까",
  "기다릴까 말까",
];

const results = [
  {
    verdict: "해라",
    tone: "지금은 움직이는 쪽이 낫습니다.",
    desc: "단, 크게 걸지 말고 되돌릴 수 있는 선에서 작게 실행하세요.",
  },
  {
    verdict: "말아라",
    tone: "오늘은 멈추는 쪽이 낫습니다.",
    desc: "감정이 올라온 상태라면 판단이 과격해질 수 있습니다.",
  },
  {
    verdict: "조금만 해라",
    tone: "완전 실행보다 테스트 실행이 맞습니다.",
    desc: "작게 해보고 반응을 확인한 뒤 다음 선택을 하세요.",
  },
  {
    verdict: "3시간 뒤 다시 봐라",
    tone: "지금 바로 결정하기엔 흔들림이 있습니다.",
    desc: "시간을 조금 두면 진짜 원하는 선택이 더 선명해집니다.",
  },
  {
    verdict: "조건부로 해라",
    tone: "가능성은 있지만 기준이 필요합니다.",
    desc: "손실선, 시간, 돈, 관계 리스크를 먼저 정한 뒤 움직이세요.",
  },
];

function pickResult(text: string, pressure: number) {
  const seed =
    text.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) +
    pressure * 17 +
    new Date().getDate();

  return results[seed % results.length];
}

export default function RandomPage() {
  const [question, setQuestion] = useState("연락할까 말까");
  const [pressure, setPressure] = useState(50);
  const [count, setCount] = useState(0);

  const result = useMemo(
    () => pickResult(question + count, pressure),
    [question, pressure, count]
  );

  const decisionPower =
    pressure >= 80
      ? "판단 과열 상태"
      : pressure >= 60
        ? "결정 압박 높음"
        : pressure >= 40
          ? "판단 가능 상태"
          : "여유 있는 상태";

  return (
    <main className="min-h-screen bg-[#f7f3ec] px-5 py-8 text-[#17130f]">
      <div className="mx-auto max-w-6xl">
        <nav className="mb-10 flex items-center justify-between">
          <Link href="/" className="text-2xl font-black">
            해말아
          </Link>

          <div className="flex gap-2">
            <Link
              href="/test/play"
              className="rounded-full bg-black px-5 py-3 text-sm font-black text-white"
            >
              성향테스트
            </Link>
          </div>
        </nav>

        <section className="grid gap-8 md:grid-cols-[1fr_0.9fr] md:items-center">
          <div>
            <div className="mb-5 inline-flex rounded-full border border-black/10 bg-white/80 px-4 py-2 text-sm font-black text-black/50">
              QUICK DECISION TOOL
            </div>

            <h1 className="text-5xl font-black leading-tight tracking-tight md:text-7xl">
              생각이 너무 많을 때,
              <br />
              한 번 끊어주는
              <br />
              랜덤 결정기.
            </h1>

            <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-black/60">
              진짜 중요한 결정은 성향테스트와 시뮬레이터로 가고, 지금처럼
              머리가 복잡할 때는 랜덤 결정기로 판단 과부하를 끊으세요.
            </p>
          </div>

          <div className="rounded-[2.5rem] border border-black/10 bg-white p-5 shadow-2xl shadow-black/10">
            <div className="rounded-[2rem] bg-black p-7 text-white">
              <p className="text-sm font-black text-white/45">RANDOM VERDICT</p>
              <h2 className="mt-4 text-6xl font-black">{result.verdict}</h2>
              <p className="mt-5 text-xl font-black leading-8 text-white/85">
                {result.tone}
              </p>
              <p className="mt-3 leading-7 text-white/65">{result.desc}</p>

              <button
                onClick={() => setCount((v) => v + 1)}
                className="mt-8 w-full rounded-2xl bg-white px-6 py-5 font-black text-black transition hover:-translate-y-0.5"
              >
                다시 판정하기
              </button>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] border border-black/10 bg-white/80 p-6 shadow-sm md:p-8">
          <p className="text-sm font-black text-black/40">내 고민 입력</p>

          <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto]">
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="예: 연락할까 말까"
              className="rounded-2xl border border-black/10 bg-[#f7f3ec] px-5 py-4 text-lg font-black outline-none"
            />

            <button
              onClick={() => setCount((v) => v + 1)}
              className="rounded-2xl bg-black px-7 py-4 font-black text-white"
            >
              판정
            </button>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {presets.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setQuestion(item);
                  setCount((v) => v + 1);
                }}
                className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-black text-black/60 transition hover:bg-black hover:text-white"
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-black text-black/40">결정 압박 지수</p>
              <h2 className="mt-2 text-3xl font-black">{decisionPower}</h2>
            </div>

            <p className="text-4xl font-black">{pressure}%</p>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={pressure}
            onChange={(e) => setPressure(Number(e.target.value))}
            className="mt-6 w-full"
          />

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl bg-[#f7f3ec] p-4">
              <p className="text-sm font-black text-black/40">낮음</p>
              <p className="mt-1 text-sm font-bold text-black/55">
                충분히 생각할 여유가 있음
              </p>
            </div>
            <div className="rounded-2xl bg-[#f7f3ec] p-4">
              <p className="text-sm font-black text-black/40">중간</p>
              <p className="mt-1 text-sm font-bold text-black/55">
                빠른 기준 정리가 필요함
              </p>
            </div>
            <div className="rounded-2xl bg-[#f7f3ec] p-4">
              <p className="text-sm font-black text-black/40">높음</p>
              <p className="mt-1 text-sm font-bold text-black/55">
                즉흥 결정 위험이 있음
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "진짜 중요한 선택인가?",
              desc: "돈, 관계, 커리어가 걸려 있다면 랜덤 말고 시뮬레이터로 가세요.",
              href: "/simulate",
              cta: "시뮬레이터 열기",
            },
            {
              title: "내 패턴이 궁금한가?",
              desc: "왜 매번 같은 고민을 반복하는지 성향테스트로 확인하세요.",
              href: "/test/play",
              cta: "성향테스트 하기",
            },
            {
              title: "오늘 운이 궁금한가?",
              desc: "오늘 밀어붙일 선택과 피해야 할 선택을 확인하세요.",
              href: "/today",
              cta: "오늘의 결정운",
            },
          ].map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="rounded-[2rem] border border-black/10 bg-white/80 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10"
            >
              <h3 className="text-2xl font-black">{card.title}</h3>
              <p className="mt-3 leading-7 text-black/60">{card.desc}</p>
              <p className="mt-6 text-sm font-black">{card.cta} →</p>
            </Link>
          ))}
        </section>

        <section className="mt-10 rounded-[2.5rem] bg-black p-7 text-white shadow-2xl shadow-black/15 md:p-10">
          <p className="text-sm font-black text-white/45">주의</p>
          <h2 className="mt-3 text-3xl font-black md:text-5xl">
            랜덤 결정기는 가벼운 선택용입니다.
          </h2>
          <p className="mt-5 max-w-3xl leading-7 text-white/65">
            중요한 선택은 랜덤으로 결정하지 마세요. 해말아의 핵심은 무작위가
            아니라, 성향과 상황을 보고 선택을 더 선명하게 만드는 것입니다.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/test/play"
              className="rounded-2xl bg-white px-7 py-4 text-center font-black text-black"
            >
              성향테스트로 제대로 보기
            </Link>
            <Link
              href="/simulate"
              className="rounded-2xl border border-white/15 bg-white/10 px-7 py-4 text-center font-black text-white"
            >
              지금 선택 시뮬레이션
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}