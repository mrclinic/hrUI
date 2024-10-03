import { Component } from "@angular/core";
import { Store } from "@ngxs/store";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { Permission } from "../../models/userManagment/Permission";
import { RolePermission } from "../../models/userManagment/RolePermission";
import { PermissionActions } from "../../stateManagement/userManagment/actions/permission.action";
import { RolePermissionActions } from "../../stateManagement/userManagment/actions/role.permission.action";


@Component({
  styleUrls: ['./permissions.dialog.css'],
  template: `
    <p-toolbar styleClass="mb-4">
  <ng-template pTemplate="left">
  </ng-template>
  <ng-template pTemplate="right">
    <button *hasPermission="['UserManagment_RolePermissions_SetRolePermission']" pButton pRipple label="منح جميع الصلاحيات لهذا الدور" icon="pi pi-check" class="p-button-success mr-2"
      (click)="addPermsToRole()"></button>
    <button *hasPermission="['UserManagment_RolePermissions_SetRolePermission']" pButton pRipple label="منح الصلاحيات لهذا الدور" icon="pi pi-check" class="p-button-success mr-2"
    [disabled]="!this.selectedPermissions || !this.selectedPermissions.length" (click)="addPermToRole()"></button>
  </ng-template>
</p-toolbar>

<p-table [value]="permissions" selectionMode="multiple" [(selection)]="selectedPermissions" dir="rtl" [paginator]="true"
  [rows]="5" [responsive]="true" [selectionPageOnly]="true">
  <ng-template pTemplate="header">
    <tr>
      <th class="th" pSortableColumn="price">الاسم العربي <p-sortIcon field="price"></p-sortIcon>
      </th>
      <th style="width: 2.25em">
        <p-tableHeaderCheckbox></p-tableHeaderCheckbox>
      </th>
    </tr>
  </ng-template>
  <ng-template pTemplate="body" let-permission>
    <tr>
      <td class="td">{{permission.displayName}}</td>
      <td>
        <p-tableCheckbox [value]="permission"> </p-tableCheckbox>
      </td>
    </tr>
  </ng-template>
</p-table>
        `
})
export class PermissionListComponent {
  permissions: Permission[] = [];
  selectedPermissions: Permission[] = [];
  rolePermissions: RolePermission[] = [];
  roleId: string = '';
  filter: string = '';
  constructor(private store: Store, public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit() {
    if (this.config.data) {
      this.roleId = this.config.data;
    }
    this.store.dispatch(new PermissionActions.GetAllPermissions('PageSize=500')).subscribe(
      () => {
        this.permissions = this.store.selectSnapshot<Permission[]>((state) => state.users.permissions);
        this.filter = `Filters=roleId==${this.roleId}&PageSize=500`;
        this.getRolePermissions(this.filter);
      }
    );
  }
  addPermToRole() {
    this.ref.close(this.selectedPermissions);
  }

  addPermsToRole() {
    this.selectedPermissions = this.permissions;
    this.ref.close(this.selectedPermissions);
  }
  getRolePermissions(filter: string) {
    this.store.dispatch(new RolePermissionActions.GetRolePermissionsInfo(filter)).subscribe(() => {
      this.rolePermissions = this.store.selectSnapshot<RolePermission[]>((state) => state.users.rolePermissions);
      this.selectedPermissions = this.store.selectSnapshot<Permission[]>((state) => state.users.selectedPermissions);
    });
  }


}
