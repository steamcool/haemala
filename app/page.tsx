"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Mode = "balanced" | "weak" | "cram" | "past" | "memory";
type FocusPreset = "25-5" | "40-10" | "50-10";
type RoundStatus = "ready" | "running" | "done" | "skipped";

type Subject = {
  id: string;
  name: string;
};

type Round = {
  id: number;
  subject: string;
  task: string;
  minutes: number;
  status: RoundStatus;
};

const DEFAULT_SUBJECTS: Subject[] = [
  { id: "korean", name: "국어" },
  { id: "english", name: "영어" },
  { id: "math", name: "수학" },
  { id: "science", name: "과학" },
  { id: "history", name: "한국사" },
  { id: "network", name: "네트워크" },
  { id: "db", name: "데이터베이스" },
  { id: "security", name: "보안" },
  { id: "os", name: "운영체제" },
  { id: "cert", name: "자격증" },
];

const MODE_LABEL: Record<Mode, string> = {
  balanced: "균형 회독",
  weak: "약점 집중",
  cram: "벼락치기",
  past: "기출 풀이",
  memory: "암기 회독",
};

const TASKS: Record<Mode, string[]> = {
  balanced: ["개념 정리", "예제 풀이", "요약 복습", "핵심 체크"],
  weak: ["약점 개념 보완", "틀린 문제 재풀이", "핵심 암기", "오답 정리"],
  cram: ["빈출 개념 압축", "기출 훑기", "암기 포인트 체크", "마지막 요약"],
  past: ["기출 풀이", "오답 분석", "선지 비교", "유형 정리"],
  memory: ["암기", "백지 복습", "키워드 회독", "짧은 테스트"],
};

