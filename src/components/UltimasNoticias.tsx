import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const noticias = [
  {
    image: "/images/slide-6.png",
    title: "Encontre o caminho para restaurar seus relacionamento com Deus",
    date: "24 Julho 2024",
    comments: "Comentar",
  },
  {
    image: "/images/podcaswithtwo.png",
    title: "Encontre o caminho para restaurar seus relacionamento com Deus",
    date: "24 Julho 2024",
    comments: "Comentar",
  },
  {
    image: "/images/slide-8.png",
    title: "Encontre o caminho para restaurar seus relacionamento com Deus",
    date: "24 Julho 2024",
    comments: "Comentar",
  },
  {
    image: "/images/slide-9.png",
    title: "Encontre o caminho para restaurar seus relacionamento com Deus",
    date: "24 Julho 2024",
    comments: "Comentar",
  },
];

const UltimasNoticias: React.FC = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 pb-10 pt-8">
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <span className="block w-6 h-0.5 bg-red-500"></span>
          <span className="text-red-500 font-semibold text-sm">FIQUE POR DENTRO DAS</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mt-1">ÚLTIMAS NOTÍCIAS</h2>
      </div>
      <Swiper
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        loop={true}
        modules={[Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
      >
        {noticias.map((noticia, idx) => (
          <SwiperSlide key={idx}>
            <div className="bg-white rounded shadow-md overflow-hidden flex flex-col h-full max-w-sm mx-auto">
              <div className="w-full aspect-video bg-gray-100 overflow-hidden">
                <img
                  src={noticia.image}
                  alt={noticia.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500 px-4 pt-3 pb-1">
                <span className="flex items-center gap-1">
                  <span role="img" aria-label="comment">🗨️</span> {noticia.comments}
                </span>
                <span className="flex items-center gap-1">
                  <span role="img" aria-label="calendar">📅</span> {noticia.date}
                </span>
              </div>
              <div className="px-4 pb-4 flex-1 flex flex-col">
                <h3 className="text-base font-semibold text-gray-900 mb-4 mt-1">
                  {noticia.title}
                </h3>
              </div>
              <div className="px-12 pb-5 flex-1 flex flex-col">
                <button className="mt-auto bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2  shadow transition">SABER MAIS</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default UltimasNoticias; 