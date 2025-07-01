import React, { useEffect, useState } from "react";

// Data types
type MainNews = {
  image: string;
  category: string;
  title: string;
  description: string;
};
type Destaque = {
  image?: string;
  category?: string;
  title?: string;
};
type RecentNews = {
  image: string;
  category: string;
  title: string;
};
type Ad = {
  image: string;
  alt: string;
};

type NoticiasPublicidadeData = {
  mainNews: MainNews;
  destaques: Destaque[];
  recentNews: RecentNews[];
  ads: Ad[];
};

export default function NoticiasePublicidade() {
  const [data, setData] = useState<NoticiasPublicidadeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/noticias-publicidade")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;
  if (!data) return <div>Nenhum dado encontrado.</div>;

  const { mainNews, destaques, recentNews, ads } = data;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Column 1: Main News (col-span-8) */}
      <div className="md:col-span-8 flex flex-col">
        <div className="bg-white shadow-lg overflow-hidden mb-6 flex flex-col">
          <img
            src={mainNews.image}
            alt="Main News"
            className="w-full object-cover"
          />
          <div className="p-8 flex-1 flex flex-col">
            <span className="text-red-600 font-semibold text-base mb-2 block">{mainNews.category}</span>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {mainNews.title}
            </h2>
            <p className="text-gray-700 text-base flex-1">
              {mainNews.description}
            </p>
          </div>
        </div>
      </div>
      {/* Column 2: Recent News (col-span-2) */}
      <div className="md:col-span-2 flex flex-col gap-9 ">
        {recentNews.map((item, idx) => {
          return (
            <div key={idx} className="flex flex-col bg-white shadow overflow-hidden">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full object-cover"
                />
              ) : null}
              <div className="flex flex-col justify-end p-3 flex-1 bg-white shadow-lg overflow-hidden">
                <span className="text-red-600 text-xs font-semibold mb-1">{item.category}</span>
                <h4 className="text-base font-medium leading-tight">
                  {item.title}
                </h4>
              </div>
            </div>
          );
        })}
      </div>
      {/* Column 3:   Ads   (col-span-2) */}
      <aside className="md:col-span-2 flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          {ads.map((ad, idx) => (
            <div key={idx} className="shadow overflow-hidden">
              <img src={ad.image} alt={ad.alt} className="w-full object-cover" />
            </div>
          ))}
        </div>
      </aside>
    </section>
  );
} 