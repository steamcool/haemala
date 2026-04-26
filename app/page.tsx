import Link from "next/link";
import PremiumAdSlot from "./components/PremiumAdSlot";

const routes = [
  { label: "꿈해몽", href: "/dream-lotto" },
  { label: "오늘", href: "/today" },
  { label: "랜덤", href: "/random" },
];

const features = [
  {
    eyebrow: "01",
    title: "꿈을 번호 리포트로",
    desc: "기억나는 장면을 입력하면 상징, 감정, 흐름을 해석해 번호 조합으로 정리합니다.",
    href: "/dream-lotto",
    cta: "꿈으로 시작",
  },
  {
    eyebrow: "02",
    title: "하루에 하나의 흐름",
    desc: "오늘 날짜를 기준으로 고정되는 번호 리포트. 매일 다시 방문할 이유를 만듭니다.",
    href: "/today",
    cta: "오늘 보기",
  },
  {
    eyebrow: "03",
    title: "빠른 균형 조합",
    desc: "단순 무작위가 아니라 합계, 홀짝, 구간 분산을 함께 고려한 보기 좋은 조합입니다.",
    href: "/random",
    cta: "랜덤 생성",
  },
];

const previewNumbers = [7, 12, 19, 26, 34, 41];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b0b0c] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0b0c]/80 backdrop-blur-2xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          <Link href="/" className="text-lg font-black tracking-[-0.04em]">
            해말아
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-white/55 sm:flex">
            {routes.map((route) => (
              <Link key={route.href} href={route.href} className="transition hover:text-white">
                {route.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/dream-lotto"
            className="rounded-full bg-white px-5 py-2.5 text-sm font-black text-black transition hover:bg-white/90"
          >
            시작하기
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-white/10 blur-[120px]" />
        <div className="absolute right-0 top-40 h-[360px] w-[360px] rounded-full bg-[#d7b46a]/20 blur-[110px]" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:pb-28 lg:pt-28">
          <div>
            <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-black tracking-[0.18em] text-[#d7b46a]">
              NO SIGNUP · NO DATABASE · INSTANT REPORT
            </p>

            <h1 className="mt-8 max-w-4xl text-6xl font-black leading-[0.9] tracking-[-0.09em] sm:text-7xl lg:text-8xl">
              번호를 뽑는 게 아니라,
              <br />
              리포트를 받는다.
            </h1>

            <p className="mt-7 max-w-2xl text-lg font-medium leading-8 tracking-[-0.03em] text-white/58">
              해말아는 꿈, 오늘의 흐름, 무작위 균형 로직을 바탕으로 번호 조합을
              하나의 읽을거리로 바꾸는 프론트엔드 전용 리포트 서비스입니다.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/dream-lotto"
                className="rounded-full bg-[#d7b46a] px-8 py-4 text-center text-base font-black text-black transition hover:-translate-y-0.5 hover:bg-[#e7c77b]"
              >
                꿈 해몽 번호 시작
              </Link>
              <Link
                href="/today"
                className="rounded-full border border-white/15 bg-white/5 px-8 py-4 text-center text-base font-black text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                오늘의 번호 보기
              </Link>
            </div>

            <div className="mt-12 grid max-w-2xl grid-cols-3 gap-3">
              {[
                ["0원", "무료 사용"],
                ["0개", "회원가입"],
                ["100%", "브라우저 기반"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                  <p className="text-2xl font-black tracking-[-0.05em]">{value}</p>
                  <p className="mt-1 text-xs font-bold text-white/42">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-black/40 backdrop-blur-2xl">
              <div className="rounded-[2rem] bg-[#111113] p-6 ring-1 ring-white/10 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-black tracking-[0.18em] text-[#d7b46a]">
                      PREMIUM PREVIEW
                    </p>
                    <h2 className="mt-3 text-3xl font-black tracking-[-0.06em]">
                      오늘의 흐름 리포트
                    </h2>
                  </div>
                  <div className="rounded-full bg-white px-4 py-2 text-sm font-black text-black">
                    92/100
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-2.5">
                  {previewNumbers.map((n) => (
                    <div
                      key={n}
                      className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-lg font-black text-black shadow-lg shadow-black/30"
                    >
                      {n}
                    </div>
                  ))}
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#d7b46a]/40 bg-[#d7b46a]/15 text-lg font-black text-[#d7b46a]">
                    +3
                  </div>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {[
                    ["합계", "139"],
                    ["홀짝", "3:3"],
                    ["구간", "5분산"],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-3xl bg-white/[0.06] p-5 ring-1 ring-white/10">
                      <p className="text-xs font-bold text-white/35">{label}</p>
                      <p className="mt-2 text-2xl font-black">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-[1.75rem] bg-white p-6 text-black">
                  <p className="text-xs font-black tracking-[0.16em] text-black/35">
                    INTERPRETATION
                  </p>
                  <h3 className="mt-3 text-2xl font-black tracking-[-0.05em]">
                    변화와 기회가 섞인 조합입니다.
                  </h3>
                  <p className="mt-3 text-sm font-semibold leading-7 text-black/55">
                    숫자의 합계, 홀짝 균형, 번호대 분산이 안정적으로 구성되어
                    오늘의 흐름을 가볍게 확인하기 좋습니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-5 hidden rounded-3xl border border-white/10 bg-white/[0.08] p-5 backdrop-blur-2xl lg:block">
              <p className="text-xs font-black text-white/35">방문 루프</p>
              <p className="mt-1 text-xl font-black">매일 새 리포트</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto grid max-w-7xl gap-0 px-5 py-10 md:grid-cols-3">
          {features.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group border-white/10 py-8 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0"
            >
              <p className="text-sm font-black text-[#d7b46a]">{item.eyebrow}</p>
              <h2 className="mt-4 text-3xl font-black tracking-[-0.06em]">
                {item.title}
              </h2>
              <p className="mt-4 max-w-sm text-sm font-medium leading-7 text-white/48">
                {item.desc}
              </p>
              <p className="mt-7 text-sm font-black text-white/75 transition group-hover:text-[#d7b46a]">
                {item.cta} →
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-20 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2.5rem] bg-[#d7b46a] p-8 text-black sm:p-10">
          <p className="text-sm font-black tracking-[0.16em] text-black/45">
            WHY IT FEELS DIFFERENT
          </p>
          <h2 className="mt-5 text-5xl font-black leading-[0.95] tracking-[-0.08em]">
            단순 번호표가 아니라,
            <br />
            설명이 있는 결과.
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {[
            ["의미", "꿈과 날짜, 조합 균형을 짧은 리포트로 변환합니다."],
            ["반복", "오늘의 번호와 기록 구조로 다시 방문할 이유를 만듭니다."],
            ["공유", "결과 복사와 이미지 저장 흐름으로 확산 가능성을 높입니다."],
            ["가벼움", "DB 없이 브라우저 기반으로 빠르게 작동합니다."],
          ].map(([title, desc]) => (
            <div key={title} className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-7">
              <h3 className="text-2xl font-black tracking-[-0.05em]">{title}</h3>
              <p className="mt-4 text-sm font-medium leading-7 text-white/50">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20">
        <div className="overflow-hidden rounded-[2.75rem] border border-white/10 bg-white text-black">
          <div className="grid lg:grid-cols-[1fr_0.8fr]">
            <div className="p-8 sm:p-12">
              <p className="text-sm font-black tracking-[0.16em] text-black/35">
                START POINT
              </p>
              <h2 className="mt-5 text-5xl font-black leading-[0.95] tracking-[-0.08em]">
                가장 강한 진입점은
                <br />
                꿈 해몽 번호입니다.
              </h2>
              <p className="mt-6 max-w-xl text-base font-semibold leading-8 text-black/55">
                사용자가 직접 입력하는 꿈은 개인화 감각이 강합니다. 그래서 홈의
                1차 CTA는 꿈 해몽 번호로 집중시키는 것이 맞습니다.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/dream-lotto"
                  className="rounded-full bg-black px-8 py-4 text-center text-base font-black text-white"
                >
                  꿈 해몽 번호 만들기
                </Link>
                <Link
                  href="/random"
                  className="rounded-full bg-black/5 px-8 py-4 text-center text-base font-black text-black"
                >
                  빠른 랜덤 보기
                </Link>
              </div>
            </div>

            <div className="bg-black p-8 text-white sm:p-12">
              <p className="text-sm font-black text-white/35">SERVICE MAP</p>
              <div className="mt-7 space-y-4">
                {[
                  ["Dream", "개인 입력 기반"],
                  ["Today", "재방문 기반"],
                  ["Random", "즉시 실행 기반"],
                ].map(([title, desc]) => (
                  <div key={title} className="rounded-3xl bg-white/[0.08] p-5 ring-1 ring-white/10">
                    <p className="text-2xl font-black">{title}</p>
                    <p className="mt-1 text-sm font-semibold text-white/45">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20">
        <div className="rounded-[2.5rem] border border-dashed border-white/15 bg-white/[0.04] p-8 text-center">
          <p className="text-sm font-black text-white/35"></p>
          <p className="mt-2 text-sm font-semibold text-white/45">
            애드센스 승인 후 자연스럽게 삽입할 수 있는 광고 영역입니다.
          </p>
        </div>
      </section>

      <section className="bg-[#d7b46a] px-5 py-16 text-center text-black">
        <h2 className="text-5xl font-black tracking-[-0.08em]">
          오늘 하나만 만든다면,
          <br />
          꿈 해몽 번호부터.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-sm font-bold leading-7 text-black/55">
          해말아의 핵심은 단순 랜덤이 아니라, 사용자의 이야기를 번호 리포트로
          바꾸는 경험입니다.
        </p>

        <Link
          href="/dream-lotto"
          className="mt-8 inline-block rounded-full bg-black px-9 py-4 text-base font-black text-white"
        >
          바로 시작하기
        </Link>
      </section>

      <footer className="border-t border-white/10 bg-[#0b0b0c]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-xs font-semibold text-white/38 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 해말아. All rights reserved.</p>

          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="hover:text-white">
              개인정보처리방침
            </Link>
            <Link href="/contact" className="hover:text-white">
              문의
            </Link>
            <Link href="/dream-lotto" className="hover:text-white">
              꿈해몽
            </Link>
            <Link href="/today" className="hover:text-white">
              오늘
            </Link>
            <Link href="/random" className="hover:text-white">
              랜덤
            </Link>
          </div>
        </div>
<PremiumAdSlot />
      </footer>
    </main>
  );
}