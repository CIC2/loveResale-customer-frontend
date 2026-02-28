/**
 * Matches backend UnitListDTO from inventory API.
 */
export interface UnitListResponse {
  id: number;
  projectId: number;
  projectName: string;
  projectNameAr: string;
  projectCode: string;
  usageTypeName: string;
  usageTypeNameAr: string;
  modelId: number;
  modelCode: string;
  unitModelCode: string;
  name: string;
  nameAr: string;
  area: number;
  basePrice: string;
  address: string;
  addressAr: string;
  bathroom: string;
  deliveryDate: string;
  deliveryTextAr: string;
  deliveryText: string;
  numberOfRooms: string;
  isAvailable: boolean;
  statusDescription: string;
  floor: string;
  ruViewDescription: string;
  modelName: string;
  finishing: string;
  modelImageUrl?: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface GetUnitsParams {
  page?: number;
  size?: number;
  locationId?: number;
  projectIds?: number[];
  unitTypeIds?: number[];
  areaFrom?: number;
  areaTo?: number;
  modelCode?: string;
  bathrooms?: string[];
  bedrooms?: string[];
  floors?: string[];
  deliveryDateFrom?: string;
  deliveryDateTo?: string;
  priceFrom?: number;
  priceTo?: number;
  businessEntityIds?: number[];
  region?: string[];
  subregion?: string[];
}
