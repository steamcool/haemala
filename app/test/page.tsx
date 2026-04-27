import Link from "next/link";

export default function TestPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <section className="mx-auto max-w-2xl">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">결정 성향 테스트</p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
            나는 고민할 때 어떤 방식으로 결정할까?
          </h1>

          <p className="mt-4 text-base font-medium leading-7 text-gray-600">
            선택을 미루는 편인지, 직감으로 빠르게 가는 편인지, 현실적인 기준을
            먼저 보는 편인지 확인해보세요.
          </p>

          <div className="mt-8 grid gap-3">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <p className="text-sm font-semibold text-gray-800">소요 시간</p>
              <p className="mt-1 text-sm text-gray-500">약 1분</p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <p className="text-sm font-semibold text-gray-800">문항 수</p>
              <p className="mt-1 text-sm text-gray-500">가볍게 답하는 8문항</p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <p className="text-sm font-semibold text-gray-800">결과</p>
              <p className="mt-1 text-sm text-gray-500">
                나의 결정 성향과 오늘의 선택 팁 제공
              </p>
            </div>
          </div>

          <Link
            href="/test/play"
            className="mt-8 flex h-14 items-center justify-center rounded-2xl bg-gray-900 text-base font-semibold text-white transition hover:bg-gray-800"
          >
            테스트 시작하기
          </Link>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          결과는 재미와 자기 이해를 위한 참고용입니다.
        </p>
      </section>
    </main>
  );
}