export const FEATURED_PROJECT = {
  id: 'featured-1',
  title: 'TripNest',
  subtitle: 'Full Stack AI Travel Planning Platform',
  description: 'Built a full-stack travel platform with component-based React.js frontend and scalable Node.js/Express.js backend, enabling users to discover destinations and manage trips.',
  objective: 'Designed secure REST APIs with authentication flows and applied basic system design principles; integrated MongoDB for data storage and deployed on Vercel with Git/GitHub.',
  tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
  link: 'https://github.com/sammiazaz',
  github: 'https://github.com/sammiazaz',
  image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1200',
};

export const PROJECTS = [
  {
    id: 1,
    title: 'Human Heart Disease Prediction System',
    subtitle: 'Machine Learning Classification Pipeline',
    description: 'Built a classification pipeline using Logistic Regression and Random Forest to predict heart disease risk from multiple health indicators, demonstrating Python and data analysis proficiency.',
    objective: 'Applied SMOTE to correct class imbalance and performed end-to-end data preprocessing with Pandas and NumPy.',
    tech: ['Python', 'Scikit-learn', 'SMOTE', 'Pandas', 'NumPy'],
    link: 'https://github.com/sammiazaz',
    github: 'https://github.com/sammiazaz/heart-disease-pridiction-system-using-machine-learning',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 2,
    title: 'Network Intrusion Detection System',
    subtitle: 'Cybersecurity Anomaly Detection Pipeline',
    description: 'Designed a real-time network intrusion detection system using supervised machine learning algorithms to identify malicious network traffic and anomaly patterns. Processed high-dimensional packet data and evaluated performance using precision-recall metrics.',
    objective: 'Trained XGBoost and Random Forest classifiers on network packet datasets to detect zero-day exploits and DDoS attacks with high accuracy.',
    tech: ['Python', 'FastAPI', 'Scikit-learn', 'Pandas', 'NumPy', 'HTML5/CSS3', 'JavaScript'],
    link: 'https://ai-intrusion-detection-system.onrender.com',
    github: 'https://github.com/sammiazaz/AI-Intrusion-Detection-System',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800',
    details: {
      headerTitle: '🛡️ AI-Powered Network Intrusion Detection System (NIDS)',
      headerSubtitle: 'An intelligent, web-based Network Intrusion Detection System designed to monitor, analyze, and detect malicious network traffic using Machine Learning.',
      liveDemo: {
        url: 'https://ai-intrusion-detection-system.onrender.com',
        note: "(Note: May take ~50s to load if it's sleeping)"
      },
      features: [
        { title: 'Real-time Traffic Overview', text: 'Visual dashboard showing the distribution of network traffic categories.' },
        { title: 'Flexible Data Sources', text: 'Supports both simulated traffic generation and custom CSV dataset uploads for training.' },
        { title: 'Machine Learning Engine', text: 'Uses a Random Forest Classifier to identify patterns in network behavior.' },
        { title: 'Performance Analytics', text: 'Provides detailed classification reports (Accuracy, Precision, Recall, F1-Score).' },
        { title: 'Live Simulation', text: 'An interactive simulation mode that predicts whether incoming traffic packets are "Normal" or potential threats (DDoS, Brute Force, Malware).' },
        { title: 'Modern UI', text: 'A clean, professional, and responsive dashboard built with modern web standards.' }
      ],
      techStack: [
        { category: 'Backend', items: 'FastAPI (Python)' },
        { category: 'Machine Learning', items: 'Scikit-learn, Pandas, NumPy' },
        { category: 'Frontend', items: 'HTML5, CSS3 (Vanilla), JavaScript (ES6+)' },
        { category: 'Server/Hosting', items: 'Render' },
        { category: 'Version Control', items: 'Git & GitHub' }
      ],
      installation: [
        { step: '1. Clone the repository:', code: 'git clone https://github.com/sammiazaz/AI-Intrusion-Detection-System.git\ncd AI-Intrusion-Detection-System' },
        { step: '2. Install dependencies:', code: 'pip install -r requirements.txt' },
        { step: '3. Run the server:', code: 'uvicorn api:app --reload' },
        { step: '4. Open your browser:', text: 'Go to http://127.0.0.1:8000' }
      ],
      license: 'This project was developed as a Major Project for academic purposes.',
      author: 'Developed by Sammi Azaz'
    }
  },
  {
    id: 3,
    title: 'Movie Recommendation Engine',
    subtitle: 'Content-Based Filtering & NLP System',
    description: 'Developed a personalized movie recommendation engine leveraging TF-IDF vectorization and Cosine Similarity to recommend movies based on genre, plot summaries, cast, and director metadata.',
    objective: 'Integrated a Streamlit web interface and TMDB API to fetch live poster graphics and trailer links for top-matched recommendations in real-time.',
    tech: ['Python', 'NLP', 'TF-IDF', 'Streamlit', 'TMDB API'],
    link: 'https://github.com/sammiazaz',
    github: 'https://github.com/sammiazaz',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=800',
  }
];
