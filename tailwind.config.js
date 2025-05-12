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
        brand: "var(--brand)",
        "brand-accent": "var(--brand-accent)",
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
        xxl: "64px",
      },
      fontSize: {
        'header-l': ['var(--font-header-l)', { lineHeight: 'var(--line-height-header-l)' }],
        'header-s': ['var(--font-header-s)', { lineHeight: 'var(--line-height-header-s)' }],
        'body-l': ['var(--font-body-l)', { lineHeight: 'var(--line-height-body-l)' }],
        'body-s': ['var(--font-body-s)', { lineHeight: 'var(--line-height-body-s)' }],
        'label-l': ['var(--font-label-l)', { lineHeight: 'var(--line-height-label-l)' }],
        'label-s': ['var(--font-label-s)', { lineHeight: 'var(--line-height-label-s)' }],
      }
    },
  },
  plugins: [require("tailwindcss-animate"),
    function ({ addBase, theme }) {
      addBase({
        ':root': {
          '--space-xs': theme('spacing.xs'),
          '--space-sm': theme('spacing.sm'),
          '--space-md': theme('spacing.md'),
          '--space-lg': theme('spacing.lg'),
          '--space-xl': theme('spacing.xl'),
          '--space-xxl': theme('spacing.xxl'),
        },
      });
    },
  ],
};
