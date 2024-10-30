import { Component } from "@angular/core";
import { Store } from "@ngxs/store";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { Permission } from "../../models/userManagment/Permission";
import { RolePermissionActions } from "../../stateManagement/actions/role.permission.action";
import { PermissionService } from "../../service/userManagment/permission.service";
import { RolePermissionService } from "../../service/userManagment/role.permission.service";
import { TreeNode } from "primeng/api";


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
<div class="mb-3" style="direction: rtl;">
    <p-button 
        icon="pi pi-plus" 
        label="توسيع الكل" 
        (onClick)="expandAll()" 
        class="ml-2" />
    <p-button 
        icon="pi pi-minus" 
        label="طي الكل" 
        (onClick)="collapseAll()" />
</div>
<p-tree 
 [metaKeySelection]="metaKeySelection"
        [value]="items" 
        selectionMode="checkbox" 
        class="w-full md:w-30rem" 
        [(selection)]="selectedItems"
         (onNodeSelect)="nodeSelect($event)"
        (onNodeUnselect)="nodeUnselect($event)" />
        `
})
export class PermissionListComponent {
  metaKeySelection: boolean = true;
  permissions: Permission[] = [];
  selectedPermissions: any[] = [];
  roleId: string = '';
  filter: string = '';
  items: any[] = [];
  selectedItems: any[] = [];
  constructor(private store: Store, public ref: DynamicDialogRef, public config: DynamicDialogConfig,
    private readonly permissionService: PermissionService, private readonly rolePermissionService: RolePermissionService
  ) { }

  ngOnInit() {
    if (this.config.data) {
      this.roleId = this.config.data;
    }
    this.permissionService.GetAllPermissions('PageSize=500').subscribe(
      (permissions) => {
        this.permissions = permissions;
        this.filter = `Filters=RoleId==${this.roleId}&PageSize=500`;
        this.getRolePermissions(this.filter);
      }
    );
  }
  addPermToRole() {
    this.ref.close(this.selectedItems.filter((p) => p.id));
  }

  addPermsToRole() {
    this.selectedPermissions = this.permissions;
    this.ref.close(this.selectedPermissions);
  }
  getRolePermissions(filter: string) {
    this.store.dispatch(new RolePermissionActions.GetRolePermissionsInfo(filter)).subscribe(() => {
      this.selectedPermissions = this.store.selectSnapshot<Permission[]>((state) => state.users.selectedPermissions);
      this.selectedItems = this.selectedPermissions.map((item) => ({
        ...item,
        key: item.name,
        label: item.displayName,
        data: item.name
      }));
      this.items = this.createPermissionsTree(this.permissions);
      this.checkTreenode();
      console.log(this.items)
    });
  }

  createPermissionsTree(permissions, withSelection: boolean = false) {
    const map = new Map();
    let items = [];
    permissions.forEach((item) => {
      const key = item.name.split('_')[1];
      const collection = map.get(key);
      if (!collection) {
        let object = {
          'key': item.name,
          'label': item.displayName,
          'data': item.name,
          'expanded': true,
          'selected': withSelection,
          'selectable': true,
          'id': item.id
        }
        map.set(key, [object]);
      } else {
        let object = {
          'key': item.name,
          'label': item.displayName,
          'data': item.name,
          'expanded': true,
          'selected': withSelection,
          'selectable': true,
          'id': item.id
        }
        collection.push(object);
      }
    })
    for (let item of map) {
      let object =
        { 'key': item[0], 'expanded': true, 'selectable': true, label: item[0], 'data': item[0], 'children': item[1] }
      items.push(object);
    }
    return items;
  }

  nodeSelect(event: any) {
    console.log(event);
  }

  nodeUnselect(event: any) {
    console.log(event);
  }

  checkTreenode() {
    this.items.forEach((item) => {
      let hasSelectedChild = false;
      item.children.forEach((child) => {
        if (this.selectedItems.filter((p) => p.key == child.key).length > 0) {
          child.selected = true;
          hasSelectedChild = true;
        }
      });
      if (hasSelectedChild) item.partialSelected = true;
      if (item.children.filter((p) => p.selected == true).length == item.children.length) item.partialSelected = false;
      console.log(item)
    })
  }

  expandAll() {
    this.items.forEach((node) => {
      this.expandRecursive(node, true);
    });
  }

  collapseAll() {
    this.items.forEach((node) => {
      this.expandRecursive(node, false);
    });
  }

  private expandRecursive(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand;
    if (node.children) {
      node.children.forEach((childNode) => {
        this.expandRecursive(childNode, isExpand);
      });
    }
  }
}
