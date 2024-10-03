import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { Qualification } from 'src/app/demo/models/constants/qualification.model';
import { QualificationService } from 'src/app/demo/service/constants/qualification.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-qualification',
  templateUrl: './qualification.component.html',
  styleUrls: ['./qualification.component.css']
})
export class QualificationComponent implements OnInit {
  cols: any[] = [];
  qualifications: Qualification[] = [];
  formStructure: IFormStructure[] = [];
  canAdd: string = 'HR_Qualification_CreateQualification';
  canEdit: string = 'HR_Qualification_UpdateQualification';
  canSingleDelete: string = 'HR_Qualification_DeleteQualification';

  constructor(private messageService: MessageService,
    private readonly qualificationService: QualificationService) {
    this.initColumns();
    this.initFormStructure();
  }

  ngOnInit(): void {
    this.qualificationService.GetAllQualifications('').subscribe(
      (res) => {
        this.qualifications = res
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
      this.qualificationService.UpdateQualification(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.qualificationService.AddQualification(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.qualificationService.DeleteQualification(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.qualificationService.GetAllQualifications('').subscribe(
      (res) => {
        this.qualifications = res;
      }
    )
  }
}
