// ./tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      scale: {
        200: '2',
        300: '3',
        500: '5',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 2s forwards',
        spinSlow: 'spinSlow 4s linear infinite',
      },
      theme: {
        fontSize: {
          tiny: "0.7rem",
          base: "1rem",
          huge: "3rem",
        },
      },
      colors: {
        // 定制主题色
        mystical: {
          primary: '#6b21a8', // 神秘紫色
          secondary: '#d4af37', // 黄金色
          background: '#deb887ff', //
          text: '#2d3748', // 浅灰文字
          accent: '#f59e0b', // 点缀颜色（金色）
        },
      },
      fontFamily: {
        mystical: ['"Cinzel"', 'serif'], // 塔罗风格字体
      },
      boxShadow: {
        mystical: '0 4px 6px rgba(0, 0, 0, 0.8), 0 1px 3px rgba(255, 255, 255, 0.1)', // 神秘阴影
      },
    },
  },
  plugins: [],
};

export default config;