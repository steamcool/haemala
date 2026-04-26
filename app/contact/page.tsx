import Link from "next/link";

export const metadata = {
  title: "문의하기 | Haemala",
  description:
    "Haemala 서비스 이용, 광고, 제휴 및 기타 문의를 위한 연락 페이지입니다.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] px-5 py-10 text-slate-900">
      <section className="mx-auto max-w-3xl">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm md:p-12">
          <p className="mb-3 text-sm font-black text-indigo-600">
            CONTACT
          </p>

          <h1 className="text-3xl font-black tracking-tight md:text-5xl">
            문의하기
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Haemala 서비스 이용 중 궁금한 점, 개선 제안, 오류 신고,
            광고 및 제휴 문의는 아래 이메일로 연락해 주세요.
          </p>

          <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm font-black text-slate-500">이메일</p>
            <p className="mt-2 text-xl font-black text-slate-900">
              contact@haemala.com
            </p>
          </div>

          <div className="mt-8 space-y-3 text-sm font-semibold text-slate-600">
            <p>
              • 서비스 오류 또는 버그가 있는 경우, 사용 환경(기기/브라우저)을 함께 알려주시면 도움이 됩니다.
            </p>
            <p>
              • 광고 및 제휴 문의는 구체적인 내용을 포함해 주시면 빠르게 확인 가능합니다.
            </p>
            <p>
              • 모든 문의는 순차적으로 검토되며, 답변까지 일정 시간이 소요될 수 있습니다.
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
              href="/about"
              className="rounded-full border border-slate-300 px-6 py-3 text-sm font-bold text-slate-700"
            >
              서비스 소개
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