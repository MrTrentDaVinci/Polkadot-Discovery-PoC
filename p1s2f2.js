/**
 * File: p1s2f2.js
 * Purpose: Tailwind CSS configuration for Polkadot Discovery PoC
 * SCIS Version: 4.1
 * Dependencies: tailwindcss
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./p1s0f1.html",
    "./p1s0f2.jsx",
    "./p1s0f3.jsx",
    "./p1s0f4.jsx",
    "./p1s0f5.jsx",
    "./p1s0f6.jsx",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand colors
        primary: {
          50: "#f0f4ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#667eea", // Main brand color
          600: "#5568d3",
          700: "#4c51bf",
          800: "#434190",
          900: "#3c366b",
        },
        secondary: {
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#764ba2", // Secondary brand color
          600: "#9333ea",
          700: "#7e22ce",
          800: "#6b21a8",
          900: "#581c87",
        },
        // Polkadot brand colors
        polkadot: {
          pink: "#E6007A",
          purple: "#552BBF",
          dark: "#1E1E1E",
          light: "#F5F5F5",
        },
        // Semantic colors
        success: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },
        warning: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        error: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          '"SF Mono"',
          "Menlo",
          "Consolas",
          '"Liberation Mono"',
          "monospace",
        ],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        112: "28rem",
        128: "32rem",
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        DEFAULT:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
        glow: "0 0 20px rgba(102, 126, 234, 0.4)",
        "glow-lg": "0 0 40px rgba(102, 126, 234, 0.6)",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slow": "bounce 2s infinite",
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
      backdropBlur: {
        xs: "2px",
      },
      gridTemplateColumns: {
        "auto-fill-100": "repeat(auto-fill, minmax(100px, 1fr))",
        "auto-fill-200": "repeat(auto-fill, minmax(200px, 1fr))",
        "auto-fill-300": "repeat(auto-fill, minmax(300px, 1fr))",
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },
    },
  },
  plugins: [
    // Forms plugin for better form styling
    require("@tailwindcss/forms")({
      strategy: "class",
    }),

    // Typography plugin for prose content
    require("@tailwindcss/typography"),

    // Custom plugin for component utilities
    function ({ addComponents, theme }) {
      addComponents({
        // Button styles
        ".btn": {
          padding: `${theme("spacing.2")} ${theme("spacing.4")}`,
          borderRadius: theme("borderRadius.lg"),
          fontWeight: theme("fontWeight.medium"),
          transition: "all 0.2s ease-in-out",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: theme("spacing.2"),
          "&:disabled": {
            opacity: "0.5",
            cursor: "not-allowed",
          },
        },
        ".btn-primary": {
          backgroundColor: theme("colors.primary.600"),
          color: theme("colors.white"),
          "&:hover": {
            backgroundColor: theme("colors.primary.700"),
          },
          "&:active": {
            backgroundColor: theme("colors.primary.800"),
          },
        },
        ".btn-secondary": {
          backgroundColor: theme("colors.secondary.600"),
          color: theme("colors.white"),
          "&:hover": {
            backgroundColor: theme("colors.secondary.700"),
          },
        },
        ".btn-outline": {
          backgroundColor: "transparent",
          border: `2px solid ${theme("colors.gray.300")}`,
          color: theme("colors.gray.700"),
          "&:hover": {
            backgroundColor: theme("colors.gray.50"),
            borderColor: theme("colors.gray.400"),
          },
        },

        // Card styles
        ".card": {
          backgroundColor: theme("colors.white"),
          borderRadius: theme("borderRadius.lg"),
          boxShadow: theme("boxShadow.DEFAULT"),
          padding: theme("spacing.6"),
        },
        ".card-hover": {
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            boxShadow: theme("boxShadow.lg"),
            transform: "translateY(-2px)",
          },
        },

        // Input styles
        ".input": {
          width: "100%",
          padding: `${theme("spacing.2")} ${theme("spacing.3")}`,
          border: `1px solid ${theme("colors.gray.300")}`,
          borderRadius: theme("borderRadius.lg"),
          fontSize: theme("fontSize.base"),
          transition: "all 0.2s ease-in-out",
          "&:focus": {
            outline: "none",
            borderColor: theme("colors.primary.500"),
            boxShadow: `0 0 0 3px ${theme("colors.primary.100")}`,
          },
          "&:disabled": {
            backgroundColor: theme("colors.gray.100"),
            cursor: "not-allowed",
          },
        },

        // Badge styles
        ".badge": {
          display: "inline-flex",
          alignItems: "center",
          padding: `${theme("spacing.1")} ${theme("spacing.2")}`,
          fontSize: theme("fontSize.xs"),
          fontWeight: theme("fontWeight.medium"),
          borderRadius: theme("borderRadius.full"),
        },
        ".badge-primary": {
          backgroundColor: theme("colors.primary.100"),
          color: theme("colors.primary.800"),
        },
        ".badge-success": {
          backgroundColor: theme("colors.success.100"),
          color: theme("colors.success.800"),
        },
        ".badge-warning": {
          backgroundColor: theme("colors.warning.100"),
          color: theme("colors.warning.800"),
        },
        ".badge-error": {
          backgroundColor: theme("colors.error.100"),
          color: theme("colors.error.800"),
        },

        // Container with gradient background
        ".gradient-bg": {
          background: `linear-gradient(135deg, ${theme("colors.primary.500")} 0%, ${theme("colors.secondary.500")} 100%)`,
        },

        // Glass morphism effect
        ".glass": {
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        },

        // Scrollbar styles
        ".scrollbar-thin": {
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: theme("colors.gray.100"),
            borderRadius: theme("borderRadius.lg"),
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme("colors.gray.300"),
            borderRadius: theme("borderRadius.lg"),
            "&:hover": {
              backgroundColor: theme("colors.gray.400"),
            },
          },
        },

        // Newsletter preview styles
        ".newsletter-content": {
          "& h1, & h2, & h3": {
            marginTop: theme("spacing.6"),
            marginBottom: theme("spacing.3"),
            fontWeight: theme("fontWeight.bold"),
          },
          "& p": {
            marginBottom: theme("spacing.4"),
          },
          "& a": {
            color: theme("colors.primary.600"),
            textDecoration: "underline",
            "&:hover": {
              color: theme("colors.primary.700"),
            },
          },
        },
      });
    },

    // Custom plugin for utilities
    function ({ addUtilities, theme }) {
      addUtilities({
        // Text gradient
        ".text-gradient": {
          backgroundClip: "text",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          backgroundImage: `linear-gradient(135deg, ${theme("colors.primary.600")} 0%, ${theme("colors.secondary.600")} 100%)`,
        },

        // Truncate text with ellipsis
        ".truncate-2": {
          overflow: "hidden",
          display: "-webkit-box",
          "-webkit-line-clamp": "2",
          "-webkit-box-orient": "vertical",
        },
        ".truncate-3": {
          overflow: "hidden",
          display: "-webkit-box",
          "-webkit-line-clamp": "3",
          "-webkit-box-orient": "vertical",
        },

        // Custom focus styles
        ".focus-ring": {
          "&:focus": {
            outline: "none",
            boxShadow: `0 0 0 3px ${theme("colors.primary.200")}`,
          },
        },
      });
    },
  ],

  // Safelist classes that might be generated dynamically
  safelist: [
    "bg-primary-500",
    "bg-secondary-500",
    "text-primary-600",
    "text-secondary-600",
    "border-primary-500",
    "border-secondary-500",
    "hover:bg-primary-700",
    "hover:bg-secondary-700",
  ],

  // Dark mode configuration (future enhancement)
  darkMode: "class",
};
