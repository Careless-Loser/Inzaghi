export const projectsData: Record<string, any> = {
    "aqua-blue": {
        title: "Aqua Blue Trading",
        tags: "Full-Stack / PHP",
        description: "A robust, full-stack business portal engineered for a high-volume trading firm based in the United Arab Emirates.",
        details: "Aqua Blue Trading was conceived as a high-performance commercial portal for a Sharjah-based trading house. The conceptual challenge was to create a digital identity that reflected the scale and reliability of a physical commodities business. I wanted to move away from generic corporate templates to a custom-engineered solution that felt as solid and precise as the machinery the company trades. \n\n The back-end architecture is driven by PHP and a structured MySQL database, optimized for high-volume traffic and product indexing. I focused on building an efficient CRUD (Create, Read, Update, Delete) system for the admin panel, allowing the firm to update their vast inventory with minimal friction. The server-side logic is hardened against common vulnerabilities, ensuring that client data remains secure in a high-stakes trading environment. \n\n The UI/UX design is rooted in professional UAE corporate standards—clean, authoritative, and minimalist. I used a fluid layout system that ensures the product catalog is equally readable on a mobile device in a warehouse as it is on a high-resolution desktop in a boardroom. The navigation is streamlined to reduce the 'click-depth,' allowing potential buyers to find technical specifications in seconds. \n\n A significant problem I addressed was SEO performance within a competitive niche. By implementing custom meta-data generators and optimizing image delivery through lazy-loading and modern compression, I significantly increased the site’s organic reach. This data-driven approach ensured that the site was not just a beautiful digital brochure, but a functional lead-generation engine. \n\n The future of this system involves integrating an AI-driven inventory recommendation engine. By analyzing user search patterns, the system will be able to suggest related industrial components to traders, further increasing the business’s conversion rate. The modular PHP core I built is ready to accept these API integrations without a full system overhaul.",
        link: "https://www.aquabluetrd.com/",
        media: "/assets/images/aquablue.png",
        isVideo: false,
        process: [
            { title: "Corporate Branding", desc: "Establishing an authoritative, industrial visual identity." },
            { title: "PHP Backend Arch", "desc": "Structuring the MySQL databases for high-volume catalogs." },
            { title: "CRUD Integration", desc: "Building the admin dashboard for seamless inventory updates." },
            { title: "SEO Optimization", desc: "Implementing lazy-loading and metadata generation." }
        ],
        mockups: {
            tablet: "/assets/videos/aqua-tablet.mp4",
            mobile: ["/assets/images/aqua-mobile-1.png", "/assets/images/aqua-mobile-2.png", "/assets/images/aqua-mobile-3.png"]
        },
        typography: { font: "Inter", desc: "Authoritative, highly legible sans-serif for dense corporate catalogs." },
        palette: ["#00A8E8", "#007EA7", "#003459", "#050505"]
    },
    "maiden-gully": {
        title: "Maiden Gully Medical",
        tags: "Full-Stack / Health Tech",
        description: "A professional healthcare platform designed to bridge the gap between patient accessibility and clinical reliability.",
        details: "The conceptual foundation of the Maiden Gully Medical platform is 'Digital Empathy.' In healthcare, the user's state of mind is often stressed or hurried, so the interface must act as a calming agent. My goal was to bridge the gap between the clinical reliability of an Australian medical practice and the need for a seamless, frictionless patient booking experience. \n\n Technically, the site is a study in 'Performance-First' development. Using a modern full-stack approach, I optimized the site for sub-second load times across the rural areas of Australia where internet speeds can vary. This involved a heavy focus on minified assets and a CDN-based delivery system that ensures the medical practice's services are available 24/7 without downtime. \n\n The UX focuses on accessibility and information hierarchy. I conducted user flow audits to ensure that the most critical information—booking buttons and emergency contact details—is always within a single thumb-press on mobile devices. The visual language uses soft, high-trust color palettes and large, readable typography to cater to a diverse demographic of patients, from tech-savvy youths to seniors. \n\n One project-specific challenge was meeting the strict privacy expectations inherent in health technology. I structured the front-end to strictly separate public-facing information from secure third-party booking integrations. This ensures that while the user feels a seamless transition to the booking system, their data is being handled by highly-regulated, HIPAA-compliant medical software behind the scenes. \n\n  For future iterations, I am exploring the integration of a 'Virtual Concierge'—an AI-driven triage system that helps patients find the right specialist before they even book an appointment. The current architecture is designed to host these micro-services, turning a standard medical website into a comprehensive digital health hub for the Maiden Gully community.",
        link: "https://www.maidengullymedicalpractice.com.au/",
        media: "/assets/images/maiden.jpg",
        isVideo: false,
        process: [
            { title: "Accessibility Audit", desc: "Analyzing user flows for stressed, multi-generational demographics." },
            { title: "UX Wireframing", desc: "Prioritizing booking CTAs and emergency contacts." },
            { title: "HIPAA Compliance", desc: "Isolating public front-end from secure third-party integrations." },
            { title: "CDN Optimization", desc: "Ensuring sub-second load times for rural connections." }
        ],
        mockups: {
            tablet: "/assets/videos/maiden-tablet.mp4",
            mobile: ["/assets/images/maiden-mobile-1.png", "/assets/images/maiden-mobile-2.png", "/assets/images/maiden-mobile-3.png"]
        },
        typography: { font: "SF Pro Text", desc: "Frictionless, high-trust typography designed for multi-generational readability." },
        palette: ["#48CAE4", "#023E8A", "#03045E", "#050505"]
    },
    "legal-ease": {
        title: "Legal Ease Prototype",
        tags: "UI/UX / Prototype",
        description: "Merging legal logic with intuitive mobile design.",
        details: "Legal Ease is a personal project born from my background as a Legal Trainee. The conceptual goal was to solve the 'Legal Paradox': law is a system of logic, yet legal software is often chaotic and unintuitive. I wanted to design a mobile environment that treated legal documentation with the same UX precision found in high-end fintech or travel apps. \n\n The prototype was architected in Figma, utilizing a complex system of auto-layouts and components. I built a comprehensive 'Legal Design System' that prioritizes readability and actionable tasks. The flow is designed to guide a legal professional through the document drafting process, breaking down dense case law into manageable nodes of information. \n\n The UX philosophy is 'Clarity over Complexity.' I implemented a modular card system for case summaries, allowing users to swipe through relevant precedents quickly. This mimics the mental process of a lawyer sorting through files, but optimized for the speed of a mobile interface. Every tap is designed to reduce the cognitive load of the legal researcher. \n\n A key problem solved in this prototype was 'Hierarchical Navigation.' Legal research is non-linear—you often need to jump between a main contract, its appendices, and external statutes. I designed a multi-layered navigation system that allows for these lateral jumps without the user losing their primary place in the workflow. This reflects the reality of legal practice within a digital framework. \n\n Looking forward, Legal Ease is a blueprint for an AI-assisted legal drafting tool. I am currently exploring how Natural Language Processing (NLP) could be integrated into the prototype to suggest clauses in real-time. It is a bridge between the traditional world of law and the future of creative computing, aiming to make legal work more human-centric.",
        link: "https://www.figma.com/proto/KbjBku0uQ6fEDighLgQjHI/Legal-Ease-Phone-App",
        media: "/assets/videos/legal.mp4",
        isVideo: true,
        process: [
            { title: "Figma Auto-Layouts", desc: "Building the foundational scalable component library." },
            { title: "Hierarchical Flow", desc: "Mapping the non-linear user journeys for legal research." },
            { title: "Card System Design", desc: "Refining the UI for swipable precedent summaries." },
            { title: "Interactive Prototype", desc: "Connecting the user flows for the final presentation." }
        ],
        mockups: {
            tablet: "/assets/videos/legal-tablet.mp4",
            mobile: ["/assets/images/legal-mobile-1.png", "/assets/images/legal-mobile-2.png", "/assets/images/legal-mobile-3.png"]
        },
        typography: { font: "SemiboldType@16", desc: "A serif font bridging traditional legal documentation with modern digital clarity." },
        palette: ["#B719DE", "#610D75", "#430F50", "#000000"]
    },
    
    "latrobe": {
        title: "La Trobe BioMed",
        tags: "UI/UX / Design / Full-Stack",
        description: "Custom digital platform for the Biomedical Students Association in Australia.",
        details: "The La Trobe BioMed platform was designed as a central ecosystem for the Biomedical Students Association in Australia. The concept was to build more than just a website; I wanted to create a 'Community Architecture' that fostered academic collaboration. It needed to feel energetic and student-focused while maintaining the prestige associated with a scientific field. \n\n The technical implementation utilized Wix's advanced Velo (JavaScript) capabilities to transcend standard templates. I engineered a custom event logging and member registration system that allowed the association to manage its student base effectively. By combining database collections with front-end dynamic pages, I created a system where content could be scaled without manual page creation for every new event. \n\n The UI/UX design is a balance of scientific precision and vibrant student life. I used geometric shapes and custom-rendered graphics to reflect biomedical structures, creating a visual identity that resonates with science students. The layout is optimized for high engagement, featuring interactive galleries and social feeds that keep the community connected in real-time. \n\n The main problem I solved was 'Information Overload.' Biomedical associations produce a high volume of academic resources and event data. I implemented a faceted search and filtering system that allows students to find specific lab notes or networking events based on their year of study. This simplified the user journey, moving from a cluttered hub to a directed, efficient resource center. \n\n The project's roadmap includes a peer-to-peer mentoring module. The current database structure is already optimized to handle mentor-mentee matching algorithms. This platform is built to be the long-term backbone of student life at La Trobe, capable of evolving as the association's needs shift from simple information sharing to complex academic networking.",
        link: "https://biomed423.wixsite.com/labslatrobe",
        media: "/assets/images/latrobe.jpg",
        isVideo: false,
        process: [
            { title: "Community Arch", desc: "Defining the ecosystem needs for the student association." },
            { title: "Velo DB Setup", desc: "Engineering the backend utilizing Wix's JavaScript capabilities." },
            { title: "Event Logic", desc: "Building the dynamic scaling system for networking events." },
            { title: "Live Deployment", desc: "Rolling out the final visual identity to the student base." }
        ],
        mockups: {
            tablet: "/assets/videos/latrobe-tablet.mp4",
            mobile: ["/assets/images/latrobe-mobile-1.png", "/assets/images/latrobe-mobile-2.png", "/assets/images/latrobe-mobile-3.png"]
        },
        typography: { font: "Poppins", desc: "Energetic and modern geometric font to reflect vibrant student life." },
        palette: ["#F0F0F0", "#95b1ff", "#5c5964", "#000000"]
    },
    "mood-desert": {
        title: "Mood Desert",
        tags: "UI/UX / Mobile",
        description: "An innovative mobile application that maps emotional intelligence through a unique, desert-themed visual language.",
        details: "Mood Desert is an exploration into 'Affective Computing'—the idea that our devices can understand and reflect our emotional states. The concept was to move away from the clinical 'charts and graphs' of standard mood trackers and instead use a desert landscape as a metaphor for the human psyche. The shifting sands and lighting reflect the user's inner state in a poetic, non-intrusive way. \n\n The application was built from the ground up in Android Studio using Java. I developed a custom algorithm that calculates 'Emotional Valence' based on user inputs over time. This data is then mapped to visual parameters: high moods create vibrant, sunset-colored landscapes, while lower moods shift the environment toward cooler, nocturnal tones with shifting sand textures. \n\n From a UI/UX perspective, the app is designed to be a meditative experience. I removed the usual clutter of mobile apps, focusing on full-screen haptic interactions and smooth transitions. The user doesn't just 'input data'; they interact with the landscape, making the process of self-reflection feel like a creative act rather than a chore. \n\n The technical challenge was managing the real-time rendering of the desert assets on varied Android hardware. I optimized the graphics pipeline to ensure that the landscape transitions were smooth even on mid-range devices. This involved careful memory management and the use of vector-based animations to keep the app lightweight and responsive. \n\n The future of Mood Desert lies in wearable integration. By pulling data from heart rate monitors and sleep trackers, the app could theoretically 'pre-render' your morning landscape before you even open it. It is a prototype for a new kind of emotional health companion—one that speaks through visuals rather than notifications and alerts.",
        link: "https://github.com/Careless-Loser/MoodDessertCalculator", 
        media: "/assets/videos/mood.mp4",
        isVideo: true,
        process: [
            { title: "Algorithmic Mapping", desc: "Correlating emotional valence to visual color shifting." },
            { title: "Java Dev", desc: "Building the core Android application architecture." },
            { title: "Vector Animations", desc: "Optimizing the desert landscape for mid-range hardware." },
            { title: "Haptic Integration", desc: "Adding tactile feedback to enhance the meditative UX." }
        ],
        mockups: {
            tablet: "/assets/videos/mood-tablet.mp4",
            mobile: ["/assets/images/mood-mobile-1.png", "/assets/images/mood-mobile-2.png", "/assets/images/mood-mobile-3.png"]
        },
        typography: { font: "Lora", desc: "Soft, serif-based typography to create a meditative, poetic visual experience." },
        palette: ["#f09bd8", "#d2bbf7", "#ffcf00", "#f176be"]
    },
    "orbit": {
        title: "Orbit Expense",
        tags: "Full-Stack / Node.js",
        description: "A modern, full-stack financial management ecosystem designed for secure data visualization.",
        details: "The concept behind Orbit Expense is 'Financial Orbiting'—the idea that your money follows a systemic path that can be mapped and optimized. I wanted to create a financial tool that felt less like a spreadsheet and more like a flight dashboard. It is designed for individuals who view their personal economy as a complex system requiring high-fidelity monitoring. \n\n The technical core is a full-stack Node.js environment with a MongoDB database. I chose a NoSQL approach to allow for flexible expense categorization, letting the system adapt to the user’s unique spending habits. The back-end handles secure session management and data encryption, ensuring that the 'personal economy' of the user remains strictly private and protected. \n\n The UI/UX design focuses on 'Data Density.' I engineered a custom dashboard that uses SVG-based charts to provide a visual overview of spending velocity and category breakdown. The interface is dark-themed to reduce eye strain during late-night accounting, using subtle neon accents to highlight critical budget alerts and savings goals. \n\n A primary problem I solved was 'Input Friction.' Most people stop tracking expenses because the manual entry is tedious. I designed an ultra-fast entry system with intelligent defaults and keyboard shortcuts. By reducing the time it takes to log an expense to under three seconds, I significantly increased the potential for long-term user retention and data accuracy. \n\n The future of Orbit involves predictive analytics. By implementing a basic machine learning model on the server-side, the app will soon be able to predict end-of-month balances based on historical trends. This turns Orbit from a reactive tracking tool into a proactive financial planning system, helping users steer their personal economy toward long-term stability.",
        link: "https://github.com/Careless-Loser/orbit",
        media: "/assets/videos/orbit.mp4",
        isVideo: true,
        process: [
            { title: "MongoDB Arch", desc: "Configuring the NoSQL databases for flexible schemas." },
            { title: "Node.js Endpoints", desc: "Securing the backend API with encryption protocols." },
            { title: "SVG Dashboards", desc: "Designing custom data visualization charts for the frontend." },
            { title: "Frictionless Input", desc: "Optimizing the UX for sub-3-second expense logging." }
        ],
        mockups: {
            tablet: "/assets/videos/orbit-tablet.mp4",
            mobile: ["/assets/images/orbit-mobile-1.png", "/assets/images/orbit-mobile-2.png", "/assets/images/orbit-mobile-3.png"]
        },
        typography: { font: "Plus Jakarta Sans", desc: "Sleek, geometric font optimized for numbers, dashboards, and financial interfaces." },
        palette: ["#0043ff", "#514be5", "#F0F0F0", "#000000"]
    },
    "ml-viz": {
        title: "Machine Learning",
        tags: "Python / Data Science",
        description: "Advanced Machine Learning exercises focusing on the intersection of data science, 3D Regression, and spatial classification.",
        details: "This project is a deep dive into the geometry of data, specifically exploring how high-dimensional mathematical concepts can be rendered into intuitive 3D visualizations. By focusing on 3D Regression and spatial classification, I aimed to demystify the 'black box' of Machine Learning. The goal was to transform raw numeric outputs into a spatial narrative that users can perceive and interact with. \n\n The technical stack is built around Python, utilizing Matplotlib and Scikit-Learn for the heavy lifting of data processing and model generation. I engineered a pipeline that takes complex datasets and projects them onto three-dimensional regression planes. This required careful management of linear algebra transformations to ensure that the visual representation remained mathematically accurate to the model's predictions. \n\n The UX focuses on 'Visual Storytelling for Data.' Instead of static charts, the 3D models allow for a multi-perspective view of decision boundaries. Users can visually identify outliers and see how the model attempts to find the path of least resistance through the data points. This transparency builds trust in the algorithm's decision-making process by showing exactly where it succeeds and where it struggles. \n\n One of the major problems solved during development was the 'curse of dimensionality' in visualization. To make the 3D planes readable, I had to implement dimensionality reduction techniques that preserved the most critical features of the dataset. This ensured that the resulting visual output was clean, focused, and free of the noise that often obscures insights in complex ML models. \n\n In terms of future development, this project sets the stage for real-time interactive ML dashboards. I plan to migrate these models into browser-based WebGL environments using Three.js, allowing users to manipulate parameters and see the regression planes adjust in real-time. This will bridge the gap between back-end data science and front-end creative technology.",
        link: "https://github.com/Careless-Loser/Experiment-Porftolio-Machine-Learning-Assignment-1.git",
        media: "/assets/images/ml-3d.png",
        isVideo: false,
        process: [
            { title: "Data Normalization", desc: "Cleaning and formatting raw datasets using Python scripts." },
            { title: "Model Training", desc: "Applying regression algorithms via Scikit-Learn." },
            { title: "Dimensionality Reduction", desc: "Condensing high-dimensional data into readable 3D planes." },
            { title: "3D Projection UI", desc: "Rendering the final mathematical bounds visually." }
        ],
        mockups: {
            tablet: "/assets/videos/ml-tablet.mp4",
            mobile: ["/assets/images/ml-mobile-1.png", "/assets/images/ml-mobile-2.png", "/assets/images/ml-mobile-3.png"]
        },
        typography: { font: "Fira Code", desc: "Monospaced font system to emulate code environments and data structures." },
        palette: ["#00FFAA", "#008855", "#112211", "#050505"]
    },
    "photography": {
        title: "Visual Storytelling",
        tags: "UI/UX / Photography",
        description: "A curated digital exhibition of cinematography and street photography.",
        details: "This project is the 'Visual Foundation' of my entire portfolio. The concept is based on the idea that the rules of photography—composition, lighting, and geometry—are identical to the rules of UI design. By showcasing my cinematography and street photography, I am providing a look into my artistic eye and my understanding of visual balance. \n\n Technically, this digital exhibition focuses on 'High-Fidelity Asset Delivery.' I optimized my raw camera files for the web without losing the depth of color or dynamic range that is critical in fine art photography. This involved a complex workflow of color grading in Lightroom followed by web-specific compression to ensure the 'gallery' remains fast and responsive. \n\n The UX is designed to be 'Invisible.' There are no distracting buttons or social counters. The focus is entirely on the image, utilizing a full-screen lightbox system that allows the photography to speak for itself. The navigation is rhythmic, paced like a physical walk through an urban landscape, reflecting the street photography within. \n\n The main challenge was translating the 'Feeling' of street photography—which is often raw and chaotic—into a structured digital environment. I solved this by using a 'Mathematical Grid' for the gallery that contrasts with the fluid nature of the photos. This creates a tension between the frame and the subject, a concept I frequently bring into my UI/UX work. \n\n As a future step, I plan to integrate an AR (Augmented Reality) component where users can 'hang' my photos on their walls via their mobile browser. This project is the ultimate proof of my 'Techno-Poet' philosophy, demonstrating that technical precision and artistic vision are two sides of the same coin in modern digital creation.",
        link: "https://www.instagram.com/iamaddictedtoblackcoffee",
        media: "/assets/images/photography-hero.jpg",
        isVideo: false,
        process: [
            { title: "Lightroom Grading", desc: "Color correcting raw files for cinematic depth." },
            { title: "Asset Compression", desc: "Optimizing high-res imagery for lossless web delivery." },
            { title: "Grid Mathematics", desc: "Structuring the masonry layout for visual balance." },
            { title: "Lightbox UI", desc: "Building the invisible, full-screen gallery experience." }
        ],
        mockups: {
            tablet: "/assets/images/photo-tablet.png",
            mobile: ["/assets/images/photo-mobile-1.png", "/assets/images/photo-mobile-2.png", "/assets/images/photo-mobile-3.png"]
        },
        typography: { font: "Bodoni Moda", desc: "Editorial serif typeface mimicking high-end gallery and exhibition aesthetics." },
        palette: ["#FFFFFF", "#A3A3A3", "#262626", "#050505"]
    }
};