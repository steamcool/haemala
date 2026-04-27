"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Result = {
  answer: "해" | "말아";
  title: string;
  message: string;
  reason: string;
  action: string;
};

const examples = [
  "오늘 야식 먹을까 말까?",
  "그 사람한테 연락할까 말까?",
  "이 물건 지금 살까 말까?",
  "운동하러 나갈까 말까?",
  "퇴사 준비 시작할까 말까?",
];

const doResults: Result[] = [
  {
    answer: "해",
    title: "해도 된다",
    message: "지금은 고민보다 실행이 더 이득인 상황에 가깝다.",
    reason: "리스크가 감당 가능한 수준이라면, 더 미루는 것보다 작게라도 해보는 쪽이 낫다.",
    action: "단, 크게 벌이지 말고 오늘 안에 끝낼 수 있는 가장 작은 행동부터 해라.",
  },
  {
    answer: "해",
    title: "일단 해봐라",
    message: "완벽한 확신을 기다리면 계속 멈춰 있을 가능성이 높다.",
    reason: "이 선택은 생각만으로 답이 나는 문제가 아니라, 해봐야 감이 오는 유형이다.",
    action: "10분만 해보고 계속할지 다시 판단해라.",
  },
  {
    answer: "해",
    title: "이번엔 하는 쪽",
    message: "지금의 망설임은 위험 신호라기보다 귀찮음에 가까워 보인다.",
    reason: "실패해도 손실이 크지 않다면, 경험값을 얻는 쪽이 더 남는다.",
    action: "바로 시작 시간을 정하고 알림을 맞춰라.",
  },
];

const stopResults: Result[] = [
  {
    answer: "말아",
    title: "지금은 말아라",
    message: "충동이 앞서고 판단 근거가 약한 상태일 수 있다.",
    reason: "나중에 후회할 가능성이 조금이라도 크다면, 오늘 바로 결정할 필요는 없다.",
    action: "하루만 미루고 내일도 하고 싶으면 그때 다시 판단해라.",
  },
  {
    answer: "말아",
    title: "이번엔 멈춰라",
    message: "지금 필요한 건 실행보다 정리다.",
    reason: "선택 자체보다 선택 이후의 비용을 아직 충분히 계산하지 않은 상태로 보인다.",
    action: "돈, 시간, 감정 소모를 각각 한 줄씩 적어보고 다시 결정해라.",
  },
  {
    answer: "말아",
    title: "안 하는 쪽",
    message: "지금 이 선택은 얻는 것보다 신경 쓸 일이 더 많아질 수 있다.",
    reason: "해야 할 이유가 명확하지 않다면 하지 않는 것도 충분히 좋은 결정이다.",
    action: "대신 지금 해야 하는 가장 중요한 일 하나로 돌아가라.",
  },
];

function pickResult(question: string): Result {
  const seed = Array.from(question || String(Date.now())).reduce(
    (acc, char) => acc + char.charCodeAt(0),
    0
  );

  const shouldDo = seed % 100 >= 47;
  const pool = shouldDo ? doResults : stopResults;
  return pool[seed % pool.length];
}

