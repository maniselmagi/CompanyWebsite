import type { PortfolioItem } from '../types';

export const portfolioData: PortfolioItem[] = [
  {
    id: 'smart-kiosk',
    title: 'Smart-Kiosk (OrderEase)',
    tagline: 'Table-Side Self-Ordering & Commercial Kitchen Synchronization System',
    domain: 'Commercial Kiosk Systems & Hospitality Automation',
    category: 'Commercial Kiosk Systems',
    isRealProject: true,
    status: 'Production-Ready Prototype',
    liveDemoUrl: 'https://maniselmagi.github.io/smart-kiosk-demo/',
    summary: 'A commercial touch kiosk and kitchen display system built for dining establishments. Features an intuitive table-side ordering interface, real-time ticket synchronization with back-of-house kitchen screens, 5-language multilingual support, split-billing, and instant waiter calling.',
    challenge: 'Casual and fine-dining restaurants struggle with peak-hour ordering delays, manual order miscommunication between tables and chefs, language barriers with international guests, and slow bill settlement.',
    solution: 'Nexora engineered OrderEase as a responsive touch platform designed for table-docked tablets and commercial kiosks. Diners browse dishes with spice-level customizers, split checks, and place orders directly. Tickets broadcast instantly to the Kitchen Display System (KDS), updating customer-facing order trackers in real time.',
    results: [
      { metric: '5 Languages', label: 'Real-Time Multilingual Switcher' },
      { metric: '< 50ms', label: 'Cross-Screen Ticket Broadcast Sync' },
      { metric: '8"–12"', label: 'Commercial Tablet Hardware Optimization' },
      { metric: '100% Real', label: 'Live Functional Cloud Demo Available' }
    ],
    technologies: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'BroadcastChannel API', 'LocalStorage Engine', 'Lucide React', 'Python FastAPI Backend'],
    architectureLayers: [
      { layer: 'Table Kiosk Touch Interface', detail: 'Tactile touch UI with minimum 48px touch targets, 4-tier spice selector, add-on checkboxes, and dark/light ambient modes' },
      { layer: 'Zero-Latency Broadcast Channel', detail: 'Instantaneous inter-screen messaging between Table Kiosk, Kitchen KDS, and Manager Dashboard without cloud latency' },
      { layer: 'Kitchen Display System (KDS)', detail: 'High-visibility line tickets with elapsed cooking timers, status progression (New -> Preparing -> Ready), and 86/Sold-Out item toggles' },
      { layer: 'Billing & Settlement Engine', detail: 'Interactive bill-splitting across 2–5 diners, digital tipping selector, and simulated UPI QR / card checkout with printable receipt generation' }
    ],
    completedFeatures: [
      'Interactive visual menu with dietary indicators (Veg 🌱 / Non-Veg 🍗 / Spicy 🌶️)',
      '4-tier customizable spice selector (Mild, Medium, Hot, Extra Hot) and chef instructions',
      'Instant Kitchen Display System (KDS) live ticket feed with status progression',
      'Sold-Out (86) item management that instantly disables items on all customer tables',
      '4-button Call Waiter matrix (Need Assistance, Need Water, Need Bill, Other) with alert timers',
      'Multilingual engine supporting English, Tamil, Hindi, Telugu, and Spanish',
      'Split-bill calculator dividing checks evenly or by individual diners',
      'Digital receipt generator with print view and simulated SMS/Email dispatch',
      'High-contrast accessibility mode (A11y) and 1-tap Dark / Light ambient theme toggle'
    ],
    inProgressFeatures: [
      'Physical thermal receipt printer direct USB/ESC-POS hardware driver integration',
      'Local serial port communication with bank EDC payment card terminals',
      'Bluetooth Low Energy (BLE) table beacon auto-pairing'
    ],
    realScreenshots: [
      {
        title: 'Customer Welcome & Culinary Presentation',
        description: 'Atmospheric landing display welcoming diners and introducing the digital table menu.',
        image: './assets/smart_kiosk/chef_plating_welcome.jpg'
      },
      {
        title: 'Visual Menu & Dish Customization',
        description: 'Rich culinary imagery with preparation time estimates, popularity badges, and dietary tags.',
        image: './assets/smart_kiosk/restaurant_food_welcome.jpg'
      },
      {
        title: 'Touch Interface Architecture',
        description: 'Optimized touch layout for 8"–12" restaurant tablet hardware with high-contrast UI.',
        image: './assets/smart_kiosk/hero.png'
      }
    ],
    mockupData: {
      systemStatus: 'Live Demonstration Active',
      throughput: 'Real-time Event Bus',
      latency: '< 12 ms',
      uptime: '100% Client Uptime',
      activeNodes: 4,
      activityFeed: [
        { timestamp: '14:22:10', event: 'Table 3: Placed order #1028 (Royal Paneer Tikka + Cold Coffee) -> Broadcast to Kitchen KDS', status: 'verified' },
        { timestamp: '14:22:15', event: 'Kitchen KDS: Chef marked Ticket #1028 as "Chef Preparing"', status: 'success' },
        { timestamp: '14:23:01', event: 'Table 7: Call Waiter alert triggered ("Need Water") -> Staff display pinged', status: 'processing' },
        { timestamp: '14:24:45', event: 'Kitchen KDS: Toggled "Tandoori Platter" to Sold-Out -> Table kiosks updated instantly', status: 'verified' }
      ]
    }
  },
  {
    id: 'kiosk-kds',
    title: 'OrderEase Kitchen Display System (KDS)',
    tagline: 'High-Visibility Production Line Ticket Stream & 86 Item Controller',
    domain: 'Commercial Kiosk Systems & Line Operations',
    category: 'Commercial Kiosk Systems',
    isRealProject: true,
    status: 'Production-Ready Prototype',
    liveDemoUrl: 'https://maniselmagi.github.io/smart-kiosk-demo/#/kitchen',
    summary: 'A dedicated touchscreen display for kitchen stations and chefs. Organizes inbound table orders into clear chronological ticket columns with dynamic preparation timers, priority tags, and single-tap item availability toggles.',
    challenge: 'Busy commercial kitchens suffer from lost paper tickets, illegible handwriting, and missed allergen or spice level requests during dinner rushes.',
    solution: 'Designed an ultra-clean high-contrast interface designed for wall-mounted touch monitors and kitchen tablets. Chefs tap to transition tickets from "New" to "Preparing" and "Ready", automatically notifying the dining room.',
    results: [
      { metric: '0 Paper', label: 'Eliminated Handwritten Kitchen Slips' },
      { metric: 'Real-Time', label: 'Elapsed Cooking Time Tracking' },
      { metric: '1-Tap', label: 'Immediate 86/Sold-Out Broadcast' },
      { metric: 'Touch-First', label: 'Glanceable High-Contrast Layout' }
    ],
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'BroadcastChannel API', 'Web Audio Beeps'],
    architectureLayers: [
      { layer: 'Kitchen Ticket Stream', detail: 'Chronological column workflow (New, In-Progress, Ready, Served) with elapsed visual timers' },
      { layer: 'Allergen & Customization Callouts', detail: 'High-visibility visual tags highlighting spice levels, dietary exemptions, and chef notes' },
      { layer: 'Sold-Out Item Matrix', detail: 'Kitchen line interface allowing chefs to mark ingredients sold out with immediate menu disablement' },
      { layer: 'Audible Service Signals', detail: 'Subtle sound signals triggering on arrival of new orders and call-waiter requests' }
    ],
    completedFeatures: [
      'Chronological Kanban-style ticket columns with order age indicators',
      'Dynamic timer calculation with color shifts as tickets approach preparation thresholds',
      'Real-time synchronization with customer table status trackers',
      'Item-level 86 toggle disabling dishes across table touchscreens',
      'High-contrast kitchen dark theme resistant to glare and kitchen steam'
    ],
    inProgressFeatures: [
      'Multi-station ticket routing (e.g., Grille station vs Beverage bar separation)',
      'Automated prep-time estimation based on active kitchen load'
    ],
    mockupData: {
      systemStatus: 'Kitchen Display Running',
      throughput: 'Instantaneous Dispatch',
      latency: '< 5 ms',
      uptime: '100% Session Uptime',
      activeNodes: 2,
      activityFeed: [
        { timestamp: '14:25:02', event: 'New Ticket #1029 arrived from Table 4 (Mild Spice Level)', status: 'verified' },
        { timestamp: '14:26:18', event: 'Station 1: Ticket #1027 marked "Ready to Serve" -> Diner pinged', status: 'success' },
        { timestamp: '14:28:40', event: 'Chef acknowledged Call Waiter assistance alert for Table 2', status: 'verified' }
      ]
    }
  },
  {
    id: 'kiosk-management',
    title: 'OrderEase Operations & Allocation Portal',
    tagline: 'Table Booking, Live Allocation & Operational Telemetry',
    domain: 'Commercial Kiosk Systems & Store Management',
    category: 'Commercial Kiosk Systems',
    isRealProject: true,
    status: 'Production-Ready Prototype',
    liveDemoUrl: 'https://maniselmagi.github.io/smart-kiosk-demo/#/management',
    summary: 'Centralized administrative console providing floor managers and restaurant operators with live table occupancy maps, diner feedback scores, average order value metrics, and menu margin visibility.',
    challenge: 'Restaurant owners lack real-time visibility into table turnover velocity, peak rush bottlenecks, and dish profitability during daily operational service.',
    solution: 'Built an executive portal that aggregates live table states, customer feedback ratings, and item gross margins (38%–58%) directly from active kiosk sessions.',
    results: [
      { metric: 'Live Floor', label: 'Visual Table Occupancy & Seating Map' },
      { metric: '38%–58%', label: 'Dish-Level Gross Margin Telemetry' },
      { metric: '1–5 Stars', label: 'Post-Meal Customer Review Ingestion' },
      { metric: 'Zero Cost', label: 'Runs On Any Tablet or Laptop' }
    ],
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'LocalStorage Analytics', 'Chart Rendering'],
    architectureLayers: [
      { layer: 'Floor Management Map', detail: 'Visual table layout with color-coded occupancy and dining phase indicators' },
      { layer: 'Sales & Margin Telemetry', detail: 'Item-level profit analysis and category popularity distributions' },
      { layer: 'Diner Sentiment Ledger', detail: 'Real-time ingestion of customer star ratings, feedback tags, and reviews' },
      { layer: 'Administrative Overrides', detail: 'Managerial tools for overriding sold-out states and manual table assignment' }
    ],
    completedFeatures: [
      'Visual table allocation matrix (Occupied, Available, Billing, Cleaning)',
      'Real-time order turnover metrics and average check calculations',
      'Live customer feedback stream with 1–5 star ratings and compliment tags',
      'Menu item gross margin calculation and popularity leaderboard'
    ],
    inProgressFeatures: [
      'Exportable CSV end-of-day sales reconciliation reports',
      'Staff shift performance tracking and tip distribution audit'
    ],
    mockupData: {
      systemStatus: 'Management Hub Active',
      throughput: 'Live Dashboard State',
      latency: '< 8 ms',
      uptime: '100% Operational',
      activeNodes: 1,
      activityFeed: [
        { timestamp: '14:29:10', event: 'Table 5 checked out with 5-Star feedback: "Fast ordering and great spice options!"', status: 'success' },
        { timestamp: '14:30:00', event: 'Hourly turnover benchmark updated: 34 minutes average table duration', status: 'verified' },
        { timestamp: '14:31:22', event: 'Gross margin report: Cold Coffee Frappé combo identified as top margin contributor', status: 'verified' }
      ]
    }
  }
];
