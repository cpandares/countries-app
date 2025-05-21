import {  Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'search-input',
  imports: [],
  templateUrl: './search-input.component.html',
  
})
export class SearchInputComponent { 

  placeholder = input('Buscar...');
  value = output<string>()



}
