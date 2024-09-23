import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            /* {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            }, */
            {
                label: 'إدارة المستخدمين',
                items: [
                    { label: 'الصلاحيات', icon: 'pi pi-fw pi-home', routerLink: ['/mgt/permissions'] },
                    { label: 'المستخدمين', icon: 'pi pi-fw pi-home', routerLink: ['/mgt/users'] },
                    { label: 'الأدوار', icon: 'pi pi-fw pi-home', routerLink: ['/mgt/roles'] },
                    //{ label: 'user Profiles', icon: 'pi pi-fw pi-home', routerLink: ['/mgt/userProfiles'] }

                ]
            },

            {
                label: 'إدارة الثوابت',
                items: [
                    { label: 'الزمر الدموية', icon: 'pi pi-fw pi-home', routerLink: ['/constants/blood-group'] },
                    { label: 'الفروع', icon: 'pi pi-fw pi-home', routerLink: ['/constants/branch'] },
                    { label: 'حالات الطفل', icon: 'pi pi-fw pi-home', routerLink: ['/constants/child-status'] },
                    { label: 'المدن', icon: 'pi pi-fw pi-home', routerLink: ['/constants/city'] },
                    { label: 'البلدان', icon: 'pi pi-fw pi-home', routerLink: ['/constants/country'] },
                    { label: 'جهات المنح', icon: 'pi pi-fw pi-home', routerLink: ['/constants/degrees-authority'] },
                    { label: 'الجهات المصدرة', icon: 'pi pi-fw pi-home', routerLink: ['/constants/department'] },
                    { label: 'أهداف الايفاد', icon: 'pi pi-fw pi-home', routerLink: ['/constants/deputation-objective'] },
                    { label: 'أوضاع الإيفاد وتغيراته', icon: 'pi pi-fw pi-home', routerLink: ['/constants/deputation-status'] },
                    { label: 'أنواع الإيفاد', icon: 'pi pi-fw pi-home', routerLink: ['/constants/deputation-type'] },
                    { label: 'أنواع الإعاقات', icon: 'pi pi-fw pi-home', routerLink: ['/constants/disability-type'] },
                    { label: 'أنواع الأوضاع الوظيفية', icon: 'pi pi-fw pi-home', routerLink: ['/constants/employment-status-type'] },
                    { label: 'درجات التقييم', icon: 'pi pi-fw pi-home', routerLink: ['/constants/evaluation-grade'] },
                    { label: 'أرباع التقييمات', icon: 'pi pi-fw pi-home', routerLink: ['/constants/evaluation-quarter'] },
                    { label: 'أنواع الخبرة', icon: 'pi pi-fw pi-home', routerLink: ['/constants/experience-type'] },
                    { label: 'الانعكاسات المالية', icon: 'pi pi-fw pi-home', routerLink: ['/constants/financial-impact'] },
                    { label: 'أنواع المؤشرات المالية', icon: 'pi pi-fw pi-home', routerLink: ['/constants/financial-indicator-type'] },
                    { label: 'أنواع الإجازات الإضطرارية', icon: 'pi pi-fw pi-home', routerLink: ['/constants/forced-vacation-type'] },
                    { label: 'الأجناس', icon: 'pi pi-fw pi-home', routerLink: ['/constants/gender'] },
                    { label: 'الحالات الصحية', icon: 'pi pi-fw pi-home', routerLink: ['/constants/healthy-status'] },
                    { label: 'أنظمة التأمين الصحي', icon: 'pi pi-fw pi-home', routerLink: ['/constants/insurance-system'] },
                    { label: 'الفئات', icon: 'pi pi-fw pi-home', routerLink: ['/constants/job-category'] },
                    { label: 'أسباب تبديل العمل', icon: 'pi pi-fw pi-home', routerLink: ['/constants/job-change-reason'] },
                    { label: 'المسميات الوظيفية', icon: 'pi pi-fw pi-home', routerLink: ['/constants/job-title'] },
                    { label: 'اللغات', icon: 'pi pi-fw pi-home', routerLink: ['/constants/language'] },
                    { label: 'مستويات اللغة', icon: 'pi pi-fw pi-home', routerLink: ['/constants/language-level'] },
                    { label: 'القوانين', icon: 'pi pi-fw pi-home', routerLink: ['/constants/law'] },
                    { label: 'الأوضاع العائلية', icon: 'pi pi-fw pi-home', routerLink: ['/constants/marital-status'] },
                    { label: 'الرتب العسكرية', icon: 'pi pi-fw pi-home', routerLink: ['/constants/military-rank'] },
                    { label: 'التخصصات العسكرية', icon: 'pi pi-fw pi-home', routerLink: ['/constants/military-specialization'] },
                    { label: 'أنواع صكوك التعيين المعدل', icon: 'pi pi-fw pi-home', routerLink: ['/constants/modification-contract-type'] },
                    { label: 'الجنسيات', icon: 'pi pi-fw pi-home', routerLink: ['/constants/nationality'] },
                    { label: 'أنواع الواقعات في الزواجات', icon: 'pi pi-fw pi-home', routerLink: ['/constants/occurrence-partner-type'] },
                    { label: 'نسب الترقية', icon: 'pi pi-fw pi-home', routerLink: ['/constants/promotion-percentage'] },
                    { label: 'أنواع العقوبات', icon: 'pi pi-fw pi-home', routerLink: ['/constants/punishment-type'] },
                    { label: 'المؤهلات العلمية', icon: 'pi pi-fw pi-home', routerLink: ['/constants/qualification'] },
                    { label: 'أسباب الترك', icon: 'pi pi-fw pi-home', routerLink: ['/constants/relinquishment-reason'] },
                    { label: 'أنواع المكافآت', icon: 'pi pi-fw pi-home', routerLink: ['/constants/reward-type'] },
                    { label: 'الاختصاصات العلمية', icon: 'pi pi-fw pi-home', routerLink: ['/constants/specialization'] },
                    { label: 'أنواع البدء', icon: 'pi pi-fw pi-home', routerLink: ['/constants/starting-type'] },
                    { label: 'الفعاليات الفرعية', icon: 'pi pi-fw pi-home', routerLink: ['/constants/sub-department'] },
                    { label: 'أسباب الطرد', icon: 'pi pi-fw pi-home', routerLink: ['/constants/termination-reason'] },
                    { label: 'الجامعات', icon: 'pi pi-fw pi-home', routerLink: ['/constants/university'] },
                    { label: 'أنواع الإجازات', icon: 'pi pi-fw pi-home', routerLink: ['/constants/vacation-type'] }

                ]
            },
            /* {
                label: 'UI Components',
                items: [
                    { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
                    { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
                    { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel'] },
                    { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },
                    { label: 'Button', icon: 'pi pi-fw pi-box', routerLink: ['/uikit/button'] },
                    { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
                    { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
                    { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'] },
                    { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
                    { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
                    { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
                    { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },
                    { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'] },
                    { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] },
                    { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
                    { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/uikit/misc'] }
                ]
            },
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Landing',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['/landing']
                    },
                    {
                        label: 'Auth',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Login',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Error',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: 'Access Denied',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/auth/access']
                            }
                        ]
                    },
                    {
                        label: 'Crud',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/pages/crud']
                    },
                    {
                        label: 'Timeline',
                        icon: 'pi pi-fw pi-calendar',
                        routerLink: ['/pages/timeline']
                    },
                    {
                        label: 'Not Found',
                        icon: 'pi pi-fw pi-exclamation-circle',
                        routerLink: ['/notfound']
                    },
                    {
                        label: 'Empty',
                        icon: 'pi pi-fw pi-circle-off',
                        routerLink: ['/pages/empty']
                    },
                ]
            },
            {
                label: 'Hierarchy',
                items: [
                    {
                        label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                                    { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                                    { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
                                ]
                            },
                            {
                                label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }
                                ]
                            },
                        ]
                    },
                    {
                        label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
                                    { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
                                ]
                            },
                            {
                                label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' },
                                ]
                            },
                        ]
                    }
                ]
            } */
        ];
    }
}
