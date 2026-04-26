"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const dreamPresets = [
  "돼지꿈",
  "물꿈",
  "불꿈",
  "뱀꿈",
  "돈꿈",
  "조상꿈",
  "아기꿈",
  "하늘을 나는 꿈",
  "시험 보는 꿈",
  "전 애인 꿈",
];

const symbolMap = [
  { key: "돼지", theme: "재물운", tone: "돈과 기회에 대한 기대감이 강한 꿈입니다." },
  { key: "물", theme: "흐름운", tone: "감정과 상황 변화가 커지는 꿈입니다." },
  { key: "불", theme: "폭발운", tone: "추진력과 에너지가 강하게 올라오는 꿈입니다." },
  { key: "뱀", theme: "반전운", tone: "불안과 기회가 함께 있는 꿈입니다." },
  { key: "돈", theme: "재물운", tone: "소유, 보상, 결과에 대한 욕구가 반영된 꿈입니다." },
  { key: "조상", theme: "메시지운", tone: "주의 신호나 방향 전환의 의미로 해석할 수 있습니다." },
  { key: "아기", theme: "시작운", tone: "새로운 가능성, 책임, 시작을 상징하는 꿈입니다." },
  { key: "하늘", theme: "상승운", tone: "확장, 도전, 욕망이 커지는 흐름입니다." },
  { key: "시험", theme: "압박운", tone: "평가받는 상황이나 불안감이 반영된 꿈입니다." },
  { key: "전 애인", theme: "미련운", tone: "정리되지 않은 감정이나 비교 심리가 남아 있을 수 있습니다." },
];

function hashText(text: string) {
  return text.split("").reduce((acc, char, index) => {
    return acc + char.charCodeAt(0) * (index + 3);
  }, 0);
}

function makeNumbers(text: string) {
  const seed = hashText(text || "해말아");
  const nums = new Set<number>();

  let i = 1;
  while (nums.size < 6) {
    const n = ((seed * (i * 17 + 11) + i * i * 13) % 45) + 1;
    nums.add(n);
    i++;
  }

  return Array.from(nums).sort((a, b) => a - b);
}

function analyzeDream(text: string) {
  const found = symbolMap.find((item) => text.includes(item.key));
  const base = found || {
    theme: "직감운",
    tone: "특정 상징보다 현재 감정과 고민이 강하게 반영된 꿈입니다.",
  };

  const seed = hashText(text);
  const luck = 45 + (seed % 46);
  const caution = 30 + ((seed * 7) % 61);

  const verdict =
    luck >= 82
      ? "오늘은 재미로 한 번 가볼 만합니다"
      : luck >= 65
        ? "가볍게 시도하기 좋은 흐름입니다"
        : luck >= 50
          ? "큰 기대보다 재미로만 접근하세요"
          : "오늘은 무리하지 않는 편이 낫습니다";

  return { ...base, luck, caution, verdict };
}

