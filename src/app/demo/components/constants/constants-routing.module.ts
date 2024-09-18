import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BloodGroupComponent } from './bloodgroup/bloodgroup.component';
import { ChildstatusComponent } from './childstatus/childstatus.component';
import { CityComponent } from './city/city.component';
import { CountryComponent } from './country/country.component';
import { DegreesAuthorityComponent } from './degreesauthority/degreesauthority.component';

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: 'blood-group',
            component: BloodGroupComponent,
            data: {
                ogTitle: environment.ogTitle,
                ogDescription: environment.ogDescription,
                ogImage: environment.appUrl + environment.ogImage
            }
        },
        {
            path: 'child-status',
            component: ChildstatusComponent,
            data: {
                ogTitle: environment.ogTitle,
                ogDescription: environment.ogDescription,
                ogImage: environment.appUrl + environment.ogImage
            }
        },
        {
            path: 'city',
            component: CityComponent,
            data: {
                ogTitle: environment.ogTitle,
                ogDescription: environment.ogDescription,
                ogImage: environment.appUrl + environment.ogImage
            }
        },
        {
            path: 'country',
            component: CountryComponent,
            data: {
                ogTitle: environment.ogTitle,
                ogDescription: environment.ogDescription,
                ogImage: environment.appUrl + environment.ogImage
            }
        },
        {
            path: 'degrees-authority',
            component: DegreesAuthorityComponent,
            data: {
                ogTitle: environment.ogTitle,
                ogDescription: environment.ogDescription,
                ogImage: environment.appUrl + environment.ogImage
            }
        }

    ])],
    exports: [RouterModule]
})
export class ConstantsRoutingModule { }
