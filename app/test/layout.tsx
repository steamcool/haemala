import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "결정 성향 테스트",
  description:
    "나는 고민 앞에서 돌진형인지, 분석형인지, 직감형인지, 안전형인지 확인하는 해말아 대표 성향테스트.",
  alternates: {
    canonical: "/test",
  },
  openGraph: {
    title: "결정 성향 테스트 | 해말아",
    description:
      "질문을 고를 때마다 성향이 실시간으로 바뀌는 해말아 결정 성향 테스트.",
    url: "/test",
  },
};

export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}