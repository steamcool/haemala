import type { Metadata } from "next";
import HaemalaApp from "@/components/HaemalaApp";

export const metadata: Metadata = {
  title: "오늘의 로또 번호 추천 | 해말아",
  description: "오늘의 로또 번호를 무료로 생성하고 번호 조합 리포트를 확인하세요.",
};

export default function Page() {
  return <HaemalaApp mode="today" />;
}