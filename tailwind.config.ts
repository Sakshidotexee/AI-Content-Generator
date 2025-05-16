import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@shadcn/ui/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Add your custom colors here or override the default primary
        primary: {
          DEFAULT: "#704ef8", // Indigo-600
          foreground: "#ffffff",
        },
        border: "#e5e7eb", // gray-200
        input: "#f3f4f6", // gray-100
        ring: "#6366f1", // Indigo-500
      },
      borderRadius: {
        lg: "1rem",       // Customize as needed
        md: "0.5rem",
        sm: "0.25rem",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
  darkMode: "class",
}

export default config

