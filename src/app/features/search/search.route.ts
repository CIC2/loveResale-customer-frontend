import { Routes } from '@angular/router';
import { comparisonGuard } from 'core/guards/comparison.guard';
import { ComparisonResolver } from '../../core/api/search/resolver/comparison-resolver';

export const SEARCH_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./search').then((c) => c.Search),
  },
 
];
