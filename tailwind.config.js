/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'british-green-0': '#006E3E',
        'british-green-1': '#004225',
        'british-green-2': '#005F36',
        'british-green-3': '#165E3F',
        'british-green-4': '#1A704B',
        'british-green-5': '#7DD181',
        'light-green': '#AAAE7F',
        'beige': '#D0D6B3',
        'orange-1': '#FF6B35',
        'orange-2': '#DF6B35',
        'light-purple': '#DECDF5'
      },  
    },
  },
  plugins: [],
}
