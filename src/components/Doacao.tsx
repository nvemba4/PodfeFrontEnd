import React from "react";

const doacaoData = {
  image: "/images/Group-doar.png",
  sectionLabel: "TRANSFORMANDO VIDAS",
  sectionTitle: "DOE PARA O PODFÉ:",
  title: "TRANSFORMANDO A VIDA\nRESTAURANDO A ESPERANÇA",
  description:
    "Nosso credo comum é a nossa crença na Bíblia, a nossa profunda fé em Jesus Cristo e a nossa aceitação do amor incondicional de Deus. Nosso credo comum é a nossa crença na Bíblia, a nossa profunda fé em Jesus Cristo e a nossa aceitação do amor incondicional de Deus.",
  button: "DOE AGORA",
};



const Doacao: React.FC = () => {
  return (
    
    <section className="w-full max-w-7xl mx-auto px-4 pb-10 pt-8">
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <span className="block w-6 h-0.5 bg-red-500"></span>
          <span className="text-red-500 font-semibold text-sm">{doacaoData.sectionLabel}</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mt-1">{doacaoData.sectionTitle}</h2>
      </div>
      <div
        className="relative w-full h-[400px] md:h-[420px] rounded-lg overflow-hidden flex items-center"
        style={{
          backgroundImage: `url(${doacaoData.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 flex flex-col justify-center items-center md:items-end w-full h-full text-white text-center p-8 md:p-16">
          <div className="w-full md:w-1/2 md:ml-auto text-left">
            <h3 className="text-2xl md:text-4xl font-bold mb-4 leading-tight" style={{ whiteSpace: 'pre-line' }}>{doacaoData.title}</h3>
            <p className="mb-2 text-sm md:text-base max-w-xl">
              {doacaoData.description}
            </p>
            <button className="bg-white/20 border border-white text-white hover:bg-red-500 hover:border-red-500 hover:text-white font-semibold px-8 py-3 rounded mt-2 text-lg shadow-lg transition">{doacaoData.button}</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Doacao; 