import { Country } from "../interfaces/country.interface";
import { RESTCountry } from "../interfaces/rest-cuntries.interface";

export class CountryMapper {


    static mapRestCountry ( country:RESTCountry ):Country{
        return {
            code: country.cca2,
            name: country.translations['spa'].common ?? country.name.common,
            icon: country.flag,
            flag: country.flags.svg,
            population: country.population,
            capital: country.capital?.join(' '),
            borders: country.borders ?? [],
        }
    }


    static mapCountryToArray( country:RESTCountry[] ):Country[]{

        return country.map(this.mapRestCountry)
    }


}