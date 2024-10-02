import { Injectable, NgZone } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { patch, append, removeItem, updateItem } from '@ngxs/store/operators';
import { lastValueFrom } from "rxjs";
import { PermissionActions } from "../actions/permission.action";
import { RoleActions } from "../actions/role.action";
import { RolePermissionActions } from "../actions/role.permission.action";
import { UserActions } from "../actions/user.action";
import { UserProfileActions } from "../actions/user.profile.action";

import { Router } from "@angular/router";
import { User } from "src/app/demo/models/userManagment/User";
import { Permission } from "src/app/demo/models/userManagment/Permission";
import { UserProfileService } from "src/app/demo/service/userManagment/user.profile.service";
import { RolePermissionService } from "src/app/demo/service/userManagment/role.permission.service";
import { PermissionService } from "src/app/demo/service/userManagment/permission.service";
import { RoleService } from "src/app/demo/service/userManagment/role.service";
import { UserService } from "src/app/demo/service/userManagment/user.service";
import { RolePermission } from "src/app/demo/models/userManagment/RolePermission";
import { UserProfile } from "src/app/demo/models/userManagment/UserProfile";
import { Role } from "src/app/demo/models/userManagment/Role";
export interface UserStateModel {
  isLoading: boolean;
  isLoggedIn: boolean;
  LoadError: string;
  loggedUser: User;
  selectedPermissions: Permission[];
  hasPermission: boolean;
  recordCount: number;
  roles: Role[];
  users: User[];
  permissions: Permission[];
  rolePermissions: RolePermission[];
  userProfiles: UserProfile[];
}
@State<UserStateModel>({
  name: 'users',
  defaults: {
    isLoading: false,
    isLoggedIn: false,
    LoadError: '',
    loggedUser: {},
    selectedPermissions: [],
    hasPermission: false,
    recordCount: 0,
    roles: [],
    users: [],
    permissions: [],
    rolePermissions: [],
    userProfiles: []
  },
})
@Injectable()
export class UserState {
  constructor(private router: Router,
    private zone: NgZone,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly permissionService: PermissionService,
    private readonly rolePermissionService: RolePermissionService,
    private readonly userProfileService: UserProfileService) { }

  /*User Actions */
  @Action(UserActions.AddUser)
  async AddUser(ctx: Context, action: UserActions.AddUser) {
    ctx.patchState({ isLoading: true });
    try {
      const result = await lastValueFrom(this.userService
        .AddUser(action.payLoad));
      ctx.setState(
        patch({
          users: append([result]),
          LoadError: '',
          isLoading: false
        })
      );
    } catch (err: any) {
      ctx.patchState({
        LoadError: err,
        isLoading: false
      });
    }
  }
  @Action(UserActions.UpdateUser)
  async UpdateUser(ctx: Context, action: UserActions.UpdateUser) {
    ctx.patchState({ isLoading: true });
    try {
      const result = await lastValueFrom(this.userService
        .UpdateUser(action.payLoad));
      ctx.setState(
        patch({
          users: updateItem<User>(user => user?.id === action.payLoad?.id, action.payLoad),
          LoadError: '',
          isLoading: false
        })
      );
    } catch (err: any) {
      ctx.patchState({
        LoadError: err,
        isLoading: false
      });
    }
  }

  @Action(UserActions.GetUsers)
  async GetUsers(ctx: Context, action: UserActions.GetUsers) {
    ctx.patchState({ isLoading: true });
    try {
      const result = await lastValueFrom(this.userService
        .GetUsers());
      ctx.patchState({
        users: result,
        LoadError: '',
        isLoading: false
      });
    } catch (err: any) {
      ctx.patchState({
        LoadError: err,
        isLoading: false
      });
    }
  }
  @Action(UserActions.GetUsersInfo)
  async GetUsersInfo(ctx: Context, action: UserActions.GetUsersInfo) {
    ctx.patchState({ isLoading: true });
    try {
      const result = await lastValueFrom(this.userService
        .GetUsersInfo(action.payLoad));
      ctx.patchState({
        users: result,
        LoadError: '',
        isLoading: false
      });
    } catch (err: any) {
      ctx.patchState({
        LoadError: err,
        isLoading: false
      });
    }
  }

