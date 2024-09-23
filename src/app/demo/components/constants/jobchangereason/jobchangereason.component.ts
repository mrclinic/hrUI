import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { JobChangeReason } from 'src/app/demo/models/constants/jobchangereason.model';
import { JobChangeReasonService } from 'src/app/demo/service/constants/jobchangereason.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-jobchangereason',
  templateUrl: './jobchangereason.component.html',
  styleUrls: ['./jobchangereason.component.css']
})
export class JobChangeReasonComponent implements OnInit {
  cols: any[] = [];
  jobchangereasons: JobChangeReason[] = [];
  formStructure: IFormStructure[] = [];

  constructor(private messageService: MessageService,
    private readonly jobchangereasonService: JobChangeReasonService) { }

  ngOnInit(): void {
    this.jobchangereasonService.GetAllJobChangeReasons('').subscribe(
      (res) => {
        this.jobchangereasons = res;
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
      this.jobchangereasonService.UpdateJobChangeReason(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.jobchangereasonService.AddJobChangeReason(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.jobchangereasonService.DeleteJobChangeReason(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.jobchangereasonService.GetAllJobChangeReasons('').subscribe(
      (res) => {
        this.jobchangereasons = res;
      }
    )
  }
}
