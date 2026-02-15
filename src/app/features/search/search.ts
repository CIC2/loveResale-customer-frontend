import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { tap } from 'rxjs';
import { SearchStore } from 'shared/api/search/store/search-store';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="filtersForm">
     
    </form>
  `,
  styles: [],
})
export class Search {
  protected searchStore = inject(SearchStore);
  fb = inject(FormBuilder);
  filtersForm = this.fb.group({});
  filterFormValue = toSignal(
    this.filtersForm.valueChanges.pipe(
      tap((res: any) => {
        const { delivery = [], ...form } = res?.searchForm ?? {};
        const [from, to] = Array.isArray(delivery) ? delivery : [];
        const deliveryDateFrom = from && to && from > to ? to : from;
        const deliveryDateTo = from && to && from > to ? from : to;
        const formData = {
          ...form,
          page: 0,
          deliveryDateFrom,
          unitTypeIds: form.unitTypeIds?.id,
          deliveryDateTo,
        };

        this.searchStore.searchModels(formData);
      })
    ),
    {
      initialValue: this.filtersForm.value,
    }
  );
}