  @Action(UserActions.DeleteUser)
  async DeleteUser(ctx: Context, action: UserActions.DeleteUser) {
    ctx.patchState({ isLoading: true });
    try {
      const result = await lastValueFrom(this.userService
        .DeleteUser(action.Id));
      ctx.setState(
        patch({
          users: removeItem<User>(user => user?.id === action.Id),
          LoadError: '',
          isLoading: false
        })
      );
    } catch (err: any) {
      ctx.patchState({
        LoadError: err,
        isLoading: false
      });
    }
  }

  @Action(UserActions.logOut)
  async logOut(ctx: Context, action: UserActions.logOut) {
    ctx.patchState({ isLoggedIn: false, isLoading: true });
    try {
      localStorage.setItem('users.loggedUser', '{}');
      const link = ['auth/login'];
      this.zone.run(() => {
        this.router.navigate(link);
      });
      ctx.patchState({
        isLoggedIn: false,
        LoadError: '',
        isLoading: false,
        loggedUser: {}
      });
    } catch (err: any) {
      ctx.patchState({
        LoadError: err,
        isLoading: false
      });
    }
  }
  @Action(UserActions.LogIn)
  async Authetication(ctx: Context, action: UserActions.LogIn) {
    ctx.patchState({ isLoggedIn: false, isLoading: true });
    try {
      const result = await lastValueFrom(this.userService
        .LogIn(action.username, action.password));
      ctx.patchState({
        isLoggedIn: true,
        LoadError: result == null ? 'الحساب غير موجود' : '',
        isLoading: false,
        loggedUser: result
      });
    } catch (err: any) {
      ctx.patchState({
        LoadError: err,
        isLoading: false
      });
    }
  }
  @Action(UserActions.SignUp)
  async SignUp(ctx: Context, action: UserActions.SignUp) {
    ctx.patchState({ isLoading: true });
    try {
      const result = await lastValueFrom(this.userService
        .SignUp(action.payLoad));
      ctx.patchState({
        LoadError: '',
        isLoading: false
      });
    } catch (err: any) {
      ctx.patchState({
        LoadError: err,
        isLoading: false
      });
    }
  }
  @Action(UserActions.ChangePassword)
  async ChangePassword(ctx: Context, action: UserActions.ChangePassword) {
    ctx.patchState({ isLoading: true });
    try {
      await lastValueFrom(this.userService
        .ChangePassword(action.userId, action.currentPassword, action.newPassword));
      ctx.patchState({
        LoadError: '',
        isLoading: false
      });
    } catch (err: any) {
      ctx.patchState({
        LoadError: err,
        isLoading: false
      });
    }
  }

  @Action(UserActions.Activate)
  async Activate(ctx: Context, action: UserActions.Activate) {
    ctx.patchState({ isLoading: true });
    try {
      await lastValueFrom(this.userService
        .Activate(action.username, action.code));
      ctx.patchState({
        LoadError: '',
        isLoading: false
      });
    } catch (err: any) {
      ctx.patchState({
        LoadError: err,
        isLoading: false
      });
    }
  }

  @Action(UserActions.getUserInfo)
  async getUserInfo(ctx: Context, action: UserActions.getUserInfo) {
    ctx.patchState({ isLoggedIn: false, isLoading: true });
    try {
      const result = await lastValueFrom(this.userService
        .getUserInfo(action.Id));
      ctx.patchState({
        isLoggedIn: true,
        LoadError: '',
        isLoading: false,
        loggedUser: result
      });
    } catch (err: any) {
      ctx.patchState({
        LoadError: err,
        isLoading: false
      });
    }
  }
  /*End User Actions */


