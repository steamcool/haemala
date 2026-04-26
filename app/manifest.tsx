import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "꿈 해몽 로또 생성기",
    short_name: "꿈로또",
    description: "꿈을 입력하면 AI가 해석하고 로또·연금복권 번호를 추천합니다.",
    start_url: "/",
    display: "standalone",
    background_color: "#090909",
    theme_color: "#facc15",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}