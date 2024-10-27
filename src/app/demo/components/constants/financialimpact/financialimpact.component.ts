import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { FinancialImpact } from 'src/app/demo/models/constants/financialimpact.model';
import { AuthServiceService } from 'src/app/demo/service/common/auth-service.service';
import { FinancialImpactService } from 'src/app/demo/service/constants/financialimpact.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';
import { ActionDef, TABLE_ACTION } from 'src/app/demo/shared/models/action-def';

@Component({
  selector: 'app-financialimpact',
  templateUrl: './financialimpact.component.html',
  styleUrls: ['./financialimpact.component.css']
})
export class FinancialImpactComponent implements OnInit {
  cols: any[] = [];
  financialimpacts: FinancialImpact[] = [];
  formStructure: IFormStructure[] = [];
  canAdd: string = 'HR_FinancialImpact_CreateFinancialImpact';
  canEdit: string = 'HR_FinancialImpact_UpdateFinancialImpact';
  canSingleDelete: string = 'HR_FinancialImpact_DeleteFinancialImpact';
  tableActions: ActionDef[] = [];
  constructor(private readonly authServiceService: AuthServiceService, private messageService: MessageService,
    private readonly financialimpactService: FinancialImpactService) {
    this.initColumns();
    this.initFormStructure();
    this.initActions();
  }

  ngOnInit(): void {
    this.financialimpactService.GetAllFinancialImpacts('').subscribe(
      (res) => {
        this.financialimpacts = res
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
      this.financialimpactService.UpdateFinancialImpact(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.financialimpactService.AddFinancialImpact(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.financialimpactService.DeleteFinancialImpact(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.financialimpactService.GetAllFinancialImpacts('').subscribe(
      (res) => {
        this.financialimpacts = res;
      }
    )
  }
}
