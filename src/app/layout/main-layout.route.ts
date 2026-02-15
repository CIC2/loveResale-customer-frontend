import { Routes } from '@angular/router';
import { authGuard } from 'core/guards';
import { ModelResolver } from 'core/api/model-details/resolver/model-resolver';

export const CUSTOMER_LAYOUT: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('features/home/home').then((c) => c.Home),
  },
  
  {
    path: 'search',
    loadChildren: () =>
      import('features/search/search.route').then((m) => m.SEARCH_ROUTES),
  },
  {
    path: 'all-units',
    loadChildren: () =>
      import('features/all-units/all-units.route').then((m) => m.ALL_UNITS_ROUTES),
  },
  {
    path: 'model/:id',
    loadComponent: () =>
      import('features/model-details/model-details').then(
        (c) => c.ModelDetails
      ),
    resolve: {
      model: ModelResolver,
    },
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('features/profile/profile').then((c) => c.Profile),
    
  },
  {
    path: 'projects',
    loadChildren: () =>
      import('features/projects/projects.route').then(
        (m) => m.PROJECTS_ROUTES
      ),
  },
  {
    path: 'project-details/:id',
    loadChildren: () =>
      import('features/project-details/project-details.route').then(
        (m) => m.PROJECT_DETAILS
      ),
  },
  
  {
    path: 'sell-property',
    loadComponent: () =>
      import('features/add-property/add-property').then((c) => c.AddProperty),
  },
  {
    path: 'about-us',
    loadComponent: () =>
      import('features/about-us/about-us').then((c) => c.AboutUs),
  },
  {
    path: 'blog',
    loadChildren: () =>
      import('features/blog/blog.route').then((m) => m.BLOG_ROUTES),
  },
  {
    path: 'contact-us',
    loadComponent: () =>
      import('features/contact-us/contact-us').then((c) => c.ContactUs),
  },
  {
    path: 'payment',
    loadComponent: () =>
      import('features/payment/payment').then((c) => c.Payment),
  },
  {
    path: '404',
    loadComponent: () =>
      import('shared/components').then((c) => c.NotFoundComponent),
  },
];
