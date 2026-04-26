import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "꿈 로또 번호 추천",
  description:
    "꿈 내용을 입력하면 꿈 상징을 가볍게 해석하고 재미용 로또 번호를 추천하는 해말아 꿈 로또.",
  alternates: {
    canonical: "/dream-lotto",
  },
  openGraph: {
    title: "꿈 로또 번호 추천 | 해말아",
    description:
      "돼지꿈, 물꿈, 불꿈, 뱀꿈 등 꿈 키워드 기반 재미용 번호 추천.",
    url: "/dream-lotto",
  },
};

export default function DreamLottoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}