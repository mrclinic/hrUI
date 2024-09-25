import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { EmpAppointmentStatusComponent } from './empappointmentstatusdto/empappointmentstatus.component';

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: 'emp-appointment-status',
            component: EmpAppointmentStatusComponent,
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
