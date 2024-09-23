import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { DeputationStatus } from 'src/app/demo/models/constants/deputationstatus.model';
import { DeputationStatusService } from 'src/app/demo/service/constants/deputationstatus.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-deputationstatus',
  templateUrl: './deputationstatus.component.html',
  styleUrls: ['./deputationstatus.component.css']
})
export class DeputationStatusComponent implements OnInit {
  cols: any[] = [];
  deputationstatuss: DeputationStatus[] = [];
  formStructure: IFormStructure[] = [];

  constructor(private messageService: MessageService,
    private readonly deputationstatusService: DeputationStatusService) { }

  ngOnInit(): void {
    this.deputationstatusService.GetAllDeputationStatuss('').subscribe(
      (res) => {
        this.deputationstatuss = res;
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
      this.deputationstatusService.UpdateDeputationStatus(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.deputationstatusService.AddDeputationStatus(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.deputationstatusService.DeleteDeputationStatus(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.deputationstatusService.GetAllDeputationStatuss('').subscribe(
      (res) => {
        this.deputationstatuss = res;
      }
    )
  }
}
