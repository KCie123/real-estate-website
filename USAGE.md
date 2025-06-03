# Dwell Real Estate Website - Usage Notes

This document provides detailed usage notes for the Dwell real estate website, including how to modify content, add properties, and customize the website.

## Modifying Content

### Property Data

Property data is stored in JSON files located in the `src/data` directory:

- `propertiesForSale.json`: Contains properties listed for sale
- `propertiesForRent.json`: Contains properties listed for rent

To add or modify properties:

1. Open the appropriate JSON file
2. Follow the existing structure for each property object
3. Make sure to include all required fields:
   - `id`: Unique identifier for the property
   - `title`: Property title
   - `address`: Property address
   - `price`: Price (in dollars for sale, monthly rent for rentals)
   - `bedrooms`: Number of bedrooms
   - `bathrooms`: Number of bathrooms
   - `sqft`: Square footage
   - `levels`: Number of levels/floors
   - `imageUrl`: Path to the property image
   - `forSale`: Boolean (true for properties for sale, false for rentals)

Optional fields that enhance the property listings:
   - `description`: Detailed property description
   - `features`: Array of property features
   - `yearBuilt`: Year the property was built
   - `parkingSpaces`: Number of parking spaces
   - For rentals: `petFriendly` and `availableFrom`

### Testimonials

Testimonials are stored in `src/data/testimonials.json`. To add or modify testimonials:

1. Open the testimonials.json file
2. Follow the existing structure for each testimonial object
3. Include all required fields:
   - `id`: Unique identifier
   - `name`: Client name
   - `role`: Client role (e.g., "Homeowner", "First-time Buyer")
   - `quote`: The testimonial text

Optional fields:
   - `location`: Client's location
   - `imageUrl`: Path to client's image
   - `rating`: Numerical rating (1-5)

### Images

Property and testimonial images should be placed in the `public/images` directory. Reference them in the JSON files using paths like `/images/property-1.jpg`.

## Customizing the Website

### Colors and Styling

The website uses Tailwind CSS for styling. The main color scheme is defined in `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      primary: '#1e3a8a', // Deep blue
      'primary-dark': '#152a60',
      secondary: '#f8fafc', // Light gray/blue
      accent: '#f59e0b', // Amber/orange
    },
    // ...
  }
}
```

To change the color scheme, modify these values in the `tailwind.config.js` file.

### Typography

The website uses the following font configuration:

```js
fontFamily: {
  sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
  heading: ['Montserrat', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
},
```

To change fonts, modify these values and update the font imports in `_document.tsx`.

### Layout and Components

The main layout is defined in `src/components/layout/Layout.tsx`. This includes the header and footer that appear on all pages.

Key components that you might want to customize:
- `Header.tsx`: Navigation and logo
- `Footer.tsx`: Contact information and links
- `HeroSection.tsx`: Main banner and call-to-action
- `PropertyCard.tsx`: Individual property display
- `ContactForm.tsx`: Lead capture form

## Adding New Pages

To add a new page to the website:

1. Create a new file in the `src/pages` directory (e.g., `about.tsx`)
2. Use the Layout component to maintain consistent header and footer
3. Import and use any components needed for the page

Example:

```tsx
import type { NextPage } from 'next';
import Layout from '@/components/layout/Layout';

const About: NextPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-6">About Dwell Real Estate</h1>
        {/* Page content */}
      </div>
    </Layout>
  );
};

export default About;
```

## Deployment

### Static Export

For static hosting (e.g., Netlify, Vercel, AWS S3):

1. Add the following to your `next.config.js`:
```js
module.exports = {
  // ...existing config
  output: 'export',
}
```

2. Run the build command:
```bash
npm run build
# or
yarn build
```

3. The static site will be generated in the `out` directory

### Server Deployment

For server-side rendering:

1. Build the application:
```bash
npm run build
# or
yarn build
```

2. Start the production server:
```bash
npm run start
# or
yarn start
```

## Performance Optimization

The website is already optimized for performance, but here are some tips for maintaining good performance:

1. Compress and optimize images before adding them to the `public/images` directory
2. Use the Next.js Image component for automatic optimization
3. Keep third-party scripts to a minimum
4. Regularly update dependencies to benefit from performance improvements

## Accessibility

The website has been built with accessibility in mind:

1. Semantic HTML elements are used throughout
2. ARIA attributes are included where appropriate
3. Color contrast meets WCAG standards
4. Keyboard navigation is supported

Continue to maintain these standards when making changes to the website.
