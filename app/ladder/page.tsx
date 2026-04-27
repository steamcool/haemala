"use client";

import { useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";

type Player = {
  id: string;
  name: string;
};

type Phase = "input" | "playing" | "result";

const DEFAULT_PLAYERS: Player[] = [
  { id: crypto.randomUUID(), name: "" },
  { id: crypto.randomUUID(), name: "" },
];

const DEFAULT_RESULTS = ["당첨", "꽝", "벌칙", "면제"];

export default function LadderPage() {
  const captureRef = useRef<HTMLDivElement | null>(null);

  const [players, setPlayers] = useState<Player[]>(DEFAULT_PLAYERS);
  const [results, setResults] = useState<string[]>(["당첨", "꽝"]);
  const [phase, setPhase] = useState<Phase>("input");
  const [winnerIndex, setWinnerIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const validPlayers = useMemo(
    () =>
      players
        .map((p, index) => ({
          ...p,
          name: p.name.trim() || `참가자 ${index + 1}`,
        }))
        .filter((p) => p.name.length > 0),
    [players]
  );

  const normalizedResults = useMemo(() => {
    return validPlayers.map((_, index) => {
      return results[index]?.trim() || DEFAULT_RESULTS[index % DEFAULT_RESULTS.length];
    });
  }, [validPlayers, results]);

  const winner =
    winnerIndex !== null
      ? {
          player: validPlayers[winnerIndex],
          result: normalizedResults[winnerIndex],
        }
      : null;

  const updatePlayer = (id: string, name: string) => {
    setPlayers((prev) => prev.map((p) => (p.id === id ? { ...p, name } : p)));
  };

  const addPlayer = () => {
    if (players.length >= 8) return;
    setPlayers((prev) => [...prev, { id: crypto.randomUUID(), name: "" }]);
    setResults((prev) => [...prev, DEFAULT_RESULTS[prev.length % DEFAULT_RESULTS.length]]);
  };

  const removePlayer = (id: string) => {
    if (players.length <= 2) return;
    const index = players.findIndex((p) => p.id === id);
    setPlayers((prev) => prev.filter((p) => p.id !== id));
    setResults((prev) => prev.filter((_, i) => i !== index));
  };

  const updateResult = (index: number, value: string) => {
    setResults((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const startGame = () => {
    if (validPlayers.length < 2) return;

    setPhase("playing");
    setWinnerIndex(null);

    const picked = Math.floor(Math.random() * validPlayers.length);

    setTimeout(() => {
      setWinnerIndex(picked);
      setPhase("result");
    }, 3400);
  };

  const resetGame = () => {
    setPhase("input");
    setWinnerIndex(null);
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
    link.download = "haemala-ladder-result.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] px-4 py-6 text-slate-950">
      <section className="mx-auto max-w-5xl">
        <header className="mb-6 rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <p className="mb-2 text-sm font-semibold text-orange-600">해말아 게임</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
            사다리 타기
          </h1>
          <p className="mt-3 max-w-2xl text-base font-medium leading-7 text-slate-600">
            밥값, 벌칙, 당첨자를 빠르게 정하세요. 입력은 짧게, 결과는 강하게 보여줍니다.
          </p>
        </header>

        <div className="grid gap-5 lg:grid-cols-[380px_1fr]">
          <section className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold">참가자</h2>
              <button
                onClick={addPlayer}
                disabled={players.length >= 8}
                className="rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white disabled:opacity-30"
              >
                추가
              </button>
            </div>

            <div className="space-y-3">
              {players.map((player, index) => (
                <div key={player.id} className="flex gap-2">
                  <input
                    value={player.name}
                    onChange={(e) => updatePlayer(player.id, e.target.value)}
                    placeholder={index === 0 ? "철수" : index === 1 ? "영희" : `참가자 ${index + 1}`}
                    className="h-12 flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-base font-medium outline-none transition focus:border-orange-500 focus:bg-white"
                  />
                  <button
                    onClick={() => removePlayer(player.id)}
                    disabled={players.length <= 2}
                    className="h-12 w-12 rounded-2xl border border-slate-200 text-sm font-bold text-slate-500 disabled:opacity-30"
                  >
                    삭제
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-7">
              <h2 className="mb-3 text-xl font-bold">결과</h2>
              <div className="space-y-3">
                {players.map((_, index) => (
                  <input
                    key={index}
                    value={results[index] ?? ""}
                    onChange={(e) => updateResult(index, e.target.value)}
                    placeholder={DEFAULT_RESULTS[index % DEFAULT_RESULTS.length]}
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-base font-medium outline-none transition focus:border-orange-500 focus:bg-white"
                  />
                ))}
              </div>
            </div>

            <button
              onClick={startGame}
              className="mt-7 h-14 w-full rounded-2xl bg-orange-500 text-lg font-bold text-white shadow-lg shadow-orange-500/20 transition active:scale-[0.98]"
            >
              사다리 타기 시작
            </button>
          </section>

          <section
            ref={captureRef}
            className="relative overflow-hidden rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-7"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">LADDER GAME</p>
                <h2 className="text-2xl font-bold">결과 보드</h2>
              </div>
              <div className="rounded-full bg-orange-50 px-4 py-2 text-sm font-bold text-orange-600">
                해말아
              </div>
            </div>

            <div className="relative min-h-[420px] rounded-[24px] bg-slate-50 p-4 sm:p-6">
              <div className="grid h-[330px] gap-3" style={{ gridTemplateColumns: `repeat(${validPlayers.length}, 1fr)` }}>
                {validPlayers.map((player, index) => {
                  const isWinner = winnerIndex === index;
                  const isDimmed = phase === "result" && !isWinner;

                  return (
                    <div
                      key={player.id}
                      className={`relative flex flex-col items-center justify-between transition duration-500 ${
                        isDimmed ? "opacity-25 blur-[1px]" : "opacity-100"
                      }`}
                    >
                      <div className="z-10 w-full rounded-2xl bg-white px-2 py-3 text-center shadow-sm ring-1 ring-slate-200">
                        <p className="truncate text-sm font-bold sm:text-base">{player.name}</p>
                      </div>

                      <div className="absolute top-14 h-[220px] w-[3px] overflow-hidden rounded-full bg-slate-300">
                        {phase === "playing" && (
                          <div
                            className="absolute left-0 top-0 h-20 w-full animate-[ladderFlow_0.75s_linear_infinite] rounded-full bg-orange-500"
                          />
                        )}
                      </div>

                      {index < validPlayers.length - 1 && (
                        <>
                          <div className="absolute left-1/2 top-[115px] h-[3px] w-full rounded-full bg-slate-300" />
                          <div className="absolute left-1/2 top-[205px] h-[3px] w-full rounded-full bg-slate-300" />
                        </>
                      )}

                      <div
                        className={`z-10 w-full rounded-2xl px-2 py-3 text-center shadow-sm ring-1 transition ${
                          isWinner
                            ? "scale-110 bg-orange-500 text-white ring-orange-500"
                            : "bg-white text-slate-700 ring-slate-200"
                        }`}
                      >
                        <p className="truncate text-sm font-bold sm:text-base">
                          {normalizedResults[index]}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {phase === "playing" && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/35 backdrop-blur-[1px]">
                  <div className="rounded-full bg-slate-950 px-6 py-3 text-base font-bold text-white shadow-xl">
                    내려가는 중...
                  </div>
                </div>
              )}

              {winner && phase === "result" && (
                <div className="mt-5 rounded-[24px] bg-white p-5 text-center shadow-sm ring-1 ring-orange-200">
                  <p className="text-sm font-bold text-orange-600">결과</p>
                  <h3 className="mt-1 text-3xl font-bold tracking-tight">
                    {winner.player.name} {winner.result} 🎉
                  </h3>
                  <p className="mt-3 text-sm font-medium text-slate-500">
                    참여자: {validPlayers.map((p) => p.name).join(", ")}
                  </p>
                </div>
              )}
            </div>

            <div className="sticky bottom-4 mt-5 grid grid-cols-3 gap-2 rounded-[22px] bg-white/90 p-2 shadow-lg ring-1 ring-slate-200 backdrop-blur">
              <button
                onClick={resetGame}
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

      <style jsx global>{`
        @keyframes ladderFlow {
          0% {
            transform: translateY(-90px);
          }
          100% {
            transform: translateY(260px);
          }
        }
      `}</style>
    </main>
  );
}