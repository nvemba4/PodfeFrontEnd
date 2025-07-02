import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    {
      title: "Detox da Alma",
      description: "Este evento irá abordar os desafios e oportunidades de se mudar para uma cidade grande. Participe para aprender e compartilhar experiências!",
      category: "Podcast",
      image: "/images/chindinma.png",
    },
    {
      title: "Melhores suportando mulheres",
      description: "Descubra maneiras práticas de exercer a solidariedade em sua comunidade neste evento especial.",
      category: "Solidariedade",
      image: "/images/workshopmulheres.png",
    },
    {
      title: "Testemunhos no Podfé",
      description: "Um bate-papo inspirador sobre fé, transformação e crescimento pessoal em sua comunidade neste evento especial.",
      category: "Podcast",
      image: "/images/Cantoraovivo.png",
    },
  ]);
} 