import { Property, Property_Plain, PropertyStatus } from "../generated-interfaces/api/property";
import { Building } from "../generated-interfaces/components/shared/Building";
import { Features } from "../generated-interfaces/components/shared/Features";
export type DynamicComponentDataModel = Location | Building | Features ; // Union type for dynamic components

// Generic filter for numerical fields
export type NumberFilter = {
  eq?: number;
  gt?: number;
  gte?: number;
  lt?: number;
  lte?: number;
  in?: number[];
  notIn?: number[];
};

// Generic filter for string fields
export type StringFilter = {
  eq?: string;
  contains?: string;
  startsWith?: string;
  endsWith?: string;
  in?: string[];
  notIn?: string[];
};

// Generic filter for boolean fields
export type BooleanFilter = {
  eq?: boolean;
};

// Generic filter for enum fields (if applicable)
export type EnumFilter<T> = {
  eq?: T;
  in?: T[];
  notIn?: T[];
};

// Define filters for nested objects
export type LocationFilters = {
  address?: StringFilter;
  neighborhood?: StringFilter;
  borough?: StringFilter;
  city?: StringFilter;
  codePostal?: StringFilter; // Adjust to NumberFilter if postal codes are numerical
  lat?: NumberFilter;
  long?: NumberFilter;
  country?: StringFilter;
  state?: StringFilter;
};

export type BuildingFilters = {
  attached?: BooleanFilter;
  buildYear?: NumberFilter;
  bungalow?: BooleanFilter;
  century?: NumberFilter;
  detached?: BooleanFilter;
  id?: StringFilter; // Assuming 'id' is a string; adjust if necessary
  livingArea?: NumberFilter;
  newConstruction?: BooleanFilter;
  semiDetached?: BooleanFilter;
  splitLevel?: BooleanFilter;
};

export type FeaturesFilters = {
  bathrooms?: NumberFilter;
  elevator?: BooleanFilter;
  bedrooms?: NumberFilter;
  garages?: NumberFilter;
  parking?: BooleanFilter; // Change to NumberFilter if parking spots are numerical
  petsAllowed?: BooleanFilter;
  pool?: BooleanFilter;
  reducedMobility?: BooleanFilter;
  smokingAllowed?: BooleanFilter;
  waterAccess?: BooleanFilter;
  waterfront?: BooleanFilter;
};



// Main PropertyFiltersInput type
export type PropertyFiltersInput = {
  listedPrice?: NumberFilter;
  propertyStatus?: EnumFilter<PropertyStatus>; // Assuming propertyStatus is of type PublicationStatus
  location?: LocationFilters;
  propertyType?: StringFilter; // Change to EnumFilter if propertyType is an enum
  building?: BuildingFilters;
  features?: FeaturesFilters;
  // Add more filter categories if needed
};

export type PropertiesConnectionResponse = {
  nodes: Property_Plain[];
  pageInfo: PageInfo;
}
export type PageInfo  ={
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
}
