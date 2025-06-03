# Dwell Real Estate Website - Developer Notes

This document provides technical information for developers working on the Dwell real estate website.

## Development Environment

### Prerequisites

- Node.js 14.0 or later
- npm or yarn
- Git

### Setup

1. Clone the repository
2. Install dependencies with `npm install` or `yarn install`
3. Start the development server with `npm run dev` or `yarn dev`

## Code Structure

### Component Organization

Components are organized by function:

- `layout/`: Components that define the overall page structure (Header, Footer, Layout)
- `property/`: Components related to property listings (PropertyCard, PropertyListing, PropertyFilter, PropertySort)
- `testimonial/`: Components for testimonials (TestimonialCarousel)
- `ui/`: Reusable UI components (HeroSection, ContactForm, ScrollToTopButton)

### Data Flow

The application uses React's state management with hooks:

1. Data is loaded from JSON files via the data service (`src/utils/dataService.ts`)
2. The main page (`index.tsx`) loads and distributes data to components
3. Components use local state for UI interactions
4. Filter and sort operations are handled by utility functions in `propertyFilters.ts`

### Custom Hooks

Several custom hooks are available in `src/utils/hooks.ts`:

- `useScrollPosition`: Tracks scroll position and provides scroll utility functions
- `useMediaQuery`: Simplifies responsive design with media query detection
- `useLocalStorage`: Persists state in localStorage

## TypeScript Types

Key type definitions:

- `PropertyCardProps`: Defines the structure of property data
- `Testimonial`: Defines the structure of testimonial data
- `FilterOptions`: Defines available property filter options

## Styling Approach

The project uses Tailwind CSS with a few custom approaches:

1. Global styles in `globals.css`
2. Custom Tailwind classes defined in `tailwind.config.js`
3. Component-specific styles using Tailwind classes
4. Custom CSS variables for theme colors

### CSS Class Naming Conventions

- `btn`: Base button styles
- `btn-primary`, `btn-secondary`: Button variants
- `form-input`, `form-label`: Form element styles
- `section-padding`: Consistent section padding
- `container`: Content container with responsive padding
- `nav-link`: Navigation link styles

## Build Process

The build process is handled by Next.js:

1. TypeScript compilation
2. CSS processing with PostCSS and Tailwind
3. Code optimization with SWC
4. Static asset handling

## Testing

Currently, the project does not include automated tests. Future improvements should include:

1. Unit tests for utility functions using Jest
2. Component tests using React Testing Library
3. End-to-end tests using Cypress

## Performance Considerations

The website is optimized for performance:

1. Images are optimized using Next.js Image component
2. Code splitting is handled automatically by Next.js
3. CSS is minimized in production
4. Console logs are removed in production

## Future Development

Areas for improvement:

1. Add server-side rendering for property listings
2. Implement a CMS for easier content management
3. Add user authentication for saved properties
4. Implement property detail pages
5. Add a blog section
6. Integrate with a real estate API for live data
7. Add a map view for property locations
8. Implement advanced search functionality
9. Add analytics tracking
10. Implement automated testing
