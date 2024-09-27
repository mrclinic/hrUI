import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { EmpRelinquishment } from 'src/app/demo/models/employee/emprelinquishment.model';
import { EmpRelinquishmentService } from 'src/app/demo/service/employee/emprelinquishment.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-emprelinquishment',
  templateUrl: './emprelinquishment.component.html',
  styleUrls: ['./emprelinquishment.component.css']
})
export class EmpRelinquishmentComponent implements OnInit {
  cols: any[] = [];
  emprelinquishments: EmpRelinquishment[] = [];
  formStructure: IFormStructure[] = [];

  constructor(private messageService: MessageService,
    private readonly emprelinquishmentService: EmpRelinquishmentService) { }

  ngOnInit(): void {
    this.emprelinquishmentService.GetAllEmpRelinquishments('').subscribe(
      (res) => {
        this.emprelinquishments = res;
        this.initColumns();
        this.initFormStructure();
      }
    );
  }

  initFormStructure() {
    this.formStructure = [
{
        type: 'Date',
        label: APP_CONSTANTS.RELINQUISHMENTDATE,
        name: 'relinquishmentDate',
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
        label: APP_CONSTANTS.RELINQUISHMENTREASON_NAME,
        name: 'relinquishmentReasonId',
        value: '',
        options: [...this.relinquishmentReasons],
        placeHolder: APP_CONSTANTS.RELINQUISHMENTREASON_PLACE_HOLDER,
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
{
        type: 'text',
        label: APP_CONSTANTS.NOTE,
        name: 'note',
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
        label: APP_CONSTANTS.EMPLOYEE_NAME,
        name: 'employeeId',
        value: '',
        options: [...this.employees],
        placeHolder: APP_CONSTANTS.EMPLOYEE_PLACE_HOLDER,
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
{ dataKey: 'relinquishmentDate', header: APP_CONSTANTS.RELINQUISHMENTDATE},
{ dataKey: 'contractDate', header: APP_CONSTANTS.CONTRACTDATE},
{ dataKey: 'relinquishmentReasonId', header: APP_CONSTANTS.RELINQUISHMENTREASONID},
{ dataKey: 'contractTypeId', header: APP_CONSTANTS.CONTRACTTYPEID},
{ dataKey: 'contractNumber', header: APP_CONSTANTS.CONTRACTNUMBER},
{ dataKey: 'note', header: APP_CONSTANTS.NOTE},
{ dataKey: 'employeeId', header: APP_CONSTANTS.EMPLOYEEID},
{ dataKey: 'contractTypeName', header: APP_CONSTANTS.CONTRACTTYPENAME},
{ dataKey: 'relinquishmentReasonName', header: APP_CONSTANTS.RELINQUISHMENTREASONNAME},
    ]
  }

  submitEventHandler(eventData) {
    if (eventData.id) {
      this.emprelinquishmentService.UpdateEmpRelinquishment(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.emprelinquishmentService.AddEmpRelinquishment(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.emprelinquishmentService.DeleteEmpRelinquishment(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.emprelinquishmentService.GetAllEmpRelinquishments('').subscribe(
      (res) => {
        this.emprelinquishments = res;
      }
    )
  }
}
