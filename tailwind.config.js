/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["Segoe UI"],
      },
      letterSpacing: {
        "0125": "0.0125rem",
      },
      colors: {
        primary: "#3C64B1", // Ganti dengan warna primer yang diinginkan
        secondary: "#00ff00", // Ganti dengan warna sekunder yang diinginkan
        abu: "#FAFBFC", // Ganti dengan warna sekunder yang diinginkan
        orange: {
          coral: "#FF8F73",
        },
        atlasian: {
          dark: "#172B4D",
          purple: "#5E4DB2",
          blue: {
            dark: "#09326C",
            light: "#0C66E4",
            baby: "#172B4D", // 172B4D
          },
          red: "#CA3521",
          yellow: "#E2B203",
          green: "#1F845A",
          gray: {
            dark: "#97A0AF",
            light: "#DFE1E6", // DFE1E6
          },
        },
        hover: {
          blue: "#0D78FF",
          yellow: "#FDC55A",
          red: "#D95038",
        },
        cardColor: {
          orange: "#FF991F",
          turquoise: "#00A3BF",
          blue: {
            dark: "#0052CC",
            gray: "#42526E",
          },
          purple: {
            dark: "#5243AA",
          },
          red: {
            light: "#DE350B",
          },
          green: {
            dark: "#00875A",
          },
        },
        brisma: "#09326C",
        // Tambahkan skema warna lain sesuai kebutuhan Anda
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
