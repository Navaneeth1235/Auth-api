/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Scan all JS, TS, JSX, TSX files inside src folder
    "./app/**/*.{js,ts,jsx,tsx}", // If you created custom folders under 'app'
    "./pages/**/*.{js,ts,jsx,tsx}", // Support for 'pages' folder if used
    "./components/**/*.{js,ts,jsx,tsx}" // Scan any reusable components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;
