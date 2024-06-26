/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  important: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        score: ["var(--font-score)"],
        pretendard: ["var(--font-pretendard)"],
      },
    },
  },
  plugins: [],
};
