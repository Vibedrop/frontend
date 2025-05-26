module.exports = {
    content: [
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            screens: {
                md: "834px",
                xl: "1440px",
                "2xl": "1660px",
                "2xl-plus": "1840px",
            },
            fontFamily: {
                sans: ["var(--font-inter)", "system-ui", "sans-serif"],
            },
            colors: {
                brand: "var(--brand)",
                "brand-accent": "var(--brand-accent)",
                background: "var(--background)",
                foreground: "var(--foreground)",
                muted: "var(--muted)",
                elevated: "var(--elevated)",
                highlight: "var(--highlight)",
                tooltip: "var(--tooltip)",
            },
            spacing: {
                xxs: "4px",
                xs: "8px",
                sm: "12px",
                md: "16px",
                lg: "24px",
                xl: "32px",
                xxl: "56px",
            },
            fontSize: {
                "header-l": [
                    "var(--font-header-l)",
                    { lineHeight: "var(--line-height-header-l)" },
                ],
                "header-m": [
                    "var(--font-header-m)",
                    { lineHeight: "var(--line-height-header-m)" },
                ],
                "header-s": [
                    "var(--font-header-s)",
                    { lineHeight: "var(--line-height-header-s)" },
                ],
                "body-l": [
                    "var(--font-body-l)",
                    { lineHeight: "var(--line-height-body-l)" },
                ],
                "body-s": [
                    "var(--font-body-s)",
                    { lineHeight: "var(--line-height-body-s)" },
                ],
                "body-xs": [
                    "var(--font-body-xs)",
                    { lineHeight: "var(--line-height-body-xs)" },
                ],
                "label-l": [
                    "var(--font-label-l)",
                    { lineHeight: "var(--line-height-label-l)" },
                ],
                "label-s": [
                    "var(--font-label-s)",
                    { lineHeight: "var(--line-height-label-s)" },
                ],
            },
            borderRadius: {
                custom: "var(--radius)",
            },
            keyframes: {
                pulseEQ: {
                    "0%, 100%": { transform: "scaleY(0.4)" },
                    "50%": { transform: "scaleY(1)" },
                },
                shake: {
                    "0%, 100%": { transform: "translateX(0)" },
                    "25%": { transform: "translateX(-4px)" },
                    "50%": { transform: "translateX(4px)" },
                    "75%": { transform: "translateX(-2px)" },
                },
            },
            animation: {
                pulseEQ: "pulseEQ 0.5s ease-in-out infinite",
                shake: "shake 0.15s ease-in-out",
            },
        },
    },
    plugins: [
        require("tailwindcss-animate"),
        function ({ addBase, theme }) {
            addBase({
                ":root": {
                    "--space-xxs": theme("spacing.xxs"),
                    "--space-xs": theme("spacing.xs"),
                    "--space-sm": theme("spacing.sm"),
                    "--space-md": theme("spacing.md"),
                    "--space-lg": theme("spacing.lg"),
                    "--space-xl": theme("spacing.xl"),
                    "--space-xxl": theme("spacing.xxl"),
                },
            });
        },
        function ({ addUtilities }) {
            addUtilities({
                ".non-scaling-stroke": {
                    "vector-effect": "non-scaling-stroke !important",
                },
            });
        },
    ],
};
