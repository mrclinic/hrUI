import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs/internal/Observable';
import { PermissionListComponent } from 'src/app/demo/dialogs/permissions.dialog/permissions.dialog';
import { Permission } from 'src/app/demo/models/userManagment/Permission';
import { Role } from 'src/app/demo/models/userManagment/Role';
import { RoleActions } from 'src/app/demo/stateManagement/userManagment/actions/role.action';
import { RolePermissionActions } from 'src/app/demo/stateManagement/userManagment/actions/role.permission.action';


@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  roles: Role[] = [];
  cols: any[];
  roleDialog: boolean;
  rolePermissionDialog: boolean;
  role!: Role;
  submitted: boolean;
  NameHearder: string = '';
  DisplayNameHeader: string = '';
  ConfirmTitle: string = '';
  ConfirmMsg: string = '';
  Success: string = '';
  deleteSuccess: string = '';
  Yes: string = '';
  No: string = '';
  editSuccess: string = '';
  addSuccess: string = '';
  ref?: DynamicDialogRef;
  RolePermissionsLabel: string = '';
  StatusCode: string = '';
  items: MenuItem[] = [];
  constructor(private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService,
    private dialogService: DialogService) {
    this.cols = [];
    this.roleDialog = false;
    this.submitted = false;
    this.rolePermissionDialog = false;
  }

  ngOnInit(): void {
    this.items = [
      { label: 'الأدوار', icon: '', routerLink: '/roles' },
      { label: 'إدارة المستخدمين', icon: '', routerLink: '' },
    ];
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.store.dispatch(new RoleActions.GetAllRoles('')).subscribe(
      () => {
        this.roles = this.store.selectSnapshot<Role[]>((state) => state.users.roles);
      }
    );
    this.translate.get('AppTitle').subscribe(
      () => {
        this.NameHearder = this.translate.instant('Name');;
        this.DisplayNameHeader = this.translate.instant('DisplayName');
        this.ConfirmTitle = this.translate.instant('ConfirmTitle');
        this.ConfirmMsg = this.translate.instant('ConfirmMsg');
        this.Success = this.translate.instant('Success');
        this.deleteSuccess = this.translate.instant('deleteSuccess');
        this.Yes = this.translate.instant('Yes');
        this.No = this.translate.instant('No');
        this.editSuccess = this.translate.instant('editSuccess');
        this.addSuccess = this.translate.instant('addSuccess');
        this.RolePermissionsLabel = this.translate.instant('RolePermissionsLabel');
        this.StatusCode = this.translate.instant('StatusCode');
        this.initColumns();
      }
    )
  }
  initColumns() {
    this.cols = [{ field: 'name', header: "الاسم" },
    { field: 'displayName', header: "الاسم العربي" },
    { field: 'statusCode', header: "رمز الحالة الموافق للدور" }]
  }
  openNew() {
    this.role = {};
    this.submitted = false;
    this.roleDialog = true;
  }
  editRole(role: Role) {
    this.role = { ...role };
    this.roleDialog = true;
  }
  deleteSelectedRole(role: Role) {
    this.role = role;
    this.deleteRole();
  }
  deleteRole() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.role.Name + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(new RoleActions.DeleteRole(this.role?.id as string)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.deleteSuccess, life: 3000 });
            this.reload();
          }
        );
      },
      acceptLabel: this.Yes,
      rejectLabel: this.No,
    });
  }

  hideDialog() {
    this.roleDialog = false;
    this.submitted = false;
  }

  saveRole() {
    this.submitted = true;
    if (this.role.Name?.trim()) {
      if (this.role.id) {
        this.store.dispatch(new RoleActions.UpdateRole(this.role)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        delete this.role.id;
        this.store.dispatch(new RoleActions.AddRole(this.role)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.roleDialog = false;
      this.role = {};
    }
  }

  reload() {
    this.store.dispatch(new RoleActions.GetAllRoles('')).subscribe(
      () => {
        this.roles = this.store.selectSnapshot<Role[]>((state) => state.users.roles);
      }
    )
  }

  setPermissions(role: Role) {
    this.role = { ...role }
    this.ref = this.dialogService.open(PermissionListComponent, {
      header: this.RolePermissionsLabel,
      width: '70%',
      contentStyle: { "max-height": "600px", "overflow": "auto" },
      baseZIndex: 10000,
      rtl: true,
      modal: true,
      data: this.role.id
    });

    this.ref.onClose.subscribe((selectedPermissions: Permission[]) => {
      const newArr = selectedPermissions?.map(({ DisplayName, Name, Order, ...rest }) => {
        return rest;
      });
      const mapped = newArr?.map((element) => ({
        RoleId: this.role.id,
        PermissionId: element.id
      }));
      this.store.dispatch(new RolePermissionActions.SetRolePermission(mapped, this.role?.id!)).subscribe(data => {
      })
    });
  }
  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}
