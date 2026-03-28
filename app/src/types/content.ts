export type ContentNiche =
  | "entertainment"
  | "cooking"
  | "sports"
  | "technology"
  | "education"
  | "kids";

export type ContentStatus =
  | "idea"
  | "scripted"
  | "producing"
  | "ready"
  | "published"
  | "analyzing";

export interface TrendData {
  id: string;
  title: string;
  platform: string;
  niche: ContentNiche;
  views: number;
  engagement: number;
  detectedAt: Date;
}

export interface ContentPipeline {
  id: string;
  niche: ContentNiche;
  status: ContentStatus;
  trend?: TrendData;
  script?: string;
  videoUrl?: string;
  channelId: string;
  createdAt: Date;
}
