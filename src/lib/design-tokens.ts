/**
 * Design Tokens and Utility Classes
 * 
 * This file documents the design system tokens and provides utility classes
 * for consistent implementation across the application.
 */

// Color Usage Examples
export const colorExamples = {
  // Primary Colors
  primary: {
    button: 'bg-mint hover:bg-mint-dark text-white',
    text: 'text-mint',
    border: 'border-mint',
    focus: 'focus:ring-2 focus:ring-mint focus:ring-opacity-50',
  },
  
  // Secondary Colors
  secondary: {
    button: 'bg-coral hover:bg-coral-dark text-white',
    text: 'text-coral',
    border: 'border-coral',
  },
  
  // Accent Colors
  accent: {
    button: 'bg-sunny hover:bg-sunny-dark text-navy',
    text: 'text-sunny',
    border: 'border-sunny',
  },
  
  // Neutral Colors
  neutral: {
    background: 'bg-ivory',
    text: {
      primary: 'text-navy',
      secondary: 'text-gray-mid',
      light: 'text-gray-light',
    },
    border: 'border-gray-muted',
  },
  
  // Semantic Colors
  semantic: {
    success: {
      text: 'text-success',
      background: 'bg-success bg-opacity-10',
      border: 'border-success',
    },
    error: {
      text: 'text-error',
      background: 'bg-error bg-opacity-10',
      border: 'border-error',
    },
    warning: {
      text: 'text-warning',
      background: 'bg-warning bg-opacity-10',
      border: 'border-warning',
    },
    info: {
      text: 'text-info-dark',
      background: 'bg-info-light bg-opacity-10',
      border: 'border-info-dark',
    },
  },
};

// Component Styles
export const componentStyles = {
  // Cards
  card: {
    base: 'bg-white rounded-lg shadow-card p-4',
    glass: 'bg-gradient-glass backdrop-blur-glass rounded-glass shadow-glass',
    hover: 'hover:shadow-lg transition-shadow duration-200',
  },
  
  // Buttons
  button: {
    base: 'px-4 py-2 rounded-md font-medium transition-all duration-200',
    primary: 'bg-mint hover:bg-mint-dark text-white shadow-sm hover:shadow-md',
    secondary: 'bg-coral hover:bg-coral-dark text-white shadow-sm hover:shadow-md',
    accent: 'bg-sunny hover:bg-sunny-dark text-navy shadow-sm hover:shadow-md',
    ghost: 'bg-transparent hover:bg-gray-muted text-navy',
    icon: 'p-2 rounded-full hover:bg-gray-muted transition-colors duration-200',
  },
  
  // Form Elements
  form: {
    input: 'w-full px-3 py-2 border border-gray-muted rounded-md focus:outline-none focus:ring-2 focus:ring-mint focus:border-transparent',
    select: 'w-full px-3 py-2 border border-gray-muted rounded-md focus:outline-none focus:ring-2 focus:ring-mint focus:border-transparent',
    checkbox: 'w-4 h-4 text-mint border-gray-muted rounded focus:ring-mint',
    label: 'block text-sm font-medium text-gray-mid mb-1',
  },
  
  // Loading States
  loading: {
    shimmer: 'animate-shimmer bg-gradient-to-r from-gray-muted via-gray-light to-gray-muted bg-[length:200%_100%]',
    spinner: 'animate-spin rounded-full border-2 border-mint border-t-transparent',
  },
  
  // Toast Notifications
  toast: {
    base: 'fixed bottom-4 right-4 p-4 rounded-lg shadow-lg animate-slide-up',
    success: 'bg-success text-white',
    error: 'bg-error text-white',
    warning: 'bg-warning text-navy',
    info: 'bg-info-dark text-white',
  },
};

// Layout Utilities
export const layoutStyles = {
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  section: 'py-12',
  grid: {
    base: 'grid gap-4',
    cols2: 'grid-cols-1 md:grid-cols-2',
    cols3: 'grid-cols-1 md:grid-cols-3',
    cols4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  },
  flex: {
    base: 'flex',
    center: 'flex items-center justify-center',
    between: 'flex items-center justify-between',
    col: 'flex flex-col',
  },
};

// Typography
export const typographyStyles = {
  heading: {
    h1: 'text-4xl font-bold text-navy',
    h2: 'text-3xl font-semibold text-navy',
    h3: 'text-2xl font-semibold text-navy',
    h4: 'text-xl font-medium text-navy',
  },
  text: {
    base: 'text-base text-gray-mid',
    small: 'text-sm text-gray-mid',
    large: 'text-lg text-gray-mid',
  },
  link: 'text-mint hover:text-mint-dark underline-offset-4 hover:underline',
};

// Animation Utilities
export const animationStyles = {
  hover: {
    scale: 'hover:scale-105 transition-transform duration-200',
    lift: 'hover:-translate-y-1 transition-transform duration-200',
  },
  focus: {
    ring: 'focus:outline-none focus:ring-2 focus:ring-mint focus:ring-opacity-50',
  },
  transition: {
    base: 'transition-all duration-200 ease-in-out',
    fast: 'transition-all duration-150 ease-in-out',
    slow: 'transition-all duration-300 ease-in-out',
  },
}; 