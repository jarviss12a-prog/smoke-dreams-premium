import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

// ─── Animation Variants ───
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } }
}

const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } }
}

// ─── CountUp Component ───
function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2000
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target])

  return <span ref={ref}>{count}{suffix}</span>
}

// ─── Images ───
const HERO_IMG = 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80&auto=format'
const ABOUT_IMG = 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80&auto=format'

// ─── Categories Data ───
const categories = [
  { icon: '🚬', name: 'Tobacco & Cigars', desc: 'Premium cigars, loose leaf tobacco, and rolling supplies' },
  { icon: '🌿', name: 'Delta & Cannabis', desc: 'Delta-8, Delta-9, HHC, and CBD products' },
  { icon: '💨', name: 'Hookah & Shisha', desc: 'Hookahs, shisha flavors, coals, and accessories' },
  { icon: '🔮', name: 'Glass Pipes', desc: 'Hand-blown glass, bubblers, and water pipes' },
  { icon: '🍬', name: 'Edibles', desc: 'Gummies, chocolates, and infused treats' },
  { icon: '⚡', name: 'E-Cigs & Vape', desc: 'Disposables, mods, pods, and premium e-liquids' },
]

const marqueeItems = [
  '🚬 Tobacco & Cigars',
  '🌿 Delta & Cannabis',
  '💨 Hookah & Shisha',
  '🔮 Glass Pipes',
  '🍬 Edibles',
  '⚡ E-Cigs & Vape',
  '🌀 Grinders & Accessories',
]

// ─── Nav ───
function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(8,8,16,0.85)' : 'rgba(8,8,16,0.4)',
        backdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid rgba(139,92,246,0.15)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="text-2xl font-bold tracking-tight" style={{
          fontFamily: "'Space Grotesk', sans-serif",
          background: 'linear-gradient(135deg, #8b5cf6, #c026d3)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          SMOKE DREAMS
        </a>
        <div className="hidden md:flex items-center gap-8">
          <a href="#products" className="text-sm text-[#94a3b8] hover:text-white transition-colors">Products</a>
          <a href="#about" className="text-sm text-[#94a3b8] hover:text-white transition-colors">About</a>
          <a href="#hours" className="text-sm text-[#94a3b8] hover:text-white transition-colors">Hours</a>
          <a
            href="https://maps.google.com/?q=2527+N+Lincoln+Ave+Chicago+IL+60614"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #8b5cf6, #c026d3)',
              boxShadow: '0 0 20px rgba(139,92,246,0.3)',
            }}
          >
            Visit Us
          </a>
        </div>
      </div>
    </motion.nav>
  )
}

