import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const parceiros = [
  { image: "/images/Pixel.jpg", name: "Pixel Tech" },
  { image: "/images/Pixel-1.jpg", name: "Massimo" },
  { image: "/images/Pixel-2.jpg", name: "PodFé" },
  { image: "/images/Pixel-3.jpg", name: "Spotify" },
  { image: "/images/Pixel-4.jpg", name: "Atos" },
  { image: "/images/Pixel-5.jpg", name: "Beleza" },
  { image: "/images/Pixel-6.jpg", name: "TikTok" },
  { image: "/images/Pixel-tik.jpg", name: "Grupo Massimo" },
  { image: "/images/Pixel-3.jpg", name: "Spotify" },
  { image: "/images/Pixel-4.jpg", name: "Atos" },
  { image: "/images/Pixel-5.jpg", name: "Beleza" },
  { image: "/images/Pixel-6.jpg", name: "TikTok" },
];

const NossosParceiros: React.FC = () => {
  const swiperRef = React.useRef<any>(null);
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <section className="w-full max-w-7xl mx-auto px-4 pb-10 pt-8 bg-gray-50">
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <span className="block w-6 h-0.5 bg-red-500"></span>
          <span className="text-red-500 font-semibold text-sm">FAÇA PARTE DOS</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mt-1">NOSSOS PARCEIROS</h2>
      </div>
      <div
        className="relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Swiper
          ref={swiperRef}
          spaceBetween={24}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
            1280: { slidesPerView: 8 },
          }}
          loop={true}
          modules={[Autoplay]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          className="mb-8"
        >
          {parceiros.map((parceiro, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-white rounded shadow flex items-center justify-center h-28 w-full p-4">
                <img
                  src={parceiro.image}
                  alt={parceiro.name}
                  className="max-h-20 max-w-full object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Left Arrow */}
        <button
          className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full transition bg-white/0 hover:bg-white/70 hover:text-red-500 text-gray-700 border border-white/30 shadow-lg ${isHovered ? 'bg-white/30' : 'bg-white/0'}`}
          style={{ opacity: isHovered ? 1 : 0, pointerEvents: isHovered ? 'auto' : 'none' }}
          aria-label="Anterior"
          onClick={() => swiperRef.current?.swiper?.slidePrev()}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        {/* Right Arrow */}
        <button
          className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full transition bg-white/0 hover:bg-white/70 hover:text-red-500 text-gray-700 border border-white/30 shadow-lg ${isHovered ? 'bg-white/30' : 'bg-white/0'}`}
          style={{ opacity: isHovered ? 1 : 0, pointerEvents: isHovered ? 'auto' : 'none' }}
          aria-label="Próximo"
          onClick={() => swiperRef.current?.swiper?.slideNext()}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
      <div className="flex justify-center mt-4">
        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-3 rounded shadow transition">
          FAÇA PARTE DESSA PARCERIA
        </button>
      </div>
    </section>
  );
};

export default NossosParceiros; 