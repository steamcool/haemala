"use client";

import { useState } from "react";
import html2canvas from "html2canvas";

type ShareResultButtonsProps = {
  targetId: string;
  fileName: string;
  shareText: string;
};

export default function ShareResultButtons({
  targetId,
  fileName,
  shareText,
}: ShareResultButtonsProps) {
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "copied">(
    "idle"
  );

  async function saveImage() {
    const target = document.getElementById(targetId);
    if (!target) return;

    try {
      setStatus("saving");

      const canvas = await html2canvas(target, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
      });

      const link = document.createElement("a");
      link.download = `${fileName}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();

      setStatus("saved");
      window.setTimeout(() => setStatus("idle"), 1600);
    } catch {
      setStatus("idle");
    }
  }

  async function shareOrCopy() {
    const url = window.location.href;
    const text = `${shareText}\n\n${url}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "해말아 번호 리포트",
          text,
          url,
        });
        return;
      }

      await navigator.clipboard.writeText(text);
      setStatus("copied");
      window.setTimeout(() => setStatus("idle"), 1600);
    } catch {
      setStatus("idle");
    }
  }

  return (
    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      <button
        type="button"
        onClick={saveImage}
        disabled={status === "saving"}
        className="rounded-full border border-black/10 bg-black px-7 py-4 text-base font-black text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "saving"
          ? "이미지 생성 중..."
          : status === "saved"
            ? "이미지 저장 완료"
            : "결과 이미지 저장"}
      </button>

      <button
        type="button"
        onClick={shareOrCopy}
        className="rounded-full bg-black/5 px-7 py-4 text-base font-black text-black transition hover:-translate-y-0.5"
      >
        {status === "copied" ? "공유 문구 복사 완료" : "결과 공유하기"}
      </button>
    </div>
  );
}