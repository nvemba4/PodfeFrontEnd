'use client';
import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

// Lista de banners gratuitos (retangulares, formato anúncio)
const banners = [
  {
    image: "/images/2025-07-01_21h35_42.jpg",
    alt: "Banner Natureza",
    link: "https://unsplash.com/photos/1506744038136-46273834b3fb",
  },
  {
    image: "/images/10673135.jpg",
    alt: "Banner Cidade",
    link: "https://unsplash.com/photos/1465101046530-73398c7f28ca",
  },
  {
    image: "/images/2025-07-01_21h37_39.jpg",
    alt: "Banner Montanha",
    link: "https://unsplash.com/photos/1519125323398-675f0ddb6308",
  },
];

const PublicBanner: React.FC = () => {
  return (
    <div className="w-full h-full max-w-7xl mx-auto px-3">
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
              <div className="w-full bg-gray-100 overflow-hidden">
                <img
                  src={banner.image}
                  alt={banner.alt}
                  className="w-full object-cover"
                  style={{ display: 'block', height: 'auto', maxHeight: '200px', width: '100%' }}
                />
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PublicBanner; 