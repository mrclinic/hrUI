import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { JobChangeReasonService } from 'src/app/demo/service/constants/jobchangereason.service';
import { ModificationContractTypeService } from 'src/app/demo/service/constants/modificationcontracttype.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-jobchangereason',
  templateUrl: './jobchangereason.component.html',
  styleUrls: ['./jobchangereason.component.css']
})
export class JobChangeReasonComponent implements OnInit {
  cols: any[] = [];
  jobchangereasons: any[] = [];
  formStructure: IFormStructure[] = [];
  fetched: boolean = false;
  modificationContractTypes: any[] = [];
  constructor(private messageService: MessageService,
    private readonly jobchangereasonService: JobChangeReasonService,
    private readonly modificationContractTypeService: ModificationContractTypeService) {
    this.initColumns();
  }

  ngOnInit(): void {
    forkJoin([this.jobchangereasonService.GetJobChangeReasonsInfo(''),
    this.modificationContractTypeService.GetAllModificationContractTypes('')]).subscribe(([res, modificationContractTypes]) => {
      this.jobchangereasons = this.mapItemList(res);
      this.modificationContractTypes = modificationContractTypes.map((item) => {
        return Object.assign(item, {
          label: item?.name,
          value: item?.id
        });
      })
      this.initFormStructure();
      this.fetched = true;
    })
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
        ]
      },
      {
        type: 'select',
        label: APP_CONSTANTS.ModificationContractType_NAME,
        name: 'modificationContractTypeId',
        value: '',
        options: [...this.modificationContractTypes],
        placeHolder: APP_CONSTANTS.ModificationContractType_PLACE_HOLDER,
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
      { dataKey: 'name', header: APP_CONSTANTS.NAME, type: 'string' },
      { dataKey: 'modificationcontracttypeName', header: APP_CONSTANTS.ModificationContractType_NAME, type: 'string' }
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
    this.jobchangereasonService.GetJobChangeReasonsInfo('').subscribe(
      (res) => {
        this.jobchangereasons = this.mapItemList(res);
      }
    )
  }
  mapItemList(items) {
    return items.map((item) => {
      return Object.assign(item, {
        ...item,
        modificationcontracttypeName: item?.modificationContractType?.name
      });
    })
  }
}
