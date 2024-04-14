/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {
      fontFamily: {
        DancingScript: ['Dancing Script', 'cursive'],
       },
   
    },
  },
  plugins: [require('flowbite/plugin')],
}