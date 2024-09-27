import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PrimengModule } from 'src/primeng/primeng.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { EmpAppointmentStatusComponent } from './empappointmentstatus/empappointmentstatus.component';
import { EmployeesRoutingModule } from './employees-routing.module';
import { PersonComponent } from './person/person.component';
import { PersonPrfileComponent } from './person-profile/person-profile.component';
import { EmpAssignmentComponent } from './empassignment/empassignment.component';
import { EmpChildComponent } from './empchild/empchild.component';
import { EmpDeputationComponent } from './empdeputation/empdeputation.component';
import { EmpEmploymentChangeComponent } from './empemploymentchange/empemploymentchange.component';
import { EmpEmploymentStatusComponent } from './empemploymentstatus/empemploymentstatus.component';
import { EmpExperienceComponent } from './empexperience/empexperience.component';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        EmployeesRoutingModule,
        PrimengModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: httpTranslateLoader,
                deps: [HttpClient]
            }
        })
    ],
    declarations: [EmpAppointmentStatusComponent, PersonComponent, PersonPrfileComponent,
        EmpAssignmentComponent, EmpChildComponent, EmpDeputationComponent, EmpEmploymentChangeComponent
        , EmpEmploymentStatusComponent, EmpExperienceComponent
    ],
    providers: [DatePipe]
})
export class EmployeesModule { }
// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http);
}
