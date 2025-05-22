import {  Component, input } from '@angular/core';
import { RESTCountry } from '../../interfaces/rest-cuntries.interface';
import { Country } from '../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'country-list',
  imports: [DecimalPipe],
  templateUrl: './country-list.component.html',
  
})
export class CountryListComponent {

  countries = input<Country[]>()

 }
