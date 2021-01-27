module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        blkCoffee: "url('/coffee.svg')",
        blkMlkCoffee: "url('/blkmlkCoffee.jpg')",
        blkLogo: "url('/coffee.svg')",
        blkFB: "url('/facebook.svg')",
        blkIG: "url('/instagram.svg')",
      }),
    },
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
    },
  },
  plugins: [],
};
