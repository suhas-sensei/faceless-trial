/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
				fade: 'fadeIn 0.75s ease-in-out',
        fadeinright: 'fade-in-right 1s ease-in-out 0.5s 1',
			},

			keyframes: {
				fadeIn: {
					from: { opacity: 0 },
					to: { opacity: 1 },
				},
        fadeInRight: {
          from : {
            opacity: 0,
            transform: "translate3d(20%, 0, 0)", // Adjusted starting position
          },
          to : {
            opacity: 1,
            transform: "translate3d(0, 0, 0)",
                    },
                  },
			},
    },
  },
  plugins: [],
};
