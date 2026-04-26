"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const moods = ["차분함", "흔들림", "과감함", "예민함", "귀찮음", "확신 있음"];

const cards = [
  {
    title: "오늘 해도 되는 선택",
    desc: "작게 시작할 수 있고, 실패해도 손실이 제한되는 일",
  },
  {
    title: "오늘 말아야 하는 선택",
    desc: "감정이 올라온 상태에서 돈, 관계, 커리어를 한 번에 거는 일",
  },
  {
    title: "오늘 유리한 전략",
    desc: "완벽한 결론보다 30분 안에 실행 가능한 최소 행동을 정하기",
  },
];

function getTodaySeed() {
  const d = new Date();
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

function makeScore(mood: string) {
  const base = getTodaySeed() + mood.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return {
    action: 45 + (base % 48),
    caution: 35 + ((base * 3) % 55),
    relation: 40 + ((base * 7) % 50),
    money: 30 + ((base * 11) % 55),
  };
}

export default function TodayPage() {
  const [mood, setMood] = useState("차분함");

  const score = useMemo(() => makeScore(mood), [mood]);

  const verdict =
    score.action >= 78
      ? "오늘은 해도 된다"
      : score.action >= 62
        ? "조건부로 해라"
        : score.action >= 50
          ? "조금만 해라"
          : "오늘은 말아라";

  const advice =
    mood === "과감함"
      ? "오늘은 추진력이 강한 날입니다. 다만 한 번에 크게 걸지 말고, 되돌릴 수 있는 선택부터 하세요."
      : mood === "흔들림"
        ? "오늘은 마음이 자주 바뀔 수 있습니다. 중요한 결정은 기록하고, 최소 3시간 뒤에 다시 보세요."
        : mood === "예민함"
          ? "오늘은 말과 반응에 민감해질 수 있습니다. 관계 문제는 즉답하지 않는 편이 좋습니다."
          : mood === "귀찮음"
            ? "오늘은 복잡한 판단보다 자동화된 작은 행동이 맞습니다. 큰 결정은 내일로 넘겨도 됩니다."
            : mood === "확신 있음"
              ? "오늘은 실행력이 좋은 날입니다. 단, 확신이 고집으로 바뀌는 순간만 조심하세요."
              : "오늘은 비교적 안정적인 판단이 가능합니다. 고민을 오래 끌기보다 작은 실행으로 확인하세요.";

  return (
    <main className="min-h-screen bg-[#f7f3ec] px-5 py-8 text-[#17130f]">
      <div className="mx-auto max-w-6xl">
        <nav className="mb-10 flex items-center justify-between">
          <Link href="/" className="text-2xl font-black">
            해말아
          </Link>
          <Link
            href="/test/play"
            className="rounded-full bg-black px-5 py-3 text-sm font-black text-white"
          >
            성향테스트
          </Link>
        </nav>

        <section className="grid gap-8 md:grid-cols-[1fr_0.9fr] md:items-center">
          <div>
            <div className="mb-5 inline-flex rounded-full border border-black/10 bg-white/80 px-4 py-2 text-sm font-black text-black/50">
              TODAY DECISION INDEX
            </div>

            <h1 className="text-5xl font-black leading-tight tracking-tight md:text-7xl">
              오늘,
              <br />
              해도 될까
              <br />
              말아야 할까?
            </h1>

            <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-black/60">
              오늘의 기분과 날짜를 기준으로 결정 지수를 계산합니다. 중요한
              선택을 하기 전, 지금 밀어붙여도 되는지 가볍게 점검하세요.
            </p>
          </div>

          <div className="rounded-[2.5rem] border border-black/10 bg-white p-5 shadow-2xl shadow-black/10">
            <div className="rounded-[2rem] bg-black p-7 text-white">
              <p className="text-sm font-black text-white/45">오늘의 판정</p>
              <h2 className="mt-4 text-5xl font-black">{verdict}</h2>
              <p className="mt-5 leading-7 text-white/70">{advice}</p>

              <div className="mt-8">
                <div className="mb-2 flex justify-between text-sm font-black">
                  <span>실행 지수</span>
                  <span>{score.action}%</span>
                </div>
                <div className="h-4 rounded-full bg-white/10">
                  <div
                    className="h-4 rounded-full bg-white transition-all"
                    style={{ width: `${score.action}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 rounded-[2rem] border border-black/10 bg-white/80 p-5 shadow-sm md:p-7">
          <p className="text-sm font-black text-black/40">지금 내 상태</p>
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-6">
            {moods.map((item) => (
              <button
                key={item}
                onClick={() => setMood(item)}
                className={`rounded-2xl px-4 py-4 text-sm font-black transition ${
                  mood === item
                    ? "bg-black text-white"
                    : "bg-[#f7f3ec] text-black hover:bg-black/5"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.title}
              className="rounded-[2rem] border border-black/10 bg-white/80 p-6 shadow-sm"
            >
              <p className="text-sm font-black text-black/40">TODAY</p>
              <h3 className="mt-3 text-2xl font-black">{card.title}</h3>
              <p className="mt-3 leading-7 text-black/60">{card.desc}</p>
            </article>
          ))}
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ["주의 지수", score.caution],
            ["관계 지수", score.relation],
            ["소비 지수", score.money],
          ].map(([label, value]) => (
            <article
              key={label}
              className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm"
            >
              <div className="mb-3 flex justify-between text-sm font-black">
                <span>{label}</span>
                <span>{value}%</span>
              </div>
              <div className="h-3 rounded-full bg-black/10">
                <div
                  className="h-3 rounded-full bg-black"
                  style={{ width: `${value}%` }}
                />
              </div>
            </article>
          ))}
        </section>

        <section className="mt-12 rounded-[2.5rem] bg-black p-7 text-white shadow-2xl shadow-black/15 md:p-10">
          <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:items-center">
            <div>
              <p className="text-sm font-black text-white/45">NEXT STEP</p>
              <h2 className="mt-3 text-4xl font-black leading-tight md:text-5xl">
                오늘 판정만 보고
                <br />
                끝내지 마세요.
              </h2>
              <p className="mt-5 leading-7 text-white/65">
                내 성향까지 같이 보면 판단 정확도가 훨씬 좋아집니다.
              </p>
            </div>

            <div className="grid gap-3">
              <Link
                href="/test/play"
                className="rounded-2xl bg-white px-6 py-5 text-center font-black text-black"
              >
                내 결정 성향 테스트하기
              </Link>
              <Link
                href="/simulate"
                className="rounded-2xl border border-white/15 bg-white/10 px-6 py-5 text-center font-black text-white"
              >
                지금 선택 시뮬레이션하기
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}