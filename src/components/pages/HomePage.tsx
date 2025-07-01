"use client";
import Image from "next/image";
import AuthFlow from "../AuthFlow";
import * as React from "react"
import { 
  ShoppingBag, 
  Smartphone, 
  Home, 
  Baby, 
  Sparkles, 
  Pizza, 
  Gamepad2,
  Star,
  MapPin,
  Store,
  Heart,
  ShoppingCart
} from "lucide-react"
import { MallConnectNavbar } from "@/components/layout/MallConnectNavbar"
import { CategoryNav, type Category } from "@/components/ui/category-nav"
import { ProductCard } from "@/components/ui/product-card"
import { MallCard } from "@/components/ui/mall-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useEffect } from "react"
import EpisodiosRecentes from "@/components/EpisodiosRecentes"
import BannerCarousel from "@/components/BannerCarousel"
import NoticiasePublicidade from "@/components/NoticiasePublicidade"
import Midia from "@/components/Midia"
import PublicBanner from "@/components/PublicBanner"

// Mock data for demonstration
const categories: Category[] = [
  {
    id: "fashion",
    name: "Fashion",
    icon: <ShoppingBag className="h-6 w-6 text-white" />,
    color: "bg-pink-500",
    productCount: 1247
  },
  {
    id: "electronics",
    name: "Electronics",
    icon: <Smartphone className="h-6 w-6 text-white" />,
    color: "bg-blue-500",
    productCount: 892
  },
  {
    id: "home",
    name: "Home",
    icon: <Home className="h-6 w-6 text-white" />,
    color: "bg-green-500",
    productCount: 654
  },
  {
    id: "kids",
    name: "Kids",
    icon: <Baby className="h-6 w-6 text-white" />,
    color: "bg-purple-500",
    productCount: 445
  },
  {
    id: "beauty",
    name: "Beauty",
    icon: <Sparkles className="h-6 w-6 text-white" />,
    color: "bg-rose-500",
    productCount: 567
  },
  {
    id: "food",
    name: "Food",
    icon: <Pizza className="h-6 w-6 text-white" />,
    color: "bg-orange-500",
    productCount: 234
  },
  {
    id: "entertainment",
    name: "Entertainment",
    icon: <Gamepad2 className="h-6 w-6 text-white" />,
    color: "bg-indigo-500",
    productCount: 123
  },
  {
    id: "sports",
    name: "Sports",
    icon: <Gamepad2 className="h-6 w-6 text-white" />,
    color: "bg-lime-500",
    productCount: 312
  },
  {
    id: "books",
    name: "Books",
    icon: <Gamepad2 className="h-6 w-6 text-white" />,
    color: "bg-yellow-500",
    productCount: 210
  },
  {
    id: "toys",
    name: "Toys",
    icon: <Gamepad2 className="h-6 w-6 text-white" />,
    color: "bg-pink-400",
    productCount: 178
  },
  {
    id: "jewelry",
    name: "Jewelry",
    icon: <Gamepad2 className="h-6 w-6 text-white" />,
    color: "bg-amber-500",
    productCount: 95
  }
]

const nearbyMalls = [
  {
    id: "mall1",
    name: "Shopping Morumbi",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
    rating: 4.5,
    reviewCount: 230,
    storeCount: 125,
    distance: "2.3km",
    address: "Av. Roque Petroni Júnior, 1089 - Morumbi, São Paulo"
  },
  {
    id: "mall2",
    name: "Shopping Villa-Lobos",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    rating: 4.2,
    reviewCount: 145,
    storeCount: 89,
    distance: "1.8km",
    address: "Av. das Nações Unidas, 4777 - Alto de Pinheiros, São Paulo"
  },
  {
    id: "mall3",
    name: "Shopping West Plaza",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
    rating: 4.7,
    reviewCount: 312,
    storeCount: 156,
    distance: "4.1km",
    address: "Av. Francisco Matarazzo, 2000 - Água Branca, São Paulo"
  },
  {
    id: "mall4",
    name: "Shopping Eldorado",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    rating: 4.6,
    reviewCount: 198,
    storeCount: 110,
    distance: "3.2km",
    address: "Av. Rebouças, 3970 - Pinheiros, São Paulo"
  },
  {
    id: "mall5",
    name: "Shopping Ibirapuera",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    rating: 4.4,
    reviewCount: 175,
    storeCount: 140,
    distance: "5.0km",
    address: "Av. Ibirapuera, 3103 - Moema, São Paulo"
  },
  {
    id: "mall6",
    name: "Shopping Pátio Paulista",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    rating: 4.3,
    reviewCount: 120,
    storeCount: 95,
    distance: "2.8km",
    address: "Rua Treze de Maio, 1947 - Bela Vista, São Paulo"
  }
]

