import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs/internal/Observable';
import { RolePermission } from 'src/app/demo/models/userManagment/RolePermission';
import { RolePermissionActions } from 'src/app/demo/stateManagement/userManagment/actions/role.permission.action';




@Component({
  selector: 'app-rolePermission',
  templateUrl: './role.permission.component.html',
  styleUrls: ['./role.permission.component.css']
})
export class RolePermissionComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  rolePermissions: RolePermission[] = [];
  cols: any[];
  rolePermissionDialog: boolean;
  rolePermission!: RolePermission;
  submitted: boolean;
  PermissionId: string = '';
  RoleIDHeader: string = '';
  ConfirmTitle: string = '';
  ConfirmMsg: string = '';
  Success: string = '';
  deleteSuccess: string = '';
  Yes: string = '';
  No: string = '';
  editSuccess: string = '';
  addSuccess: string = '';
  constructor(private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService) {
    this.cols = [];
    this.rolePermissionDialog = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.store.dispatch(new RolePermissionActions.GetAllRolePermissions('')).subscribe(
      data => {
        this.rolePermissions = this.store.selectSnapshot<RolePermission[]>((state) => state.users.rolePermissions);
        this.initColumns();
      }
    );
  }
  initColumns() {
    this.cols = [
      { field: 'PermissionId', header: this.PermissionId },
      { field: 'RoleID', header: this.RoleIDHeader }
    ]
  }
  openNew() {
    this.rolePermission = {};
    this.submitted = false;
    this.rolePermissionDialog = true;
  }
  editRolePermission(rolePermission: RolePermission) {
    this.rolePermission = { ...rolePermission };
    this.rolePermissionDialog = true;
  }
  deleteSelectedRolePermission(rolePermission: RolePermission) {
    this.rolePermission = rolePermission;
    this.deleteRolePermission();
  }
  deleteRolePermission() {
    this.confirmationService.confirm({
      message: `${'هل أنت متأكد من حذف' + this.rolePermission.roleId}?`,
      header: 'تأكيد',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(new RolePermissionActions.DeleteRolePermission(this.rolePermission.id as string)).subscribe(
          data => {
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
    this.rolePermissionDialog = false;
    this.submitted = false;
  }

  saveRolePermission() {
    this.submitted = true;
    if (this.rolePermission.roleId?.trim()) {
      if (this.rolePermission.id) {
        this.store.dispatch(new RolePermissionActions.UpdateRolePermission(this.rolePermission)).subscribe(
          data => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية التعديل بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      else {
        delete this.rolePermission.id;
        this.store.dispatch(new RolePermissionActions.AddRolePermission(this.rolePermission)).subscribe(
          data => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية الإضافة بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      this.rolePermissionDialog = false;
      this.rolePermission = {};
    }
  }

  reload() {
    this.store.dispatch(new RolePermissionActions.GetAllRolePermissions('')).subscribe(
      data => {
        this.rolePermissions = this.store.selectSnapshot<RolePermission[]>((state) => state.users.rolePermissions);
      }
    )
  }
}
