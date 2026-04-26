export type MbtiType = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

export type AiType =
  | "PROMPT"
  | "TOOL"
  | "STRUCTURE"
  | "VERIFY"
  | "AUTO"
  | "EXPERIMENT";

export type Question = {
  id: number;
  section: "MBTI" | "AI";
  category: "EI" | "SN" | "TF" | "JP" | AiType;
  question: string;
  options: {
    text: string;
    target: MbtiType | AiType;
    score: number;
  }[];
};

export const questions: Question[] = [
  // MBTI EI 12
  { id: 1, section: "MBTI", category: "EI", question: "사람 많은 모임에 가면 나는?", options: [{ text: "먼저 말을 걸고 분위기를 탄다", target: "E", score: 1 }, { text: "조용히 관찰하다가 천천히 섞인다", target: "I", score: 1 }] },
  { id: 2, section: "MBTI", category: "EI", question: "쉬는 날 에너지를 채우는 방식은?", options: [{ text: "사람을 만나며 기분이 살아난다", target: "E", score: 1 }, { text: "혼자 있어야 다시 힘이 난다", target: "I", score: 1 }] },
  { id: 3, section: "MBTI", category: "EI", question: "고민이 생기면 보통?", options: [{ text: "누군가에게 말하면서 정리한다", target: "E", score: 1 }, { text: "혼자 생각하면서 정리한다", target: "I", score: 1 }] },
  { id: 4, section: "MBTI", category: "EI", question: "처음 보는 사람과 있을 때 나는?", options: [{ text: "먼저 질문하거나 대화를 연다", target: "E", score: 1 }, { text: "상대의 반응을 먼저 본다", target: "I", score: 1 }] },
  { id: 5, section: "MBTI", category: "EI", question: "갑자기 약속이 취소되면?", options: [{ text: "다른 사람을 찾아본다", target: "E", score: 1 }, { text: "잘됐다 싶어 혼자 쉰다", target: "I", score: 1 }] },
  { id: 6, section: "MBTI", category: "EI", question: "하루가 끝난 뒤 나는?", options: [{ text: "누군가와 대화하고 싶다", target: "E", score: 1 }, { text: "조용히 혼자 있고 싶다", target: "I", score: 1 }] },
  { id: 7, section: "MBTI", category: "EI", question: "팀 활동에서 나는?", options: [{ text: "의견을 내며 흐름을 만든다", target: "E", score: 1 }, { text: "필요한 순간에만 정확히 말한다", target: "I", score: 1 }] },
  { id: 8, section: "MBTI", category: "EI", question: "새로운 환경에 들어가면?", options: [{ text: "금방 사람들과 연결된다", target: "E", score: 1 }, { text: "적응할 시간이 필요하다", target: "I", score: 1 }] },
  { id: 9, section: "MBTI", category: "EI", question: "생각을 정리할 때 더 편한 방식은?", options: [{ text: "말하면서 정리하기", target: "E", score: 1 }, { text: "글이나 머릿속으로 정리하기", target: "I", score: 1 }] },
  { id: 10, section: "MBTI", category: "EI", question: "주말 계획을 세울 때 나는?", options: [{ text: "누구 만날지 먼저 생각한다", target: "E", score: 1 }, { text: "혼자 쉴 시간을 먼저 확보한다", target: "I", score: 1 }] },
  { id: 11, section: "MBTI", category: "EI", question: "낯선 자리에서 침묵이 생기면?", options: [{ text: "내가 먼저 말을 꺼낸다", target: "E", score: 1 }, { text: "굳이 깨지 않아도 괜찮다", target: "I", score: 1 }] },
  { id: 12, section: "MBTI", category: "EI", question: "내가 더 편한 소통 방식은?", options: [{ text: "바로 말하고 반응 보기", target: "E", score: 1 }, { text: "생각한 뒤 차분히 말하기", target: "I", score: 1 }] },

  // MBTI SN 12
  { id: 13, section: "MBTI", category: "SN", question: "설명을 들을 때 더 좋은 것은?", options: [{ text: "구체적인 예시와 방법", target: "S", score: 1 }, { text: "전체 흐름과 큰 그림", target: "N", score: 1 }] },
  { id: 14, section: "MBTI", category: "SN", question: "정보를 볼 때 나는?", options: [{ text: "사실, 숫자, 현재 조건을 본다", target: "S", score: 1 }, { text: "의미, 가능성, 흐름을 본다", target: "N", score: 1 }] },
  { id: 15, section: "MBTI", category: "SN", question: "새로운 일을 시작할 때?", options: [{ text: "검증된 방법부터 따라 한다", target: "S", score: 1 }, { text: "새로운 방식부터 떠올린다", target: "N", score: 1 }] },
  { id: 16, section: "MBTI", category: "SN", question: "문제를 볼 때 나는?", options: [{ text: "지금 당장 해결할 부분을 본다", target: "S", score: 1 }, { text: "앞으로 생길 가능성을 본다", target: "N", score: 1 }] },
  { id: 17, section: "MBTI", category: "SN", question: "배울 때 더 편한 방식은?", options: [{ text: "순서대로 하나씩 익히기", target: "S", score: 1 }, { text: "원리를 먼저 이해하기", target: "N", score: 1 }] },
  { id: 18, section: "MBTI", category: "SN", question: "아이디어를 낼 때 나는?", options: [{ text: "실제로 가능한 것을 생각한다", target: "S", score: 1 }, { text: "재밌고 새로운 것을 생각한다", target: "N", score: 1 }] },
  { id: 19, section: "MBTI", category: "SN", question: "대화에서 더 끌리는 주제는?", options: [{ text: "실제 경험과 현실 이야기", target: "S", score: 1 }, { text: "상상, 미래, 가능성 이야기", target: "N", score: 1 }] },
  { id: 20, section: "MBTI", category: "SN", question: "설명서가 있으면 나는?", options: [{ text: "단계대로 읽고 따라 한다", target: "S", score: 1 }, { text: "대충 원리를 보고 시도한다", target: "N", score: 1 }] },
  { id: 21, section: "MBTI", category: "SN", question: "사람을 볼 때 먼저 보이는 것은?", options: [{ text: "말, 행동, 실제 태도", target: "S", score: 1 }, { text: "분위기, 의도, 가능성", target: "N", score: 1 }] },
  { id: 22, section: "MBTI", category: "SN", question: "계획을 짤 때 나는?", options: [{ text: "현실적으로 가능한지 본다", target: "S", score: 1 }, { text: "더 좋은 방향이 있는지 본다", target: "N", score: 1 }] },
  { id: 23, section: "MBTI", category: "SN", question: "글을 읽을 때 나는?", options: [{ text: "정확한 내용과 근거를 본다", target: "S", score: 1 }, { text: "숨은 의미와 메시지를 본다", target: "N", score: 1 }] },
  { id: 24, section: "MBTI", category: "SN", question: "선택할 때 더 믿는 것은?", options: [{ text: "과거 경험과 실제 사례", target: "S", score: 1 }, { text: "직감과 앞으로의 가능성", target: "N", score: 1 }] },

  // MBTI TF 12
  { id: 25, section: "MBTI", category: "TF", question: "결정할 때 더 중요한 것은?", options: [{ text: "논리와 기준", target: "T", score: 1 }, { text: "사람의 감정과 관계", target: "F", score: 1 }] },
  { id: 26, section: "MBTI", category: "TF", question: "친구가 실수했을 때 나는?", options: [{ text: "문제점을 정확히 말해준다", target: "T", score: 1 }, { text: "먼저 괜찮은지 살핀다", target: "F", score: 1 }] },
  { id: 27, section: "MBTI", category: "TF", question: "의견 충돌이 생기면?", options: [{ text: "맞는 쪽을 찾으려 한다", target: "T", score: 1 }, { text: "상처가 적은 쪽을 찾으려 한다", target: "F", score: 1 }] },
  { id: 28, section: "MBTI", category: "TF", question: "일할 때 더 신경 쓰는 것은?", options: [{ text: "효율과 결과", target: "T", score: 1 }, { text: "분위기와 협력", target: "F", score: 1 }] },
  { id: 29, section: "MBTI", category: "TF", question: "칭찬보다 더 도움이 되는 것은?", options: [{ text: "정확한 피드백", target: "T", score: 1 }, { text: "따뜻한 격려", target: "F", score: 1 }] },
  { id: 30, section: "MBTI", category: "TF", question: "규칙을 어긴 사람이 있으면?", options: [{ text: "기준에 따라 판단한다", target: "T", score: 1 }, { text: "사정이 있었는지 본다", target: "F", score: 1 }] },
  { id: 31, section: "MBTI", category: "TF", question: "누군가 고민을 말하면 나는?", options: [{ text: "해결 방법부터 찾는다", target: "T", score: 1 }, { text: "감정을 먼저 받아준다", target: "F", score: 1 }] },
  { id: 32, section: "MBTI", category: "TF", question: "어려운 선택 앞에서 나는?", options: [{ text: "손익과 근거를 계산한다", target: "T", score: 1 }, { text: "마음이 불편하지 않은지 본다", target: "F", score: 1 }] },
  { id: 33, section: "MBTI", category: "TF", question: "토론할 때 나는?", options: [{ text: "논리가 맞는지 따진다", target: "T", score: 1 }, { text: "말투와 분위기도 중요하다", target: "F", score: 1 }] },
  { id: 34, section: "MBTI", category: "TF", question: "팀에서 갈등이 생기면?", options: [{ text: "원인과 책임을 정리한다", target: "T", score: 1 }, { text: "서로 감정을 풀게 한다", target: "F", score: 1 }] },
  { id: 35, section: "MBTI", category: "TF", question: "내가 더 자주 듣는 말은?", options: [{ text: "현실적이고 냉정하다", target: "T", score: 1 }, { text: "다정하고 공감해준다", target: "F", score: 1 }] },
  { id: 36, section: "MBTI", category: "TF", question: "선택 기준으로 더 가까운 것은?", options: [{ text: "공정함", target: "T", score: 1 }, { text: "배려", target: "F", score: 1 }] },

  // MBTI JP 12
  { id: 37, section: "MBTI", category: "JP", question: "여행을 간다면 나는?", options: [{ text: "일정을 어느 정도 짜둔다", target: "J", score: 1 }, { text: "그때그때 끌리는 대로 간다", target: "P", score: 1 }] },
  { id: 38, section: "MBTI", category: "JP", question: "마감이 있는 일은?", options: [{ text: "미리 끝내야 마음이 편하다", target: "J", score: 1 }, { text: "막판 집중력이 더 잘 나온다", target: "P", score: 1 }] },
  { id: 39, section: "MBTI", category: "JP", question: "일상에서 나는?", options: [{ text: "정리된 상태가 편하다", target: "J", score: 1 }, { text: "자유로운 상태가 편하다", target: "P", score: 1 }] },
  { id: 40, section: "MBTI", category: "JP", question: "계획이 갑자기 바뀌면?", options: [{ text: "스트레스를 받는다", target: "J", score: 1 }, { text: "새로운 재미가 생긴다", target: "P", score: 1 }] },
  { id: 41, section: "MBTI", category: "JP", question: "할 일이 많을 때 나는?", options: [{ text: "순서대로 정리해서 처리한다", target: "J", score: 1 }, { text: "끌리는 것부터 처리한다", target: "P", score: 1 }] },
  { id: 42, section: "MBTI", category: "JP", question: "결정을 내릴 때 나는?", options: [{ text: "빨리 정하고 끝내고 싶다", target: "J", score: 1 }, { text: "가능성을 더 열어두고 싶다", target: "P", score: 1 }] },
  { id: 43, section: "MBTI", category: "JP", question: "내 방이나 책상은?", options: [{ text: "정리되어 있어야 편하다", target: "J", score: 1 }, { text: "조금 어질러져도 괜찮다", target: "P", score: 1 }] },
  { id: 44, section: "MBTI", category: "JP", question: "약속 시간은?", options: [{ text: "미리 도착하는 편이다", target: "J", score: 1 }, { text: "딱 맞거나 조금 늦을 때도 있다", target: "P", score: 1 }] },
  { id: 45, section: "MBTI", category: "JP", question: "쇼핑할 때 나는?", options: [{ text: "필요한 걸 정하고 산다", target: "J", score: 1 }, { text: "보다가 마음에 들면 산다", target: "P", score: 1 }] },
  { id: 46, section: "MBTI", category: "JP", question: "공부나 일을 시작할 때?", options: [{ text: "계획표나 순서를 만든다", target: "J", score: 1 }, { text: "일단 시작하고 조정한다", target: "P", score: 1 }] },
  { id: 47, section: "MBTI", category: "JP", question: "갑작스러운 제안이 오면?", options: [{ text: "일정부터 확인한다", target: "J", score: 1 }, { text: "재밌으면 바로 간다", target: "P", score: 1 }] },
  { id: 48, section: "MBTI", category: "JP", question: "나는 보통?", options: [{ text: "정해진 틀이 있을 때 편하다", target: "J", score: 1 }, { text: "선택지가 열려 있을 때 편하다", target: "P", score: 1 }] },

  // AI PROMPT 8
  { id: 49, section: "AI", category: "PROMPT", question: "AI에게 질문할 때 나는?", options: [{ text: "짧게 한 문장으로 묻는다", target: "PROMPT", score: 1 }, { text: "조건과 원하는 결과를 같이 말한다", target: "PROMPT", score: 3 }] },
  { id: 50, section: "AI", category: "PROMPT", question: "AI 답이 마음에 안 들면?", options: [{ text: "그냥 별로라고 생각하고 끝낸다", target: "PROMPT", score: 1 }, { text: "다시 고쳐달라고 구체적으로 말한다", target: "PROMPT", score: 3 }] },
  { id: 51, section: "AI", category: "PROMPT", question: "글을 부탁할 때 나는?", options: [{ text: "그냥 써달라고 한다", target: "PROMPT", score: 1 }, { text: "톤, 길이, 대상, 형식을 지정한다", target: "PROMPT", score: 3 }] },
  { id: 52, section: "AI", category: "PROMPT", question: "좋은 답을 얻기 위해 나는?", options: [{ text: "한 번 질문하고 끝낸다", target: "PROMPT", score: 1 }, { text: "질문을 바꿔가며 답을 개선한다", target: "PROMPT", score: 3 }] },
  { id: 53, section: "AI", category: "PROMPT", question: "AI에게 어려운 일을 시킬 때?", options: [{ text: "그냥 전체를 맡긴다", target: "PROMPT", score: 1 }, { text: "역할과 목표를 먼저 정해준다", target: "PROMPT", score: 3 }] },
  { id: 54, section: "AI", category: "PROMPT", question: "원하는 답이 애매할 때?", options: [{ text: "AI가 알아서 해주길 바란다", target: "PROMPT", score: 1 }, { text: "예시를 주고 비슷하게 해달라고 한다", target: "PROMPT", score: 3 }] },
  { id: 55, section: "AI", category: "PROMPT", question: "프롬프트를 쓸 때 나는?", options: [{ text: "생각나는 대로 적는다", target: "PROMPT", score: 1 }, { text: "목적, 조건, 출력 형식을 나눈다", target: "PROMPT", score: 3 }] },
  { id: 56, section: "AI", category: "PROMPT", question: "AI가 너무 길게 답하면?", options: [{ text: "그냥 참고 읽는다", target: "PROMPT", score: 1 }, { text: "짧게, 표로, 핵심만 다시 요청한다", target: "PROMPT", score: 3 }] },

  // AI TOOL 8
  { id: 57, section: "AI", category: "TOOL", question: "AI를 주로 어떻게 쓰나?", options: [{ text: "검색처럼만 쓴다", target: "TOOL", score: 1 }, { text: "글쓰기, 요약, 기획, 정리에도 쓴다", target: "TOOL", score: 3 }] },
  { id: 58, section: "AI", category: "TOOL", question: "새로운 AI 기능이 보이면?", options: [{ text: "필요할 때만 본다", target: "TOOL", score: 1 }, { text: "일단 눌러보고 뭐가 되는지 확인한다", target: "TOOL", score: 3 }] },
  { id: 59, section: "AI", category: "TOOL", question: "AI 활용 범위는?", options: [{ text: "한두 가지 용도에 가깝다", target: "TOOL", score: 1 }, { text: "여러 상황에 맞게 바꿔 쓴다", target: "TOOL", score: 3 }] },
  { id: 60, section: "AI", category: "TOOL", question: "이미지, 음성, 문서 AI를 보면?", options: [{ text: "복잡해 보여서 잘 안 쓴다", target: "TOOL", score: 1 }, { text: "무엇에 쓸 수 있을지 시험해본다", target: "TOOL", score: 3 }] },
  { id: 61, section: "AI", category: "TOOL", question: "일할 때 AI는?", options: [{ text: "가끔 도움받는 보조도구", target: "TOOL", score: 1 }, { text: "작업 속도를 바꾸는 핵심도구", target: "TOOL", score: 3 }] },
  { id: 62, section: "AI", category: "TOOL", question: "새 도구를 배울 때 나는?", options: [{ text: "설명서를 봐야 안심된다", target: "TOOL", score: 1 }, { text: "직접 만져보며 익힌다", target: "TOOL", score: 3 }] },
  { id: 63, section: "AI", category: "TOOL", question: "AI 앱이나 기능을 고를 때?", options: [{ text: "유명한 것 하나만 쓴다", target: "TOOL", score: 1 }, { text: "목적에 따라 여러 도구를 비교한다", target: "TOOL", score: 3 }] },
  { id: 64, section: "AI", category: "TOOL", question: "AI를 써서 해보고 싶은 것은?", options: [{ text: "간단한 답 찾기", target: "TOOL", score: 1 }, { text: "내 일이나 공부 방식 바꾸기", target: "TOOL", score: 3 }] },

  // AI STRUCTURE 8
  { id: 65, section: "AI", category: "STRUCTURE", question: "복잡한 일을 AI에게 맡길 때?", options: [{ text: "한 번에 크게 부탁한다", target: "STRUCTURE", score: 1 }, { text: "단계별로 나눠서 시킨다", target: "STRUCTURE", score: 3 }] },
  { id: 66, section: "AI", category: "STRUCTURE", question: "생각이 많아질 때 나는?", options: [{ text: "그냥 머릿속으로 버틴다", target: "STRUCTURE", score: 1 }, { text: "AI에게 목록이나 표로 정리시킨다", target: "STRUCTURE", score: 3 }] },
  { id: 67, section: "AI", category: "STRUCTURE", question: "긴 글을 처리할 때?", options: [{ text: "처음부터 끝까지 직접 읽는다", target: "STRUCTURE", score: 1 }, { text: "AI로 요약 후 필요한 부분을 본다", target: "STRUCTURE", score: 3 }] },
  { id: 68, section: "AI", category: "STRUCTURE", question: "아이디어가 많을 때?", options: [{ text: "그냥 떠오르는 대로 둔다", target: "STRUCTURE", score: 1 }, { text: "AI에게 분류하고 우선순위를 매기게 한다", target: "STRUCTURE", score: 3 }] },
  { id: 69, section: "AI", category: "STRUCTURE", question: "문제가 막히면?", options: [{ text: "계속 같은 방식으로 고민한다", target: "STRUCTURE", score: 1 }, { text: "AI에게 원인, 해결책, 순서로 나눠달라고 한다", target: "STRUCTURE", score: 3 }] },
  { id: 70, section: "AI", category: "STRUCTURE", question: "계획을 세울 때 AI를 쓴다면?", options: [{ text: "대략적인 조언만 받는다", target: "STRUCTURE", score: 1 }, { text: "단계, 기간, 체크리스트로 바꾼다", target: "STRUCTURE", score: 3 }] },
  { id: 71, section: "AI", category: "STRUCTURE", question: "복잡한 자료를 받으면?", options: [{ text: "직접 읽으며 감으로 이해한다", target: "STRUCTURE", score: 1 }, { text: "AI에게 핵심 구조를 뽑게 한다", target: "STRUCTURE", score: 3 }] },
  { id: 72, section: "AI", category: "STRUCTURE", question: "해야 할 일이 많을 때?", options: [{ text: "일단 손에 잡히는 것부터 한다", target: "STRUCTURE", score: 1 }, { text: "AI에게 할 일 목록과 순서를 만들게 한다", target: "STRUCTURE", score: 3 }] },

  // AI VERIFY 8
  { id: 73, section: "AI", category: "VERIFY", question: "AI가 알려준 정보를 보면?", options: [{ text: "대체로 맞겠지 하고 쓴다", target: "VERIFY", score: 1 }, { text: "중요한 내용은 한 번 더 확인한다", target: "VERIFY", score: 3 }] },
  { id: 74, section: "AI", category: "VERIFY", question: "AI가 자신 있게 말했는데 이상하면?", options: [{ text: "AI가 말했으니 맞을 수도 있다고 본다", target: "VERIFY", score: 1 }, { text: "근거를 묻거나 다시 검증한다", target: "VERIFY", score: 3 }] },
  { id: 75, section: "AI", category: "VERIFY", question: "중요한 결정을 AI 답변으로 할 때?", options: [{ text: "답이 그럴듯하면 참고한다", target: "VERIFY", score: 1 }, { text: "다른 자료와 비교한 뒤 판단한다", target: "VERIFY", score: 3 }] },
  { id: 76, section: "AI", category: "VERIFY", question: "AI가 만든 글을 제출해야 한다면?", options: [{ text: "그대로 제출해도 괜찮다고 본다", target: "VERIFY", score: 1 }, { text: "틀린 내용과 어색한 표현을 확인한다", target: "VERIFY", score: 3 }] },
  { id: 77, section: "AI", category: "VERIFY", question: "AI 답변의 출처가 없으면?", options: [{ text: "내용이 맞아 보이면 그냥 쓴다", target: "VERIFY", score: 1 }, { text: "출처나 근거를 다시 요구한다", target: "VERIFY", score: 3 }] },
  { id: 78, section: "AI", category: "VERIFY", question: "숫자나 날짜가 나온 답변은?", options: [{ text: "그대로 믿는 편이다", target: "VERIFY", score: 1 }, { text: "특히 더 확인하는 편이다", target: "VERIFY", score: 3 }] },
  { id: 79, section: "AI", category: "VERIFY", question: "AI 답변이 너무 완벽해 보이면?", options: [{ text: "좋은 답이라고 생각한다", target: "VERIFY", score: 1 }, { text: "혹시 빠진 점이 있는지 물어본다", target: "VERIFY", score: 3 }] },
  { id: 80, section: "AI", category: "VERIFY", question: "AI를 쓸 때 내 태도는?", options: [{ text: "답을 받는 사람에 가깝다", target: "VERIFY", score: 1 }, { text: "답을 검사하는 사람에 가깝다", target: "VERIFY", score: 3 }] },

  // AI AUTO 8
  { id: 81, section: "AI", category: "AUTO", question: "반복되는 일이 있으면?", options: [{ text: "그냥 직접 한다", target: "AUTO", score: 1 }, { text: "AI로 줄일 수 있는지 생각한다", target: "AUTO", score: 3 }] },
  { id: 82, section: "AI", category: "AUTO", question: "긴 글을 요약해야 하면?", options: [{ text: "직접 읽고 줄인다", target: "AUTO", score: 1 }, { text: "AI에게 먼저 요약시킨다", target: "AUTO", score: 3 }] },
  { id: 83, section: "AI", category: "AUTO", question: "비슷한 문장을 여러 개 써야 하면?", options: [{ text: "하나씩 직접 쓴다", target: "AUTO", score: 1 }, { text: "AI에게 여러 버전으로 만들게 한다", target: "AUTO", score: 3 }] },
  { id: 84, section: "AI", category: "AUTO", question: "자료 정리가 필요하면?", options: [{ text: "내가 직접 정리한다", target: "AUTO", score: 1 }, { text: "AI에게 분류와 요약을 맡긴다", target: "AUTO", score: 3 }] },
  { id: 85, section: "AI", category: "AUTO", question: "시간이 부족할 때 나는?", options: [{ text: "속도를 내서 직접 처리한다", target: "AUTO", score: 1 }, { text: "AI에게 초안이나 뼈대를 맡긴다", target: "AUTO", score: 3 }] },
  { id: 86, section: "AI", category: "AUTO", question: "자주 반복하는 작업은?", options: [{ text: "익숙해서 그냥 한다", target: "AUTO", score: 1 }, { text: "템플릿이나 자동화로 바꾸고 싶다", target: "AUTO", score: 3 }] },
  { id: 87, section: "AI", category: "AUTO", question: "AI를 잘 쓰는 사람은?", options: [{ text: "답을 빨리 찾는 사람", target: "AUTO", score: 1 }, { text: "반복 작업을 줄이는 사람", target: "AUTO", score: 3 }] },
  { id: 88, section: "AI", category: "AUTO", question: "내가 AI에게 맡기고 싶은 것은?", options: [{ text: "간단한 질문 답변", target: "AUTO", score: 1 }, { text: "반복, 정리, 초안, 비교 작업", target: "AUTO", score: 3 }] },

  // AI EXPERIMENT 8
  { id: 89, section: "AI", category: "EXPERIMENT", question: "AI 결과가 애매하면?", options: [{ text: "그 정도면 됐다고 넘긴다", target: "EXPERIMENT", score: 1 }, { text: "표현, 형식, 길이를 바꿔 다시 시킨다", target: "EXPERIMENT", score: 3 }] },
  { id: 90, section: "AI", category: "EXPERIMENT", question: "새로운 AI 사용법을 보면?", options: [{ text: "나중에 필요하면 해본다", target: "EXPERIMENT", score: 1 }, { text: "바로 따라 해보며 감을 잡는다", target: "EXPERIMENT", score: 3 }] },
  { id: 91, section: "AI", category: "EXPERIMENT", question: "결과물을 만들 때 나는?", options: [{ text: "한 가지 버전만 만든다", target: "EXPERIMENT", score: 1 }, { text: "여러 버전을 만들고 비교한다", target: "EXPERIMENT", score: 3 }] },
  { id: 92, section: "AI", category: "EXPERIMENT", question: "AI가 이상한 답을 주면?", options: [{ text: "못 쓰겠다고 생각한다", target: "EXPERIMENT", score: 1 }, { text: "질문을 바꿔 다시 실험한다", target: "EXPERIMENT", score: 3 }] },
  { id: 93, section: "AI", category: "EXPERIMENT", question: "AI로 창작할 때 나는?", options: [{ text: "기본 답만 받는다", target: "EXPERIMENT", score: 1 }, { text: "분위기, 스타일, 대상을 바꿔본다", target: "EXPERIMENT", score: 3 }] },
  { id: 94, section: "AI", category: "EXPERIMENT", question: "AI 답변을 개선하는 과정은?", options: [{ text: "귀찮게 느껴진다", target: "EXPERIMENT", score: 1 }, { text: "점점 좋아지는 게 재밌다", target: "EXPERIMENT", score: 3 }] },
  { id: 95, section: "AI", category: "EXPERIMENT", question: "AI에게 같은 일을 여러 방식으로 시키는 것은?", options: [{ text: "시간 낭비 같다", target: "EXPERIMENT", score: 1 }, { text: "더 좋은 답을 찾는 과정이다", target: "EXPERIMENT", score: 3 }] },
  { id: 96, section: "AI", category: "EXPERIMENT", question: "나는 AI를?", options: [{ text: "필요할 때만 쓰는 도구로 본다", target: "EXPERIMENT", score: 1 }, { text: "계속 실험해볼 수 있는 파트너로 본다", target: "EXPERIMENT", score: 3 }] },
];

