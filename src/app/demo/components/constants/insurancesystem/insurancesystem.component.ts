import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { InsuranceSystem } from 'src/app/demo/models/constants/insurancesystem.model';
import { AuthServiceService } from 'src/app/demo/service/common/auth-service.service';
import { InsuranceSystemService } from 'src/app/demo/service/constants/insurancesystem.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';
import { ActionDef, TABLE_ACTION } from 'src/app/demo/shared/models/action-def';

@Component({
  selector: 'app-insurancesystem',
  templateUrl: './insurancesystem.component.html',
  styleUrls: ['./insurancesystem.component.css']
})
export class InsuranceSystemComponent implements OnInit {
  cols: any[] = [];
  insurancesystems: InsuranceSystem[] = [];
  formStructure: IFormStructure[] = [];
  canAdd: string = 'HR_InsuranceSystem_CreateInsuranceSystem';
  canEdit: string = 'HR_InsuranceSystem_UpdateInsuranceSystem';
  canSingleDelete: string = 'HR_InsuranceSystem_DeleteInsuranceSystem';
  tableActions: ActionDef[] = [];
  constructor(private readonly authServiceService: AuthServiceService, private messageService: MessageService,
    private readonly insurancesystemService: InsuranceSystemService) {
    this.initColumns();
    this.initFormStructure();
    this.initActions();
  }

  ngOnInit(): void {
    this.insurancesystemService.GetAllInsuranceSystems('').subscribe(
      (res) => {
        this.insurancesystems = res
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
      this.insurancesystemService.UpdateInsuranceSystem(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.insurancesystemService.AddInsuranceSystem(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.insurancesystemService.DeleteInsuranceSystem(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.insurancesystemService.GetAllInsuranceSystems('').subscribe(
      (res) => {
        this.insurancesystems = res;
      }
    )
  }
}
