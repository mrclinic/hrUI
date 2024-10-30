import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { Router } from '@angular/router';
import { IFormStructure } from '../demo/shared/dynamic-form/from-structure-model';
import { APP_CONSTANTS } from '../app.contants';
import { DynamicFormComponent } from '../demo/shared/dynamic-form/dynamic-form/dynamic-form.component';
import { UserService } from '../demo/service/userManagment/user.service';
import { UnsubscribeComponent } from '../demo/shared/unsubscribe/unsubscribe.component';
import { takeUntil } from 'rxjs';
import { User } from '../demo/models/userManagment/User';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent extends UnsubscribeComponent {

    items!: MenuItem[];
    itemsProfile: MenuItem[] = [];
    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;
    formStructure: IFormStructure[] = [];
    changePWDialog: boolean = false;
    @ViewChild(DynamicFormComponent) childComponent: DynamicFormComponent;

    constructor(public layoutService: LayoutService, private router: Router,
        private zone: NgZone, private readonly userService: UserService) {
        super();
        this.intiProfileMenuItms();
        this.initFormStructure();
    }

    initFormStructure() {
        this.formStructure = [
            {
                type: 'password',
                label: APP_CONSTANTS.CurrentPassword,
                name: 'CurrentPassword',
                value: '',
                placeHolder: APP_CONSTANTS.CurrentPassword,
                validations: [
                    {
                        name: 'required',
                        validator: 'required',
                        message: APP_CONSTANTS.FIELD_REQUIRED,
                    },
                ],
            },
            {
                type: 'password',
                label: APP_CONSTANTS.NewPassword,
                name: 'NewPassword',
                value: '',
                placeHolder: APP_CONSTANTS.NewPassword,
                validations: [
                    {
                        name: 'required',
                        validator: 'required',
                        message: APP_CONSTANTS.FIELD_REQUIRED,
                    },
                ],
            }
        ];
    }

    changePW() {
        this.changePWDialog = true;
    }

    setChangePW() {
        let user = JSON.parse(localStorage.getItem('users.loggedUser') || '') as User;
        let userId = user.id || '';
        this.childComponent.dynamicForm.markAllAsTouched();
        if (this.childComponent.dynamicForm.valid) {
            this.userService.ChangePassword(userId, this.childComponent.dynamicForm.value.CurrentPassword,
                this.childComponent.dynamicForm.value.NewPassword).pipe(takeUntil(this.destroy$)).subscribe((res) => {
                    this.changePWDialog = false;
                    this.logOut();
                })
        }
    }

    hideDialog() {
        this.changePWDialog = false;
    }

    logOut() {
        localStorage.clear();
        const link = ['/auth/login'];
        this.zone.run(() => {
            this.router.navigate(link).then(() => {
                location.reload();
            });
        });
    }

    myAccount() {
        const link = ['/mgt/myProfile'];
        this.zone.run(() => {
            this.router.navigate(link);
        });
    }

    intiProfileMenuItms() {
        this.itemsProfile = [{
            items: [
                {
                    label: "معلومات حسابي",
                    icon: 'pi pi-user',
                    command: () => {
                        this.myAccount();
                    }
                },
                {
                    label: "تغيير كلمة المرور",
                    icon: 'pi pi-cog',
                    command: () => {
                        this.changePW();
                    }
                },
                {
                    label: "تسجيل خروج",
                    icon: 'pi pi-sign-out',
                    command: () => {
                        this.logOut();
                    }
                }
            ]
        }
        ];
    }
}
