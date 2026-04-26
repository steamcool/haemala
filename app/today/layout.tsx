import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "오늘의 결정운",
  description:
    "오늘 해도 되는 선택과 말아야 하는 선택을 확인하는 해말아 오늘의 결정운.",
  alternates: {
    canonical: "/today",
  },
  openGraph: {
    title: "오늘의 결정운 | 해말아",
    description:
      "오늘은 해도 될까 말아야 할까. 해말아 오늘의 결정운으로 확인하세요.",
    url: "/today",
  },
};

export default function TodayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}