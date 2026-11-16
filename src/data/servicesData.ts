import type { ServiceItem } from '../types';

export const servicesData: ServiceItem[] = [
  {
    id: 'kiosk-systems',
    title: 'Interactive Kiosk & Touch Terminal Systems',
    subtitle: 'Commercial table-side ordering, touch POS interfaces, and multi-display kitchen routing',
    shortDescription: 'Engineering dedicated touch kiosk applications and embedded POS interfaces optimized for retail, hospitality, and customer-facing hardware terminals.',
    fullDescription: 'Public terminals and commercial tablets demand distinct engineering paradigms: rapid tactile touch response, large accessible hit zones (>48px), high-contrast legibility across ambient dining room lighting, and zero-latency real-time synchronization between table touchscreens and back-of-house displays. Nexora engineers commercial kiosk software built for real commercial durability.',
    iconName: 'Smartphone',
    benefits: [
      'Tailored for 8", 10", and 12" commercial restaurant and retail tablet displays',
      'Instantaneous multi-screen order synchronization via real-time broadcast channels',
      'Built-in 5-language multilingual switcher and high-contrast accessibility mode',
      'Offline-resilient state machines preventing lost orders during intermittent network hiccups'
    ],
    keyCapabilities: [
      'Table-side self-ordering and interactive menu navigation with visual dish customization',
      'Split-bill calculations, tipping engines, and simulated demo payments (UPI/Card)',
      'Kitchen Display System (KDS) integration with real-time ticket stages and 86/sold-out toggles',
      'Call Waiter touch matrix broadcasting table service requests with live elapsed timers'
    ],
    architectureHighlights: [
      'React 19 + TypeScript + Vite architecture with instantaneous local state transitions',
      'Zero-latency BroadcastChannel and LocalStorage cross-tab and cross-device synchronization',
      'Ergonomic tablet layouts supporting both landscape and portrait orientations'
    ],
    deliveryTimeline: 'Functional prototype in 2–4 weeks; customized multi-terminal rollout in 6–10 weeks'
  },
  {
    id: 'custom-software',
    title: 'Custom Software Development',
    subtitle: 'Tailored business logic engines built for clean maintainability and domain precision',
    shortDescription: 'Architecting bespoke software solutions, business automation tools, and internal database management systems engineered to eliminate operational bottlenecks.',
    fullDescription: 'Generic off-the-shelf software rarely fits specialized commercial workflows without expensive compromises. Nexora designs and builds custom software applications from the ground up—incorporating clean domain-driven architecture, modular component structures, strict data validation, and intuitive operator dashboards.',
    iconName: 'Cpu',
    benefits: [
      'Zero vendor lock-in with 100% proprietary source code ownership and full IP transfer',
      'Engineered specifically around your exact business logic and team operational habits',
      'Clean, maintainable TypeScript and Python codebases with comprehensive documentation',
      'Direct integration with existing POS, databases, or local hardware peripherals'
    ],
    keyCapabilities: [
      'Bespoke business workflow automation and inventory/order management systems',
      'RESTful API development with Python (FastAPI/Django) and Node.js',
      'Relational and document database schema design (PostgreSQL, SQLite, MySQL)',
      'Hardware communication integration (serial ports, thermal receipt printers, barcode scanners)'
    ],
    architectureHighlights: [
      'Modular monolithic and microservice architectures with clean separation of concerns',
      'Strict TypeScript interfaces ensuring type safety across the entire application lifecycle',
      'Automated linting and unit test coverage guaranteeing code quality'
    ],
    deliveryTimeline: 'Initial working milestone in 4–6 weeks; production release in 8–12 weeks'
  },
  {
    id: 'web-applications',
    title: 'Web Application Development',
    subtitle: 'High-performance web platforms with instant rendering and responsive ergonomics',
    shortDescription: 'Building resilient, ultra-responsive web applications and management portals powered by modern frontend frameworks, clean component design, and optimized assets.',
    fullDescription: 'Modern web applications require the instantaneous responsiveness of desktop software coupled with universal browser accessibility. Nexora architects web applications utilizing modern component frameworks, clean state management, and optimistic UI updates for frictionless user interactions.',
    iconName: 'Globe',
    benefits: [
      'Lighthouse 95+ performance scores and sub-second Largest Contentful Paint (LCP)',
      'End-to-end type safety preventing runtime crashes and data inconsistencies',
      'Optimized responsive layouts across desktop monitors, laptops, tablets, and phones',
      'Clean role-based access control (RBAC) separating administrative and operator views'
    ],
    keyCapabilities: [
      'Interactive executive dashboards, operational control rooms, and management portals',
      'Progressive Web Apps (PWAs) with offline-capable caching and local storage',
      'Real-time data synchronization across connected browser clients',
      'Accessible WCAG AA compliant user interfaces with dark and light theme options'
    ],
    architectureHighlights: [
      'Vite-powered ultra-fast bundle generation with code-splitting and asset optimization',
      'Tailwind CSS design token architecture for cohesive typography and spacing',
      'State-of-the-art state machines preventing inconsistent client-side UI states'
    ],
    deliveryTimeline: 'Initial MVP release in 4–8 weeks; iterative quarterly delivery cycles'
  },
  {
    id: 'mobile-app-development',
    title: 'Mobile & Tablet App Development',
    subtitle: 'Responsive mobile and tablet applications engineered for operational longevity',
    shortDescription: 'Developing high-performance tablet and mobile applications for customer-facing kiosks, waiter handhelds, and mobile companion experiences on Android and iOS.',
    fullDescription: 'From restaurant table tablets to staff mobile handhelds, touchscreens require tactile responsiveness, durable battery management, and seamless offline behavior. Nexora delivers cross-platform applications characterized by fluid 60fps touch interactions and reliable local data persistence.',
    iconName: 'Layout',
    benefits: [
      'Fluid 60 FPS touch responsiveness with micro-interaction polishing',
      'Offline-first architecture with reliable local SQLite/LocalStorage data caching',
      'Optimized Android APK builds suitable for dedicated kiosk hardware and tablets',
      'Strict memory footprint optimization to prevent thermal throttling on continuous-use displays'
    ],
    keyCapabilities: [
      'Android tablet kiosk applications (standalone APK packaging and kiosk lock-down mode)',
      'Cross-platform responsive applications supporting both iOS and Android targets',
      'Companion staff handheld applications for table allocation and order management',
      'QR code scanning and camera integration for customer check-in'
    ],
    architectureHighlights: [
      'Reactive component state management with unidirectional data streams',
      'Hardware display density tuning for crisp rendering on diverse DPI screens',
      'Graceful error handling ensuring uninterrupted kiosk uptime during network drops'
    ],
    deliveryTimeline: 'Production-ready tablet application in 6–10 weeks'
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX & Product Interface Design',
    subtitle: 'Cognitive user experience design and cohesive digital design systems',
    shortDescription: 'Synthesizing complex operational workflows into intuitive, beautiful, and accessible user interfaces that reduce training time and eliminate user mistakes.',
    fullDescription: 'Software that touches non-technical users must be intuitive from the very first tap. Nexora\'s design process translates operational user journeys into interactive high-fidelity prototypes and tokenized design systems that guarantee consistency across screens, tablets, and devices.',
    iconName: 'Sparkles',
    benefits: [
      'Drastic reduction in diner and staff onboarding time with self-explanatory workflows',
      'Comprehensive design token architecture accelerating frontend engineering velocity',
      'Pixel-perfect visual hierarchy across dark dining environments and bright retail spaces',
      'Full compliance with modern accessibility standards (WCAG 2.1 AA/AAA)'
    ],
    keyCapabilities: [
      'Interactive Figma prototypes with comprehensive component states and click-through flows',
      'Touch-friendly design systems (typography scales, touch targets, accessible color contrast)',
      'Customer journey wireframing for self-ordering, checkout, and feedback workflows',
      'Hardware enclosure visual mockups and commercial display positioning studies'
    ],
    architectureHighlights: [
      'Design token systems aligning Figma styles directly with Tailwind CSS utility classes',
      'High-contrast dark and light modes with semantic palette structures',
      'Responsive multi-breakpoint grid layouts tested on real physical touch hardware'
    ],
    deliveryTimeline: 'Design sprints: 2–4 weeks from initial wireframe to production-ready design tokens'
  }
];
