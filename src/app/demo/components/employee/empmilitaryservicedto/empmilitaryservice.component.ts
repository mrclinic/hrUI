import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { EmpMilitaryService } from 'src/app/demo/models/employee/empmilitaryservice.model';
import { EmpMilitaryServiceService } from 'src/app/demo/service/employee/empmilitaryservice.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-empmilitaryservice',
  templateUrl: './empmilitaryservice.component.html',
  styleUrls: ['./empmilitaryservice.component.css']
})
export class EmpMilitaryServiceComponent implements OnInit {
  cols: any[] = [];
  empmilitaryservices: EmpMilitaryService[] = [];
  formStructure: IFormStructure[] = [];

  constructor(private messageService: MessageService,
    private readonly empmilitaryserviceService: EmpMilitaryServiceService) { }

  ngOnInit(): void {
    this.empmilitaryserviceService.GetAllEmpMilitaryServices('').subscribe(
      (res) => {
        this.empmilitaryservices = res;
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
        label: APP_CONSTANTS.MILITARYRANK_NAME,
        name: 'militaryRankId',
        value: '',
        options: [...this.militaryRanks],
        placeHolder: APP_CONSTANTS.MILITARYRANK_PLACE_HOLDER,
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
        label: APP_CONSTANTS.MILITARYSPECIALIZATION_NAME,
        name: 'militarySpecializationId',
        value: '',
        options: [...this.militarySpecializations],
        placeHolder: APP_CONSTANTS.MILITARYSPECIALIZATION_PLACE_HOLDER,
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
        label: APP_CONSTANTS.MILITARYNUMBER,
        name: 'militaryNumber',
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
        label: APP_CONSTANTS.RESERVENUMBER,
        name: 'reserveNumber',
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
        label: APP_CONSTANTS.COHORTNUMBER,
        name: 'cohortNumber',
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
        label: APP_CONSTANTS.RECRUITMENTBRANCH,
        name: 'recruitmentBranch',
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
        label: APP_CONSTANTS.RECRUITMENTNUMBER,
        name: 'recruitmentNumber',
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
{ dataKey: 'endDate', header: APP_CONSTANTS.ENDDATE},
{ dataKey: 'militaryRankId', header: APP_CONSTANTS.MILITARYRANKID},
{ dataKey: 'militaryRankName', header: APP_CONSTANTS.MILITARYRANKNAME},
{ dataKey: 'militarySpecializationId', header: APP_CONSTANTS.MILITARYSPECIALIZATIONID},
{ dataKey: 'militarySpecializationName', header: APP_CONSTANTS.MILITARYSPECIALIZATIONNAME},
{ dataKey: 'militaryNumber', header: APP_CONSTANTS.MILITARYNUMBER},
{ dataKey: 'reserveNumber', header: APP_CONSTANTS.RESERVENUMBER},
{ dataKey: 'cohortNumber', header: APP_CONSTANTS.COHORTNUMBER},
{ dataKey: 'recruitmentBranch', header: APP_CONSTANTS.RECRUITMENTBRANCH},
{ dataKey: 'recruitmentNumber', header: APP_CONSTANTS.RECRUITMENTNUMBER},
    ]
  }

  submitEventHandler(eventData) {
    if (eventData.id) {
      this.empmilitaryserviceService.UpdateEmpMilitaryService(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.empmilitaryserviceService.AddEmpMilitaryService(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.empmilitaryserviceService.DeleteEmpMilitaryService(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.empmilitaryserviceService.GetAllEmpMilitaryServices('').subscribe(
      (res) => {
        this.empmilitaryservices = res;
      }
    )
  }
}
