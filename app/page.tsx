import Link from "next/link";

const featuredTests = [
  {
    href: "/test",
    label: "대표 테스트",
    title: "결정 성향 테스트",
    desc: "나는 고민 앞에서 돌진형인지, 분석형인지, 직감형인지, 안전형인지 확인합니다.",
  },
  {
    href: "/simulate",
    label: "핵심 기능",
    title: "선택 시뮬레이터",
    desc: "그래서 지금 할까 말까? 현재 상황을 고르고 오늘의 판정을 확인합니다.",
  },
  {
    href: "/today",
    label: "재방문",
    title: "오늘의 결정운",
    desc: "오늘 밀어붙일 선택과 피해야 할 선택을 가볍게 확인합니다.",
  },
];

const subTools = [
  {
    href: "/random",
    title: "랜덤 결정기",
    desc: "생각이 너무 많을 때, 빠르게 결정을 던져주는 보조 도구.",
  },
  {
    href: "/dream-lotto",
    title: "꿈 로또",
    desc: "꿈 키워드 기반 재미형 번호 추천. 트래픽용 서브 콘텐츠.",
  },
];

const types = [
  ["돌진형 실행가", "고민보다 실행이 빠른 타입"],
  ["분석형 보류가", "확신 없이는 쉽게 움직이지 않는 타입"],
  ["직감형 감각러", "느낌과 분위기를 빠르게 읽는 타입"],
  ["안전형 방어자", "손해와 리스크를 먼저 계산하는 타입"],
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f3ec] text-[#17130f]">
      <section className="mx-auto max-w-7xl px-5 py-8 md:py-12">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-black tracking-tight">
            해말아
          </Link>

          <div className="hidden items-center gap-6 text-sm font-black text-black/50 md:flex">
            <Link href="/test" className="hover:text-black">
              성향테스트
            </Link>
            <Link href="/simulate" className="hover:text-black">
              시뮬레이터
            </Link>
            <Link href="/today" className="hover:text-black">
              오늘의 결정운
            </Link>
          </div>

          <Link
            href="/test/play"
            className="rounded-full bg-black px-5 py-3 text-sm font-black text-white shadow-lg shadow-black/15"
          >
            시작하기
          </Link>
        </nav>

        <section className="grid gap-10 pb-14 pt-16 md:grid-cols-[1.1fr_0.9fr] md:items-center md:pb-24 md:pt-24">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-black/10 bg-white/75 px-4 py-2 text-sm font-black text-black/50 shadow-sm">
              DB 없이 가볍게 즐기는 결정 성향 테스트
            </div>

            <h1 className="text-5xl font-black leading-[0.98] tracking-tight md:text-7xl lg:text-8xl">
              할까 말까,
              <br />
              고민될 때
              <br />
              해말아.
            </h1>

            <p className="mt-7 max-w-2xl text-lg font-semibold leading-8 text-black/60 md:text-xl">
              해말아는 단순 심리테스트가 아닙니다. 질문을 고를 때마다
              성향이 실시간으로 바뀌고, 마지막에는 지금 선택을 밀어붙여도
              되는지 시뮬레이션합니다.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/test/play"
                className="rounded-2xl bg-black px-8 py-5 text-center text-base font-black text-white shadow-2xl shadow-black/20 transition hover:-translate-y-0.5"
              >
                내 결정 성향 테스트 시작하기
              </Link>

              <Link
                href="/simulate"
                className="rounded-2xl border border-black/10 bg-white px-8 py-5 text-center text-base font-black text-black shadow-sm transition hover:-translate-y-0.5"
              >
                바로 할까 말까 판정하기
              </Link>
            </div>

            <div className="mt-9 grid max-w-xl grid-cols-3 gap-3">
              {[
                ["0원", "회원가입"],
                ["100%", "프론트 기반"],
                ["1분", "결과 확인"],
              ].map(([num, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-black/10 bg-white/70 p-4 text-center shadow-sm"
                >
                  <p className="text-2xl font-black">{num}</p>
                  <p className="mt-1 text-xs font-black text-black/45">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-black/10 bg-white p-4 shadow-2xl shadow-black/10">
            <div className="rounded-[2rem] bg-black p-6 text-white md:p-8">
              <div className="flex items-center justify-between">
                <p className="text-sm font-black text-white/45">LIVE TENDENCY</p>
                <p className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-white/60">
                  실시간 변화
                </p>
              </div>

              <h2 className="mt-8 text-4xl font-black leading-tight md:text-5xl">
                분석형 보류가
              </h2>

              <p className="mt-5 leading-7 text-white/65">
                지금 당신은 확신 없이 움직이지 않는 타입으로 기울고 있습니다.
                실수는 적지만, 기회를 오래 붙잡고만 있을 수 있습니다.
              </p>

              <div className="mt-9 space-y-5">
                {[
                  ["분석", "86%"],
                  ["안전", "72%"],
                  ["직감", "51%"],
                  ["실행", "38%"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <div className="mb-2 flex justify-between text-sm font-black">
                      <span>{label}</span>
                      <span>{value}</span>
                    </div>
                    <div className="h-3 rounded-full bg-white/10">
                      <div
                        className="h-3 rounded-full bg-white"
                        style={{ width: value }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-9 rounded-[1.5rem] bg-white p-5 text-black">
                <p className="text-sm font-black text-black/40">오늘의 판정</p>
                <p className="mt-2 text-2xl font-black">조건부로 해라</p>
                <p className="mt-2 text-sm font-bold leading-6 text-black/55">
                  완벽한 확신을 기다리면 타이밍을 놓칠 수 있습니다. 손실선을
                  정하고 작게 실행하세요.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {featuredTests.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group rounded-[2rem] border border-black/10 bg-white/80 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10"
            >
              <p className="text-sm font-black text-black/40">{item.label}</p>
              <h3 className="mt-4 text-2xl font-black">{item.title}</h3>
              <p className="mt-3 leading-7 text-black/60">{item.desc}</p>
              <p className="mt-6 text-sm font-black text-black group-hover:underline">
                들어가기 →
              </p>
            </Link>
          ))}
        </section>

        <section className="mt-20 grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-start">
          <div>
            <p className="text-sm font-black text-black/40">WHY HAEMALA</p>
            <h2 className="mt-3 text-4xl font-black leading-tight md:text-5xl">
              흔한 테스트가 아니라,
              <br />
              선택을 가지고 노는 구조.
            </h2>
            <p className="mt-5 leading-8 text-black/60">
              결과 하나 보고 끝나는 테스트는 오래 못 갑니다. 해말아는 성향
              분석, 오늘의 판정, 선택 시뮬레이션, 보조 도구를 하나의 루프로
              묶어 체류와 재방문을 만듭니다.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {types.map(([title, desc]) => (
              <article
                key={title}
                className="rounded-[1.5rem] border border-black/10 bg-white/75 p-5 shadow-sm"
              >
                <h3 className="text-xl font-black">{title}</h3>
                <p className="mt-2 text-sm font-bold leading-6 text-black/55">
                  {desc}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-[2.5rem] border border-black/10 bg-black p-6 text-white shadow-2xl shadow-black/15 md:p-10">
          <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:items-center">
            <div>
              <p className="text-sm font-black text-white/45">DECISION LOOP</p>
              <h2 className="mt-3 text-4xl font-black leading-tight md:text-5xl">
                테스트하고,
                <br />
                판정받고,
                <br />
                다시 선택한다.
              </h2>
            </div>

            <div className="grid gap-3">
              {[
                "1. 질문 선택 중 실시간 성향 변화",
                "2. 최종 결정 유형 분석",
                "3. 지금 할까 말까 시뮬레이션",
                "4. 오늘의 결정운과 보조 도구로 재방문",
              ].map((text) => (
                <div
                  key={text}
                  className="rounded-2xl border border-white/10 bg-white/10 p-4 font-black text-white/80"
                >
                  {text}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-20">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-black text-black/40">SUB TOOLS</p>
              <h2 className="mt-2 text-3xl font-black md:text-4xl">
                가볍게 즐기는 보조 기능
              </h2>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {subTools.map((tool) => (
              <Link
                key={tool.title}
                href={tool.href}
                className="rounded-[2rem] border border-black/10 bg-white/80 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10"
              >
                <h3 className="text-2xl font-black">{tool.title}</h3>
                <p className="mt-3 leading-7 text-black/60">{tool.desc}</p>
                <p className="mt-6 text-sm font-black">열기 →</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-[2.5rem] border border-black/10 bg-white p-7 text-center shadow-xl shadow-black/5 md:p-12">
          <p className="text-sm font-black text-black/40">START NOW</p>
          <h2 className="mt-3 text-4xl font-black leading-tight md:text-6xl">
            지금 고민되는 선택이 있다면
            <br />
            먼저 성향부터 확인하세요.
          </h2>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/test/play"
              className="rounded-2xl bg-black px-8 py-5 text-center font-black text-white shadow-xl shadow-black/20"
            >
              성향테스트 시작
            </Link>
            <Link
              href="/simulate"
              className="rounded-2xl border border-black/10 bg-[#f7f3ec] px-8 py-5 text-center font-black text-black"
            >
              할까 말까 판정
            </Link>
          </div>
        </section>

        <footer className="mt-16 border-t border-black/10 py-8 text-sm font-bold text-black/40">
          <div className="flex flex-col justify-between gap-3 md:flex-row">
            <p>© HAEMALA. 할까 말까 고민될 때.</p>
            <div className="flex gap-4">
              <Link href="/test">Test</Link>
              <Link href="/simulate">Simulate</Link>
              <Link href="/today">Today</Link>
              <Link href="/random">Random</Link>
              <Link href="/dream-lotto">Dream Lotto</Link>
            </div>
          </div>
        </footer>
      </section>
    </main>
  );
}