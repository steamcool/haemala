"use client";

import React, { useState } from "react";
import { 
  Lock, Zap, Copy, RefreshCw, 
  Trash2, ShieldAlert, Sparkles, CheckCircle2, 
  ArrowRightLeft, ShieldHalf, ChevronRight, History,
  Info, ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function HaemalaFinal() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isWashing, setIsWashing] = useState(false);
  const [copyStatus, setCopyStatus] = useState("Copy Result");
  const [detectedTypes, setDetectedTypes] = useState<string[]>([]);
  const [washStatus, setWashStatus] = useState("WASHING...");

  const statusMessages = [
    "문장 구조 분석 중...",
    "개인 식별 정보 탐색 중...",
    "데이터 마스킹 엔진 가동 중...",
    "안전한 프롬프트 생성 중..."
  ];

  const handleWash = () => {
    if (!input.trim()) return;
    setIsWashing(true);
    
    let msgIndex = 0;
    const interval = setInterval(() => {
      msgIndex = (msgIndex + 1) % statusMessages.length;
      setWashStatus(statusMessages[msgIndex]);
    }, 400);

    setTimeout(() => {
      clearInterval(interval);
      let text = input;
      const found = new Set<string>();

      const patterns = [
        { id: "NAME", regex: /([가-힣]{2,4})(?=\s|팀장|직원|님|에게|선생님|과장|부장|대리|사원|주임|본부장)/g, replace: "{NAME_MASKED}" },
        { id: "EMAIL", regex: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, replace: "{EMAIL_MASKED}" },
        { id: "PHONE", regex: /(010|02|031|051|070|080)-\d{3,4}-\d{4}/g, replace: "{PHONE_MASKED}" },
        { id: "LOCATION", regex: /[가-힣]+(시|도)\s[가-힣]+(구|군)\s[가-힣]+(동|읍|면)\s?\d*/g, replace: "{LOCATION_MASKED}" },
        { id: "FINANCE", regex: /\d{4}-\d{4}-\d{4}-\d{4}|\d{10,14}|\d{6}-[1-4]\d{6}/g, replace: "{SENSITIVE_DATA_MASKED}" }
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
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-orange-100">
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-orange-600 p-1.5 rounded-xl text-white shadow-lg shadow-orange-200 group-hover:scale-110 transition-transform">
              <ShieldHalf size={20} />
            </div>
            <span className="font-black text-xl tracking-tighter italic">haemala<span className="text-orange-600">.</span></span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 rounded-full border border-green-100">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-wider">Local Engine Active</span>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-24">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-[11px] font-black mb-6 tracking-widest border border-orange-100 flex items-center gap-2">
            <Lock size={12} /> END-TO-END CLIENT SIDE PRIVACY
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[1.1]">
            질문 <span className="text-orange-600">해? 말아?</span><br />
            고민될 땐 세탁하세요.
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-2xl leading-relaxed">
            AI에게 보낼 프롬프트 속 <span className="text-slate-900 font-bold underline decoration-orange-300 decoration-4">개인정보를 1초 만에 식별하고 제거</span>합니다.<br />
            입력한 데이터는 절대 서버로 전송되지 않으며 브라우저에서 즉시 파기됩니다.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <section className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-slate-200/60 border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                <History size={14} /> Raw Prompt
              </h3>
              <button onClick={() => {setInput(""); setOutput(""); setDetectedTypes([]);}} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all">
                <Trash2 size={18} />
              </button>
            </div>
            <textarea
              className="w-full h-[420px] bg-slate-50/30 rounded-3xl p-6 text-xl outline-none focus:ring-4 focus:ring-orange-50 transition-all resize-none font-medium leading-relaxed placeholder:text-slate-300"
              placeholder="여기에 보안이 걱정되는 내용을 입력하세요..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={handleWash} disabled={isWashing || !input} className="w-full mt-6 py-5 bg-slate-900 hover:bg-orange-600 text-white font-black text-xl rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl disabled:bg-slate-200 group">
              {isWashing ? <RefreshCw className="animate-spin" size={24} /> : <Zap size={24} className="group-hover:animate-pulse" />}
              {isWashing ? washStatus : "SAFE WASH START"}
            </button>
          </section>

          <section className="relative h-full">
            <AnimatePresence mode="wait">
              {output ? (
                <motion.div key="output" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl min-h-[600px] flex flex-col border border-slate-800">
                  <div className="flex flex-wrap gap-2 mb-8">
                    {detectedTypes.map((t, i) => (
                      <span key={i} className="px-3 py-1 bg-orange-500/10 text-orange-400 rounded-lg text-[10px] font-black uppercase tracking-wider border border-orange-500/20">{t} PROTECTED</span>
                    ))}
                  </div>
                  <div className="flex-1 text-xl md:text-2xl font-bold text-white leading-relaxed mb-8 whitespace-pre-wrap">{output}</div>
                  <div className="mt-auto space-y-4">
                    <button onClick={() => { navigator.clipboard.writeText(output); setCopyStatus("Copied!"); setTimeout(() => setCopyStatus("Copy Result"), 2000); }} className="w-full py-5 bg-white text-slate-900 font-black text-xl rounded-2xl hover:bg-orange-500 hover:text-white transition-all flex items-center justify-center gap-3 shadow-lg">
                      {copyStatus === "Copied!" ? <CheckCircle2 size={24} /> : <Copy size={24} />} {copyStatus}
                    </button>
                    <div className="flex items-center justify-center gap-4 text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                      <span className="flex items-center gap-1"><Lock size={10} /> Client-Side Only</span>
                      <span className="w-1 h-1 bg-slate-700 rounded-full" />
                      <span className="flex items-center gap-1"><ShieldCheck size={10} /> Zero Tracking</span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-slate-100/50 rounded-[2.5rem] p-8 min-h-[600px] border-4 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
                  <div className="bg-white p-8 rounded-[2rem] mb-6 shadow-sm border border-slate-200"><ArrowRightLeft size={48} className="text-slate-200" /></div>
                  <p className="font-black text-xl tracking-tight text-slate-500">대기 중...</p>
                  <p className="text-sm font-medium mt-2 text-center">내용을 입력하고 세탁을 시작하세요.</p>
                </div>
              )}
            </AnimatePresence>
          </section>
        </div>
      </main>

      <footer className="py-24 bg-white border-t border-slate-100 text-center">
        <div className="flex items-center justify-center gap-2 mb-8 font-black text-2xl italic tracking-tighter">
          <div className="bg-slate-900 p-2 rounded-lg text-white"><ShieldAlert size={20} /></div>
          <span>haemala.</span>
        </div>
        <p className="text-slate-400 text-[12px] font-bold tracking-[0.3em] uppercase mb-8">Safe AI Prompting Starts Here.</p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full text-slate-400 text-[10px] font-bold border border-slate-100">
          <Info size={12} /> 본 서비스는 데이터를 저장하지 않으며 개인정보 보호를 위해 제작되었습니다.
        </div>
      </footer>
    </div>
  );
}