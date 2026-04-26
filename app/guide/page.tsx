import Link from "next/link";

export const metadata = {
  title: "이용 가이드 | Haemala",
  description:
    "Haemala의 랜덤 추천, 꿈 기반 번호 추천, 오늘의 선택 기능을 안전하고 올바르게 이용하는 방법을 안내합니다.",
};

export default function GuidePage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] px-5 py-10 text-slate-900">
      <section className="mx-auto max-w-5xl">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm md:p-12">
          <p className="mb-3 text-sm font-bold text-indigo-600">
            HAEMALA GUIDE
          </p>

          <h1 className="text-3xl font-black tracking-tight md:text-5xl">
            Haemala 이용 가이드
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Haemala는 랜덤 추천과 가벼운 해석 콘텐츠를 제공하는 도구형
            서비스입니다. 결과는 재미와 참고 목적이며, 실제 확률을 보장하거나
            특정 결과를 예측하지 않습니다.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <GuideCard
              title="랜덤 추천"
              text="무작위성을 기반으로 사용자가 즉시 확인할 수 있는 결과를 제공합니다."
            />
            <GuideCard
              title="꿈 기반 번호"
              text="꿈의 분위기와 상징을 참고해 오락용 번호 조합을 구성합니다."
            />
            <GuideCard
              title="오늘의 선택"
              text="가볍게 방향을 정하고 싶을 때 참고할 수 있는 선택형 콘텐츠입니다."
            />
          </div>

          <div className="mt-12 space-y-10">
            <section className="rounded-3xl border border-slate-200 bg-slate-50 p-7">
              <h2 className="text-2xl font-black">1. 랜덤 결과의 의미</h2>
              <p className="mt-4 leading-8 text-slate-700">
                Haemala의 랜덤 결과는 특정 미래를 예측하기 위한 것이 아니라,
                사용자가 짧은 시간 안에 새로운 관점이나 선택지를 확인할 수 있도록
                돕는 참고용 콘텐츠입니다. 같은 기능을 여러 번 사용하면 다른 결과가
                나올 수 있으며, 이는 서비스의 오류가 아니라 랜덤 기반 도구의
                자연스러운 특성입니다.
              </p>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-slate-50 p-7">
              <h2 className="text-2xl font-black">2. 꿈 해석과 번호 추천</h2>
              <p className="mt-4 leading-8 text-slate-700">
                꿈 기반 추천 기능은 꿈에 등장한 분위기, 사물, 감정, 상황을
                상징적으로 해석하는 방식의 콘텐츠입니다. 예를 들어 물, 불, 길,
                동물, 사람, 장소 같은 요소는 전통적 해석이나 일반적인 이미지에
                따라 서로 다른 의미로 설명될 수 있습니다. 다만 이 해석은
                과학적으로 검증된 예측이 아니며, 번호 추천 역시 당첨을 보장하지
                않습니다.
              </p>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-slate-50 p-7">
              <h2 className="text-2xl font-black">3. 확률과 패턴의 차이</h2>
              <p className="mt-4 leading-8 text-slate-700">
                로또나 랜덤 번호는 본질적으로 확률의 영역에 있습니다. 과거에 자주
                나온 숫자, 최근에 덜 나온 숫자, 보기 좋은 배열은 사용자가 번호를
                선택할 때 참고할 수는 있지만, 다음 결과를 확정적으로 예측하지는
                못합니다. Haemala는 이러한 한계를 명확히 전제로 하며, 결과를
                오락적 참고 자료로 제공합니다.
              </p>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-slate-900 p-7 text-white">
              <h2 className="text-2xl font-black">안전한 이용 원칙</h2>
              <ul className="mt-5 space-y-3 text-slate-300">
                <li>• 결과를 절대적인 판단 기준으로 사용하지 마세요.</li>
                <li>• 금전적 결정은 본인의 책임 아래 신중하게 판단하세요.</li>
                <li>• 같은 기능을 반복 실행하면 다른 결과가 나올 수 있습니다.</li>
                <li>• Haemala는 예측 보장 서비스가 아닌 참고용 콘텐츠 서비스입니다.</li>
              </ul>
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
              href="/random"
              className="rounded-full border border-slate-300 px-6 py-3 text-sm font-bold text-slate-700"
            >
              랜덤 기능 사용
            </Link>
            <Link
              href="/dream-lotto"
              className="rounded-full border border-slate-300 px-6 py-3 text-sm font-bold text-slate-700"
            >
              꿈 번호 보기
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function GuideCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-lg font-black">{title}</p>
      <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}