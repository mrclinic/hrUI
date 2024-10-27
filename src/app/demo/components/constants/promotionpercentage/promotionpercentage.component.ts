import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { PromotionPercentage } from 'src/app/demo/models/constants/promotionpercentage.model';
import { AuthServiceService } from 'src/app/demo/service/common/auth-service.service';
import { PromotionPercentageService } from 'src/app/demo/service/constants/promotionpercentage.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';
import { ActionDef, TABLE_ACTION } from 'src/app/demo/shared/models/action-def';

@Component({
  selector: 'app-promotionpercentage',
  templateUrl: './promotionpercentage.component.html',
  styleUrls: ['./promotionpercentage.component.css']
})
export class PromotionPercentageComponent implements OnInit {
  cols: any[] = [];
  promotionpercentages: PromotionPercentage[] = [];
  formStructure: IFormStructure[] = [];
  canAdd: string = 'HR_PromotionPercentage_CreatePromotionPercentage';
  canEdit: string = 'HR_PromotionPercentage_UpdatePromotionPercentage';
  canSingleDelete: string = 'HR_PromotionPercentage_DeletePromotionPercentage';
  tableActions: ActionDef[] = [];
  constructor(private readonly authServiceService: AuthServiceService, private messageService: MessageService,
    private readonly promotionpercentageService: PromotionPercentageService) {
    this.initColumns();
    this.initFormStructure();
    this.initActions();
  }

  ngOnInit(): void {
    this.promotionpercentageService.GetAllPromotionPercentages('').subscribe(
      (res) => {
        this.promotionpercentages = res
      }
    );
  }

  initActions() {
    this.tableActions = [
      {
        visible: this.authServiceService.checkPermission(this.canEdit),
        type: TABLE_ACTION.EDIT,
      },
      {
        visible: this.authServiceService.checkPermission(this.canAdd),
        type: TABLE_ACTION.Add,
      },
      {
        visible: this.authServiceService.checkPermission(this.canSingleDelete),
        type: TABLE_ACTION.DELETE,
      }
    ]
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
      this.promotionpercentageService.UpdatePromotionPercentage(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.promotionpercentageService.AddPromotionPercentage(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.promotionpercentageService.DeletePromotionPercentage(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.promotionpercentageService.GetAllPromotionPercentages('').subscribe(
      (res) => {
        this.promotionpercentages = res;
      }
    )
  }
}
