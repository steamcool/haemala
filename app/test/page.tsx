import Link from "next/link";

export const metadata = {
  title: "AI 시대 성향 테스트 | 해말아",
  description:
    "MBTI 성향과 AI 활용 적합도를 함께 분석하는 96문항 테스트입니다.",
};

export default function TestPage() {
  return (
    <main className="min-h-screen bg-[#f7f3ea] px-5 py-10 text-[#211a14]">
      <section className="mx-auto max-w-5xl">
        <div className="rounded-[40px] border border-[#e1d3c0] bg-white p-7 shadow-[0_24px_80px_rgba(60,40,20,0.12)] sm:p-12">
          <p className="text-sm font-black tracking-[0.25em] text-[#a77a50]">
            HAEMALA TEST
          </p>

          <h1 className="mt-5 text-4xl font-black leading-tight sm:text-6xl">
            MBTI 성향 + AI 시대 적합도 테스트
          </h1>

          <p className="mt-5 max-w-3xl text-lg font-bold leading-8 text-[#6f5a46]">
            나는 어떤 성향으로 판단하고, AI 시대에는 어떤 방식으로 도구를 활용하는 사람일까?
            96문항으로 MBTI 성향, AI 활용력, 두 결과를 섞은 Mix 리포트까지 확인합니다.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-[#fff7eb] p-5">
              <p className="text-3xl font-black">96</p>
              <p className="mt-2 font-bold text-[#6f5a46]">총 문항 수</p>
            </div>
            <div className="rounded-3xl bg-[#eef7ff] p-5">
              <p className="text-3xl font-black">8</p>
              <p className="mt-2 font-bold text-[#6f5a46]">12문항씩 8페이지</p>
            </div>
            <div className="rounded-3xl bg-[#f0f7ee] p-5">
              <p className="text-3xl font-black">3</p>
              <p className="mt-2 font-bold text-[#6f5a46]">결과 리포트</p>
            </div>
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/test/play"
              className="rounded-full bg-[#211a14] px-8 py-4 text-center text-lg font-black text-white"
            >
              테스트 시작하기
            </Link>
            <Link
              href="/"
              className="rounded-full border border-[#211a14] px-8 py-4 text-center text-lg font-black"
            >
              메인으로 가기
            </Link>
          </div>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          <article className="rounded-[30px] border border-[#e1d3c0] bg-white p-6">
            <p className="text-sm font-black text-[#a77a50]">REPORT 1</p>
            <h2 className="mt-2 text-2xl font-black">MBTI 성향</h2>
            <p className="mt-3 font-semibold leading-7 text-[#6f5a46]">
              E/I, S/N, T/F, J/P 네 가지 축으로 나의 기본 판단 성향을 분석합니다.
            </p>
          </article>

          <article className="rounded-[30px] border border-[#e1d3c0] bg-white p-6">
            <p className="text-sm font-black text-[#a77a50]">REPORT 2</p>
            <h2 className="mt-2 text-2xl font-black">AI 적합도</h2>
            <p className="mt-3 font-semibold leading-7 text-[#6f5a46]">
              질문력, 도구 활용력, 정리력, 검증 습관, 자동화 성향, 실험 성향을 봅니다.
            </p>
          </article>

          <article className="rounded-[30px] border border-[#211a14] bg-[#211a14] p-6 text-white">
            <p className="text-sm font-black text-[#f3c88b]">FINAL MIX</p>
            <h2 className="mt-2 text-2xl font-black">AI 시대 캐릭터</h2>
            <p className="mt-3 font-semibold leading-7 text-[#f5eadc]">
              MBTI 성향과 AI 활용 방식을 섞어 당신만의 행동 캐릭터를 보여줍니다.
            </p>
          </article>
        </div>

        <p className="mt-6 text-center text-sm font-semibold leading-6 text-[#8a7159]">
          본 테스트는 MBTI 공식 검사가 아니며, 성격 선호 지표의 4가지 축을 참고해 만든 자체 성향 분석 콘텐츠입니다.
        </p>
      </section>
    </main>
  );
}