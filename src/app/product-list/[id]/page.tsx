"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useParams, notFound } from "next/navigation";
import { Heart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const COLOR_OPTIONS = [
  { name: "Blue", value: "#A5B4FC" },
  { name: "Teal", value: "#7dd3fc" },
  { name: "Pink", value: "#f9a8d4" },
  { name: "White", value: "#f3f4f6" },
  { name: "Black", value: "#222" },
];
const SIZE_OPTIONS = ["S", "M", "L", "XL"];

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0].value);
  const [selectedSize, setSelectedSize] = useState(SIZE_OPTIONS[0]);
  const [amount, setAmount] = useState(1);
  const galleryImages = product ? [product.image, product.image, product.image, product.image, product.image] : [];
  const [mainImageIdx, setMainImageIdx] = useState(0);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      const res = await fetch(`https://fakestoreapi.com/products/${params.id}`);
      if (!res.ok) {
        setProduct(null);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setProduct(data);
      setLoading(false);
      setMainImageIdx(0);
    }
    fetchProduct();
  }, [params.id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-lg text-gray-500">Loading...</div>;
  }
  if (!product) {
    return <div className="min-h-screen flex items-center justify-center text-lg text-red-500">Product not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-5xl mb-6 flex justify-end">
        <Button variant="ghost" onClick={() => router.push('/product-list')}>
          ← Return
        </Button>
      </div>
      <div className="bg-white rounded-2xl shadow-lg max-w-5xl w-full flex flex-col md:flex-row overflow-hidden">
        {/* Fixed Image Side */}
        <div className="bg-gray-50 flex p-0 md:p-0" style={{ minWidth: 440, maxWidth: 520, height: 600 }}>
          {/* Thumbnails */}
          <div className="flex flex-col items-center py-4 px-2 gap-2 relative">
            <button
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow border mb-2 disabled:opacity-30"
              onClick={() => setMainImageIdx(idx => Math.max(0, idx - 1))}
              disabled={mainImageIdx === 0}
              aria-label="Scroll up"
            >
              <span className="text-lg">&#8593;</span>
            </button>
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                className={`w-14 h-14 rounded-lg overflow-hidden border-2 flex items-center justify-center mb-2 ${mainImageIdx === idx ? "border-blue-500" : "border-transparent"}`}
                onClick={() => setMainImageIdx(idx)}
                aria-label={`Show image ${idx + 1}`}
                style={{ background: "#fff" }}
              >
                <img src={img} alt={product.title} className="object-contain w-full h-full" />
              </button>
            ))}
            <button
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow border mt-2 disabled:opacity-30"
              onClick={() => setMainImageIdx(idx => Math.min(galleryImages.length - 1, idx + 1))}
              disabled={mainImageIdx === galleryImages.length - 1}
              aria-label="Scroll down"
            >
              <span className="text-lg">&#8595;</span>
            </button>
          </div>
          {/* Main Image with overlay actions and arrows */}
          <div className="relative flex-1 flex items-center justify-center" style={{ height: 600 }}>
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow border text-2xl text-gray-600 z-10"
              onClick={() => setMainImageIdx(idx => Math.max(0, idx - 1))}
              disabled={mainImageIdx === 0}
              aria-label="Previous image"
            >
              &#8592;
            </button>
            <img
              src={galleryImages[mainImageIdx]}
              alt={product.title}
              className="object-contain max-h-[520px] w-full"
              style={{ maxHeight: 520 }}
            />
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow border text-2xl text-gray-600 z-10"
              onClick={() => setMainImageIdx(idx => Math.min(galleryImages.length - 1, idx + 1))}
              disabled={mainImageIdx === galleryImages.length - 1}
              aria-label="Next image"
            >
              &#8594;
            </button>
            {/* Overlay actions */}
            <div className="absolute right-4 top-4 flex flex-col gap-3 z-20">
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow border text-gray-600 hover:bg-gray-100" aria-label="Favorite">
                <Heart size={22} />
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow border text-gray-600 hover:bg-gray-100" aria-label="Zoom">
                <Search size={22} />
              </button>
            </div>
          </div>
        </div>
        {/* Scrollable Info Side */}
        <div className="flex-1 p-8 flex flex-col gap-6 overflow-y-auto max-h-[600px]" style={{ maxWidth: 400 }}>
          <div>
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            <p className="text-gray-500 text-sm mb-2">{product.category}</p>
            <p className="text-lg font-semibold text-green-600 mb-2">${product.price.toFixed(2)}</p>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-yellow-500">⭐</span>
              <span className="font-medium">{product.rating?.rate || 0}</span>
              <span className="text-gray-400 text-xs">({product.rating?.count || 0} reviews)</span>
            </div>
          </div>
          <div>
            <div className="font-semibold text-lg mb-1">Finish. <span className="font-normal text-gray-500">Pick your favorite.</span></div>
            <div className="mb-2 text-sm font-medium">Color - {COLOR_OPTIONS.find(c => c.value === selectedColor)?.name}</div>
            <div className="flex gap-4 mb-4">
              {COLOR_OPTIONS.map((color) => (
                <button
                  key={color.value}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center focus:outline-none transition-all ${selectedColor === color.value ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-300"}`}
                  style={{ background: color.value }}
                  aria-label={color.name}
                  onClick={() => setSelectedColor(color.value)}
                  type="button"
                >
                  {selectedColor === color.value && <span className="block w-4 h-4 rounded-full border-2 border-white bg-white/30" />}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="font-semibold text-lg mb-1">Size</div>
            <div className="flex gap-3 mb-4">
              {SIZE_OPTIONS.map((size) => (
                <button
                  key={size}
                  className={`w-10 h-10 rounded-full border text-base font-medium flex items-center justify-center transition-all focus:outline-none ${selectedSize === size ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-300 bg-white text-gray-700"}`}
                  onClick={() => setSelectedSize(size)}
                  type="button"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="font-semibold text-lg mb-1">Amount</div>
            <Input
              type="number"
              min={1}
              value={amount}
              onChange={e => setAmount(Number(e.target.value))}
              className="w-16 h-8 mb-4"
            />
          </div>
          <button className="bg-black text-white rounded-lg px-4 py-3 font-semibold hover:bg-gray-800 transition">Add to Cart</button>
          <div className="mt-6">
            <div className="font-semibold text-lg mb-2">Description</div>
            <p className="text-gray-700">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 