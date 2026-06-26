/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    "./index.html",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'neon-friction': '0 0 15px rgba(244, 63, 94, 0.35), 0 0 5px rgba(244, 63, 94, 0.15)',
        'neon-identity': '0 0 15px rgba(217, 70, 239, 0.35), 0 0 5px rgba(217, 70, 239, 0.15)',
        'neon-artesao': '0 0 15px rgba(245, 158, 11, 0.40), 0 0 5px rgba(245, 158, 11, 0.20)',
        'neon-pacto': '0 0 15px rgba(16, 185, 129, 0.35), 0 0 5px rgba(16, 185, 129, 0.15)',
      },
      fontSize: {
        'golden-base': '1rem',        // 16px - Texto do corpo
        'golden-md': '1.618rem',      // 26px - Subtítulos e mini-headings
        'golden-lg': '2.618rem',      // 42px - Títulos de seção / Cards principais
        'golden-xl': '4.236rem',      // 68px - O Hero Heading Mestre (Impacto Soberano)
        'golden-xxl': '6.854rem',     // 110px - Micro-indicadores numéricos de telemetria
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "pulsar-artesao": {
          "0%, 100%": {
            boxShadow: "0 0 15px rgba(245, 158, 11, 0.35), 0 0 5px rgba(245, 158, 11, 0.15)",
            borderColor: "rgba(245, 158, 11, 0.3)"
          },
          "50%": {
            boxShadow: "0 0 25px rgba(245, 158, 11, 0.65), 0 0 10px rgba(245, 158, 11, 0.3)",
            borderColor: "rgba(245, 158, 11, 0.7)"
          }
        },
        auroraSweep: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "neon-artesao-pulsar": "pulsar-artesao 2s infinite ease-in-out",
        'aurora-sweep': 'auroraSweep 8s cubic-bezier(0.25, 1, 0.5, 1) infinite',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}