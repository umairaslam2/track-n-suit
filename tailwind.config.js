const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
    theme: {
    extend: {
      backgroundImage: {
        'texture': "url('/images/texture.jpg')",
      },
      colors: {
        secondary:"#5E3102",
        black:"#1B1931",
        // green:"#83A6CE",
    
   },
    },
  },
});