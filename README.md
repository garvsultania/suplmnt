# suplmnt

suplmnt is an AI-powered supplement tracking application designed to help users optimize their wellness journey. It provides personalized insights, daily supplement reminders, and lab report analysis to ensure you stay on top of your health goals.

---

## ✨ Visual Overhaul & Design System (2024)

**suplmnt** now features a premium, modern, and minimalist design system, optimized for mobile and accessibility:

- **Glassmorphism**: All cards, containers, and navigation use a consistent glass effect for a premium feel.
- **Harmonious Color Palette**: Only three accent colors (mint, coral, sunny) are used for a cohesive, high-end look.
- **Soft Gradients**: Subtle gradients are used for backgrounds, cards, and buttons.
- **Typography**: Uses Inter and Poppins for a clean, readable hierarchy. Font sizes and spacing are mobile-first.
- **Consistent Spacing**: Utility classes for section, container, and card spacing ensure a minimalist, airy layout.
- **Icon System**: All icons use utility classes for size and color (`icon-premium`, `icon-accent`, `icon-muted`, etc.).
- **Buttons & Inputs**: All interactive elements use glassmorphism and premium gradients, with large touch targets.
- **Loading States & Animations**: Premium shimmer, pulse, and fade-in effects for a smooth user experience.
- **Mobile-First**: Every component is optimized for mobile screens and touch.
- **Accessibility**: Improved color contrast, focus states, and ARIA labels throughout.

### 🛠️ Design System Usage

- **Cards/Containers**: Use `card-glass` or `glass` for all main UI blocks.
- **Buttons**: Use `btn-glass`, `btn-primary`, `btn-secondary`, or `btn-accent` for consistent button styles.
- **Icons**: Use `icon-premium`, `icon-accent`, `icon-muted`, `icon-white`, `icon-lg`, `icon-md`, `icon-sm`, and `icon-bg` for all icons.
- **Gradients**: Use `bg-gradient-mint`, `bg-gradient-coral`, `bg-gradient-sunny`, `bg-gradient-main`, `bg-gradient-glass`, or `bg-gradient-overlay` for backgrounds.
- **Spacing/Layout**: Use `section`, `container-premium`, `card-stack`, `row-premium`, `col-premium`, and `spacer-*` utilities for consistent spacing.
- **Inputs**: Use `input-glass` for all form fields.

---

## Features

- **Lab Analysis**: Upload your lab reports for AI-powered health insights.
- **Smart Tracking**: Receive daily supplement reminders and monitor your progress.
- **Personalized Recommendations**: Get tailored advice based on your unique profile.

## Technologies Used

- **Frontend**: React, Vite, TypeScript
- **UI Components**: shadcn-ui
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Form Handling**: React Hook Form, Zod
- **State Management**: React Query
- **Mobile Support**: Capacitor

## Getting Started

### Prerequisites

- Node.js and npm (or yarn) installed. You can install Node.js using [nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

### Installation

1. Clone the repository:
   ```sh
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```

## Project Structure

- **src/**: Contains the main source code.
  - **components/**: Reusable UI components.
  - **pages/**: Main application pages (Dashboard, Index, Onboarding, etc.).
  - **contexts/**: React context providers.
  - **hooks/**: Custom React hooks.
  - **lib/**: Utility functions and shared logic.

## Deployment

To deploy your project, simply open [Lovable](https://lovable.dev/projects/fec8636f-a296-4665-b51c-9559bdb9d968) and click on Share -> Publish.

## Custom Domain

You can connect a custom domain to your suplmnt project. Navigate to Project > Settings > Domains and click Connect Domain. For more details, refer to the [Setting up a custom domain guide](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide).

## License

This project is licensed under the MIT License - see the LICENSE file for details.
