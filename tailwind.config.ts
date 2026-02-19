
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
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
