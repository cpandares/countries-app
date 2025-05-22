import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryService } from '../../services/country.service';
import { RESTCountry } from '../../interfaces/rest-cuntries.interface';
import { Country } from '../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-by-capital',
  imports: [CountryListComponent, SearchInputComponent],
  templateUrl: './by-capital.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCapitalComponent {

  countryService = inject(CountryService);

  isLoading = signal(false);
  isError = signal<string | null>(null);
  countries = signal<Country[]>([]);

  SearchValue(value:string){

    if(this.isLoading()) return;

    this.isLoading.set(true);
    this.isError.set(null);

    this.countryService.searchByCapital(value)
        .subscribe({
          next: (resp)=>{
            this.isLoading.set(false);
            this.countries.set(resp)
          },
          error: (err) =>{
            this.isLoading.set(false);
            this.countries.set([]);
            this.isError.set(err)
          }
        })


  }


 }
