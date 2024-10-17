// Interface automatically generated by schemas-to-ts

import { Article } from './article';
import { Article_Plain } from './article';
import { AdminPanelRelationPropertyModification } from '../common/AdminPanelRelationPropertyModification';

export interface Category {
  id: number;
  attributes: {
    createdAt: Date;    updatedAt: Date;    publishedAt?: Date;    name?: string;
    slug?: string;
    articles: { data: Article[] };
    description?: string;
  };
}
export interface Category_Plain {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  name?: string;
  slug?: string;
  articles: Article_Plain[];
  description?: string;
}

export interface Category_NoRelations {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  name?: string;
  slug?: string;
  articles: number[];
  description?: string;
}

export interface Category_AdminPanelLifeCycle {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  name?: string;
  slug?: string;
  articles: AdminPanelRelationPropertyModification<Article_Plain>;
  description?: string;
}