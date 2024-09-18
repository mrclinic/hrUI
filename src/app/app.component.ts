import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
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
