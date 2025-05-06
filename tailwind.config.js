module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        elevated: "var(--elevated)",
        highlight: "var(--highlight)",
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
      },
      fontSize: {
        "header-l": ["36px", { lineHeight: "1.1" }],
        "header-s": ["24px", { lineHeight: "1.2" }],
        "body-l": ["24px", { lineHeight: "1.5" }],
        "body-s": ["16px", { lineHeight: "1.5" }],
        "label-l": ["24px", { lineHeight: "1.2" }],
        "label-s": ["16px", { lineHeight: "1.4" }],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
