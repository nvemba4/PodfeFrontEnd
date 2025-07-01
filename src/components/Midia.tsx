import React from "react";

type MidiaCard = {
  image: string;
  category: string;
  title: string;
};

const Midia: React.FC = () => {
  const [mainCards, setMainCards] = React.useState<MidiaCard[]>([]);
  const [col2Cards, setCol2Cards] = React.useState<MidiaCard[]>([]);
  const [col3Cards, setCol3Cards] = React.useState<MidiaCard[]>([]);
  const categoryColors: Record<string, string> = {
    Podcast: "text-red-500",
    Solidariedade: "text-pink-500",
    Fé: "text-yellow-600",
    Evento: "text-red-500",
  };

  React.useEffect(() => {
    fetch("/api/midia/mainCards")
      .then((res) => res.json())
      .then(setMainCards);
    fetch("/api/midia/col2Cards")
      .then((res) => res.json())
      .then(setCol2Cards);
    fetch("/api/midia/col3Cards")
      .then((res) => res.json())
      .then(setCol3Cards);
  }, []);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Main 3x2 grid (col-span-9) */}
        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mainCards.map((item, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="w-full aspect-video bg-gray-100  overflow-hidden mb-3">
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
            </div>
          ))}
        </div>
        {/* Second column (col-span-3) */}
        <div className="md:col-span-2 flex flex-col gap-8">
          {col2Cards.map((item, idx) => (
            <div key={idx} className="flex flex-col border-b-2 pb-2">
              
              <span className={`block font-semibold mb-1 text-sm ${categoryColors[item.category] || "text-red-500"}`}>
                {item.category}
              </span>
              <h3 className="text-base font-medium leading-tight">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
        {/* Third column (col-span-3) */}
        <div className="md:col-span-2 flex flex-col gap-8">
          {col3Cards.map((item, idx) => (
            <div key={idx} className="flex flex-col h-full">
              <div className="w-full h-full aspect-video bg-gray-100  overflow-hidden mb-3">
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

export default Midia; 