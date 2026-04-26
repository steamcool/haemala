import Link from "next/link";

export const metadata = {
  title: "Haemala | 오늘의 선택, 랜덤 추천, 꿈해몽 로또",
  description:
    "Haemala는 오늘의 선택, 랜덤 추천, 꿈해몽 기반 번호 추천을 제공하는 무료 랜덤 인사이트 서비스입니다.",
};

const mainServices = [
  {
    href: "/today",
    label: "가장 먼저 추천",
    title: "오늘의 해말아",
    desc: "고민을 입력하면 오늘 할지 말지 참고할 수 있는 판단 결과를 제공합니다.",
    cta: "고민 판단하기",
    emoji: "⚖️",
  },
  {
    href: "/random",
    label: "가볍게 즐기기",
    title: "랜덤 선택",
    desc: "선택, 운세, 미션, 기분 전환용 결과를 버튼 한 번으로 확인합니다.",
    cta: "랜덤 뽑기",
    emoji: "🎲",
  },
  {
    href: "/dream-lotto",
    label: "재방문 유도",
    title: "꿈해몽 로또",
    desc: "꿈의 분위기와 상징을 참고해 재미용 번호 조합을 생성합니다.",
    cta: "꿈 번호 보기",
    emoji: "🌙",
  },
];

const stats = [
  ["0초", "회원가입"],
  ["0개", "필수 입력"],
  ["3개", "무료 기능"],
  ["100%", "모바일 대응"],
];

const reasons = [
  {
    title: "바로 이해되는 서비스",
    body: "처음 방문해도 오늘의 선택, 랜덤 결과, 꿈 번호 기능을 즉시 사용할 수 있습니다.",
  },
  {
    title: "콘텐츠형 도구 구조",
    body: "단순 버튼이 아니라 결과의 의미와 이용 가이드를 함께 제공해 체류 흐름을 만듭니다.",
  },
  {
    title: "개인정보 최소화",
    body: "핵심 기능 이용을 위해 회원가입이나 민감한 개인정보 입력을 요구하지 않습니다.",
  },
];

