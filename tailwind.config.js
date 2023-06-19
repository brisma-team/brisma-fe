/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3C64B1", // Ganti dengan warna primer yang diinginkan
        secondary: "#00ff00", // Ganti dengan warna sekunder yang diinginkan
        abu: "#FAFBFC", // Ganti dengan warna sekunder yang diinginkan
        // Tambahkan skema warna lain sesuai kebutuhan Anda
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