const featuredProducts = [
  {
    id: "prod1",
    name: "Nike Air Max 270 Sneakers",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
    originalPrice: 599.90,
    currentPrice: 399.90,
    discount: 33,
    rating: 4.5,
    reviewCount: 12,
    storeName: "Nike Store",
    mallName: "Shopping Morumbi",
    distance: "2.3km"
  },
  {
    id: "prod2",
    name: "iPhone 15 Pro Max",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop",
    originalPrice: 8999.90,
    currentPrice: 7999.90,
    discount: 11,
    rating: 4.8,
    reviewCount: 45,
    storeName: "Apple Store",
    mallName: "Shopping Villa-Lobos",
    distance: "1.8km"
  },
  {
    id: "prod3",
    name: "Samsung 65\" 4K Smart TV",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=300&fit=crop",
    originalPrice: 3499.90,
    currentPrice: 2799.90,
    discount: 20,
    rating: 4.6,
    reviewCount: 23,
    storeName: "Samsung Store",
    mallName: "Shopping West Plaza",
    distance: "4.1km"
  },
  {
    id: "prod4",
    name: "Adidas Ultraboost 22",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=300&h=300&fit=crop",
    originalPrice: 899.90,
    currentPrice: 629.90,
    discount: 30,
    rating: 4.4,
    reviewCount: 18,
    storeName: "Adidas Store",
    mallName: "Shopping Morumbi",
    distance: "2.3km"
  },
  {
    id: "prod5",
    name: "Apple Watch Series 9",
    image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=300&q=80",
    originalPrice: 3999.90,
    currentPrice: 3299.90,
    discount: 18,
    rating: 4.7,
    reviewCount: 31,
    storeName: "Apple Store",
    mallName: "Shopping Eldorado",
    distance: "3.2km"
  },
  {
    id: "prod6",
    name: "Sony WH-1000XM5 Headphones",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=300&q=80",
    originalPrice: 1999.90,
    currentPrice: 1499.90,
    discount: 25,
    rating: 4.9,
    reviewCount: 54,
    storeName: "Sony Center",
    mallName: "Shopping Pátio Paulista",
    distance: "2.8km"
  },
  {
    id: "prod7",
    name: "Coach Leather Crossbody Bag",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=300&q=80",
    originalPrice: 1299.90,
    currentPrice: 899.90,
    discount: 31,
    rating: 4.6,
    reviewCount: 22,
    storeName: "Coach Boutique",
    mallName: "Shopping Ibirapuera",
    distance: "5.0km"
  },
  {
    id: "prod8",
    name: "Fitbit Charge 6 Fitness Band",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=300&q=80",
    originalPrice: 799.90,
    currentPrice: 599.90,
    discount: 25,
    rating: 4.5,
    reviewCount: 19,
    storeName: "Fitbit Store",
    mallName: "Shopping Villa-Lobos",
    distance: "1.8km"
  }
]

