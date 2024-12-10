import type { Config } from 'tailwindcss';
import * as TailwindAnimate from 'tailwindcss-animate';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        transitionProperty: {
          'transform-opacity': 'transform, opacity',
        },
        translate: {
          'icon-hidden': '100',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },

      colorz: {
        zinc: {
          600: '#52525B',
        },
      },
      keyframes: {
        'slide-in': {
          '0%': {
            transform: 'translateX(10px)',
            opacity: '0',
          },

          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
        gradient: {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        },
        'slide-out': {
          '0%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateX(10px)',
            opacity: '0',
          },
        },
        upDown: {
          '0%, 100%': {
            transform: 'rotateX(50deg) translateY(0)',
            border: '1px solid #5C2FC2',
          },
          '50%': {
            transform: 'rotateX(50deg) translateY(-50px)',
            border: '1px solid #DDCEFF',
          },
        },
        colorShift: {
          '0%': { backgroundPosition: '100% 0' },
          '100%': { backgroundPosition: '0 0' },
        },
        wave3d: {
          '0%, 100%': { transform: 'rotateX(0) rotateY(0)' },
          '25%': { transform: 'rotateX(10deg) rotateY(45deg)' },
          '50%': { transform: 'rotateX(-10deg) rotateY(-45deg)' },
          '75%': { transform: 'rotateX(10deg) rotateY(-45deg)' },
        },
        slider: {
          '0%': { left: '0%' },
          '50%': { left: '50%' },
          '90%': { left: '100%' },
          '100%': { left: '50%' },
        },

        barGrow: {
          '0%': { transform: 'translateY(0) scaleZ(1) rotateX(0deg)' },
          '50%': { transform: 'scaleY(0.5) scaleZ(0.8) rotateX(15deg)' },
          '100%': { transform: 'scaleY(1) scaleZ(1) rotateX(0deg)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      spacing: {
        '1vw': '1vw',
        '3vw': '3vw',
        '5vw': '5vw',
        '7vw': '7vw',
        '9vw': '9vw',
        '11vw': '11vw',
        '13vw': '13vw',
        '15vw': '15vw',
        '17vw': '17vw',
        '19vw': '19vw',
        '21vw': '21vw',
        '23vw': '23vw',
        '25vw': '25vw',
        '27vw': '27vw',
        '29vw': '29vw',
        '31vw': '31vw',
        '33vw': '33vw',
        '35vw': '35vw',
        '37vw': '37vw',
        '39vw': '39vw',
        '41vw': '41vw',
        '43vw': '43vw',
        '45vw': '45vw',
        '47vw': '47vw',
        '49vw': '49vw',
      },
      animation: {
        gradientShift: 'gradientShift 8s ease infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },

      backgroundSize: {
        '400%': '400% 400%',
      },
      backgroundImage: {
        'gradient-custom':
          'linear-gradient(135deg, #FFAFBD 0%, #ffc3a0 25%, #ff6a00 50%, #ff0076 75%, #FFD194 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      perspective: {
        '1000': '1000px',
      },
      transformStyle: {
        'preserve-3d': 'preserve-3d',
      },
      height: {
        '1vw': '1vw',
        '3vw': '3vw',
        '5vw': '5vw',
        '7vw': '7vw',
        '9vw': '9vw',
        '11vw': '11vw',
        '13vw': '13vw',
        '15vw': '15vw',
        '17vw': '17vw',
        '19vw': '19vw',
        '21vw': '21vw',
        '23vw': '23vw',
        '25vw': '25vw',
        '27vw': '27vw',
        '29vw': '29vw',
        '31vw': '31vw',
        '33vw': '33vw',
        '35vw': '35vw',
        '37vw': '37vw',
        '39vw': '39vw',
        '41vw': '41vw',
        '43vw': '43vw',
        '45vw': '45vw',
        '47vw': '47vw',
        '49vw': '49vw',
        full: '100%',
        screen: '100vh',
      },
      width: {
        '1vw': '1vw',
        '3vw': '3vw',
        '5vw': '5vw',
        '7vw': '7vw',
        '9vw': '9vw',
        '11vw': '11vw',
        '13vw': '13vw',
        '15vw': '15vw',
        '17vw': '17vw',
        '19vw': '19vw',
        '21vw': '21vw',
        '23vw': '23vw',
        '25vw': '25vw',
        '27vw': '27vw',
        '29vw': '29vw',
        '31vw': '31vw',
        '33vw': '33vw',
        '35vw': '35vw',
        '37vw': '37vw',
        '39vw': '39vw',
        '41vw': '41vw',
        '43vw': '43vw',
        '45vw': '45vw',
        '47vw': '47vw',
        '49vw': '49vw',
        full: '100%',
      },
      container: {
        center: true,
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1536px',
        },
      },
    },
  },
  plugins: [TailwindAnimate],
};

export default config;