export const mbtiReports: Record<string, string> = {
  ENFP: "아이디어가 많고 사람과의 연결에서 에너지를 얻는 타입입니다. 새로운 가능성을 잘 보고, 재미있는 방향으로 빠르게 움직입니다.",
  ENTP: "새로운 생각과 토론을 좋아하는 타입입니다. 기존 방식보다 더 나은 방법을 찾는 데 강합니다.",
  INFP: "자기만의 가치와 감성이 뚜렷한 타입입니다. 의미 있는 일에 깊게 몰입할 때 힘이 납니다.",
  INTP: "분석과 이해를 좋아하는 타입입니다. 겉으로 드러난 답보다 원리와 구조를 파악하려 합니다.",
  ENFJ: "사람을 잘 이끌고 분위기를 읽는 타입입니다. 함께 성장하는 상황에서 강합니다.",
  ENTJ: "목표를 세우고 밀어붙이는 타입입니다. 계획, 실행, 성과에 강합니다.",
  INFJ: "깊은 통찰과 방향성을 가진 타입입니다. 사람과 의미를 함께 고려합니다.",
  INTJ: "전략적으로 생각하고 장기 계획을 세우는 타입입니다. 복잡한 문제를 구조화하는 데 강합니다.",
  ESFP: "순간의 즐거움과 경험을 중시하는 타입입니다. 분위기를 살리고 빠르게 적응합니다.",
  ESTP: "현실 감각이 좋고 행동이 빠른 타입입니다. 직접 부딪히며 답을 찾습니다.",
  ISFP: "감각적이고 조용하지만 자기 취향이 분명한 타입입니다. 강요보다 자유로운 환경에서 잘합니다.",
  ISTP: "문제를 차분히 보고 직접 해결하는 타입입니다. 말보다 행동과 실용성을 중시합니다.",
  ESFJ: "사람을 챙기고 안정적인 관계를 중시하는 타입입니다. 주변의 필요를 잘 알아차립니다.",
  ESTJ: "현실적이고 책임감이 강한 타입입니다. 기준과 질서를 세우는 데 강합니다.",
  ISFJ: "성실하고 세심한 타입입니다. 조용히 꾸준히 해내며 신뢰를 쌓습니다.",
  ISTJ: "원칙과 책임을 중시하는 타입입니다. 안정적인 방식으로 정확하게 처리합니다.",
};

