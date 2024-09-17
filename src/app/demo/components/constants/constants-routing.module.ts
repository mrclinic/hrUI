import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BloodGroupComponent } from './bloodgroup/bloodgroup.component';

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
        }

    ])],
    exports: [RouterModule]
})
export class ConstantsRoutingModule { }
