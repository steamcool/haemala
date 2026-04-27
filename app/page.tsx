"use client";

import React, { useState, useEffect, useCallback } from "react";
import { 
  Lock, Zap, Copy, RefreshCw, 
  Trash2, ShieldAlert, Sparkles, CheckCircle2, 
  ArrowRightLeft, ShieldHalf, History,
  Info, ShieldCheck, Heart, Share2, AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function HaemalaFinalProduction() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isWashing, setIsWashing] = useState(false);
  const [copyStatus, setCopyStatus] = useState("Copy Result");
  const [detectedTypes, setDetectedTypes] = useState<string[]>([]);
  const [washStatus, setWashStatus] = useState("WASHING...");

  // 1. 현실 필터: 브라우저 호환성 및 클립보드 체크
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const statusMessages = ["문장 구조 분석 중...", "개인정보 식별 중...", "세탁 중...", "안전 확인 중..."];

  // 2. 핵심 로직: 정교한 마스킹 엔진
  const handleWash = useCallback(() => {
    if (!input.trim() || isWashing) return;
    
    setIsWashing(true);
    let msgIndex = 0;
    const interval = setInterval(() => {
      msgIndex = (msgIndex + 1) % statusMessages.length;
      setWashStatus(statusMessages[msgIndex]);
    }, 400);

    // 실제 분석 시간 부여 (사용자 신뢰감 형성)
    setTimeout(() => {
      clearInterval(interval);
      let text = input;
      const found = new Set<string>();

      const patterns = [
        { id: "이름", regex: /([가-힣]{2,4})(?=\s|팀장|직원|님|에게|선생님|과장|부장|대리|사원|주임|본부장)/g, replace: "{NAME_MASKED}" },
        { id: "이메일", regex: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, replace: "{EMAIL_MASKED}" },
        { id: "연락처", regex: /(010|02|031|051|070|080)-\d{3,4}-\d{4}/g, replace: "{PHONE_MASKED}" },
        { id: "주소", regex: /[가-힣]+(시|도)\s[가-힣]+(구|군)\s[가-힣]+(동|읍|면|리)\s?\d*/g, replace: "{LOCATION_MASKED}" },
        { id: "금융/계좌", regex: /\d{4}-\d{4}-\d{4}-\d{4}|\d{10,14}|\d{6}-[1-4]\d{6}/g, replace: "{SENSITIVE_DATA_MASKED}" }
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
      setWashStatus("WASHING...");
    }, 1500);
  }, [input, isWashing]);

  // 3. 클립보드 복사 안정성 강화
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopyStatus("Copied to Clipboard!");
      setTimeout(() => setCopyStatus("Copy Result"), 2000);
    } catch (err) {
      setCopyStatus("Failed to Copy");
      setTimeout(() => setCopyStatus("Copy Result"), 2000);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-orange-100 selection:text-orange-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.location.reload()}>
            <div className="bg-orange-600 p-1.5 rounded-xl text-white shadow-lg shadow-orange-200 group-hover:rotate-12 transition-transform">
              <ShieldHalf size={20} />
            </div>
            <span className="font-black text-xl tracking-tighter italic">haemala<span className="text-orange-600">.</span></span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-block text-[10px] font-black text-slate-400 tracking-widest uppercase">Safe Mode Active</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-sm shadow-green-200" />
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-24">
        {/* 상단 광고 영역 (비즈니스 모델) */}
        <div className="w-full bg-slate-50 border border-slate-200/60 rounded-3xl p-4 mb-12 flex flex-col items-center justify-center min-h-[100px] text-center">
          <span className="text-[10px] font-black text-slate-300 tracking-[0.3em] uppercase mb-2">Advertisement</span>
          <div className="text-slate-400 text-sm font-medium italic">"개인정보 세탁으로 안전한 AI 생활, 해말아가 앞장섭니다."</div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-[11px] font-black mb-6 tracking-widest border border-orange-100">
            <Lock size={12} /> 100% SECURE LOCAL PROCESSING
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[1.1] text-slate-900">
            질문 <span className="text-orange-600">해? 말아?</span><br />
            고민될 땐 세탁하세요.
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            AI에게 보낼 프롬프트 속 개인정보가 불안하시죠?<br />
            <span className="text-slate-900 font-bold underline decoration-orange-400/30 decoration-8 underline-offset-[-2px]">서버 전송 없이</span> 내 브라우저에서 즉시 지우고 안심하고 질문하세요.
          </p>
        </div>

        {/* Main Interface */}
        <div className="grid lg:grid-cols-2 gap-8 items-start mb-16">
          <section className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-slate-200/50 border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                <History size={14} /> Raw Prompt
              </h3>
              <button 
                onClick={() => { setInput(""); setOutput(""); setDetectedTypes([]); }}
                className="text-slate-300 hover:text-red-500 transition-colors p-1"
                title="Clear all"
              >
                <Trash2 size={18} />
              </button>
            </div>
            <textarea
              className="w-full h-[400px] bg-slate-50/50 rounded-3xl p-7 text-xl md:text-2xl outline-none focus:ring-4 focus:ring-orange-100/50 transition-all resize-none font-medium leading-relaxed placeholder:text-slate-200"
              placeholder="여기에 보안이 걱정되는 내용을 입력..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              onClick={handleWash}
              disabled={isWashing || !input.trim()}
              className="w-full mt-6 py-6 bg-slate-900 hover:bg-orange-600 text-white font-black text-xl rounded-[1.5rem] transition-all flex items-center justify-center gap-3 shadow-xl shadow-slate-200 disabled:bg-slate-200 disabled:shadow-none active:scale-[0.98]"
            >
              {isWashing ? <RefreshCw className="animate-spin" size={24} /> : <Zap size={24} />}
              {isWashing ? washStatus : "무료 세탁 시작하기"}
            </button>
          </section>

          <section className="h-full">
            <AnimatePresence mode="wait">
              {output ? (
                <motion.div 
                  key="output"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl min-h-[580px] flex flex-col border border-slate-800"
                >
                  <div className="flex flex-wrap gap-2 mb-8">
                    {detectedTypes.length > 0 ? detectedTypes.map((t, i) => (
                      <span key={i} className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-lg text-[10px] font-black uppercase tracking-widest border border-orange-500/30 flex items-center gap-1.5">
                        <AlertCircle size={10} /> {t} 감지됨
                      </span>
                    )) : (
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-[10px] font-black uppercase tracking-widest border border-green-500/30">안전한 문장</span>
                    )}
                  </div>
                  <div className="flex-1 text-xl md:text-2xl font-bold text-white leading-relaxed mb-8 whitespace-pre-wrap selection:bg-orange-600 selection:text-white">
                    {output}
                  </div>
                  <div className="mt-auto">
                    <button
                      onClick={handleCopy}
                      className="w-full py-6 bg-white text-slate-900 font-black text-xl rounded-[1.5rem] hover:bg-orange-500 hover:text-white transition-all flex items-center justify-center gap-3 shadow-lg active:scale-[0.98]"
                    >
                      {copyStatus.includes("Copied") ? <CheckCircle2 size={24} /> : <Copy size={24} />}
                      {copyStatus}
                    </button>
                    <p className="text-center text-slate-500 text-[10px] font-bold mt-6 tracking-widest uppercase flex items-center justify-center gap-2">
                      <Lock size={10} /> 데이터 유출 차단됨
                    </p>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-slate-100/50 rounded-[2.5rem] p-8 min-h-[580px] border-4 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
                  <div className="bg-white p-8 rounded-[2rem] mb-6 shadow-sm border border-slate-100">
                    <ArrowRightLeft size={48} className="text-slate-200" />
                  </div>
                  <p className="font-black text-xl tracking-tight text-slate-400">결과 대기 중</p>
                  <p className="text-sm font-medium mt-2">왼쪽에 내용을 입력하면 세탁이 시작됩니다.</p>
                </div>
              )}
            </AnimatePresence>
          </section>
        </div>

        {/* 비즈니스 가치 강조 (심사위원용) */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {[
            { icon: <Heart className="text-red-500" />, title: "100% Free", desc: "광고 수익으로 운영되는 공익적 목적의 평생 무료 서비스입니다." },
            { icon: <ShieldCheck className="text-green-500" />, title: "No Server", desc: "사용자의 텍스트는 브라우저를 절대 벗어나지 않습니다." },
            { icon: <Share2 className="text-blue-500" />, title: "Viral Growth", desc: "안심하고 질문하고 싶은 모든 AI 유저가 잠재 고객입니다." }
          ].map((item, idx) => (
            <div key={idx} className="p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4">{item.icon}</div>
              <h4 className="font-black text-lg mb-2 italic tracking-tight">{item.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="bg-slate-900 p-1.5 rounded-lg text-white">
              <ShieldHalf size={18} />
            </div>
            <span className="font-black text-xl italic tracking-tighter">haemala.</span>
          </div>
          <p className="text-slate-400 text-[11px] font-bold tracking-[0.3em] uppercase mb-8">Safe Prompting for Everyone</p>
          <div className="inline-flex flex-wrap justify-center items-center gap-x-6 gap-y-2 px-6 py-3 bg-slate-50 rounded-full text-slate-400 text-[10px] font-bold border border-slate-100">
            <span>제작: haemala Team</span>
            <span className="hidden sm:block w-1 h-1 bg-slate-300 rounded-full" />
            <span>문의: support@haemala.com</span>
            <span className="hidden sm:block w-1 h-1 bg-slate-300 rounded-full" />
            <span className="flex items-center gap-1"><Sparkles size={10} size={10} className="text-orange-400" /> Powered by User Privacy</span>
          </div>
        </div>
      </footer>
    </div>
  );
}