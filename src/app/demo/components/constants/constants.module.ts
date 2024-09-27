import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from 'src/primeng/primeng.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BloodGroupComponent } from './bloodgroup/bloodgroup.component';
import { ConstantsRoutingModule } from './constants-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ChildStatusComponent } from './childstatus/childstatus.component';
import { CityComponent } from './city/city.component';
import { CountryComponent } from './country/country.component';
import { DegreesAuthorityComponent } from './degreesauthority/degreesauthority.component';
import { DepartmentComponent } from './department/department.component';
import { DeputationObjectiveComponent } from './deputationobjective/deputationobjective.component';
import { DeputationStatusComponent } from './deputationstatus/deputationstatus.component';
import { DeputationTypeComponent } from './deputationtype/deputationtype.component';
import { DisabilityTypeComponent } from './disabilitytype/disabilitytype.component';
import { EmploymentStatusTypeComponent } from './employmentstatustype/employmentstatustype.component';
import { EvaluationGradeComponent } from './evaluationgrade/evaluationgrade.component';
import { EvaluationQuarterComponent } from './evaluationquarter/evaluationquarter.component';
import { ExperienceTypeComponent } from './experiencetype/experiencetype.component';
import { FinancialImpactComponent } from './financialimpact/financialimpact.component';
import { FinancialIndicatorTypeComponent } from './financialindicatortype/financialindicatortype.component';
import { ForcedVacationTypeComponent } from './forcedvacationtype/forcedvacationtype.component';
import { GenderComponent } from './gender/gender.component';
import { HealthyStatusComponent } from './healthystatus/healthystatus.component';
import { InsuranceSystemComponent } from './insurancesystem/insurancesystem.component';
import { JobCategoryComponent } from './jobcategory/jobcategory.component';
import { JobChangeReasonComponent } from './jobchangereason/jobchangereason.component';
import { JobTitleComponent } from './jobtitle/jobtitle.component';
import { LanguageComponent } from './language/language.component';
import { LanguageLevelComponent } from './languagelevel/languagelevel.component';
import { LawComponent } from './law/law.component';
import { MaritalStatusComponent } from './maritalstatus/maritalstatus.component';
import { MilitaryRankComponent } from './militaryrank/militaryrank.component';
import { MilitarySpecializationComponent } from './militaryspecialization/militaryspecialization.component';
import { ModificationContractTypeComponent } from './modificationcontracttype/modificationcontracttype.component';
import { NationalityComponent } from './nationality/nationality.component';
import { OccurrencePartnerTypeComponent } from './occurrencepartnertype/occurrencepartnertype.component';
import { PromotionPercentageComponent } from './promotionpercentage/promotionpercentage.component';
import { PunishmentTypeComponent } from './punishmenttype/punishmenttype.component';
import { QualificationComponent } from './qualification/qualification.component';
import { RelinquishmentReasonComponent } from './relinquishmentreason/relinquishmentreason.component';
import { RewardTypeComponent } from './rewardtype/rewardtype.component';
import { SpecializationComponent } from './specialization/specialization.component';
import { StartingTypeComponent } from './startingtype/startingtype.component';
import { SubDepartmentComponent } from './subdepartment/subdepartment.component';
import { TerminationReasonComponent } from './terminationreason/terminationreason.component';
import { UniversityComponent } from './university/university.component';
import { VacationTypeComponent } from './vacationtype/vacationtype.component';
import { BranchComponent } from './branch/branch.component';
import { SharedModule } from '../../shared/shared.module';
import { DepartmentTreeComponent } from './department-tree/department-tree.component';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        ConstantsRoutingModule,
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
    declarations: [BloodGroupComponent, ChildStatusComponent, CityComponent, CountryComponent
        , DegreesAuthorityComponent, DepartmentComponent, DeputationObjectiveComponent, DeputationStatusComponent
        , DeputationTypeComponent, DisabilityTypeComponent,
        EmploymentStatusTypeComponent, EvaluationGradeComponent
        , EvaluationQuarterComponent, ExperienceTypeComponent,
        FinancialImpactComponent,
        FinancialIndicatorTypeComponent, ForcedVacationTypeComponent, GenderComponent
        , HealthyStatusComponent, InsuranceSystemComponent, JobCategoryComponent
        , JobChangeReasonComponent, JobTitleComponent, LanguageComponent, LanguageLevelComponent
        , LawComponent, MaritalStatusComponent, MilitaryRankComponent,
        MilitarySpecializationComponent, ModificationContractTypeComponent,
        NationalityComponent, OccurrencePartnerTypeComponent, PromotionPercentageComponent
        , PunishmentTypeComponent, QualificationComponent, RelinquishmentReasonComponent
        , RewardTypeComponent, SpecializationComponent,
        StartingTypeComponent, SubDepartmentComponent, TerminationReasonComponent
        , UniversityComponent, VacationTypeComponent, BranchComponent, DepartmentTreeComponent
    ]
})
export class ConstantsModule { }
// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http);
}
