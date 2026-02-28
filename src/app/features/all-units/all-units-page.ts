import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PaginatorState } from 'primeng/paginator';
import { UnitApi } from 'core/api/search/services/unit';
import { GetUnitsParams, UnitListResponse } from 'core/api/search/models';
import { SearchService } from 'shared/api/search/services/search';
import { SearchStore } from 'shared/api/search/store/search-store';
import {
  FiltersSidebar,
  FiltersState,
  FilterOption,
} from './components/filters-sidebar/filters-sidebar';
import { SearchHeader, SearchHeaderFilters } from './components/search-header/search-header';
import { UnitCardData } from './components/unit-card/unit-card';
import { UnitsGrid } from './components/units-grid/units-grid';

function mapUnitToCardData(item: UnitListResponse): UnitCardData {
  const totalPrice = parseFloat(item.basePrice ?? '0') || 0;
  return {
    id: item.id,
    imageUrl: item.modelImageUrl ?? '/images/all-units-image.jpg',
    location: item.projectName ?? item.address ?? '',
    title: item.name ?? item.modelName ?? '',
    bedrooms: parseInt(item.numberOfRooms ?? '0', 10) || 0,
    bathrooms: parseInt(item.bathroom ?? '0', 10) || 0,
    view: item.ruViewDescription ?? '',
    area: item.area ?? 0,
    garage: false,
    readyToMove: Boolean(item.deliveryDate),
    totalPrice,
    paidAmount: 0,
    offerAmount: totalPrice,
    isFavorite: false,
  };
}

@Component({
  selector: 'app-all-units-page',
  standalone: true,
  imports: [
    SearchHeader,
    FiltersSidebar,
    UnitsGrid,
  ],
  templateUrl: './all-units-page.html',
  styleUrl: './all-units-page.scss',
})
export class AllUnitsPage implements OnInit {
  private router = inject(Router);
  private unitApi = inject(UnitApi);
  private searchService = inject(SearchService);
  protected searchStore = inject(SearchStore);

  // Filter options
  typeOptions = signal<FilterOption[]>([
    { label: 'Apartment', value: 'apartment' },
    { label: 'Villa', value: 'villa' },
    { label: 'Townhouse', value: 'townhouse' },
    { label: 'Duplex', value: 'duplex' },
    { label: 'Penthouse', value: 'penthouse' },
  ]);

  projectOptions = signal<FilterOption[]>([
    { label: 'New Cairo', value: 'new_cairo' },
    { label: 'Madinaty', value: 'madinaty' },
    { label: 'SouthMED', value: 'southmed' },
    { label: 'Capital Gardens', value: 'capital_gardens' },
  ]);

  locationOptions = signal<FilterOption[]>([
    { label: 'New Cairo', value: 'new_cairo' },
    { label: 'North Coast', value: 'north_coast' },
    { label: 'New Capital', value: 'new_capital' },
    { label: '6th of October', value: 'october' },
  ]);

  deliveryOptions = signal<FilterOption[]>([
    { label: '2024', value: '2024' },
    { label: '2025', value: '2025' },
    { label: '2026', value: '2026' },
    { label: '2027', value: '2027' },
    { label: '2028', value: '2028' },
  ]);

  modelOptions = signal<FilterOption[]>([]);

  units = signal<UnitCardData[]>([]);
  totalRecords = signal(0);
  currentPage = signal(0);
  pageSize = signal(10);
  loading = signal(false);

  private lastParams: GetUnitsParams = {};

  ngOnInit() {
    this.loadFilterOptions();
    this.loadUnits();
  }

  loadFilterOptions() {
    // Load filter options from API when available
    // this.searchService.getSearchModel({}).subscribe((res) => { ... });
  }

  loadUnits() {
    this.loading.set(true);
    this.unitApi
      .getUnits({
        page: this.currentPage(),
        size: this.pageSize(),
        ...this.lastParams,
      })
      .subscribe({
        next: (res) => {
          if (res.status && res.data) {
            this.units.set(res.data.content.map(mapUnitToCardData));
            this.totalRecords.set(res.data.totalElements);
          } else {
            this.units.set([]);
          }
          this.loading.set(false);
        },
        error: () => {
          this.units.set([]);
          this.loading.set(false);
        },
      });
  }

  onSearch(filters: SearchHeaderFilters) {
    this.lastParams = {};
    this.currentPage.set(0);
    this.loading.set(true);
    this.loadUnits();
  }

  onKeywordClick(keyword: string) {
    this.lastParams = { ...this.lastParams, modelCode: keyword };
    this.currentPage.set(0);
    this.loadUnits();
  }

  onFiltersChange(filters: Partial<FiltersState>) {
    this.lastParams = { ...this.lastParams };
    this.currentPage.set(0);
    this.loading.set(true);
    this.loadUnits();
  }

  onResetFilters() {
    this.lastParams = {};
    this.currentPage.set(0);
    this.loading.set(true);
    this.loadUnits();
  }

  onPageChange(event: PaginatorState) {
    this.currentPage.set(event.page ?? 0);
    this.loadUnits();
  }

  onFavoriteClick(unitId: number) {
    const currentUnits = this.units();
    const updatedUnits = currentUnits.map((unit) =>
      unit.id === unitId ? { ...unit, isFavorite: !unit.isFavorite } : unit
    );
    this.units.set(updatedUnits);
  }

  onCardClick(unitId: number) {
    this.router.navigate(['/model', unitId]);
  }
}
