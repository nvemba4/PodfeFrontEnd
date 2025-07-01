"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

// Reuse the card style from Featured Deals
const ProductCard: React.FC<{ product: any }> = ({ product }) => (
  <div className="relative flex-shrink-0 w-64 md:w-80 h-96 rounded-3xl overflow-hidden shadow-lg snap-center group transition-transform duration-300 hover:scale-105 bg-white">
    <img
      src={product.image}
      alt={product.title}
      className="absolute inset-0 w-full h-full object-cover z-0"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10 z-10" />
    <div className="absolute top-0 left-0 z-20 p-6">
      <h3 className="text-white text-lg font-bold mb-1 drop-shadow-lg line-clamp-2">{product.title}</h3>
      <p className="text-white/80 text-xs mb-1 drop-shadow">{product.category} · {product.brand || "Store"}</p>
      <p className="text-white/70 text-xs">⭐ {product.rating?.rate || product.rating || 0} ({product.rating?.count || 0} reviews)</p>
    </div>
    <div className="absolute bottom-4 left-6 z-20 flex flex-col gap-1">
      <span className="text-white text-xl font-bold drop-shadow">${product.price.toFixed(2)}</span>
    </div>
    <button className="absolute bottom-4 right-4 z-20 bg-white/80 hover:bg-white text-black rounded-full px-4 py-2 text-sm font-semibold shadow transition-all">Add to Cart</button>
  </div>
);

const ProductListPage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<string>("");
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, []);

  // Get unique categories from products
  const categories = Array.from(new Set(products.map((p) => p.category)));

  // Filter products by category and search
  const filteredProducts = products.filter((product) => {
    const matchesCategory = category ? product.category === category : true;
    const matchesSearch = search
      ? product.title.toLowerCase().includes(search.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-100 container mx-auto px-4 py-8">
      <div className="w-full max-w-7xl mb-6 flex justify-end mx-auto">
        <Button variant="ghost" onClick={() => router.push("/")}>← Return</Button>
      </div>
      <h1 className="text-3xl font-bold mb-6">All Products</h1>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-center gap-4 mb-8 max-w-2xl mx-auto">
        <Select value={category || 'all'} onValueChange={val => setCategory(val === 'all' ? '' : val)}>
          <SelectTrigger className="w-[180px] bg-white border border-gray-300" >
            {category ? categories.find((cat) => cat === category) : "All Categories"}
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white border border-gray-300 shadow-md"
        />
      </div>

      {loading ? (
        <div className="text-center py-20 text-lg text-gray-500">Loading products...</div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20 text-lg text-gray-500">No products found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <Link key={product.id} href={`/product-list/${product.id}`} className="block">
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductListPage; 