export const aiTypeNames: Record<AiType, string> = {
  PROMPT: "AI 질문왕형",
  TOOL: "AI 도구 탐험가형",
  STRUCTURE: "AI 정리왕형",
  VERIFY: "AI 검증왕형",
  AUTO: "AI 자동화형",
  EXPERIMENT: "AI 실험왕형",
};

export const aiTypeDescriptions: Record<AiType, string> = {
  PROMPT: "AI에게 질문을 잘하는 타입입니다. 원하는 답이 나오도록 조건을 붙이고, 답이 부족하면 다시 고쳐 묻는 힘이 좋습니다.",
  TOOL: "AI를 여러 용도로 써보는 타입입니다. 검색뿐 아니라 글쓰기, 정리, 아이디어, 공부, 업무에도 AI를 연결할 수 있습니다.",
  STRUCTURE: "복잡한 생각을 잘게 나누는 타입입니다. AI에게 일을 단계별로 맡기면 결과가 훨씬 좋아집니다.",
  VERIFY: "AI 답변을 무조건 믿지 않는 타입입니다. 중요한 정보는 다시 확인하고, 근거를 따져보는 습관이 있습니다.",
  AUTO: "반복되는 일을 줄이는 데 강한 타입입니다. AI를 써서 귀찮은 일을 빠르게 처리할 가능성이 높습니다.",
  EXPERIMENT: "AI로 이것저것 바꿔보며 결과를 개선하는 타입입니다. 여러 버전을 만들고 비교하는 데 강합니다.",
};