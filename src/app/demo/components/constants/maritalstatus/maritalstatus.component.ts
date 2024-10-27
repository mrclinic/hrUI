import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { MaritalStatus } from 'src/app/demo/models/constants/maritalstatus.model';
import { AuthServiceService } from 'src/app/demo/service/common/auth-service.service';
import { MaritalStatusService } from 'src/app/demo/service/constants/maritalstatus.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';
import { ActionDef, TABLE_ACTION } from 'src/app/demo/shared/models/action-def';

@Component({
  selector: 'app-maritalstatus',
  templateUrl: './maritalstatus.component.html',
  styleUrls: ['./maritalstatus.component.css']
})
export class MaritalStatusComponent implements OnInit {
  cols: any[] = [];
  maritalstatuss: MaritalStatus[] = [];
  formStructure: IFormStructure[] = [];
  canAdd: string = 'HR_MaritalStatus_CreateMaritalStatus';
  canEdit: string = 'HR_MaritalStatus_UpdateMaritalStatus';
  canSingleDelete: string = 'HR_MaritalStatus_DeleteMaritalStatus';
  tableActions: ActionDef[] = [];
  constructor(private readonly authServiceService: AuthServiceService, private messageService: MessageService,
    private readonly maritalstatusService: MaritalStatusService) {
    this.initColumns();
    this.initFormStructure();
    this.initActions();
  }

  ngOnInit(): void {
    this.maritalstatusService.GetAllMaritalStatuss('').subscribe(
      (res) => {
        this.maritalstatuss = res
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
        visible: this.authServiceService.checkPermission(this.canAdd),
        type: TABLE_ACTION.Add,
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
      { dataKey: 'name', header: APP_CONSTANTS.NAME, type: 'string' }
    ]
  }

  submitEventHandler(eventData) {
    if (eventData.id) {
      this.maritalstatusService.UpdateMaritalStatus(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.maritalstatusService.AddMaritalStatus(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.maritalstatusService.DeleteMaritalStatus(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.maritalstatusService.GetAllMaritalStatuss('').subscribe(
      (res) => {
        this.maritalstatuss = res;
      }
    )
  }
}