const PRESET: Record<FocusPreset, { focus: number; rest: number; label: string }> = {
  "25-5": { focus: 25, rest: 5, label: "25분 집중 + 5분 휴식" },
  "40-10": { focus: 40, rest: 10, label: "40분 집중 + 10분 휴식" },
  "50-10": { focus: 50, rest: 10, label: "50분 집중 + 10분 휴식" },
};

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function formatTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${pad(m)}:${pad(s)}`;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function Page() {
  const [studyHours, setStudyHours] = useState(3);
  const [mode, setMode] = useState<Mode>("balanced");
  const [preset, setPreset] = useState<FocusPreset>("25-5");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([
    "네트워크",
    "데이터베이스",
    "보안",
  ]);
  const [weakSubject, setWeakSubject] = useState("네트워크");
  const [customSubject, setCustomSubject] = useState("");

  const [rounds, setRounds] = useState<Round[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(PRESET["25-5"].focus * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [started, setStarted] = useState(false);
  const [copied, setCopied] = useState(false);

  const timerRef = useRef<number | null>(null);

  const focusMinutes = PRESET[preset].focus;
  const restMinutes = PRESET[preset].rest;

  const totalRounds = useMemo(() => {
    const totalMinutes = studyHours * 60;
    return clamp(Math.floor(totalMinutes / focusMinutes), 1, 16);
  }, [studyHours, focusMinutes]);

  const doneCount = rounds.filter((r) => r.status === "done").length;
  const skippedCount = rounds.filter((r) => r.status === "skipped").length;
  const progressPercent = rounds.length ? Math.round((doneCount / rounds.length) * 100) : 0;
  const realStudyMinutes = doneCount * focusMinutes;
  const activeRound = rounds[activeIndex];

  const circleProgress = activeRound
    ? ((focusMinutes * 60 - secondsLeft) / (focusMinutes * 60)) * 100
    : 0;

  useEffect(() => {
    if (!isRunning) return;

    timerRef.current = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(timerRef.current ?? undefined);
          setIsRunning(false);
          completeRound();
          return focusMinutes * 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [isRunning, activeIndex, focusMinutes]);

  function toggleSubject(name: string) {
    setSelectedSubjects((prev) => {
      if (prev.includes(name)) {
        const next = prev.filter((s) => s !== name);
        return next.length ? next : prev;
      }
      return [...prev, name].slice(0, 6);
    });

    if (!weakSubject) setWeakSubject(name);
  }

  function addCustomSubject() {
    const value = customSubject.trim();
    if (!value) return;
    if (!selectedSubjects.includes(value)) {
      setSelectedSubjects((prev) => [...prev, value].slice(0, 6));
      setWeakSubject(value);
    }
    setCustomSubject("");
  }

  function weightedSubjects() {
    if (mode !== "weak") return selectedSubjects;

    const weighted: string[] = [];
    selectedSubjects.forEach((s) => {
      const weight = s === weakSubject ? 4 : 1;
      for (let i = 0; i < weight; i++) weighted.push(s);
    });
    return weighted;
  }

  function generateRounds() {
    const subjects = weightedSubjects();
    const tasks = TASKS[mode];

    const generated: Round[] = Array.from({ length: totalRounds }, (_, i) => {
      let subject = subjects[i % subjects.length];

      if (mode === "weak" && i % 2 === 0) {
        subject = weakSubject || subjects[0];
      }

      if (mode === "balanced") {
        subject = selectedSubjects[i % selectedSubjects.length];
      }

      const task = tasks[i % tasks.length];

      return {
        id: i + 1,
        subject,
        task,
        minutes: focusMinutes,
        status: "ready",
      };
    });

    setRounds(generated);
    setActiveIndex(0);
    setSecondsLeft(focusMinutes * 60);
    setStarted(false);
    setIsRunning(false);
    setCopied(false);
  }

  function startRound() {
    if (!rounds.length) generateRounds();
    setStarted(true);
    setIsRunning(true);
    setRounds((prev) =>
      prev.map((r, i) => (i === activeIndex ? { ...r, status: "running" } : r))
    );
  }

  function completeRound() {
    setRounds((prev) =>
      prev.map((r, i) => (i === activeIndex ? { ...r, status: "done" } : r))
    );

    setTimeout(() => {
      moveNext();
    }, 300);
  }

  function skipRound() {
    setIsRunning(false);
    setRounds((prev) =>
      prev.map((r, i) => (i === activeIndex ? { ...r, status: "skipped" } : r))
    );
    moveNext();
  }

  function moveNext() {
    const nextIndex = activeIndex + 1;
    if (nextIndex >= rounds.length) {
      setIsRunning(false);
      setSecondsLeft(focusMinutes * 60);
      return;
    }

    setActiveIndex(nextIndex);
    setSecondsLeft(focusMinutes * 60);
    setIsRunning(false);
  }

  function resetAll() {
    setRounds([]);
    setActiveIndex(0);
    setSecondsLeft(focusMinutes * 60);
    setIsRunning(false);
    setStarted(false);
    setCopied(false);
  }

  async function copyResult() {
    const text = [
      "오늘 공부판 결과",
      `총 ${rounds.length}판 중 ${doneCount}판 완료`,
      `집중률 ${progressPercent}%`,
      `실제 공부 시간 ${realStudyMinutes}분`,
      `모드: ${MODE_LABEL[mode]}`,
      "",
      rounds.map((r) => `${r.id}판 ${r.subject} - ${r.task} [${r.status}]`).join("\n"),
    ].join("\n");

    await navigator.clipboard.writeText(text);
    setCopied(true);
  }

  const isFinished = rounds.length > 0 && activeIndex >= rounds.length - 1 && !isRunning && rounds.every((r) => r.status !== "ready" && r.status !== "running");

  return (
    <main className="min-h-screen bg-[#f6f7fb] text-slate-950">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <header className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-indigo-600">해말아 공부 엔진</p>
            <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">
              오늘 공부 몇 판?
            </h1>
          </div>
          <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold shadow-sm">
            DB 없음 · 한 화면 실행
          </div>
        </header>

        <div className="grid flex-1 gap-4 lg:grid-cols-[360px_1fr]">
          <aside className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-4">
              <h2 className="text-lg font-bold">오늘 조건</h2>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                시간을 넣으면 과목별 공부를 판 단위로 쪼개고 바로 타이머로 실행합니다.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-bold">공부 가능 시간</label>
                  <span className="text-sm font-bold text-indigo-600">{studyHours}시간</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={8}
                  value={studyHours}
                  onChange={(e) => setStudyHours(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
                <div className="mt-1 flex justify-between text-xs text-slate-400">
                  <span>1시간</span>
                  <span>8시간</span>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold">집중 단위</label>
                <div className="grid gap-2">
                  {(Object.keys(PRESET) as FocusPreset[]).map((key) => (
                    <button
                      key={key}
                      onClick={() => {
                        setPreset(key);
                        setSecondsLeft(PRESET[key].focus * 60);
                      }}
                      className={`rounded-2xl border px-3 py-3 text-left text-sm font-semibold transition ${
                        preset === key
                          ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                          : "border-slate-200 bg-white hover:bg-slate-50"
                      }`}
                    >
                      {PRESET[key].label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold">과목 선택</label>
                <div className="flex flex-wrap gap-2">
                  {DEFAULT_SUBJECTS.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => toggleSubject(s.name)}
                      className={`rounded-full border px-3 py-2 text-sm font-semibold transition ${
                        selectedSubjects.includes(s.name)
                          ? "border-slate-950 bg-slate-950 text-white"
                          : "border-slate-200 bg-white hover:bg-slate-50"
                      }`}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>

                <div className="mt-3 flex gap-2">
                  <input
                    value={customSubject}
                    onChange={(e) => setCustomSubject(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") addCustomSubject();
                    }}
                    placeholder="직접 추가"
                    className="min-w-0 flex-1 rounded-2xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-indigo-500"
                  />
                  <button
                    onClick={addCustomSubject}
                    className="rounded-2xl bg-slate-950 px-4 text-sm font-bold text-white"
                  >
                    추가
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold">공부 모드</label>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(MODE_LABEL) as Mode[]).map((key) => (
                    <button
                      key={key}
                      onClick={() => setMode(key)}
                      className={`rounded-2xl border px-3 py-3 text-sm font-bold transition ${
                        mode === key
                          ? "border-indigo-600 bg-indigo-600 text-white"
                          : "border-slate-200 bg-white hover:bg-slate-50"
                      }`}
                    >
                      {MODE_LABEL[key]}
                    </button>
                  ))}
                </div>
              </div>

              {mode === "weak" && (
                <div>
                  <label className="mb-2 block text-sm font-bold">약점 과목</label>
                  <select
                    value={weakSubject}
                    onChange={(e) => setWeakSubject(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold outline-none focus:border-indigo-500"
                  >
                    {selectedSubjects.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <button
                onClick={generateRounds}
                className="w-full rounded-2xl bg-indigo-600 px-4 py-4 text-base font-black text-white shadow-sm transition hover:bg-indigo-700"
              >
                오늘 공부판 만들기
              </button>

              <div className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                예상 생성: <b className="text-slate-950">{totalRounds}판</b>
                <br />
                집중 {focusMinutes}분 · 휴식 {restMinutes}분 기준
              </div>
            </div>
          </aside>

          <section className="flex flex-col gap-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              {!rounds.length ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                  <div className="mb-5 rounded-full bg-indigo-50 px-4 py-2 text-sm font-bold text-indigo-700">
                    계획 세우다 시간 버리지 마세요
                  </div>
                  <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
                    오늘 공부를
                    <br />
                    판 단위로 쪼개세요.
                  </h2>
                  <p className="mt-5 max-w-xl text-base leading-7 text-slate-500">
                    과목과 시간을 고르면 바로 실행 가능한 공부판이 생성됩니다.
                    설명형 계획이 아니라, 지금 바로 시작하는 타이머형 공부 도구입니다.
                  </p>
                  <button
                    onClick={generateRounds}
                    className="mt-8 rounded-2xl bg-slate-950 px-6 py-4 text-base font-black text-white"
                  >
                    샘플 공부판 만들기
                  </button>
                </div>
              ) : (
                <div className="grid gap-5 xl:grid-cols-[1fr_300px]">
                  <div>
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-bold text-indigo-600">
                          {MODE_LABEL[mode]} · 총 {rounds.length}판
                        </p>
                        <h2 className="text-2xl font-black">
                          {isFinished ? "오늘 결과" : activeRound ? `${activeRound.id}판 진행` : "대기 중"}
                        </h2>
                      </div>
                      <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-bold">
                        완료 {doneCount} · 포기 {skippedCount} · 집중률 {progressPercent}%
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center rounded-3xl bg-slate-950 p-6 text-white">
                      <div
                        className="relative grid h-64 w-64 place-items-center rounded-full"
                        style={{
                          background: `conic-gradient(#818cf8 ${circleProgress}%, #1e293b ${circleProgress}%)`,
                        }}
                      >
                        <div className="grid h-52 w-52 place-items-center rounded-full bg-slate-950">
                          <div className="text-center">
                            <p className="text-sm font-bold text-slate-400">
                              {activeRound ? `${activeRound.subject} · ${activeRound.task}` : "완료"}
                            </p>
                            <p className="mt-2 text-5xl font-black tracking-tight">
                              {formatTime(secondsLeft)}
                            </p>
                            <p className="mt-2 text-sm font-semibold text-slate-400">
                              {isRunning ? "집중 중" : started ? "대기 중" : "시작 전"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap justify-center gap-3">
                        <button
                          onClick={startRound}
                          disabled={isRunning || isFinished}
                          className="rounded-2xl bg-white px-6 py-4 text-sm font-black text-slate-950 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          {started ? "계속하기" : "시작하기"}
                        </button>
                        <button
                          onClick={completeRound}
                          disabled={!activeRound || isFinished}
                          className="rounded-2xl bg-indigo-500 px-6 py-4 text-sm font-black text-white disabled:opacity-40"
                        >
                          완료
                        </button>
                        <button
                          onClick={skipRound}
                          disabled={!activeRound || isFinished}
                          className="rounded-2xl bg-slate-800 px-6 py-4 text-sm font-black text-white disabled:opacity-40"
                        >
                          포기
                        </button>
                        <button
                          onClick={() => {
                            setIsRunning(false);
                            setSecondsLeft(restMinutes * 60);
                          }}
                          disabled={isFinished}
                          className="rounded-2xl bg-slate-700 px-6 py-4 text-sm font-black text-white disabled:opacity-40"
                        >
                          휴식
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="rounded-3xl bg-slate-50 p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <h3 className="font-black">오늘 공부판</h3>
                        <button
                          onClick={resetAll}
                          className="text-sm font-bold text-slate-500 hover:text-slate-950"
                        >
                          초기화
                        </button>
                      </div>

                      <div className="max-h-[420px] space-y-2 overflow-y-auto pr-1">
                        {rounds.map((r, i) => (
                          <div
                            key={r.id}
                            className={`rounded-2xl border p-3 ${
                              i === activeIndex
                                ? "border-indigo-500 bg-indigo-50"
                                : "border-slate-200 bg-white"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <p className="text-sm font-black">{r.id}판</p>
                              <span
                                className={`rounded-full px-2 py-1 text-xs font-bold ${
                                  r.status === "done"
                                    ? "bg-emerald-100 text-emerald-700"
                                    : r.status === "skipped"
                                      ? "bg-rose-100 text-rose-700"
                                      : r.status === "running"
                                        ? "bg-indigo-100 text-indigo-700"
                                        : "bg-slate-100 text-slate-500"
                                }`}
                              >
                                {r.status === "done"
                                  ? "완료"
                                  : r.status === "skipped"
                                    ? "포기"
                                    : r.status === "running"
                                      ? "진행"
                                      : "대기"}
                              </span>
                            </div>
                            <p className="mt-2 text-sm font-bold">{r.subject}</p>
                            <p className="text-xs text-slate-500">
                              {r.task} · {r.minutes}분
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {rounds.length > 0 && (
              <div className="grid gap-4 lg:grid-cols-3">
                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-sm font-bold text-slate-500">실제 공부 시간</p>
                  <p className="mt-2 text-3xl font-black">{realStudyMinutes}분</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-sm font-bold text-slate-500">오늘 집중률</p>
                  <p className="mt-2 text-3xl font-black">{progressPercent}%</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-sm font-bold text-slate-500">결과 공유</p>
                  <button
                    onClick={copyResult}
                    className="mt-3 w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white"
                  >
                    {copied ? "복사 완료" : "결과 복사하기"}
                  </button>
                </div>
              </div>
            )}

            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-5 text-center text-sm text-slate-500">
              Sponsored · 광고 영역
            </div>

            <footer className="rounded-3xl bg-white p-5 text-xs leading-6 text-slate-500">
              이 서비스는 학습 시간 관리를 돕기 위한 참고용 도구입니다. 생성된 공부판은
              합격이나 성적 향상을 보장하지 않으며, 실제 학습 방식은 개인의 상황에 따라
              조정해야 합니다. 금전 보상, 확률형 보상, 사행성 기능은 제공하지 않습니다.
            </footer>
          </section>
        </div>
      </section>
    </main>
  );
}