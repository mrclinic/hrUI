import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { JobTitle } from 'src/app/demo/models/constants/jobtitle.model';
import { JobTitleService } from 'src/app/demo/service/constants/jobtitle.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-jobtitle',
  templateUrl: './jobtitle.component.html',
  styleUrls: ['./jobtitle.component.css']
})
export class JobTitleComponent implements OnInit {
  cols: any[] = [];
  jobtitles: JobTitle[] = [];
  formStructure: IFormStructure[] = [];

  constructor(private messageService: MessageService,
    private readonly jobtitleService: JobTitleService) {
    this.initColumns();
    this.initFormStructure();
  }

  ngOnInit(): void {
    this.jobtitleService.GetAllJobTitles('').subscribe(
      (res) => {
        this.jobtitles = res
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
      this.jobtitleService.UpdateJobTitle(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.jobtitleService.AddJobTitle(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.jobtitleService.DeleteJobTitle(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.jobtitleService.GetAllJobTitles('').subscribe(
      (res) => {
        this.jobtitles = res;
      }
    )
  }
}
