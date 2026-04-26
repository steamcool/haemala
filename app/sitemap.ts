import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.haemala.com";

  const routes = [
    "",
    "/test",
    "/test/play",
    "/test/result",
    "/simulate",
    "/today",
    "/random",
    "/dream-lotto",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority:
      route === ""
        ? 1
        : route === "/test"
          ? 0.95
          : route === "/test/play"
            ? 0.9
            : route === "/test/result"
              ? 0.75
              : 0.7,
  }));
}