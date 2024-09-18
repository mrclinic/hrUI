import { NgModule } from '@angular/core';
import { DatePipe, HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { NgxsModule } from '@ngxs/store';
import { UserState } from './demo/stateManagement/userManagment/states/user.state';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { environment } from 'src/environments/environment';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { JwtInterceptorInterceptor } from 'src/intercepters/jwt-interceptor.interceptor';
import { ErrorInterceptorInterceptor } from 'src/intercepters/error-interceptor.interceptor';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BaseGuard } from './demo/guards/BaseGuard';
import { DialogService } from 'primeng/dynamicdialog';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { PrimengModule } from 'src/primeng/primeng.module';
import { PermissionListComponent } from './demo/dialogs/permissions.dialog/permissions.dialog';
@NgModule({
    declarations: [AppComponent, NotfoundComponent, PermissionListComponent
    ],
    imports: [PrimengModule, AppRoutingModule, AppLayoutModule,
        NgxsModule.forRoot([UserState], { developmentMode: !environment.production }),
        NgxsReduxDevtoolsPluginModule.forRoot(),
        //npm i @ngxs/storage-plugin
        NgxsStoragePluginModule.forRoot({
            key: 'users.loggedUser'
        }),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptorInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptorInterceptor,
            multi: true,
        },
        MessageService, ConfirmationService, DatePipe, BaseGuard, DialogService,
        provideHttpClient(withInterceptorsFromDi())
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }

// AOT compilation support
// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
