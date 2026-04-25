"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

type Post = {
  id: string;
  title: string;
  category: string;
  situation: string;
  optionA: string;
  optionB: string;
  votesA: number;
  votesB: number;
  comments: string[];
  createdAt?: string;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

const seedPosts: Post[] = [
  {
    id: "seed-1",
    title: "썸남이 답장은 7시간 뒤에 하는데 인스타 스토리는 올림",
    category: "썸",
    situation:
      "아침에 카톡 보냈는데 답장은 밤에 왔어. 근데 중간에 인스타 스토리는 2개나 올렸더라. 이거 관심 없는 거야?",
    optionA: "관심 없다",
    optionB: "바빴을 수도 있다",
    votesA: 128,
    votesB: 76,
    comments: [
      "스토리 올릴 시간은 있는데 답장 시간은 없다? 이건 좀 아프다.",
      "한 번이면 몰라도 반복되면 답 나온 거임.",
      "연애판에서 알림 무시는 거의 판결문.",
    ],
  },
  {
    id: "seed-2",
    title: "전 애인이 생일 축하한다고 연락 옴",
    category: "전애인",
    situation:
      "헤어진 지 4개월 됐고 서로 연락 안 했는데 생일에 갑자기 연락이 왔어. 그냥 예의일까, 다시 시작하고 싶은 걸까?",
    optionA: "미련 있다",
    optionB: "그냥 예의다",
    votesA: 89,
    votesB: 112,
    comments: [
      "생일은 연락하기 좋은 핑계임.",
      "내용이 길었으면 미련, 짧았으면 예의.",
    ],
  },
  {
    id: "seed-3",
    title: "소개팅 후 ‘조심히 들어가세요’만 오고 끝",
    category: "소개팅",
    situation:
      "분위기는 괜찮았다고 생각했는데 집 도착 후 ‘조심히 들어가세요’ 이후로 연락이 없어. 내가 먼저 또 보내야 할까?",
    optionA: "한 번 더 보내본다",
    optionB: "끝난 거다",
    votesA: 61,
    votesB: 94,
    comments: [
      "한 번은 보내봐도 됨. 두 번부터는 자존심 장례식.",
      "상대도 기다릴 수도 있긴 함. 인간들 참 비효율적.",
    ],
  },
];

const categories = ["전체", "썸", "연애중", "소개팅", "전애인", "이별", "친구", "기타"];

const balanceGames = [
  ["매일 연락하지만 자주 못 만남", "연락은 적지만 자주 만남"],
  ["내가 더 좋아하는 연애", "상대가 더 좋아하는 연애"],
  ["답장 빠른데 무심함", "답장 느린데 다정함"],
  ["싸우면 바로 푸는 사람", "혼자 시간 갖는 사람"],
  ["친구 같은 연애", "설레는 연애"],
  ["전 애인과 친구 가능", "절대 불가능"],
];

export default function Home() {
  const [posts, setPosts] = useState<Post[]>(seedPosts);
  const [activePostId, setActivePostId] = useState(seedPosts[0].id);
  const [category, setCategory] = useState("전체");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"hot" | "new" | "controversial">("hot");
  const [toast, setToast] = useState("");
  const [aiResult, setAiResult] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [voteLoading, setVoteLoading] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [balanceIndex, setBalanceIndex] = useState(0);

  const [form, setForm] = useState({
    title: "",
    category: "썸",
    situation: "",
    optionA: "",
    optionB: "",
  });

  const activePost = posts.find((p) => p.id === activePostId) || posts[0];

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    if (!supabase) return;

    const { data: postRows, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !postRows) return;

    const { data: voteRows } = await supabase.from("votes").select("*");
    const { data: commentRows } = await supabase
      .from("comments")
      .select("*")
      .order("created_at", { ascending: false });

    const mapped: Post[] = postRows.map((row: any) => {
      const vote = voteRows?.find((v: any) => v.post_id === row.id);
      const comments =
        commentRows
          ?.filter((c: any) => c.post_id === row.id)
          .map((c: any) => c.content) || [];

      return {
        id: row.id,
        title: row.title,
        category: row.category,
        situation: row.situation,
        optionA: row.option_a,
        optionB: row.option_b,
        votesA: vote?.votes_a || 0,
        votesB: vote?.votes_b || 0,
        comments: comments.length ? comments : ["아직 댓글이 없습니다. 첫 인간이 되어보세요."],
        createdAt: row.created_at,
      };
    });

    if (mapped.length > 0) {
      setPosts(mapped);
      setActivePostId(mapped[0].id);
    }
  }

  function getFingerprint() {
    let fp = localStorage.getItem("haemala_fingerprint");
    if (!fp) {
      fp = crypto.randomUUID();
      localStorage.setItem("haemala_fingerprint", fp);
    }
    return fp;
  }

  async function vote(postId: string, side: "A" | "B") {
    if (voteLoading) return;

    setVoteLoading(true);

    const oldPost = posts.find((p) => p.id === postId);
    if (!oldPost) {
      setVoteLoading(false);
      return;
    }

    if (postId.startsWith("seed-")) {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId
            ? {
                ...p,
                votesA: side === "A" ? p.votesA + 1 : p.votesA,
                votesB: side === "B" ? p.votesB + 1 : p.votesB,
              }
            : p
        )
      );
      showToast("샘플 사연 투표 완료. DB 저장은 실제 등록 사연부터 됩니다.");
      setVoteLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId,
          side,
          fingerprint: getFingerprint(),
        }),
      });

      const data = await res.json();

      if (data.error) {
        showToast("이미 투표했어. 민주주의도 1인 1표다.");
        setVoteLoading(false);
        return;
      }

      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId
            ? {
                ...p,
                votesA: data.votesA ?? p.votesA,
                votesB: data.votesB ?? p.votesB,
              }
            : p
        )
      );

      showToast("투표 완료. 세상이 조금 더 시끄러워졌습니다.");
    } catch {
      showToast("투표 실패. 서버가 잠깐 삐졌습니다.");
    }

    setVoteLoading(false);
  }

  async function analyze(post: Post) {
    setAiLoading(true);
    setAiResult("");

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          situation: `
제목: ${post.title}
상황: ${post.situation}
선택지 A: ${post.optionA}
선택지 B: ${post.optionB}
투표 A: ${post.votesA}
투표 B: ${post.votesB}

아래 형식으로 분석해줘.
1. AI 한줄 판결
2. 상황 요약
3. 위험 신호
4. 추천 행동
5. 보낼 수 있는 카톡 예시
`,
        }),
      });

      const data = await res.json();
      setAiResult(data.result || "AI가 침묵했습니다. 기계도 가끔 현타 옵니다.");
    } catch {
      setAiResult("AI 분석 실패. API 키나 서버 상태를 확인해야 합니다.");
    }

    setAiLoading(false);
  }

  async function createPost() {
    if (!form.title || !form.situation || !form.optionA || !form.optionB) {
      showToast("빈칸 다 채워. 연애도 입력도 애매하면 망한다.");
      return;
    }

    if (!supabase) {
      const localPost: Post = {
        id: `local-${Date.now()}`,
        title: form.title,
        category: form.category,
        situation: form.situation,
        optionA: form.optionA,
        optionB: form.optionB,
        votesA: 0,
        votesB: 0,
        comments: ["방금 올라온 따끈한 사연입니다."],
      };

      setPosts((prev) => [localPost, ...prev]);
      setActivePostId(localPost.id);
      resetForm();
      showToast("로컬 등록 완료. Supabase 연결하면 저장됩니다.");
      return;
    }

    const { data, error } = await supabase
      .from("posts")
      .insert({
        title: form.title,
        category: form.category,
        situation: form.situation,
        option_a: form.optionA,
        option_b: form.optionB,
      })
      .select()
      .single();

    if (error || !data) {
      showToast("사연 저장 실패. Supabase 테이블 확인해.");
      return;
    }

    await supabase.from("votes").insert({
      post_id: data.id,
      votes_a: 0,
      votes_b: 0,
    });

    const newPost: Post = {
      id: data.id,
      title: data.title,
      category: data.category,
      situation: data.situation,
      optionA: data.option_a,
      optionB: data.option_b,
      votesA: 0,
      votesB: 0,
      comments: ["방금 올라온 따끈한 사연입니다."],
      createdAt: data.created_at,
    };

    setPosts((prev) => [newPost, ...prev]);
    setActivePostId(newPost.id);
    resetForm();
    showToast("사연 등록 완료. 이제 사람들의 심판을 받습니다.");
  }

  async function addComment() {
    if (!activePost || !commentText.trim()) return;

    const text = commentText.trim();

    setPosts((prev) =>
      prev.map((p) =>
        p.id === activePost.id
          ? {
              ...p,
              comments: [text, ...(p.comments || [])],
            }
          : p
      )
    );

    setCommentText("");
    showToast("댓글 등록 완료. 또 하나의 의견이 인터넷에 풀려났습니다.");

    if (supabase && !activePost.id.startsWith("seed-") && !activePost.id.startsWith("local-")) {
      await supabase.from("comments").insert({
        post_id: activePost.id,
        content: text,
      });
    }
  }

  function resetForm() {
    setForm({
      title: "",
      category: "썸",
      situation: "",
      optionA: "",
      optionB: "",
    });
  }

  function sharePost() {
    const text = `${activePost.title}\n\n너라면 뭐 고름?\n${window.location.href}`;
    navigator.clipboard.writeText(text);
    showToast("공유 문구 복사 완료. 이제 친구를 이 혼란에 초대해.");
  }

  function showToast(message: string) {
    setToast(message);
    setTimeout(() => setToast(""), 2300);
  }

  const filteredPosts = useMemo(() => {
    let list = [...posts];

    if (category !== "전체") {
      list = list.filter((p) => p.category === category);
    }

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.situation.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (sort === "hot") {
      list.sort((a, b) => b.votesA + b.votesB - (a.votesA + a.votesB));
    }

    if (sort === "new") {
      list.sort((a, b) => {
        const at = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const bt = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return bt - at;
      });
    }

    if (sort === "controversial") {
      list.sort((a, b) => controversyScore(b) - controversyScore(a));
    }

    return list;
  }, [posts, category, query, sort]);

  const totalVotes = posts.reduce((sum, p) => sum + p.votesA + p.votesB, 0);
  const totalComments = posts.reduce((sum, p) => sum + (p.comments?.length || 0), 0);
  const hotPosts = [...posts]
    .sort((a, b) => b.votesA + b.votesB - (a.votesA + a.votesB))
    .slice(0, 5);

  const currentBalance = balanceGames[balanceIndex];

  return (
    <main className="min-h-screen bg-[#090914] text-white">
      {toast && (
        <div className="fixed left-1/2 top-5 z-50 w-[90%] max-w-xl -translate-x-1/2 rounded-2xl border border-white/20 bg-white px-5 py-4 text-center text-sm font-black text-black shadow-2xl">
          {toast}
        </div>
      )}

      <section className="mx-auto max-w-7xl px-4 py-6 md:px-8">
        <header className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-fuchsia-600 via-violet-700 to-indigo-950 p-6 shadow-2xl md:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-4 inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-black backdrop-blur">
                HAEMALA · 연애판결소
              </div>

              <h1 className="max-w-4xl text-4xl font-black tracking-tight md:text-7xl">
                애매한 연애,
                <br />
                혼자 고민하지 말고
                <br />
                사람들한테 판결받자.
              </h1>

              <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-white/80 md:text-lg">
                썸, 소개팅, 전애인, 이별 상황을 올리면 사람들이 투표하고 AI가 냉정하게
                정리해주는 실시간 연애 판단 서비스.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => document.getElementById("write")?.scrollIntoView({ behavior: "smooth" })}
                  className="rounded-2xl bg-white px-5 py-4 font-black text-black transition hover:scale-105"
                >
                  내 사연 올리기
                </button>
                <button
                  onClick={sharePost}
                  className="rounded-2xl border border-white/30 bg-white/10 px-5 py-4 font-black text-white transition hover:bg-white/20"
                >
                  친구한테 물어보기
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Stat label="전체 사연" value={posts.length.toLocaleString()} />
              <Stat label="누적 투표" value={totalVotes.toLocaleString()} />
              <Stat label="댓글 반응" value={totalComments.toLocaleString()} />
            </div>
          </div>
        </header>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-xl backdrop-blur">
              <div className="flex flex-col gap-3 md:flex-row">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="사연 검색: 답장, 전애인, 소개팅..."
                  className="flex-1 rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-white outline-none placeholder:text-white/40 focus:border-fuchsia-300"
                />

                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as any)}
                  className="rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-white outline-none"
                >
                  <option value="hot">인기순</option>
                  <option value="new">최신순</option>
                  <option value="controversial">논란순</option>
                </select>
              </div>

              <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`shrink-0 rounded-full px-4 py-2 text-sm font-black transition ${
                      category === c
                        ? "bg-white text-black"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              {filteredPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  active={post.id === activePost?.id}
                  onClick={() => {
                    setActivePostId(post.id);
                    setAiResult("");
                  }}
                />
              ))}
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-[2rem] border border-white/10 bg-white p-5 text-black shadow-2xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-black text-fuchsia-600">오늘의 판결</p>
                  <h2 className="mt-2 text-2xl font-black leading-tight">
                    {activePost?.title}
                  </h2>
                </div>
                <span className="rounded-full bg-black px-3 py-2 text-xs font-black text-white">
                  {activePost?.category}
                </span>
              </div>

              <p className="mt-4 rounded-2xl bg-black/5 p-4 text-sm leading-6 text-black/70">
                {activePost?.situation}
              </p>

              <div className="mt-4 rounded-2xl bg-yellow-100 p-4">
                <p className="text-sm font-black">판세</p>
                <p className="mt-1 text-xl font-black">
                  {controversyLabel(activePost)}
                </p>
              </div>

              <div className="mt-4 space-y-3">
                <button
                  onClick={() => vote(activePost.id, "A")}
                  className="w-full rounded-2xl bg-black p-4 text-left font-black text-white transition hover:scale-[1.02]"
                >
                  A. {activePost.optionA}
                </button>

                <button
                  onClick={() => vote(activePost.id, "B")}
                  className="w-full rounded-2xl bg-fuchsia-600 p-4 text-left font-black text-white transition hover:scale-[1.02]"
                >
                  B. {activePost.optionB}
                </button>
              </div>

              <div className="mt-4 space-y-3">
                <VoteBar
                  dark
                  label={activePost.optionA}
                  value={percent(activePost.votesA, activePost.votesB)}
                  votes={activePost.votesA}
                />
                <VoteBar
                  dark
                  label={activePost.optionB}
                  value={percent(activePost.votesB, activePost.votesA)}
                  votes={activePost.votesB}
                />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <button
                  onClick={() => analyze(activePost)}
                  className="rounded-2xl bg-yellow-300 px-4 py-4 font-black text-black transition hover:bg-yellow-200"
                >
                  {aiLoading ? "분석 중..." : "AI 판결"}
                </button>

                <button
                  onClick={sharePost}
                  className="rounded-2xl bg-black px-4 py-4 font-black text-white transition hover:bg-black/80"
                >
                  공유하기
                </button>
              </div>

              {aiResult && (
                <div className="mt-4 whitespace-pre-line rounded-2xl bg-black p-4 text-sm leading-6 text-white">
                  {aiResult}
                </div>
              )}

              <div className="mt-5">
                <p className="mb-3 text-sm font-black">댓글 반응</p>

                <div className="flex gap-2">
                  <input
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="한마디 남기기"
                    className="flex-1 rounded-xl border border-black/10 bg-black/5 px-3 py-3 text-sm outline-none"
                  />
                  <button
                    onClick={addComment}
                    className="rounded-xl bg-black px-4 py-3 text-sm font-black text-white"
                  >
                    등록
                  </button>
                </div>

                <div className="mt-3 max-h-56 space-y-2 overflow-y-auto">
                  {(activePost.comments || []).map((comment, index) => (
                    <p
                      key={`${comment}-${index}`}
                      className="rounded-xl bg-black/5 p-3 text-sm leading-5 text-black/70"
                    >
                      {comment}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-yellow-300 to-orange-400 p-5 text-black shadow-xl">
              <p className="text-sm font-black">밸런스 게임</p>
              <h3 className="mt-2 text-2xl font-black">둘 중 하나만 고른다면?</h3>

              <div className="mt-4 grid gap-3">
                <button
                  onClick={() => {
                    setBalanceIndex((prev) => (prev + 1) % balanceGames.length);
                    showToast("선택 완료. 인간 취향 데이터가 또 쌓였습니다.");
                  }}
                  className="rounded-2xl bg-white p-4 text-left font-black shadow"
                >
                  {currentBalance[0]}
                </button>

                <button
                  onClick={() => {
                    setBalanceIndex((prev) => (prev + 1) % balanceGames.length);
                    showToast("선택 완료. 다음 혼란으로 넘어갑니다.");
                  }}
                  className="rounded-2xl bg-black p-4 text-left font-black text-white shadow"
                >
                  {currentBalance[1]}
                </button>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-xl">
              <p className="text-sm font-black text-white/70">실시간 인기 TOP 5</p>
              <div className="mt-4 space-y-3">
                {hotPosts.map((post, index) => (
                  <button
                    key={post.id}
                    onClick={() => {
                      setActivePostId(post.id);
                      setAiResult("");
                    }}
                    className="w-full rounded-2xl bg-white/10 p-4 text-left transition hover:bg-white/20"
                  >
                    <p className="text-sm font-black text-fuchsia-300">
                      #{index + 1} · {post.votesA + post.votesB}표
                    </p>
                    <p className="mt-1 font-black">{post.title}</p>
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section
          id="write"
          className="mt-6 rounded-[2rem] border border-white/10 bg-white p-6 text-black shadow-2xl"
        >
          <p className="text-sm font-black text-fuchsia-600">사연 등록</p>
          <h2 className="mt-2 text-3xl font-black">네 연애 재판을 열어라</h2>
          <p className="mt-2 text-sm leading-6 text-black/60">
            제목, 상황, 선택지 2개만 넣으면 바로 투표 카드가 생성된다. 이렇게 또 인터넷에
            하나의 재판장이 생긴다.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="제목: 예) 썸녀가 갑자기 존댓말을 써요"
              className="rounded-2xl border border-black/10 bg-black/5 p-4 outline-none focus:border-fuchsia-500"
            />

            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="rounded-2xl border border-black/10 bg-black/5 p-4 outline-none focus:border-fuchsia-500"
            >
              {categories
                .filter((c) => c !== "전체")
                .map((c) => (
                  <option key={c}>{c}</option>
                ))}
            </select>

            <textarea
              value={form.situation}
              onChange={(e) => setForm({ ...form, situation: e.target.value })}
              placeholder="상황을 자세히 적어줘"
              className="min-h-40 rounded-2xl border border-black/10 bg-black/5 p-4 outline-none focus:border-fuchsia-500 md:col-span-2"
            />

            <input
              value={form.optionA}
              onChange={(e) => setForm({ ...form, optionA: e.target.value })}
              placeholder="선택지 A: 예) 관심 없다"
              className="rounded-2xl border border-black/10 bg-black/5 p-4 outline-none focus:border-fuchsia-500"
            />

            <input
              value={form.optionB}
              onChange={(e) => setForm({ ...form, optionB: e.target.value })}
              placeholder="선택지 B: 예) 바쁠 수도 있다"
              className="rounded-2xl border border-black/10 bg-black/5 p-4 outline-none focus:border-fuchsia-500"
            />
          </div>

          <button
            onClick={createPost}
            className="mt-5 w-full rounded-2xl bg-black p-5 text-lg font-black text-white transition hover:scale-[1.01]"
          >
            사연 등록하기
          </button>
        </section>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/15 p-4 text-center backdrop-blur">
      <p className="text-2xl font-black md:text-3xl">{value}</p>
      <p className="mt-1 text-xs font-bold text-white/70">{label}</p>
    </div>
  );
}

function PostCard({
  post,
  active,
  onClick,
}: {
  post: Post;
  active: boolean;
  onClick: () => void;
}) {
  const total = post.votesA + post.votesB;
  const aPercent = percent(post.votesA, post.votesB);
  const bPercent = 100 - aPercent;

  return (
    <article
      onClick={onClick}
      className={`cursor-pointer rounded-[2rem] border p-5 shadow-xl transition hover:-translate-y-1 ${
        active
          ? "border-fuchsia-300 bg-white/20"
          : "border-white/10 bg-white/10 hover:bg-white/15"
      }`}
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-fuchsia-500 px-3 py-1 text-xs font-black">
          {post.category}
        </span>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-white/80">
          {total}표
        </span>
        <span className="rounded-full bg-yellow-300 px-3 py-1 text-xs font-black text-black">
          {controversyLabel(post)}
        </span>
      </div>

      <h2 className="text-xl font-black leading-tight md:text-2xl">{post.title}</h2>
      <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/70">
        {post.situation}
      </p>

      <div className="mt-4 space-y-3">
        <VoteBar label={post.optionA} value={aPercent} votes={post.votesA} />
        <VoteBar label={post.optionB} value={bPercent} votes={post.votesB} />
      </div>
    </article>
  );
}

function VoteBar({
  label,
  value,
  votes,
  dark = false,
}: {
  label: string;
  value: number;
  votes: number;
  dark?: boolean;
}) {
  return (
    <div>
      <div
        className={`mb-1 flex justify-between gap-3 text-xs font-bold ${
          dark ? "text-black/70" : "text-white/70"
        }`}
      >
        <span className="line-clamp-1">{label}</span>
        <span className="shrink-0">
          {value}% · {votes}표
        </span>
      </div>

      <div className={`h-3 overflow-hidden rounded-full ${dark ? "bg-black/10" : "bg-white/10"}`}>
        <div
          className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 to-yellow-300 transition-all duration-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function percent(a: number, b: number) {
  const total = a + b;
  if (total === 0) return 50;
  return Math.round((a / total) * 100);
}

function controversyScore(post: Post) {
  const total = post.votesA + post.votesB;
  if (total === 0) return 0;
  const diff = Math.abs(post.votesA - post.votesB);
  return total - diff * 2;
}

function controversyLabel(post: Post) {
  const total = post.votesA + post.votesB;
  if (total < 5) return "🆕 신규";

  const diffPercent = Math.abs(percent(post.votesA, post.votesB) - 50);

  if (diffPercent <= 5) return "🔥 대논쟁";
  if (diffPercent <= 15) return "🤔 의견 갈림";
  if (diffPercent <= 30) return "⚖️ 팽팽함";
  return "🧠 거의 확정";
}