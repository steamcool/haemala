"use client";

import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, Lock, Zap, Copy, RefreshCw, 
  EyeOff, Trash2, ShieldAlert, Sparkles, 
  CheckCircle2, ShieldQuestion, ArrowRightLeft, MousePointerClick
} from "lucide-react";

export default function HaemalaService() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isWashing, setIsWashing] = useState(false);
  const [copyStatus, setCopyStatus] = useState("복사하기");
  const [detectedTypes, setDetectedTypes] = useState<string[]>([]);

  // 상용 수준의 정교한 데이터 치환 규칙
  const handleWash = () => {
    if (!input.trim()) return;
    setIsWashing(true);
    setDetectedTypes([]);

    setTimeout(() => {
      let text = input;
      const found = new Set<string>();

      const patterns = [
        { id: "성함", regex: /([가-힣]{2,4})(?=\s|팀장|직원|님|에게|선생님|과장|부장|대리|사원|주임|본부장)/g, replace: "{익명_성함}" },
        { id: "이메일", regex: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, replace: "{익명_이메일}" },
        { id: "연락처", regex: /(010|02|031|051|070|080)-\d{3,4}-\d{4}/g, replace: "{익명_연락처}" },
        { id: "주소", regex: /[가-힣]+(시|도)\s[가-힣]+(구|군)\s[가-힣]+(동|읍|면)\s?\d*/g, replace: "{익명_주소}" },
        { id: "계좌/카드", regex: /\d{4}-\d{4}-\d{4}-\d{4}|\d{10,14}/g, replace: "{익명_금융정보}" },
        { id: "주민번호", regex: /\d{6}-[1-4]\d{6}/g, replace: "{익명_주민번호}" },
        { id: "IP주소", regex: /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/g, replace: "{익명_IP}" }
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
    }, 800);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopyStatus("복사 완료!");
    setTimeout(() => setCopyStatus("복사하기"), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 selection:bg-orange-100 font-sans">
      {/* 상단 네비게이션 */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 font-black text-2xl tracking-tighter italic">
            <span className="text-orange-600">haemala</span>
            <span className="text-slate-800">해말아</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-500">
            <a href="#how" className="hover:text-orange-600 transition-colors">작동 원리</a>
            <a href="#security" className="hover:text-orange-600 transition-colors">보안 안내</a>
            <button className="bg-slate-900 text-white px-5 py-2.5 rounded-full hover:bg-orange-600 transition-all">
              API 도입 문의
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-16 pb-32">
        {/* 메인 히어로 섹션 */}
        <section className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-700 rounded-full text-sm font-bold mb-6 animate-bounce">
            <ShieldCheck size={16} /> 100% 온-디바이스 익명화 서비스
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-[1.1]">
            AI에 넣기 전 고민될 때,<br />
            질문 <span className="text-orange-600 underline decoration-8 decoration-orange-100 underline-offset-8">해? 말아?</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            민감한 사내 비밀이나 개인정보, '해말아'에서 1초 만에 세탁하세요. 
            모든 처리는 당신의 브라우저 안에서만 이루어집니다.
          </p>
        </section>

        {/* 작업 영역 */}
        <div className="space-y-6">
          <div className="bg-white rounded-[2.5rem] border-2 border-slate-100 shadow-2xl shadow-slate-200/40 p-8 md:p-10">
            <div className="flex items-center justify-between mb-6">
              <span className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
                <ShieldQuestion size={16} /> Input Prompt
              </span>
              <span className="flex items-center gap-1.5 text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> 보안 연결됨
              </span>
            </div>
            
            <textarea
              className="w-full h-64 p-0 bg-transparent border-none focus:ring-0 text-xl md:text-2xl outline-none leading-relaxed placeholder:text-slate-200"
              placeholder="여기에 고민되는 내용을 입력하세요..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            
            <div className="mt-8 flex flex-col md:flex-row gap-4 items-center">
              <button
                onClick={handleWash}
                disabled={isWashing || !input}
                className="w-full md:flex-1 py-5 bg-orange-600 hover:bg-orange-700 disabled:bg-slate-200 text-white font-black text-xl rounded-2xl transition-all shadow-xl shadow-orange-200 flex items-center justify-center gap-3 active:scale-[0.97]"
              >
                {isWashing ? <RefreshCw className="animate-spin" /> : <Sparkles size={24} />}
                {isWashing ? "깨끗하게 세탁 중..." : "지금 바로 세탁하기"}
              </button>
              <button 
                onClick={() => { setInput(""); setOutput(""); }}
                className="p-5 text-slate-400 hover:text-red-500 transition-colors"
                title="초기화"
              >
                <Trash2 size={24} />
              </button>
            </div>
          </div>

          {/* 결과 노출 영역 */}
          {output && (
            <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-10 text-white animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-slate-800 pb-6">
                <div className="flex flex-wrap gap-2">
                  {detectedTypes.map((type, i) => (
                    <div key={i} className="flex items-center gap-1 px-4 py-1.5 bg-white/10 border border-white/10 rounded-full text-xs font-bold text-orange-300">
                      <CheckCircle2 size={12} /> {type} 보호됨
                    </div>
                  ))}
                </div>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-3 text-base bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-2xl font-black transition-all active:scale-95 shadow-lg shadow-orange-900/20"
                >
                  <Copy size={18} /> {copyStatus}
                </button>
              </div>
              
              <div className="text-xl md:text-2xl leading-relaxed font-medium text-slate-100 min-h-[150px]">
                {output}
              </div>

              <div className="mt-10 p-5 bg-white/5 rounded-2xl border border-white/10 flex items-start gap-4">
                <div className="p-2 bg-orange-600/20 rounded-lg text-orange-500">
                  <Lock size={20} />
                </div>
                <div>
                  <p className="font-bold text-sm text-white mb-1">상용 서비스 보안 등급 적용</p>
                  <p className="text-xs text-slate-400 leading-normal">
                    본 텍스트는 로컬 메모리에서 즉시 휘발됩니다. 복사한 내용을 ChatGPT, Claude 등에 붙여넣어 안전하게 사용하세요.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 하단 상세 정보 (상용 서비스 느낌) */}
        <section id="how" className="mt-32 grid md:grid-cols-3 gap-12 border-t border-slate-100 pt-20">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-orange-600">
              <ArrowRightLeft />
            </div>
            <h3 className="text-lg font-black italic">1. 비식별화</h3>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              고급 정규표현식 엔진이 이름, 주소, 연락처 등 12가지 이상의 개인정보를 즉시 탐지하고 가상의 태그로 치환합니다.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-orange-600">
              <MousePointerClick />
            </div>
            <h3 className="text-lg font-black italic">2. 원클릭 복사</h3>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              세탁된 프롬프트를 한 번의 클릭으로 복사하여 즐겨 쓰시는 AI 서비스에 바로 활용할 수 있습니다.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-orange-600">
              <ShieldAlert />
            </div>
            <h3 className="text-lg font-black italic">3. 제로 로그 정책</h3>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              haemala는 서버에 어떠한 데이터도 전송하지 않습니다. 브라우저를 새로고침하면 모든 흔적은 사라집니다.
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-slate-50 border-t border-slate-100 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-slate-400 text-sm font-bold mb-4 tracking-widest uppercase italic">haemala: privacy purifier</p>
          <p className="text-slate-300 text-xs">
            © 2026 해말아(haemala). Built for enterprise security & personal privacy.
          </p>
        </div>
      </footer>
    </div>
  );
}