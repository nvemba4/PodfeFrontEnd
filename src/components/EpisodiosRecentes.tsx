import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "../styles/swiper.css";
import { FaPlay, FaShareAlt, FaHeart } from "react-icons/fa";
import { mockEpisodes } from "@/mock/episodiosRecentesData";

type Episode = {
  image: string;
  title: string;
  description: string;
};

export default function EpisodiosRecentes() {
  const [episodes, setEpisodes] = useState<Episode[]>(mockEpisodes);
  useEffect(() => {
    fetch("/api/episodios")
      .then((res) => res.json())
      .then((data) => {
        const episodesData = Array.isArray(data) && data.length ? data : mockEpisodes;
        setEpisodes(episodesData);
        console.log("Loaded episodes:", episodesData);
      })
      .catch(() => {
        setEpisodes(mockEpisodes);
        console.log("Fallback to mockEpisodes");
      });
  }, []);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-1 pt-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-red-600 font-semibold text-sm uppercase tracking-wide">VER MAIS</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-1">EPISÓDIOS RECENTES</h2>
        </div>
      </div>
      {episodes.length === 0 ? (
        <div className="text-center text-gray-500 py-12">Nenhum episódio encontrado.</div>
      ) : (
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={32}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="w-full"
        >
          {episodes.map((ep, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-white rounded shadow-lg overflow-hidden flex flex-col h-[480px]">
                <img
                  src={ep.image}
                  alt={ep.title}
                  className="w-full object-cover"
                />
                <div className="flex-1 flex flex-col p-6">
                  <h3 className="font-semibold text-xl mb-2 leading-snug">
                    {ep.title}
                  </h3>
                  <p className="text-gray-700 text-base mb-6 flex-1">
                    {episodes[0] && ep.description.length > episodes[0].description.length
                      ? ep.description.slice(0, episodes[0].description.length) + '...'
                      : ep.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <button className="flex items-center justify-center w-12 h-12 bg-red-600 hover:bg-red-700 text-white rounded-full transition">
                      <FaPlay className="text-xl" />
                    </button>
                    <div className="flex items-center gap-6">
                      <span className="flex items-center gap-1 text-gray-500 text-sm cursor-pointer hover:text-red-600">
                        <FaShareAlt className="text-base" /> Compartilhar
                      </span>
                      <span className="flex items-center gap-1 text-gray-500 text-sm cursor-pointer hover:text-red-600">
                        <FaHeart className="text-base" /> Gosto
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
} 