  /*Role Actions */
  @Action(RoleActions.AddRole)
  async AddRole(ctx: Context, action: RoleActions.AddRole) {
    ctx.patchState({ isLoading: true });
    try {
      const result = await lastValueFrom(this.roleService
        .AddRole(action.payLoad));
      ctx.setState(
        patch({
          roles: append([result]),
          LoadError: '',
          isLoading: false
        })
      );
    } catch (err: any) {
      ctx.patchState({
        LoadError: err,
        isLoading: false
      });
    }
  }
  @Action(RoleActions.UpdateRole)
  async UpdateRole(ctx: Context, action: RoleActions.UpdateRole) {
    ctx.patchState({ isLoading: true });
    try {
      const result = await lastValueFrom(this.roleService
        .UpdateRole(action.payLoad));
      ctx.setState(
        patch({
          roles: updateItem<Role>(role => role?.id === action.payLoad?.id, action.payLoad),
          LoadError: '',
          isLoading: false
        })
      );
    } catch (err: any) {
      ctx.patchState({
        LoadError: err,
        isLoading: false
      });
    }
  }
  @Action(RoleActions.GetAllRoles)
  async GetAllRoles(ctx: Context, action: RoleActions.GetAllRoles) {
    ctx.patchState({ isLoading: true });
    try {
      const result = await lastValueFrom(this.roleService
        .GetAllRoles(action.payLoad));
      ctx.patchState({
        roles: result,
        LoadError: '',
        isLoading: false
      });
    } catch (err: any) {
      ctx.patchState({
        LoadError: err,
        isLoading: false
      });
    }
  }

  @Action(RoleActions.DeleteRole)
  async DeleteRole(ctx: Context, action: RoleActions.DeleteRole) {
    ctx.patchState({ isLoading: true });
    try {
      const result = await lastValueFrom(this.roleService
        .DeleteRole(action.Id));
      ctx.setState(
        patch({
          roles: removeItem<Role>(role => role?.id === action.Id),
          LoadError: '',
          isLoading: false
        })
      );
    } catch (err: any) {
      ctx.patchState({
        LoadError: err,
        isLoading: false
      });
    }
  }
  /*End Role Actions */

  /*Permission Actions */

  @Action(PermissionActions.AddPermission)
  async AddPermission(ctx: Context, action: PermissionActions.AddPermission) {
    ctx.patchState({ isLoading: true });
    try {
      const result = await lastValueFrom(this.permissionService
        .AddPermission(action.payLoad));
      ctx.setState(
        patch({
          permissions: append([result]),
          LoadError: '',
          isLoading: false
        })
      );
    } catch (err: any) {
      ctx.patchState({
        LoadError: err,
        isLoading: false
      });
    }
  }
  @Action(PermissionActions.UpdatePermission)
  async UpdatePermission(ctx: Context, action: PermissionActions.UpdatePermission) {
    ctx.patchState({ isLoading: true });
    try {
      const result = await lastValueFrom(this.permissionService
        .UpdatePermission(action.payLoad));
      ctx.setState(
        patch({
          permissions: updateItem<Permission>(permission => permission?.id === action.payLoad?.id, action.payLoad),
          LoadError: '',
          isLoading: false
        })
      );
    } catch (err: any) {
      ctx.patchState({
        LoadError: err,
        isLoading: false
      });
    }
  }
  /* @Action(PermissionActions.GetAllPermissions)
  async GetAllPermissions(ctx: Context, action: PermissionActions.GetAllPermissions) {
    ctx.patchState({ isLoading: true });
    try {
      const result = await lastValueFrom(this.permissionService
        .GetAllPermissions(action.payLoad));
      ctx.patchState({
        permissions: result.Data,
        recordCount: result.RecordCount,
        LoadError: '',
        isLoading: false
      });
    } catch (err: any) {
      ctx.patchState({
        LoadError: err,
        isLoading: false
      });
    }
  } */
  @Action(PermissionActions.GetAllPermissions)
  async GetAllPermissions(ctx: Context, action: PermissionActions.GetAllPermissions) {
    ctx.patchState({ isLoading: true });
    try {
      const result = await lastValueFrom(this.permissionService
        .GetAllPermissions(action.payLoad));
      ctx.patchState({
        permissions: result,
        LoadError: '',
        isLoading: false
      });
    } catch (err: any) {
      ctx.patchState({
        LoadError: err,
        isLoading: false
      });
    }
  }

