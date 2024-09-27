import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PersonComponent } from './person/person.component';
import { PersonPrfileComponent } from './person-profile/person-profile.component';

@NgModule({
    imports: [RouterModule.forChild([

        {
            path: 'employees',
            component: PersonComponent,
            data: {
                ogTitle: environment.ogTitle,
                ogDescription: environment.ogDescription,
                ogImage: environment.appUrl + environment.ogImage
            }
        }
        ,
        {
            path: 'employee-profile/:id',
            component: PersonPrfileComponent,
            data: {
                ogTitle: environment.ogTitle,
                ogDescription: environment.ogDescription,
                ogImage: environment.appUrl + environment.ogImage
            }
        }
    ])],
    exports: [RouterModule]
})
export class EmployeesRoutingModule { }
