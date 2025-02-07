import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { CACHE_TAGS } from '@/lib/utils/cache'
import { TestimonialMapper } from '@/infrastructure/mappers/testimonial.mapper'
import { testimonialService } from '@/lib/services/testimonials.service'

export async function POST(request: NextRequest) {
  const { data, locale } = await request.json()
  
  try {
    console.log('Processing testimonial creation:', {
      locale,
      mappedData: TestimonialMapper.toPersistence(data)
    })

    const newTestimonial = await testimonialService.createTestimonial(TestimonialMapper.toDomain(data), locale)

    // Revalidate cache
    revalidateTag(CACHE_TAGS.TESTIMONIALS)

    return NextResponse.json(TestimonialMapper.toPersistence(newTestimonial))
  } catch (error) {
    console.error('Error creating testimonial:', error)
    return NextResponse.json(
      { error: 'Failed to create testimonial', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') as string;

    console.log('Processing testimonial retrieval:', { locale })

    const testimonials = await testimonialService.getTestimonials(locale);

    return NextResponse.json(testimonials.map(TestimonialMapper.toPersistence));
  } catch (error) {
    console.error('Error retrieving testimonials:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve testimonials', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
