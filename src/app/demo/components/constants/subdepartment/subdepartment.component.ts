import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { SubDepartment } from 'src/app/demo/models/constants/subdepartment.model';
import { SubDepartmentService } from 'src/app/demo/service/constants/subdepartment.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-subdepartment',
  templateUrl: './subdepartment.component.html',
  styleUrls: ['./subdepartment.component.css']
})
export class SubDepartmentComponent implements OnInit {
  cols: any[] = [];
  subdepartments: SubDepartment[] = [];
  formStructure: IFormStructure[] = [];

  constructor(private messageService: MessageService,
    private readonly subdepartmentService: SubDepartmentService) {
    this.initColumns();
    this.initFormStructure();
  }

  ngOnInit(): void {
    this.subdepartmentService.GetAllSubDepartments('').subscribe(
      (res) => {
        this.subdepartments = res
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
      this.subdepartmentService.UpdateSubDepartment(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.subdepartmentService.AddSubDepartment(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.subdepartmentService.DeleteSubDepartment(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.subdepartmentService.GetAllSubDepartments('').subscribe(
      (res) => {
        this.subdepartments = res;
      }
    )
  }
}
