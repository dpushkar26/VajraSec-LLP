/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { label: 'Home', href: 'home' },
  { label: 'Services', href: 'services' },
  { label: 'Highlights', href: 'highlights' },
  { label: 'Blogs', href: 'Blogs' },
  { label: 'Contact', href: 'footer' }
]

const Navbar = () => {
  const [active, setActive] = useState(0)
  const [showNavbar, setShowNavbar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setShowNavbar(currentScrollY < lastScrollY || currentScrollY < 100)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const handleNavigation = (idx, href) => {
    setActive(idx)
    setIsMobileMenuOpen(false)

    if (href.toLowerCase() === 'blogs') {
      window.open('/blogs', '_blank')
    } else {
      const section = document.getElementById(href)
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <>
      {/* Outer navbar container */}
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: showNavbar ? 0 : -100 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 50,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: isMobile ? '0.5rem' : '2rem',
            background: 'rgba(20,20,30,0.35)',
            borderRadius: '1.5rem',
            padding: isMobile ? '0.8rem 1.2rem' : '1rem 2.5rem',
            boxShadow: '0 8px 32px 0 rgba(31,38,135,0.18)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.04)',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: 1200,
            width: '90%',
          }}
        >
          {!isMobile ? (
            navItems.map((item, idx) => (
              <div
                key={item.label}
                style={{
                  position: 'relative',
                  minWidth: 90,
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
                onClick={() => handleNavigation(idx, item.href)}
              >
                <motion.span
                  animate={{
                    color: active === idx ? '#fff' : '#a0aec0',
                    fontWeight: active === idx ? 700 : 400,
                    letterSpacing: active === idx ? 1 : 0,
                    scale: active === idx ? 1.08 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    fontSize: 20,
                    padding: '0.5rem 1.5rem',
                    borderRadius: 8,
                    userSelect: 'none',
                    background: active === idx ? 'rgba(255,255,255,0.08)' : 'none',
                    boxShadow:
                      active === idx ? '0 2px 8px rgba(59,130,246,0.08)' : 'none',
                  }}
                >
                  {item.label}
                </motion.span>
              </div>
            ))
          ) : (
            <>
              <motion.div
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#fff',
                  padding: '0 0.5rem',
                  flex: 1,
                  textAlign: 'center',
                }}
              >
                Logo
              </motion.div>

              <motion.div
                style={{
                  width: 30,
                  height: 30,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  padding: '0.5rem',
                }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <motion.span
                  animate={{
                    rotate: isMobileMenuOpen ? 45 : 0,
                    y: isMobileMenuOpen ? 6 : 0,
                    backgroundColor: isMobileMenuOpen ? '#fff' : '#a0aec0',
                  }}
                  style={{
                    display: 'block',
                    height: 2,
                    width: 20,
                    backgroundColor: '#a0aec0',
                    marginBottom: 4,
                    borderRadius: 2,
                  }}
                />
                <motion.span
                  animate={{
                    opacity: isMobileMenuOpen ? 0 : 1,
                    backgroundColor: isMobileMenuOpen ? '#fff' : '#a0aec0',
                  }}
                  style={{
                    display: 'block',
                    height: 2,
                    width: 20,
                    backgroundColor: '#a0aec0',
                    marginBottom: 4,
                    borderRadius: 2,
                  }}
                />
                <motion.span
                  animate={{
                    rotate: isMobileMenuOpen ? -45 : 0,
                    y: isMobileMenuOpen ? -6 : 0,
                    backgroundColor: isMobileMenuOpen ? '#fff' : '#a0aec0',
                  }}
                  style={{
                    display: 'block',
                    height: 2,
                    width: 20,
                    backgroundColor: '#a0aec0',
                    borderRadius: 2,
                  }}
                />
              </motion.div>
            </>
          )}
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobile && isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.7)',
              zIndex: 40,
              backdropFilter: 'blur(4px)',
            }}
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Floating Mobile menu */}
      <AnimatePresence>
        {isMobile && isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              position: 'fixed',
              top: '10%',
              right: '5%',
              bottom: '10%',
              width: '70%',
              maxWidth: 300,
              backgroundColor: 'rgba(20,20,30,0.95)',
              zIndex: 45,
              padding: '2rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              backdropFilter: 'blur(12px)',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            }}
          >
            {navItems.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                style={{
                  padding: '1rem 0',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
                onClick={() => handleNavigation(idx, item.href)}
              >
                <motion.span
                  animate={{
                    color: active === idx ? '#fff' : '#a0aec0',
                    fontWeight: active === idx ? 700 : 400,
                  }}
                  style={{
                    fontSize: '1.2rem',
                  }}
                >
                  {item.label}
                </motion.span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
