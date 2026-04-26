import Link from "next/link";

const testCards = [
  {
    title: "결정 성향 테스트",
    desc: "당신이 고민 앞에서 돌진형인지, 분석형인지, 회피형인지 판정합니다.",
    tag: "대표 테스트",
  },
  {
    title: "실시간 성향 변화",
    desc: "질문을 고를 때마다 내 성향 게이지가 즉시 바뀝니다.",
    tag: "몰입형 UX",
  },
  {
    title: "선택 시뮬레이션",
    desc: "결과만 보고 끝나지 않고, 지금 할까 말까까지 이어집니다.",
    tag: "해말아 핵심",
  },
];

export default function TestPage() {
  return (
    <main className="min-h-screen bg-[#f7f3ec] text-[#17130f]">
      <section className="mx-auto flex max-w-6xl flex-col px-5 py-16 md:py-24">
        <div className="mb-10 inline-flex w-fit rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-bold text-black/60 shadow-sm">
          HAEMALA ORIGINAL TEST
        </div>

        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <h1 className="text-5xl font-black leading-tight tracking-tight md:text-7xl">
              할까 말까,
              <br />
              당신의 결정 성향부터
              <br />
              확인하세요.
            </h1>

            <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-black/60">
              해말아 성향테스트는 단순 심리테스트가 아닙니다. 질문을
              선택할 때마다 성향이 실시간으로 변하고, 마지막에는 지금 선택을
              밀어붙여도 되는지 시뮬레이션합니다.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/test/play"
                className="rounded-2xl bg-black px-7 py-4 text-center text-base font-black text-white shadow-xl shadow-black/20 transition hover:-translate-y-0.5"
              >
                테스트 시작하기
              </Link>

              <Link
                href="/simulate"
                className="rounded-2xl border border-black/10 bg-white px-7 py-4 text-center text-base font-black text-black shadow-sm transition hover:-translate-y-0.5"
              >
                바로 시뮬레이션하기
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-2xl shadow-black/10">
            <div className="rounded-[1.5rem] bg-black p-6 text-white">
              <p className="text-sm font-bold text-white/50">LIVE RESULT</p>
              <h2 className="mt-4 text-3xl font-black">분석형 보류가</h2>
              <p className="mt-4 leading-7 text-white/70">
                확신 없이 움직이지 않는 타입. 실수는 적지만, 좋은 타이밍을
                놓칠 수 있습니다.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  ["분석", "84%"],
                  ["실행", "41%"],
                  ["직감", "63%"],
                  ["안전", "78%"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <div className="mb-2 flex justify-between text-sm font-bold">
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
            </div>
          </div>
        </div>

        <section className="mt-16 grid gap-4 md:grid-cols-3">
          {testCards.map((card) => (
            <article
              key={card.title}
              className="rounded-[1.5rem] border border-black/10 bg-white/80 p-6 shadow-sm"
            >
              <p className="text-sm font-black text-black/40">{card.tag}</p>
              <h3 className="mt-4 text-2xl font-black">{card.title}</h3>
              <p className="mt-3 leading-7 text-black/60">{card.desc}</p>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}