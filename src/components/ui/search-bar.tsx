import * as React from "react"
import { Search, MapPin, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Input } from "./input"

interface SearchBarProps extends React.HTMLAttributes<HTMLDivElement> {
  placeholder?: string
  value?: string
  onValueChange?: (value: string) => void
  onSearch?: (query: string) => void
  showLocation?: boolean
  location?: string
  onLocationChange?: (location: string) => void
  className?: string
}

const SearchBar = React.forwardRef<HTMLDivElement, SearchBarProps>(
  ({ 
    placeholder = "Search products, stores or malls...", 
    value = "", 
    onValueChange,
    onSearch,
    showLocation = true,
    location = "São Paulo, SP",
    onLocationChange,
    className,
    ...props 
  }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const inputRef = React.useRef<HTMLInputElement>(null)

    const handleSearch = (e: React.FormEvent) => {
      e.preventDefault()
      if (onSearch && value.trim()) {
        onSearch(value.trim())
      }
    }

    const handleClear = () => {
      if (onValueChange) {
        onValueChange("")
      }
      inputRef.current?.focus()
    }

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex w-full max-w-2xl items-center",
          className
        )}
        {...props}
      >
        <form onSubmit={handleSearch} className="relative flex w-full">
          {showLocation && (
            <div className="relative mr-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-10 gap-2 px-3 text-sm"
                onClick={() => onLocationChange?.(location)}
              >
                <MapPin className="h-4 w-4" />
                <span className="hidden sm:inline">{location}</span>
                <span className="sm:hidden">📍</span>
              </Button>
            </div>
          )}
          
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              ref={inputRef}
              type="text"
              placeholder={placeholder}
              value={value}
              onChange={(e) => onValueChange?.(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={cn(
                "h-10 pl-10 pr-10 text-sm",
                isFocused && "ring-2 ring-primary/20"
              )}
            />
            {value && (
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2"
                onClick={handleClear}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
          
          <Button
            type="submit"
            size="default"
            className="ml-2 h-10 px-4"
            disabled={!value.trim()}
          >
            Search
          </Button>
        </form>
      </div>
    )
  }
)

SearchBar.displayName = "SearchBar"

export { SearchBar } 