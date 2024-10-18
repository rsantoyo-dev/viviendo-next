// Interface automatically generated by schemas-to-ts

import { Location } from '../components/shared/Location';
import { Media } from '../components/shared/Media';
import { Building } from '../components/shared/Building';
import { Features } from '../components/shared/Features';
import { Location_Plain } from '../components/shared/Location';
import { Media_Plain } from '../components/shared/Media';
import { Building_Plain } from '../components/shared/Building';
import { Features_Plain } from '../components/shared/Features';
import { Location_NoRelations } from '../components/shared/Location';
import { Building_NoRelations } from '../components/shared/Building';
import { Features_NoRelations } from '../components/shared/Features';
import { AdminPanelRelationPropertyModification } from '../common/AdminPanelRelationPropertyModification';

export enum PropertyStatus {
  ForSale = 'forSale',
  ForRent = 'forRent',
  OnHold = 'onHold',
  Rented = 'Rented',
  Sold = 'Sold',}
export enum PropertyType {
  SingleFamilyHome = 'singleFamilyHome',
  Condo = 'condo',
  Loft = 'loft',
  Plex = 'plex',
  Intergeneration = 'intergeneration',
  MobileHome = 'mobileHome',
  Farm = 'farm',
  Cottage = 'cottage',
  Land = 'land',}

export interface Property {
  id: number;
  attributes: {
    createdAt: Date;    updatedAt: Date;    publishedAt?: Date;    location?: Location;
    catastroId?: string;
    media?: { data: Media[] };
    propertyStatus?: PropertyStatus;
    listedPrice?: number;
    registrationId: string;
    test?: string;
    propertyType?: PropertyType;
    building?: Building;
    features?: Features;
  };
}
export interface Property_Plain {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  location?: Location_Plain;
  catastroId?: string;
  media?: Media_Plain[];
  propertyStatus?: PropertyStatus;
  listedPrice?: number;
  registrationId: string;
  test?: string;
  propertyType?: PropertyType;
  building?: Building_Plain;
  features?: Features_Plain;
}

export interface Property_NoRelations {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  location?: Location_NoRelations;
  catastroId?: string;
  media?: number[];
  propertyStatus?: PropertyStatus;
  listedPrice?: number;
  registrationId: string;
  test?: string;
  propertyType?: PropertyType;
  building?: Building_NoRelations;
  features?: Features_NoRelations;
}

export interface Property_AdminPanelLifeCycle {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  location?: Location_Plain;
  catastroId?: string;
  media?: AdminPanelRelationPropertyModification<Media_Plain>[];
  propertyStatus?: PropertyStatus;
  listedPrice?: number;
  registrationId: string;
  test?: string;
  propertyType?: PropertyType;
  building?: Building_Plain;
  features?: Features_Plain;
}
