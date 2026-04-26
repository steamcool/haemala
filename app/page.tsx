import Link from "next/link";

export const metadata = {
  title: "해말아 | MBTI + AI 시대 적합도 테스트",
  description:
    "MBTI 성향과 AI 활용 적합도를 함께 분석하는 96문항 인터랙션 테스트.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f7f3ea] px-5 py-10 text-[#211a14]">
      <section className="mx-auto max-w-6xl">
        <div className="rounded-[44px] border border-[#e1d3c0] bg-white p-7 shadow-[0_30px_100px_rgba(60,40,20,0.14)] sm:p-14">
          <p className="text-sm font-black tracking-[0.28em] text-[#a77a50]">
            HAEMALA
          </p>

          <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight sm:text-7xl">
            나는 AI 시대에 어떤 사람일까?
          </h1>

          <p className="mt-6 max-w-3xl text-lg font-bold leading-8 text-[#6f5a46] sm:text-xl">
            MBTI 성향과 AI 활용 적합도를 함께 분석하는 96문항 테스트.
            성격, AI 사용 능력, 그리고 둘을 섞은 AI 시대 캐릭터까지 확인합니다.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/test"
              className="rounded-full bg-[#211a14] px-9 py-5 text-center text-lg font-black text-white"
            >
              96문항 테스트 시작하기
            </Link>

            <Link
              href="/test/play"
              className="rounded-full border border-[#211a14] px-9 py-5 text-center text-lg font-black"
            >
              바로 검사하기
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-[#fff7eb] p-6">
              <p className="text-4xl font-black">MBTI</p>
              <p className="mt-3 font-bold leading-7 text-[#6f5a46]">
                E/I, S/N, T/F, J/P 네 축으로 성향을 분석합니다.
              </p>
            </div>

            <div className="rounded-3xl bg-[#eef7ff] p-6">
              <p className="text-4xl font-black">AIQ</p>
              <p className="mt-3 font-bold leading-7 text-[#6f5a46]">
                질문력, 도구 활용력, 검증 습관, 자동화 감각을 봅니다.
              </p>
            </div>

            <div className="rounded-3xl bg-[#211a14] p-6 text-white">
              <p className="text-4xl font-black">MIX</p>
              <p className="mt-3 font-bold leading-7 text-[#f5eadc]">
                성격과 AI 활용 방식을 섞어 나만의 AI 시대 캐릭터를 보여줍니다.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/test"
            className="rounded-[30px] border border-[#e1d3c0] bg-white p-6 shadow-[0_14px_40px_rgba(60,40,20,0.08)]"
          >
            <p className="text-sm font-black text-[#a77a50]">MAIN TEST</p>
            <h2 className="mt-2 text-2xl font-black">AI 시대 성향 테스트</h2>
            <p className="mt-3 font-semibold leading-7 text-[#6f5a46]">
              현재 해말아의 핵심 테스트입니다.
            </p>
          </Link>

          <Link
            href="/today"
            className="rounded-[30px] border border-[#e1d3c0] bg-white p-6 shadow-[0_14px_40px_rgba(60,40,20,0.08)]"
          >
            <p className="text-sm font-black text-[#a77a50]">DAILY</p>
            <h2 className="mt-2 text-2xl font-black">오늘의 선택</h2>
            <p className="mt-3 font-semibold leading-7 text-[#6f5a46]">
              가볍게 오늘의 흐름을 확인합니다.
            </p>
          </Link>

          <Link
            href="/random"
            className="rounded-[30px] border border-[#e1d3c0] bg-white p-6 shadow-[0_14px_40px_rgba(60,40,20,0.08)]"
          >
            <p className="text-sm font-black text-[#a77a50]">RANDOM</p>
            <h2 className="mt-2 text-2xl font-black">랜덤 결정</h2>
            <p className="mt-3 font-semibold leading-7 text-[#6f5a46]">
              고민될 때 빠르게 하나를 고릅니다.
            </p>
          </Link>

          <Link
            href="/dream-lotto"
            className="rounded-[30px] border border-[#e1d3c0] bg-white p-6 shadow-[0_14px_40px_rgba(60,40,20,0.08)]"
          >
            <p className="text-sm font-black text-[#a77a50]">FUN</p>
            <h2 className="mt-2 text-2xl font-black">꿈 로또</h2>
            <p className="mt-3 font-semibold leading-7 text-[#6f5a46]">
              꿈 키워드로 번호를 뽑아봅니다.
            </p>
          </Link>
        </div>

        <p className="mt-7 text-center text-sm font-semibold leading-6 text-[#8a7159]">
          본 테스트는 MBTI 공식 검사가 아니며, 성격 선호 지표의 4가지 축을 참고해 만든 자체 성향 분석 콘텐츠입니다.
        </p>
      </section>
    </main>
  );
}