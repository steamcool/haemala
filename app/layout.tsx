import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "해말아 | 모였을 때 바로 쓰는 내기 게임",
  description:
    "사다리, 룰렛, 랜덤 뽑기, 팀 나누기를 바로 사용할 수 있는 해말아 게임 사이트",
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
      <body>{children}</body>
    </html>
  );
}