  @Action(PermissionActions.DeletePermission)
  async DeletePermission(ctx: Context, action: PermissionActions.DeletePermission) {
    ctx.patchState({ isLoading: true });
    try {
      const result = await lastValueFrom(this.permissionService
        .DeletePermission(action.Id));
      ctx.setState(
        patch({
          permissions: removeItem<Permission>(permission => permission?.id === action.Id),
          LoadError: '',
          isLoading: false
        })
      );
    } catch (err: any) {
      ctx.patchState({
        LoadError: err,
        isLoading: false
      });
    }
  }
  @Action(PermissionActions.CheckPermission)
  async CheckPermission(ctx: Context, action: PermissionActions.CheckPermission) {
    ctx.patchState({ isLoading: true });
    try {
      let currentUser = JSON.parse(localStorage.getItem('users.loggedUser') || "") as User;
      let permissions = currentUser.permissions || [];
      ctx.setState(
        patch({
          hasPermission: permissions?.includes(action.permName) || currentUser.role?.name?.localeCompare('Admin') == 0,
          LoadError: '',
          isLoading: false
        })
      );
    } catch (err: any) {
      ctx.patchState({
        LoadError: err,
        isLoading: false
      });
    }
  }
  /*End Permission Actions */

  /*RolePermission Actions */

