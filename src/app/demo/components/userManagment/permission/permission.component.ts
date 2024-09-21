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
        this.initColumns();
      }
    );
  }
  initColumns() {
    this.cols = [{ field: 'name', header: 'الاسم' },
    { field: 'displayName', header: "الاسم العربي" },
    { field: 'order', header: "الترتيب" }]
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
      message: 'هل أنت متأكد من حذف' + this.permission.name + '?',
      header: 'تأكيد',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(new PermissionActions.DeletePermission(this.permission?.id as string)).subscribe(
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
    this.permissionDialog = false;
    this.submitted = false;
  }

  savePermission() {
    this.submitted = true;
    if (this.permission.name?.trim()) {
      if (this.permission.id) {
        this.store.dispatch(new PermissionActions.UpdatePermission(this.permission)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية التعديل بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      else {
        delete this.permission.id;
        this.store.dispatch(new PermissionActions.AddPermission(this.permission)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية الإضافة بنجاح', life: 3000 });
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
