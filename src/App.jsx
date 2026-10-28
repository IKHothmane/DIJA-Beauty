import { useEffect, useState } from 'react'
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

const ANNOUNCEMENTS = [
  'Livraison gratuite dès 490 MAD',
  '−10 % sur votre première commande | Code : DIJA10',
  'Retours faciles sous 30 jours',
]

const NAV = [
  'Accueil',
  'Boutique',
  'Nail Art',
  'Vernis Gel',
  'Outils & Accessoires',
  'Kits',
  'Nouveautés',
]

const CATEGORIES = [
  {
    name: 'Vernis Gel',
    image:
      'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=600&q=80',
  },
  {
    name: 'Outils Nail Art',
    image:
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80',
  },
  {
    name: 'Décor Nail Art',
    image:
      'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=600&q=80',
  },
  {
    name: 'Press-On Nails',
    image:
      'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=600&q=80',
  },
  {
    name: 'Stickers Ongles',
    image:
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80',
  },
  {
    name: 'Kits Complets',
    image:
      'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=600&q=80',
  },
]

const PRODUCTS = [
  {
    name: 'Vernis Gel Blush Pink',
    price: '129 MAD',
    rating: 5,
    image:
      'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=500&q=80',
  },
  {
    name: 'Set Pinceaux Liner',
    price: '189 MAD',
    rating: 5,
    image:
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&q=80',
  },
  {
    name: 'Paillettes Holographiques',
    price: '99 MAD',
    rating: 4,
    image:
      'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=500&q=80',
  },
  {
    name: 'Stickers Foil Or',
    price: '79 MAD',
    rating: 5,
    image:
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&q=80',
  },
  {
    name: 'Kit French Manucure',
    price: '249 MAD',
    rating: 5,
    image:
      'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=500&q=80',
  },
  {
    name: 'Press-On Nude Soft',
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

function Stars({ count }) {
  return (
    <span className="stars" aria-label={`${count} sur 5`}>
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
  const [annIndex, setAnnIndex] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [wishlist, setWishlist] = useState({})
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    const id = setInterval(() => {
      setAnnIndex((i) => (i + 1) % ANNOUNCEMENTS.length)
    }, 3500)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal')
    if (!nodes.length) return
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
  }, [])

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
    <div className="page">
      <div className="announce">
        <p key={annIndex} className="announce-text">
          {ANNOUNCEMENTS[annIndex]}
        </p>
      </div>

      <header className="header">
        <button
          className="icon-btn menu-btn"
          aria-label="Menu"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={22} />
        </button>

        <a href="#accueil" className="logo">
          DIJA Beauty
        </a>

        <nav className="nav-desktop" aria-label="Navigation principale">
          {NAV.map((item) => (
            <a
              key={item}
              href={`#${item === 'Accueil' ? 'accueil' : 'boutique'}`}
              className={item === 'Accueil' ? 'active' : undefined}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button className="icon-btn" aria-label="Rechercher">
            <Search size={20} />
          </button>
          <button className="icon-btn desktop-only" aria-label="Compte">
            <User size={20} />
          </button>
          <button className="icon-btn" aria-label="Favoris">
            <Heart size={20} />
          </button>
          <button className="icon-btn cart-btn" aria-label="Panier">
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
              aria-label="Fermer"
              onClick={() => setMenuOpen(false)}
            >
              <X size={22} />
            </button>
          </div>
          <nav>
            {NAV.map((item) => (
              <a
                key={item}
                href={`#${item === 'Accueil' ? 'accueil' : 'boutique'}`}
                onClick={() => setMenuOpen(false)}
              >
                {item}
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
            <p className="hero-eyebrow">Exprimer · Créer · Briller</p>
            <h1>
              DIJA Beauty
              <em> qui vous ressemble</em>
            </h1>
            <p className="hero-lead">
              Produits premium pour une créativité sans limites. La qualité du
              salon DIJA, désormais à portée de main à Rabat.
            </p>
            <div className="hero-ctas">
              <a href="#bestsellers" className="btn btn-dark">
                Acheter maintenant <ArrowRight size={16} />
              </a>
              <a href="#inspire" className="btn btn-outline">
                Explorer DIJA Beauty
              </a>
            </div>
            <ul className="trust-row">
              <li>
                <span className="trust-ico">
                  <Award size={16} strokeWidth={1.5} />
                </span>
                Qualité salon
              </li>
              <li>
                <span className="trust-ico">
                  <Sparkles size={16} strokeWidth={1.5} />
                </span>
                Tenue longue durée
              </li>
              <li>
                <span className="trust-ico">
                  <Leaf size={16} strokeWidth={1.5} />
                </span>
                Cruelty-free & vegan
              </li>
              <li>
                <span className="trust-ico">
                  <Heart size={16} strokeWidth={1.5} />
                </span>
                Aimé des nail artists
              </li>
            </ul>
          </div>
          <div className="hero-stage">
            <div className="hero-media">
              <img
                src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1400&q=85"
                alt="Manucure nail art réalisée chez DIJA Beauty"
              />
              <div className="hero-card">
                <MapPin size={16} />
                <div>
                  <p>Beauty Salon</p>
                  <strong>Agdal-Ryad, Rabat</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="boutique" className="section categories reveal">
          <div className="section-head">
            <h2>Acheter par catégorie</h2>
          </div>
          <div className="cat-grid">
            {CATEGORIES.map((cat) => (
              <a key={cat.name} href="#bestsellers" className="cat-tile">
                <div className="cat-img-wrap">
                  <img src={cat.image} alt={cat.name} loading="lazy" />
                </div>
                <div className="cat-meta">
                  <h3>{cat.name}</h3>
                  <span>
                    Voir maintenant <ArrowRight size={14} />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section id="bestsellers" className="section bestsellers reveal">
          <div className="section-head">
            <h2>Meilleures ventes</h2>
            <a href="#boutique" className="link-all">
              Tout voir <ArrowRight size={14} />
            </a>
          </div>
          <div className="product-rail">
            {PRODUCTS.map((p) => (
              <article key={p.name} className="product-card">
                <div className="product-img">
                  <img src={p.image} alt={p.name} loading="lazy" />
                  <button
                    className={`wish ${wishlist[p.name] ? 'on' : ''}`}
                    aria-label="Favori"
                    onClick={() => toggleWish(p.name)}
                  >
                    <Heart
                      size={16}
                      fill={wishlist[p.name] ? 'currentColor' : 'none'}
                    />
                  </button>
                </div>
                <h3>{p.name}</h3>
                <Stars count={p.rating} />
                <p className="price">{p.price}</p>
                <button className="add-cart" type="button" onClick={addToCart}>
                  <ShoppingBag size={14} /> Ajouter au panier
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="promo reveal">
          <div className="promo-visual">
            <img
              src="https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=900&q=80"
              alt="Séance nail art chez DIJA Beauty"
              loading="lazy"
            />
          </div>
          <div className="promo-center">
            <h2>Tout pour des ongles sublimés</h2>
            <p>
              Vernis, outils et kits sélectionnés pour les passionnées de nail
              art à Agdal-Ryad et partout au Maroc.
            </p>
            <a href="#contact" className="btn btn-dark">
              En savoir plus
            </a>
          </div>
          <ul className="promo-list">
            <li>
              <Check size={16} /> Qualité professionnelle
            </li>
            <li>
              <Check size={16} /> Sûr & non toxique
            </li>
            <li>
              <Check size={16} /> Tendances & unique
            </li>
            <li>
              <Check size={16} /> Fait avec passion
            </li>
          </ul>
        </section>

        <section id="inspire" className="section inspire reveal">
          <div className="section-head center">
            <h2>Inspirez-vous</h2>
            <p className="section-sub">@dijabeauty</p>
          </div>
          <div className="inspire-grid">
            {INSPIRATIONS.map((src, i) => (
              <a key={src + i} href="#inspire" className="inspire-tile">
                <img src={src} alt={`Inspiration nail art ${i + 1}`} loading="lazy" />
              </a>
            ))}
          </div>
        </section>

        <section className="services reveal">
          <div className="service">
            <Truck size={22} strokeWidth={1.5} />
            <div>
              <strong>Livraison</strong>
              <span>Partout au Maroc</span>
            </div>
          </div>
          <div className="service">
            <ShieldCheck size={22} strokeWidth={1.5} />
            <div>
              <strong>Paiement sécurisé</strong>
              <span>Cash ou carte</span>
            </div>
          </div>
          <div className="service">
            <RotateCcw size={22} strokeWidth={1.5} />
            <div>
              <strong>Retours faciles</strong>
              <span>Sous 30 jours</span>
            </div>
          </div>
          <div className="service">
            <Headphones size={22} strokeWidth={1.5} />
            <div>
              <strong>Support</strong>
              <span>07 67 94 67 85</span>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="footer reveal">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#accueil" className="logo">
              DIJA Beauty
            </a>
            <p>
              Votre destination nail art à Rabat. Produits premium, conseils
              experts et créativité au quotidien.
            </p>
            <p className="contact-line">
              <MapPin size={15} /> Agdal-Ryad, Rabat, Morocco
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
            <h4>Boutique</h4>
            <ul>
              <li>
                <a href="#boutique">Vernis Gel</a>
              </li>
              <li>
                <a href="#boutique">Outils</a>
              </li>
              <li>
                <a href="#boutique">Décor</a>
              </li>
              <li>
                <a href="#bestsellers">Kits</a>
              </li>
            </ul>
          </div>

          <div>
            <h4>Aide</h4>
            <ul>
              <li>
                <a href="#contact">Contact</a>
              </li>
              <li>
                <a href="#contact">Livraison</a>
              </li>
              <li>
                <a href="#contact">Retours</a>
              </li>
              <li>
                <a href="tel:+212767946785">Commander par téléphone</a>
              </li>
            </ul>
          </div>

          <div className="footer-news">
            <h4>Rejoignez la communauté</h4>
            <p>Recevez tendances, conseils et offres exclusives.</p>
            {subscribed ? (
              <p className="thanks">Merci pour votre inscription !</p>
            ) : (
              <form onSubmit={onSubscribe} className="news-form">
                <input
                  type="email"
                  placeholder="Votre e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-dark">
                  S&apos;inscrire
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} DIJA Beauty — Agdal-Ryad, Rabat</p>
          <div>
            <a href="#contact">Confidentialité</a>
            <a href="#contact">Conditions</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
