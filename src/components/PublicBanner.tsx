'use client';
import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

// Lista de banners gratuitos (retangulares, formato anúncio)
const banners = [
  {
    image: "/images/charchubanner-1.jpg",
    alt: "Banner Natureza",
    link: "https://unsplash.com/photos/1506744038136-46273834b3fb",
  },
  {
    image: "/images/charchubanner-4.jpg",
    alt: "Banner Cidade",
    link: "https://unsplash.com/photos/1465101046530-73398c7f28ca",
  },
  {
    image: "/images/charchubanner-3.jpg",
    alt: "Banner Montanha",
    link: "https://unsplash.com/photos/1519125323398-675f0ddb6308",
  },
];

const PublicBanner: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-3 h-24 mb-8">
      <Swiper
        spaceBetween={16}
        slidesPerView={1}
        loop={true}
        modules={[Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
      >
        {banners.map((banner, idx) => (
          <SwiperSlide key={idx}>
            <a href={banner.link} target="_blank" rel="noopener noreferrer">
              <img
                src={banner.image}
                alt={banner.alt}
                className="w-full h-full object-cover  shadow-md"
                style={{ minHeight: 60, maxHeight: 120 }}
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PublicBanner; 