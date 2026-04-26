import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.haemala.com"; // ← 본인 도메인 확인

  const routes = [
    "",
    "/test",
    "/test/play",
    "/simulate",
    "/today",
    "/random",
    "/dream-lotto",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority:
      route === ""
        ? 1
        : route === "/test" || route === "/test/play"
          ? 0.9
          : route === "/simulate"
            ? 0.85
            : route === "/today"
              ? 0.8
              : 0.6,
  }));
}