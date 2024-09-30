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
        this.initColumns();
      }
    );
  }
  initColumns() {
    this.cols = [{ field: 'name', header: "الاسم" },
    { field: 'displayName', header: "الاسم العربي" }
    ]
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
      message: 'هل أنت متأكد من حذف' + this.role.name + '?',
      header: 'تأكيد',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(new RoleActions.DeleteRole(this.role?.id as string)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية الحذف بنجاح', life: 3000 });
            this.reload();
          }
        );
      },
      acceptLabel: 'نعم',
      rejectLabel: 'لا',
    });
  }

  hideDialog() {
    this.roleDialog = false;
    this.submitted = false;
  }

  saveRole() {
    this.submitted = true;
    if (this.role.name?.trim()) {
      if (this.role.id) {
        this.store.dispatch(new RoleActions.UpdateRole(this.role)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية التعديل بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      else {
        delete this.role.id;
        this.store.dispatch(new RoleActions.AddRole(this.role)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية الإضافة بنجاح', life: 3000 });
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
      header: 'صلاحيات الدور',
      width: '70%',
      contentStyle: { "max-height": "600px", "overflow": "auto" },
      baseZIndex: 10000,
      rtl: true,
      modal: true,
      data: this.role.id
    });

    this.ref.onClose.subscribe((selectedPermissions: Permission[]) => {
      const newArr = selectedPermissions?.map(({ displayName, name, order, ...rest }) => {
        return rest;
      });
      const mapped = newArr?.map((element) => ({
        roleId: this.role.id,
        permissionId: element.id
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
