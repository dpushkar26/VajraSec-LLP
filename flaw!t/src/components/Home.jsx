import React from 'react';
// import BlurText from './BlurText';
import Navbar from './Navbar';
import Marquee from 'react-fast-marquee';
import Services from './Services';
import Highlight from './Highlight';
import Expertise from './Expertise';
import Footer from './Footer';
import Threads from './ui/Threads';

// filenames present in public/logos (we build safe URLs at render time)
const companyLogos = [
  'DSCI.svg',
  'adobe.png',
  'artech.png',
  'american-express.png',
  'axis bank.png',
  'bajaj.png',
  'flipkart.png',
  'ibm.png',
  'infosys.png',
  'techm.png',
  'tenneco.png',
  'apstate.png',
  'indianclg.png',
  'ipclg.png',
  'presidency.png',
  'takshila.png',
  'venkaclg.png',
  'kaziranga uni.png',
  'met.png',
  'blogdemo.png',
];

// Fallback component in case Threads fails to load
const FallbackBackground = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-900/20 to-purple-900/10 z-0"></div>
);

const Home = () => {
  const [backgroundLoaded, setBackgroundLoaded] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setBackgroundLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #0b0f1a;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.2);
        }`}
      </style>

      {/* ========== HERO SECTION ========== */}
      <section
        id="home"
        className="relative w-full min-h-screen overflow-hidden font-[Montserrat] bg-black text-white"
      >
        {/* Background Visuals with fallback */}
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          {backgroundLoaded ? <Threads /> : <FallbackBackground />}
        </div>

        {/* Navbar */}
        <Navbar />

        {/* Hero Content */}
        <div className="absolute inset-0 z-10 flex flex-col items-center 
    justify-start md:justify-center 
    px-6 text-center 
    pt-[90px] md:pt-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 leading-tight">
            Protect What Matters
          </h1>
          <p className="max-w-xl text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed px-4 mt-4 md:mt-6">
            We empower organizations to stay ahead of threats with intelligent,
            customized cybersecurity solutions that scale with your business.
          </p>

          {/* Company Logos Marquee with more space below */}
          <div className="mt-20 md:mt-28 w-full max-w-5xl rounded-xl border border-white/10 backdrop-blur-sm bg-white/5 px-4 py-6 shadow-lg mx-4 hero-logos-wrapper">
            <div className="uppercase text-xs sm:text-sm font-medium text-white/70 tracking-wider mb-3 md:mb-4">
              Trusted by industry leaders & Academic Partners
            </div>
            <Marquee gradient={false} speed={40} pauseOnHover>
              {companyLogos.map((src, idx) => (
                <div key={idx} className="flex items-center justify-center mx-3 md:mx-6 h-7 md:h-10 overflow-hidden">
                  <div className="h-full flex items-center">
                        <img
                          src={`/logos/${encodeURIComponent(src)}`}
                          alt={`${src.replace(/\.[^/.]+$/, '').replace(/[-_]+/g, ' ')} logo`}
                          loading="lazy"
                          className="h-full max-w-[110px] md:max-w-none object-contain opacity-70 transition duration-300 ease-in-out hover:opacity-100 hover:scale-110"
                          style={{ filter: 'brightness(0) invert(1)' }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            if (e.target.nextSibling) e.target.nextSibling.style.display = 'block';
                          }}
                        />
                    <span
                      className="text-white text-xs font-medium hidden"
                      style={{
                        filter: 'brightness(0) invert(1)',
                        width: 'max-content'
                      }}
                    >
                      {src.split('/').pop().split('.')[0]}
                    </span>
                  </div>
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </section>

      {/* ========== SERVICES SECTION ========== */}
      <section id="services">
        <Services />
      </section>

      {/* ========== HIGHLIGHTS SECTION ========== */}
      <section id="highlights">
        <Highlight />
      </section>

      {/* ========== EXPERTISE SECTION ========== */}
      <section id="expertise" className="bg-[#0b0f1a] text-white">
        <Expertise />
      </section>

      {/* ========== FOOTER SECTION ========== */}
      <section id="footer" className="bg-[#0b0f1a] text-white">
        <Footer />
      </section>
    </>
  );
};

export default Home;
