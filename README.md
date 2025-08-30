# MCKVIE Halloween Hackathon 2025

A spooky-themed hackathon website built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with Halloween theme
- **Type Safety**: Full TypeScript implementation with strict type checking
- **Modern UI**: Built with shadcn/ui components and Radix UI primitives
- **Form Validation**: Comprehensive client-side validation with custom hooks
- **Performance**: Optimized with React Query and efficient state management

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Routing**: React Router DOM
- **State Management**: React Query + Custom Hooks
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Layout.tsx      # Main layout wrapper
│   ├── Navigation.tsx  # Navigation component
│   └── Footer.tsx      # Footer component
├── hooks/              # Custom React hooks
│   ├── use-form.ts     # Form handling hook
│   └── use-toast.ts    # Toast notification hook
├── lib/                # Utility functions and types
│   ├── constants.ts    # App constants
│   ├── types.ts        # TypeScript type definitions
│   ├── utils.ts        # Utility functions
│   └── validation.ts   # Form validation logic
├── pages/              # Page components
│   ├── Index.tsx       # Home page
│   ├── Problems.tsx    # Problems page
│   ├── Schedule.tsx    # Schedule page
│   ├── Register.tsx    # Registration page
│   ├── Contact.tsx     # Contact page
│   └── NotFound.tsx    # 404 page
└── assets/             # Static assets
```

## 🎨 Design System

The app uses a custom Halloween-themed design system with:

- **Colors**: Spooky dark theme with orange and purple accents
- **Typography**: Custom fonts (Creepster for headings, Inter for body)
- **Animations**: Glow effects and spooky animations
- **Components**: Consistent UI components with Halloween styling

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd spooky-code-crawl
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:8080](http://localhost:8080) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🔧 Development Guidelines

### Code Quality

- **TypeScript**: Strict type checking enabled
- **ESLint**: Configured with React and TypeScript rules
- **Prettier**: Code formatting (configure in your editor)

### Component Structure

- Use functional components with hooks
- Implement proper TypeScript interfaces
- Follow the established naming conventions
- Use the custom `useForm` hook for form handling

### State Management

- Use React Query for server state
- Use custom hooks for complex local state
- Keep components focused and single-responsibility

### Styling

- Use Tailwind CSS classes
- Leverage the custom design system
- Use the `cn` utility for conditional classes
- Follow mobile-first responsive design

## 📝 Recent Improvements

### Code Cleanup (Latest)

1. **Centralized Constants**: Moved navigation items and app config to `src/lib/constants.ts`
2. **Type Safety**: Enhanced TypeScript configuration with strict mode
3. **Custom Hooks**: Created reusable `useForm` hook for form handling
4. **Validation**: Added comprehensive form validation with custom utilities
5. **Utility Functions**: Added safe external link handling and other utilities
6. **Removed Console Logs**: Cleaned up development artifacts
7. **Better Error Handling**: Improved form validation and error messages

### Type Definitions

- Added comprehensive TypeScript interfaces in `src/lib/types.ts`
- Improved type safety across all components
- Better IntelliSense support

### Form Handling

- Created reusable form hook (`useForm`)
- Added validation utilities (`validateRegistrationForm`)
- Improved error handling and user feedback

### Security

- Added safe external link handling
- Improved input validation
- Better error boundaries

## 🤝 Contributing

1. Follow the established code style and conventions
2. Add proper TypeScript types for new features
3. Use the existing design system and components
4. Test your changes thoroughly
5. Update documentation as needed

## 📄 License

This project is licensed under the MIT License.

## 🎃 Halloween Theme

The app features a spooky Halloween theme with:
- Dark color scheme with orange and purple accents
- Custom animations and glow effects
- Halloween-themed content and messaging
- Responsive design optimized for all devices

---

**Happy Coding! 👻💻**
