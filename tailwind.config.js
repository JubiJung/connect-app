/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
<<<<<<< HEAD
=======
    "./pages/meetup/[meetupId]/*.{js,ts,jsx,tsx,mdx}",
>>>>>>> f05cb4b55540a52e49b1455cb44efdf6af01284d
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/meetup/[meetupId]/*.{js,ts,jsx,tsx,mdx}",
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
