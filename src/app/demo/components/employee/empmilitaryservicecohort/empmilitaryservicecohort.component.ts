import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { EmpMilitaryServiceCohort } from 'src/app/demo/models/employee/empmilitaryservicecohort.model';
import { EmpMilitaryServiceCohortService } from 'src/app/demo/service/employee/empmilitaryservicecohort.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-empmilitaryservicecohort',
  templateUrl: './empmilitaryservicecohort.component.html',
  styleUrls: ['./empmilitaryservicecohort.component.css']
})
export class EmpMilitaryServiceCohortComponent implements OnInit {
  cols: any[] = [];
  empmilitaryservicecohorts: EmpMilitaryServiceCohort[] = [];
  formStructure: IFormStructure[] = [];

  constructor(private messageService: MessageService,
    private readonly empmilitaryservicecohortService: EmpMilitaryServiceCohortService) { }

  ngOnInit(): void {
    this.empmilitaryservicecohortService.GetAllEmpMilitaryServiceCohorts('').subscribe(
      (res) => {
        this.empmilitaryservicecohorts = res;
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
        label: APP_CONSTANTS.STARTCONTRACTDATE,
        name: 'startContractDate',
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
        label: APP_CONSTANTS.ENDCONTRACTDATE,
        name: 'endContractDate',
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
        label: APP_CONSTANTS.STARTCONTRACTNUMBER,
        name: 'startContractNumber',
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
        label: APP_CONSTANTS.ENDCONTRACTNUMBER,
        name: 'endContractNumber',
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
{ dataKey: 'startContractDate', header: APP_CONSTANTS.STARTCONTRACTDATE},
{ dataKey: 'endDate', header: APP_CONSTANTS.ENDDATE},
{ dataKey: 'endContractDate', header: APP_CONSTANTS.ENDCONTRACTDATE},
{ dataKey: 'startContractNumber', header: APP_CONSTANTS.STARTCONTRACTNUMBER},
{ dataKey: 'endContractNumber', header: APP_CONSTANTS.ENDCONTRACTNUMBER},
    ]
  }

  submitEventHandler(eventData) {
    if (eventData.id) {
      this.empmilitaryservicecohortService.UpdateEmpMilitaryServiceCohort(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.empmilitaryservicecohortService.AddEmpMilitaryServiceCohort(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.empmilitaryservicecohortService.DeleteEmpMilitaryServiceCohort(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.empmilitaryservicecohortService.GetAllEmpMilitaryServiceCohorts('').subscribe(
      (res) => {
        this.empmilitaryservicecohorts = res;
      }
    )
  }
}
