import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { EmpReward } from 'src/app/demo/models/employee/empreward.model';
import { EmpRewardService } from 'src/app/demo/service/employee/empreward.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-empreward',
  templateUrl: './empreward.component.html',
  styleUrls: ['./empreward.component.css']
})
export class EmpRewardComponent implements OnInit {
  cols: any[] = [];
  emprewards: EmpReward[] = [];
  formStructure: IFormStructure[] = [];

  constructor(private messageService: MessageService,
    private readonly emprewardService: EmpRewardService) { }

  ngOnInit(): void {
    this.emprewardService.GetAllEmpRewards('').subscribe(
      (res) => {
        this.emprewards = res;
        this.initColumns();
        this.initFormStructure();
      }
    );
  }

  initFormStructure() {
    this.formStructure = [
{
        type: 'Date',
        label: APP_CONSTANTS.ORDERDATE,
        name: 'orderDate',
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
        type: 'Date',
        label: APP_CONSTANTS.EXECUTIONDATE,
        name: 'executionDate',
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
        type: 'Date',
        label: APP_CONSTANTS.CONTRACTDATE,
        name: 'contractDate',
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
        type: 'select',
        label: APP_CONSTANTS.REWARDTYPE_NAME,
        name: 'rewardTypeId',
        value: '',
        options: [...this.rewardTypes],
        placeHolder: APP_CONSTANTS.REWARDTYPE_PLACE_HOLDER,
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: APP_CONSTANTS.FIELD_REQUIRED,
          },
        ],
      },
{
        type: 'select',
        label: APP_CONSTANTS.DEPARTMENT_NAME,
        name: 'departmentId',
        value: '',
        options: [...this.departments],
        placeHolder: APP_CONSTANTS.DEPARTMENT_PLACE_HOLDER,
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: APP_CONSTANTS.FIELD_REQUIRED,
          },
        ],
      },
{
        type: 'select',
        label: APP_CONSTANTS.CONTRACTTYPE_NAME,
        name: 'contractTypeId',
        value: '',
        options: [...this.contractTypes],
        placeHolder: APP_CONSTANTS.CONTRACTTYPE_PLACE_HOLDER,
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
        label: APP_CONSTANTS.DURATIONINDAYS,
        name: 'durationInDays',
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
        label: APP_CONSTANTS.PERCENTAGEORAMOUNT,
        name: 'percentageOrAmount',
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
        type: 'select',
        label: APP_CONSTANTS.FINANCIALINDICATORTYPE_NAME,
        name: 'financialIndicatorTypeId',
        value: '',
        options: [...this.financialIndicatorTypes],
        placeHolder: APP_CONSTANTS.FINANCIALINDICATORTYPE_PLACE_HOLDER,
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
        label: APP_CONSTANTS.REASON,
        name: 'reason',
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
        type: 'text',
        label: APP_CONSTANTS.ORDERNUMBER,
        name: 'orderNumber',
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
        type: 'text',
        label: APP_CONSTANTS.CONTRACTNUMBER,
        name: 'contractNumber',
        value: '',
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: APP_CONSTANTS.FIELD_REQUIRED,
          },
        ],
      },
    ];
  }

  initColumns() {
    this.cols = [
{ dataKey: 'orderDate', header: APP_CONSTANTS.ORDERDATE},
{ dataKey: 'executionDate', header: APP_CONSTANTS.EXECUTIONDATE},
{ dataKey: 'contractDate', header: APP_CONSTANTS.CONTRACTDATE},
{ dataKey: 'rewardTypeId', header: APP_CONSTANTS.REWARDTYPEID},
{ dataKey: 'departmentId', header: APP_CONSTANTS.DEPARTMENTID},
{ dataKey: 'contractTypeId', header: APP_CONSTANTS.CONTRACTTYPEID},
{ dataKey: 'durationInDays', header: APP_CONSTANTS.DURATIONINDAYS},
{ dataKey: 'percentageOrAmount', header: APP_CONSTANTS.PERCENTAGEORAMOUNT},
{ dataKey: 'financialIndicatorTypeId', header: APP_CONSTANTS.FINANCIALINDICATORTYPEID},
{ dataKey: 'reason', header: APP_CONSTANTS.REASON},
{ dataKey: 'orderNumber', header: APP_CONSTANTS.ORDERNUMBER},
{ dataKey: 'contractNumber', header: APP_CONSTANTS.CONTRACTNUMBER},
{ dataKey: 'contractTypeName', header: APP_CONSTANTS.CONTRACTTYPENAME},
{ dataKey: 'departmentName', header: APP_CONSTANTS.DEPARTMENTNAME},
{ dataKey: 'employeeName', header: APP_CONSTANTS.EMPLOYEENAME},
{ dataKey: 'financialIndicatorTypeName', header: APP_CONSTANTS.FINANCIALINDICATORTYPENAME},
{ dataKey: 'rewardTypeName', header: APP_CONSTANTS.REWARDTYPENAME},
    ]
  }

  submitEventHandler(eventData) {
    if (eventData.id) {
      this.emprewardService.UpdateEmpReward(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.emprewardService.AddEmpReward(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.emprewardService.DeleteEmpReward(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.emprewardService.GetAllEmpRewards('').subscribe(
      (res) => {
        this.emprewards = res;
      }
    )
  }
}
