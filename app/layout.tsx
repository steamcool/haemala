import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://www.haemala.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "해말아 | MBTI + AI 시대 적합도 테스트",
    template: "%s | 해말아",
  },
  description:
    "MBTI 성향과 AI 활용 적합도를 함께 분석하는 96문항 인터랙션 테스트입니다.",
  keywords: [
    "해말아",
    "MBTI",
    "AI 테스트",
    "AI 적합도",
    "AIQ",
    "성향테스트",
    "심리테스트",
    "AI 시대",
  ],
  authors: [{ name: "Haemala" }],
  creator: "Haemala",
  publisher: "Haemala",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    siteName: "해말아",
    title: "해말아 | MBTI + AI 시대 적합도 테스트",
    description:
      "MBTI 성향, AI 활용 적합도, 그리고 두 결과를 섞은 AI 시대 캐릭터를 확인하세요.",
  },
  twitter: {
    card: "summary_large_image",
    title: "해말아 | MBTI + AI 시대 적합도 테스트",
    description:
      "96문항으로 확인하는 MBTI 성향 + AI 시대 적합도 테스트.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f3ec",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://hangeul.pstatic.net/hangeul_static/css/nanum-square-neo.css"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}