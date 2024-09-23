import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { EmploymentStatusType } from 'src/app/demo/models/constants/employmentstatustype.model';
import { EmploymentStatusTypeService } from 'src/app/demo/service/constants/employmentstatustype.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-employmentstatustype',
  templateUrl: './employmentstatustype.component.html',
  styleUrls: ['./employmentstatustype.component.css']
})
export class EmploymentStatusTypeComponent implements OnInit {
  cols: any[] = [];
  employmentstatustypes: EmploymentStatusType[] = [];
  formStructure: IFormStructure[] = [];

  constructor(private messageService: MessageService,
    private readonly employmentstatustypeService: EmploymentStatusTypeService) { }

  ngOnInit(): void {
    this.employmentstatustypeService.GetAllEmploymentStatusTypes('').subscribe(
      (res) => {
        this.employmentstatustypes = res;
        this.initColumns();
        this.initFormStructure();
      }
    );
  }

  initFormStructure() {
    this.formStructure = [
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
      }
    ];
  }

  initColumns() {
    this.cols = [
      { dataKey: 'name', header: APP_CONSTANTS.NAME, type: 'string' }
    ]
  }

  submitEventHandler(eventData) {
    if (eventData.id) {
      this.employmentstatustypeService.UpdateEmploymentStatusType(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.employmentstatustypeService.AddEmploymentStatusType(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.employmentstatustypeService.DeleteEmploymentStatusType(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.employmentstatustypeService.GetAllEmploymentStatusTypes('').subscribe(
      (res) => {
        this.employmentstatustypes = res;
      }
    )
  }
}
