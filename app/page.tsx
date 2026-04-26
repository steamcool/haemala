import Link from "next/link";

const features = [
  {
    title: "꿈 해몽 번호",
    desc: "꿈의 분위기와 상징을 바탕으로 번호 리포트를 생성합니다.",
    href: "/dream-lotto",
    cta: "꿈으로 번호 보기",
  },
  {
    title: "오늘의 번호",
    desc: "오늘의 흐름에 맞춘 가벼운 운세형 번호 조합을 제공합니다.",
    href: "/today",
    cta: "오늘 번호 보기",
  },
  {
    title: "랜덤 번호",
    desc: "복잡한 입력 없이 빠르게 번호 조합을 확인할 수 있습니다.",
    href: "/random",
    cta: "랜덤 생성하기",
  },
];

const trustItems = [
  "회원가입 없이 즉시 사용",
  "개인정보 저장 없이 이용",
  "무료 번호 리포트 제공",
  "모바일 화면 최적화",
];

const steps = [
  "원하는 생성 방식을 선택합니다.",
  "꿈, 오늘의 흐름, 랜덤 중 하나를 고릅니다.",
  "추천 번호와 해석 리포트를 확인합니다.",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f6f1] text-[#171411]">
      <section className="mx-auto flex w-full max-w-6xl flex-col px-5 py-6 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between rounded-full border border-black/10 bg-white/80 px-4 py-3 shadow-sm backdrop-blur">
          <Link href="/" className="text-lg font-black tracking-tight">
            해말아
          </Link>

          <nav className="flex items-center gap-3 text-sm font-bold text-neutral-600">
            <Link href="/today" className="hover:text-black">
              오늘
            </Link>
            <Link href="/random" className="hover:text-black">
              랜덤
            </Link>
            <Link href="/dream-lotto" className="hover:text-black">
              꿈해몽
            </Link>
          </nav>
        </header>

        <section className="grid gap-8 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-20">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-extrabold text-neutral-700 shadow-sm">
              무료 로또 번호 리포트 서비스
            </p>

            <h1 className="max-w-3xl text-5xl font-black leading-[1.05] tracking-[-0.05em] text-[#14110f] sm:text-6xl lg:text-7xl">
              꿈과 오늘의 흐름을
              <br />
              번호로 바꿔드립니다.
            </h1>

            <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-neutral-700">
              해말아는 꿈 해몽, 오늘의 운세형 흐름, 랜덤 조합을 바탕으로
              무료 로또 번호 리포트를 제공하는 가벼운 번호 추천 서비스입니다.
              복잡한 가입 없이 바로 사용할 수 있습니다.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/dream-lotto"
                className="rounded-2xl bg-black px-6 py-4 text-center text-base font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-neutral-800"
              >
                꿈으로 번호 추천받기
              </Link>

              <Link
                href="/today"
                className="rounded-2xl border border-black/10 bg-white px-6 py-4 text-center text-base font-black text-black shadow-sm transition hover:-translate-y-0.5"
              >
                오늘의 번호 보기
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {trustItems.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-black/10 bg-white p-4 text-sm font-extrabold text-neutral-700 shadow-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-[2rem] border border-black/10 bg-white p-5 shadow-xl">
            <div className="rounded-[1.5rem] bg-[#171411] p-6 text-white">
              <p className="text-sm font-black text-white/60">
                오늘 바로 사용 가능
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight">
                번호 추천은 가볍게,
                <br />
                결과는 리포트처럼.
              </h2>

              <div className="mt-6 space-y-3">
                {steps.map((step, index) => (
                  <div
                    key={step}
                    className="flex gap-3 rounded-2xl bg-white/10 p-4"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-sm font-black text-black">
                      {index + 1}
                    </span>
                    <p className="text-sm font-bold leading-6 text-white/85">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="group rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f0ece3] text-xl font-black">
                {feature.title.slice(0, 1)}
              </div>

              <h2 className="text-2xl font-black tracking-tight">
                {feature.title}
              </h2>

              <p className="mt-3 min-h-16 text-base font-medium leading-7 text-neutral-600">
                {feature.desc}
              </p>

              <p className="mt-6 font-black text-black">
                {feature.cta}
                <span className="ml-1 inline-block transition group-hover:translate-x-1">
                  →
                </span>
              </p>
            </Link>
          ))}
        </section>

        <section className="mt-10 rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-3xl font-black tracking-tight">
            해말아는 이런 사람에게 맞습니다
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-[#f8f6f1] p-5">
              <h3 className="font-black">꿈이 기억나는 날</h3>
              <p className="mt-2 text-sm font-medium leading-6 text-neutral-600">
                인상적인 꿈을 번호 해석 리포트로 가볍게 확인하고 싶은 경우.
              </p>
            </div>

            <div className="rounded-3xl bg-[#f8f6f1] p-5">
              <h3 className="font-black">번호 고르기 귀찮은 날</h3>
              <p className="mt-2 text-sm font-medium leading-6 text-neutral-600">
                복잡한 계산 없이 바로 쓸 수 있는 조합이 필요한 경우.
              </p>
            </div>

            <div className="rounded-3xl bg-[#f8f6f1] p-5">
              <h3 className="font-black">재미있는 리포트가 필요한 날</h3>
              <p className="mt-2 text-sm font-medium leading-6 text-neutral-600">
                단순 번호가 아니라 짧은 해석과 의미를 함께 보고 싶은 경우.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] bg-black p-6 text-white sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-black text-white/50">
                Before you start
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight">
                번호 추천은 재미와 참고용입니다.
              </h2>
            </div>

            <p className="text-base font-medium leading-8 text-white/70">
              해말아에서 제공하는 번호와 해석은 오락 및 참고 목적의 콘텐츠입니다.
              당첨을 보장하지 않으며, 무리한 구매를 권장하지 않습니다. 번호를
              고르는 시간을 조금 더 재미있게 만드는 데 집중합니다.
            </p>
          </div>
        </section>

        <footer className="mt-10 flex flex-col gap-3 border-t border-black/10 py-8 text-sm font-bold text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 해말아. All rights reserved.</p>

          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-black">
              개인정보처리방침
            </Link>
            <Link href="/contact" className="hover:text-black">
              문의
            </Link>
          </div>
        </footer>
      </section>
    </main>
  );
}