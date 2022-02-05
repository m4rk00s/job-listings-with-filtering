module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      "body": ['Spartan', 'sans- serif']
    },
    extend: {
      boxShadow: {
        'card': "0px 15px 20px -5px rgba(13, 113, 130, 0.15)"
      }
    },
  },
  plugins: [],
}
