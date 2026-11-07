import { useEffect, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown, Menu, ShoppingCart, X } from 'lucide-react'
import { useCart } from '#/context/CartContext'

/* -------------------------------------------------------------------------- */
/*  Mobile nav links (keep in sync with the desktop links below)              */
/* -------------------------------------------------------------------------- */

const NAV = [
  {
    label: 'Shop',
    items: [
      { label: 'Originals', to: '/originals' },
      { label: 'Prints', to: '/prints' },
    ],
  },
  {
    label: 'Portfolio',
    items: [
      { label: 'Paintings', to: '/paintings' },
      { label: 'Drawings', to: '/drawings' },
      { label: 'Graphic design', to: '/graphicdesign' },
    ],
  },
  { label: 'About', to: '/about' },
] as const

type NavEntry = (typeof NAV)[number]

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black'

/* -------------------------------------------------------------------------- */
/*  DESKTOP: your original layout and styling, untouched visually             */
/*  (only the mobile branches and invalid classes were removed)               */
/* -------------------------------------------------------------------------- */

function DesktopNav({ cartCount }: { cartCount: number }) {
  const [isShopOpen, setIsShopOpen] = useState(false)
  const [isWorksOpen, setIsWorksOpen] = useState(false)

  const closeAll = () => {
    setIsShopOpen(false)
    setIsWorksOpen(false)
  }

  // Lets keyboard users open the dropdown triggers (no visual change)
  const onActivate = (fn: () => void) => (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      fn()
    }
  }

  const toggleShop = () => {
    setIsShopOpen(!isShopOpen)
    setIsWorksOpen(false)
  }
  const toggleWorks = () => {
    setIsWorksOpen(!isWorksOpen)
    setIsShopOpen(false)
  }

  const dim = isShopOpen || isWorksOpen ? 'opacity-30' : 'opacity-100'

  return (
    <div className="hidden lg:block">
      <div style={{ transform: 'translateY(-130px)' }} className="z-40 fixed w-full">
        <div
          className={`${
            isShopOpen ? 'transition-all h-70' : `transition-all ${isWorksOpen ? 'h-90' : 'h-55'}`
          } fixed bg-white w-full items-center flex flex-row`}
        >
          <nav className="flex py-8 px-60 w-full fixed top-30 justify-between items-center flex-row">
            <div className="w-full flex flex-row relative">
              <Link onClick={closeAll} to="/">
                <img
                  draggable={false}
                  className="absolute w-25 -bottom-8"
                  src="/assets/graphics/graphic1.svg"
                  alt="Home"
                />
              </Link>
            </div>

            <div className="flex flex-row gap-8 items-center text-lg">
              <ul className="z-100 top-0 relative right-0 flex flex-row text-center items-center justify-between gap-4">
                <li
                  role="button"
                  tabIndex={0}
                  aria-expanded={isShopOpen}
                  onKeyDown={onActivate(toggleShop)}
                  className={`${dim} font-light transition-all duration-150 cursor-pointer hover:-translate-y-0.5 ease-in-out`}
                  onClick={toggleShop}
                >
                  Shop
                </li>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isShopOpen ? 1 : 0, y: isShopOpen ? 0 : -10 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className={`${!isShopOpen ? 'hidden' : 'absolute top-11 '} flex flex-col gap-2 font-medium right-33 text-center`}
                >
                  <li className="cursor-pointer">
                    <Link onClick={closeAll} to="/originals">Originals</Link>
                  </li>
                  <li className="cursor-pointer">
                    <Link onClick={closeAll} to="/prints">Prints</Link>
                  </li>
                </motion.div>

                <div className="flex-row flex gap-4">
                  <li
                    role="button"
                    tabIndex={0}
                    aria-expanded={isWorksOpen}
                    onKeyDown={onActivate(toggleWorks)}
                    className={`${dim} font-light cursor-pointer hover:-translate-y-0.5 transition-all duration-100 ease-in-out`}
                    onClick={toggleWorks}
                  >
                    Portfolio
                  </li>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isWorksOpen ? 1 : 0, y: isWorksOpen ? 10 : 0 }}
                    exit={{ opacity: 0, y: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className={`text-center ${!isWorksOpen ? 'hidden' : 'w-50 font-medium absolute left-0 flex flex-col gap-3 top-10'}`}
                  >
                    <li className="cursor-pointer">
                      <Link onClick={closeAll} to="/paintings">Paintings</Link>
                    </li>
                    <li className="cursor-pointer">
                      <Link onClick={closeAll} to="/drawings">Drawings</Link>
                    </li>
                    <li className="cursor-pointer">
                      <Link onClick={closeAll} to="/graphicdesign">Graphic Design</Link>
                    </li>
                  </motion.div>

                  <div>
                    <li className={`${dim} font-light hover:-translate-y-0.5 transition-all duration-100 ease-in-out`}>
                      <Link onClick={closeAll} to="/about">About</Link>
                    </li>
                  </div>
                </div>
              </ul>

              <div className="flex items-center gap-5 flex-row">
                <div className="relative">
                  <Link onClick={closeAll} to="/cart" aria-label="Cart">
                    <ShoppingCart size={30} strokeWidth={1.75} />
                    {cartCount > 0 && (
                      <span className="absolute left-5 inline-flex rounded-full justify-center bg-black text-white size-4 text-xs top-0 items-center">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  MOBILE: redesigned                                                        */
/* -------------------------------------------------------------------------- */

const BAR_H = 70 // matches the visible height of your original mobile bar

function MobileNav({ cartCount }: { cartCount: number }) {
  const [open, setOpen] = useState(false)
  const [group, setGroup] = useState<string | null>(null)

  const reduceMotion = useReducedMotion()
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  const spring = reduceMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 500, damping: 40 }

  // Close on navigation
  useEffect(() => {
    setOpen(false)
    setGroup(null)
  }, [pathname])

  // Escape closes the menu
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // Lock page scroll while open
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  // Reset if the window grows to desktop size
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const renderEntry = (entry: NavEntry) => {
    const rowClass = `flex w-full items-center justify-between py-4 text-2xl font-light ${focusRing}`

    if (!('items' in entry)) {
      return (
        <li key={entry.label} className="border-b border-black/10">
          <Link to={entry.to} className={rowClass} activeProps={{ className: 'font-normal' }}>
            {entry.label}
          </Link>
        </li>
      )
    }

    const isOpen = group === entry.label
    const panelId = `mobile-group-${entry.label}`

    return (
      <li key={entry.label} className="border-b border-black/10">
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setGroup(isOpen ? null : entry.label)}
          className={rowClass}
        >
          {entry.label}
          <ChevronDown
            size={22}
            strokeWidth={1.5}
            className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.ul
              id={panelId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={spring}
              className="overflow-hidden"
            >
              {entry.items.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={`block py-3 pl-4 text-xl font-light text-black/70 ${focusRing}`}
                    activeProps={{ className: 'text-black font-normal' }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="h-2" aria-hidden />
            </motion.ul>
          )}
        </AnimatePresence>
      </li>
    )
  }

  return (
    <div className="lg:hidden">
      <header
        style={{ height: BAR_H }}
        className="fixed inset-x-0 top-0 z-40 border-b border-black/10 bg-white"
      >
        <nav aria-label="Main" className="flex h-full items-center justify-between px-5">
          <Link to="/" aria-label="Home" className={`shrink-0 ${focusRing}`}>
            <img src="/assets/graphics/graphic1.svg" alt="" draggable={false} className="h-10 w-auto" />
          </Link>

          <div className="flex items-center gap-1">
            <Link
              to="/cart"
              aria-label={cartCount > 0 ? `Cart, ${cartCount} items` : 'Cart'}
              className={`relative grid size-10 place-items-center rounded-full transition-colors hover:bg-black/5 ${focusRing}`}
            >
              <ShoppingCart size={26} strokeWidth={1.75} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    className="absolute right-0 top-1 grid h-4.5 min-w-4.5 place-items-center rounded-full bg-black px-1 text-[11px] font-medium leading-none text-white tabular-nums"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className={`grid size-10 place-items-center rounded-full transition-colors hover:bg-black/5 ${focusRing}`}
            >
              {open ? <X size={26} strokeWidth={1.75} /> : <Menu size={26} strokeWidth={1.75} />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
              onClick={() => setOpen(false)}
              aria-hidden
              style={{ top: BAR_H }}
              className="fixed inset-x-0 bottom-0 z-30 bg-black/40"
            />
            <motion.div
              key="panel"
              id="mobile-menu"
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={spring}
              style={{ top: BAR_H, maxHeight: `calc(100dvh - ${BAR_H}px)` }}
              className="fixed inset-x-0 z-30 overflow-y-auto bg-white px-5 pb-8 pt-2 shadow-lg"
            >
              <ul>{NAV.map(renderEntry)}</ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}


function Navbar() {

  const cart = useCart() as unknown as { getCartSize: number | (() => number) }
  const cartCount =
    typeof cart.getCartSize === 'function' ? cart.getCartSize() : cart.getCartSize ?? 0

  return (
    <>
      <DesktopNav cartCount={cartCount} />
      <MobileNav cartCount={cartCount} />
    </>
  )
}

export default Navbar