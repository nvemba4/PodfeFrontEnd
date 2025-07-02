import React from "react";
import { Calendar, MapPin, Wallet } from "lucide-react";

type ProximoEventoCard = {
  title: string;
  description: string;
  category: string;
  image: string;
};

const ProximoEventos: React.FC = () => {
  const [mainCards, setMainCards] = React.useState<ProximoEventoCard[]>([]);
  const [col3Cards, setCol3Cards] = React.useState<ProximoEventoCard[]>([]);
  const categoryColors: Record<string, string> = {
    Podcast: "text-red-500",
    Solidariedade: "text-pink-500",
    Fé: "text-yellow-600",
    Evento: "text-red-500",
  };

  React.useEffect(() => {
    fetch("/api/proeventos/mainCards")
      .then((res) => res.json())
      .then(setMainCards);
    fetch("/api/proeventos/col3Cards")
      .then((res) => res.json())
      .then(setCol3Cards);
  }, []);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 pb-10 pt-8">
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <span className="block w-6 h-0.5 bg-red-500"></span>
          <a href="#" className="text-red-500 font-semibold text-sm hover:underline uppercase">VER MAIS</a>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mt-1">PRÓXIMOS EVENTOS</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Main 3x2 grid (col-span-9) */}
        <div className="md:col-span-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mainCards.map((item, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="w-full  bg-gray-100  overflow-hidden mb-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className={`block font-semibold mb-1 text-sm ${categoryColors[item.category] || "text-red-500"}`}>
                {item.category}
              </span>
              <h3 className="text-lg font-medium leading-tight">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {item.description}
              </p>
              <div className="flex items-center gap-8 mt-3">
                <span className="flex items-center text-red-500 font-semibold text-sm">
                  <Calendar className="w-4 h-4 mr-1" /> 17/06
                </span>
                <span className="flex items-center text-gray-600 text-sm">
                  <MapPin className="w-4 h-4 mr-1" /> Luanda
                </span>
                <span className="flex items-center text-gray-600 text-sm">
                  <Wallet className="w-4 h-4 mr-1" /> Luanda
                </span>
              </div>
            </div>
          ))}
        </div>
        {/* Third column (col-span-3) */}
        <div className="md:col-span-2 flex flex-col gap-8">
          {col3Cards.map((item, idx) => (
            <div key={idx} className="flex flex-col h-full">
              <div className="w-full h-full  bg-gray-100  overflow-hidden mb-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProximoEventos; 