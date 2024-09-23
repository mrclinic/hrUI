import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { OccurrencePartnerType } from 'src/app/demo/models/constants/occurrencepartnertype.model';
import { OccurrencePartnerTypeService } from 'src/app/demo/service/constants/occurrencepartnertype.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-occurrencepartnertype',
  templateUrl: './occurrencepartnertype.component.html',
  styleUrls: ['./occurrencepartnertype.component.css']
})
export class OccurrencePartnerTypeComponent implements OnInit {
  cols: any[] = [];
  occurrencepartnertypes: OccurrencePartnerType[] = [];
  formStructure: IFormStructure[] = [];

  constructor(private messageService: MessageService,
    private readonly occurrencepartnertypeService: OccurrencePartnerTypeService) { }

  ngOnInit(): void {
    this.occurrencepartnertypeService.GetAllOccurrencePartnerTypes('').subscribe(
      (res) => {
        this.occurrencepartnertypes = res;
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
      this.occurrencepartnertypeService.UpdateOccurrencePartnerType(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.occurrencepartnertypeService.AddOccurrencePartnerType(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.occurrencepartnertypeService.DeleteOccurrencePartnerType(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.occurrencepartnertypeService.GetAllOccurrencePartnerTypes('').subscribe(
      (res) => {
        this.occurrencepartnertypes = res;
      }
    )
  }
}
