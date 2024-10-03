import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { FinancialIndicatorType } from 'src/app/demo/models/constants/financialindicatortype.model';
import { FinancialIndicatorTypeService } from 'src/app/demo/service/constants/financialindicatortype.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-financialindicatortype',
  templateUrl: './financialindicatortype.component.html',
  styleUrls: ['./financialindicatortype.component.css']
})
export class FinancialIndicatorTypeComponent implements OnInit {
  cols: any[] = [];
  financialindicatortypes: FinancialIndicatorType[] = [];
  formStructure: IFormStructure[] = [];
  canAdd: string = 'HR_FinancialIndicatorType_CreateFinancialIndicatorType';
  canEdit: string = 'HR_FinancialIndicatorType_UpdateFinancialIndicatorType';
  canSingleDelete: string = 'HR_FinancialIndicatorType_DeleteFinancialIndicatorType';

  constructor(private messageService: MessageService,
    private readonly financialindicatortypeService: FinancialIndicatorTypeService) {
    this.initColumns();
    this.initFormStructure();
  }

  ngOnInit(): void {
    this.financialindicatortypeService.GetAllFinancialIndicatorTypes('').subscribe(
      (res) => {
        this.financialindicatortypes = res
      }
    );
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
      this.financialindicatortypeService.UpdateFinancialIndicatorType(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.financialindicatortypeService.AddFinancialIndicatorType(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.financialindicatortypeService.DeleteFinancialIndicatorType(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.financialindicatortypeService.GetAllFinancialIndicatorTypes('').subscribe(
      (res) => {
        this.financialindicatortypes = res;
      }
    )
  }
}
