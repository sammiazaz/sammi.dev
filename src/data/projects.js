export const PROJECTS = [
  {
    id: 1,
    title: 'PassVault',
    subtitle: 'Zero-Knowledge Password Manager',
    tabs: {
      'Scope & Overview': 'PassVault is a zero knowledge password manager that encrypts your credentials directly in your browser before they are ever stored. Protected with military grade encryption and a master password only you know. No backdoors. No compromises. Just security you can trust.',
      'Tech Architecture': 'Built with Next.js and React on the frontend, using Web Crypto API for client-side AES-256 encryption. PBKDF2 key derivation ensures master passwords are never transmitted. Zero-knowledge architecture means the server never sees plaintext data.',
    },
    tech: ['Next.js', 'React', 'AES-256', 'PBKDF2'],
    link: 'https://pass-vault-three.vercel.app/',
    github: 'https://github.com/sammiazaz',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 2,
    title: 'Network Intrusion Detection',
    subtitle: 'AI-Powered Cybersecurity System',
    tabs: {
      'Scope & Overview': 'Designed a real-time network intrusion detection system using supervised machine learning algorithms to identify malicious network traffic and anomaly patterns. Processed high-dimensional packet data and evaluated performance using precision-recall metrics.',
      'Tech Architecture': 'Trained XGBoost and Random Forest classifiers on network packet datasets to detect zero-day exploits and DDoS attacks. FastAPI backend serves predictions via REST endpoints. Frontend dashboard visualizes traffic patterns in real-time.',
    },
    tech: ['Python', 'FastAPI', 'Scikit-learn', 'XGBoost'],
    link: 'https://ai-intrusion-detection-system.onrender.com',
    github: 'https://github.com/sammiazaz/AI-Intrusion-Detection-System',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 3,
    title: 'Heart Disease Predictor',
    subtitle: 'ML Classification Pipeline',
    tabs: {
      'Scope & Overview': 'Built a classification pipeline using Logistic Regression and Random Forest models to predict heart disease risk from multiple health indicators. Applied SMOTE to correct class imbalance across the training data, improving detection reliability for high-risk patients.',
      'Tech Architecture': 'End-to-end data preprocessing pipeline with Pandas and NumPy. Feature selection using correlation analysis and domain knowledge. SMOTE oversampling for minority class. Model evaluation with cross-validation and ROC-AUC metrics.',
    },
    tech: ['Python', 'Scikit-learn', 'SMOTE', 'Pandas'],
    link: 'https://github.com/sammiazaz',
    github: 'https://github.com/sammiazaz/heart-disease-pridiction-system-using-machine-learning',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200',
  },
];

export const GRID_PROJECTS = [
  {
    id: 4,
    title: 'TripNest',
    tabs: {
      'Scope': 'Full-stack travel platform enabling users to discover destinations, create trips, and collaborate with friends. AI-assisted trip planning with a memories feature for organizing travel photos.',
      'Tech': 'Built with React.js and Vite on the frontend, Node.js and Express.js backend with RESTful API architecture. MongoDB for data persistence and JWT-based authentication.',
    },
    tech: ['React.js', 'Node.js', 'Express.js', 'REST APIs'],
    link: 'https://github.com/sammiazaz',
    github: 'https://github.com/sammiazaz',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 5,
    title: 'Movie Recommender',
    tabs: {
      'Scope': 'Personalized movie recommendation engine leveraging TF-IDF vectorization and Cosine Similarity to recommend movies based on genre, plot summaries, cast, and director metadata.',
      'Tech': 'Python-based NLP pipeline using TF-IDF vectorization and cosine similarity scoring. Streamlit frontend with TMDB API integration for live poster graphics and trailer links.',
    },
    tech: ['Python', 'NLP', 'TF-IDF', 'Streamlit'],
    link: 'https://github.com/sammiazaz',
    github: 'https://github.com/sammiazaz',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 6,
    title: 'Portfolio v2',
    tabs: {
      'Scope': 'Personal portfolio website featuring multiple themes, glassmorphism design, animated bento grid layout, and real-time GitHub/LeetCode integrations.',
      'Tech': 'React with Vite for blazing-fast builds. Framer Motion for page transitions and micro-animations. Vanilla CSS with CSS custom properties for theming.',
    },
    tech: ['React', 'Vite', 'Framer Motion', 'CSS'],
    link: 'https://github.com/sammiazaz',
    github: 'https://github.com/sammiazaz',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
  },
];
