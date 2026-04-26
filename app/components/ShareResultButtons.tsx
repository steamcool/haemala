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
  const [status, setStatus] = useState("");

  async function saveImage() {
    const target = document.getElementById(targetId);

    if (!target) {
      setStatus("결과 카드를 찾지 못했습니다.");
      return;
    }

    setStatus("이미지 생성 중...");

    const canvas = await html2canvas(target, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
    });

    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = `${fileName}.png`;
    link.click();

    setStatus("이미지 저장 완료");
  }

  async function shareResult() {
    const url = window.location.href;
    const text = `${shareText}\n${url}`;

    if (navigator.share) {
      await navigator.share({
        title: "해말아 번호 리포트",
        text,
        url,
      });
      setStatus("공유 완료");
      return;
    }

    await navigator.clipboard.writeText(text);
    setStatus("공유 문구 복사 완료");
  }

  return (
    <div className="mt-4 grid gap-3 sm:grid-cols-2">
      <button
        onClick={saveImage}
        className="rounded-full bg-[#1d1d1f] px-7 py-4 text-base font-bold text-white transition hover:-translate-y-0.5"
      >
        이미지 저장
      </button>

      <button
        onClick={shareResult}
        className="rounded-full bg-white px-7 py-4 text-base font-bold text-black ring-1 ring-black/10 transition hover:-translate-y-0.5"
      >
        결과 공유
      </button>

      {status && (
        <p className="text-center text-xs font-bold text-neutral-400 sm:col-span-2">
          {status}
        </p>
      )}
    </div>
  );
}