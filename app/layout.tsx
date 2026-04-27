import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "해말아 (haemala.) | 안전한 AI 프롬프트 세탁소",
  description: "AI에게 질문하기 불안하시죠? 100% 로컬에서 작동하는 개인정보 마스킹 서비스 '해말아'로 안심하고 질문하세요. 데이터는 브라우저를 떠나지 않습니다.",
  keywords: ["AI 보안", "개인정보 마스킹", "프롬프트 익명화", "챗GPT 보안", "해말아", "haemala"],
  authors: [{ name: "haemala Team" }],
  viewport: "width=device-width, initial-scale=1",
  // 카카오톡, 페이스북 공유 설정 (Open Graph)
  openGraph: {
    title: "해말아 (haemala.) | 안전한 AI 프롬프트 세탁소",
    description: "데이터 유출 걱정 끝! 내 브라우저에서 직접 지우는 개인정보 세탁기",
    url: "https://haemala.com",
    siteName: "해말아",
    locale: "ko_KR",
    type: "website",
  },
  // 트위터 공유 설정
  twitter: {
    card: "summary_large_image",
    title: "해말아 (haemala.)",
    description: "가장 안전한 AI 프롬프트 익명화 서비스",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}