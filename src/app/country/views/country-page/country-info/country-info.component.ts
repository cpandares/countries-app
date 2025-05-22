import { Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Country } from '../../../interfaces/country.interface';

@Component({
  selector: 'country-info',
  imports: [DecimalPipe],
  templateUrl: './country-info.component.html',
  
})
export class CountryInfoComponent {


  country = input.required<Country>();
 }
