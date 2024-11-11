/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        backgroundImage: {
          'pattern': 'linear-gradient(33deg, rgba(0, 0, 0, 0.05) 25%, transparent 60%, transparent 50%, transparent 75%, transparent)',
          'pattern-dark': 'linear-gradient(33deg, rgba(255, 255, 255, 0.1) 25%, transparent 60%, transparent 50%, transparent 75%, transparent)',
        },
        backgroundSize: {
          'pattern': '20px 20px',
          'pattern-dark': '20px 20px',
        },
        boxShadow: {
          'custom': '0 4px 10px rgba(0, 0, 0, 0.3)', // Define your custom shadow
        }
      
    },
  },
  plugins: [],
}
