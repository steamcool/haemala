"use client";

import { useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";

type Item = {
  id: string;
  label: string;
};

type Phase = "idle" | "spinning" | "result";

const DEFAULT_ITEMS: Item[] = [
  { id: crypto.randomUUID(), label: "철수" },
  { id: crypto.randomUUID(), label: "영희" },
  { id: crypto.randomUUID(), label: "민수" },
  { id: crypto.randomUUID(), label: "지연" },
];

const COLORS = [
  "#fb923c",
  "#38bdf8",
  "#a78bfa",
  "#34d399",
  "#f472b6",
  "#facc15",
  "#60a5fa",
  "#f87171",
];

export default function RoulettePage() {
  const captureRef = useRef<HTMLDivElement | null>(null);

  const [items, setItems] = useState<Item[]>(DEFAULT_ITEMS);
  const [phase, setPhase] = useState<Phase>("idle");
  const [rotation, setRotation] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const validItems = useMemo(
    () =>
      items
        .map((item, index) => ({
          ...item,
          label: item.label.trim() || `항목 ${index + 1}`,
        }))
        .filter((item) => item.label.length > 0),
    [items]
  );

  const selected = selectedIndex !== null ? validItems[selectedIndex] : null;

  const gradient = useMemo(() => {
    const count = validItems.length || 1;
    const angle = 360 / count;

    return validItems
      .map((_, index) => {
        const start = index * angle;
        const end = (index + 1) * angle;
        return `${COLORS[index % COLORS.length]} ${start}deg ${end}deg`;
      })
      .join(", ");
  }, [validItems]);

  const addItem = () => {
    if (items.length >= 10) return;
    setItems((prev) => [
      ...prev,
      { id: crypto.randomUUID(), label: `항목 ${prev.length + 1}` },
    ]);
  };

  const updateItem = (id: string, label: string) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, label } : item)));
  };

  const removeItem = (id: string) => {
    if (items.length <= 2) return;
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const spin = () => {
    if (validItems.length < 2 || phase === "spinning") return;

    const picked = Math.floor(Math.random() * validItems.length);
    const slice = 360 / validItems.length;
    const targetAngle = 360 - (picked * slice + slice / 2);
    const extraTurns = 360 * 7;
    const finalRotation = rotation + extraTurns + targetAngle;

    setSelectedIndex(null);
    setPhase("spinning");
    setRotation(finalRotation);

    setTimeout(() => {
      setSelectedIndex(picked);
      setPhase("result");
    }, 4200);
  };

  const reset = () => {
    setPhase("idle");
    setSelectedIndex(null);
    setRotation(0);
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  const captureImage = async () => {
    if (!captureRef.current) return;

    const canvas = await html2canvas(captureRef.current, {
      backgroundColor: "#ffffff",
      scale: 2,
    });

    const link = document.createElement("a");
    link.download = "haemala-roulette-result.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] px-4 py-6 text-slate-950">
      <section className="mx-auto max-w-5xl">
        <header className="mb-6 rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <p className="mb-2 text-sm font-semibold text-orange-600">해말아 게임</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
            룰렛 돌리기
          </h1>
          <p className="mt-3 max-w-2xl text-base font-medium leading-7 text-slate-600">
            메뉴, 벌칙, 당첨자, 역할을 빠르게 정하세요. 입력하면 룰렛이 즉시 바뀝니다.
          </p>
        </header>

        <div className="grid gap-5 lg:grid-cols-[380px_1fr]">
          <section className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold">항목 입력</h2>
              <button
                onClick={addItem}
                disabled={items.length >= 10}
                className="rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white disabled:opacity-30"
              >
                추가
              </button>
            </div>

            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={item.id} className="flex gap-2">
                  <div
                    className="mt-3 h-5 w-5 shrink-0 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <input
                    value={item.label}
                    onChange={(e) => updateItem(item.id, e.target.value)}
                    placeholder={`항목 ${index + 1}`}
                    className="h-12 flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-base font-medium outline-none transition focus:border-orange-500 focus:bg-white"
                  />
                  <button
                    onClick={() => removeItem(item.id)}
                    disabled={items.length <= 2}
                    className="h-12 w-12 rounded-2xl border border-slate-200 text-sm font-bold text-slate-500 disabled:opacity-30"
                  >
                    삭제
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={spin}
              disabled={phase === "spinning"}
              className="mt-7 h-14 w-full rounded-2xl bg-orange-500 text-lg font-bold text-white shadow-lg shadow-orange-500/20 transition active:scale-[0.98] disabled:opacity-60"
            >
              {phase === "spinning" ? "돌아가는 중..." : "룰렛 돌리기"}
            </button>

            <div className="mt-5 rounded-2xl bg-orange-50 p-4">
              <p className="text-sm font-semibold leading-6 text-orange-700">
                팁: 밥값 내기, 벌칙 정하기, 발표 순서, 메뉴 고르기에 바로 쓸 수 있다.
              </p>
            </div>
          </section>

          <section
            ref={captureRef}
            className="relative overflow-hidden rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-7"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">ROULETTE</p>
                <h2 className="text-2xl font-bold">결과 보드</h2>
              </div>
              <div className="rounded-full bg-orange-50 px-4 py-2 text-sm font-bold text-orange-600">
                해말아
              </div>
            </div>

            <div className="flex min-h-[470px] flex-col items-center justify-center rounded-[24px] bg-slate-50 p-5">
              <div className="relative flex h-[310px] w-[310px] items-center justify-center sm:h-[390px] sm:w-[390px]">
                <div className="absolute -top-2 z-20 h-0 w-0 border-l-[16px] border-r-[16px] border-t-[30px] border-l-transparent border-r-transparent border-t-slate-950" />

                <div
                  className="relative h-full w-full rounded-full shadow-xl ring-8 ring-white transition-transform duration-[4200ms] ease-[cubic-bezier(0.12,0.82,0.18,1)]"
                  style={{
                    background: `conic-gradient(${gradient})`,
                    transform: `rotate(${rotation}deg)`,
                  }}
                >
                  <div className="absolute inset-[42%] rounded-full bg-white shadow-md" />

                  {validItems.map((item, index) => {
                    const angle = (360 / validItems.length) * index + 360 / validItems.length / 2;
                    const isSelected = selectedIndex === index;

                    return (
                      <div
                        key={item.id}
                        className={`absolute left-1/2 top-1/2 origin-left text-xs font-bold text-white drop-shadow transition ${
                          phase === "result" && !isSelected ? "opacity-30" : "opacity-100"
                        }`}
                        style={{
                          transform: `rotate(${angle}deg) translateX(72px) rotate(90deg)`,
                        }}
                      >
                        <span className="block max-w-[88px] truncate sm:max-w-[110px]">
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {selected && phase === "result" && (
                <div className="mt-7 w-full max-w-md rounded-[24px] bg-white p-5 text-center shadow-sm ring-1 ring-orange-200">
                  <p className="text-sm font-bold text-orange-600">선택 결과</p>
                  <h3 className="mt-1 text-3xl font-bold tracking-tight">
                    {selected.label} 🎉
                  </h3>
                  <p className="mt-3 text-sm font-medium text-slate-500">
                    후보: {validItems.map((item) => item.label).join(", ")}
                  </p>
                </div>
              )}
            </div>

            <div className="sticky bottom-4 mt-5 grid grid-cols-3 gap-2 rounded-[22px] bg-white/90 p-2 shadow-lg ring-1 ring-slate-200 backdrop-blur">
              <button
                onClick={reset}
                className="h-12 rounded-2xl bg-slate-100 text-sm font-bold text-slate-800"
              >
                다시하기
              </button>
              <button
                onClick={captureImage}
                disabled={phase !== "result"}
                className="h-12 rounded-2xl bg-slate-100 text-sm font-bold text-slate-800 disabled:opacity-40"
              >
                이미지 저장
              </button>
              <button
                onClick={copyLink}
                className="h-12 rounded-2xl bg-slate-950 text-sm font-bold text-white"
              >
                {copied ? "복사됨" : "링크 복사"}
              </button>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}