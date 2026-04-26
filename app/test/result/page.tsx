"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  aiTypeDescriptions,
  aiTypeNames,
  mbtiReports,
  type AiType,
  type MbtiType,
} from "../data";

type Score = Record<MbtiType | AiType, number>;

const aiKeys: AiType[] = ["PROMPT", "TOOL", "STRUCTURE", "VERIFY", "AUTO", "EXPERIMENT"];

function getMBTI(score: Score) {
  return [
    score.E >= score.I ? "E" : "I",
    score.S >= score.N ? "S" : "N",
    score.T >= score.F ? "T" : "F",
    score.J >= score.P ? "J" : "P",
  ].join("");
}

function getTopAIType(score: Score): AiType {
  return aiKeys.reduce((best, key) => (score[key] > score[best] ? key : best), "PROMPT" as AiType);
}

function getAIQ(score: Score) {
  const total = aiKeys.reduce((sum, key) => sum + score[key], 0);
  const max = 6 * 8 * 3;
  return Math.round((total / max) * 100);
}

function getAILevel(aiq: number) {
  if (aiq >= 90) return "AI 마스터";
  if (aiq >= 75) return "AI 조련사";
  if (aiq >= 60) return "AI 실전러";
  if (aiq >= 40) return "AI 연습생";
  return "AI 새싹";
}

function getMixTitle(mbti: string, aiType: AiType) {
  if (aiType === "PROMPT") return `${mbti} · AI 질문 설계자`;
  if (aiType === "TOOL") return `${mbti} · AI 도구 탐험가`;
  if (aiType === "STRUCTURE") return `${mbti} · AI 정리 설계자`;
  if (aiType === "VERIFY") return `${mbti} · AI 팩트체커`;
  if (aiType === "AUTO") return `${mbti} · AI 자동화러`;
  return `${mbti} · AI 실험가`;
}

function getMBTIAdvice(mbti: string) {
  const first = mbti[0];
  const second = mbti[1];
  const third = mbti[2];
  const fourth = mbti[3];

  return {
    energy:
      first === "E"
        ? "사람과 대화하면서 생각이 빨리 정리되는 편입니다. 혼자 오래 붙잡기보다 누군가에게 말하면서 방향을 잡을 때 효율이 좋습니다."
        : "혼자 생각할 시간이 있어야 판단이 선명해지는 편입니다. 즉흥적인 대화보다 조용히 정리한 뒤 말할 때 강점이 잘 나옵니다.",
    information:
      second === "S"
        ? "현실적인 조건과 실제 사례를 중요하게 봅니다. 추상적인 가능성보다 지금 가능한 선택지를 확인할 때 안정적인 판단을 합니다."
        : "가능성과 흐름을 잘 봅니다. 당장 보이는 조건보다 앞으로 어떻게 바뀔지 상상하면서 선택하는 힘이 있습니다.",
    decision:
      third === "T"
        ? "결정할 때 논리와 기준을 중요하게 봅니다. 감정에 휩쓸리기보다 무엇이 더 맞는지 따져보는 힘이 있습니다."
        : "결정할 때 사람의 마음과 관계를 중요하게 봅니다. 선택이 주변에 어떤 영향을 줄지 살피는 힘이 있습니다.",
    lifestyle:
      fourth === "J"
        ? "정리와 계획이 있을 때 안정감을 느낍니다. 목표를 정하고 순서대로 처리할 때 성과가 잘 납니다."
        : "선택지를 열어두고 유연하게 움직일 때 편합니다. 상황이 바뀌어도 즉흥적으로 적응하는 힘이 있습니다.",
  };
}

function getAIAdvice(aiType: AiType) {
  const data: Record<AiType, { strength: string; weakness: string; action: string }> = {
    PROMPT: {
      strength: "AI에게 원하는 답을 끌어내는 질문 감각이 좋습니다.",
      weakness: "가끔은 질문을 너무 길게 만들다가 핵심이 흐려질 수 있습니다.",
      action: "목적, 조건, 출력형식 3가지만 먼저 적고 질문하세요.",
    },
    TOOL: {
      strength: "AI를 여러 상황에 연결하는 활용 감각이 좋습니다.",
      weakness: "도구를 많이 써보다가 하나를 깊게 쓰지 못할 수 있습니다.",
      action: "자주 쓰는 AI 활용법 3개만 고정 루틴으로 만드세요.",
    },
    STRUCTURE: {
      strength: "복잡한 문제를 쪼개고 정리하는 능력이 좋습니다.",
      weakness: "정리만 하다가 실제 실행이 늦어질 수 있습니다.",
      action: "AI에게 정리시킨 뒤 바로 ‘첫 번째 실행’을 뽑게 하세요.",
    },
    VERIFY: {
      strength: "AI 답변을 무조건 믿지 않고 확인하는 힘이 있습니다.",
      weakness: "검증에 시간이 오래 걸려 속도가 떨어질 수 있습니다.",
      action: "중요한 정보만 검증하고, 가벼운 작업은 빠르게 넘기세요.",
    },
    AUTO: {
      strength: "반복 작업을 줄이고 시간을 아끼는 감각이 좋습니다.",
      weakness: "자동화할 필요 없는 일까지 복잡하게 만들 수 있습니다.",
      action: "매주 반복되는 일 하나만 골라 AI 템플릿으로 바꾸세요.",
    },
    EXPERIMENT: {
      strength: "AI 결과를 여러 번 바꿔보며 개선하는 힘이 있습니다.",
      weakness: "계속 실험하다가 최종 선택이 늦어질 수 있습니다.",
      action: "AI에게 3개 버전만 만들게 하고, 그중 하나를 바로 선택하세요.",
    },
  };

  return data[aiType];
}

