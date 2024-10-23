import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Select } from '@ngxs/store';
import { PrimeNGConfig } from 'primeng/api';
import { SpinnerState } from './demo/stateManagement/userManagment/states/SpinnerState';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    @Select(SpinnerState) loading: Observable<boolean>;

    constructor(private primengConfig: PrimeNGConfig, private translate: TranslateService) {
        this.translate.addLangs(['ar', 'en']);
        this.translate.setDefaultLang('ar');
        this.translate.use('ar');
    }

    ngOnInit() {
        this.primengConfig.ripple = true;
    }
    changeLanguage(lang: string) {
        this.translate.use(lang);
    }
}