// ─── Hero ───
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Animated gradient mesh */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
          style={{
            background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)',
            top: '10%',
            left: '20%',
            animation: 'meshMove 15s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-15 blur-[100px]"
          style={{
            background: 'radial-gradient(circle, #c026d3 0%, transparent 70%)',
            bottom: '10%',
            right: '10%',
            animation: 'meshMove 20s ease-in-out infinite reverse',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-10 blur-[80px]"
          style={{
            background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)',
            top: '50%',
            left: '60%',
            animation: 'meshMove 18s ease-in-out infinite 2s',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={fadeUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  background: 'rgba(139,92,246,0.1)',
                  border: '1px solid rgba(139,92,246,0.3)',
                  color: '#c4b5fd',
                  fontFamily: "'DM Mono', monospace",
                }}>
                ⭐ 4.8 Rated on Google
              </span>
            </motion.div>

            {/* Headline - Staircase */}
            <motion.h1 variants={fadeLeft} className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#94a3b8' }}>
              YOUR NEIGHBORHOOD
            </motion.h1>
            <motion.h1
              variants={fadeUp}
              className="text-5xl sm:text-6xl lg:text-8xl font-black leading-[1] tracking-tighter mb-6"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                background: 'linear-gradient(135deg, #8b5cf6 0%, #c026d3 50%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 30px rgba(139,92,246,0.3))',
              }}
            >
              SMOKE SHOP
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg text-[#94a3b8] max-w-lg mb-8 leading-relaxed">
              Lincoln Park's premier destination for premium tobacco, delta products, hookah, glass, and more. Serving the DePaul community since day one.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <a
                href="#products"
                className="px-8 py-4 rounded-full text-base font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6, #c026d3)',
                  boxShadow: '0 0 30px rgba(139,92,246,0.3)',
                }}
              >
                Browse Products
              </a>
              <a
                href="#hours"
                className="px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  background: 'rgba(139,92,246,0.1)',
                  border: '1px solid rgba(139,92,246,0.3)',
                  color: '#c4b5fd',
                }}
              >
                Hours & Location
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, x: 80, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block relative"
          >
            <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: '0 0 60px rgba(139,92,246,0.2)' }}>
              <img
                src={HERO_IMG}
                alt="Smoke Dreams lounge interior"
                className="w-full h-[500px] object-cover"
                loading="eager"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,8,16,0.8) 0%, transparent 50%)' }} />
            </div>
            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -bottom-6 -left-6 px-5 py-3 rounded-xl"
              style={{
                background: 'rgba(15,15,26,0.9)',
                border: '1px solid rgba(139,92,246,0.3)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <p className="text-sm font-semibold" style={{ color: '#c4b5fd', fontFamily: "'DM Mono', monospace" }}>📦 UPS Access Point</p>
              <p className="text-xs text-[#94a3b8]">Pick up packages here</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── Marquee Strip ───
function MarqueeStrip() {
  return (
    <div className="relative py-6 overflow-hidden" style={{ borderTop: '1px solid rgba(139,92,246,0.1)', borderBottom: '1px solid rgba(139,92,246,0.1)' }}>
      <div className="flex" style={{ animation: 'marquee 30s linear infinite', width: 'max-content' }}>
        {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
          <span
            key={i}
            className="mx-4 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap"
            style={{
              background: 'rgba(139,92,246,0.08)',
              border: '1px solid rgba(139,92,246,0.2)',
              color: '#c4b5fd',
              fontFamily: "'DM Mono', monospace",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Categories Grid ───
function Categories() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="products" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.span variants={fadeUp} className="inline-block px-4 py-1.5 rounded-full text-xs font-medium mb-4" style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.3)', color: '#c4b5fd', fontFamily: "'DM Mono', monospace" }}>
            WHAT WE CARRY
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Premium Selection
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#94a3b8] text-lg max-w-2xl mx-auto">
            Curated products for every preference. From classic tobacco to cutting-edge alternatives.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ scale: 1.03, y: -4 }}
              className="group p-6 rounded-2xl transition-all duration-300 cursor-default"
              style={{
                background: 'rgba(15,15,26,0.6)',
                border: '1px solid rgba(139,92,246,0.15)',
                backdropFilter: 'blur(10px)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(139,92,246,0.5)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(139,92,246,0.15)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(139,92,246,0.15)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
              }}
            >
              <span className="text-4xl mb-4 block">{cat.icon}</span>
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{cat.name}</h3>
              <p className="text-[#94a3b8] text-sm leading-relaxed">{cat.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Student Discount Banner ───
function StudentBanner() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section className="py-20 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(192,38,211,0.15) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.2) 0%, transparent 70%)' }} />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
      >
        <motion.h2
          className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-4"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            background: 'linear-gradient(90deg, #8b5cf6, #c026d3, #8b5cf6, #c026d3)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'shimmer 3s linear infinite',
          }}
        >
          20% OFF FOR DePAUL STUDENTS
        </motion.h2>
        <p className="text-xl text-[#c4b5fd] font-medium mb-2">Show your valid DePaul University ID at checkout</p>
        <p className="text-[#94a3b8]">Just steps from campus on Lincoln Ave</p>
      </motion.div>
    </section>
  )
}

// ─── About Section ───
function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const features = [
    'Est. in Lincoln Park',
    'Premium Selection',
    'Friendly Staff',
  ]

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden" style={{ boxShadow: '0 0 40px rgba(139,92,246,0.15)' }}>
              <img
                src={ABOUT_IMG}
                alt="Smoke Dreams store"
                className="w-full h-[400px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 rounded-2xl" style={{ border: '1px solid rgba(139,92,246,0.2)' }} />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.span variants={fadeUp} className="inline-block px-4 py-1.5 rounded-full text-xs font-medium mb-4" style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.3)', color: '#c4b5fd', fontFamily: "'DM Mono', monospace" }}>
              OUR STORY
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold tracking-tight mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Your Go-To Smoke Shop in Lincoln Park
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#94a3b8] text-lg leading-relaxed mb-8">
              Smoke Dreams has been a neighborhood staple in the heart of DePaul / Lincoln Park. We pride ourselves on carrying the widest selection of premium products at competitive prices, with a knowledgeable and friendly team ready to help you find exactly what you need.
            </motion.p>

            {/* Feature pills */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-10">
              {features.map((f, i) => (
                <span key={i} className="px-4 py-2 rounded-full text-sm font-medium" style={{
                  background: 'rgba(139,92,246,0.08)',
                  border: '1px solid rgba(139,92,246,0.25)',
                  color: '#c4b5fd',
                }}>
                  {f}
                </span>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} className="grid grid-cols-3 gap-6">
              {[
                { target: 500, suffix: '+', label: 'Products' },
                { target: 10, suffix: '+', label: 'Years' },
                { target: 4.8, suffix: '★', label: 'Rating' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#8b5cf6' }}>
                    {stat.target === 4.8 ? (
                      <span>{inView ? '4.8' : '0'}{stat.suffix}</span>
                    ) : (
                      <CountUp target={stat.target} suffix={stat.suffix} />
                    )}
                  </div>
                  <div className="text-sm text-[#94a3b8] mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── Hours & Location ───
function Hours() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const hours = [
    { day: 'Monday – Saturday', time: '10:00 AM – 10:00 PM' },
    { day: 'Sunday', time: '11:00 AM – 9:00 PM' },
  ]

  return (
    <section id="hours" className="py-24 relative" ref={ref}>
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="rounded-3xl p-8 md:p-12 relative overflow-hidden"
          style={{
            background: 'rgba(15,15,26,0.8)',
            border: '1px solid rgba(139,92,246,0.2)',
            boxShadow: '0 0 60px rgba(139,92,246,0.08)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {/* Glow */}
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-20 blur-[60px]" style={{ background: '#8b5cf6' }} />

          <div className="grid md:grid-cols-2 gap-10 relative z-10">
            {/* Hours */}
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium mb-6" style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.3)', color: '#c4b5fd', fontFamily: "'DM Mono', monospace" }}>
                STORE HOURS
              </span>
              <div className="space-y-4">
                {hours.map((h, i) => (
                  <div key={i} className="flex justify-between items-center pb-3" style={{ borderBottom: '1px solid rgba(139,92,246,0.1)' }}>
                    <span className="text-[#f8fafc] font-medium">{h.day}</span>
                    <span className="text-[#c4b5fd] font-semibold" style={{ fontFamily: "'DM Mono', monospace" }}>{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium mb-6" style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.3)', color: '#c4b5fd', fontFamily: "'DM Mono', monospace" }}>
                FIND US
              </span>
              <div className="space-y-4">
                <div>
                  <p className="text-[#f8fafc] font-medium">2527 N Lincoln Ave</p>
                  <p className="text-[#94a3b8]">Chicago, IL 60614</p>
                  <p className="text-[#94a3b8]">DePaul / Lincoln Park</p>
                </div>
                <div>
                  <a href="tel:+17736616039" className="text-[#c4b5fd] hover:text-white transition-colors font-medium">(773) 661-6039</a>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.15)' }}>
                  <span>📦</span>
                  <span className="text-sm text-[#c4b5fd] font-medium">UPS Access Point Inside</span>
                </div>
                <a
                  href="https://maps.google.com/?q=2527+N+Lincoln+Ave+Chicago+IL+60614"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:scale-105 mt-2"
                  style={{
                    background: 'linear-gradient(135deg, #8b5cf6, #c026d3)',
                    boxShadow: '0 0 20px rgba(139,92,246,0.3)',
                  }}
                >
                  Get Directions →
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Footer ───
function Footer() {
  return (
    <footer className="py-12 relative" style={{ borderTop: '1px solid rgba(139,92,246,0.1)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-1" style={{
              fontFamily: "'Space Grotesk', sans-serif",
              background: 'linear-gradient(135deg, #8b5cf6, #c026d3)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              SMOKE DREAMS
            </h3>
            <p className="text-sm text-[#94a3b8]">2527 N Lincoln Ave, Chicago, IL 60614</p>
            <p className="text-sm text-[#94a3b8]">(773) 661-6039</p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-xs text-[#64748b]">
              Website by <span className="text-[#94a3b8]">Corner Digital Group</span>
            </p>
            <p className="text-xs text-[#475569] mt-1">© {new Date().getFullYear()} Smoke Dreams LLC. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── App ───
export default function App() {
  return (
    <div className="relative">
      <Nav />
      <Hero />
      <MarqueeStrip />
      <Categories />
      <StudentBanner />
      <About />
      <Hours />
      <Footer />
    </div>
  )
}