const trendingProducts = [
  {
    id: "trend1",
    name: "Performance Running Shoes",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80",
    category: "Sportswear",
    brand: "Nike",
    price: 299.90,
    rating: 4.7,
    reviewCount: 34
  },
  {
    id: "trend2",
    name: "Leather Crossbody Bag",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
    category: "Fashion Accessories",
    brand: "Coach",
    price: 499.90,
    rating: 4.8,
    reviewCount: 21
  },
  {
    id: "trend3",
    name: "Classic Chronograph Watch",
    image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=400&q=80",
    category: "Luxury Timepieces",
    brand: "Fossil",
    price: 899.90,
    rating: 4.9,
    reviewCount: 18
  },
  {
    id: "trend4",
    name: "Wireless Headphones",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    category: "Electronics",
    brand: "Sony",
    price: 799.90,
    rating: 4.6,
    reviewCount: 27
  },
  {
    id: "trend5",
    name: "Smart Fitness Band",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
    category: "Wearables",
    brand: "Fitbit",
    price: 199.90,
    rating: 4.5,
    reviewCount: 15
  }
]

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    text: "Explore the best of your city"
  },
  {
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80",
    text: "Shop top brands in one place"
  },
  {
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80",
    text: "Discover exclusive deals at local malls"
  }
]

const categoryImages = {
  fashion: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=128&q=80",
  electronics: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=128&q=80",
  home: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=128&q=80",
  kids: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=128&q=80",
  beauty: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=128&q=80",
  food: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=128&q=80",
  entertainment: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=128&q=80",
  sports: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=128&q=80",
  books: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=128&q=80",
  toys: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=128&q=80",
  jewelry: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=128&q=80"
}

const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState<string>()
  const [favorites, setFavorites] = React.useState<Set<string>>(new Set())
  const [cartItems, setCartItems] = React.useState<Set<string>>(new Set())
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const slideCount = HERO_SLIDES.length
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slideCount)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount)
  React.useEffect(() => {
    const timer = setTimeout(nextSlide, 5000)
    return () => clearTimeout(timer)
  }, [currentSlide])

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
    // TODO: Navigate to category page or filter products
  }

  const handleFavoriteToggle = (itemId: string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(itemId)) {
      newFavorites.delete(itemId)
    } else {
      newFavorites.add(itemId)
    }
    setFavorites(newFavorites)
  }

  const handleAddToCart = (productId: string) => {
    const newCartItems = new Set(cartItems)
    newCartItems.add(productId)
    setCartItems(newCartItems)
    // TODO: Add to cart logic
  }

  const handleSearch = (query: string) => {
    console.log("Searching for:", query)
    // TODO: Implement search functionality
  }

  const handleLocationChange = (location: string) => {
    console.log("Location changed to:", location)
    // TODO: Implement location change
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <MallConnectNavbar
        cartItemsCount={cartItems.size}
        favoritesCount={favorites.size}
        onSearch={handleSearch}
        onLocationChange={handleLocationChange}
        onCartClick={() => console.log("Cart clicked")}
        onProfileClick={() => console.log("Profile clicked")}
        onFavoritesClick={() => console.log("Favorites clicked")}
        onMenuClick={() => console.log("Menu clicked")}
      />

      <main className="container mx-auto px-0 space-y-12">
        {/* Banner Carousel with row arrows below */}
        <div className="pt-0">
          <BannerCarousel />
          <EpisodiosRecentes />
          <PublicBanner/>
          <NoticiasePublicidade />
          <Midia />
        </div>

        

        
      </main>
    </div>
  )
}

const AnimatedCategoryTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 100)
    return () => clearTimeout(timeout)
  }, [])
  return (
    <h2
      className={`text-2xl font-bold mb-6 text-center transition-all duration-700 ease-out
        ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
    >
      {children}
    </h2>
  )
}

// Add a wrapper for left-aligned section titles
const AnimatedCategoryTitleWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 100)
    return () => clearTimeout(timeout)
  }, [])
  return (
    <h2
      className={`text-2xl font-bold transition-all duration-700 ease-out mb-0 text-left ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
    >
      {children}
    </h2>
  )
}

