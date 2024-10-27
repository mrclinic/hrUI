import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { AuthServiceService } from 'src/app/demo/service/common/auth-service.service';
import { PermissionService } from 'src/app/demo/service/userManagment/permission.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';
import { ActionDef, TABLE_ACTION } from 'src/app/demo/shared/models/action-def';
import { UnsubscribeComponent } from 'src/app/demo/shared/unsubscribe/unsubscribe.component';


@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent extends UnsubscribeComponent implements OnInit {
  totalRecords: number = 0;
  paginationFilter: string = 'Page=1';
  cols: any[];
  permissions: any[] = [];
  formStructure: IFormStructure[] = [];
  canAdd: string = 'UserManagment_Permission_CreatePermission';
  canEdit: string = 'UserManagment_Permission_UpdatePermission';
  canSingleDelete: string = 'UserManagment_Permission_DeletePermission';
  tableActions: ActionDef[] = [];
  constructor(private messageService: MessageService, private readonly authServiceService: AuthServiceService,
    private permissionService: PermissionService) {
    super();
    this.initColumns();
    this.initFormStructure();
    this.initActions();
  }

  ngOnInit(): void {
    this.permissionService.GetAllPermissions(this.paginationFilter).subscribe(
      (permissions) => {
        this.permissions = permissions;
        this.initColumns();
      }
    );
  }
  initActions() {
    this.tableActions = [
      {
        visible: this.authServiceService.checkPermission(this.canEdit),
        type: TABLE_ACTION.EDIT,
      },
      {
        visible: this.authServiceService.checkPermission(this.canSingleDelete),
        type: TABLE_ACTION.DELETE,
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
        readonly: true,
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
      },
      {
        type: 'number',
        label: APP_CONSTANTS.order,
        name: 'order',
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

  initColumns() {
    this.cols = [
      { dataKey: 'name', header: APP_CONSTANTS.NAME, type: 'string' },
      { dataKey: 'displayName', header: APP_CONSTANTS.displayName, type: 'string' },
      { dataKey: 'order', header: APP_CONSTANTS.order, type: 'string' }
    ]
  }

  reload() {
    this.permissionService.GetAllPermissions(this.paginationFilter).subscribe(
      (permissions) => {
        this.permissions = permissions;
      }
    )
  }

  submitEventHandler(eventData) {
    if (eventData.id) {
      this.permissionService.UpdatePermission(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.permissionService.AddPermission(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.permissionService.DeletePermission(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }
}
