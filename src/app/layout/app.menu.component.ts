import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { AuthServiceService } from '../demo/service/common/auth-service.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService, private authServiceService: AuthServiceService) { }

    ngOnInit() {
        this.model = [
            /* {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
           , visible: this.authServiceService.checkPermission('UserManagment_Role_GetRoles')}, */
            {
                label: 'الذاتية',
                items: [
                    { label: 'الموظفين', icon: 'pi pi-fw pi-home', routerLink: ['/employees/employees'] }
                ]
                , visible: this.authServiceService.checkPermission('HR_Person_GetPersonsInfo')
            },
            {
                label: 'إدارة المستخدمين',
                items: [
                    {
                        label: 'الصلاحيات', icon: 'pi pi-fw pi-home', routerLink: ['/mgt/permissions']
                        , visible: this.authServiceService.checkPermission('UserManagment_Permission_GetPermissions')
                    },
                    {
                        label: 'المستخدمين', icon: 'pi pi-fw pi-home', routerLink: ['/mgt/users']
                        , visible: this.authServiceService.checkPermission('UserManagment_User_GetUsersInfo')
                    },
                    {
                        label: 'الأدوار', icon: 'pi pi-fw pi-home', routerLink: ['/mgt/roles']
                        , visible: this.authServiceService.checkPermission('UserManagment_Role_GetRoles')
                    }

                ],
                visible: this.authServiceService.checkPermissions(['UserManagment_Permission_GetPermissions', 'UserManagment_User_GetUsersInfo', 'UserManagment_Role_GetRoles'])
            },

            {
                label: 'إدارة الثوابت',
                items: [
                    {
                        label: 'المديريات', icon: 'pi pi-fw pi-home', routerLink: ['/constants/department-tree'],
                        visible: this.authServiceService.checkPermission('HR_OrgDepartment_GetOrgDepartments')
                    },
                    {
                        label: 'الزمر الدموية', icon: 'pi pi-fw pi-home', routerLink: ['/constants/blood-group'],
                        visible: this.authServiceService.checkPermission('HR_BloodGroup_GetBloodGroups')
                    },
                    {
                        label: 'الفروع', icon: 'pi pi-fw pi-home', routerLink: ['/constants/branch'],
                        visible: this.authServiceService.checkPermission('HR_Branch_GetBranchsInfo')
                    },
                    {
                        label: 'حالات الطفل', icon: 'pi pi-fw pi-home', routerLink: ['/constants/child-status'],
                        visible: this.authServiceService.checkPermission('HR_ChildStatus_GetChildStatuss')
                    },
                    {
                        label: 'المدن', icon: 'pi pi-fw pi-home', routerLink: ['/constants/city'],
                        visible: this.authServiceService.checkPermission('HR_City_GetCitys')
                    },
                    {
                        label: 'البلدان', icon: 'pi pi-fw pi-home', routerLink: ['/constants/country'],
                        visible: this.authServiceService.checkPermission('HR_Country_GetCountrys')
                    },
                    {
                        label: 'جهات المنح', icon: 'pi pi-fw pi-home', routerLink: ['/constants/degrees-authority'],
                        visible: this.authServiceService.checkPermission('HR_DegreesAuthority_GetDegreesAuthoritys')
                    },
                    {
                        label: 'أهداف الايفاد', icon: 'pi pi-fw pi-home', routerLink: ['/constants/deputation-objective'],
                        visible: this.authServiceService.checkPermission('HR_DeputationObjective_GetDeputationObjectives')
                    },
                    {
                        label: 'أوضاع الإيفاد وتغيراته', icon: 'pi pi-fw pi-home', routerLink: ['/constants/deputation-status'],
                        visible: this.authServiceService.checkPermission('HR_DeputationStatus_GetDeputationStatuss')
                    },
                    {
                        label: 'أنواع الإيفاد', icon: 'pi pi-fw pi-home', routerLink: ['/constants/deputation-type'],
                        visible: this.authServiceService.checkPermission('HR_DeputationType_GetDeputationTypes')
                    },
                    {
                        label: 'أنواع الإعاقات', icon: 'pi pi-fw pi-home', routerLink: ['/constants/disability-type'],
                        visible: this.authServiceService.checkPermission('HR_DisabilityType_GetDisabilityTypes')
                    },
                    {
                        label: 'أنواع الأوضاع الوظيفية', icon: 'pi pi-fw pi-home', routerLink: ['/constants/employment-status-type'],
                        visible: this.authServiceService.checkPermission('HR_EmploymentStatusType_GetEmploymentStatusTypes')
                    },
                    {
                        label: 'درجات التقييم', icon: 'pi pi-fw pi-home', routerLink: ['/constants/evaluation-grade'],
                        visible: this.authServiceService.checkPermission('HR_EvaluationGrade_GetEvaluationGrades')
                    },
                    {
                        label: 'أرباع التقييمات', icon: 'pi pi-fw pi-home', routerLink: ['/constants/evaluation-quarter'],
                        visible: this.authServiceService.checkPermission('HR_EvaluationQuarter_GetEvaluationQuarters')
                    },
                    {
                        label: 'أنواع الخبرة', icon: 'pi pi-fw pi-home', routerLink: ['/constants/experience-type'],
                        visible: this.authServiceService.checkPermission('HR_ExperienceType_GetExperienceTypes')
                    },
                    {
                        label: 'الانعكاسات المالية', icon: 'pi pi-fw pi-home', routerLink: ['/constants/financial-impact'],
                        visible: this.authServiceService.checkPermission('HR_FinancialImpact_GetFinancialImpacts')
                    },
                    {
                        label: 'أنواع المؤشرات المالية', icon: 'pi pi-fw pi-home', routerLink: ['/constants/financial-indicator-type'],
                        visible: this.authServiceService.checkPermission('HR_FinancialIndicatorType_GetFinancialIndicatorTypes')
                    },
                    {
                        label: 'أنواع الإجازات الإضطرارية', icon: 'pi pi-fw pi-home', routerLink: ['/constants/forced-vacation-type'],
                        visible: this.authServiceService.checkPermission('HR_ForcedVacationType_GetForcedVacationTypes')
                    },
                    {
                        label: 'الأجناس', icon: 'pi pi-fw pi-home', routerLink: ['/constants/gender'],
                        visible: this.authServiceService.checkPermission('HR_Gender_GetGenders')
                    },
                    {
                        label: 'الحالات الصحية', icon: 'pi pi-fw pi-home', routerLink: ['/constants/healthy-status'],
                        visible: this.authServiceService.checkPermission('HR_HealthyStatus_GetHealthyStatuss')
                    },
                    {
                        label: 'أنظمة التأمين الصحي', icon: 'pi pi-fw pi-home', routerLink: ['/constants/insurance-system'],
                        visible: this.authServiceService.checkPermission('HR_InsuranceSystem_GetInsuranceSystems')
                    },
                    {
                        label: 'الفئات', icon: 'pi pi-fw pi-home', routerLink: ['/constants/job-category'],
                        visible: this.authServiceService.checkPermission('HR_JobCategory_GetJobCategorys')
                    },
                    {
                        label: 'أسباب تبديل العمل', icon: 'pi pi-fw pi-home', routerLink: ['/constants/job-change-reason'],
                        visible: this.authServiceService.checkPermission('HR_JobChangeReason_GetJobChangeReasons')
                    },
                    {
                        label: 'المسميات الوظيفية', icon: 'pi pi-fw pi-home', routerLink: ['/constants/job-title'],
                        visible: this.authServiceService.checkPermission('HR_JobTitle_GetJobTitles')
                    },
                    {
                        label: 'اللغات', icon: 'pi pi-fw pi-home', routerLink: ['/constants/language'],
                        visible: this.authServiceService.checkPermission('HR_Language_GetLanguages')
                    },
                    {
                        label: 'مستويات اللغة', icon: 'pi pi-fw pi-home', routerLink: ['/constants/language-level'],
                        visible: this.authServiceService.checkPermission('HR_LanguageLevel_GetLanguageLevels')
                    },
                    {
                        label: 'القوانين', icon: 'pi pi-fw pi-home', routerLink: ['/constants/law'],
                        visible: this.authServiceService.checkPermission('HR_Law_GetLaws')
                    },
                    {
                        label: 'الأوضاع العائلية', icon: 'pi pi-fw pi-home', routerLink: ['/constants/marital-status'],
                        visible: this.authServiceService.checkPermission('HR_MaritalStatus_GetMaritalStatuss')
                    },
                    {
                        label: 'الرتب العسكرية', icon: 'pi pi-fw pi-home', routerLink: ['/constants/military-rank'],
                        visible: this.authServiceService.checkPermission('HR_MilitaryRank_GetMilitaryRanks')
                    },
                    {
                        label: 'التخصصات العسكرية', icon: 'pi pi-fw pi-home', routerLink: ['/constants/military-specialization'],
                        visible: this.authServiceService.checkPermission('HR_MilitarySpecialization_GetMilitarySpecializations')
                    },
                    {
                        label: 'أنواع صكوك التعيين المعدل', icon: 'pi pi-fw pi-home', routerLink: ['/constants/modification-contract-type'],
                        visible: this.authServiceService.checkPermission('HR_ModificationContractType_GetModificationContractTypes')
                    },
                    {
                        label: 'الجنسيات', icon: 'pi pi-fw pi-home', routerLink: ['/constants/nationality'],
                        visible: this.authServiceService.checkPermission('HR_Nationality_GetNationalitys')
                    },
                    {
                        label: 'أنواع الواقعات في الزواجات', icon: 'pi pi-fw pi-home', routerLink: ['/constants/occurrence-partner-type'],
                        visible: this.authServiceService.checkPermission('HR_OccurrencePartnerType_GetOccurrencePartnerTypes')
                    },
                    {
                        label: 'نسب الترقية', icon: 'pi pi-fw pi-home', routerLink: ['/constants/promotion-percentage'],
                        visible: this.authServiceService.checkPermission('HR_PromotionPercentage_GetPromotionPercentages')
                    },
                    {
                        label: 'أنواع العقوبات', icon: 'pi pi-fw pi-home', routerLink: ['/constants/punishment-type'],
                        visible: this.authServiceService.checkPermission('HR_PunishmentType_GetPunishmentTypes')
                    },
                    {
                        label: 'المؤهلات العلمية', icon: 'pi pi-fw pi-home', routerLink: ['/constants/qualification'],
                        visible: this.authServiceService.checkPermission('HR_Qualification_GetQualifications')
                    },
                    {
                        label: 'أسباب الترك', icon: 'pi pi-fw pi-home', routerLink: ['/constants/relinquishment-reason'],
                        visible: this.authServiceService.checkPermission('HR_RelinquishmentReason_GetRelinquishmentReasons')
                    },
                    {
                        label: 'أنواع المكافآت', icon: 'pi pi-fw pi-home', routerLink: ['/constants/reward-type'],
                        visible: this.authServiceService.checkPermission('HR_RewardType_GetRewardTypes')
                    },
                    {
                        label: 'الاختصاصات العلمية', icon: 'pi pi-fw pi-home', routerLink: ['/constants/specialization'],
                        visible: this.authServiceService.checkPermission('HR_Specialization_GetSpecializations')
                    },
                    {
                        label: 'أنواع البدء', icon: 'pi pi-fw pi-home', routerLink: ['/constants/starting-type'],
                        visible: this.authServiceService.checkPermission('HR_StartingType_GetStartingTypes')
                    },
                    {
                        label: 'أسباب الطرد', icon: 'pi pi-fw pi-home', routerLink: ['/constants/termination-reason'],
                        visible: this.authServiceService.checkPermission('HR_TerminationReason_GetTerminationReasons')
                    },
                    {
                        label: 'الجامعات', icon: 'pi pi-fw pi-home', routerLink: ['/constants/university'],
                        visible: this.authServiceService.checkPermission('HR_University_GetUniversitys')
                    },
                    {
                        label: 'أنواع الإجازات', icon: 'pi pi-fw pi-home', routerLink: ['/constants/vacation-type'],
                        visible: this.authServiceService.checkPermission('HR_VacationType_GetVacationTypes')
                    },
                    {
                        label: 'أنواع الوثائق', icon: 'pi pi-fw pi-home', routerLink: ['/constants/doc-type'],
                        visible: this.authServiceService.checkPermission('HR_DocType_GetDocTypes')
                    }

                ]
                , visible: this.authServiceService.checkPermissions(['HR_OrgDepartment_GetOrgDepartments', 'HR_BloodGroup_GetBloodGroups',
                    'HR_Branch_GetBranchsInfo', 'HR_ChildStatus_GetChildStatuss', 'HR_City_GetCitys', 'HR_Country_GetCountrys',
                    'HR_DegreesAuthority_GetDegreesAuthoritys', 'HR_DeputationObjective_GetDeputationObjectives',
                    'HR_DeputationStatus_GetDeputationStatuss', 'HR_DeputationType_GetDeputationTypes', 'HR_DisabilityType_GetDisabilityTypes',
                    'HR_EmploymentStatusType_GetEmploymentStatusTypes', 'HR_EvaluationGrade_GetEvaluationGrades', 'HR_EvaluationQuarter_GetEvaluationQuarters',
                    'HR_ExperienceType_GetExperienceTypes', 'HR_FinancialImpact_GetFinancialImpacts', 'HR_FinancialIndicatorType_GetFinancialIndicatorTypes',
                    'HR_ForcedVacationType_GetForcedVacationTypes', 'HR_Gender_GetGenders', 'HR_HealthyStatus_GetHealthyStatuss',
                    'HR_InsuranceSystem_GetInsuranceSystems', 'HR_JobCategory_GetJobCategorys', 'HR_JobChangeReason_GetJobChangeReasons',
                    'HR_JobTitle_GetJobTitles', 'HR_Language_GetLanguages', 'HR_LanguageLevel_GetLanguageLevels', 'HR_Law_GetLaws',
                    'HR_MaritalStatus_GetMaritalStatuss', 'HR_MilitaryRank_GetMilitaryRanks', 'HR_MilitarySpecialization_GetMilitarySpecializations',
                    'HR_ModificationContractType_GetModificationContractTypes', 'HR_Nationality_GetNationalitys',
                    'HR_OccurrencePartnerType_GetOccurrencePartnerTypes', 'HR_PromotionPercentage_GetPromotionPercentages',
                    'HR_PunishmentType_GetPunishmentTypes', 'HR_Qualification_GetQualifications', 'HR_RelinquishmentReason_GetRelinquishmentReasons',
                    'HR_RewardType_GetRewardTypes', 'HR_Specialization_GetSpecializations', 'HR_StartingType_GetStartingTypes',
                    'HR_TerminationReason_GetTerminationReasons', 'HR_University_GetUniversitys', 'HR_VacationType_GetVacationTypes',
                    'HR_DocType_GetDocTypes'
                ])
            },
            /* {
                label: 'UI Components',
                items: [
                    { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'], visible: this.authServiceService.checkPermission('UserManagment_Role_GetRoles')},
                    { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'], visible: this.authServiceService.checkPermission('UserManagment_Role_GetRoles')},
                    { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel'], visible: this.authServiceService.checkPermission('UserManagment_Role_GetRoles')},
                    { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'], visible: this.authServiceService.checkPermission('UserManagment_Role_GetRoles')},
                    { label: 'Button', icon: 'pi pi-fw pi-box', routerLink: ['/uikit/button'], visible: this.authServiceService.checkPermission('UserManagment_Role_GetRoles')},
                    { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'], visible: this.authServiceService.checkPermission('UserManagment_Role_GetRoles')},
                    { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'], visible: this.authServiceService.checkPermission('UserManagment_Role_GetRoles')},
                    { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'], visible: this.authServiceService.checkPermission('UserManagment_Role_GetRoles')},
                    { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'], visible: this.authServiceService.checkPermission('UserManagment_Role_GetRoles')},
                    { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'], visible: this.authServiceService.checkPermission('UserManagment_Role_GetRoles')},
                    { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'], visible: this.authServiceService.checkPermission('UserManagment_Role_GetRoles')},
                    { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' }, visible: this.authServiceService.checkPermission('UserManagment_Role_GetRoles')},
                    { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'], visible: this.authServiceService.checkPermission('UserManagment_Role_GetRoles')},
                    { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'], visible: this.authServiceService.checkPermission('UserManagment_Role_GetRoles')},
                    { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'], visible: this.authServiceService.checkPermission('UserManagment_Role_GetRoles')},
                    { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/uikit/misc'] }
                ]
           , visible: this.authServiceService.checkPermission('UserManagment_Role_GetRoles')},
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Landing',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['/landing']
                   , visible: this.authServiceService.checkPermission('UserManagment_Role_GetRoles')},
                    {
                        label: 'Auth',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Login',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login']
                           , visible: this.authServiceService.checkPermission('UserManagment_Role_GetRoles')},
                            {
                                label: 'Error',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/auth/error']
                           , visible: this.authServiceService.checkPermission('UserManagment_Role_GetRoles')},
                            {
                                label: 'Access Denied',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/auth/access']
                            }
                        ]
                   , visible: this.authServiceService.checkPermission('UserManagment_Role_GetRoles')},
                    {
                        label: 'Crud',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/pages/crud']
                   , visible: this.authServiceService.checkPermission('UserManagment_Role_GetRoles')},
                    {
                        label: 'Timeline',
                        icon: 'pi pi-fw pi-calendar',
                        routerLink: ['/pages/timeline']
                   , visible: this.authServiceService.checkPermission('UserManagment_Role_GetRoles')},
                    {
                        label: 'Not Found',
                        icon: 'pi pi-fw pi-exclamation-circle',
                        routerLink: ['/notfound']
                   , visible: this.authServiceService.checkPermission('UserManagment_Role_GetRoles')},
                    {
                        label: 'Empty',
                        icon: 'pi pi-fw pi-circle-off',
                        routerLink: ['/pages/empty']
                   , visible: this.authServiceService.checkPermission('UserManagment_Role_GetRoles')},
                ]
           , visible: this.authServiceService.checkPermission('UserManagment_Role_GetRoles')},
            {
                label: 'Hierarchy',
                items: [
                    {
                        label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark', visible: this.authServiceService.checkPermission('UserManagment_Role_GetRoles')},
                                    { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark', visible: this.authServiceService.checkPermission('UserManagment_Role_GetRoles')},
                                    { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark', visible: this.authServiceService.checkPermission('UserManagment_Role_GetRoles')},
                                ]
                           , visible: this.authServiceService.checkPermission('UserManagment_Role_GetRoles')},
                            {
                                label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }
                                ]
                           , visible: this.authServiceService.checkPermission('UserManagment_Role_GetRoles')},
                        ]
                   , visible: this.authServiceService.checkPermission('UserManagment_Role_GetRoles')},
                    {
                        label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark', visible: this.authServiceService.checkPermission('UserManagment_Role_GetRoles')},
                                    { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark', visible: this.authServiceService.checkPermission('UserManagment_Role_GetRoles')},
                                ]
                           , visible: this.authServiceService.checkPermission('UserManagment_Role_GetRoles')},
                            {
                                label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark', visible: this.authServiceService.checkPermission('UserManagment_Role_GetRoles')},
                                ]
                           , visible: this.authServiceService.checkPermission('UserManagment_Role_GetRoles')},
                        ]
                    }
                ]
            } */
        ];
    }
}
