import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { DisabilityType } from 'src/app/demo/models/constants/disabilitytype.model';
import { AuthServiceService } from 'src/app/demo/service/common/auth-service.service';
import { DisabilityTypeService } from 'src/app/demo/service/constants/disabilitytype.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';
import { ActionDef, TABLE_ACTION } from 'src/app/demo/shared/models/action-def';

@Component({
  selector: 'app-disabilitytype',
  templateUrl: './disabilitytype.component.html',
  styleUrls: ['./disabilitytype.component.css']
})
export class DisabilityTypeComponent implements OnInit {
  cols: any[] = [];
  disabilitytypes: DisabilityType[] = [];
  formStructure: IFormStructure[] = [];
  canAdd: string = 'HR_DisabilityType_CreateDisabilityType';
  canEdit: string = 'HR_DisabilityType_UpdateDisabilityType';
  canSingleDelete: string = 'HR_DisabilityType_DeleteDisabilityType';
  tableActions: ActionDef[] = [];
  constructor(private readonly authServiceService: AuthServiceService, private messageService: MessageService,
    private readonly disabilitytypeService: DisabilityTypeService) {
    this.initColumns();
    this.initFormStructure();
    this.initActions();
  }

  ngOnInit(): void {
    this.disabilitytypeService.GetAllDisabilityTypes('').subscribe(
      (res) => {
        this.disabilitytypes = res
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
      this.disabilitytypeService.UpdateDisabilityType(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.disabilitytypeService.AddDisabilityType(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.disabilitytypeService.DeleteDisabilityType(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.disabilitytypeService.GetAllDisabilityTypes('').subscribe(
      (res) => {
        this.disabilitytypes = res;
      }
    )
  }
}
