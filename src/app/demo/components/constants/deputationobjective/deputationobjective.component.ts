import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { DeputationObjective } from 'src/app/demo/models/constants/deputationobjective.model';
import { AuthServiceService } from 'src/app/demo/service/common/auth-service.service';
import { DeputationObjectiveService } from 'src/app/demo/service/constants/deputationobjective.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';
import { ActionDef, TABLE_ACTION } from 'src/app/demo/shared/models/action-def';

@Component({
  selector: 'app-deputationobjective',
  templateUrl: './deputationobjective.component.html',
  styleUrls: ['./deputationobjective.component.css']
})
export class DeputationObjectiveComponent implements OnInit {
  cols: any[] = [];
  deputationobjectives: DeputationObjective[] = [];
  formStructure: IFormStructure[] = [];
  canAdd: string = 'HR_DeputationObjective_CreateDeputationObjective';
  canEdit: string = 'HR_DeputationObjective_UpdateDeputationObjective';
  canSingleDelete: string = 'HR_DeputationObjective_DeleteDeputationObjective';
  tableActions: ActionDef[] = [];
  constructor(private readonly authServiceService: AuthServiceService, private messageService: MessageService,
    private readonly deputationobjectiveService: DeputationObjectiveService) {
    this.initColumns();
    this.initFormStructure();
    this.initActions();
  }

  ngOnInit(): void {
    this.deputationobjectiveService.GetAllDeputationObjectives('').subscribe(
      (res) => {
        this.deputationobjectives = res
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
      this.deputationobjectiveService.UpdateDeputationObjective(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.deputationobjectiveService.AddDeputationObjective(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.deputationobjectiveService.DeleteDeputationObjective(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.deputationobjectiveService.GetAllDeputationObjectives('').subscribe(
      (res) => {
        this.deputationobjectives = res;
      }
    )
  }
}
