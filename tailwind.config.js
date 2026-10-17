/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: '#2E5BFF',
        periwinkle: '#8EA6FF',
        // Dark surfaces
        ink: {
          DEFAULT: '#0A1022',
          deep: '#060A17',
          card: '#111933',
          chip: '#1F2A4D',
        },
        // Borders on dark surfaces
        edge: {
          soft: '#1C2540',
          DEFAULT: '#26304D',
          strong: '#34406A',
        },
        // Text on dark surfaces
        haze: {
          100: '#D5DAE5',
          200: '#B4BCCD',
          300: '#9AA4B8',
          400: '#7F8AA3',
        },
        // Text on light surfaces
        body: {
          DEFAULT: '#5A6478',
          soft: '#6B7487',
          strong: '#3A4458',
          deep: '#2A3348',
        },
        // Borders on light surfaces
        line: {
          soft: '#EDF0F5',
          DEFAULT: '#E3E7EF',
          input: '#D3D9E4',
        },
        // Light surfaces
        mist: {
          DEFAULT: '#F5F7FA',
          chip: '#F3F5F9',
          accent: '#EEF2FF',
        },
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
