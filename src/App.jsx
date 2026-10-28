import { useEffect, useMemo, useState } from 'react'
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
  Instagram,
  Phone,
  MapPin,
  ArrowRight,
  Sparkles,
  Leaf,
  Award,
  Check,
} from 'lucide-react'
import { LANGS, getStoredLang, translations } from './i18n'

const CATEGORY_IMAGES = [
  'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=600&q=80',
  'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80',
  'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=600&q=80',
  'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=600&q=80',
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80',
  'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=600&q=80',
]

const PRODUCT_DATA = [
  {
    price: '129 MAD',
    rating: 5,
    image:
      'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=500&q=80',
  },
  {
    price: '189 MAD',
    rating: 5,
    image:
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&q=80',
  },
  {
    price: '99 MAD',
    rating: 4,
    image:
      'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=500&q=80',
  },
  {
    price: '79 MAD',
    rating: 5,
    image:
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&q=80',
  },
  {
    price: '249 MAD',
    rating: 5,
    image:
      'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=500&q=80',
  },
  {
    price: '159 MAD',
    rating: 4,
    image:
      'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=500&q=80',
  },
]

const INSPIRATIONS = [
  'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&q=80',
  'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=500&q=80',
  'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=500&q=80',
  'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=500&q=80',
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&q=80',
  'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=500&q=80',
]

const SERVICE_ICONS = [Truck, ShieldCheck, RotateCcw, Headphones]
const TRUST_ICONS = [Award, Sparkles, Leaf, Heart]

function Stars({ count, label }) {
  return (
    <span className="stars" aria-label={label}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={12}
          fill={i < count ? 'currentColor' : 'none'}
          strokeWidth={1.5}
        />
      ))}
    </span>
  )
}

