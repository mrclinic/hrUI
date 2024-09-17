import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { User } from 'src/app/demo/models/userManagment/User';
import { UserActions } from 'src/app/demo/stateManagement/userManagment/actions/user.action';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent implements OnInit {
    isLoading$!: Observable<boolean>;
    logInForm: FormGroup;
    ERROR: string = '';

    constructor(public layoutService: LayoutService, private fb: FormBuilder, private store: Store, private router: Router,
        private zone: NgZone, private messageService: MessageService, private translate: TranslateService) {
        this.logInForm = fb.group({
            username: new FormControl('', [Validators.required, Validators.maxLength(100)]),
            password: new FormControl('', [Validators.required, Validators.maxLength(100)])
        });
    }
    ngOnInit(): void {
        this.isLoading$ = this.store.select<boolean>(
            (state) => state.users.isLoading
        );
        this.translate.get('AppTitle').subscribe(
            (res) => {
                this.ERROR = this.translate.instant('ERROR');
                console.log(this.ERROR, res)
            }
        )
    }
    clear() {
        this.messageService.clear();
    }
    onSubmit(form: FormGroup) {
        if (form.valid) {
            try {
                const UserName = form.get('username')?.value;
                const PassWord = form.get('password')?.value;
                this.store
                    .dispatch(new UserActions.LogIn(UserName, PassWord))
                    .subscribe(() => {
                        let error = this.store.selectSnapshot<string>(
                            (state) => state.users.LoadError
                        );
                        if (error == '') {
                            let user = this.store.selectSnapshot<User>(
                                (state) => state.users.loggedUser
                            );
                            /* if (!user?.IsActive) {
                               const link = ['activate'];
                               this.zone.run(() => {
                                   this.router.navigate(link);
                               });
                           } else { */
                            const link = ['/mgt'];
                            this.zone.run(() => {
                                this.router.navigate(link);
                            });
                            //} 
                        } else {
                            this.clear();
                            this.messageService.add({ severity: 'error', summary: this.ERROR, detail: error });
                        }
                    });
            } catch (err) {
                this.messageService.add({ severity: 'error', summary: this.ERROR, detail: err + '', life: 3000 });
            }
        }
    }
    get f() {
        return this.logInForm.controls;
    }
}
