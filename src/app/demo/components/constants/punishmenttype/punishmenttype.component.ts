import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { FinancialImpactService } from 'src/app/demo/service/constants/financialimpact.service';
import { PunishmentTypeService } from 'src/app/demo/service/constants/punishmenttype.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-punishmenttype',
  templateUrl: './punishmenttype.component.html',
  styleUrls: ['./punishmenttype.component.css']
})
export class PunishmentTypeComponent implements OnInit {
  cols: any[] = [];
  punishmenttypes: any[] = [];
  formStructure: IFormStructure[] = [];
  canAdd: string = 'HR_PunishmentType_CreatePunishmentType';
  canEdit: string = 'HR_PunishmentType_UpdatePunishmentType';
  canSingleDelete: string = 'HR_PunishmentType_DeletePunishmentType';
  fetched: boolean = false;
  financialImpacts: any[] = [];
  constructor(private messageService: MessageService,
    private readonly punishmenttypeService: PunishmentTypeService,
    private readonly financialImpactService: FinancialImpactService) {
    this.initColumns();
  }

  ngOnInit(): void {
    forkJoin([this.punishmenttypeService.GetPunishmentTypesInfo(''),
    this.financialImpactService.GetAllFinancialImpacts('')]).subscribe(([res, financialImpacts]) => {
      this.punishmenttypes = this.mapItemList(res);
      this.financialImpacts = financialImpacts.map((item) => {
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
        ],
      },
      {
        type: 'select',
        label: APP_CONSTANTS.financialImpact_NAME,
        name: 'financialImpactId',
        value: '',
        options: [...this.financialImpacts],
        placeHolder: APP_CONSTANTS.financialImpact_PLACE_HOLDER,
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
      { dataKey: 'financialimpactName', header: APP_CONSTANTS.financialImpact_NAME, type: 'string' }
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
    this.punishmenttypeService.GetPunishmentTypesInfo('').subscribe(
      (res) => {
        this.punishmenttypes = this.mapItemList(res);
      }
    )
  }
  mapItemList(items) {
    return items.map((item) => {
      return Object.assign(item, {
        ...item,
        financialimpactName: item?.financialImpact?.name
      });
    })
  }
}
