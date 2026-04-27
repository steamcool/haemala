import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8fafc] px-4 py-10 text-slate-950">
      <section className="mx-auto max-w-5xl">
        {/* 헤더 */}
        <header className="mb-10 text-center">
          <p className="text-sm font-semibold text-orange-600">
            모였을 때 바로 쓰는
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-6xl">
            해말아 🎯
          </h1>
          <p className="mt-4 text-base font-medium text-slate-600">
            할까 말까 고민될 때, 그냥 돌려.
          </p>
        </header>

        {/* 핵심 게임 3개 */}
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-bold">🔥 바로 쓰는 핵심 게임</h2>

          <div className="grid gap-4 sm:grid-cols-3">
            <GameCard
              title="사다리 타기"
              desc="밥값, 벌칙, 당첨자"
              href="/ladder"
              highlight
            />
            <GameCard
              title="룰렛"
              desc="메뉴, 역할, 랜덤 선택"
              href="/roulette"
            />
            <GameCard
              title="랜덤 뽑기"
              desc="1명 / 2명 빠르게 선정"
              href="/random-pick"
            />
          </div>
        </section>

        {/* 상황별 */}
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-bold">💡 이런 상황에서</h2>

          <div className="grid gap-4 sm:grid-cols-3">
            <GameCard title="밥값 내기" href="/ladder" />
            <GameCard title="벌칙 정하기" href="/roulette" />
            <GameCard title="팀 나누기" href="/team" />
          </div>
        </section>

        {/* 전체 리스트 */}
        <section>
          <h2 className="mb-4 text-xl font-bold">전체 기능</h2>

          <div className="grid gap-3 sm:grid-cols-2">
            <SimpleLink href="/ladder" label="사다리 타기" />
            <SimpleLink href="/roulette" label="룰렛" />
            <SimpleLink href="/random-pick" label="랜덤 뽑기" />
            <SimpleLink href="/team" label="팀 나누기" />
          </div>
        </section>
      </section>
    </main>
  );
}

function GameCard({
  title,
  desc,
  href,
  highlight,
}: {
  title: string;
  desc?: string;
  href: string;
  highlight?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group rounded-[24px] p-5 transition shadow-sm ring-1 ${
        highlight
          ? "bg-orange-500 text-white ring-orange-500"
          : "bg-white text-slate-900 ring-slate-200"
      }`}
    >
      <h3 className="text-xl font-bold">{title}</h3>
      {desc && (
        <p
          className={`mt-2 text-sm font-medium ${
            highlight ? "text-white/80" : "text-slate-500"
          }`}
        >
          {desc}
        </p>
      )}

      <div className="mt-4 text-sm font-bold">
        시작 →
      </div>
    </Link>
  );
}

function SimpleLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl bg-white px-4 py-3 text-base font-semibold shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50"
    >
      {label}
    </Link>
  );
}