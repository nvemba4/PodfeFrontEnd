import { NextResponse } from 'next/server';
import { mainNews, destaques, recentNews, ads } from '@/mock/noticiasPublicidadeData';

export async function GET() {
  return NextResponse.json({
    mainNews,
    destaques,
    recentNews,
    ads,
  });
} 