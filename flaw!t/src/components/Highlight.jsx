"use client";
import React from "react";
import { useInView } from "react-intersection-observer";
import { Carousel, Card } from "././ui/apple-cards-carousel";
import { motion } from "framer-motion";
import PointerHighlight from "./ui/pointer-highlight";

const theme = {
  colors: {
    black: "#000000",
    white: "#FFFFFF",
    paragraph: "rgba(255, 255, 255, 0.83)",
    primary: "hsl(260, 80%, 70%)",
    textGradient: "linear-gradient(to right, #FFFFFF, rgba(255, 255, 255, 0.7))"
  },
  shadows: {
    card: "0px -16px 24px 0px rgba(255, 255, 255, 0.05) inset"
  },
  typography: {
    heading: "font-extrabold tracking-tight font-montserrat",
    paragraph: "text-lg font-montserrat"
  }
};

const cardsData = [
  {
    title: "Finance & Banking",
    category: "Financial",
    src: "../../public/Banking.jpg",
    content: (
      <p>Protecting patient data and critical infrastructure in the healthcare sector.</p>
    )
  },
  {
    title: "Manufacturing & OT Security",
    category: "Industry",
    src: "/manufacturing.jpg",
    content: <p>Safeguarding transactions and sensitive data in financial institutions.</p>
  },
  {
    title: "IT & Saas Solutions",
    category: "Information Technology",
    src: "/saas.jpg",
    content: <p>Securing platforms against fraud and customer data breaches.</p>
  },
  {
    title: "Corporate & Enterprise",
    category: "Global Business",
    src: "/corporate.jpg",
    content: <p>Securing platforms against fraud and customer data breaches.</p>
  }
];

const Highlight = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5
  });

  const blurContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.15
      }
    }
  };

  const blurItem = {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
      y: 10
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const blueTextBlur = {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
      scale: 0.95
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        delay: 0.3,
        duration: 0.8,
        type: "spring",
        stiffness: 100
      }
    },
    hover: {
      scale: 1.03,
      transition: { duration: 0.3 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div
      ref={ref}
      className="relative w-full min-h-[90vh] overflow-hidden flex flex-col items-center justify-center font-montserrat bg-black text-white"
    >
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-6 w-full">
        
        {/* Title */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={blurContainer}
          className="mb-12"
        >
          <motion.h2
            variants={blurItem}
            className={`text-4xl md:text-5xl ${theme.typography.heading} mb-4 flex flex-wrap justify-center gap-2`}
          >
            <span
              style={{
                backgroundImage: theme.colors.textGradient,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent"
              }}
            >
              Industries
            </span>

            <PointerHighlight>
              <span
                style={{
                  backgroundImage: theme.colors.textGradient,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent"
                }}
              >
                We Serve..
              </span>
            </PointerHighlight>
          </motion.h2>

          <motion.p
            variants={blurItem}
            className={`${theme.typography.paragraph} max-w-2xl`}
            style={{ color: theme.colors.paragraph }}
          >
            Industry-specific protection that adapts to your environment.
          </motion.p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={blurContainer}
          className="w-full max-w-6xl px-4 "
        >
          <Carousel
            items={cardsData.map((card, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                custom={index}
              >
                <Card
                  card={card}
                  index={index}
                  layout={true}
                  style={{
                    backgroundColor: theme.colors.black,
                    boxShadow: theme.shadows.card,
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    height: "380px",          // SHORTER CARD HEIGHT
                    overflow: "hidden"         // CLEAN CROPPING
                  }}
                />
              </motion.div>
            ))}
          />
        </motion.div>

        {/* Quote */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={blurContainer}
          className="mt-16 text-center px-6 w-full"
        >
          <motion.div
            className="inline-block px-4 py-1 rounded-full border border-blue-400 text-blue-400 text-sm font-semibold mb-6 tracking-wide"
            variants={blurItem}
          >
            WHAT WE BELIEVE
          </motion.div>

          <motion.div
            className="text-2xl md:text-3xl font-semibold leading-relaxed max-w-4xl mx-auto text-center space-y-4"
            variants={blurContainer}
          >
            <motion.p variants={blurItem}>
              " We make cybersecurity effective, and truly focused.
            </motion.p>

            <motion.span
              className="text-blue-400 inline-block"
              variants={blueTextBlur}
              whileHover="hover"
            >
              No one-size-fits-all, Just clarity and purpose.
            </motion.span>

            <motion.p variants={blurItem}>
              Smart, tailored protection – done right, for your business "
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default React.memo(Highlight);
