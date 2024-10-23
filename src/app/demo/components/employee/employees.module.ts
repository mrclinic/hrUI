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
import { EmpLanguageComponent } from './emplanguage/emplanguage.component';
import { EmpMilitaryServiceComponent } from './empmilitaryservice/empmilitaryservice.component';
import { EmpMilitaryServiceCohortComponent } from './empmilitaryservicecohort/empmilitaryservicecohort.component';
import { EmpMilitaryServiceSuspensionComponent } from './empmilitaryservicesuspension/empmilitaryservicesuspension.component';
import { EmpPromotionComponent } from './emppromotion/emppromotion.component';
import { EmpPartnerComponent } from './emppartner/emppartner.component';
import { EmpPerformanceEvaluationComponent } from './empperformanceevaluation/empperformanceevaluation.component';
import { EmpPunishmentComponent } from './emppunishment/emppunishment.component';
import { EmpQualificationComponent } from './empqualification/empqualification.component';
import { EmpRelinquishmentComponent } from './emprelinquishment/emprelinquishment.component';
import { EmpRewardComponent } from './empreward/empreward.component';
import { EmpTrainingCourseComponent } from './emptrainingcourse/emptrainingcourse.component';
import { EmpVacationComponent } from './empvacation/empvacation.component';
import { EmpWorkInjuryComponent } from './empworkinjury/empworkinjury.component';
import { EmpWorkPlaceComponent } from './empworkplace/empworkplace.component';
import { EmpDocsComponent } from './empdocs/empdocs.component';

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
        , EmpEmploymentStatusComponent, EmpExperienceComponent, EmpLanguageComponent,
        EmpMilitaryServiceComponent, EmpMilitaryServiceCohortComponent,
        EmpMilitaryServiceSuspensionComponent, EmpPartnerComponent, EmpPerformanceEvaluationComponent,
        EmpPromotionComponent, EmpPunishmentComponent, EmpQualificationComponent,
        EmpRelinquishmentComponent, EmpRewardComponent, EmpTrainingCourseComponent, EmpVacationComponent,
        EmpWorkInjuryComponent, EmpWorkPlaceComponent, EmpDocsComponent
    ],
    providers: [DatePipe]
})
export class EmployeesModule { }
// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http);
}