  @Action(RolePermissionActions.SetRolePermission)
  async SetRolePermission(ctx: Context, action: RolePermissionActions.SetRolePermission) {
    ctx.patchState({ isLoading: true });
    try {
      const result = await lastValueFrom(this.rolePermissionService
        .SetRolePermission(action.payLoad, action.roleId));
      ctx.setState(
        patch({
          LoadError: '',
          isLoading: false
        })
      );
    } catch (err: any) {
      ctx.patchState({
        LoadError: err,
        isLoading: false
      });
    }
  }
  @Action(RolePermissionActions.AddRolePermission)
  async AddRolePermission(ctx: Context, action: RolePermissionActions.AddRolePermission) {
    ctx.patchState({ isLoading: true });
    try {
      const result = await lastValueFrom(this.rolePermissionService
        .AddRolePermission(action.payLoad));
      ctx.setState(
        patch({
          rolePermissions: append([result]),
          LoadError: '',
          isLoading: false
        })
      );
    } catch (err: any) {
      ctx.patchState({
        LoadError: err,
        isLoading: false
      });
    }
  }
  @Action(RolePermissionActions.UpdateRolePermission)
  async UpdateRolePermission(ctx: Context, action: RolePermissionActions.UpdateRolePermission) {
    ctx.patchState({ isLoading: true });
    try {
      const result = await lastValueFrom(this.rolePermissionService
        .UpdateRolePermission(action.payLoad));
      ctx.setState(
        patch({
          rolePermissions: updateItem<RolePermission>(rolePermission => rolePermission?.id === action.payLoad?.id, action.payLoad),
          LoadError: '',
          isLoading: false
        })
      );
    } catch (err: any) {
      ctx.patchState({
        LoadError: err,
        isLoading: false
      });
    }
  }
  @Action(RolePermissionActions.GetAllRolePermissions)
  async GetAllRolePermissions(ctx: Context, action: RolePermissionActions.GetAllRolePermissions) {
    ctx.patchState({ isLoading: true });
    try {
      const result = await lastValueFrom(this.rolePermissionService
        .GetAllRolePermissions(action.payLoad));
      ctx.patchState({
        rolePermissions: result,
        LoadError: '',
        isLoading: false
      });
    } catch (err: any) {
      ctx.patchState({
        LoadError: err,
        isLoading: false
      });
    }
  }
  @Action(RolePermissionActions.GetRolePermissionsInfo)
  async GetRolePermissionsInfo(ctx: Context, action: RolePermissionActions.GetRolePermissionsInfo) {
    ctx.patchState({ isLoading: true });
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
        isLoading: false
      });
    } catch (err: any) {
      ctx.patchState({
        LoadError: err,
        isLoading: false
      });
    }
  }
  @Action(RolePermissionActions.DeleteRolePermission)
  async DeleteRolePermission(ctx: Context, action: RolePermissionActions.DeleteRolePermission) {
    ctx.patchState({ isLoading: true });
    try {
      const result = await lastValueFrom(this.rolePermissionService
        .DeleteRolePermission(action.Id));
      ctx.setState(
        patch({
          rolePermissions: removeItem<RolePermission>(rolePermission => rolePermission?.id === action?.Id),
          LoadError: '',
          isLoading: false
        })
      );
    } catch (err: any) {
      ctx.patchState({
        LoadError: err,
        isLoading: false
      });
    }
  }
  /*End RolePermission Actions */

  /*UserProfile Actions */
  @Action(UserProfileActions.AddUserProfile)
  async AddUserProfile(ctx: Context, action: UserProfileActions.AddUserProfile) {
    ctx.patchState({ isLoading: true });
    try {
      const result = await lastValueFrom(this.userProfileService
        .AddUserProfile(action.payLoad));
      ctx.setState(
        patch({
          userProfiles: append([result]),
          LoadError: '',
          isLoading: false
        })
      );
    } catch (err: any) {
      ctx.patchState({
        LoadError: err,
        isLoading: false
      });
    }
  }
  @Action(UserProfileActions.UpdateUserProfile)
  async UpdateUserProfile(ctx: Context, action: UserProfileActions.UpdateUserProfile) {
    ctx.patchState({ isLoading: true });
    try {
      const result = await lastValueFrom(this.userProfileService
        .UpdateUserProfile(action.payLoad));
      ctx.setState(
        patch({
          userProfiles: updateItem<UserProfile>(userProfile => userProfile?.id === action.payLoad?.id, action.payLoad),
          LoadError: '',
          isLoading: false
        })
      );
    } catch (err: any) {
      ctx.patchState({
        LoadError: err,
        isLoading: false
      });
    }
  }

  @Action(UserProfileActions.GetAllUserProfilesInfo)
  async GetAllUserProfilesInfo(ctx: Context, action: UserProfileActions.GetAllUserProfilesInfo) {
    ctx.patchState({ isLoading: true });
    try {
      const result = await lastValueFrom(this.userProfileService
        .GetAllUserProfilesInfo(action.payLoad));
      ctx.patchState({
        userProfiles: result,
        LoadError: '',
        isLoading: false
      });
    } catch (err: any) {
      ctx.patchState({
        LoadError: err,
        isLoading: false
      });
    }
  }

  @Action(UserProfileActions.GetAllUserProfiles)
  async GetAllUserProfiles(ctx: Context, action: UserProfileActions.GetAllUserProfiles) {
    ctx.patchState({ isLoading: true });
    try {
      const result = await lastValueFrom(this.userProfileService
        .GetUserProfilesInfo(action.payLoad));
      ctx.patchState({
        userProfiles: result,
        LoadError: '',
        isLoading: false
      });
    } catch (err: any) {
      ctx.patchState({
        LoadError: err,
        isLoading: false
      });
    }
  }

  @Action(UserProfileActions.GetMyUserProfiles)
  async GetMyUserProfiles(ctx: Context, action: UserProfileActions.GetMyUserProfiles) {
    ctx.patchState({ isLoading: true });
    try {
      const result = await lastValueFrom(this.userProfileService
        .GetMyUserProfiles(action.payLoad));
      ctx.patchState({
        userProfiles: result,
        LoadError: '',
        isLoading: false
      });
    } catch (err: any) {
      ctx.patchState({
        LoadError: err,
        isLoading: false
      });
    }
  }
  @Action(UserProfileActions.DeleteUserProfile)
  async DeleteUserProfile(ctx: Context, action: UserProfileActions.DeleteUserProfile) {
    ctx.patchState({ isLoading: true });
    try {
      const result = await lastValueFrom(this.userProfileService
        .DeleteUserProfile(action.Id));
      ctx.setState(
        patch({
          userProfiles: removeItem<UserProfile>(userProfile => userProfile?.id === action.Id),
          LoadError: '',
          isLoading: false
        })
      );
    } catch (err: any) {
      ctx.patchState({
        LoadError: err,
        isLoading: false
      });
    }
  }
  /*End UserProfile Actions */
}
type Context = StateContext<UserStateModel>;