export default function TestResultPage() {
  const [score, setScore] = useState<Score | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("haemala-test-score");
    if (saved) setScore(JSON.parse(saved));
  }, []);

  const result = useMemo(() => {
    if (!score) return null;

    const mbti = getMBTI(score);
    const aiType = getTopAIType(score);
    const aiq = getAIQ(score);

    return {
      mbti,
      aiType,
      aiq,
      aiLevel: getAILevel(aiq),
      mixTitle: getMixTitle(mbti, aiType),
      mbtiAdvice: getMBTIAdvice(mbti),
      aiAdvice: getAIAdvice(aiType),
    };
  }, [score]);

  if (!result) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f3ea] px-5 text-[#211a14]">
        <div className="max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">
          <h1 className="text-2xl font-black">결과가 없습니다</h1>
          <p className="mt-3 text-[#6f5a46]">먼저 테스트를 진행해주세요.</p>
          <Link href="/test/play" className="mt-6 inline-flex rounded-full bg-[#211a14] px-6 py-3 font-black text-white">
            테스트 시작하기
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f3ea] px-5 py-10 text-[#211a14]">
      <section className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="text-sm font-black tracking-[0.25em] text-[#a77a50]">HAEMALA REPORT</p>
          <h1 className="mt-3 text-4xl font-black sm:text-6xl">
            {result.mbti} · AIQ {result.aiq}
          </h1>
          <p className="mt-4 text-lg font-bold text-[#6f5a46]">
            MBTI 성향 + AI 시대 적합도 + Mix 분석 결과
          </p>
        </div>

        <div className="grid gap-5">
          <article className="rounded-[34px] border border-[#e1d3c0] bg-white p-7 shadow-[0_20px_70px_rgba(60,40,20,0.10)]">
            <p className="mb-2 text-sm font-black text-[#a77a50]">REPORT 1</p>
            <h2 className="text-3xl font-black">MBTI 상세 리포트: {result.mbti}</h2>
            <p className="mt-4 text-lg leading-8 text-[#4a3b2f]">
              {mbtiReports[result.mbti] ?? "당신만의 성향이 뚜렷한 타입입니다."}
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {Object.entries(result.mbtiAdvice).map(([key, value]) => (
                <div key={key} className="rounded-3xl bg-[#fff7eb] p-5">
                  <p className="font-black">
                    {key === "energy" && "에너지 방향"}
                    {key === "information" && "정보 처리"}
                    {key === "decision" && "결정 방식"}
                    {key === "lifestyle" && "생활 방식"}
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-[#6f5a46]">{value}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[34px] border border-[#e1d3c0] bg-white p-7 shadow-[0_20px_70px_rgba(60,40,20,0.10)]">
            <p className="mb-2 text-sm font-black text-[#a77a50]">REPORT 2</p>
            <h2 className="text-3xl font-black">AI 시대 적합 리포트: {result.aiLevel}</h2>

            <div className="mt-5 rounded-3xl bg-[#eef7ff] p-6">
              <p className="text-xl font-black">대표 유형: {aiTypeNames[result.aiType]}</p>
              <p className="mt-3 text-base font-semibold leading-7 text-[#4b6174]">
                {aiTypeDescriptions[result.aiType]}
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-[#f7f3ea] p-5">
                <p className="font-black">강점</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-[#6f5a46]">{result.aiAdvice.strength}</p>
              </div>
              <div className="rounded-3xl bg-[#f7f3ea] p-5">
                <p className="font-black">주의점</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-[#6f5a46]">{result.aiAdvice.weakness}</p>
              </div>
              <div className="rounded-3xl bg-[#f7f3ea] p-5">
                <p className="font-black">바로 할 일</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-[#6f5a46]">{result.aiAdvice.action}</p>
              </div>
            </div>
          </article>

          <article className="rounded-[38px] border-2 border-[#211a14] bg-[#211a14] p-7 text-white shadow-[0_28px_90px_rgba(20,15,10,0.28)]">
            <p className="mb-2 text-sm font-black text-[#f3c88b]">FINAL MIX</p>
            <h2 className="text-4xl font-black">{result.mixTitle}</h2>

            <p className="mt-5 text-lg leading-8 text-[#f5eadc]">
              당신은 <b>{result.mbti}</b> 성향을 바탕으로 움직이면서, AI를 쓸 때는{" "}
              <b>{aiTypeNames[result.aiType]}</b> 기질이 강하게 나타납니다. 쉽게 말하면,
              성격의 기본 방향과 AI 활용 방식이 결합된 “AI 시대 행동 캐릭터”입니다.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-white/10 p-5">
                <p className="font-black text-[#f3c88b]">너의 무기</p>
                <p className="mt-2 text-sm leading-6">AI를 단순 검색이 아니라 내 성향에 맞는 보조 두뇌처럼 쓸 수 있습니다.</p>
              </div>
              <div className="rounded-3xl bg-white/10 p-5">
                <p className="font-black text-[#f3c88b]">조심할 점</p>
                <p className="mt-2 text-sm leading-6">AI가 준 답을 그대로 믿거나, 반대로 너무 오래 고치기만 하면 효율이 떨어집니다.</p>
              </div>
              <div className="rounded-3xl bg-white/10 p-5">
                <p className="font-black text-[#f3c88b]">추천 프롬프트</p>
                <p className="mt-2 text-sm leading-6">
                  “내 성향에 맞게 이 일을 3단계 실행계획으로 바꿔줘.”
                </p>
              </div>
            </div>
          </article>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/test/play" className="rounded-full bg-[#211a14] px-7 py-4 text-center font-black text-white">
            다시 테스트하기
          </Link>
          <Link href="/" className="rounded-full border border-[#211a14] px-7 py-4 text-center font-black">
            메인으로 가기
          </Link>
        </div>
      </section>
    </main>
  );
}