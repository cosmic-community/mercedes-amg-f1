import { createBucketClient } from '@cosmicjs/sdk';
import { cache } from 'react';
import type { News, Partner, TeamMember, Car, Race } from '@/types';

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
});

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return '';
  if (typeof field === 'string') return field;
  if (typeof field === 'number' || typeof field === 'boolean') return String(field);
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value);
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key);
  }
  return '';
}

export function formatDate(dateString?: string | null): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function extractDateFromText(text?: string | null): Date | null {
  if (!text) return null;
  const isoMatch = text.match(/\d{4}-\d{2}-\d{2}/);
  if (isoMatch && isoMatch[0]) {
    const parsed = new Date(isoMatch[0]);
    if (!isNaN(parsed.getTime())) return parsed;
  }
  return null;
}

export function getRaceDate(race: Race): Date | null {
  const meta = race.metadata || {};
  const candidates: unknown[] = [meta.date, meta.race_date];

  for (const candidate of candidates) {
    if (typeof candidate === 'string' && candidate) {
      const parsed = new Date(candidate);
      if (!isNaN(parsed.getTime())) return parsed;
    }
  }

  return (
    extractDateFromText(meta.content) ||
    extractDateFromText(race.content) ||
    extractDateFromText(race.title)
  );
}

export function getNextRace(races: Race[]): Race | null {
  if (!races || races.length === 0) return null;
  const now = Date.now();

  const withDates = races
    .map((race) => ({ race, date: getRaceDate(race) }))
    .filter(
      (entry): entry is { race: Race; date: Date } =>
        entry.date !== null && entry.date.getTime() >= now
    )
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  if (withDates.length > 0 && withDates[0]) {
    return withDates[0].race;
  }

  return races[0] || null;
}

const OBJECT_PROPS = ['id', 'slug', 'title', 'content', 'metadata', 'type', 'created_at', 'modified_at'];

export const getNews = cache(async (): Promise<News[]> => {
  try {
    const response = await cosmic.objects
      .find({ type: 'news' })
      .props(OBJECT_PROPS)
      .depth(1);

    const items = response.objects as News[];

    return items.sort((a, b) => {
      const dateA = a.metadata?.published_at ? Date.parse(a.metadata.published_at) : 0;
      const dateB = b.metadata?.published_at ? Date.parse(b.metadata.published_at) : 0;
      return (isNaN(dateB) ? 0 : dateB) - (isNaN(dateA) ? 0 : dateA);
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    throw new Error('Failed to fetch news');
  }
});

export const getNewsBySlug = cache(async (slug: string): Promise<News | null> => {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'news', slug })
      .props(OBJECT_PROPS)
      .depth(1);
    return response.object as News;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null;
    throw new Error('Failed to fetch news article');
  }
});

export const getRaces = cache(async (): Promise<Race[]> => {
  try {
    const response = await cosmic.objects
      .find({ type: 'race' })
      .props(OBJECT_PROPS)
      .depth(1);
    return response.objects as Race[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    throw new Error('Failed to fetch races');
  }
});

export const getRaceBySlug = cache(async (slug: string): Promise<Race | null> => {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'race', slug })
      .props(OBJECT_PROPS)
      .depth(1);
    return response.object as Race;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null;
    throw new Error('Failed to fetch race');
  }
});

export const getCars = cache(async (): Promise<Car[]> => {
  try {
    const response = await cosmic.objects
      .find({ type: 'car' })
      .props(OBJECT_PROPS)
      .depth(1);
    return response.objects as Car[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    throw new Error('Failed to fetch cars');
  }
});

export const getCarBySlug = cache(async (slug: string): Promise<Car | null> => {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'car', slug })
      .props(OBJECT_PROPS)
      .depth(1);
    return response.object as Car;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null;
    throw new Error('Failed to fetch car');
  }
});

export const getTeamMembers = cache(async (): Promise<TeamMember[]> => {
  try {
    const response = await cosmic.objects
      .find({ type: 'team' })
      .props(OBJECT_PROPS)
      .depth(1);
    return response.objects as TeamMember[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    throw new Error('Failed to fetch team members');
  }
});

export const getTeamMemberBySlug = cache(async (slug: string): Promise<TeamMember | null> => {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'team', slug })
      .props(OBJECT_PROPS)
      .depth(1);
    return response.object as TeamMember;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null;
    throw new Error('Failed to fetch team member');
  }
});

export const getPartners = cache(async (): Promise<Partner[]> => {
  try {
    const response = await cosmic.objects
      .find({ type: 'partner' })
      .props(OBJECT_PROPS)
      .depth(1);
    return response.objects as Partner[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    throw new Error('Failed to fetch partners');
  }
});

export const getPartnerBySlug = cache(async (slug: string): Promise<Partner | null> => {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'partner', slug })
      .props(OBJECT_PROPS)
      .depth(1);
    return response.object as Partner;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null;
    throw new Error('Failed to fetch partner');
  }
});