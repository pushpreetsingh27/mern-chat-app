/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sidebar': {
          DEFAULT: '#1A1D1E',
          'hover': '#2A2F30',
          'search': '#2A2F30',
        },
        'chat': {
          'bg': '#F8FAFC',
          'header': '#FFFFFF',
          'border': '#E2E8F0',
          'input': '#FFFFFF',
        },
        'message': {
          'outgoing': '#2563EB',
          'incoming': '#FFFFFF',
          'time': '#64748B',
        },
        'text': {
          'primary': '#1E293B',
          'secondary': '#64748B',
          'white': '#FFFFFF',
        },
        'action': {
          'primary': '#2563EB',
          'hover': '#1D4ED8',
          'logout': '#FF4757',
          'logout-hover': '#FF6B81',
        },
        'status': {
          'online': '#22C55E',
        },
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#2563EB",
          "secondary": "#1D4ED8",
          "accent": "#22C55E",
          "neutral": "#1A1D1E",
          "base-100": "#F8FAFC",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#FF4757",
        },
      },
    ],
  },
}