import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "WeatherApp",
    short_name: "WeatherApp",
    description: "Szybkie prognozy pogody",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#4A90E2",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
