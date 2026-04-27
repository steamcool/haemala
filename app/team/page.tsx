"use client";

import { useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";

type Player = {
  id: string;
  name: string;
};

type Phase = "input" | "result";

const DEFAULT_PLAYERS: Player[] = [
  { id: crypto.randomUUID(), name: "철수" },
  { id: crypto.randomUUID(), name: "영희" },
  { id: crypto.randomUUID(), name: "민수" },
  { id: crypto.randomUUID(), name: "지연" },
];

const TEAM_COLORS = [
  "bg-orange-500",
  "bg-sky-500",
  "bg-violet-500",
];

export default function TeamPage() {
  const captureRef = useRef<HTMLDivElement | null>(null);

  const [players, setPlayers] = useState<Player[]>(DEFAULT_PLAYERS);
  const [teamCount, setTeamCount] = useState(2);
  const [teams, setTeams] = useState<Player[][]>([]);
  const [phase, setPhase] = useState<Phase>("input");
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

  const updatePlayer = (id: string, name: string) => {
    setPlayers((prev) => prev.map((p) => (p.id === id ? { ...p, name } : p)));
  };

  const addPlayer = () => {
    if (players.length >= 18) return;
    setPlayers((prev) => [...prev, { id: crypto.randomUUID(), name: "" }]);
  };

  const removePlayer = (id: string) => {
    if (players.length <= 2) return;
    setPlayers((prev) => prev.filter((p) => p.id !== id));
  };

  const makeTeams = () => {
    const shuffled = [...validPlayers].sort(() => Math.random() - 0.5);
    const nextTeams: Player[][] = Array.from({ length: teamCount }, () => []);

    shuffled.forEach((player, index) => {
      nextTeams[index % teamCount].push(player);
    });

    setTeams(nextTeams);
    setPhase("result");
  };

  const reset = () => {
    setTeams([]);
    setPhase("input");
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
    link.download = "haemala-team-result.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] px-4 py-6 text-slate-950">
      <section className="mx-auto max-w-5xl">
        <header className="mb-6 rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <p className="mb-2 text-sm font-semibold text-orange-600">해말아 게임</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
            팀 나누기
          </h1>
          <p className="mt-3 max-w-2xl text-base font-medium leading-7 text-slate-600">
            모임, 게임, 발표, 회의에서 빠르게 팀을 나누세요. 결과는 팀 카드로 정리됩니다.
          </p>
        </header>

        <div className="grid gap-5 lg:grid-cols-[380px_1fr]">
          <section className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold">인원 입력</h2>
              <button
                onClick={addPlayer}
                disabled={players.length >= 18}
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
                    placeholder={`참가자 ${index + 1}`}
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
              <h2 className="mb-3 text-xl font-bold">팀 수 선택</h2>
              <div className="grid grid-cols-2 gap-3">
                {[2, 3].map((count) => (
                  <button
                    key={count}
                    onClick={() => setTeamCount(count)}
                    className={`h-14 rounded-2xl text-base font-bold transition ${
                      teamCount === count
                        ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {count}팀
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={makeTeams}
              disabled={validPlayers.length < teamCount}
              className="mt-7 h-14 w-full rounded-2xl bg-orange-500 text-lg font-bold text-white shadow-lg shadow-orange-500/20 transition active:scale-[0.98] disabled:opacity-40"
            >
              팀 나누기 시작
            </button>
          </section>

          <section
            ref={captureRef}
            className="relative overflow-hidden rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-7"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">TEAM MAKER</p>
                <h2 className="text-2xl font-bold">결과 보드</h2>
              </div>
              <div className="rounded-full bg-orange-50 px-4 py-2 text-sm font-bold text-orange-600">
                해말아
              </div>
            </div>

            <div className="min-h-[470px] rounded-[24px] bg-slate-50 p-5">
              {phase === "input" ? (
                <div className="flex h-[420px] flex-col items-center justify-center text-center">
                  <div className="rounded-[28px] bg-white p-7 shadow-sm ring-1 ring-slate-200">
                    <p className="text-5xl">👥</p>
                    <h3 className="mt-4 text-2xl font-bold">팀을 나눌 준비 완료</h3>
                    <p className="mt-3 max-w-sm text-sm font-medium leading-6 text-slate-500">
                      이름을 입력하고 팀 수를 고른 뒤 시작하면 자동으로 섞어서 배정합니다.
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-5 rounded-[24px] bg-white p-5 text-center shadow-sm ring-1 ring-orange-200">
                    <p className="text-sm font-bold text-orange-600">팀 나누기 결과</p>
                    <h3 className="mt-1 text-3xl font-bold tracking-tight">
                      {teamCount}개 팀 완성 🎉
                    </h3>
                    <p className="mt-3 text-sm font-medium text-slate-500">
                      참여자: {validPlayers.map((p) => p.name).join(", ")}
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {teams.map((team, index) => (
                      <div
                        key={index}
                        className="overflow-hidden rounded-[24px] bg-white shadow-sm ring-1 ring-slate-200"
                      >
                        <div className={`${TEAM_COLORS[index]} px-5 py-4 text-white`}>
                          <p className="text-sm font-semibold text-white/80">
                            TEAM {index + 1}
                          </p>
                          <h4 className="text-2xl font-bold">
                            {String.fromCharCode(65 + index)}팀
                          </h4>
                        </div>

                        <div className="space-y-2 p-4">
                          {team.map((player) => (
                            <div
                              key={player.id}
                              className="rounded-2xl bg-slate-50 px-4 py-3 text-base font-bold text-slate-800"
                            >
                              {player.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
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