export default function DreamLottoPage() {
  const [dream, setDream] = useState("돼지꿈을 꿨는데 기분이 좋았다");
  const [round, setRound] = useState(0);

  const numbers = useMemo(() => makeNumbers(`${dream}-${round}`), [dream, round]);
  const analysis = useMemo(() => analyzeDream(dream), [dream]);

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
              DREAM LOTTO FUN TOOL
            </div>

            <h1 className="text-5xl font-black leading-tight tracking-tight md:text-7xl">
              꿈을 넣으면,
              <br />
              오늘의 재미 번호를
              <br />
              추천합니다.
            </h1>

            <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-black/60">
              꿈 로또는 해말아의 서브 재미 기능입니다. 꿈의 상징을 가볍게
              해석하고, 입력한 문장을 기준으로 매번 다른 번호 조합을 만듭니다.
              실제 당첨을 보장하지 않습니다.
            </p>
          </div>

          <div className="rounded-[2.5rem] border border-black/10 bg-white p-5 shadow-2xl shadow-black/10">
            <div className="rounded-[2rem] bg-black p-7 text-white">
              <p className="text-sm font-black text-white/45">TODAY DREAM VERDICT</p>
              <h2 className="mt-4 text-4xl font-black leading-tight">
                {analysis.verdict}
              </h2>
              <p className="mt-5 leading-7 text-white/65">{analysis.tone}</p>

              <div className="mt-8 grid grid-cols-6 gap-2">
                {numbers.map((num) => (
                  <div
                    key={num}
                    className="flex aspect-square items-center justify-center rounded-full bg-white text-lg font-black text-black md:text-xl"
                  >
                    {num}
                  </div>
                ))}
              </div>

              <button
                onClick={() => setRound((v) => v + 1)}
                className="mt-8 w-full rounded-2xl bg-white px-6 py-5 font-black text-black transition hover:-translate-y-0.5"
              >
                번호 다시 뽑기
              </button>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] border border-black/10 bg-white/80 p-6 shadow-sm md:p-8">
          <p className="text-sm font-black text-black/40">꿈 내용 입력</p>

          <textarea
            value={dream}
            onChange={(e) => setDream(e.target.value)}
            placeholder="예: 돼지꿈을 꿨는데 기분이 좋았다"
            className="mt-4 min-h-36 w-full resize-none rounded-2xl border border-black/10 bg-[#f7f3ec] px-5 py-4 text-lg font-bold leading-8 outline-none"
          />

          <div className="mt-5 flex flex-wrap gap-2">
            {dreamPresets.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setDream(`${item}을 꿨다`);
                  setRound((v) => v + 1);
                }}
                className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-black text-black/60 transition hover:bg-black hover:text-white"
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          <article className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm">
            <p className="text-sm font-black text-black/40">꿈 상징</p>
            <h3 className="mt-3 text-3xl font-black">{analysis.theme}</h3>
            <p className="mt-3 leading-7 text-black/60">{analysis.tone}</p>
          </article>

          <article className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm">
            <div className="mb-3 flex justify-between text-sm font-black">
              <span>재미 지수</span>
              <span>{analysis.luck}%</span>
            </div>
            <div className="h-3 rounded-full bg-black/10">
              <div
                className="h-3 rounded-full bg-black"
                style={{ width: `${analysis.luck}%` }}
              />
            </div>
            <p className="mt-4 text-sm font-bold leading-6 text-black/55">
              오늘 이 꿈을 재미로 해석했을 때의 기대감 지수입니다.
            </p>
          </article>

          <article className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm">
            <div className="mb-3 flex justify-between text-sm font-black">
              <span>과몰입 주의</span>
              <span>{analysis.caution}%</span>
            </div>
            <div className="h-3 rounded-full bg-black/10">
              <div
                className="h-3 rounded-full bg-black"
                style={{ width: `${analysis.caution}%` }}
              />
            </div>
            <p className="mt-4 text-sm font-bold leading-6 text-black/55">
              꿈 해석과 번호 추천은 오락용입니다. 과한 기대는 피하세요.
            </p>
          </article>
        </section>

        <section className="mt-10 rounded-[2.5rem] bg-black p-7 text-white shadow-2xl shadow-black/15 md:p-10">
          <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:items-center">
            <div>
              <p className="text-sm font-black text-white/45">HAEMALA CORE</p>
              <h2 className="mt-3 text-4xl font-black leading-tight md:text-5xl">
                꿈보다 중요한 건,
                <br />
                지금 내 선택입니다.
              </h2>
              <p className="mt-5 leading-7 text-white/65">
                꿈 로또는 재미 기능입니다. 진짜 고민이 있다면 성향테스트와
                선택 시뮬레이터에서 판단을 더 선명하게 확인하세요.
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
                지금 선택 시뮬레이션
              </Link>
              <Link
                href="/today"
                className="rounded-2xl border border-white/15 bg-white/10 px-6 py-5 text-center font-black text-white"
              >
                오늘의 결정운 보기
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] border border-black/10 bg-white/80 p-6 shadow-sm md:p-8">
          <h2 className="text-3xl font-black">꿈 로또 이용 안내</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "당첨 보장 아님",
                desc: "이 페이지는 오락용 번호 추천 도구입니다.",
              },
              {
                title: "입력 기반 생성",
                desc: "꿈 내용, 날짜, 다시 뽑기 횟수를 기준으로 번호가 생성됩니다.",
              },
              {
                title: "과몰입 금지",
                desc: "무리한 구매나 반복 구매를 권장하지 않습니다.",
              },
            ].map((item) => (
              <article key={item.title} className="rounded-2xl bg-[#f7f3ec] p-5">
                <h3 className="text-xl font-black">{item.title}</h3>
                <p className="mt-2 text-sm font-bold leading-6 text-black/55">
                  {item.desc}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}