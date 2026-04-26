import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "실시간 결정 성향 테스트",
  description:
    "질문에 답하면서 내 결정 성향이 실시간으로 바뀌는 해말아 핵심 테스트.",
  alternates: {
    canonical: "/test/play",
  },
  openGraph: {
    title: "실시간 결정 성향 테스트 | 해말아",
    description:
      "돌진형, 분석형, 직감형, 안전형 중 나의 결정 패턴을 확인하세요.",
    url: "/test/play",
  },
};

export default function TestPlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}