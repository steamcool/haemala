import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.haemala.com"),
  title: {
    default: "해말아 | 무료 로또 번호 추천",
    template: "%s",
  },
  description:
    "꿈 해몽 로또 번호, 오늘의 로또 번호, 무료 로또 번호 생성기를 제공하는 운세형 번호 리포트 서비스입니다.",
  keywords: [
    "로또 번호 추천",
    "무료 로또 번호 생성기",
    "꿈 해몽 로또",
    "오늘의 로또 번호",
    "로또 번호 자동 생성",
    "해말아",
  ],
  openGraph: {
    title: "해말아 | 무료 로또 번호 추천",
    description: "꿈을 로또 번호로 번역하는 무료 번호 리포트 서비스",
    url: "https://www.haemala.com",
    siteName: "해말아",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3423569278516833"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}