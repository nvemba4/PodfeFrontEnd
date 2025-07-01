import * as React from "react"
import { Star, MapPin, Store, Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface MallCardProps {
  id: string
  name: string
  image: string
  rating: number
  reviewCount: number
  storeCount: number
  distance: string
  address: string
  isFavorite?: boolean
  onFavoriteToggle?: (mallId: string) => void
  onClick?: (mallId: string) => void
  className?: string
}

const MallCard = React.forwardRef<HTMLDivElement, MallCardProps>(
  ({ 
    id,
    name,
    image,
    rating,
    reviewCount,
    storeCount,
    distance,
    address,
    isFavorite = false,
    onFavoriteToggle,
    onClick,
    className,
    ...props 
  }, ref) => {
    const handleFavoriteClick = (e: React.MouseEvent) => {
      e.stopPropagation()
      onFavoriteToggle?.(id)
    }

    const handleCardClick = () => {
      onClick?.(id)
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
        <div className="relative aspect-video overflow-hidden">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
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

          {/* Distance Badge */}
          <Badge
            variant="secondary"
            className="absolute bottom-2 left-2 z-10"
          >
            <MapPin className="h-3 w-3 mr-1" />
            {distance}
          </Badge>
        </div>

        <CardContent className="p-4">
          {/* Mall Name */}
          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
            {name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < Math.floor(rating) 
                      ? "fill-yellow-400 text-yellow-400" 
                      : "text-gray-300"
                  )}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {rating.toFixed(1)} ({reviewCount} reviews)
            </span>
          </div>

          {/* Store Count */}
          <div className="flex items-center gap-2 mb-3">
            <Store className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {storeCount} stores
            </span>
          </div>

          {/* Address */}
          <p className="text-sm text-muted-foreground line-clamp-2">
            {address}
          </p>
        </CardContent>
      </Card>
    )
  }
)

MallCard.displayName = "MallCard"

export { MallCard } 