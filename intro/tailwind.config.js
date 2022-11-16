/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        title: ["trigger", "sans-serif"],
        service: ['Pretendard-Regular',"sans-serif"]
      }
    },
  },
  plugins: [],
}
