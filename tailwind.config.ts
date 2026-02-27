
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'playful-orange': '#f37f37',
        'playful-blue': '#36A9E1',
        'playful-yellow': '#FDCB3F',
        'playful-dark-blue': '#18283F',
        'card-bottom': '#FDFDFD',
        'card-button-border': '#E0E0E0',
      },
    },
  },
  plugins: [],
}
export default config
