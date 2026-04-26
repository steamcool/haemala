import type { Metadata } from "next";
import HaemalaApp from "@/components/HaemalaApp";

export const metadata: Metadata = {
  title: "무료 로또 번호 생성기 | 해말아",
  description: "무료 로또 번호 생성기로 번호 5조합과 보너스 후보를 바로 확인하세요.",
};

export default function Page() {
  return <HaemalaApp mode="random" />;
}