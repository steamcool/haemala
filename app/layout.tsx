import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

const siteUrl = "https://www.haemala.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "해말아 | 할까 말까 고민될 때 결정 성향 테스트",
    template: "%s | 해말아",
  },

  description:
    "할까 말까 고민될 때, 해말아. 결정 성향 테스트, 선택 시뮬레이터, 오늘의 결정운으로 지금 선택을 더 선명하게 확인하세요.",

  keywords: [
    "결정",
    "선택",
    "성향 테스트",
    "MBTI",
    "결정장애",
    "랜덤 선택",
    "오늘의 운세",
  ],

  openGraph: {
    title: "해말아 | 결정이 어려울 때",
    description: "할까 말까 고민될 때, 해말아",
    url: siteUrl,
    siteName: "해말아",
    images: [
      {
        url: `${siteUrl}/og.png`,
        width: 1200,
        height: 630,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-white text-gray-900 antialiased">
        {children}

        {/* ✅ 구글 애드센스 */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3423569278516833"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* ✅ 카카오 SDK */}
        <Script
          src="https://developers.kakao.com/sdk/js/kakao.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}