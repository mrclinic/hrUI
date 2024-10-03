import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { PromotionPercentage } from 'src/app/demo/models/constants/promotionpercentage.model';
import { PromotionPercentageService } from 'src/app/demo/service/constants/promotionpercentage.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

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

  constructor(private messageService: MessageService,
    private readonly promotionpercentageService: PromotionPercentageService) {
    this.initColumns();
    this.initFormStructure();
  }

  ngOnInit(): void {
    this.promotionpercentageService.GetAllPromotionPercentages('').subscribe(
      (res) => {
        this.promotionpercentages = res
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
