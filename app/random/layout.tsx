import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "랜덤 결정기",
  description:
    "생각이 너무 많을 때 빠르게 판단 과부하를 끊어주는 해말아 랜덤 결정기.",
  alternates: {
    canonical: "/random",
  },
  openGraph: {
    title: "랜덤 결정기 | 해말아",
    description:
      "할까 말까 고민될 때 가볍게 써보는 랜덤 결정 도구.",
    url: "/random",
  },
};

export default function RandomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}