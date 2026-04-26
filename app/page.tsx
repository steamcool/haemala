import Link from "next/link";

const services = [
  {
    title: "꿈 해몽 번호",
    desc: "기억나는 장면을 입력하면 상징 기반으로 번호와 해석을 생성합니다.",
    href: "/dream-lotto",
  },
  {
    title: "오늘의 번호",
    desc: "오늘의 흐름을 반영한 가벼운 번호 리포트를 확인합니다.",
    href: "/today",
  },
  {
    title: "랜덤 번호",
    desc: "입력 없이 즉시 번호 조합을 생성합니다.",
    href: "/random",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f]">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-black/5 bg-[#f5f5f7]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
          <Link href="/" className="text-sm font-semibold">
            해말아
          </Link>

          <nav className="hidden gap-8 text-xs text-neutral-500 sm:flex">
            <Link href="/dream-lotto">꿈해몽</Link>
            <Link href="/today">오늘</Link>
            <Link href="/random">랜덤</Link>
          </nav>

          <Link
            href="/dream-lotto"
            className="rounded-full bg-black px-4 py-1.5 text-xs font-bold text-white"
          >
            시작
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto flex max-w-6xl flex-col items-center px-5 py-24 text-center">
        <h1 className="text-6xl font-black leading-[0.9] tracking-[-0.08em] sm:text-7xl">
          번호를 고르는
          <br />
          새로운 방식
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-neutral-600">
          꿈, 오늘의 흐름, 랜덤 조합을 기반으로
          의미 있는 번호 리포트를 제공합니다.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/dream-lotto"
            className="rounded-full bg-black px-7 py-4 text-base font-bold text-white"
          >
            꿈으로 시작하기
          </Link>

          <Link
            href="/random"
            className="rounded-full bg-white px-7 py-4 text-base font-bold shadow ring-1 ring-black/5"
          >
            랜덤 생성
          </Link>
        </div>
      </section>

      {/* RESULT PREVIEW (핵심 개선) */}
      <section className="mx-auto max-w-5xl px-5 pb-16">
        <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5 text-center">
          <p className="text-sm text-neutral-400">미리보기</p>

          <div className="mt-6 flex justify-center gap-2">
            {[7, 12, 19, 26, 34, 41].map((n) => (
              <div
                key={n}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white font-black"
              >
                {n}
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm text-neutral-600">
            오늘의 흐름은 “변화”와 “기회”에 가까워 보입니다.
            새로운 시도와 관련된 숫자가 강조됩니다.
          </p>

          <div className="mt-6 flex justify-center gap-3">
            <Link
              href="/today"
              className="rounded-full bg-black px-5 py-2 text-sm text-white"
            >
              내 결과 보기
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="mx-auto grid max-w-6xl gap-5 px-5 pb-20 md:grid-cols-3">
        {services.map((s) => (
          <Link
            key={s.title}
            href={s.href}
            className="rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-black/5 hover:-translate-y-1 transition"
          >
            <h2 className="text-2xl font-black">{s.title}</h2>
            <p className="mt-3 text-sm text-neutral-600">{s.desc}</p>
          </Link>
        ))}
      </section>

      {/* REVISIT / LOOP */}
      <section className="mx-auto max-w-6xl px-5 pb-20 text-center">
        <h2 className="text-4xl font-black tracking-[-0.05em]">
          매일 다시 확인해보세요
        </h2>

        <p className="mt-4 text-neutral-600">
          오늘의 흐름은 매일 달라집니다.
        </p>

        <Link
          href="/today"
          className="mt-6 inline-block rounded-full bg-black px-7 py-4 text-white"
        >
          오늘 다시 보기
        </Link>
      </section>

      {/* SHARE (핵심 성장 요소) */}
      <section className="mx-auto max-w-6xl px-5 pb-20 text-center">
        <h2 className="text-4xl font-black tracking-[-0.05em]">
          결과를 공유하세요
        </h2>

        <p className="mt-4 text-neutral-600">
          친구와 함께 비교해보면 더 재미있습니다.
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <button className="rounded-full bg-black px-6 py-3 text-white">
            이미지 저장
          </button>
          <button className="rounded-full bg-white px-6 py-3 ring-1 ring-black/10">
            링크 공유
          </button>
        </div>
      </section>

      {/* NOTICE */}
      <section className="bg-black py-14 text-white text-center">
        <p className="max-w-2xl mx-auto text-sm text-white/60">
          본 서비스는 오락 및 참고용이며 특정 결과를 보장하지 않습니다.
        </p>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-black/5 py-8 text-center text-xs text-neutral-500">
        <p>© 2026 해말아</p>
        <div className="mt-2 flex justify-center gap-4">
          <Link href="/privacy">개인정보</Link>
          <Link href="/contact">문의</Link>
        </div>
      </footer>
    </main>
  );
}