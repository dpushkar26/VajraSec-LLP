/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", href: "home" },
  { label: "Services", href: "services" },
  { label: "Highlights", href: "highlights" },
  { label: "Blogs", href: "Blogs" },
  { label: "Contact", href: "footer" },
];

const Navbar = () => {
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const resize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const scroll = () => {
      const current = window.scrollY;
      setShowNavbar(current < lastScrollY || current < 100);
      setLastScrollY(current);
    };
    window.addEventListener("scroll", scroll);
    return () => window.removeEventListener("scroll", scroll);
  }, [lastScrollY]);

  const navigateTo = (idx, href) => {
    setActive(idx);
    setIsMobileMenuOpen(false);

    if (href.toLowerCase() === "blogs") {
      window.open("/blogs", "_blank");
      return;
    }

    const el = document.getElementById(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* NAVBAR WRAPPER */}
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: showNavbar ? 0 : -120 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 50,
          padding: "0.8rem 1rem",
          display: "flex",
          justifyContent: "center",
          boxSizing: "border-box",
        }}
      >
        {/* GLASS NAV CONTAINER */}
        <div
          style={{
            width: "100%",
            maxWidth: "1080px",
            display: "flex",
            alignItems: "center",
            padding: isMobile ? "0.8rem 1rem" : "1rem 2rem",
            borderRadius: "1.5rem",
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
          }}
        >
          {/* ========================== DESKTOP ========================== */}
          {!isMobile ? (
            <>
              {/* LOGO */}
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("home")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <img
                  src="/vajraseclogo.png"
                  alt="VajraSec"
                  style={{ height: 48 }}
                />
              </a>

              {/* DESKTOP NAV ITEMS */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "center",
                  gap: "2rem",
                }}
              >
                {navItems.map((item, idx) => (
                  <motion.div
                    key={item.label}
                    onClick={() => navigateTo(idx, item.href)}
                    whileHover={{ scale: 1.08 }}
                    style={{ cursor: "pointer", position: "relative" }}
                  >
                    <motion.span
                      animate={{
                        color: active === idx ? "#e8faff" : "#cbd5e1",
                        fontWeight: active === idx ? 600 : 400,
                        letterSpacing: active === idx ? 1 : 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 18,
                      }}
                      style={{
                        padding: "0.4rem 1rem",
                        fontSize: 18,
                      }}
                    >
                      {item.label}
                    </motion.span>

                    {active === idx && (
                      <motion.div
                        layoutId="underline-premium"
                        style={{
                          height: 3,
                          width: "60%",
                          margin: "0 auto",
                          borderRadius: 6,
                          background: "linear-gradient(90deg,#b8fdff,#4acbff)",
                          position: "absolute",
                          bottom: -6,
                          left: "20%",
                          boxShadow: "0 2px 8px rgba(74,203,255,0.5)",
                        }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* ========================== MOBILE ========================== */}

              {/* MOBILE TOP BAR */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  paddingInline: "0.2rem",
                }}
              >
                {/* MOBILE LOGO */}
                <a
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("home")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <img
                    src="/logos/vajrasec.svg"
                    alt="VajraSec"
                    style={{ height: 28 }}
                  />
                </a>

                {/* CENTERED MENU TEXT */}
                <div
                  style={{
                    flex: 1,
                    textAlign: "center",
                    color: "#e8faff",
                    fontSize: "1rem",
                    fontWeight: 500,
                    letterSpacing: "0.5px",
                    opacity: 0.9,
                  }}
                >
                  Menu
                </div>

                {/* MOBILE HAMBURGER BUTTON */}
                <div
                  onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                  style={{
                    width: 36,
                    height: 36,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: 4,
                    cursor: "pointer",
                    borderRadius: "10px",
                    padding: 6,
                    background: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      animate={{
                        rotate:
                          isMobileMenuOpen && i !== 1
                            ? i === 0
                              ? 45
                              : -45
                            : 0,
                        y:
                          isMobileMenuOpen && i !== 1
                            ? i === 0
                              ? 5
                              : -5
                            : 0,
                        opacity: isMobileMenuOpen && i === 1 ? 0 : 1,
                      }}
                      style={{
                        width: 20,
                        height: 2,
                        backgroundColor: "#b8fdff",
                        borderRadius: 2,
                      }}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </motion.nav>

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {isMobile && isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.6)",
              zIndex: 40,
            }}
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* MOBILE SIDEBAR MENU */}
      <AnimatePresence>
        {isMobile && isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 22,
            }}
            style={{
              position: "fixed",
              right: "6%",
              top: "13%",
              width: "85%",
              maxWidth: 330,
              height: "74%",
              background: "rgba(255,255,255,0.06)",
              borderRadius: 18,
              padding: "1.6rem",
              zIndex: 50,
              backdropFilter: "blur(18px)",
              border: "1px solid rgba(255,255,255,0.14)",
              overflowY: "auto",
              boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {navItems.map((item, idx) => (
              <motion.div
                key={item.label}
                onClick={() => navigateTo(idx, item.href)}
                whileHover={{ scale: 1.03 }}
                style={{
                  padding: "1rem 0",
                  borderBottom: "1px solid rgba(255,255,255,0.12)",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    color: "#e8faff",
                    fontSize: "1.15rem",
                    fontWeight: 500,
                  }}
                >
                  {item.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
