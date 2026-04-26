import Link from "next/link";

const services = [
  {
    href: "/today",
    badge: "오늘 바로 보기",
    title: "오늘의 해말아",
    desc: "고민을 짧게 입력하고 오늘 할지 말지 바로 판단합니다.",
    cta: "오늘 판단 받기",
  },
  {
    href: "/random",
    badge: "중독형 콘텐츠",
    title: "랜덤 운세·선택",
    desc: "버튼 한 번으로 오늘의 흐름, 선택, 기분 전환 콘텐츠를 확인합니다.",
    cta: "랜덤으로 보기",
  },
  {
    href: "/dream-lotto",
    badge: "트래픽 유입용",
    title: "꿈해몽 로또",
    desc: "꿈 내용을 바탕으로 재미용 로또 번호 조합을 생성합니다.",
    cta: "꿈 번호 뽑기",
  },
];

const proofCards = [
  ["DB 없음", "회원가입, 저장, 복잡한 서버 없이 바로 작동합니다."],
  ["모바일 최적화", "짧은 체류와 반복 방문에 맞춘 카드형 구조입니다."],
  ["광고 친화", "콘텐츠형 페이지와 자연스러운 내부 이동 구조를 갖췄습니다."],
  ["공유 유도", "결과 확인 후 다른 페이지로 이동하기 쉬운 흐름입니다."],
];

const keywords = [
  "오늘 운세",
  "할까 말까",
  "랜덤 선택",
  "꿈해몽",
  "로또 번호",
  "재미 테스트",
  "결정 도우미",
  "무료 콘텐츠",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-950">
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
          <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 px-6 py-12 text-white sm:px-10 lg:px-14 lg:py-16">
            <div className="absolute right-[-80px] top-[-80px] h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-[-90px] left-[-70px] h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl" />

            <div className="relative max-w-4xl">
              <p className="mb-4 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black text-white/80">
                HAEMALA · 무료 결정 콘텐츠 플랫폼
              </p>

              <h1 className="text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl">
                할까 말까,
                <br />
                오늘은 해말아가 정해준다
              </h1>

              <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-white/70 sm:text-lg">
                고민 판단, 랜덤 선택, 꿈해몽 로또까지. 회원가입 없이 바로
                쓰는 무료 콘텐츠형 서비스입니다.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/today"
                  className="rounded-3xl bg-white px-7 py-4 text-center text-base font-black text-slate-950 shadow-sm transition hover:-translate-y-0.5"
                >
                  지금 바로 시작하기
                </Link>
                <Link
                  href="/dream-lotto"
                  className="rounded-3xl border border-white/20 bg-white/10 px-7 py-4 text-center text-base font-black text-white transition hover:-translate-y-0.5"
                >
                  꿈해몽 로또 보기
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs font-black text-white/75"
                  >
                    #{keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4 p-5 sm:p-8 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group rounded-[1.7rem] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-md"
              >
                <p className="inline-flex rounded-full bg-indigo-50 px-3 py-2 text-xs font-black text-indigo-700">
                  {service.badge}
                </p>
                <h2 className="mt-5 text-2xl font-black tracking-tight">
                  {service.title}
                </h2>
                <p className="mt-3 min-h-[56px] text-sm font-semibold leading-7 text-slate-500">
                  {service.desc}
                </p>
                <div className="mt-5 rounded-2xl bg-slate-950 px-5 py-4 text-center text-sm font-black text-white transition group-hover:bg-indigo-700">
                  {service.cta}
                </div>
              </Link>
            ))}
          </div>
        </div>

        <section className="mt-8 grid gap-4 md:grid-cols-4">
          {proofCards.map(([title, body]) => (
            <article
              key={title}
              className="rounded-[1.7rem] border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h3 className="text-lg font-black">{title}</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
                {body}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-black text-indigo-700">
                왜 계속 누르게 되는가
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                고민형 검색 유입과 랜덤형 체류를 동시에 노립니다
              </h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate-500">
                사용자는 “오늘 할까 말까”, “꿈해몽 로또”, “랜덤 선택”처럼
                가벼운 의도로 들어옵니다. 해말아는 그 의도를 짧고 빠른 결과로
                처리하고, 다른 페이지로 자연스럽게 이동하게 설계된 구조입니다.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["1", "고민 입력"],
                ["2", "즉시 결과"],
                ["3", "다른 콘텐츠 이동"],
                ["4", "재방문·공유"],
              ].map(([num, text]) => (
                <div
                  key={num}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-black text-white">
                    {num}
                  </span>
                  <p className="mt-4 text-lg font-black">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] bg-slate-950 p-6 text-white shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-black text-white/50">오늘의 추천</p>
              <h2 className="mt-2 text-3xl font-black">지금 고민이 있다면</h2>
              <p className="mt-2 text-sm font-semibold text-white/60">
                가장 먼저 `/today`에서 짧게 판단을 받아보세요.
              </p>
            </div>
            <Link
              href="/today"
              className="rounded-3xl bg-white px-7 py-4 text-center text-base font-black text-slate-950 transition hover:-translate-y-0.5"
            >
              /today 바로가기
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}