# MallConnect Web App Design - Complete Description

## 🎨 Overall Visual Identity

### Color Palette
- **Primary**: Modern Blue (#2563EB) - conveys trust and technology
- **Secondary**: Vibrant Green (#10B981) - indicates shopping and success
- **Neutrals**: Light Gray (#F8FAFC), Medium Gray (#64748B), White (#FFFFFF)
- **Accents**: Orange (#F59E0B) for promotions, Red (#EF4444) for alerts

### Typography
- **Primary**: Inter or Poppins - modern, readable, friendly
- **Sizes**: H1 (32px), H2 (24px), H3 (20px), Body (16px), Small (14px)
- **Weights**: Regular (400), Medium (500), SemiBold (600), Bold (700)

### Visual Style
- **Minimalist and clean** with plenty of white space
- **Cards with subtle shadows** to organize content
- **Rounded corners** (8px-12px) for softness
- **Consistent outline icons** (Lucide or Heroicons)

---

## 🏠 Homepage

### Header/Top Navigation
```
[LOGO MallConnect] [Search products, stores or malls...] [🔍] [📍 Location] [👤 Profile] [🛒 Cart (3)]
```

**Header Layout:**
- Logo on the left corner (40px height)
- Expanded central search bar (60% width)
- Location icon with current city
- Profile and cart icons with notification badges
- White background with subtle shadow

### Hero Section
- **Rotating main banner** (1200x400px)
- Featured mall promotions
- Prominent call-to-action: "Discover Your Favorite Mall"
- Text overlay with semi-transparent background

### Category Navigation
```
[👕 Fashion] [📱 Electronics] [🏠 Home] [👶 Kids] [💄 Beauty] [🍕 Food] [🎮 Entertainment] [More...]
```
- Horizontal cards with colorful icons
- Smooth hover effects
- Horizontal scroll on mobile

### "Nearby Malls" Section
```
📍 Malls in your area

[MALL CARD A]             [MALL CARD B]             [MALL CARD C]
📸 Mall image             📸 Mall image             📸 Mall image
🏢 Mall Name              🏢 Mall Name              🏢 Mall Name
📍 2.3km away             📍 1.8km away             📍 4.1km away
🏪 125 stores             🏪 89 stores              🏪 156 stores
⭐ 4.5 (230 reviews)      ⭐ 4.2 (145 reviews)      ⭐ 4.7 (312 reviews)
```

### "Featured Deals" Section
- 4x2 grid of promotional products
- Cards with image, crossed-out original price, promotional price
- Discount badge in upper right corner
- Store and mall information

### "Popular Brands" Section
- Brand logos in circular grid
- Smooth zoom hover effects
- Direct link to brand products

---

## 🔍 Search/Results Page

### Side Filters (Left Sidebar)
```
🔧 FILTERS

📍 Location
☐ Shopping Center A (125)
☐ Shopping Center B (89)
☐ Shopping Center C (156)

💰 Price
○ Up to $50 (234)
○ $51 - $100 (156)
○ $101 - $200 (89)
○ Above $200 (45)

🏪 Store Type
☐ Department (45)
☐ Specialty (234)
☐ Kiosk (12)

⭐ Rating
☐ 5 stars (67)
☐ 4+ stars (234)
☐ 3+ stars (345)

🚚 Delivery
☐ Store pickup
☐ Same-day delivery
☐ Free shipping
```

### Main Results Area
**Top Toolbar:**
```
[1,234 results for "sneakers"] [Sort by: Relevance ▼] [👁️ List] [⊞ Grid]
```

**Product Grid (3 columns):**
```
[PRODUCT CARD]
📸 Main image + mini gallery
❤️ Favorite (top right corner)
🏷️ Product Name
⭐ 4.5 (12 reviews)
💰 $299.90 | $199.90 (33% OFF)
🏪 Store XYZ - Mall ABC
📍 2.3km from you
🛒 [Add to Cart]
```

---

## 🏬 Mall Page

### Mall Hero
```
📸 Mall panoramic photo (1200x300px)
🏢 [LOGO] Mall Name
📍 Complete address, ZIP code
⏰ Mon-Sat: 10am-10pm | Sun: 2pm-8pm
📞 (11) 1234-5678
⭐ 4.5 ★★★★★ (312 reviews)
[View on Map] [Follow Mall]
```

### Internal Navigation
```
[🏪 Stores (125)] [🍕 Food Court (12)] [🎬 Entertainment (8)] [ℹ️ Services (15)] [📅 Events]
```

### Interactive Mall Map
- Navigable floor plan
- Store pins with category colors
- Filter by store type
- Optimized route between selected stores

### Store Grid
```
[STORE CARD]
📸 Store logo/photo
🏪 Store Name
⭐ 4.2 (45 reviews)
🏷️ Category: Women's Fashion
📍 Floor 2, Wing B, Store 234
📱 View Products (89)
```

---

## 🛍️ Store Page

### Store Header
```
📸 Store banner (1200x200px)
[LOGO] Store Name
⭐ 4.3 ★★★★☆ (89 reviews)
📍 Mall ABC, Floor 2, Store 234
📞 (11) 9876-5432
⏰ Mon-Sat: 10am-10pm
[❤️ Follow] [📤 Share]
```

### Store Category Navigation
```
[All (234)] [T-shirts (45)] [Pants (67)] [Shoes (34)] [Accessories (23)] [Sale (12)]
```

### Products Section
- Responsive 4x3 grid (desktop) / 2x4 (mobile)
- Store-specific filters
- Sorting options

---

## 🛒 Shopping Cart

### Cart Sidebar/Modal
```
🛒 YOUR CART (3 items)

[ITEM 1]
📸 Thumbnail      🏷️ Product Name
                  🏪 Store ABC - Mall XYZ
                  💰 $99.90
                  🔢 Qty: [1] [+] [-]
                  🗑️ Remove

[ITEM 2]
📸 Thumbnail      🏷️ Another Product
                  🏪 Store DEF - Mall XYZ
                  💰 $149.90
                  🔢 Qty: [2] [+] [-]
                  🗑️ Remove

━━━━━━━━━━━━━━━━━━━━━━
Subtotal: $399.70
Shipping: $15.00
TOTAL: $414.70

[CHECKOUT]
[Continue Shopping]
```

---

## 💳 Checkout/Finalization

### Step-by-Step Flow
```
1. Review [●] → 2. Delivery [○] → 3. Payment [○] → 4. Confirmation [○]
```

### Step 1: Order Review
- Detailed product list grouped by store
- Ability to change quantities
- Shipping calculation per store

### Step 2: Delivery Options
```
📦 CHOOSE DELIVERY

🏪 Store Pickup (Free)
Mall ABC - Available in 2h
☐ Store XYZ - Product A
☐ Store DEF - Product B

🚚 Home Delivery
📍 123 Flower Street - São Paulo
💰 Fee: $15.00
📅 Estimated: 2-3 business days

🏬 Mall Pickup (Free)
📍 Pickup Counter - Mall ABC
📅 Available in 4h
```

### Step 3: Payment
```
💳 PAYMENT METHOD

💳 Credit Card
[Number] [Expiry] [CVV]
💰 Installments: [Full] [2x] [3x] [6x]

🏦 PIX
📱 QR Code will be generated

💰 Bank Slip
📄 Due in 1 business day
```

---

## 👤 User Area

### Personal Dashboard
```
👋 Hello, John!

📊 SUMMARY
🛍️ 12 orders this month
❤️ 34 favorite products
🏪 Following 8 stores

📦 RECENT ORDERS
[Status] Product - Date - Amount - Actions
```

### Side Sections
- 📦 My Orders
- ❤️ Favorites
- 🏪 Followed Stores
- 🏬 Favorite Malls
- 🎁 Loyalty Program
- ⚙️ Settings
- 🔔 Notifications

---

## 📱 Mobile Responsiveness

### Main Adaptations
- **Header**: Smaller logo, search in modal, hamburger menu
- **Navigation**: Fixed bottom navigation bar
- **Cards**: Vertical stack, full width
- **Filters**: Full-screen modal overlay
- **Images**: Touch-optimized (swipe galleries)

### Bottom Navigation
```
[🏠 Home] [🔍 Search] [🏬 Malls] [❤️ Favorites] [👤 Profile]
```

---

## ⚡ Microinteractions and Animations

### Smooth Transitions
- Hover effects on cards (subtle elevation)
- Loading skeletons during loading
- Slide animations for modals
- Fade transitions between pages

### Visual Feedback
- Toast notifications for actions (add to cart, favorite)
- Progress bars during checkout
- Empty states with friendly illustrations
- Visual confirmations for important actions

---

## 🎯 Special States

### Loading States
- Skeleton screens for product cards
- Shimmer effects during loading
- Progress indicators for uploads

### Empty States
- Custom illustrations for empty cart
- Product suggestions when no results
- Call-to-actions to engage user

### Error States
- Friendly error messages
- Retry buttons
- Contextual support

This design prioritizes usability, conversion, and user experience while maintaining visual consistency throughout the platform. 