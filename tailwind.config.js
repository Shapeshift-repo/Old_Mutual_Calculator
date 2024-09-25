/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
				center: true,
				padding: '15px',
				screens: {
					'2xl': '1350px',
				},
			},
      colors: {
				primary: '#009677',
				secondary: '#323232',
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    require('tailwindcss-dotted-background'),
    require('tailwind-scrollbar-hide')
  ],
};