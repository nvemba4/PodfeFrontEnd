import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Card, CardContent } from "./card"

interface Category {
  id: string
  name: string
  icon: React.ReactNode
  color: string
  productCount?: number
}

interface CategoryNavProps {
  categories: Category[]
  onCategorySelect?: (categoryId: string) => void
  selectedCategory?: string
  className?: string
}

const CategoryNav = React.forwardRef<HTMLDivElement, CategoryNavProps>(
  ({ 
    categories, 
    onCategorySelect, 
    selectedCategory,
    className,
    ...props 
  }, ref) => {
    const scrollContainerRef = React.useRef<HTMLDivElement>(null)

    const scrollLeft = () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' })
      }
    }

    const scrollRight = () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' })
      }
    }

    return (
      <div
        ref={ref}
        className={cn("relative w-full", className)}
        {...props}
      >
        {/* Scroll Left Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-background/80 backdrop-blur shadow-mallconnect"
          onClick={scrollLeft}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Scroll Right Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-background/80 backdrop-blur shadow-mallconnect"
          onClick={scrollRight}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Categories Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-8 py-2"
        >
          {categories.map((category) => (
            <Card
              key={category.id}
              className={cn(
                "flex-shrink-0 cursor-pointer transition-all duration-200 hover:shadow-mallconnect-lg",
                selectedCategory === category.id && "ring-2 ring-primary"
              )}
              onClick={() => onCategorySelect?.(category.id)}
            >
              <CardContent className="p-4 text-center min-w-[100px]">
                <div 
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2",
                    category.color
                  )}
                >
                  {category.icon}
                </div>
                <h3 className="font-medium text-sm mb-1">
                  {category.name}
                </h3>
                {category.productCount && (
                  <p className="text-xs text-muted-foreground">
                    {category.productCount} items
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }
)

CategoryNav.displayName = "CategoryNav"

export { CategoryNav }
export type { Category } 