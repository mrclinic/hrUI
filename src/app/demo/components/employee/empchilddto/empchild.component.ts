import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { EmpChild } from 'src/app/demo/models/employee/empchild.model';
import { EmpChildService } from 'src/app/demo/service/employee/empchild.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-empchild',
  templateUrl: './empchild.component.html',
  styleUrls: ['./empchild.component.css']
})
export class EmpChildComponent implements OnInit {
  cols: any[] = [];
  empchilds: EmpChild[] = [];
  formStructure: IFormStructure[] = [];

  constructor(private messageService: MessageService,
    private readonly empchildService: EmpChildService) { }

  ngOnInit(): void {
    this.empchildService.GetAllEmpChilds('').subscribe(
      (res) => {
        this.empchilds = res;
        this.initColumns();
        this.initFormStructure();
      }
    );
  }

  initFormStructure() {
    this.formStructure = [
{
        type: 'Date',
        label: APP_CONSTANTS.BIRTHDATE,
        name: 'birthDate',
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
        label: APP_CONSTANTS.OCCURRENCEDATE,
        name: 'occurrenceDate',
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
        label: APP_CONSTANTS.CHILDORDER,
        name: 'childOrder',
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
        label: APP_CONSTANTS.GENDER_NAME,
        name: 'genderId',
        value: '',
        options: [...this.genders],
        placeHolder: APP_CONSTANTS.GENDER_PLACE_HOLDER,
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
        label: APP_CONSTANTS.STATUS_NAME,
        name: 'statusId',
        value: '',
        options: [...this.statuss],
        placeHolder: APP_CONSTANTS.STATUS_PLACE_HOLDER,
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
      },
{
        type: 'text',
        label: APP_CONSTANTS.MOTHERNAME,
        name: 'motherName',
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
        label: APP_CONSTANTS.OCCURRENCECONTRACTNUMBER,
        name: 'occurrenceContractNumber',
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
{ dataKey: 'birthDate', header: APP_CONSTANTS.BIRTHDATE},
{ dataKey: 'occurrenceDate', header: APP_CONSTANTS.OCCURRENCEDATE},
{ dataKey: 'childOrder', header: APP_CONSTANTS.CHILDORDER},
{ dataKey: 'genderId', header: APP_CONSTANTS.GENDERID},
{ dataKey: 'genderName', header: APP_CONSTANTS.GENDERNAME},
{ dataKey: 'statusId', header: APP_CONSTANTS.STATUSID},
{ dataKey: 'childStatusName', header: APP_CONSTANTS.CHILDSTATUSNAME},
{ dataKey: 'name', header: APP_CONSTANTS.NAME},
{ dataKey: 'motherName', header: APP_CONSTANTS.MOTHERNAME},
{ dataKey: 'occurrenceContractNumber', header: APP_CONSTANTS.OCCURRENCECONTRACTNUMBER},
    ]
  }

  submitEventHandler(eventData) {
    if (eventData.id) {
      this.empchildService.UpdateEmpChild(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.empchildService.AddEmpChild(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.empchildService.DeleteEmpChild(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.empchildService.GetAllEmpChilds('').subscribe(
      (res) => {
        this.empchilds = res;
      }
    )
  }
}
