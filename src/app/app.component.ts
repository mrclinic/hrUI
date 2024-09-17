import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    constructor(private primengConfig: PrimeNGConfig, public translate: TranslateService) {
        /* translate.addLangs(['en', 'fr', 'ar', "hi", "de"]);
        translate.setDefaultLang('ar');

        let browserLang: any;
        browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|fr|ar|hi|de/) ? browserLang : 'ar'); */
    }

    ngOnInit() {
        this.primengConfig.ripple = true;
    }
    changeLanguage(lang: string) {
        this.translate.use(lang);
    }
}
