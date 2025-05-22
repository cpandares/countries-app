import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-cuntries.interface';
import { catchError,  map, Observable, of, tap, throwError } from 'rxjs';
import { CountryMapper } from '../mapper/country.mapper';
import { Country } from '../interfaces/country.interface';
import { Region } from '../interfaces/region.interface';


const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<string, Country[]>();



  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query)!)
    }
   

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map((resp) => CountryMapper.mapCountryToArray(resp)),
        tap((countries) => this.queryCacheCapital.set(query, countries)),
        catchError(err => {
          console.log(err)

          return throwError(() => new Error('No se encontro su busqueda'))
        })
      )
  }


  searchByCountry(country: string): Observable<Country[]> {
    country = country.toLowerCase();
    if (this.queryCacheCountry.has(country)) {
      return of(this.queryCacheCountry.get(country)!)
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${country}`)
      .pipe(
        map((resp) => CountryMapper.mapCountryToArray(resp)),
        tap((countries) => this.queryCacheCountry.set(country, countries)),
        catchError(err => {
          console.log(err)

          return throwError(() => new Error('No se encontro su busqueda'))
        })
      )
  }

  searchByCountryCode(code: string) {
    code = code.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`)
      .pipe(
        map((resp) => CountryMapper.mapCountryToArray(resp)),
        map( (countries) => countries.at(0)  ),
        
        catchError(err => {
          console.log(err)

          return throwError(() => new Error('No se encontro su busqueda'))
        })
      )
  }


  searchCountryByRegion(region:Region):Observable<Country[]>{
      const url = `${API_URL}/region/${region}`;

      if (this.queryCacheRegion.has(region)) {
        return of(this.queryCacheRegion.get(region)!)
      }
      return this.http.get<RESTCountry[]>(url)
      .pipe(
        map((resp) => CountryMapper.mapCountryToArray(resp)),
        tap((countries) => this.queryCacheRegion.set(region, countries)),
        catchError(err => {
          console.log(err)

          return throwError(() => new Error('No se encontro su busqueda'))
        }
        )
      )


   }

}
