import { Property, Property_Plain } from "../generated-interfaces/api/property";
import { Building } from "../generated-interfaces/components/shared/Building";
import { Features } from "../generated-interfaces/components/shared/Features";
export type DynamicComponentDataModel = Location | Building | Features ; // Union type for dynamic components


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
