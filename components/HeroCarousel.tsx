'use client';

import { useEffect, useState } from 'react';
import type { News } from '@/types';
import { formatDate } from '@/lib/cosmic';

interface HeroCarouselProps {
  items: News[];
}

export default function HeroCarousel({ items }: HeroCarouselProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [items.length]);

  if (!items || items.length === 0) {
    return null;
  }

  const current = items[index];
  if (!current) return null;

  const hasMultiple = items.length > 1;
  const prevIndex = hasMultiple ? (index - 1 + items.length) % items.length : index;
  const nextIndex = hasMultiple ? (index + 1) % items.length : index;
  const prevItem = items[prevIndex];
  const nextItem = items[nextIndex];

  const goPrev = () => setIndex((prev) => (prev - 1 + items.length) % items.length);
  const goNext = () => setIndex((prev) => (prev + 1) % items.length);

  const renderSlide = (item: News | undefined, isCurrent: boolean) => {
    if (!item) return null;
    const image = item.metadata?.featured_image;
    return (
      <div
        className={`relative rounded-2xl overflow-hidden flex-shrink-0 transition-all duration-700 ease-out ${
          isCurrent
            ? 'w-full sm:w-[72%] h-[380px] sm:h-[520px] z-10'
            : 'hidden sm:block w-[14%] h-[340px] opacity-40 z-0'
        }`}
      >
        {image && (
          <img
            src={`${image.imgix_url}?w=1600&h=1200&fit=crop&auto=format,compress`}
            alt={item.title}
            className="w-full h-full object-cover"
            width={800}
            height={600}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        {isCurrent && (
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
            {item.metadata?.published_at && (
              <p className="text-f1-teal text-xs sm:text-sm uppercase tracking-widest mb-2">
                {formatDate(item.metadata.published_at)}
              </p>
            )}
            <h2 className="text-2xl sm:text-4xl font-bold uppercase leading-tight max-w-2xl font-heading">
              {item.title}
            </h2>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-center gap-3 sm:gap-4">
        {renderSlide(prevItem, false)}
        {renderSlide(current, true)}
        {renderSlide(nextItem, false)}
      </div>
      {hasMultiple && (
        <>
          <button
            onClick={goPrev}
            aria-label="Previous slide"
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 border border-neutral-700 flex items-center justify-center text-white hover:border-f1-teal hover:text-f1-teal transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={goNext}
            aria-label="Next slide"
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 border border-neutral-700 flex items-center justify-center text-white hover:border-f1-teal hover:text-f1-teal transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
          <div className="flex justify-center gap-2 mt-6">
            {items.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? 'w-8 bg-f1-teal' : 'w-1.5 bg-neutral-700'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}