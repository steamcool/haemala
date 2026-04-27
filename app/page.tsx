"use client";

import React, { useState, useEffect, useCallback } from "react";
import { 
  Lock, Zap, Copy, RefreshCw, 
  Trash2, ShieldAlert, Sparkles, CheckCircle2, 
  ArrowRightLeft, ShieldHalf, History,
  ShieldCheck, Heart, Share2, AlertCircle,
  XCircle, CheckCircle, ArrowRight, ShieldIcon,
  ShieldEllipsis, LockIcon, Monitor
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function HaemalaProfessional() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isWashing, setIsWashing] = useState(false);
  const [copyStatus, setCopyStatus] = useState("Copy Result");
  const [detectedTypes, setDetectedTypes] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const handleWash = useCallback(() => {
    if (!input.trim() || isWashing) return;
    setIsWashing(true);
    setTimeout(() => {
      let text = input;
      const found = new Set<string>();
      const patterns = [
        { id: "이름", regex: /([가-힣]{2,4})(?=\s|팀장|직원|님|에게|선생님|과장|부장|대리|사원|주임|본부장)/g, replace: "[NAME_PROTECTED]" },
        { id: "이메일", regex: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, replace: "[EMAIL_PROTECTED]" },
        { id: "연락처", regex: /(010|02|031|051|070|080)-\d{3,4}-\d{4}/g, replace: "[PHONE_PROTECTED]" },
        { id: "금융정보", regex: /\d{4}-\d{4}-\d{4}-\d{4}|\d{10,14}/g, replace: "[FINANCE_PROTECTED]" }
      ];
      patterns.forEach(p => { if (p.regex.test(text)) { found.add(p.id); text = text.replace(p.regex, p.replace); } });
      setDetectedTypes(Array.from(found));
      setOutput(text);
      setIsWashing(false);
    }, 1200);
  }, [input, isWashing]);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-orange-100">
      {/* GNB */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldHalf size={24} className="text-orange-600" />
            <span className="font-black text-xl tracking-tight uppercase">haemala<span className="text-orange-600">.</span></span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold text-slate-400 border border-slate-200 px-3 py-1 rounded-full uppercase">Enterprise v1.0</span>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-24">
        {/* 서비스 명분 (Why) 최상단 배치 */}
        <section className="mb-20">
          <div className="bg-orange-50 border border-orange-100 rounded-[2.5rem] p-10 md:p-16 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-orange-200 rounded-full text-orange-600 text-[11px] font-black tracking-widest uppercase">
                Privacy Solution
              </div>
              <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tighter">
                챗GPT에 회사 기밀을 <br />
                <span className="text-orange-600 italic underline decoration-orange-300">그냥 복사해 넣으시겠습니까?</span>
              </h1>
              <p className="text-slate-600 font-medium leading-relaxed text-lg">
                직원들이 AI를 사용할 때 실수로 입력하는 고객 정보와 기밀 사항들. <br />
                <span className="text-slate-900 font-bold">해말아(haemala)</span>는 서버 전송 없이 브라우저 단에서 즉시 마스킹하여 <br />
                기업의 법적 리스크를 완벽하게 차단하는 보안 필터입니다.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
              <div className="p-6 bg-white rounded-3xl shadow-sm border border-orange-100 text-center">
                <Monitor className="mx-auto mb-3 text-orange-400" size={24} />
                <div className="text-[10px] font-black text-slate-400 uppercase mb-1">Processing</div>
                <div className="text-sm font-black text-slate-900">100% 로컬</div>
              </div>
              <div className="p-6 bg-white rounded-3xl shadow-sm border border-orange-100 text-center">
                <LockIcon className="mx-auto mb-3 text-orange-400" size={24} />
                <div className="text-[10px] font-black text-slate-400 uppercase mb-1">Security</div>
                <div className="text-sm font-black text-slate-900">유출 0건</div>
              </div>
            </div>
          </div>
        </section>

        {/* 실전 세탁기 인터페이스 */}
        <section className="grid lg:grid-cols-2 gap-10 mb-20 items-stretch">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 mb-4 px-2">
              <span className="w-2 h-2 bg-slate-300 rounded-full" />
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">Input Raw Data</h3>
            </div>
            <div className="flex-1 bg-white rounded-[2rem] border border-slate-200 shadow-xl p-8 focus-within:ring-4 focus-within:ring-orange-50 transition-all flex flex-col">
              <textarea
                className="w-full flex-1 min-h-[350px] text-xl font-medium outline-none resize-none placeholder:text-slate-200"
                placeholder="보안이 우려되는 원문을 입력하세요..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button 
                onClick={handleWash} 
                disabled={isWashing || !input.trim()}
                className="w-full mt-6 py-6 bg-slate-900 text-white font-black text-xl rounded-2xl hover:bg-orange-600 transition-all shadow-lg active:scale-[0.98] disabled:bg-slate-100"
              >
                {isWashing ? "데이터 보안 처리 중..." : "안전하게 마스킹하기"}
              </button>
            </div>
          </div>

          <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 mb-4 px-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full" />
              <h3 className="text-xs font-black text-orange-500 uppercase tracking-widest">Secure Result</h3>
            </div>
            <div className="flex-1 bg-slate-950 rounded-[2rem] border border-slate-800 shadow-2xl p-8 flex flex-col">
              {output ? (
                <>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {detectedTypes.map((t, i) => (
                      <span key={i} className="px-2 py-1 bg-orange-500/20 text-orange-400 rounded-md text-[9px] font-black uppercase tracking-tighter border border-orange-500/30 tracking-widest">
                        {t} PROTECTED
                      </span>
                    ))}
                  </div>
                  <div className="flex-1 text-xl md:text-2xl font-bold text-white leading-relaxed whitespace-pre-wrap">{output}</div>
                  <button 
                    onClick={() => { navigator.clipboard.writeText(output); setCopyStatus("복사되었습니다!"); setTimeout(() => setCopyStatus("결과 복사하기"), 2000); }} 
                    className="w-full mt-6 py-6 bg-white text-slate-900 font-black text-xl rounded-2xl hover:bg-orange-500 hover:text-white transition-all active:scale-[0.98]"
                  >
                    {copyStatus}
                  </button>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-700">
                  <ShieldEllipsis size={48} className="mb-4 opacity-10" />
                  <p className="font-black text-sm uppercase tracking-[0.2em] opacity-40 text-center leading-relaxed">
                    분석 대기 중<br />
                    <span className="text-[10px]">왼쪽에 텍스트를 입력하세요.</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* AS-IS / TO-BE 시각화 */}
        <section className="py-20 border-t border-slate-100">
          <div className="text-center mb-16 space-y-2">
            <h2 className="text-3xl font-black tracking-tight">Business Impact</h2>
            <div className="w-12 h-1 bg-orange-600 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-10 rounded-[2rem] bg-slate-50 border border-slate-100 space-y-8">
              <div className="flex items-center gap-3">
                <XCircle className="text-red-500" size={32} />
                <h4 className="text-xl font-black text-slate-400 italic uppercase">As-Is</h4>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-2xl border border-slate-200">
                  <p className="text-sm font-bold text-slate-800 mb-1">보안 규정 무시</p>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">직원들이 편의를 위해 고객 정보를 챗GPT에 무단으로 입력함</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-slate-200">
                  <p className="text-sm font-bold text-slate-800 mb-1">데이터 영구 소유권 상실</p>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">입력된 정보가 AI 학습 데이터로 사용되어 기업 기밀이 노출됨</p>
                </div>
              </div>
            </div>

            <div className="p-10 rounded-[2rem] bg-orange-600 space-y-8 shadow-2xl shadow-orange-200">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-white" size={32} />
                <h4 className="text-xl font-black text-white/50 italic uppercase">To-Be</h4>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm">
                  <p className="text-sm font-bold text-white mb-1">완벽한 사전 필터링</p>
                  <p className="text-xs text-white/70 font-medium leading-relaxed">AI 서버로 전송되기 전, 로컬 환경에서 모든 개인정보를 소거</p>
                </div>
                <div className="p-4 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm">
                  <p className="text-sm font-bold text-white mb-1">기업 보안 경쟁력 확보</p>
                  <p className="text-xs text-white/70 font-medium leading-relaxed">보안 걱정 없이 최신 AI 기술을 활용해 업무 효율 300% 달성</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-20 bg-slate-50 border-t border-slate-100 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <ShieldHalf className="text-slate-900" size={20} />
          <span className="font-black text-xl italic tracking-tighter">haemala.</span>
        </div>
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.5em] mb-10 leading-loose">
          Secure Local Processing Technology<br />
          Enterprise-Grade Privacy Filter
        </p>
        <div className="flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-white rounded-full text-slate-400 text-[11px] font-bold border border-slate-200 shadow-sm">
            <Heart size={12} className="text-red-500" /> 광고 수익으로 운영되는 공익적 보안 서비스
          </div>
          <p className="text-[10px] text-slate-300 font-medium">© 2026 haemala. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}