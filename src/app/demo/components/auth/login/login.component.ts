import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { UserActions } from 'src/app/demo/stateManagement/actions/user.action';
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
    logInForm: FormGroup;
    ERROR: string = '';

    constructor(public layoutService: LayoutService, private fb: FormBuilder, private store: Store, private router: Router,
        private zone: NgZone, private messageService: MessageService) {
        this.logInForm = this.fb.group({
            username: new FormControl('', [Validators.required, Validators.maxLength(100)]),
            password: new FormControl('', [Validators.required, Validators.maxLength(100)])
        });
    }
    ngOnInit(): void {

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
                        const link = ['/mgt'];
                        this.zone.run(() => {
                            this.router.navigate(link);
                        });
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
