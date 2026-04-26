import Link from "next/link";

export const metadata = {
  title: "개인정보처리방침 | Haemala",
  description:
    "Haemala의 개인정보 수집, 쿠키, 광고 및 Google AdSense 사용에 관한 안내입니다.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] px-5 py-10 text-slate-900">
      <section className="mx-auto max-w-4xl">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm md:p-12">
          <p className="mb-3 text-sm font-bold text-indigo-600">
            PRIVACY POLICY
          </p>

          <h1 className="text-3xl font-black tracking-tight md:text-5xl">
            개인정보처리방침
          </h1>

          <p className="mt-6 text-sm text-slate-500">
            최종 업데이트: 2026년 4월 26일
          </p>

          <div className="mt-10 space-y-8 text-slate-700">
            <section>
              <h2 className="text-2xl font-black text-slate-900">
                1. 기본 원칙
              </h2>
              <p className="mt-4 leading-8">
                Haemala는 사용자의 개인정보 보호를 중요하게 생각합니다. 본
                사이트는 회원가입 없이 이용 가능한 웹 서비스이며, 핵심 기능
                이용을 위해 이름, 전화번호, 주소, 주민등록번호 등 직접적인
                개인정보 입력을 요구하지 않습니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-900">
                2. 수집하는 정보
              </h2>
              <p className="mt-4 leading-8">
                Haemala는 서비스 제공을 위해 사용자의 민감한 개인정보를 직접
                수집하지 않습니다. 다만 웹사이트 운영, 보안, 접속 통계, 광고
                제공 과정에서 브라우저 정보, 접속 환경, 쿠키 정보 등이 자동으로
                처리될 수 있습니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-900">
                3. 쿠키 사용
              </h2>
              <p className="mt-4 leading-8">
                본 사이트는 사용자 경험 개선, 접속 분석, 광고 제공을 위해 쿠키를
                사용할 수 있습니다. 사용자는 브라우저 설정을 통해 쿠키 저장을
                거부하거나 삭제할 수 있습니다. 단, 쿠키를 제한할 경우 일부 기능
                또는 광고 표시 방식에 차이가 있을 수 있습니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-900">
                4. Google AdSense 및 광고
              </h2>
              <p className="mt-4 leading-8">
                Haemala는 Google AdSense를 사용할 수 있습니다. Google을 포함한
                제3자 광고 사업자는 사용자의 이전 웹사이트 방문 기록 등을
                바탕으로 맞춤형 광고를 제공하기 위해 쿠키를 사용할 수 있습니다.
                사용자는 Google 광고 설정 페이지 또는 브라우저 설정을 통해
                맞춤형 광고 사용을 관리할 수 있습니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-900">
                5. 개인정보 제3자 제공
              </h2>
              <p className="mt-4 leading-8">
                Haemala는 사용자의 개인정보를 직접 수집하여 제3자에게 판매하거나
                제공하지 않습니다. 다만 광고, 분석, 보안 등 외부 서비스 이용
                과정에서 각 서비스 제공자의 정책에 따라 비식별 정보가 처리될 수
                있습니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-900">
                6. 문의
              </h2>
              <p className="mt-4 leading-8">
                개인정보처리방침 또는 사이트 이용과 관련한 문의가 있는 경우
                운영자에게 연락할 수 있습니다.
              </p>
              <p className="mt-3 rounded-2xl bg-slate-50 p-4 font-bold text-slate-800">
                이메일: contact@haemala.com
              </p>
            </section>
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
          </div>
        </div>
      </section>
    </main>
  );
}