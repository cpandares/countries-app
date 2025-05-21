import { Routes } from '@angular/router';
import { ByCapitalComponent } from './views/by-capital/by-capital.component';
import { CountryLayoutComponent } from './layouts/CountryLayout/CountryLayout.component';
import { ByCountryComponent } from './views/by-country/by-country.component';
import { ByRegionComponent } from './views/by-region/by-region.component';
import { CountryPageComponent } from './views/country-page/country-page.component';


export const CountryRoutes: Routes = [

    {
        path: '',
        component: CountryLayoutComponent,
        children: [
            {
                path: 'by-capital',
                component: ByCapitalComponent
            },
            {
                path:'by-country',
                component: ByCountryComponent
            },
            {
                path:'by-region',
                component: ByRegionComponent
            },
             {
                path:'by/:code',
                component: CountryPageComponent
            },
            {
                path: '**',
                redirectTo: 'by-capital'
            }
        ]
    },
    


];


export default CountryRoutes;
