import type { Metadata, Viewport } from "next";
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
    "해말아",
    "할까 말까",
    "성향테스트",
    "결정 테스트",
    "선택 시뮬레이터",
    "오늘의 운세",
    "랜덤 결정기",
    "심리테스트",
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
    title: "해말아 | 할까 말까 고민될 때 결정 성향 테스트",
    description:
      "결정 성향을 분석하고 지금 선택해도 되는지 시뮬레이션하는 해말아.",
  },
  twitter: {
    card: "summary_large_image",
    title: "해말아 | 할까 말까 고민될 때",
    description:
      "성향테스트와 선택 시뮬레이터로 오늘의 결정을 확인하세요.",
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
      <body>{children}</body>
    </html>
  );
}