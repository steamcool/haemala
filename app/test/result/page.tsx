"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

const results = {
  careful: {
    label: "신중 분석형",
    title: "당신은 납득 가능한 선택을 선호합니다",
    desc: "충분히 비교하고 확인한 뒤 결정하는 편입니다.",
    advice: "기준 3개만 정하고 통과하면 바로 선택하세요.",
  },
  intuitive: {
    label: "직감 추진형",
    title: "당신은 마음이 움직이는 선택에 강합니다",
    desc: "끌림과 감각을 중요하게 보는 타입입니다.",
    advice: "하고 싶은 이유 vs 하지 말아야 할 이유 1개씩만 정리하세요.",
  },
  practical: {
    label: "현실 균형형",
    title: "당신은 손실과 가능성을 함께 봅니다",
    desc: "현실적인 판단과 안정성을 중요하게 생각합니다.",
    advice: "손해보다 후회를 기준으로 선택하세요.",
  },
};

function ResultContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") as keyof typeof results;
  const result = results[type] ?? results.careful;

  // 🔥 애드센스 실행
  useEffect(() => {
    try {
      ((window as any).adsbygoogle =
        (window as any).adsbygoogle || []).push({});
    } catch {}
  }, []);

  function copyLink() {
    navigator.clipboard.writeText(window.location.href);
    alert("링크 복사 완료");
  }

  function shareKakao() {
    const kakao = (window as any).Kakao;

    if (!kakao) {
      alert("카카오 로딩 중. 잠시 후 다시 눌러주세요.");
      return;
    }

    if (!kakao.isInitialized()) {
      kakao.init("여기에_카카오_JS_KEY"); // ← 여기만 바꿔
    }

    kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: `해말아 결과 - ${result.label}`,
        description: result.title,
        imageUrl: "https://www.haemala.com/og.png",
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
    });
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <section className="mx-auto max-w-2xl">

        {/* 🔥 광고 상단 */}
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-3 text-center">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-3423569278516833"
            data-ad-slot="1234567890"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">테스트 결과</p>

          <div className="mt-3 inline-flex rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700">
            {result.label}
          </div>

          <h1 className="mt-5 text-3xl font-bold text-gray-900">
            {result.title}
          </h1>

          <p className="mt-4 text-base text-gray-600">
            {result.desc}
          </p>

          {/* 🔥 광고 중단 */}
          <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-3 text-center">
            <ins
              className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client="ca-pub-3423569278516833"
              data-ad-slot="1234567890"
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          </div>

          <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <p className="text-sm font-semibold text-gray-800">
              오늘의 선택 팁
            </p>
            <p className="mt-2 text-sm text-gray-600">
              {result.advice}
            </p>
          </div>

          {/* 공유 */}
          <div className="mt-8 grid gap-3">
            <button
              onClick={copyLink}
              className="h-12 rounded-2xl border border-gray-200 bg-white text-sm font-semibold text-gray-700"
            >
              링크 복사
            </button>

            <button
              onClick={shareKakao}
              className="h-12 rounded-2xl bg-yellow-400 text-sm font-semibold text-black"
            >
              카카오톡 공유
            </button>
          </div>

          {/* CTA */}
          <div className="mt-8 grid gap-3">
            <Link
              href="/test/play"
              className="flex h-14 items-center justify-center rounded-2xl bg-gray-900 text-white font-semibold"
            >
              다시 테스트
            </Link>

            <Link
              href="/today"
              className="flex h-14 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-700 font-semibold"
            >
              오늘의 결정 다시 보기
            </Link>

            <Link
              href="/"
              className="flex h-14 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-700 font-semibold"
            >
              홈으로
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          결과는 참고용입니다.
        </p>
      </section>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ResultContent />
    </Suspense>
  );
}