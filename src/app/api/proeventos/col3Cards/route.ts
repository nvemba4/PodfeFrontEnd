import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    {
      image: "/images/move.png",
      category: "Evento",
      title: "Mudar para a cidade grande pode ser bastante estressante",
    },
   
  ]);
} 