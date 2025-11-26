// Marquee.jsx
import React from 'react'
import Marquee from 'react-fast-marquee'

// keep filenames here and construct safe URLs later (handles spaces / special chars)
const companyLogos = [
  'adobe.png',
  'american-express.png',
  'axis bank.png',
  'bajaj.png',
  
  'flipkart.png',
  'ibm.png',
  'infosys.png',
  'techm.png',
  'tenneco.png',
]

const CompanyMarquee = () => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 32,
        left: 0,
        width: '100%',
        zIndex: 2,
        background: 'rgba(0,0,0,0.15)',
        padding: '0.5rem 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      <span
        style={{
          color: '#e0e0e0',
          fontSize: '1.1rem',
          fontWeight: 500,
          letterSpacing: 0.5,
          marginBottom: 8,
        }}
      >
        Companies that believe on us
      </span>
      <Marquee gradient={false} speed={40}>
        {companyLogos.map((fileName, idx) => {
          // create a safe URL for filenames that may contain spaces/special chars
          const src = `/logos/${encodeURIComponent(fileName)}`
          // create a friendly alt text from the filename
          const base = fileName.replace(/\.[^/.]+$/, '')
          const pretty = base.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim()

          return (
            <img
              key={idx}
              src={src}
              alt={`${pretty} logo`}
              loading="lazy"
              style={{
                height: 44,
                margin: '0 36px',
                filter: 'brightness(0) invert(1)',
                opacity: 0.9,
                objectFit: 'contain',
              }}
            />
          )
        })}
      </Marquee>
    </div>
  )
}

export default CompanyMarquee
