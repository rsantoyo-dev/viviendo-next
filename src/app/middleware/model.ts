import { Property } from "../generated-interfaces/api/property";
import { Building } from "../generated-interfaces/components/shared/Building";
export type DynamicComponentDataModel = Location | Building | Features ; // Union type for dynamic components


export type PropertiesConnectionResponse = {
  nodes: Property[];
  pageInfo: PageInfo;
}
export type PageInfo  ={
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
}
