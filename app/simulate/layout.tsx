import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "선택 시뮬레이터",
  description:
    "고백할까, 연락할까, 살까, 시작할까. 지금 할까 말까를 상황별로 시뮬레이션합니다.",
  alternates: {
    canonical: "/simulate",
  },
  openGraph: {
    title: "선택 시뮬레이터 | 해말아",
    description:
      "지금 선택해도 되는지 해말아 선택 시뮬레이터로 확인하세요.",
    url: "/simulate",
  },
};

export default function SimulateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}