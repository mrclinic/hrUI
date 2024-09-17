import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MyProfileComponent } from './my.profile/my.profile.component';
import { environment } from 'src/environments/environment';
import { UserProfileComponent } from './user.profile/user.profile.component';
import { PermissionComponent } from './permission/permission.component';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: 'myProfile',
            component: MyProfileComponent,
            data: {
                ogTitle: environment.ogTitle,
                ogDescription: environment.ogDescription,
                ogImage: environment.appUrl + environment.ogImage
            }
        },
        {
            path: 'userProfiles',
            component: UserProfileComponent,
            data: {
                ogTitle: environment.ogTitle,
                ogDescription: environment.ogDescription,
                ogImage: environment.appUrl + environment.ogImage
            }
        },
        {
            path: 'permissions',
            component: PermissionComponent,
            data: {
                ogTitle: environment.ogTitle,
                ogDescription: environment.ogDescription,
                ogImage: environment.appUrl + environment.ogImage
            }
        },
        {
            path: 'users',
            component: UserComponent,
            data: {
                ogTitle: environment.ogTitle,
                ogDescription: environment.ogDescription,
                ogImage: environment.appUrl + environment.ogImage
            }
        },
        {
            path: 'roles',
            component: RoleComponent,
            data: {
                ogTitle: environment.ogTitle,
                ogDescription: environment.ogDescription,
                ogImage: environment.appUrl + environment.ogImage
            }
        }

    ])],
    exports: [RouterModule]
})
export class UserManagmentRoutingModule { }
