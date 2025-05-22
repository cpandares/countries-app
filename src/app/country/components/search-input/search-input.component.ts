import {  Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'search-input',
  imports: [],
  templateUrl: './search-input.component.html',
  
})
export class SearchInputComponent { 

  placeholder = input('Buscar...');
  value = output<string>();
  initialValue = input<string>('');

  inputValue = linkedSignal<string>(()=>this.initialValue());

  debounEffect = effect((onCleanup)=>{
    const value = this.inputValue();
     
    const timeout = setTimeout(()=>{
      this.value.emit(value);
    },500 )

      onCleanup(()=>{
        clearTimeout(timeout);
      })

  })

}
