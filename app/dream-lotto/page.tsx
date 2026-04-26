import type { Metadata } from "next";
import HaemalaApp from "@/components/HaemalaApp";

export const metadata: Metadata = {
  title: "꿈 해몽 로또 번호 추천 | 해말아",
  description: "꿈 내용을 입력하면 꿈 해몽 기반 로또 번호 리포트를 무료로 생성합니다.",
};

export default function Page() {
  return <HaemalaApp mode="dream" />;
}