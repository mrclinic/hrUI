import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from 'src/primeng/primeng.module';
import { MyProfileComponent } from './my.profile/my.profile.component';
import { PermissionComponent } from './permission/permission.component';
import { RoleComponent } from './role/role.component';
import { RolePermissionComponent } from './role.permission/role.permission.component';
import { UserComponent } from './user/user.component';
import { UserProfileComponent } from './user.profile/user.profile.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { UserManagmentRoutingModule } from './user-managment-routing.module';

@NgModule({
    imports: [
        CommonModule,
        UserManagmentRoutingModule,
        PrimengModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: httpTranslateLoader,
                deps: [HttpClient]
            }
        })
    ],
    declarations: [MyProfileComponent, PermissionComponent, RoleComponent, RolePermissionComponent
        , UserComponent, UserProfileComponent
    ]
})
export class UserManagmentModule { }
// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http);
}