export default function RandomPage() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [copied, setCopied] = useState(false);

  const canDecide = question.trim().length >= 2;

  const shareText = useMemo(() => {
    if (!result) return "";
    return `내 고민: ${question}\n해말아 결과: ${result.title}\n${result.message}\n\nhttps://www.haemala.com/random`;
  }, [question, result]);

  const decide = () => {
    if (!canDecide) return;
    setCopied(false);
    setResult(pickResult(question.trim()));
  };

  const retry = () => {
    if (!canDecide) return;
    const mixed = `${question.trim()}-${Date.now()}`;
    setCopied(false);
    setResult(pickResult(mixed));
  };

  const copyShareText = async () => {
    if (!shareText) return;
    await navigator.clipboard.writeText(shareText);
    setCopied(true);
  };

  return (
    <main className="min-h-screen bg-[#faf7f1] px-5 py-8 text-[#211a14] sm:px-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-10 flex items-center justify-between">
          <Link href="/" className="text-xl font-black tracking-tight">
            해말아
          </Link>
          <Link
            href="/test"
            className="rounded-full border border-[#e2d2c1] bg-white px-4 py-2 text-sm font-bold text-[#6f6258]"
          >
            결정 성향 테스트
          </Link>
        </header>

        <section className="rounded-[2rem] border border-[#eadccc] bg-white p-6 shadow-xl shadow-[#d9c5ad]/30 sm:p-9">
          <p className="mb-4 inline-flex rounded-full bg-[#fff2df] px-4 py-2 text-sm font-black text-[#8a5a2b]">
            해말아 핵심 기능
          </p>

          <h1 className="text-4xl font-black leading-tight tracking-[-0.05em] sm:text-6xl">
            할까 말까,
            <br />
            바로 정해준다.
          </h1>

          <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-[#6f6258] sm:text-lg">
            고민을 한 문장으로 적어라. 해말아가 지금 선택을 미뤄야 할지,
            작게라도 실행해야 할지 바로 정리해준다.
          </p>

          <div className="mt-8">
            <label className="mb-3 block text-sm font-black text-[#5f5147]">
              지금 고민 중인 선택
            </label>

            <textarea
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value);
                setResult(null);
                setCopied(false);
              }}
              placeholder="예: 오늘 야식 먹을까 말까?"
              className="min-h-32 w-full resize-none rounded-3xl border border-[#eadccc] bg-[#fffaf4] p-5 text-lg font-semibold outline-none transition placeholder:text-[#b8a99a] focus:border-[#211a14]"
            />

            <div className="mt-4 flex flex-wrap gap-2">
              {examples.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setQuestion(item);
                    setResult(null);
                    setCopied(false);
                  }}
                  className="rounded-full border border-[#eadccc] bg-white px-4 py-2 text-sm font-bold text-[#6f6258] transition hover:border-[#211a14] hover:text-[#211a14]"
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              onClick={decide}
              disabled={!canDecide}
              className="mt-7 w-full rounded-3xl bg-[#211a14] px-7 py-5 text-lg font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:bg-[#c8b9a8] sm:w-auto"
            >
              해말아 결정하기
            </button>
          </div>
        </section>

        {result && (
          <section className="mt-6 rounded-[2rem] border border-[#eadccc] bg-white p-6 shadow-xl shadow-[#d9c5ad]/30 sm:p-9">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-black text-[#8a5a2b]">RESULT</p>
                <h2 className="mt-2 text-5xl font-black tracking-[-0.06em] sm:text-7xl">
                  {result.answer}
                </h2>
              </div>

              <div className="rounded-3xl bg-[#211a14] px-5 py-4 text-white">
                <p className="text-sm font-bold text-[#d8c6b6]">오늘의 판단</p>
                <p className="mt-1 text-2xl font-black">{result.title}</p>
              </div>
            </div>

            <div className="mt-8 grid gap-4">
              <div className="rounded-3xl bg-[#fffaf4] p-5">
                <h3 className="text-sm font-black text-[#8a5a2b]">한 줄 판단</h3>
                <p className="mt-2 text-lg font-bold leading-7">
                  {result.message}
                </p>
              </div>

              <div className="rounded-3xl bg-[#fffaf4] p-5">
                <h3 className="text-sm font-black text-[#8a5a2b]">이유</h3>
                <p className="mt-2 text-base font-medium leading-7 text-[#5f5147]">
                  {result.reason}
                </p>
              </div>

              <div className="rounded-3xl bg-[#fffaf4] p-5">
                <h3 className="text-sm font-black text-[#8a5a2b]">지금 할 일</h3>
                <p className="mt-2 text-base font-bold leading-7">
                  {result.action}
                </p>
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={retry}
                className="rounded-2xl border border-[#dfd0bf] bg-white px-6 py-4 text-base font-black text-[#211a14] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                다시 판단하기
              </button>

              <button
                onClick={copyShareText}
                className="rounded-2xl bg-[#211a14] px-6 py-4 text-base font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                {copied ? "복사 완료" : "결과 공유 문구 복사"}
              </button>
            </div>
          </section>
        )}

        <section className="mt-6 rounded-[2rem] border border-[#eadccc] bg-[#fffaf4] p-6">
          <h2 className="text-xl font-black tracking-[-0.03em]">
            이 기능은 이렇게 쓰면 좋다
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              "사소하지만 계속 신경 쓰이는 선택",
              "친구에게 물어보기 애매한 고민",
              "오늘 안에 결론 내야 하는 일",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-[#eadccc] bg-white p-4 text-sm font-bold leading-6 text-[#5f5147]"
              >
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}