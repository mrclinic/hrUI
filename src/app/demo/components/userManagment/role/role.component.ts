import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { PermissionListComponent } from 'src/app/demo/dialogs/permissions.dialog/permissions.dialog';
import { Permission } from 'src/app/demo/models/userManagment/Permission';
import { AuthServiceService } from 'src/app/demo/service/common/auth-service.service';
import { RolePermissionService } from 'src/app/demo/service/userManagment/role.permission.service';
import { RoleService } from 'src/app/demo/service/userManagment/role.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';
import { ActionDef, TABLE_ACTION } from 'src/app/demo/shared/models/action-def';
import { UnsubscribeComponent } from 'src/app/demo/shared/unsubscribe/unsubscribe.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent extends UnsubscribeComponent implements OnInit {
  cols: any[];
  roles: any[] = [];
  formStructure: IFormStructure[] = [];
  canAdd: string = 'UserManagment_Role_CreateRole';
  canEdit: string = 'UserManagment_Role_UpdateRole';
  canSingleDelete: string = 'UserManagment_Role_DeleteRole';
  tableActions: ActionDef[] = [];
  ref?: DynamicDialogRef;
  constructor(private messageService: MessageService,
    private dialogService: DialogService, private readonly roleService: RoleService,
    private readonly authServiceService: AuthServiceService, private readonly rolePermissionService: RolePermissionService) {
    super();
    this.initColumns();
    this.initFormStructure();
    this.initActions();
  }

  initActions() {
    this.tableActions = [
      {
        visible: this.authServiceService.checkPermission(this.canEdit),
        type: TABLE_ACTION.EDIT,
      },
      {
        visible: this.authServiceService.checkPermission(this.canAdd),
        type: TABLE_ACTION.Add,
      },
      {
        visible: this.authServiceService.checkPermission(this.canSingleDelete),
        type: TABLE_ACTION.DELETE,
      },
      {
        visible: this.authServiceService.checkPermission(this.canSingleDelete),
        type: TABLE_ACTION.DIALOG,
        tooltip: 'صلاحيات الدور'
      }
    ]
  }
  initFormStructure() {
    this.formStructure = [
      {
        type: 'text',
        label: APP_CONSTANTS.NAME,
        name: 'name',
        value: '',
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: APP_CONSTANTS.FIELD_REQUIRED,
          },
        ],
      },
      {
        type: 'text',
        label: APP_CONSTANTS.displayName,
        name: 'displayName',
        value: '',
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: APP_CONSTANTS.FIELD_REQUIRED,
          },
        ],
      }
    ];
  }

  ngOnInit(): void {
    this.roleService.GetAllRoles('').subscribe(
      (roles) => {
        this.roles = roles;
      }
    )
  }
  initColumns() {
    this.cols = [
      { dataKey: 'name', header: APP_CONSTANTS.NAME, type: 'string' },
      { dataKey: 'displayName', header: APP_CONSTANTS.displayName, type: 'string' }
    ]
  }

  submitEventHandler(eventData) {
    if (eventData.id) {
      this.roleService.UpdateRole(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.roleService.AddRole(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.roleService.DeleteRole(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.roleService.GetAllRoles('').subscribe(
      (roles) => {
        this.roles = roles;
      }
    )
  }

  setPermissions(data) {
    this.ref = this.dialogService.open(PermissionListComponent, {
      header: 'صلاحيات الدور',
      width: '70%',
      contentStyle: { "max-height": "600px", "overflow": "auto" },
      baseZIndex: 10000,
      rtl: true,
      modal: true,
      data: data.id
    });

    this.ref.onClose.subscribe((selectedPermissions: Permission[]) => {
      const newArr = selectedPermissions?.map(({ displayName, name, order, ...rest }) => {
        return rest;
      });
      const mapped = newArr?.map((element) => ({
        roleId: data.id,
        permissionId: element.id
      }));
      this.rolePermissionService.SetRolePermission(mapped, data.id).subscribe(data => {
      })
    });
  }
}
