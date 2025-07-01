import { NextResponse } from 'next/server';
import { bannerSlides } from '@/mock/bannerCarouselData';

export async function GET() {
  return NextResponse.json(bannerSlides);
} 