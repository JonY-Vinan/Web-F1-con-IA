// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "f1-dark": "#15151E", // Un color oscuro para fondos principales, similar al asfalto o carbono.
        "f1-light": "#F5F5F5", // Un color claro para texto y elementos principales.
        "f1-red": "#E10600", // El rojo icónico de la Fórmula 1.
        "f1-gray": "#333333", // Un gris oscuro para elementos secundarios o hover.
        "f1-medium-gray": "#A0A0A0", // Un gris medio para texto menos prominente.
        "f1-gold": "#FFD700", // Dorado para acentos, simula medallas o trofeos.
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Puedes usar una fuente como Inter si la importas en index.css
        display: ["Formula1 Display", "sans-serif"], // Fuente de estilo F1 si está disponible
        body: ["Formula1 Text", "sans-serif"], // Otra fuente si es necesario
      },
    },
  },
  plugins: [],
};
