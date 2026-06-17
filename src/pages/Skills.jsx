import React from 'react';
import { motion } from 'framer-motion';
import './Skills.css';

const SKILLS_CATEGORIES = [
  {
    title: 'Frontend Development',
    description: 'Building responsive, accessible, and performant user interfaces.',
    skills: ['React', 'Next.js', 'Vue.js', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3', 'Framer Motion']
  },
  {
    title: 'Backend Development',
    description: 'Architecting scalable server-side applications and APIs.',
    skills: ['Node.js', 'Python', 'Express.js', 'GraphQL', 'RESTful APIs']
  },
  {
    title: 'Database Management',
    description: 'Designing robust data structures and optimizing queries.',
    skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Prisma']
  },
  {
    title: 'AI & Machine Learning',
    description: 'Integrating intelligent features and working with data models.',
    skills: ['TensorFlow', 'PyTorch', 'OpenAI API', 'Data Science', 'Pandas']
  },
  {
    title: 'DevOps & Other',
    description: 'Deploying, monitoring, and maintaining robust infrastructure.',
    skills: ['Docker', 'AWS', 'CI/CD', 'Git', 'Linux', 'Web3', 'Blockchain']
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  }
};

export default function Skills() {
  return (
    <section className="skills-page">
      <div className="skills-container">
        <motion.div 
          className="skills-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Technical <span>Expertise</span></h1>
          <p>A comprehensive overview of the tools, languages, and technologies I use to build modern applications.</p>
        </motion.div>

        <motion.div 
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {SKILLS_CATEGORIES.map((category, index) => (
            <motion.div 
              key={category.title} 
              className="skill-category-card"
              variants={cardVariants}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="card-header">
                <h2>{category.title}</h2>
                <p>{category.description}</p>
              </div>
              <div className="skills-tags">
                {category.skills.map(skill => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
