import type { Config } from "tailwindcss";
const config: Config = { content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"], theme: { extend: { colors: { ink: "#080807", paper: "#eee8dc", gold: "#c6a477" }, fontFamily: { sans: ["Arial", "sans-serif"], serif: ["Georgia", "serif"] } } }, plugins: [] };
export default config;
