import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { EmpAssignment } from 'src/app/demo/models/employee/empassignment.model';
import { EmpAssignmentService } from 'src/app/demo/service/employee/empassignment.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-empassignment',
  templateUrl: './empassignment.component.html',
  styleUrls: ['./empassignment.component.css']
})
export class EmpAssignmentComponent implements OnInit {
  cols: any[] = [];
  empassignments: EmpAssignment[] = [];
  formStructure: IFormStructure[] = [];

  constructor(private messageService: MessageService,
    private readonly empassignmentService: EmpAssignmentService) { }

  ngOnInit(): void {
    this.empassignmentService.GetAllEmpAssignments('').subscribe(
      (res) => {
        this.empassignments = res;
        this.initColumns();
        this.initFormStructure();
      }
    );
  }

  initFormStructure() {
    this.formStructure = [
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
        label: APP_CONSTANTS.ASSIGNEDWORK,
        name: 'assignedWork',
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
{ dataKey: 'contractDate', header: APP_CONSTANTS.CONTRACTDATE},
{ dataKey: 'startDate', header: APP_CONSTANTS.STARTDATE},
{ dataKey: 'endDate', header: APP_CONSTANTS.ENDDATE},
{ dataKey: 'contractTypeId', header: APP_CONSTANTS.CONTRACTTYPEID},
{ dataKey: 'contractTypeName', header: APP_CONSTANTS.CONTRACTTYPENAME},
{ dataKey: 'assignedWork', header: APP_CONSTANTS.ASSIGNEDWORK},
{ dataKey: 'contractNumber', header: APP_CONSTANTS.CONTRACTNUMBER},
    ]
  }

  submitEventHandler(eventData) {
    if (eventData.id) {
      this.empassignmentService.UpdateEmpAssignment(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.empassignmentService.AddEmpAssignment(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.empassignmentService.DeleteEmpAssignment(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.empassignmentService.GetAllEmpAssignments('').subscribe(
      (res) => {
        this.empassignments = res;
      }
    )
  }
}
