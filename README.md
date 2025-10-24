# Gozade Estate Management System

A modern, responsive estate management application built with React, TypeScript, and Vite. This application provides a comprehensive solution for managing estate residents, visitors, and staff with an intuitive dashboard interface.

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or bun package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Purpose11/gozade-estate.git
   cd gozade-estate
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

### Build for Production

```bash
npm run build
# or
yarn build
# or
bun build
```

### Preview Production Build

```bash
npm run preview
# or
yarn preview
# or
bun preview
```

##  Architecture & Technical Decisions

### Core Technology Stack

- **Frontend Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.21 (fast development and optimized builds)
- **Styling**: Tailwind CSS 3.4.17 with custom design system
- **UI Components**: Radix UI primitives with custom styling
- **Routing**: React Router DOM 6.30.1
- **State Management**: React Context API + React Query for server state
- **Form Handling**: React Hook Form with Zod validation
- **Animations**: Framer Motion for smooth transitions
- **Icons**: Lucide React for consistent iconography

### State Management Strategy

The application uses a hybrid approach to state management:

1. **Local Component State**: React's `useState` and `useEffect` for component-level state
2. **Global State**: React Context API for authentication state
3. **Server State**: TanStack React Query for data fetching and caching
4. **Form State**: React Hook Form for complex form management

```typescript
// Authentication Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// React Query for data management
const queryClient = new QueryClient();
```

### Styling Architecture

**Design System Approach**:
- **CSS Framework**: Tailwind CSS with custom configuration
- **Design Tokens**: CSS custom properties for consistent theming
- **Component Variants**: Class Variance Authority (CVA) for component variants
- **Dark Mode**: Next-themes integration with system preference detection

**Key Styling Features**:
- Custom color palette with semantic naming
- Responsive design with mobile-first approach
- Dark/light theme support
- Custom gradients and shadows
- Consistent spacing and typography scales

```css
:root {
  --primary: 221 83% 53%;
  --gradient-primary: linear-gradient(135deg, hsl(221 83% 53%), hsl(262 83% 58%));
  --sidebar-background: 222 47% 11%;
}
```

### Component Architecture

**Modular Design Pattern**:
- **UI Components**: Reusable, accessible components built on Radix UI
- **Feature Components**: Business logic components (ResidentsTable, ResidentModal)
- **Layout Components**: Structural components (Sidebar, Topbar)
- **Page Components**: Route-level components

**Component Structure**:
```
src/
├── components/
│   ├── ui/           # Reusable UI primitives
│   ├── dashboard/   # Feature-specific components
│   └── ThemeProvider.tsx
├── contexts/         # Global state management
├── hooks/           # Custom React hooks
├── lib/             # Utilities and API layer
├── pages/           # Route components
└── types/           # TypeScript definitions
```

### Data Management

**Mock API Layer**:
- Simulated REST API with realistic delays
- CRUD operations for resident management
- Type-safe data handling with TypeScript interfaces

```typescript
export const residentApi = {
  getAll: async (): Promise<Resident[]> => { /* ... */ },
  create: async (resident: Omit<Resident, "id">): Promise<Resident> => { /* ... */ },
  update: async (id: string, updates: Partial<Resident>): Promise<Resident> => { /* ... */ },
  delete: async (id: string): Promise<void> => { /* ... */ }
};
```

##  Features

### Core Features

1. **Authentication System**
   - Mock authentication with localStorage persistence
   - Protected routes with automatic redirects
   - Session management

2. **Resident Management**
   - Add new residents with form validation
   - Edit existing resident information
   - Delete residents with confirmation
   - Real-time search and filtering
   - Sortable table columns

3. **Dashboard Interface**
   - Responsive sidebar navigation
   - Mobile-optimized layout with drawer navigation
   - Real-time search functionality
   - Theme toggle (light/dark/system)

4. **Settings Management**
   - Profile settings with form validation
   - Estate configuration
   - Notification preferences
   - Appearance customization

### Advanced Features

1. **Responsive Design**
   - Mobile-first responsive layout
   - Adaptive sidebar (desktop sidebar, mobile drawer)
   - Touch-friendly interface elements
   - Optimized for all screen sizes

2. **Accessibility**
   - ARIA-compliant components
   - Keyboard navigation support
   - Screen reader friendly
   - Focus management

3. **Performance Optimizations**
   - Code splitting with Vite
   - Lazy loading of components
   - Optimized bundle size
   - Fast refresh in development

