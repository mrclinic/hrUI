import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { EmpEmploymentStatus } from 'src/app/demo/models/employee/empemploymentstatus.model';
import { EmpEmploymentStatusService } from 'src/app/demo/service/employee/empemploymentstatus.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-empemploymentstatus',
  templateUrl: './empemploymentstatus.component.html',
  styleUrls: ['./empemploymentstatus.component.css']
})
export class EmpEmploymentStatusComponent implements OnInit {
  cols: any[] = [];
  empemploymentstatuss: EmpEmploymentStatus[] = [];
  formStructure: IFormStructure[] = [];

  constructor(private messageService: MessageService,
    private readonly empemploymentstatusService: EmpEmploymentStatusService) { }

  ngOnInit(): void {
    this.empemploymentstatusService.GetAllEmpEmploymentStatuss('').subscribe(
      (res) => {
        this.empemploymentstatuss = res;
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
        type: 'select',
        label: APP_CONSTANTS.STARTINGTYPE_NAME,
        name: 'startingTypeId',
        value: '',
        options: [...this.startingTypes],
        placeHolder: APP_CONSTANTS.STARTINGTYPE_PLACE_HOLDER,
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
{ dataKey: 'startDate', header: APP_CONSTANTS.STARTDATE},
{ dataKey: 'contractDate', header: APP_CONSTANTS.CONTRACTDATE},
{ dataKey: 'startingTypeId', header: APP_CONSTANTS.STARTINGTYPEID},
{ dataKey: 'startingTypeName', header: APP_CONSTANTS.STARTINGTYPENAME},
{ dataKey: 'contractTypeId', header: APP_CONSTANTS.CONTRACTTYPEID},
{ dataKey: 'contractTypeName', header: APP_CONSTANTS.CONTRACTTYPENAME},
{ dataKey: 'contractNumber', header: APP_CONSTANTS.CONTRACTNUMBER},
    ]
  }

  submitEventHandler(eventData) {
    if (eventData.id) {
      this.empemploymentstatusService.UpdateEmpEmploymentStatus(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.empemploymentstatusService.AddEmpEmploymentStatus(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.empemploymentstatusService.DeleteEmpEmploymentStatus(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.empemploymentstatusService.GetAllEmpEmploymentStatuss('').subscribe(
      (res) => {
        this.empemploymentstatuss = res;
      }
    )
  }
}
