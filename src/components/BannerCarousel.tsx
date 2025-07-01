import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "../styles/swiper.css";

// Type for a slide
type BannerSlide = {
  bg: string;
  title: string;
  subtitle: string;
  description: string;
  button: string;
  buttonLink: string;
};

export default function BannerCarousel() {
  const [slides, setSlides] = useState<BannerSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/banner-carousel")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setSlides(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;
  if (!slides.length) return <div>Nenhum slide encontrado.</div>;

  return (
    <div className="w-full">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
        className="w-full h-[480px] md:h-[600px]"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div
              className="relative w-full h-[480px] md:h-[600px] flex items-center justify-start bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.bg})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30" />
              {/* Content */}
              <div className="relative z-10 max-w-2xl pl-8 md:pl-20 text-left text-white">
                <div className="mb-2 text-red-500 font-semibold tracking-wide text-sm md:text-base">
                  {slide.subtitle}
                </div>
                <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
                  {slide.title}
                </h2>
                <p className="mb-6 text-base md:text-lg font-light">
                  {slide.description}
                </p>
                <a
                  href={slide.buttonLink}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-full font-semibold text-white text-base transition"
                >
                  <span className="text-xl">▶</span> {slide.button}
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
} 