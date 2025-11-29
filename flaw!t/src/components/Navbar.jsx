/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", href: "home" },
  { label: "Services", href: "services" },
  { label: "Highlights", href: "highlights" },
  { label: "Blogs", href: "blogs" },
  { label: "Contact", href: "footer" },
];

const Navbar = () => {
  const [mobile, setMobile] = useState(true);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const navigateTo = (idx, href) => {
    setActive(idx);
    setOpen(false);

    if (href.toLowerCase() === "blogs") {
      window.open("/blogs", "_blank");
      return;
    }
    const el = document.getElementById(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* NAVBAR MAIN */}
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 100,
          background: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
        className="shadow-lg"
      >
        <div
          style={{
            maxWidth: "1080px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: mobile ? "0.75rem 1rem" : "1rem 2rem",
          }}
        >
          {/* LOGO */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("home")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            <img
              src="/vajraseclogo.png"
              alt="VajraSec"
              style={{ height: mobile ? 32 : 48, objectFit: "contain" }}
            />
          </a>

          {/* DESKTOP NAV */}
          {!mobile && (
            <div
              style={{
                display: "flex",
                gap: "2rem",
                alignItems: "center",
              }}
            >
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.label}
                  onClick={() => navigateTo(idx, item.href)}
                  whileHover={{ scale: 1.1 }}
                  style={{
                    position: "relative",
                    cursor: "pointer",
                    color: active === idx ? "#b8fdff" : "#dbeafe",
                    fontWeight: 500,
                    fontSize: 18,
                  }}
                >
                  {item.label}
                  {active === idx && (
                    <motion.div
                      layoutId="underline"
                      style={{
                        height: 3,
                        width: "60%",
                        background:
                          "linear-gradient(90deg,#b8fdff,#4acbff,#0088ff)",
                        borderRadius: 6,
                        margin: "4px auto 0 auto",
                      }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          )}

          {/* MOBILE HAMBURGER */}
          {mobile && (
            <div
              onClick={() => setOpen((p) => !p)}
              style={{
                width: 40,
                height: 40,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 5,
                cursor: "pointer",
                borderRadius: 8,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.12)",
                backdropFilter: "blur(8px)",
              }}
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  animate={{
                    rotate:
                      open && i !== 1 ? (i === 0 ? 45 : -45) : 0,
                    y:
                      open && i !== 1 ? (i === 0 ? 6 : -6) : 0,
                    opacity: open && i === 1 ? 0 : 1,
                  }}
                  style={{
                    width: 22,
                    height: 2.5,
                    background: "#b8fdff",
                    borderRadius: 2,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </motion.nav>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {mobile && open && (
          <motion.div
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.6)",
              zIndex: 90,
            }}
          />
        )}
      </AnimatePresence>

      {/* MOBILE MENU DRAWER */}
      <AnimatePresence>
        {mobile && open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            style={{
              position: "fixed",
              top: 72,
              right: 0,
              width: "100%",
              height: "calc(100% - 72px)",
              background: "rgba(0,0,0,0.35)",
              backdropFilter: "blur(18px)",
              zIndex: 100,
              padding: "2rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.2rem",
            }}
          >
            {navItems.map((item, idx) => (
              <div
                key={item.label}
                onClick={() => navigateTo(idx, item.href)}
                style={{
                  padding: "1rem 0",
                  borderBottom: "1px solid rgba(255,255,255,0.12)",
                  textAlign: "center",
                  color: "#e8faff",
                  fontSize: "1.2rem",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                {item.label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
