
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        messias: {
          red: '#EA2625',
          hover: '#C21E1D',
          dark: '#040404',
          gray: '#F3F4F6',
          border: '#E5E7EB',
          white: '#FFFFFF',
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.05)',
        'glass-hover': '0 12px 48px 0 rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
}
