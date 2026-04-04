# Web Jasa Antar

A modern web application for ordering delivery services, built with Next.js. This project allows users to select pickup and delivery locations on an interactive map, calculate routes, and process payments seamlessly.

## Project Overview

Web Jasa Antar is a delivery service platform that leverages mapping technology to provide an intuitive user experience for ordering deliveries. Key features include:

- Interactive map-based location selection using Leaflet
- Route calculation and visualization with Leaflet Routing Machine
- Responsive design with Tailwind CSS
- Real-time distance and route estimation via API
- Geocoding for address-to-coordinate conversion
- Payment processing integration

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Frontend**: React 19
- **Mapping**: Leaflet, React-Leaflet, Leaflet Routing Machine
- **Styling**: Tailwind CSS
- **Language**: TypeScript/JavaScript
- **API**: Axios for HTTP requests
- **Build Tools**: PostCSS, Autoprefixer

## Prerequisites

Before setting up the project, ensure you have the following installed:

- Node.js (version 18 or higher)
- npm, yarn, pnpm, or bun (any package manager)
- Git

## Setup from Scratch

Follow these steps to set up the project on a new machine:

### 1. Clone the Repository

```bash
git clone https://github.com/riskypr/web-jasa-antar.git
cd web-jasa-antar
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory and add any required environment variables (e.g., API keys for mapping services or payment gateways):

```env
# Example environment variables
NEXT_PUBLIC_MAP_API_KEY=your_map_api_key_here
PAYMENT_API_KEY=your_payment_api_key_here
```

### 4. Configure Tailwind CSS

Tailwind CSS is already configured in `tailwind.config.js`. The configuration includes:

- Content paths for purging unused styles from `app/` and `components/` directories
- Extended theme (customizable)
- No additional plugins (can be added as needed)

### 5. Set Up Leaflet and Mapping Components

The project uses Leaflet for mapping functionality:

- **Leaflet**: Core mapping library
- **React-Leaflet**: React integration for Leaflet
- **Leaflet Routing Machine**: For calculating and displaying routes

These are already included in `package.json`. The map components are located in `components/MapPicker.js` and integrated throughout the app.

### 6. Build and Run

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Running the Project

### Development Mode

```bash
npm run dev
```

The development server will start on `http://localhost:3000` with hot reloading enabled.

### Production Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Project Structure

```
web-jasa-antar/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── distance/      # Distance calculation API
│   │   ├── geocode/       # Geocoding API
│   │   └── payment/       # Payment processing API
│   ├── order/             # Order page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.js            # Home page
├── components/            # React components
│   ├── Hero.js           # Hero section
│   ├── MapPicker.js      # Map interaction component
│   ├── Navbar.js         # Navigation bar
│   └── OrderCard.js      # Order display card
├── hooks/                 # Custom React hooks
│   └── useOrder.js       # Order management hook
├── public/                # Static assets
├── services/              # API service functions
│   └── api.js            # API client
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── next.config.ts         # Next.js configuration
└── README.md             # This file
```

## Usage

1. **Home Page**: View the hero section and navigate to order
2. **Order Page**: Select pickup and delivery locations on the map
3. **Map Interaction**: Click on the map to set locations, view routes
4. **Order Summary**: Review distance, route, and proceed to payment

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) for the React framework
- [Leaflet](https://leafletjs.com/) for mapping
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Leaflet Routing Machine](https://www.liedman.net/leaflet-routing-machine/) for routing functionality
