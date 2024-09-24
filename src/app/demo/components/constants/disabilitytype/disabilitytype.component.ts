import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { DisabilityType } from 'src/app/demo/models/constants/disabilitytype.model';
import { DisabilityTypeService } from 'src/app/demo/service/constants/disabilitytype.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-disabilitytype',
  templateUrl: './disabilitytype.component.html',
  styleUrls: ['./disabilitytype.component.css']
})
export class DisabilityTypeComponent implements OnInit {
  cols: any[] = [];
  disabilitytypes: DisabilityType[] = [];
  formStructure: IFormStructure[] = [];
  canAdd: string = '';
  canEdit: string = '';
  canSingleDelete: string = '';

  constructor(private messageService: MessageService,
    private readonly disabilitytypeService: DisabilityTypeService) {
    this.initColumns();
    this.initFormStructure();
  }

  ngOnInit(): void {
    this.disabilitytypeService.GetAllDisabilityTypes('').subscribe(
      (res) => {
        this.disabilitytypes = res
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
      this.disabilitytypeService.UpdateDisabilityType(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.disabilitytypeService.AddDisabilityType(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.disabilitytypeService.DeleteDisabilityType(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.disabilitytypeService.GetAllDisabilityTypes('').subscribe(
      (res) => {
        this.disabilitytypes = res;
      }
    )
  }
}
