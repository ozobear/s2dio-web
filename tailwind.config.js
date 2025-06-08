/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        's2dio': {
          orange: '#FF6B35',
          yellow: '#FFE066', 
          green: '#00FF88',
          blue: '#0099FF',
          purple: '#CC00FF',
          pink: '#FF0080',
          red: '#FF3333',
          lime: '#CCFF00'
        },
        'brutal': {
          black: '#000000',
          white: '#FFFFFF',
          gray: '#808080'
        }
      },
      fontFamily: {
        'mono': ['Courier New', 'monospace'],
        'sans': ['Arial', 'Helvetica', 'sans-serif'],
        'display': ['Impact', 'Arial Black', 'sans-serif']
      },
      animation: {
        'shake': 'shake 0.5s ease-in-out infinite',
        'blink': 'blink 1s step-end infinite',
        'spin-slow': 'spin 3s linear infinite',
        'bounce-hard': 'bounceHard 1s ease-in-out infinite',
        'glitch': 'glitch 2s infinite'
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-2px)' },
          '75%': { transform: 'translateX(2px)' }
        },
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' }
        },
        bounceHard: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' }
        }
      },
      boxShadow: {
        'brutal': '8px 8px 0px 0px #000000',
        'brutal-lg': '12px 12px 0px 0px #000000',
        'brutal-color': '6px 6px 0px 0px',
        'brutal-inset': 'inset 4px 4px 0px 0px #000000'
      },
      dropShadow: {
        'brutal': '4px 4px 0px #000000',
        'brutal-lg': '8px 8px 0px #000000'
      }
    },
  },
  plugins: [],
}