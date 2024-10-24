// Interface automatically generated by schemas-to-ts

import { Media } from './Media';
import { Media_Plain } from './Media';

export interface Seo {
  metaTitle: string;
  metaDescription: string;
  shareImage?: { data: Media };
}
export interface Seo_Plain {
  metaTitle: string;
  metaDescription: string;
  shareImage?: Media_Plain;
}

export interface Seo_NoRelations {
  metaTitle: string;
  metaDescription: string;
  shareImage?: number;
}

