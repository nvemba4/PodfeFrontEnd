import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";

const conferences = [
  {
    background: "/images/conf-1.jpg",
    date: "13,14 de Novembro de 2024",
    targetDate: new Date("2024-11-13T00:00:00"),
    title: ["Marque na", "sua Agenda"],
  },
  {
    background: "/images/10497830.jpg",
    date: "20 de Dezembro de 2024",
    targetDate: new Date("2024-12-20T00:00:00"),
    title: ["Grande Conferência", "de Fim de Ano"],
  },
  {
    background: "/images/prayers.jpg",
    date: "10 de Janeiro de 2025",
    targetDate: new Date("2025-01-10T00:00:00"),
    title: ["Evento Especial", "Ano Novo"],
  },
  // Add more conference objects here if needed
];

function useCountdown(targetDate: Date) {
  const getTimeRemaining = () => {
    const total = targetDate.getTime() - new Date().getTime();
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    return { total, days, hours, minutes, seconds };
  };
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);
  return timeLeft;
}

const Conferences = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);
  const timeLeft = useCountdown(conferences[currentSlide].targetDate);
  const swiperRef = useRef<any>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 pb-10 pt-8">
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <span className="block w-6 h-0.5 bg-red-500"></span>
          <span className="text-red-500 font-semibold text-sm">FAÇA PARTE</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mt-1">PRÓXIMOS EVENTOS</h2>
      </div>
      <div
        className="relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Swiper
          ref={swiperRef}
          spaceBetween={16}
          slidesPerView={1}
          loop={true}
          modules={[Autoplay]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          onSlideChange={swiper => setCurrentSlide(swiper.realIndex)}
        >
          {conferences.map((conf, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative w-full min-h-[220px] md:min-h-[400px] rounded-lg overflow-hidden">
                <img
                  src={conf.background}
                  alt={conf.title.join(" ")}
                  className="absolute inset-0 w-full h-full object-cover object-center z-0"
                  style={{ minHeight: 220, maxHeight: 600 }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
                <div className="relative z-20 flex flex-col items-center justify-center w-full h-full min-h-full flex-1 text-white text-center px-1 md:px-4 md:pt-24  pt-8">
                  <div className="text-base md:text-xl font-medium mb-2">{conf.date}</div>
                  
                  {/* Countdown Timer - only render on client to avoid hydration error */}
                  {mounted && idx === currentSlide && (
                    <div className="flex justify-center gap-3 md:gap-6 mb-6">
                      <div>
                        <div className="text-xl md:text-4xl font-bold">{timeLeft.days}</div>
                        <div className="text-xs md:text-base font-medium mt-1">Dias</div>
                      </div>
                      <div>
                        <div className="text-xl md:text-4xl font-bold">{timeLeft.hours}</div>
                        <div className="text-xs md:text-base font-medium mt-1">Horas</div>
                      </div>
                      <div>
                        <div className="text-xl md:text-4xl font-bold">{timeLeft.minutes}</div>
                        <div className="text-xs md:text-base font-medium mt-1">Minutos</div>
                      </div>
                      <div>
                        <div className="text-xl md:text-4xl font-bold">{timeLeft.seconds}</div>
                        <div className="text-xs md:text-base font-medium mt-1">Segundos</div>
                      </div>
                    </div>
                  )}
                  <button className="bg-white/20 border border-white text-white hover:bg-red-500 hover:border-red-500 hover:text-white font-semibold px-4 md:px-8 py-2 md:py-3 rounded-full mt-2 mb-4 text-base md:text-lg shadow-lg transition">PARTICIPAR</button>
                </div>
                {/* Left Arrow */}
                <button
                  className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full transition bg-white/0 hover:bg-white/70 hover:text-red-500 text-white border border-white/30 shadow-lg ${isHovered ? 'bg-white/30' : 'bg-white/0'}`}
                  style={{ opacity: isHovered ? 1 : 0, pointerEvents: isHovered ? 'auto' : 'none' }}
                  aria-label="Anterior"
                  onClick={() => swiperRef.current?.swiper?.slidePrev()}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                {/* Right Arrow */}
                <button
                  className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full transition bg-white/0 hover:bg-white/70 hover:text-red-500 text-white border border-white/30 shadow-lg ${isHovered ? 'bg-white/30' : 'bg-white/0'}`}
                  style={{ opacity: isHovered ? 1 : 0, pointerEvents: isHovered ? 'auto' : 'none' }}
                  aria-label="Próximo"
                  onClick={() => swiperRef.current?.swiper?.slideNext()}
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Conferences; 