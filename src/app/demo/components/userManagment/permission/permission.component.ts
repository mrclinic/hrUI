import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, FilterMatchMode, MenuItem, MessageService, SelectItem } from 'primeng/api';
import { Observable } from 'rxjs/internal/Observable';
import { FilterMatchModeCustom } from 'src/app/demo/helper/FilterMatchModeCustom';
import { Permission } from 'src/app/demo/models/userManagment/Permission';
import { PermissionActions } from 'src/app/demo/stateManagement/userManagment/actions/permission.action';


@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  permissions: Permission[] = [];
  cols: any[];
  permissionDialog: boolean;
  permission!: Permission;
  submitted: boolean;
  NameHearder: string = '';
  OrderHearder: string = '';
  DisplayNameHeader: string = '';
  ConfirmTitle: string = '';
  ConfirmMsg: string = '';
  Success: string = '';
  deleteSuccess: string = '';
  Yes: string = '';
  No: string = '';
  editSuccess: string = '';
  addSuccess: string = '';
  totalRecords: number = 0;
  paginationFilter: string = 'Page=1';
  matchModeOptions: SelectItem[] = [];
  items: MenuItem[] = [];
  constructor(private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService) {
    this.cols = [];
    this.permissionDialog = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.items = [
      { label: 'الصلاحيات', icon: '', routerLink: '/permissions' },
      { label: 'إدارة المستخدمين', icon: '', routerLink: '' },
    ];
    this.matchModeOptions = [
      { label: FilterMatchModeCustom.STARTS_WITH, value: FilterMatchMode.STARTS_WITH },
      { label: FilterMatchModeCustom.CONTAINS, value: FilterMatchMode.CONTAINS },
      { label: FilterMatchModeCustom.NOT_CONTAINS, value: FilterMatchMode.NOT_CONTAINS },
      { label: FilterMatchModeCustom.ENDS_WITH, value: FilterMatchMode.ENDS_WITH },
      { label: FilterMatchModeCustom.EQUALS, value: FilterMatchMode.EQUALS },
      { label: FilterMatchModeCustom.NOT_EQUALS, value: FilterMatchMode.NOT_EQUALS },
      { label: FilterMatchModeCustom.NOT_EQUALS, value: FilterMatchMode.NOT_EQUALS },
      //{ label: FilterMatchModeCustom.NO_FILTER, value: FilterMatchMode.NO_FILTER }
    ];
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.store.dispatch(new PermissionActions.GetAllPermissions(this.paginationFilter)).subscribe(
      () => {
        this.permissions = this.store.selectSnapshot<Permission[]>((state) => state.users.permissions).slice();
        this.totalRecords = this.permissions.length;
      }
    );
    this.translate.get('AppTitle').subscribe(
      () => {
        this.NameHearder = this.translate.instant('Name');;
        this.DisplayNameHeader = this.translate.instant('DisplayName');
        this.OrderHearder = this.translate.instant('Order');
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
    this.cols = [{ field: 'name', header: this.NameHearder },
    { field: 'displayName', header: this.DisplayNameHeader },
    { field: 'order', header: this.OrderHearder }]
  }
  openNew() {
    this.permission = {};
    this.submitted = false;
    this.permissionDialog = true;
  }
  editPermission(permission: Permission) {
    this.permission = { ...permission };
    this.permissionDialog = true;
  }
  deleteSelectedPermission(permission: Permission) {
    this.permission = permission;
    this.deletePermission();
  }
  deletePermission() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.permission.Name + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(new PermissionActions.DeletePermission(this.permission?.id as string)).subscribe(
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
    this.permissionDialog = false;
    this.submitted = false;
  }

  savePermission() {
    this.submitted = true;
    if (this.permission.Name?.trim()) {
      if (this.permission.id) {
        this.store.dispatch(new PermissionActions.UpdatePermission(this.permission)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        delete this.permission.id;
        this.store.dispatch(new PermissionActions.AddPermission(this.permission)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.permissionDialog = false;
      this.permission = {};
    }
  }

  reload() {
    this.store.dispatch(new PermissionActions.GetAllPermissions(this.paginationFilter)).subscribe(
      () => {
        this.permissions = this.store.selectSnapshot<Permission[]>((state) => state.users.permissions).slice();
        this.totalRecords = this.permissions.length;
      }
    )
  }
}
