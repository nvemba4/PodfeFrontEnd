import * as React from "react"
import { Heart, ShoppingCart, Star, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ProductCardProps {
  id: string
  name: string
  image: string
  originalPrice: number
  currentPrice: number
  discount?: number
  rating?: number
  reviewCount?: number
  storeName: string
  mallName: string
  distance?: string
  isFavorite?: boolean
  onFavoriteToggle?: (productId: string) => void
  onAddToCart?: (productId: string) => void
  onClick?: (productId: string) => void
  className?: string
}

const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  ({ 
    id,
    name,
    image,
    originalPrice,
    currentPrice,
    discount,
    rating = 0,
    reviewCount = 0,
    storeName,
    mallName,
    distance,
    isFavorite = false,
    onFavoriteToggle,
    onAddToCart,
    onClick,
    className,
    ...props 
  }, ref) => {
    const handleFavoriteClick = (e: React.MouseEvent) => {
      e.stopPropagation()
      onFavoriteToggle?.(id)
    }

    const handleAddToCart = (e: React.MouseEvent) => {
      e.stopPropagation()
      onAddToCart?.(id)
    }

    const handleCardClick = () => {
      onClick?.(id)
    }

    const formatPrice = (price: number) => {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price)
    }

    return (
      <Card
        ref={ref}
        className={cn(
          "group cursor-pointer overflow-hidden transition-all duration-200 hover:shadow-mallconnect-lg",
          className
        )}
        onClick={handleCardClick}
        {...props}
      >
        <div className="relative aspect-square overflow-hidden">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Discount Badge */}
          {discount && discount > 0 && (
            <Badge
              variant="discount"
              className="absolute top-2 left-2 z-10"
            >
              -{discount}%
            </Badge>
          )}

          {/* Favorite Button */}
          <Button
            variant="ghost"
            size="icon-sm"
            className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white"
            onClick={handleFavoriteClick}
          >
            <Heart 
              className={cn(
                "h-4 w-4 transition-colors",
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
              )} 
            />
          </Button>

          {/* Quick Add to Cart Button */}
          <Button
            variant="default"
            size="sm"
            className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 opacity-0 transition-opacity group-hover:opacity-100"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add to Cart
          </Button>
        </div>

        <CardContent className="p-4">
          {/* Product Name */}
          <h3 className="font-medium text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {name}
          </h3>

          {/* Rating */}
          {rating > 0 && (
            <div className="flex items-center gap-1 mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-3 w-3",
                      i < Math.floor(rating) 
                        ? "fill-yellow-400 text-yellow-400" 
                        : "text-gray-300"
                    )}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                ({reviewCount})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2 mb-2">
            <span className="font-bold text-lg text-primary">
              {formatPrice(currentPrice)}
            </span>
            {originalPrice > currentPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>

          {/* Store Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{storeName}</span>
            </div>
            {distance && (
              <span className="text-xs text-muted-foreground">
                {distance}
              </span>
            )}
          </div>

          {/* Mall Name */}
          <p className="text-xs text-muted-foreground mt-1 truncate">
            {mallName}
          </p>
        </CardContent>
      </Card>
    )
  }
)

ProductCard.displayName = "ProductCard"

export { ProductCard } 