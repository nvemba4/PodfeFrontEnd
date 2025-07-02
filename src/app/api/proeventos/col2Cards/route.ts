import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
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
    {
      image: "/images/Podfé_.png",
      category: "Evento",
      title: "Mudar para a cidade grande pode ser bastante estressante",
    },
    {
      image: "/images/39.png",
      category: "Evento",
      title: "Mudar para a cidade grande pode ser bastante estressante",
    },
  ]);
} 