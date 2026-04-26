import Link from "next/link";

export const metadata = {
  title: "서비스 소개 | Haemala",
  description:
    "Haemala는 꿈, 오늘의 선택, 랜덤 추천을 가볍고 직관적으로 제공하는 프론트엔드 기반 생활형 랜덤 인사이트 서비스입니다.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] px-5 py-10 text-slate-900">
      <section className="mx-auto max-w-4xl">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm md:p-12">
          <p className="mb-3 text-sm font-bold text-indigo-600">ABOUT HAEMALA</p>

          <h1 className="text-3xl font-black tracking-tight md:text-5xl">
            가볍게 묻고, 빠르게 확인하는 랜덤 인사이트 서비스
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Haemala는 사용자가 복잡한 가입이나 설정 없이 오늘의 선택, 꿈 기반
            번호 추천, 랜덤 결과를 간단하게 확인할 수 있도록 만든 생활형 웹
            서비스입니다. 결과는 오락과 참고 목적의 콘텐츠이며, 사용자의 중요한
            의사결정을 대신하지 않습니다.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-lg font-black">빠른 접근</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                별도 회원가입 없이 주요 기능을 바로 사용할 수 있도록 구성했습니다.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-lg font-black">개인정보 최소화</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                핵심 기능 이용 과정에서 불필요한 개인정보 입력을 요구하지 않습니다.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-lg font-black">참고용 콘텐츠</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                결과는 재미와 해석을 위한 참고 자료이며 보장된 예측이 아닙니다.
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-3xl bg-slate-900 p-7 text-white">
            <h2 className="text-2xl font-black">Haemala가 지향하는 방향</h2>
            <p className="mt-4 leading-8 text-slate-300">
              Haemala는 복잡한 데이터 저장형 서비스보다, 사용자가 필요한 순간에
              가볍게 방문하고 결과를 확인한 뒤 다시 돌아올 수 있는 간단하고
              명확한 도구형 서비스를 지향합니다. 랜덤 추천, 꿈 해석, 오늘의 선택
              같은 기능을 통해 작은 재미와 생각할 거리를 제공합니다.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-bold text-white"
            >
              홈으로 이동
            </Link>
            <Link
              href="/guide"
              className="rounded-full border border-slate-300 px-6 py-3 text-sm font-bold text-slate-700"
            >
              이용 가이드 보기
            </Link>
            <Link
              href="/privacy"
              className="rounded-full border border-slate-300 px-6 py-3 text-sm font-bold text-slate-700"
            >
              개인정보처리방침
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}