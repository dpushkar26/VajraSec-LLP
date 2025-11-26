"use client";
import React from "react";
import { GlowingEffect } from "./ui/glowing-effect";
import { Box, Lock, Search, Settings, Sparkles } from 'lucide-react';
import { motion } from "framer-motion";

const services = [
  {
    icon: <Box className="h-4 w-4 text-black dark:text-neutral-400" />,
    title: "VAPT",
    description: "Comprehensive vulnerability assessment and penetration testing to secure your systems.",
    area: "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]",
    animationDirection: "left"
  },
  {
    icon: <Settings className="h-4 w-4 text-black dark:text-neutral-400" />,
    title: "End-to-End GRC Support",
    description: "Governance, Risk, and Compliance solutions tailored for regulatory excellence.",
    area: "md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]",
    animationDirection: "right"
  },
  {
    icon: <Lock className="h-4 w-4 text-black dark:text-neutral-400" />,
    title: "24/7 SOC Operations",
    description: "Round-the-clock monitoring and response for continuous threat detection.",
    area: "md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]",
    animationDirection: "bottom"
  },
  {
    icon: <Sparkles className="h-4 w-4 text-black dark:text-neutral-400" />,
    title: "Encryption Services",
    description: "Enterprise-grade encryption for data at rest and in transit.",
    area: "md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]",
    animationDirection: "left"
  },
  {
    icon: <Search className="h-4 w-4 text-black dark:text-neutral-400" />,
    title: "Threat Intelligence",
    description: "Proactive identification and mitigation of emerging threats.",
    area: "md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]",
    animationDirection: "right"
  }
];

// Animation variants for different directions
const cardVariants = {
  hidden: (direction) => {
    if (direction === "left") return { x: -100, opacity: 0 };
    if (direction === "right") return { x: 100, opacity: 0 };
    if (direction === "bottom") return { y: 100, opacity: 0 };
    return { y: 50, opacity: 0 };
  },
  visible: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
      duration: 0.6
    }
  }
};

const iconVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.2,
      duration: 0.4
    }
  }
};

const textVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4
    }
  }
};

const GridItem = ({ area, icon, title, description, animationDirection }) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        custom={animationDirection}
        className="relative h-full rounded-3xl border p-3 md:rounded-3xl md:p-3"
      >
        <GlowingEffect
          spread={80}
          blur={12}
          glow={true}
          disabled={false}
          proximity={100}
          inactiveZone={0.02}
        />
        <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <motion.div 
              variants={iconVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="w-fit rounded-lg border border-gray-600 p-2"
            >
              {icon}
            </motion.div>
            <div className="space-y-3">
              <motion.h3 
                variants={textVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-black md:text-2xl/[1.875rem] dark:text-white"
              >
                {title}
              </motion.h3>
              <motion.p
                variants={textVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="font-sans text-sm/[1.125rem] text-black md:text-base/[1.375rem] dark:text-neutral-400 [&_b]:md:font-semibold [&_strong]:md:font-semibold"
              >
                {description}
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>
    </li>
  );
};

const Expertise = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.7 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-lg font-medium text-blue-500 dark:text-blue-400 mb-2"
          >
            {/* Cybersecurity Solutions */}
          </motion.p>
          <motion.h1
            initial={{ filter: "blur(4px)", opacity: 0 }}
            whileInView={{ filter: "blur(0px)", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4"
          >
            Our Expertise
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent dark:via-blue-400 mx-auto w-1/3"
          />
        </motion.div>

        <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
          {services.map((service, index) => (
            <GridItem
              key={index}
              area={service.area}
              icon={service.icon}
              title={service.title}
              description={service.description}
              animationDirection={service.animationDirection}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Expertise;