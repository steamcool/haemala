"use client";

import { useEffect } from "react";

type AdBoxProps = {
  label?: string;
};

export default function AdBox({ label = "광고" }: AdBoxProps) {
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
          {}
        );
      }
    } catch {
      // 광고 차단기나 승인 전 상태에서는 에러가 날 수 있음
    }
  }, []);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-3 text-center">
      <p className="mb-2 text-xs text-gray-400">{label}</p>

      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-3423569278516833"
        data-ad-slot="1234567890"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}