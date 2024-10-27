import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { ForcedVacationType } from 'src/app/demo/models/constants/forcedvacationtype.model';
import { AuthServiceService } from 'src/app/demo/service/common/auth-service.service';
import { ForcedVacationTypeService } from 'src/app/demo/service/constants/forcedvacationtype.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';
import { ActionDef, TABLE_ACTION } from 'src/app/demo/shared/models/action-def';

@Component({
  selector: 'app-forcedvacationtype',
  templateUrl: './forcedvacationtype.component.html',
  styleUrls: ['./forcedvacationtype.component.css']
})
export class ForcedVacationTypeComponent implements OnInit {
  cols: any[] = [];
  forcedvacationtypes: ForcedVacationType[] = [];
  formStructure: IFormStructure[] = [];
  canAdd: string = 'HR_ForcedVacationType_CreateForcedVacationType';
  canEdit: string = 'HR_ForcedVacationType_UpdateForcedVacationType';
  canSingleDelete: string = 'HR_ForcedVacationType_DeleteForcedVacationType';
  tableActions: ActionDef[] = [];
  constructor(private readonly authServiceService: AuthServiceService, private messageService: MessageService,
    private readonly forcedvacationtypeService: ForcedVacationTypeService) {
    this.initColumns();
    this.initFormStructure();
    this.initActions();
  }

  ngOnInit(): void {
    this.forcedvacationtypeService.GetAllForcedVacationTypes('').subscribe(
      (res) => {
        this.forcedvacationtypes = res
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
      this.forcedvacationtypeService.UpdateForcedVacationType(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.forcedvacationtypeService.AddForcedVacationType(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.forcedvacationtypeService.DeleteForcedVacationType(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.forcedvacationtypeService.GetAllForcedVacationTypes('').subscribe(
      (res) => {
        this.forcedvacationtypes = res;
      }
    )
  }
}