const guideItems = [
  {
    title: "결과는 참고용입니다",
    body: "Haemala의 결과는 오락과 참고 목적의 콘텐츠입니다. 실제 미래나 특정 결과를 보장하지 않습니다.",
  },
  {
    title: "반복 실행이 가능합니다",
    body: "랜덤 기반 서비스 특성상 같은 기능을 다시 사용하면 다른 결과가 나올 수 있습니다.",
  },
  {
    title: "가볍게 즐기는 서비스입니다",
    body: "중요한 의사결정은 사용자의 판단이 우선이며, Haemala는 생각의 계기를 제공하는 도구입니다.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-950">
      <section className="mx-auto max-w-7xl px-5 py-6 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2.2rem] border border-slate-200 bg-white shadow-sm">
          <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,#4f46e5,transparent_34%),linear-gradient(135deg,#020617,#111827_48%,#312e81)] px-6 py-12 text-white sm:px-10 lg:px-14 lg:py-20">
            <div className="absolute right-[-120px] top-[-120px] h-80 w-80 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-[-140px] left-[-120px] h-96 w-96 rounded-full bg-fuchsia-400/20 blur-3xl" />

            <div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <p className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black text-white/80">
                  HAEMALA · 무료 랜덤 인사이트 서비스
                </p>

                <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl">
                  고민하지 마세요.
                  <br />
                  해말아가 바로
                  <br />
                  정해드립니다.
                </h1>

                <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-white/75 sm:text-lg">
                  오늘 할지 말지, 랜덤 선택, 꿈해몽 로또까지. Haemala는
                  회원가입 없이 바로 사용할 수 있는 무료 랜덤 인사이트
                  서비스입니다. 결과는 오락과 참고 목적이며, 사용자의 선택을
                  가볍게 돕는 콘텐츠로 제공됩니다.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/today"
                    className="rounded-3xl bg-white px-7 py-4 text-center text-base font-black text-slate-950 shadow-sm transition hover:-translate-y-0.5"
                  >
                    지금 고민 판단하기
                  </Link>
                  <Link
                    href="/random"
                    className="rounded-3xl border border-white/20 bg-white/10 px-7 py-4 text-center text-base font-black text-white transition hover:-translate-y-0.5 hover:bg-white/15"
                  >
                    랜덤으로 시작하기
                  </Link>
                </div>

                <div className="mt-8 flex flex-wrap gap-2 text-xs font-bold text-white/60">
                  <span className="rounded-full bg-white/10 px-3 py-2">
                    회원가입 없음
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-2">
                    무료 이용
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-2">
                    참고용 결과
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-2">
                    모바일 최적화
                  </span>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur">
                <div className="rounded-[1.5rem] bg-white p-5 text-slate-950">
                  <p className="text-sm font-black text-indigo-700">
                    오늘의 빠른 선택
                  </p>
                  <h2 className="mt-2 text-3xl font-black">
                    지금 바로 하나만 고르세요
                  </h2>

                  <div className="mt-5 grid gap-3">
                    {mainServices.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        className="group rounded-3xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-2xl">
                            {service.emoji}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-black text-indigo-700">
                              {service.label}
                            </p>
                            <h3 className="text-lg font-black">
                              {service.title}
                            </h3>
                            <p className="mt-1 line-clamp-2 text-xs font-semibold leading-5 text-slate-500">
                              {service.desc}
                            </p>
                          </div>
                          <span className="text-xl font-black text-slate-300 transition group-hover:translate-x-1 group-hover:text-indigo-600">
                            →
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-2 gap-3 p-5 sm:grid-cols-4 sm:p-8">
            {stats.map(([num, label]) => (
              <div
                key={label}
                className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 text-center"
              >
                <p className="text-3xl font-black">{num}</p>
                <p className="mt-1 text-xs font-black text-slate-500">
                  {label}
                </p>
              </div>
            ))}
          </section>
        </div>

        <section className="mt-8 grid gap-4 lg:grid-cols-3">
          {mainServices.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="group rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-950 text-3xl">
                {service.emoji}
              </div>
              <p className="mt-6 inline-flex rounded-full bg-indigo-50 px-3 py-2 text-xs font-black text-indigo-700">
                {service.label}
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight">
                {service.title}
              </h2>
              <p className="mt-3 min-h-[72px] text-sm font-semibold leading-7 text-slate-500">
                {service.desc}
              </p>
              <div className="mt-6 rounded-3xl bg-slate-950 px-5 py-4 text-center text-sm font-black text-white transition group-hover:bg-indigo-700">
                {service.cta}
              </div>
            </Link>
          ))}
        </section>

        <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-sm font-black text-indigo-700">
                서비스 소개
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">
                Haemala는 어떤 서비스인가요?
              </h2>
            </div>

            <div className="space-y-4 text-sm font-semibold leading-8 text-slate-600">
              <p>
                Haemala는 사용자가 고민하는 순간 빠르게 참고할 수 있는 랜덤
                기반 의사결정 보조 웹 서비스입니다. 오늘 할지 말지, 랜덤 선택,
                꿈해몽 기반 번호 추천과 같은 기능을 통해 짧은 시간 안에 결과를
                확인할 수 있도록 설계되었습니다.
              </p>
              <p>
                본 서비스의 결과는 오락과 참고 목적의 콘텐츠이며 특정 결과,
                금전적 이익, 미래 사건을 보장하지 않습니다. 사용자는 결과를
                가볍게 참고하되, 중요한 결정은 자신의 판단과 책임에 따라
                신중하게 내려야 합니다.
              </p>
              <p>
                Haemala는 복잡한 회원가입 과정 없이 바로 사용할 수 있는 구조를
                지향합니다. 사용자의 접근 장벽을 낮추고, 모바일 환경에서도 빠르게
                탐색할 수 있도록 주요 기능을 단순하고 명확하게 배치했습니다.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {guideItems.map((item) => (
            <article
              key={item.title}
              className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-xl font-black">{item.title}</h3>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-500">
                {item.body}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-black text-indigo-700">
                왜 해말아인가
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">
                처음 와도 바로 이해되고, 한 번 더 누르게 만듭니다.
              </h2>
              <p className="mt-5 text-sm font-semibold leading-7 text-slate-500">
                해말아는 복잡한 앱이 아닙니다. 사용자가 이미 검색하고 싶은
                “할까 말까”, “랜덤 선택”, “꿈해몽 로또” 같은 가벼운 의도를
                즉시 처리하는 무료 콘텐츠 서비스입니다.
              </p>
            </div>

            <div className="grid gap-4">
              {reasons.map((item, index) => (
                <article
                  key={item.title}
                  className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5"
                >
                  <div className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-black text-white">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-lg font-black">{item.title}</h3>
                      <p className="mt-1 text-sm font-semibold leading-6 text-slate-500">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-black text-indigo-700">이용 안내</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
            안전하고 명확하게 사용하는 방법
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="font-black">개인정보 최소화</p>
              <p className="mt-2 text-sm font-semibold leading-7 text-slate-500">
                핵심 기능 이용을 위해 이름, 전화번호, 주소 등 민감한 개인정보를
                요구하지 않습니다.
              </p>
            </div>

            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="font-black">참고용 콘텐츠</p>
              <p className="mt-2 text-sm font-semibold leading-7 text-slate-500">
                결과는 재미와 참고를 위한 콘텐츠이며, 실제 결과를 예측하거나
                보장하지 않습니다.
              </p>
            </div>

            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="font-black">광고 기반 운영</p>
              <p className="mt-2 text-sm font-semibold leading-7 text-slate-500">
                본 사이트는 무료 제공을 유지하기 위해 광고를 통해 운영될 수
                있습니다.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/about"
              className="rounded-full border border-slate-300 px-5 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50"
            >
              서비스 소개
            </Link>
            <Link
              href="/guide"
              className="rounded-full border border-slate-300 px-5 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50"
            >
              이용 가이드
            </Link>
            <Link
              href="/privacy"
              className="rounded-full border border-slate-300 px-5 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50"
            >
              개인정보처리방침
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-slate-300 px-5 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50"
            >
              문의하기
            </Link>
          </div>
        </section>

        <section className="mt-8 overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-sm">
          <div className="grid gap-0 lg:grid-cols-3">
            <div className="p-6 sm:p-8 lg:col-span-2">
              <p className="text-sm font-black text-white/45">
                지금 바로 시작
              </p>
              <h2 className="mt-2 text-3xl font-black sm:text-5xl">
                고민이 있다면 /today,
                <br />
                심심하면 /random,
                <br />
                꿈을 꿨다면 /dream-lotto.
              </h2>
              <p className="mt-5 max-w-2xl text-sm font-semibold leading-7 text-white/60">
                세 페이지가 서로 연결되어 있어 첫 방문자가 자연스럽게 다른
                콘텐츠까지 탐색할 수 있습니다. Haemala는 짧은 방문도 의미 있게
                만들기 위해 각 기능을 단순하고 빠르게 구성했습니다.
              </p>
            </div>

            <div className="grid gap-3 border-t border-white/10 p-6 sm:p-8 lg:border-l lg:border-t-0">
              <Link
                href="/today"
                className="rounded-3xl bg-white px-5 py-4 text-center text-sm font-black text-slate-950 transition hover:-translate-y-0.5"
              >
                /today
              </Link>
              <Link
                href="/random"
                className="rounded-3xl border border-white/15 bg-white/10 px-5 py-4 text-center text-sm font-black text-white transition hover:-translate-y-0.5"
              >
                /random
              </Link>
              <Link
                href="/dream-lotto"
                className="rounded-3xl border border-white/15 bg-white/10 px-5 py-4 text-center text-sm font-black text-white transition hover:-translate-y-0.5"
              >
                /dream-lotto
              </Link>
            </div>
          </div>
        </section>

        <footer className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 text-sm font-semibold text-slate-500 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p>© 2026 Haemala. Free random insight service.</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/about" className="hover:text-indigo-700">
                About
              </Link>
              <Link href="/guide" className="hover:text-indigo-700">
                Guide
              </Link>
              <Link href="/privacy" className="hover:text-indigo-700">
                Privacy
              </Link>
              <Link href="/contact" className="hover:text-indigo-700">
                Contact
              </Link>
            </div>
          </div>
        </footer>
      </section>
    </main>
  );
}