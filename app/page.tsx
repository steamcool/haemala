"use client";

import React, { useState, useEffect, useCallback } from "react";
import { 
  Lock, Zap, Copy, RefreshCw, 
  Trash2, ShieldAlert, Sparkles, CheckCircle2, 
  ArrowRightLeft, ShieldHalf, History,
  ShieldCheck, Heart, Share2, AlertCircle,
  XCircle, CheckCircle, ArrowRight, ShieldIcon,
  Monitor, LockIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function HaemalaFinalFixed() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isWashing, setIsWashing] = useState(false);
  const [copyStatus, setCopyStatus] = useState("결과 복사하기");
  const [detectedTypes, setDetectedTypes] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
      
      patterns.forEach(p => {
        if (p.regex.test(text)) {
          found.add(p.id);
          text = text.replace(p.regex, p.replace);
        }
      });
      
      setDetectedTypes(Array.from(found));
      setOutput(text);
      setIsWashing(false);
    }, 1200);
  }, [input, isWashing]);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-orange-100">
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
            <ShieldHalf size={24} className="text-orange-600" />
            <span className="font-black text-xl tracking-tight uppercase italic">haemala<span className="text-orange-600">.</span></span>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <span className="text-[10px] font-black text-slate-400 border border-slate-200 px-3 py-1 rounded-full tracking-widest uppercase">Privacy Filter v1.0</span>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-24">
        <section className="mb-20">
          <div className="bg-slate-50 border border-slate-200/50 rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-[11px] font-black tracking-widest uppercase">
                Privacy Solution
              </div>
              <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tighter text-slate-900">
                챗GPT에 회사 기밀을 <br className="hidden md:block" />
                <span className="text-orange-600 italic">복사해 넣으시겠습니까?</span>
              </h1>
              <p className="text-slate-500 font-medium leading-relaxed text-lg max-w-xl">
                직원들이 무심코 입력하는 고객 정보와 사내 기밀. <br />
                <span className="text-slate-900 font-bold underline decoration-orange-400 decoration-2">해말아(haemala)</span>는 AI 서버 전송 전 데이터를 정제하여 기업의 보안 리스크를 즉시 해결합니다.
              </p>
            </div>
          </div>
        </section>

        <section className="grid lg:grid-cols-2 gap-10 mb-20 items-stretch">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 mb-4 px-2 font-black text-[10px] text-slate-400 tracking-[0.2em] uppercase">
              <div className="w-1.5 h-1.5 bg-slate-200 rounded-full" /> Input Raw Data
            </div>
            <div className="flex-1 bg-white rounded-[2.5rem] border border-slate-200 shadow-xl p-8 transition-all flex flex-col">
              <textarea
                className="w-full flex-1 min-h-[350px] text-xl font-medium outline-none resize-none placeholder:text-slate-200"
                placeholder="보안이 우려되는 원문을 입력하세요..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button 
                onClick={handleWash} 
                disabled={isWashing || !input.trim()}
                className="w-full mt-6 py-6 bg-slate-900 text-white font-black text-xl rounded-2xl hover:bg-orange-600 transition-all shadow-lg active:scale-[0.98] disabled:bg-slate-100 disabled:text-slate-300"
              >
                {isWashing ? "데이터 처리 중..." : "안전하게 마스킹하기"}
              </button>
            </div>
          </div>

          <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 mb-4 px-2 font-black text-[10px] text-orange-500 tracking-[0.2em] uppercase">
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" /> Secure Result
            </div>
            <div className="flex-1 bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-2xl p-8 flex flex-col">
              {output ? (
                <>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {detectedTypes.map((t, i) => (
                      <span key={i} className="px-3 py-1 bg-orange-500/10 text-orange-400 rounded-md text-[10px] font-black uppercase tracking-widest border border-orange-500/20">
                        {t} 감지됨
                      </span>
                    ))}
                  </div>
                  <div className="flex-1 text-xl md:text-2xl font-bold text-white leading-relaxed whitespace-pre-wrap">{output}</div>
                  <button 
                    onClick={() => { navigator.clipboard.writeText(output); setCopyStatus("복사되었습니다!"); setTimeout(() => setCopyStatus("결과 복사하기"), 2000); }} 
                    className="w-full mt-6 py-6 bg-white text-slate-900 font-black text-xl rounded-2xl hover:bg-orange-500 hover:text-white transition-all"
                  >
                    {copyStatus}
                  </button>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-700">
                  <LockIcon size={48} className="mb-4 opacity-10" />
                  <p className="font-black text-sm uppercase tracking-widest opacity-30 text-center">
                    분석 대기 중
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="py-20 border-t border-slate-100">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-red-500 font-black text-xs uppercase tracking-widest">
                <XCircle size={16} /> AS-IS
              </div>
              <h3 className="text-3xl font-black tracking-tight">무방비한 기밀 유출</h3>
              <p className="text-slate-500 font-medium leading-relaxed">직원들이 챗GPT를 쓰기 위해 사내 기밀과 고객 정보를 복사해서 붙여넣습니다. 이 데이터는 AI 모델 학습에 사용되어 영구적으로 유출될 위험이 있습니다.</p>
            </div>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-green-500 font-black text-xs uppercase tracking-widest">
                <CheckCircle size={16} /> TO-BE
              </div>
              <h3 className="text-3xl font-black tracking-tight text-orange-600">완벽한 데이터 정제</h3>
              <p className="text-slate-500 font-medium leading-relaxed">해말아를 통하면 개인정보가 비식별 처리된 상태로 AI에게 전달됩니다. 기업은 보안 우려 없이 AI 기술의 생산성만을 온전히 누릴 수 있습니다.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-20 bg-slate-50 border-t border-slate-100 text-center">
        <div className="font-black text-xl italic tracking-tighter mb-4">haemala.</div>
        <p className="text-slate-400 text-[10px] font-black tracking-[0.5em] uppercase mb-10">
          Secure Prompt Filter System
        </p>
        <div className="inline-flex items-center gap-2 px-6 py-2 bg-white rounded-full text-slate-400 text-[10px] font-bold border border-slate-200">
          <Monitor size={12} /> 모든 데이터는 서버 저장 없이 귀하의 기기에서만 처리됩니다.
        </div>
      </footer>
    </div>
  );
}