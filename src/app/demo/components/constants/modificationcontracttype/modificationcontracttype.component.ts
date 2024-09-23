import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { ModificationContractType } from 'src/app/demo/models/constants/modificationcontracttype.model';
import { ModificationContractTypeService } from 'src/app/demo/service/constants/modificationcontracttype.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-modificationcontracttype',
  templateUrl: './modificationcontracttype.component.html',
  styleUrls: ['./modificationcontracttype.component.css']
})
export class ModificationContractTypeComponent implements OnInit {
  cols: any[] = [];
  modificationcontracttypes: ModificationContractType[] = [];
  formStructure: IFormStructure[] = [];

  constructor(private messageService: MessageService,
    private readonly modificationcontracttypeService: ModificationContractTypeService) {
    this.initColumns();
    this.initFormStructure();
  }

  ngOnInit(): void {
    this.modificationcontracttypeService.GetAllModificationContractTypes('').subscribe(
      (res) => {
        this.modificationcontracttypes = res
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
      this.modificationcontracttypeService.UpdateModificationContractType(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.modificationcontracttypeService.AddModificationContractType(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.modificationcontracttypeService.DeleteModificationContractType(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.modificationcontracttypeService.GetAllModificationContractTypes('').subscribe(
      (res) => {
        this.modificationcontracttypes = res;
      }
    )
  }
}
