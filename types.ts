export interface CosmicImage {
  url: string;
  imgix_url: string;
}

export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface NavItem {
  label: string;
  href: string;
}

// News
export interface NewsMetadata {
  seo_title?: string;
  seo_description?: string;
  featured_image?: CosmicImage;
  published_at?: string;
  content?: string;
}

export interface News extends CosmicObject {
  type: 'news';
  metadata: NewsMetadata;
}

// Partner
export interface PartnerMetadata {
  seo_description?: string;
  featured_image?: CosmicImage;
  content?: string;
}

export interface Partner extends CosmicObject {
  type: 'partner';
  metadata: PartnerMetadata;
}

// Team
export interface TeamMemberMetadata {
  seo_description?: string;
  featured_image?: CosmicImage;
  content?: string;
  role?: string;
  number?: string | number;
  nationality?: string;
}

export interface TeamMember extends CosmicObject {
  type: 'team';
  metadata: TeamMemberMetadata;
}

// Car
export interface CarMetadata {
  seo_description?: string;
  featured_image?: CosmicImage;
  content?: string;
  model?: string;
  season?: string;
  power_unit?: string;
}

export interface Car extends CosmicObject {
  type: 'car';
  metadata: CarMetadata;
}

// Race
export interface RaceMetadata {
  seo_description?: string;
  featured_image?: CosmicImage;
  content?: string;
  date?: string;
  race_date?: string;
  circuit?: string;
  location?: string;
  round?: string | number;
  status?: string;
  [key: string]: any;
}

export interface Race extends CosmicObject {
  type: 'race';
  metadata: RaceMetadata;
}

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}