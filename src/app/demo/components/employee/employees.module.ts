import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from 'src/primeng/primeng.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { EmpAppointmentStatusComponent } from './empappointmentstatusdto/empappointmentstatus.component';
import { EmployeesRoutingModule } from './employees-routing.module';

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
    declarations: [EmpAppointmentStatusComponent
    ]
})
export class EmployeesModule { }
// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http);
}
