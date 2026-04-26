import Link from "next/link";

const services = [
  {
    eyebrow: "Dream",
    title: "꿈 해몽 번호",
    desc: "기억나는 꿈의 분위기와 상징을 바탕으로 번호 조합과 짧은 해석 리포트를 제공합니다.",
    href: "/dream-lotto",
    cta: "꿈으로 번호 받기",
    point: "가장 몰입도 높은 추천",
  },
  {
    eyebrow: "Today",
    title: "오늘의 번호",
    desc: "오늘 날짜와 하루의 흐름을 기준으로 가볍게 확인할 수 있는 번호 리포트를 제공합니다.",
    href: "/today",
    cta: "오늘 번호 보기",
    point: "매일 재방문용",
  },
  {
    eyebrow: "Random",
    title: "랜덤 번호",
    desc: "입력 없이 빠르게 번호 조합을 생성하고, 번호별 간단한 의미를 함께 확인할 수 있습니다.",
    href: "/random",
    cta: "바로 생성하기",
    point: "가장 빠른 선택",
  },
];

const trustItems = [
  "회원가입 없음",
  "개인정보 저장 없음",
  "무료 이용 가능",
  "모바일 최적화",
  "즉시 결과 확인",
  "오락·참고용 콘텐츠",
];

const steps = [
  {
    title: "방식 선택",
    desc: "꿈, 오늘의 흐름, 랜덤 중 원하는 방식을 고릅니다.",
  },
  {
    title: "번호 확인",
    desc: "추천 번호와 보너스 번호를 한눈에 확인합니다.",
  },
  {
    title: "리포트 읽기",
    desc: "번호가 왜 제안되었는지 짧은 해석을 함께 봅니다.",
  },
];

