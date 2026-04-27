import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      {/* Hero */}
      <section className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          해말아
        </h1>
        <p className="mt-3 text-base font-medium text-gray-600">
          할까 말까 고민될 때, 더 선명하게 결정하자
        </p>
      </section>

      {/* CTA */}
      <section className="mt-10 grid gap-4">
        <Link
          href="/test"
          className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:bg-gray-50"
        >
          <h2 className="text-lg font-semibold text-gray-900">
            성향 테스트 시작하기
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            나의 결정 스타일을 분석해준다
          </p>
        </Link>

        <Link
          href="/random"
          className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:bg-gray-50"
        >
          <h2 className="text-lg font-semibold text-gray-900">
            랜덤 결정
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            고민 없이 바로 선택해준다
          </p>
        </Link>

        <Link
          href="/today"
          className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:bg-gray-50"
        >
          <h2 className="text-lg font-semibold text-gray-900">
            오늘의 결정운
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            오늘 선택 흐름을 가볍게 확인
          </p>
        </Link>
      </section>

      {/* Info Section */}
      <section className="mt-12">
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-base font-semibold text-gray-800">
            왜 해말아인가?
          </h3>

          <div className="mt-3 space-y-2">
            <p className="text-sm text-gray-600">
              사람은 선택보다 고민에 더 많은 에너지를 쓴다.
            </p>
            <p className="text-sm text-gray-600">
              해말아는 그 과정을 줄이고, 빠르게 결론에 도달하게 만든다.
            </p>
            <p className="text-sm text-gray-600">
              복잡한 데이터 없이, 지금 순간에 집중한 결정 도구다.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 text-center">
        <p className="text-xs text-gray-400">
          © 2026 haemala
        </p>
      </footer>
    </main>
  );
}