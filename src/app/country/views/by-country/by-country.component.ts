import { ChangeDetectionStrategy, Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { firstValueFrom } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-country.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCountryComponent { 

countryService = inject(CountryService);
  activatedRoute = inject(ActivatedRoute);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') || '';
  query = linkedSignal(()=>this.queryParam);

   /* router */
  router = inject(Router);

  countryResource = resource({
    request: ()=>({
      query: this.query()
    }),
    loader: async({ request })=>{
      if (!request.query) return;

      this.router.navigate(['/country/by-country'], {
        queryParams: {
          query: request.query
        }
      })

      return await firstValueFrom(
         this.countryService.searchByCountry(request.query)
      )
    }
  })

}
