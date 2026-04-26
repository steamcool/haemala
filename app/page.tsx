import Link from "next/link";

const navItems = [
  { label: "꿈해몽", href: "/dream-lotto" },
  { label: "오늘", href: "/today" },
  { label: "랜덤", href: "/random" },
];

const productCards = [
  {
    title: "꿈으로 고르기",
    desc: "기억나는 장면을 짧게 적으면, 상징을 바탕으로 번호 리포트를 만듭니다.",
    href: "/dream-lotto",
    cta: "꿈 입력하기",
  },
  {
    title: "오늘의 흐름",
    desc: "오늘 하루의 분위기에 맞춘 가벼운 번호 조합을 확인합니다.",
    href: "/today",
    cta: "오늘 보기",
  },
  {
    title: "바로 랜덤",
    desc: "고민 없이 빠르게. 입력 없이 즉시 번호를 생성합니다.",
    href: "/random",
    cta: "바로 생성",
  },
];

const principles = [
  "회원가입 없음",
  "개인정보 저장 없음",
  "무료 사용",
  "모바일 최적화",
];

const miniFeatures = [
  {
    title: "가볍게",
    desc: "복잡한 절차 없이 바로 시작합니다.",
  },
  {
    title: "깔끔하게",
    desc: "번호와 해석만 보기 좋게 정리합니다.",
  },
  {
    title: "안전하게",
    desc: "당첨 보장이 아닌 오락·참고용 콘텐츠입니다.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f]">
      <header className="sticky top-0 z-50 border-b border-black/5 bg-[#f5f5f7]/80 backdrop-blur-2xl">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-5">
          <Link href="/" className="text-[15px] font-semibold tracking-tight">
            해말아
          </Link>

          <nav className="hidden items-center gap-8 text-xs font-semibold text-neutral-500 sm:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-black">
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/dream-lotto"
            className="rounded-full bg-[#1d1d1f] px-4 py-1.5 text-xs font-bold text-white transition hover:bg-black"
          >
            시작하기
          </Link>
        </div>
      </header>

      <section className="mx-auto flex min-h-[76vh] w-full max-w-6xl flex-col items-center justify-center px-5 py-20 text-center">
        <p className="mb-5 text-sm font-bold text-neutral-500">
          무료 번호 리포트
        </p>

        <h1 className="max-w-5xl text-6xl font-black leading-[0.92] tracking-[-0.08em] sm:text-7xl lg:text-8xl">
          번호를 고르는
          <br />
          더 가벼운 방법.
        </h1>

        <p className="mt-8 max-w-2xl text-xl font-semibold leading-8 tracking-[-0.03em] text-neutral-600 sm:text-2xl sm:leading-9">
          꿈, 오늘의 흐름, 랜덤 조합을 바탕으로
          보기 좋은 번호 리포트를 제공합니다.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/dream-lotto"
            className="rounded-full bg-[#1d1d1f] px-7 py-4 text-base font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-black"
          >
            꿈으로 시작하기
          </Link>

          <Link
            href="/random"
            className="rounded-full bg-white px-7 py-4 text-base font-bold text-[#1d1d1f] shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5"
          >
            랜덤 번호 보기
          </Link>
        </div>

        <div className="mt-12 grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
          {principles.map((item) => (
            <div
              key={item}
              className="rounded-3xl bg-white px-4 py-5 text-sm font-bold text-neutral-600 shadow-sm ring-1 ring-black/5"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-5 px-5 pb-8 lg:grid-cols-3">
        {productCards.map((card, index) => (
          <Link
            key={card.title}
            href={card.href}
            className={[
              "group min-h-[420px] overflow-hidden rounded-[2.5rem] p-8 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl",
              index === 0
                ? "bg-[#1d1d1f] text-white"
                : index === 1
                  ? "bg-white text-[#1d1d1f]"
                  : "bg-[#fbfbfd] text-[#1d1d1f]",
            ].join(" ")}
          >
            <div className="flex h-full flex-col justify-between">
              <div>
                <p
                  className={[
                    "text-sm font-bold",
                    index === 0 ? "text-white/45" : "text-neutral-400",
                  ].join(" ")}
                >
                  0{index + 1}
                </p>

                <h2 className="mt-5 text-4xl font-black tracking-[-0.06em]">
                  {card.title}
                </h2>

                <p
                  className={[
                    "mt-4 text-lg font-semibold leading-8 tracking-[-0.03em]",
                    index === 0 ? "text-white/65" : "text-neutral-600",
                  ].join(" ")}
                >
                  {card.desc}
                </p>
              </div>

              <div>
                <div
                  className={[
                    "mb-8 mt-10 flex h-36 items-center justify-center rounded-[2rem]",
                    index === 0
                      ? "bg-white/10"
                      : "bg-gradient-to-b from-neutral-100 to-white",
                  ].join(" ")}
                >
                  <div className="flex gap-2">
                    {[8, 14, 21, 27, 33, 42].map((num) => (
                      <span
                        key={`${card.title}-${num}`}
                        className={[
                          "flex h-10 w-10 items-center justify-center rounded-full text-sm font-black shadow-sm",
                          index === 0
                            ? "bg-white text-black"
                            : "bg-[#1d1d1f] text-white",
                        ].join(" ")}
                      >
                        {num}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-base font-black">
                  {card.cta}
                  <span className="ml-1 inline-block transition group-hover:translate-x-1">
                    →
                  </span>
                </p>
              </div>
            </div>
          </Link>
        ))}
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-5 px-5 py-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[2.5rem] bg-white p-8 shadow-sm ring-1 ring-black/5 sm:p-12">
          <p className="text-sm font-bold text-neutral-400">Experience</p>

          <h2 className="mt-4 max-w-3xl text-5xl font-black leading-[1] tracking-[-0.07em] sm:text-6xl">
            설명보다 빠르게.
            <br />
            결과는 더 보기 좋게.
          </h2>

          <p className="mt-7 max-w-2xl text-lg font-semibold leading-8 tracking-[-0.03em] text-neutral-600">
            해말아는 긴 설명을 줄이고, 사용자가 바로 선택하고 바로 확인하는
            흐름에 집중합니다. 번호, 해석, 주의 문구까지 필요한 것만 남깁니다.
          </p>
        </div>

        <div className="grid gap-5">
          {miniFeatures.map((item) => (
            <div
              key={item.title}
              className="rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-black/5"
            >
              <h3 className="text-2xl font-black tracking-[-0.05em]">
                {item.title}
              </h3>
              <p className="mt-3 text-base font-semibold leading-7 text-neutral-600">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-8">
        <div className="overflow-hidden rounded-[2.75rem] bg-[#1d1d1f] p-8 text-white shadow-sm sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-bold text-white/40">Notice</p>
              <h2 className="mt-4 text-5xl font-black leading-[1] tracking-[-0.07em]">
                재미로 보고,
                <br />
                가볍게 사용하세요.
              </h2>
            </div>

            <p className="text-lg font-semibold leading-8 tracking-[-0.03em] text-white/62">
              해말아의 번호와 해석은 오락 및 참고 목적의 콘텐츠입니다.
              특정 결과나 당첨을 보장하지 않으며, 무리한 구매를 권장하지
              않습니다.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col items-center px-5 py-20 text-center">
        <h2 className="max-w-3xl text-5xl font-black leading-[1] tracking-[-0.07em] sm:text-6xl">
          오늘은 어떤 번호로
          <br />
          시작할까요?
        </h2>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/today"
            className="rounded-full bg-[#1d1d1f] px-7 py-4 text-base font-bold text-white transition hover:-translate-y-0.5 hover:bg-black"
          >
            오늘의 번호
          </Link>

          <Link
            href="/dream-lotto"
            className="rounded-full bg-white px-7 py-4 text-base font-bold text-[#1d1d1f] shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5"
          >
            꿈 해몽 번호
          </Link>
        </div>
      </section>

      <footer className="border-t border-black/5 bg-[#f5f5f7]">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-8 text-xs font-semibold text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
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
        </div>
      </footer>
    </main>
  );
}