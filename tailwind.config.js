module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        lato: "'Lato', sans-serif",
        inter: "'Inter', sans-serif",
        roboto: "'Roboto', sans-serif",
        barlow: "'Barlow', sans-serif",
      },
      backgroundImage: (theme) => ({
        'login-bg': "url('/src/assets/login-bg.png')",
      }),
    },
  },
  plugins: [],
};
