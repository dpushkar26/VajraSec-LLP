/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const serviceCards = [
  {
    title: "Vulnerability Assessment",
    description: "Identify security weaknesses across your digital assets.",
    features: [
      "Web & Mobile App Scanning",
      "Cloud Infrastructure Checks",
      "API Security Analysis",
      "Internal Network Audits",
      "Detailed Risk Reports"
    ]
  },
  {
    title: "Penetration Testing",
    description: "Simulate real-world attacks to expose vulnerabilities.",
    features: [
      "Ethical Hacking Simulations",
      "Exploit Verification",
      "Privilege Escalation Tests",
      "Social Engineering",
      "Remediation Guidance"
    ]
  },
  {
    title: "Security Awareness Training",
    description: "Educate your team on cybersecurity best practices.",
    features: [
      "Phishing Simulations",
      "Role-Based Training",
      "Secure Behavior Practices",
      "Compliance Education",
      "Progress Tracking"
    ]
  },
  {
    title: "GRC Auditing",
    description: "Ensure adherence to security standards and regulations.",
    features: [
      "Compliance Assessments",
      "Policy Development",
      "Risk Management",
      "Control Implementation",
      "Audit Preparation"
    ]
  },
  {
    title: "Digital Forensics",
    description: "Investigate security incidents and data breaches.",
    features: [
      "Evidence Collection",
      "Incident Analysis",
      "Malware Investigation",
      "Data Recovery",
      "Expert Testimony"
    ]
  },
  {
    title: "SOC Services",
    description: "24/7 monitoring and threat detection.",
    features: [
      "Continuous Monitoring",
      "Threat Detection",
      "Incident Response",
      "SIEM Management",
      "Security Analytics"
    ]
  },
  {
    title: "Cloud Security",
    description: "Protect cloud environments with advanced controls.",
    features: [
      "IAM Configuration",
      "Encryption Strategy",
      "Cloud Compliance",
      "Threat Detection",
      "Multi-Cloud Protection"
    ]
  },
  {
    title: "Corporate Training",
    description: "Provide versatile training at your desk.",
    features: [
      "IAM Configuration",
      "Encryption Strategy",
      "Cloud Compliance",
      "Threat Detection",
      "Multi-Cloud Protection"
    ]
  }
];

const Marquee = () => (
  <div className="relative overflow-hidden py-4 mt-6 sm:mt-10">
    <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/70 via-indigo-600/70 to-indigo-900/70 skew-y-[-2deg] z-0" />
    <motion.div
      className="flex whitespace-nowrap z-10 relative"
      animate={{ x: ['0%', '-100%'] }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
    >
      {[...Array(6)].map((_, i) => (
        <React.Fragment key={i}>
          <span className="text-xl sm:text-2xl md:text-4xl font-bold mx-4 sm:mx-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">
            flaw!t
          </span>
          <span className="text-xl sm:text-2xl md:text-4xl font-bold mx-4 sm:mx-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-pink-300">
            fix!t
          </span>
          <span className="text-xl sm:text-2xl md:text-4xl font-bold mx-4 sm:mx-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300">
            find!t
          </span>
        </React.Fragment>
      ))}
    </motion.div>
  </div>
);

const ServiceCard = ({ service, index }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <StyledWrapper>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="card"
      >
        <div className="card__border" />
        <div className="card_title__container">
          <span className="card_title">{service.title}</span>
          <p className="card_paragraph">{service.description}</p>
        </div>
        <hr className="line" />
        <ul className="card__list">
          {service.features.map((feature, i) => (
            <li key={i} className="card__list_item">
              <span className="check">
                <svg className="check_svg" fill="currentColor" viewBox="0 0 16 16">
                  <path clipRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" fillRule="evenodd" />
                </svg>
              </span>
              <span className="list_text">{feature}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </StyledWrapper>
  );
};

const Services = () => {
  const [showMore, setShowMore] = React.useState(false);

  const visibleCards = serviceCards.slice(0, 6);
  const hiddenCards = serviceCards.slice(6);

  return (
    <section className="relative py-16 sm:py-20 md:py-24 bg-black overflow-hidden font-montserrat">
      <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_center,_#ffffff_1px,_transparent_1px)] [background-size:20px_20px]" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-700">Security Services</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
            Comprehensive cybersecurity solutions to protect your digital assets
          </p>
        </motion.div>

        {/* Always visible first 6 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {visibleCards.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        {/* Expandable remaining cards */}
        <AnimatePresence>
          {showMore && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto mt-6">
                {hiddenCards.map((service, idx) => (
                  <ServiceCard key={idx + 6} service={service} index={idx + 6} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* View More / Less Button */}
        <div className="flex justify-center mt-10">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowMore(!showMore)}
            className="px-6 py-3 text-white font-semibold rounded-full 
              bg-gradient-to-r from-indigo-600 to-purple-600 
              hover:from-indigo-500 hover:to-purple-500 
              shadow-lg transition-all"
          >
            {showMore ? "View Less" : "View More"}
          </motion.button>
        </div>

        <Marquee />
      </div>
    </section>
  );
};

const StyledWrapper = styled.div`
  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.25rem;
    width: 100%;
    min-height: 350px;
    background-color: #0f111a;
    border-radius: 1rem;
    box-shadow: 0px -16px 24px 0px rgba(255, 255, 255, 0.05) inset;
    transition: transform 0.3s ease;
  }

  .card:hover {
    transform: translateY(-5px);
  }

  .card .card_title__container .card_title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #fff;
    margin-bottom: 0.5rem;
  }

  .card .card_title__container .card_paragraph {
    font-size: 0.875rem;
    color: #ccc;
    line-height: 1.5;
  }

  .card .line {
    width: 100%;
    height: 1px;
    background-color: #222;
    border: none;
    margin: 0.5rem 0;
  }

  .card__list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1rem;
    flex-grow: 1;
  }

  .card__list_item {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .check {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    width: 1.25rem;
    height: 1.25rem;
    background-color: #3b82f6;
    border-radius: 50%;
  }

  .check_svg {
    width: 0.75rem;
    height: 0.75rem;
    fill: #0f111a;
  }

  .list_text {
    font-size: 0.875rem;
    color: #fff;
    line-height: 1.5;
  }
`;

export default Services;
