# Dwell Real Estate Website

This is a modern, responsive real estate website built with Next.js, TypeScript, and Tailwind CSS. The website showcases properties for sale and rent, with filtering and sorting capabilities, testimonials, and a contact form.

## Features

- Responsive design that works on all devices
- Property filtering and sorting
- Property type switching (Buy/Rent)
- Testimonial carousel
- Contact form with validation
- Smooth scrolling and scroll-to-top functionality
- Optimized for performance and accessibility

## Tech Stack

- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Linting**: ESLint
- **Code Formatting**: Prettier

## Getting Started

### Prerequisites

- Node.js 14.0 or later
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/dwell-real-estate.git
cd dwell-real-estate
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Build for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

To start the production server:

```bash
npm run start
# or
yarn start
```

## Project Structure

```
dwell-real-estate/
├── public/              # Static assets
│   └── images/          # Image files
├── src/                 # Source code
│   ├── components/      # React components
│   │   ├── layout/      # Layout components
│   │   ├── property/    # Property-related components
│   │   ├── testimonial/ # Testimonial components
│   │   └── ui/          # UI components
│   ├── data/            # JSON data files
│   ├── pages/           # Next.js pages
│   ├── styles/          # Global styles
│   └── utils/           # Utility functions
├── .eslintrc.json       # ESLint configuration
├── .gitignore           # Git ignore file
├── .prettierrc          # Prettier configuration
├── next.config.js       # Next.js configuration
├── package.json         # Project dependencies
├── postcss.config.js    # PostCSS configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## TODOs

- Add actual property images (currently using placeholders)
- Implement property detail pages
- Add user authentication for saved properties
- Integrate with a real estate API for live data
- Add a blog section
- Implement a more advanced search with map integration

## License

This project is licensed under the MIT License.
