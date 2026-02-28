import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponse } from 'core/models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  GetUnitsParams,
  ModelDetailsResponse,
  PaginatedResponse,
  UnitListResponse,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class UnitApi {
  private http = inject(HttpClient);
  private baseUrl = `${environment.baseUrl}/inventory/customer/`;
  private unitsUrl = `${environment.baseUrl}/inventory/unit`;

  getModelById(id: string | number): Observable<ApiResponse<ModelDetailsResponse>> {
    return this.http.get<ApiResponse<ModelDetailsResponse>>(
      `${this.baseUrl}${id}`
    );
  }

  /**
   * GET /api/inventory/unit - fetch paginated units with optional filters.
   */
  getUnits(
    params: GetUnitsParams = {}
  ): Observable<ApiResponse<PaginatedResponse<UnitListResponse>>> {
    let httpParams = new HttpParams();
    const { page = 0, size = 10, ...rest } = params;
    httpParams = httpParams.set('page', String(page)).set('size', String(size));

    Object.entries(rest).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      if (Array.isArray(value)) {
        value.forEach((v) => {
          httpParams = httpParams.append(key, String(v));
        });
      } else {
        httpParams = httpParams.set(key, String(value));
      }
    });

    return this.http.get<ApiResponse<PaginatedResponse<UnitListResponse>>>(
      this.unitsUrl,
      { params: httpParams }
    );
  }
}
