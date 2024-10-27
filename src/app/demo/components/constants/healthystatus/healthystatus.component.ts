import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { HealthyStatus } from 'src/app/demo/models/constants/healthystatus.model';
import { AuthServiceService } from 'src/app/demo/service/common/auth-service.service';
import { HealthyStatusService } from 'src/app/demo/service/constants/healthystatus.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';
import { ActionDef, TABLE_ACTION } from 'src/app/demo/shared/models/action-def';

@Component({
  selector: 'app-healthystatus',
  templateUrl: './healthystatus.component.html',
  styleUrls: ['./healthystatus.component.css']
})
export class HealthyStatusComponent implements OnInit {
  cols: any[] = [];
  healthystatuss: HealthyStatus[] = [];
  formStructure: IFormStructure[] = [];
  canAdd: string = 'HR_HealthyStatus_CreateHealthyStatus';
  canEdit: string = 'HR_HealthyStatus_UpdateHealthyStatus';
  canSingleDelete: string = 'HR_HealthyStatus_DeleteHealthyStatus';
  tableActions: ActionDef[] = [];
  constructor(private readonly authServiceService: AuthServiceService, private messageService: MessageService,
    private readonly healthystatusService: HealthyStatusService) {
    this.initColumns();
    this.initFormStructure();
    this.initActions();
  }

  ngOnInit(): void {
    this.healthystatusService.GetAllHealthyStatuss('').subscribe(
      (res) => {
        this.healthystatuss = res
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
      this.healthystatusService.UpdateHealthyStatus(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.healthystatusService.AddHealthyStatus(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.healthystatusService.DeleteHealthyStatus(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.healthystatusService.GetAllHealthyStatuss('').subscribe(
      (res) => {
        this.healthystatuss = res;
      }
    )
  }
}
