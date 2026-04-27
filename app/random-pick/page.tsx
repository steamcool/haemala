"use client";

import { useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";

type Player = {
  id: string;
  name: string;
};

type Card = {
  id: string;
  name: string;
  isEmpty?: boolean;
};

type Phase = "input" | "drawing" | "result";

const DEFAULT_PLAYERS: Player[] = [
  { id: crypto.randomUUID(), name: "철수" },
  { id: crypto.randomUUID(), name: "영희" },
  { id: crypto.randomUUID(), name: "민수" },
  { id: crypto.randomUUID(), name: "지연" },
];

export default function RandomPickPage() {
  const captureRef = useRef<HTMLDivElement | null>(null);

  const [players, setPlayers] = useState<Player[]>(DEFAULT_PLAYERS);
  const [pickCount, setPickCount] = useState(1);
  const [phase, setPhase] = useState<Phase>("input");
  const [picked, setPicked] = useState<Player[]>([]);
  const [copied, setCopied] = useState(false);

  const validPlayers = useMemo(
    () =>
      players.map((p, i) => ({
        ...p,
        name: p.name.trim() || `참가자 ${i + 1}`,
      })),
    [players]
  );

  const cards: Card[] = useMemo(() => {
    if (phase === "result") {
      return picked.map((p) => ({
        id: p.id,
        name: p.name,
      }));
    }

    return Array.from({ length: pickCount }, (_, i) => ({
      id: `empty-${i}`,
      name: "",
      isEmpty: true,
    }));
  }, [phase, picked, pickCount]);

  const updatePlayer = (id: string, name: string) => {
    setPlayers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, name } : p))
    );
  };

  const addPlayer = () => {
    if (players.length >= 12) return;
    setPlayers((prev) => [...prev, { id: crypto.randomUUID(), name: "" }]);
  };

  const removePlayer = (id: string) => {
    if (players.length <= 2) return;
    setPlayers((prev) => prev.filter((p) => p.id !== id));
  };

  const draw = () => {
    if (validPlayers.length < 2) return;

    const count = Math.min(pickCount, validPlayers.length);
    const shuffled = [...validPlayers].sort(() => Math.random() - 0.5);

    setPhase("drawing");
    setPicked([]);

    setTimeout(() => {
      setPicked(shuffled.slice(0, count));
      setPhase("result");
    }, 1500);
  };

  const reset = () => {
    setPhase("input");
    setPicked([]);
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
    link.download = "haemala-random.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] px-4 py-6 text-slate-950">
      <section className="mx-auto max-w-5xl">
        {/* 헤더 */}
        <header className="mb-6 rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm font-semibold text-orange-600">해말아</p>
          <h1 className="mt-2 text-3xl font-bold sm:text-5xl">
            랜덤 뽑기
          </h1>
        </header>

        <div className="grid gap-5 lg:grid-cols-[380px_1fr]">
          {/* 입력 */}
          <section className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="mb-4 flex justify-between">
              <h2 className="text-lg font-bold">참가자</h2>
              <button
                onClick={addPlayer}
                className="text-sm font-bold text-orange-600"
              >
                + 추가
              </button>
            </div>

            <div className="space-y-2">
              {players.map((p) => (
                <div key={p.id} className="flex gap-2">
                  <input
                    value={p.name}
                    onChange={(e) => updatePlayer(p.id, e.target.value)}
                    className="h-11 flex-1 rounded-xl border px-3"
                  />
                  <button onClick={() => removePlayer(p.id)}>X</button>
                </div>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2">
              {[1, 2].map((n) => (
                <button
                  key={n}
                  onClick={() => setPickCount(n)}
                  className={`h-12 rounded-xl ${
                    pickCount === n ? "bg-orange-500 text-white" : "bg-gray-100"
                  }`}
                >
                  {n}명
                </button>
              ))}
            </div>

            <button
              onClick={draw}
              className="mt-5 h-12 w-full rounded-xl bg-orange-500 text-white font-bold"
            >
              뽑기 시작
            </button>
          </section>

          {/* 결과 */}
          <section
            ref={captureRef}
            className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-slate-200"
          >
            <div className="grid grid-cols-2 gap-4">
              {cards.map((card) => (
                <div key={card.id} className="h-56 [perspective:1000px]">
                  <div
                    className={`relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] ${
                      phase === "result" ? "[transform:rotateY(180deg)]" : ""
                    }`}
                  >
                    {/* 앞면 */}
                    <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-slate-900 text-white [backface-visibility:hidden]">
                      ?
                    </div>

                    {/* 뒷면 */}
                    <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-orange-500 text-white [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      {card.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-2">
              <button onClick={reset} className="bg-gray-100 h-11 rounded-xl">
                다시
              </button>
              <button onClick={captureImage} className="bg-gray-100 h-11 rounded-xl">
                저장
              </button>
              <button onClick={copyLink} className="bg-black text-white h-11 rounded-xl">
                {copied ? "복사됨" : "공유"}
              </button>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}