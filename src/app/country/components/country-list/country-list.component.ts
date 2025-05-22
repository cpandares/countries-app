import {  Component, input } from '@angular/core';
import { RESTCountry } from '../../interfaces/rest-cuntries.interface';
import { Country } from '../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'country-list',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './country-list.component.html',
  
})
export class CountryListComponent {

  countries = input<Country[]>();

  errorMessage = input<string | unknown>();
  isLoading = input<boolean>();
  hasError = input<boolean>();


 }
