import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    {
      image: "/images/ProfetaCastelo.png",
      category: "Podcast",
      title: "Mudar para a cidade grande pode ser bastante estressante",
    },
    {
      image: "/images/Meseparei.png",
      category: "Solidariedade",
      title: "Mudar para a cidade grande pode ser bastante estressante",
    },
    {
      image: "/images/TudosobreCasamento.png",
      category: "Podcast",
      title: "Mudar para a cidade grande pode ser bastante estressante",
    },
    {
      image: "/images/FaithinMotion.png",
      category: "Fé",
      title: "Mudar para a cidade grande pode ser bastante estressante",
    },
    {
      image: "/images/Africanamericansoncast.png",
      category: "Evento",
      title: "Mudar para a cidade grande pode ser bastante estressante",
    },
    {
      image: "/images/AlgenuraFinda.png",
      category: "Evento",
      title: "Mudar para a cidade grande pode ser bastante estressante",
    },
  ]);
} 