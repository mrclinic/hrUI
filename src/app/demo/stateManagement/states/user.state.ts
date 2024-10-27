import { Injectable, NgZone } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { patch } from '@ngxs/store/operators';
import { lastValueFrom } from "rxjs";
import { RolePermissionActions } from "../actions/role.permission.action";
import { UserActions } from "../actions/user.action";
import { Router } from "@angular/router";
import { User } from "src/app/demo/models/userManagment/User";
import { Permission } from "src/app/demo/models/userManagment/Permission";
import { RolePermissionService } from "src/app/demo/service/userManagment/role.permission.service";
import { UserService } from "src/app/demo/service/userManagment/user.service";
import { RolePermission } from "src/app/demo/models/userManagment/RolePermission";

export interface UserStateModel {
  LoadError: string;
  loggedUser: User;
  selectedPermissions: Permission[];
  permissions: Permission[];
  rolePermissions: RolePermission[];
}
@State<UserStateModel>({
  name: 'users',
  defaults: {
    LoadError: '',
    loggedUser: {},
    selectedPermissions: [],
    permissions: [],
    rolePermissions: [],
  },
})
@Injectable()
export class UserState {
  constructor(private router: Router,
    private zone: NgZone,
    private readonly userService: UserService,
    private readonly rolePermissionService: RolePermissionService) { }

  @Action(UserActions.LogIn)
  async Authetication(ctx: Context, action: UserActions.LogIn) {
    try {
      const result = await lastValueFrom(this.userService
        .LogIn(action.username, action.password));
      ctx.patchState({
        LoadError: result == null ? 'الحساب غير موجود' : '',
        loggedUser: result
      });
    } catch (err: any) {
      ctx.patchState({
        LoadError: err,

      });
    }
  }


  @Action(UserActions.logOut)
  async logOut(ctx: Context, action: UserActions.logOut) {
    try {
      localStorage.setItem('users.loggedUser', '{}');
      const link = ['auth/login'];
      this.zone.run(() => {
        this.router.navigate(link);
      });
      ctx.patchState({
        LoadError: '',
        loggedUser: {}
      });
    } catch (err: any) {
      ctx.patchState({
        LoadError: err,

      });
    }
  }
  /*End User Actions */

  /*RolePermission Actions */

  @Action(RolePermissionActions.SetRolePermission)
  async SetRolePermission(ctx: Context, action: RolePermissionActions.SetRolePermission) {

    try {
      const result = await lastValueFrom(this.rolePermissionService
        .SetRolePermission(action.payLoad, action.roleId));
      ctx.setState(
        patch({
          LoadError: '',

        })
      );
    } catch (err: any) {
      ctx.patchState({
        LoadError: err,

      });
    }
  }

  @Action(RolePermissionActions.GetRolePermissionsInfo)
  async GetRolePermissionsInfo(ctx: Context, action: RolePermissionActions.GetRolePermissionsInfo) {

    try {
      const result = await lastValueFrom(this.rolePermissionService
        .GetRolePermissionsInfo(action.payLoad));
      const res = result.map(data => ({
        displayName: data?.permission!.displayName, id: data?.permission!.id,
        name: data?.permission!.name, order: data?.permission!.order
      }));
      ctx.patchState({
        selectedPermissions: res!,
        LoadError: '',

      });
    } catch (err: any) {
      ctx.patchState({
        LoadError: err,

      });
    }
  }

  /*End RolePermission Actions */
}
type Context = StateContext<UserStateModel>;
