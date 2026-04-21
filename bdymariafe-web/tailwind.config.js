/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'bg-base':      '#FFFFFF',
        'bg-elevated':  '#F0F7FF',
        'bg-surface':   '#E8F4FD',
        'bg-surface-hover': '#DBEAFE',
        'brand-primary':   '#1D4ED8',
        'brand-secondary': '#2563EB',
        'accent-celeste':  '#38BDF8',
        'accent-celeste-light': '#BAE6FD',
        'accent-wa':    '#25D366',
        'accent-wa-hover': '#1DA851',
        'text-primary': '#0F172A',
        'text-body':    '#334155',
        'text-muted':   '#64748B',
        'success':      '#10B981',
        'error':        '#EF4444',
        'bg-light':     '#F8FAFC',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        pill: '50px',
        full: '9999px',
      },
      animation: {
        'pulse-glow':  'pulseGlow 2.5s ease-in-out infinite',
        'shimmer':     'shimmer 1.5s linear infinite',
        'fade-in-up':  'fadeInUp 0.7s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in':     'fadeIn 0.6s ease both',
        'morph-glow':  'morphGlow 8s ease-in-out infinite alternate',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(37,211,102,0.5)' },
          '50%':      { boxShadow: '0 0 0 16px rgba(37,211,102,0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(32px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        morphGlow: {
          '0%':   { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundSize: {
        '200': '200% auto',
      },
    },
  },
  plugins: [],
}
