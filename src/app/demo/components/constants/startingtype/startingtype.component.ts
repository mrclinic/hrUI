import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { StartingType } from 'src/app/demo/models/constants/startingtype.model';
import { AuthServiceService } from 'src/app/demo/service/common/auth-service.service';
import { StartingTypeService } from 'src/app/demo/service/constants/startingtype.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';
import { ActionDef, TABLE_ACTION } from 'src/app/demo/shared/models/action-def';

@Component({
  selector: 'app-startingtype',
  templateUrl: './startingtype.component.html',
  styleUrls: ['./startingtype.component.css']
})
export class StartingTypeComponent implements OnInit {
  cols: any[] = [];
  startingtypes: StartingType[] = [];
  formStructure: IFormStructure[] = [];
  canAdd: string = 'HR_StartingType_CreateStartingType';
  canEdit: string = 'HR_StartingType_UpdateStartingType';
  canSingleDelete: string = 'HR_StartingType_DeleteStartingType';
  tableActions: ActionDef[] = [];
  constructor(private readonly authServiceService: AuthServiceService, private messageService: MessageService,
    private readonly startingtypeService: StartingTypeService) {
    this.initColumns();
    this.initFormStructure();
    this.initActions();
  }

  ngOnInit(): void {
    this.startingtypeService.GetAllStartingTypes('').subscribe(
      (res) => {
        this.startingtypes = res
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
      this.startingtypeService.UpdateStartingType(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.startingtypeService.AddStartingType(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.startingtypeService.DeleteStartingType(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.startingtypeService.GetAllStartingTypes('').subscribe(
      (res) => {
        this.startingtypes = res;
      }
    )
  }
}