export default function App() {
  const [lang, setLang] = useState(getStoredLang)
  const [annIndex, setAnnIndex] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [wishlist, setWishlist] = useState({})
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const t = translations[lang]
  const dir = LANGS.find((l) => l.code === lang)?.dir || 'ltr'

  const categories = useMemo(
    () =>
      t.categories.items.map((name, i) => ({
        name,
        image: CATEGORY_IMAGES[i],
      })),
    [t]
  )

  const products = useMemo(
    () =>
      t.bestsellers.products.map((name, i) => ({
        name,
        ...PRODUCT_DATA[i],
      })),
    [t]
  )

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
    try {
      localStorage.setItem('dija-lang', lang)
    } catch {
      /* ignore */
    }
  }, [lang, dir])

  useEffect(() => {
    setAnnIndex(0)
    const id = setInterval(() => {
      setAnnIndex((i) => (i + 1) % t.announcements.length)
    }, 3500)
    return () => clearInterval(id)
  }, [t.announcements.length, lang])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal')
    if (!nodes.length) return
    nodes.forEach((node) => node.classList.remove('is-in'))
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      nodes.forEach((node) => node.classList.add('is-in'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-in')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.16, rootMargin: '0px 0px -48px 0px' }
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [lang])

  const changeLang = (code) => {
    setLang(code)
    setMenuOpen(false)
  }

  const toggleWish = (name) => {
    setWishlist((w) => ({ ...w, [name]: !w[name] }))
  }

  const addToCart = () => setCartCount((c) => c + 1)

  const onSubscribe = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
    setEmail('')
  }

  return (
    <div className="page" lang={lang} dir={dir}>
      <div className="announce">
        <p key={`${lang}-${annIndex}`} className="announce-text">
          {t.announcements[annIndex]}
        </p>
      </div>

      <header className="header">
        <button
          className="icon-btn menu-btn"
          aria-label={t.aria.menu}
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={22} />
        </button>

        <a href="#accueil" className="logo">
          DIJA Beauty
        </a>

        <nav className="nav-desktop" aria-label={t.aria.nav}>
          {t.nav.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              className={i === 0 ? 'active' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <div className="lang-switch" role="group" aria-label={t.aria.language}>
            {LANGS.map((l) => (
              <button
                key={l.code}
                type="button"
                className={lang === l.code ? 'active' : undefined}
                onClick={() => changeLang(l.code)}
              >
                {l.label}
              </button>
            ))}
          </div>
          <button className="icon-btn" aria-label={t.aria.search}>
            <Search size={20} />
          </button>
          <button className="icon-btn desktop-only" aria-label={t.aria.account}>
            <User size={20} />
          </button>
          <button className="icon-btn" aria-label={t.aria.wishlist}>
            <Heart size={20} />
          </button>
          <button className="icon-btn cart-btn" aria-label={t.aria.cart}>
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span key={cartCount} className="cart-badge">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-nav" role="dialog" aria-modal="true">
          <div className="mobile-nav-top">
            <span className="logo">DIJA Beauty</span>
            <button
              className="icon-btn"
              aria-label={t.aria.close}
              onClick={() => setMenuOpen(false)}
            >
              <X size={22} />
            </button>
          </div>
          <div className="lang-switch mobile" role="group" aria-label={t.aria.language}>
            {LANGS.map((l) => (
              <button
                key={l.code}
                type="button"
                className={lang === l.code ? 'active' : undefined}
                onClick={() => changeLang(l.code)}
              >
                {l.label}
              </button>
            ))}
          </div>
          <nav>
            {t.nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a href="tel:+212767946785" className="mobile-phone">
            <Phone size={16} /> 07 67 94 67 85
          </a>
        </div>
      )}

      <main>
        <section id="accueil" className="hero">
          <div className="hero-copy">
            <p className="hero-eyebrow">{t.hero.eyebrow}</p>
            <h1>
              {t.hero.title}
              <em>{t.hero.titleEm}</em>
            </h1>
            <p className="hero-lead">{t.hero.lead}</p>
            <div className="hero-ctas">
              <a href="#bestsellers" className="btn btn-dark">
                {t.hero.shop} <ArrowRight size={16} />
              </a>
              <a href="#inspire" className="btn btn-outline">
                {t.hero.explore}
              </a>
            </div>
            <ul className="trust-row">
              {t.hero.trust.map((label, i) => {
                const Icon = TRUST_ICONS[i]
                return (
                  <li key={label}>
                    <span className="trust-ico">
                      <Icon size={16} strokeWidth={1.5} />
                    </span>
                    {label}
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="hero-stage">
            <div className="hero-media">
              <img
                src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1400&q=85"
                alt={t.hero.mediaAlt}
              />
              <div className="hero-card">
                <MapPin size={16} />
                <div>
                  <p>{t.hero.cardLabel}</p>
                  <strong>{t.hero.cardPlace}</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="boutique" className="section categories reveal">
          <div className="section-head">
            <h2>{t.categories.title}</h2>
          </div>
          <div className="cat-grid">
            {categories.map((cat) => (
              <a key={cat.name} href="#bestsellers" className="cat-tile">
                <div className="cat-img-wrap">
                  <img src={cat.image} alt={cat.name} loading="lazy" />
                </div>
                <div className="cat-meta">
                  <h3>{cat.name}</h3>
                  <span>
                    {t.categories.seeNow} <ArrowRight size={14} />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section id="bestsellers" className="section bestsellers reveal">
          <div className="section-head">
            <h2>{t.bestsellers.title}</h2>
            <a href="#boutique" className="link-all">
              {t.bestsellers.seeAll} <ArrowRight size={14} />
            </a>
          </div>
          <div className="product-rail">
            {products.map((p) => (
              <article key={p.name} className="product-card">
                <div className="product-img">
                  <img src={p.image} alt={p.name} loading="lazy" />
                  <button
                    className={`wish ${wishlist[p.name] ? 'on' : ''}`}
                    aria-label={t.aria.favorite}
                    onClick={() => toggleWish(p.name)}
                  >
                    <Heart
                      size={16}
                      fill={wishlist[p.name] ? 'currentColor' : 'none'}
                    />
                  </button>
                </div>
                <h3>{p.name}</h3>
                <Stars
                  count={p.rating}
                  label={t.aria.stars.replace('{n}', String(p.rating))}
                />
                <p className="price">{p.price}</p>
                <button className="add-cart" type="button" onClick={addToCart}>
                  <ShoppingBag size={14} /> {t.bestsellers.addCart}
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="promo reveal">
          <div className="promo-visual">
            <img
              src="https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=900&q=80"
              alt={t.promo.alt}
              loading="lazy"
            />
          </div>
          <div className="promo-center">
            <h2>{t.promo.title}</h2>
            <p>{t.promo.text}</p>
            <a href="#contact" className="btn btn-dark">
              {t.promo.more}
            </a>
          </div>
          <ul className="promo-list">
            {t.promo.points.map((point) => (
              <li key={point}>
                <Check size={16} /> {point}
              </li>
            ))}
          </ul>
        </section>

        <section id="inspire" className="section inspire reveal">
          <div className="section-head center">
            <h2>{t.inspire.title}</h2>
            <p className="section-sub">{t.inspire.handle}</p>
          </div>
          <div className="inspire-grid">
            {INSPIRATIONS.map((src, i) => (
              <a key={src + i} href="#inspire" className="inspire-tile">
                <img
                  src={src}
                  alt={t.inspire.alt.replace('{n}', String(i + 1))}
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </section>

        <section className="services reveal">
          {t.services.map((service, i) => {
            const Icon = SERVICE_ICONS[i]
            return (
              <div className="service" key={service.title}>
                <Icon size={22} strokeWidth={1.5} />
                <div>
                  <strong>{service.title}</strong>
                  <span>{service.text}</span>
                </div>
              </div>
            )
          })}
        </section>
      </main>

      <footer id="contact" className="footer reveal">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#accueil" className="logo">
              DIJA Beauty
            </a>
            <p>{t.footer.about}</p>
            <p className="contact-line">
              <MapPin size={15} /> {t.footer.address}
            </p>
            <p className="contact-line">
              <Phone size={15} />{' '}
              <a href="tel:+212767946785">07 67 94 67 85</a>
            </p>
            <div className="socials">
              <a href="https://instagram.com" aria-label="Instagram">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4>{t.footer.shop}</h4>
            <ul>
              {t.footer.shopLinks.map((label, i) => (
                <li key={label}>
                  <a href={i === 3 ? '#bestsellers' : '#boutique'}>{label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>{t.footer.help}</h4>
            <ul>
              {t.footer.helpLinks.map((label, i) => (
                <li key={label}>
                  <a href={i === 3 ? 'tel:+212767946785' : '#contact'}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-news">
            <h4>{t.footer.community}</h4>
            <p>{t.footer.communityText}</p>
            {subscribed ? (
              <p className="thanks">{t.footer.thanks}</p>
            ) : (
              <form onSubmit={onSubscribe} className="news-form">
                <input
                  type="email"
                  placeholder={t.footer.email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-dark">
                  {t.footer.subscribe}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            {t.footer.rights.replace('{year}', String(new Date().getFullYear()))}
          </p>
          <div>
            <a href="#contact">{t.footer.privacy}</a>
            <a href="#contact">{t.footer.terms}</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
