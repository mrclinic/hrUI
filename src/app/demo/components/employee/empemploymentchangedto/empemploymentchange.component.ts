import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { EmpEmploymentChange } from 'src/app/demo/models/employee/empemploymentchange.model';
import { EmpEmploymentChangeService } from 'src/app/demo/service/employee/empemploymentchange.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-empemploymentchange',
  templateUrl: './empemploymentchange.component.html',
  styleUrls: ['./empemploymentchange.component.css']
})
export class EmpEmploymentChangeComponent implements OnInit {
  cols: any[] = [];
  empemploymentchanges: EmpEmploymentChange[] = [];
  formStructure: IFormStructure[] = [];

  constructor(private messageService: MessageService,
    private readonly empemploymentchangeService: EmpEmploymentChangeService) { }

  ngOnInit(): void {
    this.empemploymentchangeService.GetAllEmpEmploymentChanges('').subscribe(
      (res) => {
        this.empemploymentchanges = res;
        this.initColumns();
        this.initFormStructure();
      }
    );
  }

  initFormStructure() {
    this.formStructure = [
{
        type: 'Date',
        label: APP_CONSTANTS.DATEOFAPPOINTMENTVISA,
        name: 'dateOfAppointmentVisa',
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
        label: APP_CONSTANTS.DATEOFSTART,
        name: 'dateOfStart',
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
        label: APP_CONSTANTS.DATEOFCHANGE,
        name: 'dateOfChange',
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
        label: APP_CONSTANTS.DATEOFCONTRACT,
        name: 'dateOfContract',
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
        label: APP_CONSTANTS.SALARY,
        name: 'salary',
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
        label: APP_CONSTANTS.INSURANCESALARY,
        name: 'insuranceSalary',
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
        label: APP_CONSTANTS.JOBCHANGEREASON_NAME,
        name: 'jobChangeReasonId',
        value: '',
        options: [...this.jobChangeReasons],
        placeHolder: APP_CONSTANTS.JOBCHANGEREASON_PLACE_HOLDER,
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
        type: 'select',
        label: APP_CONSTANTS.JOBTITLE_NAME,
        name: 'jobTitleId',
        value: '',
        options: [...this.jobTitles],
        placeHolder: APP_CONSTANTS.JOBTITLE_PLACE_HOLDER,
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
        label: APP_CONSTANTS.WORKPLACE,
        name: 'workplace',
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
        label: APP_CONSTANTS.VISANUMBER,
        name: 'visaNumber',
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
{ dataKey: 'dateOfAppointmentVisa', header: APP_CONSTANTS.DATEOFAPPOINTMENTVISA},
{ dataKey: 'dateOfStart', header: APP_CONSTANTS.DATEOFSTART},
{ dataKey: 'dateOfChange', header: APP_CONSTANTS.DATEOFCHANGE},
{ dataKey: 'dateOfContract', header: APP_CONSTANTS.DATEOFCONTRACT},
{ dataKey: 'salary', header: APP_CONSTANTS.SALARY},
{ dataKey: 'insuranceSalary', header: APP_CONSTANTS.INSURANCESALARY},
{ dataKey: 'jobChangeReasonId', header: APP_CONSTANTS.JOBCHANGEREASONID},
{ dataKey: 'jobChangeReasonName', header: APP_CONSTANTS.JOBCHANGEREASONNAME},
{ dataKey: 'modificationContractTypeId', header: APP_CONSTANTS.MODIFICATIONCONTRACTTYPEID},
{ dataKey: 'modificationContractTypeName', header: APP_CONSTANTS.MODIFICATIONCONTRACTTYPENAME},
{ dataKey: 'jobTitleId', header: APP_CONSTANTS.JOBTITLEID},
{ dataKey: 'jobTitleName', header: APP_CONSTANTS.JOBTITLENAME},
{ dataKey: 'workplace', header: APP_CONSTANTS.WORKPLACE},
{ dataKey: 'visaNumber', header: APP_CONSTANTS.VISANUMBER},
{ dataKey: 'contractNumber', header: APP_CONSTANTS.CONTRACTNUMBER},
    ]
  }

  submitEventHandler(eventData) {
    if (eventData.id) {
      this.empemploymentchangeService.UpdateEmpEmploymentChange(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.empemploymentchangeService.AddEmpEmploymentChange(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.empemploymentchangeService.DeleteEmpEmploymentChange(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.empemploymentchangeService.GetAllEmpEmploymentChanges('').subscribe(
      (res) => {
        this.empemploymentchanges = res;
      }
    )
  }
}
