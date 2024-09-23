import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { TerminationReason } from 'src/app/demo/models/constants/terminationreason.model';
import { TerminationReasonService } from 'src/app/demo/service/constants/terminationreason.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-terminationreason',
  templateUrl: './terminationreason.component.html',
  styleUrls: ['./terminationreason.component.css']
})
export class TerminationReasonComponent implements OnInit {
  cols: any[] = [];
  terminationreasons: TerminationReason[] = [];
  formStructure: IFormStructure[] = [];

  constructor(private messageService: MessageService,
    private readonly terminationreasonService: TerminationReasonService) {
    this.initColumns();
    this.initFormStructure();
  }

  ngOnInit(): void {
    this.terminationreasonService.GetAllTerminationReasons('').subscribe(
      (res) => {
        this.terminationreasons = res
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
      this.terminationreasonService.UpdateTerminationReason(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.terminationreasonService.AddTerminationReason(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.terminationreasonService.DeleteTerminationReason(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.terminationreasonService.GetAllTerminationReasons('').subscribe(
      (res) => {
        this.terminationreasons = res;
      }
    )
  }
}
