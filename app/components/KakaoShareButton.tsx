"use client";

type KakaoShareButtonProps = {
  title: string;
  description: string;
};

export default function KakaoShareButton({
  title,
  description,
}: KakaoShareButtonProps) {
  function shareKakao() {
    const kakao = (window as any).Kakao;

    if (!kakao) {
      alert("카카오 공유 기능을 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    if (!kakao.isInitialized()) {
      kakao.init("너의_카카오_JS_KEY");
    }

    kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title,
        description,
        imageUrl: "https://www.haemala.com/og.png",
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      buttons: [
        {
          title: "결과 보러가기",
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      ],
    });
  }

  return (
    <button
      onClick={shareKakao}
      className="h-12 rounded-2xl bg-yellow-400 text-sm font-semibold text-black hover:brightness-95"
    >
      카카오톡 공유
    </button>
  );
}