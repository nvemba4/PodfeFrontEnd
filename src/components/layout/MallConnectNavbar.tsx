import * as React from "react"
import Image from "next/image"
import { ShoppingCart, User, Heart, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import EpisodiosRecentes from "@/components/EpisodiosRecentes"

const NAV_ITEMS = [
  {
    label: "Home",
    dropdown: [
      { title: "Explore Mac", items: ["Explore All Mac", "MacBook Air", "MacBook Pro", "iMac", "Mac mini", "Mac Studio", "Mac Pro", "Displays"] },
      { title: "Shop Mac", items: ["Shop Mac", "Mac Accessories", "Apple Trade In", "Financing"] },
      { title: "More from Mac", items: ["Mac Support", "AppleCare+ for Mac", "macOS Sonoma", "Apps by Apple", "iCloud+"] },
    ],
  },
  {
    label: "Serviços",
    dropdown: [
      { title: "Explore iPad", items: ["Explore All iPad", "iPad Pro", "iPad Air", "iPad", "iPad mini", "Apple Pencil", "Keyboards"] },
      { title: "Shop iPad", items: ["Shop iPad", "iPad Accessories", "Apple Trade In", "Financing"] },
      { title: "More from iPad", items: ["iPad Support", "AppleCare+ for iPad", "iPadOS 17", "Apps by Apple", "iCloud+"] },
    ],
  },
  {
    label: "Eventos",
    dropdown: [
      { title: "Explore iPhone", items: ["Explore All iPhone", "iPhone 15 Pro", "iPhone 15", "iPhone 14", "iPhone 13", "iPhone SE"] },
      { title: "Shop iPhone", items: ["Shop iPhone", "iPhone Accessories", "Apple Trade In", "Financing"] },
      { title: "More from iPhone", items: ["iPhone Support", "AppleCare+ for iPhone", "iOS 17", "Apps by Apple", "iCloud+"] },
    ],
  },
  { label: "Sobre nós", dropdown: null },
  { label: "Participe", dropdown: null },
  { label: "Testemunhos", dropdown: null },
  { label: "Compra aqui", dropdown: null },
  { label: "Contacto", dropdown: null },
  { label: "Support", dropdown: null },
]

const MallConnectNavbar = React.forwardRef<HTMLDivElement, any>((props, ref) => {
  const [openMenu, setOpenMenu] = React.useState<string | null>(null)
  const [searchOpen, setSearchOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [scrolled, setScrolled] = React.useState(false)
  const [showModal, setShowModal] = React.useState(false)

  // New: Track if mouse is over the navbar
  const [navbarHovered, setNavbarHovered] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  React.useEffect(() => {
    if (searchOpen) {
      setShowModal(true)
    } else {
      const timeout = setTimeout(() => setShowModal(false), 250)
      return () => clearTimeout(timeout)
    }
  }, [searchOpen])

  // Handle menu hover
  const handleMenuEnter = (label: string) => {
    setOpenMenu(label)
  }
  const handleMenuLeave = () => {
    setOpenMenu(null)
  }

  // Handle navbar hover for expanding/collapsing
  const handleNavbarEnter = () => setNavbarHovered(true)
  const handleNavbarLeave = () => {
    setNavbarHovered(false)
    setOpenMenu(null)
  }

  // Determine expanded height
  const expanded = !!openMenu
  const navbarHeight = expanded ? 320 : 56

  return (
    <>
      {/* Fullscreen blur overlay when submenu is open */}
      {expanded && (
        <div className="fixed inset-0 w-full h-full bg-white/60 backdrop-blur-xl z-40 transition-all duration-300" />
      )}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${scrolled ? "bg-white/10 backdrop-blur-md" : "bg-white"}`}
        style={{
          height: navbarHeight,
          transition: 'height 300ms cubic-bezier(0.4,0,0.2,1)',
          boxShadow: expanded ? '0 4px 32px 0 rgba(0,0,0,0.08)' : undefined,
        }}
        onMouseEnter={handleNavbarEnter}
        onMouseLeave={handleNavbarLeave}
      >
        <nav className="relative flex flex-col h-full max-w-7xl mx-auto px-4 z-50">
          {/* Main menu row */}
          <div className="flex h-14 items-center justify-between w-full">
            {/* Logo */}
            <div className="flex items-center min-w-[120px]">
              <Image src="/images/LogoPodFFE.png" alt="Logo" width={120} height={40} priority />
            </div>
            {/* Apple-style Nav Links */}
            <div className="hidden md:flex flex-1 justify-center gap-6 relative">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.label}
                  className={`text-sm font-medium px-2 py-1 rounded transition-colors duration-200 ${openMenu === item.label && expanded ? "text-black" : "text-gray-800 hover:text-black"}`}
                  onMouseEnter={() => item.dropdown && handleMenuEnter(item.label)}
                  onFocus={() => item.dropdown && handleMenuEnter(item.label)}
                  tabIndex={0}
                >
                  {item.label}
                </button>
              ))}
            </div>
            {/* Right Side Icons */}
            <div className="flex items-center gap-4 min-w-[120px] justify-end">
              <Button variant="ghost" size="icon" className="hover:bg-gray-100" onClick={() => setSearchOpen(true)}>
                <Search className="h-5 w-5 text-gray-700" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                <Heart className="h-5 w-5 text-gray-700" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                <ShoppingCart className="h-5 w-5 text-gray-700" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                <User className="h-5 w-5 text-gray-700" />
              </Button>
            </div>
          </div>
          {/* Submenu row (Apple-style) */}
          {expanded && openMenu && (() => {
            const dropdown = NAV_ITEMS.find(i => i.label === openMenu)?.dropdown;
            if (!dropdown) return null;
            return (
              <div className="flex items-center justify-center w-full relative z-10">
                <div className="w-full max-w-5xl px-10 py-8 bg-white rounded-xl shadow-2xl mt-2 animate-apple-dropdown flex gap-12">
                  {dropdown.map((col, idx) => (
                    <div key={col.title + idx} className="flex flex-col min-w-[180px]">
                      <span className="font-semibold text-gray-900 mb-3 text-base">{col.title}</span>
                      <ul className="flex flex-col gap-1">
                        {col.items.map((sub, i) => (
                          <li key={sub + i}>
                            <a
                              href="#"
                              className="text-gray-700 hover:text-black text-base font-medium transition-colors duration-150 px-2 py-1 rounded"
                            >
                              {sub}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </nav>
      </header>

      {/* Search Modal with animation */}
      {showModal && (
        <div
          className={`fixed inset-0 z-50 flex items-start justify-center transition-opacity duration-500 ${searchOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500" />
          <div
            className={`mt-24 w-full max-w-lg bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4 relative transition-all duration-500 ${searchOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="flex items-center gap-2">
              <Input
                autoFocus
                type="text"
                placeholder="Search for products, malls, brands..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="flex-1 rounded-full bg-gray-50 border border-gray-200 px-4 py-2 text-base focus-visible:ring-1 focus-visible:ring-primary"
              />
              <Button variant="ghost" size="icon" onClick={() => setSearchOpen(false)}>
                <span className="sr-only">Close</span>
                ✕
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Apple dropdown animation keyframes */}
      <style jsx global>{`
        @keyframes appleDropdownIn {
          0% {
            opacity: 0;
            transform: translateY(-32px) scaleY(0.98);
          }
          100% {
            opacity: 1;
            pointer-events: auto;
            transform: translateY(0) scaleY(1);
          }
        }
      `}</style>
    </>
  )
})

MallConnectNavbar.displayName = "MallConnectNavbar"

export { MallConnectNavbar }