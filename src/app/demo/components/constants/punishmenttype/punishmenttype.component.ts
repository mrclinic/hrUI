import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { PunishmentType } from 'src/app/demo/models/constants/punishmenttype.model';
import { PunishmentTypeService } from 'src/app/demo/service/constants/punishmenttype.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-punishmenttype',
  templateUrl: './punishmenttype.component.html',
  styleUrls: ['./punishmenttype.component.css']
})
export class PunishmentTypeComponent implements OnInit {
  cols: any[] = [];
  punishmenttypes: PunishmentType[] = [];
  formStructure: IFormStructure[] = [];

  constructor(private messageService: MessageService,
    private readonly punishmenttypeService: PunishmentTypeService) {
    this.initColumns();
    this.initFormStructure();
  }

  ngOnInit(): void {
    this.punishmenttypeService.GetAllPunishmentTypes('').subscribe(
      (res) => {
        this.punishmenttypes = res
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
      this.punishmenttypeService.UpdatePunishmentType(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.punishmenttypeService.AddPunishmentType(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.punishmenttypeService.DeletePunishmentType(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.punishmenttypeService.GetAllPunishmentTypes('').subscribe(
      (res) => {
        this.punishmenttypes = res;
      }
    )
  }
}
