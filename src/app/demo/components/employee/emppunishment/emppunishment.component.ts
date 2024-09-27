import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { EmpPunishment } from 'src/app/demo/models/employee/emppunishment.model';
import { EmpPunishmentService } from 'src/app/demo/service/employee/emppunishment.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-emppunishment',
  templateUrl: './emppunishment.component.html',
  styleUrls: ['./emppunishment.component.css']
})
export class EmpPunishmentComponent implements OnInit {
  cols: any[] = [];
  emppunishments: EmpPunishment[] = [];
  formStructure: IFormStructure[] = [];

  constructor(private messageService: MessageService,
    private readonly emppunishmentService: EmpPunishmentService) { }

  ngOnInit(): void {
    this.emppunishmentService.GetAllEmpPunishments('').subscribe(
      (res) => {
        this.emppunishments = res;
        this.initColumns();
        this.initFormStructure();
      }
    );
  }

  initFormStructure() {
    this.formStructure = [
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
        label: APP_CONSTANTS.ISSUINGDEPARTMENT_NAME,
        name: 'issuingDepartmentId',
        value: '',
        options: [...this.issuingDepartments],
        placeHolder: APP_CONSTANTS.ISSUINGDEPARTMENT_PLACE_HOLDER,
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
        type: 'select',
        label: APP_CONSTANTS.ORDERDEPARTMENT_NAME,
        name: 'orderDepartmentId',
        value: '',
        options: [...this.orderDepartments],
        placeHolder: APP_CONSTANTS.ORDERDEPARTMENT_PLACE_HOLDER,
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: APP_CONSTANTS.FIELD_REQUIRED,
          },
        ],
      },
{
        type: 'radio',
        label: APP_CONSTANTS.ISAPPEARINGINRECORDCARD,
        name: 'isAppearingInRecordCard',
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
        type: 'select',
        label: APP_CONSTANTS.PUNISHMENTTYPE_NAME,
        name: 'punishmentTypeId',
        value: '',
        options: [...this.punishmentTypes],
        placeHolder: APP_CONSTANTS.PUNISHMENTTYPE_PLACE_HOLDER,
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
        type: 'radio',
        label: APP_CONSTANTS.ISPERCENTAGE,
        name: 'isPercentage',
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
        label: APP_CONSTANTS.ORDERCONTRACTNUMBER,
        name: 'orderContractNumber',
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
{ dataKey: 'executionDate', header: APP_CONSTANTS.EXECUTIONDATE},
{ dataKey: 'orderDate', header: APP_CONSTANTS.ORDERDATE},
{ dataKey: 'contractDate', header: APP_CONSTANTS.CONTRACTDATE},
{ dataKey: 'issuingDepartmentId', header: APP_CONSTANTS.ISSUINGDEPARTMENTID},
{ dataKey: 'issuingDepartmentName', header: APP_CONSTANTS.ISSUINGDEPARTMENTNAME},
{ dataKey: 'durationInDays', header: APP_CONSTANTS.DURATIONINDAYS},
{ dataKey: 'orderDepartmentId', header: APP_CONSTANTS.ORDERDEPARTMENTID},
{ dataKey: 'orderDepartmentName', header: APP_CONSTANTS.ORDERDEPARTMENTNAME},
{ dataKey: 'isAppearingInRecordCard', header: APP_CONSTANTS.ISAPPEARINGINRECORDCARD},
{ dataKey: 'contractTypeId', header: APP_CONSTANTS.CONTRACTTYPEID},
{ dataKey: 'contractTypeName', header: APP_CONSTANTS.CONTRACTTYPENAME},
{ dataKey: 'punishmentTypeId', header: APP_CONSTANTS.PUNISHMENTTYPEID},
{ dataKey: 'punishmentTypeName', header: APP_CONSTANTS.PUNISHMENTTYPENAME},
{ dataKey: 'percentageOrAmount', header: APP_CONSTANTS.PERCENTAGEORAMOUNT},
{ dataKey: 'isPercentage', header: APP_CONSTANTS.ISPERCENTAGE},
{ dataKey: 'reason', header: APP_CONSTANTS.REASON},
{ dataKey: 'orderContractNumber', header: APP_CONSTANTS.ORDERCONTRACTNUMBER},
{ dataKey: 'contractNumber', header: APP_CONSTANTS.CONTRACTNUMBER},
    ]
  }

  submitEventHandler(eventData) {
    if (eventData.id) {
      this.emppunishmentService.UpdateEmpPunishment(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.emppunishmentService.AddEmpPunishment(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.emppunishmentService.DeleteEmpPunishment(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.emppunishmentService.GetAllEmpPunishments('').subscribe(
      (res) => {
        this.emppunishments = res;
      }
    )
  }
}
