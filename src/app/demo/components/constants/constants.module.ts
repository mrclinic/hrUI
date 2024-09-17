import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from 'src/primeng/primeng.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BloodGroupComponent } from './bloodgroup/bloodgroup.component';
import { ConstantsRoutingModule } from './constants-routing.module';

@NgModule({
    imports: [
        CommonModule,
        ConstantsRoutingModule,
        PrimengModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: httpTranslateLoader,
                deps: [HttpClient]
            }
        })
    ],
    declarations: [BloodGroupComponent
    ]
})
export class ConstantsModule { }
// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http);
}
