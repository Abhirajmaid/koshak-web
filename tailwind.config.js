/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        royal: {
          red: '#8B0000',
          brown: '#8B4513',
          gold: '#FFD700',
          cream: '#F8F8F8',
          maroon: '#800000',
          grey: '#F5F5F5',
        },
        indian: {
          saffron: '#FF9933',
          vermillion: '#E34234',
          turmeric: '#E49B0F',
          henna: '#B85450',
        }
      },
      fontFamily: {
        'hindi': ['Devanagari Sangam MN', 'serif'],
        'royal': ['Playfair Display', 'serif'],
      },
      backgroundImage: {
        'indian-pattern': "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23FFD700\" fill-opacity=\"0.1\"%3E%3Cpath d=\"M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
      }
    },
  },
  plugins: [],
}