// CategoryCarousel component for looping carousel
const CategoryCarousel: React.FC<{ categories: Category[], categoryImages: Record<string, string> }> = ({ categories, categoryImages }) => {
  const containerRef = React.useRef<HTMLDivElement>(null)

  const scrollBy = (offset: number) => {
    const container = containerRef.current
    if (!container) return
    const maxScroll = container.scrollWidth - container.clientWidth
    if (offset > 0 && Math.abs(container.scrollLeft - maxScroll) < 2) {
      // At end, loop to start
      container.scrollTo({ left: 0, behavior: 'smooth' })
    } else if (offset < 0 && container.scrollLeft <= 0) {
      // At start, loop to end
      container.scrollTo({ left: maxScroll, behavior: 'smooth' })
    } else {
      container.scrollBy({ left: offset, behavior: 'smooth' })
    }
  }

  return (
    <>
      <div
        ref={containerRef}
        id="category-carousel"
        className="flex gap-6 overflow-x-auto scrollbar-hide px-8 py-2 justify-center"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {categories.map((category) => (
          <div key={category.id} className="group flex flex-col items-center w-40 flex-shrink-0" style={{ scrollSnapAlign: 'center' }}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 bg-gray-100 shadow-lg overflow-hidden transition-transform duration-200 hover:scale-105`}>
              <img src={categoryImages[category.id as keyof typeof categoryImages]} alt={category.name} className="w-full h-full object-cover" />
            </div>
            <span className="font-semibold text-base text-center mb-1 transition-all duration-300 group-hover:opacity-80 group-hover:-translate-y-1">
              {category.name}
            </span>
            <span className="text-xs text-muted-foreground text-center transition-all duration-300 group-hover:opacity-80 group-hover:-translate-y-0.5">{category.productCount} items</span>
          </div>
        ))}
      </div>
      {/* Arrows - centered below carousel */}
      <div className="flex justify-center items-center gap-4 mt-1 mb-4">
        <button
          onClick={() => scrollBy(-200)}
          className="bg-white/80 hover:bg-white text-black w-10 h-10 flex items-center justify-center rounded-full shadow transition-all"
          aria-label="Scroll left"
          type="button"
          style={{ lineHeight: 0 }}
        >
          &#8592;
        </button>
        <button
          onClick={() => scrollBy(200)}
          className="bg-white/80 hover:bg-white text-black w-10 h-10 flex items-center justify-center rounded-full shadow transition-all"
          aria-label="Scroll right"
          type="button"
          style={{ lineHeight: 0 }}
        >
          &#8594;
        </button>
      </div>
    </>
  )
}

// MallCarousel with overlay arrows (like Featured Deals), no bottom row
const MallCarousel: React.FC<{ malls: typeof nearbyMalls, showArrowsBelow?: boolean }> = ({ malls }) => {
  const containerRef = React.useRef<HTMLDivElement>(null)

  const scrollBy = (offset: number) => {
    const container = containerRef.current
    if (!container) return
    const maxScroll = container.scrollWidth - container.clientWidth
    if (offset > 0 && Math.abs(container.scrollLeft - maxScroll) < 2) {
      // At end, loop to start
      container.scrollTo({ left: 0, behavior: 'smooth' })
    } else if (offset < 0 && container.scrollLeft <= 0) {
      // At start, loop to end
      container.scrollTo({ left: maxScroll, behavior: 'smooth' })
    } else {
      container.scrollBy({ left: offset, behavior: 'smooth' })
    }
  }

  return (
    <div className="relative group">
      <button
        onClick={() => scrollBy(-300)}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-black w-10 h-10 flex items-center justify-center rounded-full shadow transition-all opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
        aria-label="Scroll left"
        type="button"
        style={{ lineHeight: 0 }}
      >
        &#8592;
      </button>
      <div
        ref={containerRef}
        className="flex gap-8 overflow-x-auto scrollbar-hide py-4 snap-x snap-mandatory"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {malls.map((mall, idx) => (
          <div
            key={mall.id}
            className="relative flex-shrink-0 w-64 md:w-80 h-96 rounded-3xl overflow-hidden shadow-lg snap-center group transition-transform duration-300 hover:scale-105"
            style={{ background: `url(${mall.image}) center/cover no-repeat` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10 z-10" />
            <div className="absolute top-0 left-0 z-20 p-6">
              <h3 className="text-white text-xl font-bold mb-1 drop-shadow-lg">{mall.name}</h3>
              <p className="text-white/80 text-sm mb-1 drop-shadow">{mall.address.split('-')[0]}</p>
              <p className="text-white/70 text-xs">{mall.storeCount} stores · ⭐ {mall.rating} ({mall.reviewCount} reviews)</p>
            </div>
            <button className="absolute bottom-4 right-4 z-20 bg-white/80 hover:bg-white text-black rounded-full px-4 py-2 text-sm font-semibold shadow transition-all">Shop Now</button>
          </div>
        ))}
      </div>
      <button
        onClick={() => scrollBy(300)}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-black w-10 h-10 flex items-center justify-center rounded-full shadow transition-all opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
        aria-label="Scroll right"
        type="button"
        style={{ lineHeight: 0 }}
      >
        &#8594;
      </button>
    </div>
  )
}// FeaturedDealsCarousel with only overlay arrows (no bottom row)
const FeaturedDealsCarousel: React.FC<{ products: typeof featuredProducts }> = ({ products }) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const scrollBy = (offset: number) => {
    const container = containerRef.current
    if (!container) return
    const maxScroll = container.scrollWidth - container.clientWidth
    if (offset > 0 && Math.abs(container.scrollLeft - maxScroll) < 2) {
      // At end, loop to start
      container.scrollTo({ left: 0, behavior: 'smooth' })
    } else if (offset < 0 && container.scrollLeft <= 0) {
      // At start, loop to end
      container.scrollTo({ left: maxScroll, behavior: 'smooth' })
    } else {
      container.scrollBy({ left: offset, behavior: 'smooth' })
    }
  }
  return (
    <div className="relative group">
      <button
        onClick={() => scrollBy(-300)}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-black w-10 h-10 flex items-center justify-center rounded-full shadow transition-all opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
        aria-label="Scroll left"
        type="button"
        style={{ lineHeight: 0 }}
      >
        &#8592;
      </button>
      <div className="flex gap-8 overflow-x-auto scrollbar-hide py-2 snap-x snap-mandatory px-8" ref={containerRef} style={{ scrollSnapType: 'x mandatory' }}>
        {products.map((product) => (
          <div
            key={product.id}
            className="relative flex-shrink-0 w-64 md:w-80 h-96 rounded-3xl overflow-hidden shadow-lg snap-center group transition-transform duration-300 hover:scale-105"
          >
            <img
              src={product.image}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover z-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10 z-10" />
            <div className="absolute top-0 left-0 z-20 p-6">
              <h3 className="text-white text-lg font-bold mb-1 drop-shadow-lg line-clamp-2">{product.name}</h3>
              <p className="text-white/80 text-xs mb-1 drop-shadow">{product.storeName} · {product.mallName}</p>
              <p className="text-white/70 text-xs">⭐ {product.rating} ({product.reviewCount} reviews)</p>
            </div>
            <div className="absolute bottom-4 left-6 z-20 flex flex-col gap-1">
              <span className="text-white text-xl font-bold drop-shadow">R$ {product.currentPrice.toFixed(2)}</span>
              {product.discount && (
                <span className="text-xs text-green-300 font-semibold drop-shadow">{product.discount}% OFF</span>
              )}
            </div>
            <button className="absolute bottom-4 right-4 z-20 bg-white/80 hover:bg-white text-black rounded-full px-4 py-2 text-sm font-semibold shadow transition-all">Add to Cart</button>
          </div>
        ))}
      </div>
      <button
        onClick={() => scrollBy(300)}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-black w-10 h-10 flex items-center justify-center rounded-full shadow transition-all opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
        aria-label="Scroll right"
        type="button"
        style={{ lineHeight: 0 }}
      >
        &#8594;
      </button>
    </div>
  )
}



// Add a modern horizontal carousel for popular brands
const popularBrands = [
  { name: "Nike", color: "bg-white", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" },
  { name: "Adidas", color: "bg-white", logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg" },
  { name: "Apple", color: "bg-white", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
  { name: "Samsung", color: "bg-gradient-to-br from-[#FF5858] to-[#FBCA1F]", logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg" },
  { name: "Zara", color: "bg-gradient-to-br from-[#56CCF2] to-[#2F80ED]", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Zara_Logo.svg" },
  { name: "H&M", color: "bg-white", logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg" },
  { name: "Sony", color: "bg-gradient-to-br from-[#FCEABB] to-[#F8B500]", logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Sony_Logo.svg" },
  { name: "Coach", color: "bg-gradient-to-br from-[#4F8CFF] to-[#1CB5E0]", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Coach_New_York_logo.svg" },
  { name: "Fitbit", color: "bg-gradient-to-br from-[#C33764] to-[#1D2671]", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Fitbit_logo.svg" },
  { name: "Gucci", color: "bg-gradient-to-br from-[#232526] to-[#414345]", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Gucci_Logo.svg" },
  { name: "Prada", color: "bg-gradient-to-br from-[#56CCF2] to-[#2F80ED]", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Prada-Logo.svg" },
  { name: "Lacoste", color: "bg-gradient-to-br from-[#F7971E] to-[#FFD200]", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Lacoste_logo.svg" },
]

const PopularBrandsCarousel: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const scrollBy = (offset: number) => {
    const container = containerRef.current
    if (!container) return
    const maxScroll = container.scrollWidth - container.clientWidth
    if (offset > 0 && Math.abs(container.scrollLeft - maxScroll) < 2) {
      container.scrollTo({ left: 0, behavior: 'smooth' })
    } else if (offset < 0 && container.scrollLeft <= 0) {
      container.scrollTo({ left: maxScroll, behavior: 'smooth' })
    } else {
      container.scrollBy({ left: offset, behavior: 'smooth' })
    }
  }
  return (
    <div className="relative group">
      <button
        onClick={() => scrollBy(-320)}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-black w-10 h-10 flex items-center justify-center rounded-full shadow transition-all opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
        aria-label="Scroll left"
        type="button"
        style={{ lineHeight: 0 }}
      >
        &#8592;
      </button>
      <div
        ref={containerRef}
        className="flex gap-8 overflow-x-auto scrollbar-hide px-2 py-2 snap-x snap-mandatory"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {popularBrands.map((brand) => (
          <div
            key={brand.name}
            className="relative flex-shrink-0 w-48 h-40 rounded-3xl bg-white/60 backdrop-blur-md shadow-lg snap-center group transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer border border-white/30"
            style={{ scrollSnapAlign: 'center' }}
          >
            <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ background: 'linear-gradient(135deg,rgba(255,255,255,0.12) 0%,rgba(0,0,0,0.08) 100%)' }} />
            <div className={`flex flex-col items-center justify-center h-full z-10 relative`}>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 text-white text-3xl font-bold shadow-lg ${brand.color}`}> 
                {brand.logo ? (
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className={'w-10 h-10 object-contain bg-white rounded-full p-2'}
                    style={{ mixBlendMode: 'darken' }}
                  />
                ) : (
                  brand.name[0]
                )}
              </div>
              <span className="font-semibold text-lg text-gray-900 mb-1 drop-shadow-lg">{brand.name}</span>
              <span className="text-xs text-gray-500 tracking-wide uppercase">Brand</span>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => scrollBy(320)}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-black w-10 h-10 flex items-center justify-center rounded-full shadow transition-all opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
        aria-label="Scroll right"
        type="button"
        style={{ lineHeight: 0 }}
      >
        &#8594;
      </button>
    </div>
  )
}

export default HomePage

