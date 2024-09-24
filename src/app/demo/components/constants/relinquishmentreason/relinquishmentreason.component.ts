import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { RelinquishmentReason } from 'src/app/demo/models/constants/relinquishmentreason.model';
import { RelinquishmentReasonService } from 'src/app/demo/service/constants/relinquishmentreason.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-relinquishmentreason',
  templateUrl: './relinquishmentreason.component.html',
  styleUrls: ['./relinquishmentreason.component.css']
})
export class RelinquishmentReasonComponent implements OnInit {
  cols: any[] = [];
  relinquishmentreasons: RelinquishmentReason[] = [];
  formStructure: IFormStructure[] = [];
  canAdd: string = '';
  canEdit: string = '';
  canSingleDelete: string = '';

  constructor(private messageService: MessageService,
    private readonly relinquishmentreasonService: RelinquishmentReasonService) {
    this.initColumns();
    this.initFormStructure();
  }

  ngOnInit(): void {
    this.relinquishmentreasonService.GetAllRelinquishmentReasons('').subscribe(
      (res) => {
        this.relinquishmentreasons = res
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
      this.relinquishmentreasonService.UpdateRelinquishmentReason(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.relinquishmentreasonService.AddRelinquishmentReason(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.relinquishmentreasonService.DeleteRelinquishmentReason(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.relinquishmentreasonService.GetAllRelinquishmentReasons('').subscribe(
      (res) => {
        this.relinquishmentreasons = res;
      }
    )
  }
}
