import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BloodGroupComponent } from './bloodgroup/bloodgroup.component';
import { ChildstatusComponent } from './childstatus/childstatus.component';
import { CityComponent } from './city/city.component';
import { CountryComponent } from './country/country.component';
import { DegreesAuthorityComponent } from './degreesauthority/degreesauthority.component';
import { DepartmentComponent } from './department/department.component';
import { DeputationobjectiveComponent } from './deputationobjective/deputationobjective.component';
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
            path: 'branch',
            component: BranchComponent,
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
        },
        {
            path: 'department',
            component: DepartmentComponent,
            data: {
                ogTitle: environment.ogTitle,
                ogDescription: environment.ogDescription,
                ogImage: environment.appUrl + environment.ogImage
            }
        }
        ,
        {
            path: 'deputation-objective',
            component: DeputationobjectiveComponent,
            data: {
                ogTitle: environment.ogTitle,
                ogDescription: environment.ogDescription,
                ogImage: environment.appUrl + environment.ogImage
            }
        },
        {
            path: 'deputation-status',
            component: DeputationStatusComponent,
            data: {
                ogTitle: environment.ogTitle,
                ogDescription: environment.ogDescription,
                ogImage: environment.appUrl + environment.ogImage
            }
        }
        ,
        {
            path: 'deputation-type',
            component: DeputationTypeComponent,
            data: {
                ogTitle: environment.ogTitle,
                ogDescription: environment.ogDescription,
                ogImage: environment.appUrl + environment.ogImage
            }
        }
        ,
        {
            path: 'disability-type',
            component: DisabilityTypeComponent,
            data: {
                ogTitle: environment.ogTitle,
                ogDescription: environment.ogDescription,
                ogImage: environment.appUrl + environment.ogImage
            }
        }
        ,
        {
            path: 'employment-status-type',
            component: EmploymentStatusTypeComponent,
            data: {
                ogTitle: environment.ogTitle,
                ogDescription: environment.ogDescription,
                ogImage: environment.appUrl + environment.ogImage
            }
        }
        ,
        {
            path: 'evaluation-grade',
            component: EvaluationGradeComponent,
            data: {
                ogTitle: environment.ogTitle,
                ogDescription: environment.ogDescription,
                ogImage: environment.appUrl + environment.ogImage
            }
        },
        {
            path: 'evaluation-quarter',
            component: EvaluationQuarterComponent,
            data: {
                ogTitle: environment.ogTitle,
                ogDescription: environment.ogDescription,
                ogImage: environment.appUrl + environment.ogImage
            }
        }
        ,
        {
            path: 'experience-type',
            component: ExperienceTypeComponent,
            data: {
                ogTitle: environment.ogTitle,
                ogDescription: environment.ogDescription,
                ogImage: environment.appUrl + environment.ogImage
            }
        },
        {
            path: 'financial-impact',
            component: FinancialImpactComponent,
            data: {
                ogTitle: environment.ogTitle,
                ogDescription: environment.ogDescription,
                ogImage: environment.appUrl + environment.ogImage
            }
        },
        {
            path: 'financial-indicator-type',
            component: FinancialIndicatorTypeComponent,
            data: {
                ogTitle: environment.ogTitle,
                ogDescription: environment.ogDescription,
                ogImage: environment.appUrl + environment.ogImage
            }
        },
        {
            path: 'forced-vacation-type',
            component: ForcedVacationTypeComponent,
            data: {
                ogTitle: environment.ogTitle,
                ogDescription: environment.ogDescription,
                ogImage: environment.appUrl + environment.ogImage
            }
        },
        {
            path: 'gender',
            component: GenderComponent,
            data: {
                ogTitle: environment.ogTitle,
                ogDescription: environment.ogDescription,
                ogImage: environment.appUrl + environment.ogImage
            }
        },
        {
            path: 'healthy-status',
            component: HealthyStatusComponent,
            data: {
                ogTitle: environment.ogTitle,
                ogDescription: environment.ogDescription,
                ogImage: environment.appUrl + environment.ogImage
            }
        },
        {
            path: 'insurance-system',
            component: InsuranceSystemComponent,
            data: {
                ogTitle: environment.ogTitle,
                ogDescription: environment.ogDescription,
                ogImage: environment.appUrl + environment.ogImage
            }
        },
        {
            path: 'job-category',
            component: JobCategoryComponent,
            data: {
                ogTitle: environment.ogTitle,
                ogDescription: environment.ogDescription,
                ogImage: environment.appUrl + environment.ogImage
            }
        },
        {
            path: 'job-change-reason',
            component: JobChangeReasonComponent,
            data: {
                ogTitle: environment.ogTitle,
                ogDescription: environment.ogDescription,
                ogImage: environment.appUrl + environment.ogImage
            }
        },
        {
            path: 'job-title',
            component: JobTitleComponent,
            data: {
                ogTitle: environment.ogTitle,
                ogDescription: environment.ogDescription,
                ogImage: environment.appUrl + environment.ogImage
            }
        },
        {
            path: 'language',
            component: LanguageComponent,
            data: {
                ogTitle: environment.ogTitle,
                ogDescription: environment.ogDescription,
                ogImage: environment.appUrl + environment.ogImage
            }
        },
        {
            path: 'language-level',
            component: LanguageLevelComponent,
            data: {
                ogTitle: environment.ogTitle,
                ogDescription: environment.ogDescription,
                ogImage: environment.appUrl + environment.ogImage
            }
        },
        {
            path: 'law',
            component: LawComponent,
            data: {
                ogTitle: environment.ogTitle,
                ogDescription: environment.ogDescription,
                ogImage: environment.appUrl + environment.ogImage
            }
        },
        {
            path: 'marital-status',
            component: MaritalStatusComponent,
            data: {
                ogTitle: environment.ogTitle,
                ogDescription: environment.ogDescription,
                ogImage: environment.appUrl + environment.ogImage
            }
        },
        {
            path: 'military-rank',
            component: MilitaryRankComponent,
            data: {
                ogTitle: environment.ogTitle,
                ogDescription: environment.ogDescription,
                ogImage: environment.appUrl + environment.ogImage
            }
        },
        {
            path: 'military-specialization',
            component: MilitarySpecializationComponent,
            data: {
                ogTitle: environment.ogTitle,
                ogDescription: environment.ogDescription,
                ogImage: environment.appUrl + environment.ogImage
            }
        },
        {
            path: 'modification-contract-type',
            component: ModificationContractTypeComponent,
            data: {
                ogTitle: environment.ogTitle,
                ogDescription: environment.ogDescription,
                ogImage: environment.appUrl + environment.ogImage
            }
        },
        {
            path: 'nationality',
            component: NationalityComponent,
            data: {
                ogTitle: environment.ogTitle,
                ogDescription: environment.ogDescription,
                ogImage: environment.appUrl + environment.ogImage
            }
        },
        {
            path: 'occurrence-partner-type',
            component: OccurrencePartnerTypeComponent,
            data: {
                ogTitle: environment.ogTitle,
                ogDescription: environment.ogDescription,
                ogImage: environment.appUrl + environment.ogImage
            }
        },
        {
            path: 'promotion-percentage',
            component: PromotionPercentageComponent,
            data: {
                ogTitle: environment.ogTitle,
                ogDescription: environment.ogDescription,
                ogImage: environment.appUrl + environment.ogImage
            }
        },
        {
            path: 'punishment-type',
            component: PunishmentTypeComponent,
            data: {
                ogTitle: environment.ogTitle,
                ogDescription: environment.ogDescription,
                ogImage: environment.appUrl + environment.ogImage
            }
        },
        {
            path: 'qualification',
            component: QualificationComponent,
            data: {
                ogTitle: environment.ogTitle,
                ogDescription: environment.ogDescription,
                ogImage: environment.appUrl + environment.ogImage
            }
        },
        {
            path: 'relinquishment-reason',
            component: RelinquishmentReasonComponent,
            data: {
                ogTitle: environment.ogTitle,
                ogDescription: environment.ogDescription,
                ogImage: environment.appUrl + environment.ogImage
            }
        }

        ,
        {
            path: 'reward-type',
            component: RewardTypeComponent,
            data: {
                ogTitle: environment.ogTitle,
                ogDescription: environment.ogDescription,
                ogImage: environment.appUrl + environment.ogImage
            }
        },
        {
            path: 'specialization',
            component: SpecializationComponent,
            data: {
                ogTitle: environment.ogTitle,
                ogDescription: environment.ogDescription,
                ogImage: environment.appUrl + environment.ogImage
            }
        },
        {
            path: 'starting-type',
            component: StartingTypeComponent,
            data: {
                ogTitle: environment.ogTitle,
                ogDescription: environment.ogDescription,
                ogImage: environment.appUrl + environment.ogImage
            }
        },
        {
            path: 'sub-department',
            component: SubDepartmentComponent,
            data: {
                ogTitle: environment.ogTitle,
                ogDescription: environment.ogDescription,
                ogImage: environment.appUrl + environment.ogImage
            }
        },
        {
            path: 'termination-reason',
            component: TerminationReasonComponent,
            data: {
                ogTitle: environment.ogTitle,
                ogDescription: environment.ogDescription,
                ogImage: environment.appUrl + environment.ogImage
            }
        },
        {
            path: 'university',
            component: UniversityComponent,
            data: {
                ogTitle: environment.ogTitle,
                ogDescription: environment.ogDescription,
                ogImage: environment.appUrl + environment.ogImage
            }
        },
        {
            path: 'vacation-type',
            component: VacationTypeComponent,
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
