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
      }
    );
    this.translate.get('AppTitle').subscribe(
      data => {
        this.PermissionId = this.translate.instant('PermissionId');
        this.RoleIDHeader = this.translate.instant('RoleIDHeader');
        this.ConfirmTitle = this.translate.instant('ConfirmTitle');
        this.ConfirmMsg = this.translate.instant('ConfirmMsg');
        this.Success = this.translate.instant('Success');
        this.deleteSuccess = this.translate.instant('deleteSuccess');
        this.Yes = this.translate.instant('Yes');
        this.No = this.translate.instant('No');
        this.editSuccess = this.translate.instant('editSuccess');
        this.addSuccess = this.translate.instant('addSuccess');
        this.initColumns();
      }
    )
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
      message: `${this.ConfirmMsg + this.rolePermission.RoleId}?`,
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(new RolePermissionActions.DeleteRolePermission(this.rolePermission.Id as string)).subscribe(
          data => {
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
    this.rolePermissionDialog = false;
    this.submitted = false;
  }

  saveRolePermission() {
    this.submitted = true;
    if (this.rolePermission.RoleId?.trim()) {
      if (this.rolePermission.Id) {
        this.store.dispatch(new RolePermissionActions.UpdateRolePermission(this.rolePermission)).subscribe(
          data => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        delete this.rolePermission.Id;
        this.store.dispatch(new RolePermissionActions.AddRolePermission(this.rolePermission)).subscribe(
          data => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
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