const faqItems = [
  {
    q: "해말아 번호는 당첨을 보장하나요?",
    a: "아닙니다. 해말아의 번호와 해석은 오락 및 참고 목적의 콘텐츠입니다. 당첨을 보장하거나 구매를 권장하지 않습니다.",
  },
  {
    q: "개인정보가 저장되나요?",
    a: "홈 화면 기준으로 회원가입 없이 이용할 수 있도록 설계되어 있으며, 번호 확인을 위해 이름이나 연락처를 요구하지 않습니다.",
  },
  {
    q: "어떤 기능부터 쓰면 좋나요?",
    a: "꿈이 기억난다면 꿈 해몽 번호, 매일 가볍게 확인하고 싶다면 오늘의 번호, 빠르게 조합만 보고 싶다면 랜덤 번호가 적합합니다.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f2e8] text-[#15110d]">
      <section className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <header className="sticky top-3 z-30 flex items-center justify-between rounded-full border border-black/10 bg-white/85 px-4 py-3 shadow-sm backdrop-blur-xl sm:px-5">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-sm font-black text-white">
              해
            </span>
            <span className="text-lg font-black tracking-[-0.04em]">
              해말아
            </span>
          </Link>

          <nav className="hidden items-center gap-5 text-sm font-extrabold text-neutral-600 sm:flex">
            <Link href="/dream-lotto" className="transition hover:text-black">
              꿈해몽
            </Link>
            <Link href="/today" className="transition hover:text-black">
              오늘
            </Link>
            <Link href="/random" className="transition hover:text-black">
              랜덤
            </Link>
          </nav>

          <Link
            href="/dream-lotto"
            className="rounded-full bg-black px-4 py-2 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-neutral-800"
          >
            시작
          </Link>
        </header>

        <section className="relative grid gap-8 py-10 sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
          <div className="absolute left-1/2 top-10 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-white/70 blur-3xl" />

          <div>
            <p className="inline-flex rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-black text-neutral-700 shadow-sm">
              무료 로또 번호 리포트 · 회원가입 없이 바로 사용
            </p>

            <h1 className="mt-5 max-w-4xl text-[2.9rem] font-black leading-[0.98] tracking-[-0.075em] text-[#14110f] sm:text-6xl lg:text-7xl">
              번호 고르는 시간을
              <br />
              조금 더 재미있게.
            </h1>

            <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-neutral-700 sm:text-lg">
              해말아는 꿈 해몽, 오늘의 흐름, 랜덤 조합을 바탕으로 무료 번호
              리포트를 제공하는 가벼운 번호 추천 도구입니다. 복잡한 가입 없이
              바로 확인하고, 번호별 의미까지 함께 볼 수 있습니다.
            </p>

            <div className="mt-8 grid gap-3 sm:flex">
              <Link
                href="/dream-lotto"
                className="rounded-2xl bg-black px-6 py-4 text-center text-base font-black text-white shadow-xl shadow-black/10 transition hover:-translate-y-0.5 hover:bg-neutral-800"
              >
                꿈으로 번호 추천받기
              </Link>
              <Link
                href="/today"
                className="rounded-2xl border border-black/10 bg-white px-6 py-4 text-center text-base font-black text-black shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                오늘의 번호 보기
              </Link>
              <Link
                href="/random"
                className="rounded-2xl border border-black/10 bg-[#fff8e7] px-6 py-4 text-center text-base font-black text-black shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                랜덤 생성
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {trustItems.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-black/10 bg-white/85 p-4 text-sm font-black text-neutral-700 shadow-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-[2rem] border border-black/10 bg-white p-4 shadow-2xl shadow-black/10 sm:p-5">
            <div className="rounded-[1.6rem] bg-[#17120d] p-5 text-white sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <p className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-white/70">
                  Preview
                </p>
                <p className="text-xs font-black text-white/45">
                  번호 리포트 샘플
                </p>
              </div>

              <div className="mt-6">
                <p className="text-sm font-black text-white/55">
                  오늘의 추천 조합
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {[7, 12, 19, 26, 34, 41].map((num) => (
                    <span
                      key={num}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-base font-black text-black shadow-sm"
                    >
                      {num}
                    </span>
                  ))}
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/10 text-base font-black text-white">
                    +3
                  </span>
                </div>
              </div>

              <div className="mt-7 space-y-3">
                {steps.map((step, index) => (
                  <div
                    key={step.title}
                    className="flex gap-3 rounded-2xl border border-white/10 bg-white/10 p-4"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-black text-black">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-sm font-black">{step.title}</h3>
                      <p className="mt-1 text-sm font-semibold leading-6 text-white/65">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/10"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="rounded-full bg-[#f3eee3] px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-neutral-500">
                  {service.eyebrow}
                </p>
                <p className="text-xs font-black text-neutral-400">
                  {service.point}
                </p>
              </div>

              <h2 className="mt-7 text-2xl font-black tracking-[-0.04em]">
                {service.title}
              </h2>
              <p className="mt-3 min-h-24 text-base font-semibold leading-7 text-neutral-600">
                {service.desc}
              </p>

              <p className="mt-6 font-black text-black">
                {service.cta}
                <span className="ml-1 inline-block transition group-hover:translate-x-1">
                  →
                </span>
              </p>
            </Link>
          ))}
        </section>

        <section className="mt-10 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-sm font-black text-neutral-400">
              Why Haemala
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.05em]">
              단순 번호 생성보다 중요한 것은 다시 쓰고 싶게 만드는 경험입니다.
            </h2>
            <p className="mt-5 text-base font-semibold leading-8 text-neutral-650">
              해말아는 번호만 던지는 페이지가 아니라, 사용자가 오늘의 기분과
              꿈의 상징을 가볍게 해석하면서 결과를 확인하는 구조를 지향합니다.
              그래서 결과 화면은 짧은 리포트처럼 읽히고, 기능은 빠르게 끝나도록
              설계되어야 합니다.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[2rem] border border-black/10 bg-[#fff8e7] p-6">
              <h3 className="text-xl font-black tracking-[-0.03em]">
                광고 친화 구조
              </h3>
              <p className="mt-3 text-sm font-semibold leading-7 text-neutral-700">
                과장된 당첨 보장 표현을 피하고, 오락·참고용 콘텐츠임을 명확히
                안내합니다.
              </p>
            </div>

            <div className="rounded-[2rem] border border-black/10 bg-white p-6">
              <h3 className="text-xl font-black tracking-[-0.03em]">
                모바일 우선 UX
              </h3>
              <p className="mt-3 text-sm font-semibold leading-7 text-neutral-700">
                작은 화면에서도 버튼, 카드, 문장 길이가 무너지지 않도록 간격과
                계층을 정리했습니다.
              </p>
            </div>

            <div className="rounded-[2rem] border border-black/10 bg-white p-6">
              <h3 className="text-xl font-black tracking-[-0.03em]">
                빠른 기능 진입
              </h3>
              <p className="mt-3 text-sm font-semibold leading-7 text-neutral-700">
                사용자가 홈에서 오래 고민하지 않고 꿈, 오늘, 랜덤 중 하나로
                바로 이동하게 만듭니다.
              </p>
            </div>

            <div className="rounded-[2rem] border border-black/10 bg-[#17120d] p-6 text-white">
              <h3 className="text-xl font-black tracking-[-0.03em]">
                재방문 설계
              </h3>
              <p className="mt-3 text-sm font-semibold leading-7 text-white/65">
                오늘의 번호와 랜덤 번호는 매일 가볍게 다시 확인하기 좋은
                반복형 콘텐츠입니다.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-black text-neutral-400">FAQ</p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.05em]">
                처음 사용하는 분들이 자주 묻는 질문
              </h2>
            </div>

            <div className="space-y-3">
              {faqItems.map((item) => (
                <div
                  key={item.q}
                  className="rounded-3xl border border-black/10 bg-[#f8f5ee] p-5"
                >
                  <h3 className="font-black">{item.q}</h3>
                  <p className="mt-2 text-sm font-semibold leading-7 text-neutral-650">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] bg-black p-6 text-white sm:p-8">
          <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-black text-white/45">
                Responsible Notice
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.05em]">
                번호 추천은 재미와 참고용입니다.
              </h2>
            </div>

            <p className="text-base font-semibold leading-8 text-white/70">
              해말아에서 제공하는 번호, 해석, 리포트는 오락 및 참고 목적의
              콘텐츠입니다. 특정 결과나 당첨을 보장하지 않으며, 무리한 구매를
              권장하지 않습니다. 번호를 고르는 시간을 조금 더 가볍고 재미있게
              만드는 데 집중합니다.
            </p>
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] border border-black/10 bg-[#fff8e7] p-6 text-center shadow-sm sm:p-8">
          <h2 className="text-3xl font-black tracking-[-0.05em]">
            지금 바로 번호 리포트를 확인해보세요.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base font-semibold leading-8 text-neutral-700">
            꿈이 있다면 꿈 해몽 번호부터, 특별한 입력 없이 보고 싶다면 오늘의
            번호나 랜덤 번호부터 시작하면 됩니다.
          </p>

          <div className="mt-6 grid gap-3 sm:flex sm:justify-center">
            <Link
              href="/dream-lotto"
              className="rounded-2xl bg-black px-6 py-4 text-center text-base font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-neutral-800"
            >
              꿈 해몽 번호 시작
            </Link>
            <Link
              href="/random"
              className="rounded-2xl border border-black/10 bg-white px-6 py-4 text-center text-base font-black text-black shadow-sm transition hover:-translate-y-0.5"
            >
              랜덤 번호 생성
            </Link>
          </div>
        </section>

        <footer className="mt-10 flex flex-col gap-4 border-t border-black/10 py-8 text-sm font-bold text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 해말아. All rights reserved.</p>

          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="hover:text-black">
              개인정보처리방침
            </Link>
            <Link href="/contact" className="hover:text-black">
              문의
            </Link>
            <Link href="/dream-lotto" className="hover:text-black">
              꿈해몽
            </Link>
            <Link href="/today" className="hover:text-black">
              오늘
            </Link>
            <Link href="/random" className="hover:text-black">
              랜덤
            </Link>
          </div>
        </footer>
      </section>
    </main>
  );
}