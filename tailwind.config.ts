import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'poppins': ['Poppins', 'sans-serif'],
				'inter': ['Inter', 'sans-serif'],
			},
			colors: {
				// Primary
				mint: {
					DEFAULT: '#3AA76D',
					light: '#4ECDC4',
					dark: '#2D8B5D',
				},
				// Secondary Accents
				coral: {
					DEFAULT: '#F06E8C',
					light: '#FF6B9D',
					dark: '#C44569',
				},
				sunny: {
					DEFAULT: '#F4C759',
					light: '#FFE66D',
					dark: '#FFB347',
				},
				// Neutrals
				navy: {
					DEFAULT: '#1F2B45',
					light: '#2C3E50',
					dark: '#141B2D',
				},
				ivory: {
					DEFAULT: '#F7F7F5',
					light: '#FFFFFF',
					dark: '#E8E8E6',
				},
				gray: {
					muted: '#E8E8E6',
					mid: '#4A5462',
					light: '#F0F2F5',
				},
				// Slate Colors (for backward compatibility)
				slate: {
					DEFAULT: '#1F2B45',
					50: '#F8FAFC',
					100: '#F1F5F9',
					200: '#E2E8F0',
					300: '#CBD5E1',
					400: '#94A3B8',
					500: '#64748B',
					600: '#475569',
					700: '#334155',
					800: '#1E293B',
					900: '#0F172A',
				},
				// Semantic Colors
				success: '#3AA76D',
				error: '#F06E8C',
				warning: '#F4C759',
				info: {
					light: '#FFFFFF',
					dark: '#1F2B45',
				},
				// Keep existing shadcn colors
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
			},
			backgroundImage: {
				'gradient-glass': 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
				'gradient-mint': 'linear-gradient(135deg, #3AA76D 0%, #2D8B5D 100%)',
				'gradient-coral': 'linear-gradient(135deg, #F06E8C 0%, #C44569 100%)',
				'gradient-sunny': 'linear-gradient(135deg, #F4C759 0%, #FFB347 100%)',
			},
			backdropBlur: {
				'glass': '20px',
			},
			boxShadow: {
				'card': '0 2px 8px rgba(0,0,0,0.05)',
				'fab': '0 4px 12px rgba(0,0,0,0.1)',
				'glass': '0 8px 32px rgba(31, 38, 135, 0.37)',
				'glass-lg': '0 15px 35px rgba(31, 38, 135, 0.2)',
				'float': '0 10px 30px rgba(0, 0, 0, 0.1)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'glass': '20px',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' },
				},
				'slide-up': {
					'0%': { transform: 'translateY(100%)' },
					'100%': { transform: 'translateY(0)' },
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				'shimmer': {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' },
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'pulse-slow': 'pulse-slow 2s ease-in-out infinite',
				'slide-up': 'slide-up 0.3s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'shimmer': 'shimmer 2s infinite linear',
			},
			transitionProperty: {
				'transform': 'transform',
				'opacity': 'opacity',
			},
			transitionDuration: {
				'200': '200ms',
				'300': '300ms',
			},
			transitionTimingFunction: {
				'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
				'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