4. **Developer Experience**
   - TypeScript for type safety
   - ESLint configuration for code quality
   - Hot module replacement
   - Comprehensive error handling

##  UI/UX Features

### Design System

**Color Palette**:
- Primary: Blue (#3B82F6)
- Secondary: Purple (#8B5CF6)
- Semantic colors for success, warning, error states
- Dark mode optimized color schemes

**Typography**:
- Consistent font sizing scale
- Proper line heights and spacing
- Accessible contrast ratios

**Components**:
- 40+ reusable UI components
- Consistent spacing and sizing
- Hover and focus states
- Loading states and animations

### Animation & Interactions

**Framer Motion Integration**:
- Smooth page transitions
- Staggered animations for lists
- Micro-interactions for buttons and forms
- Loading state animations

**Responsive Animations**:
- Mobile-optimized gesture support
- Reduced motion preferences
- Performance-optimized animations

##  Development Features

### Code Quality

- **TypeScript**: Full type safety with strict configuration
- **ESLint**: Comprehensive linting rules
- **Prettier**: Code formatting (implicit)
- **Path Aliases**: Clean import paths with `@/` prefix

### Build Configuration

- **Vite**: Fast development server and optimized builds
- **TypeScript**: Strict type checking
- **Tailwind**: JIT compilation for optimal CSS
- **PostCSS**: CSS processing and optimization

### Development Scripts

```json
{
  "dev": "vite",                    // Development server
  "build": "vite build",           // Production build
  "build:dev": "vite build --mode development", // Development build
  "preview": "vite preview",        // Preview production build
  "lint": "eslint ."               // Code linting
}
```

##  Mobile Responsiveness

### Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md)
- **Desktop**: > 1024px (lg)

### Mobile-Specific Features

- **Drawer Navigation**: Slide-out sidebar for mobile
- **Touch Gestures**: Swipe and tap interactions
- **Responsive Tables**: Horizontal scroll for data tables
- **Mobile Search**: Collapsible search interface

##  Bonus Features

### Advanced UI Components

1. **Comprehensive UI Library**
   - 40+ pre-built components
   - Radix UI primitives for accessibility
   - Custom styling with Tailwind CSS
   - Consistent design patterns

2. **Theme System**
   - Light/dark mode support
   - System preference detection
   - Custom color schemes
   - Persistent theme selection

3. **Form Management**
   - React Hook Form integration
   - Zod schema validation
   - Real-time form validation
   - Error handling and display

4. **Data Visualization**
   - Recharts integration ready
   - Chart components available
   - Responsive chart layouts

5. **Advanced Interactions**
   - Command palette support (CMDK)
   - Keyboard shortcuts
   - Context menus
   - Tooltips and hover cards

### Performance Features

1. **Optimized Loading**
   - Lazy loading of components
   - Code splitting
   - Optimized bundle size
   - Fast refresh in development

2. **Caching Strategy**
   - React Query for server state caching
   - Local storage for user preferences
   - Optimistic updates

3. **Accessibility**
   - WCAG 2.1 compliance
   - Screen reader support
   - Keyboard navigation
   - Focus management

##  Deployment

### Production Build

The application is optimized for production deployment with:

- **Static Site Generation**: Pre-rendered HTML
- **Asset Optimization**: Minified CSS and JavaScript
- **Tree Shaking**: Unused code elimination
- **Bundle Analysis**: Optimized chunk sizes

### Environment Configuration

- **Development**: Hot reload and debugging
- **Production**: Optimized builds and minification
- **Preview**: Local production testing

##  Dependencies

### Core Dependencies

- **React**: UI framework
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Styling framework
- **React Router**: Client-side routing

### UI & Styling

- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library
- **Framer Motion**: Animation library
- **Next Themes**: Theme management
- **Class Variance Authority**: Component variants

### Form & Validation

- **React Hook Form**: Form state management
- **Zod**: Schema validation
- **Hookform Resolvers**: Form validation integration

### Data & State

- **TanStack React Query**: Server state management
- **React Context**: Global state management

##  Project Structure

```
gozade-estate/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # Reusable UI components
│   │   └── dashboard/    # Feature components
│   ├── contexts/         # React contexts
│   ├── hooks/           # Custom hooks
│   ├── lib/             # Utilities and API
│   ├── pages/           # Route components
│   └── types/           # TypeScript definitions
├── package.json          # Dependencies and scripts
├── tailwind.config.ts    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
```

##  Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

##  License

This project is licensed under the MIT License.

---

