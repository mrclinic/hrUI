import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { EmpVacation } from 'src/app/demo/models/employee/empvacation.model';
import { EmpVacationService } from 'src/app/demo/service/employee/empvacation.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-empvacation',
  templateUrl: './empvacation.component.html',
  styleUrls: ['./empvacation.component.css']
})
export class EmpVacationComponent implements OnInit {
  cols: any[] = [];
  empvacations: EmpVacation[] = [];
  formStructure: IFormStructure[] = [];

  constructor(private messageService: MessageService,
    private readonly empvacationService: EmpVacationService) { }

  ngOnInit(): void {
    this.empvacationService.GetAllEmpVacations('').subscribe(
      (res) => {
        this.empvacations = res;
        this.initColumns();
        this.initFormStructure();
      }
    );
  }

  initFormStructure() {
    this.formStructure = [
{
        type: 'Date',
        label: APP_CONSTANTS.STARTDATE,
        name: 'startDate',
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
        type: 'Date',
        label: APP_CONSTANTS.ENDDATE,
        name: 'endDate',
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
        label: APP_CONSTANTS.MODIFICATIONCONTRACTDATE,
        name: 'modificationContractDate',
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
        label: APP_CONSTANTS.ACTUALRETURNDATE,
        name: 'actualReturnDate',
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
        label: APP_CONSTANTS.VACATIONTYPE_NAME,
        name: 'vacationTypeId',
        value: '',
        options: [...this.vacationTypes],
        placeHolder: APP_CONSTANTS.VACATIONTYPE_PLACE_HOLDER,
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
        label: APP_CONSTANTS.VACATIONYEAR,
        name: 'vacationYear',
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
        label: APP_CONSTANTS.FINANCIALIMPACT_NAME,
        name: 'financialImpactId',
        value: '',
        options: [...this.financialImpacts],
        placeHolder: APP_CONSTANTS.FINANCIALIMPACT_PLACE_HOLDER,
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
        label: APP_CONSTANTS.FORCEDVACATIONTYPE_NAME,
        name: 'forcedVacationTypeId',
        value: '',
        options: [...this.forcedVacationTypes],
        placeHolder: APP_CONSTANTS.FORCEDVACATIONTYPE_PLACE_HOLDER,
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
        label: APP_CONSTANTS.ISINCLUDEDINSERVICEDURATION,
        name: 'isIncludedInServiceDuration',
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
        label: APP_CONSTANTS.MODIFICATIONCONTRACTTYPE_NAME,
        name: 'modificationContractTypeId',
        value: '',
        options: [...this.modificationContractTypes],
        placeHolder: APP_CONSTANTS.MODIFICATIONCONTRACTTYPE_PLACE_HOLDER,
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
        label: APP_CONSTANTS.DAY,
        name: 'day',
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
        label: APP_CONSTANTS.MONTH,
        name: 'month',
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
        label: APP_CONSTANTS.YEAR,
        name: 'year',
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
{
        type: 'text',
        label: APP_CONSTANTS.MODIFICATIONCONTRACTNUMBER,
        name: 'modificationContractNumber',
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
{ dataKey: 'startDate', header: APP_CONSTANTS.STARTDATE},
{ dataKey: 'contractDate', header: APP_CONSTANTS.CONTRACTDATE},
{ dataKey: 'endDate', header: APP_CONSTANTS.ENDDATE},
{ dataKey: 'modificationContractDate', header: APP_CONSTANTS.MODIFICATIONCONTRACTDATE},
{ dataKey: 'actualReturnDate', header: APP_CONSTANTS.ACTUALRETURNDATE},
{ dataKey: 'durationInDays', header: APP_CONSTANTS.DURATIONINDAYS},
{ dataKey: 'vacationTypeId', header: APP_CONSTANTS.VACATIONTYPEID},
{ dataKey: 'vacationYear', header: APP_CONSTANTS.VACATIONYEAR},
{ dataKey: 'contractTypeId', header: APP_CONSTANTS.CONTRACTTYPEID},
{ dataKey: 'isAppearingInRecordCard', header: APP_CONSTANTS.ISAPPEARINGINRECORDCARD},
{ dataKey: 'financialImpactId', header: APP_CONSTANTS.FINANCIALIMPACTID},
{ dataKey: 'forcedVacationTypeId', header: APP_CONSTANTS.FORCEDVACATIONTYPEID},
{ dataKey: 'isIncludedInServiceDuration', header: APP_CONSTANTS.ISINCLUDEDINSERVICEDURATION},
{ dataKey: 'modificationContractTypeId', header: APP_CONSTANTS.MODIFICATIONCONTRACTTYPEID},
{ dataKey: 'day', header: APP_CONSTANTS.DAY},
{ dataKey: 'month', header: APP_CONSTANTS.MONTH},
{ dataKey: 'year', header: APP_CONSTANTS.YEAR},
{ dataKey: 'contractNumber', header: APP_CONSTANTS.CONTRACTNUMBER},
{ dataKey: 'modificationContractNumber', header: APP_CONSTANTS.MODIFICATIONCONTRACTNUMBER},
{ dataKey: 'contractTypeName', header: APP_CONSTANTS.CONTRACTTYPENAME},
{ dataKey: 'employeeName', header: APP_CONSTANTS.EMPLOYEENAME},
{ dataKey: 'financialImpactName', header: APP_CONSTANTS.FINANCIALIMPACTNAME},
{ dataKey: 'forcedVacationTypeName', header: APP_CONSTANTS.FORCEDVACATIONTYPENAME},
{ dataKey: 'modificationContractTypeName', header: APP_CONSTANTS.MODIFICATIONCONTRACTTYPENAME},
{ dataKey: 'vacationTypeName', header: APP_CONSTANTS.VACATIONTYPENAME},
    ]
  }

  submitEventHandler(eventData) {
    if (eventData.id) {
      this.empvacationService.UpdateEmpVacation(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.empvacationService.AddEmpVacation(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.empvacationService.DeleteEmpVacation(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.empvacationService.GetAllEmpVacations('').subscribe(
      (res) => {
        this.empvacations = res;
      }
    )
  }
}
