import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    {
      image: "/images/Podfe_Cover.png",
      category: "Podcast",
      title: "Mudar para a cidade grande pode ser bastante estressante",
    },
    {
      image: "/images/Rectangle_2.png",
      category: "Solidariedade",
      title: "Mudar para a cidade grande pode ser bastante estressante",
    },
    {
      image: "/images/slide_3.png",
      category: "Podcast",
      title: "Mudar para a cidade grande pode ser bastante estressante",
    },
    {
      image: "/images/Curadas_para_curar.png",
      category: "Fé",
      title: "Mudar para a cidade grande pode ser bastante estressante",
    },
    {
      image: "/images/slide_1.png",
      category: "Evento",
      title: "Mudar para a cidade grande pode ser bastante estressante",
    },
    {
      image: "/images/slide_2.png",
      category: "Evento",
      title: "Mudar para a cidade grande pode ser bastante estressante",
    },
  ]);
} 