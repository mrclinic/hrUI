import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { EmpPromotion } from 'src/app/demo/models/employee/emppromotion.model';
import { EmpPromotionService } from 'src/app/demo/service/employee/emppromotion.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-emppromotion',
  templateUrl: './emppromotion.component.html',
  styleUrls: ['./emppromotion.component.css']
})
export class EmpPromotionComponent implements OnInit {
  cols: any[] = [];
  emppromotions: EmpPromotion[] = [];
  formStructure: IFormStructure[] = [];

  constructor(private messageService: MessageService,
    private readonly emppromotionService: EmpPromotionService) { }

  ngOnInit(): void {
    this.emppromotionService.GetAllEmpPromotions('').subscribe(
      (res) => {
        this.emppromotions = res;
        this.initColumns();
        this.initFormStructure();
      }
    );
  }

  initFormStructure() {
    this.formStructure = [
{
        type: 'Date',
        label: APP_CONSTANTS.PROMOTIONDATE,
        name: 'promotionDate',
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
        type: 'number',
        label: APP_CONSTANTS.PROMOTIONDURATION,
        name: 'promotionDuration',
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
        label: APP_CONSTANTS.EVALUATIONGRADE_NAME,
        name: 'evaluationGradeId',
        value: '',
        options: [...this.evaluationGrades],
        placeHolder: APP_CONSTANTS.EVALUATIONGRADE_PLACE_HOLDER,
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: APP_CONSTANTS.FIELD_REQUIRED,
          },
        ],
      },
{
        type: 'number',
        label: APP_CONSTANTS.NEWSALARY,
        name: 'newSalary',
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
        type: 'number',
        label: APP_CONSTANTS.BONUSAMOUNT,
        name: 'bonusAmount',
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
        label: APP_CONSTANTS.PROMOTIONPERCENTAGE_NAME,
        name: 'promotionPercentageId',
        value: '',
        options: [...this.promotionPercentages],
        placeHolder: APP_CONSTANTS.PROMOTIONPERCENTAGE_PLACE_HOLDER,
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: APP_CONSTANTS.FIELD_REQUIRED,
          },
        ],
      },
    ];
  }

  initColumns() {
    this.cols = [
{ dataKey: 'promotionDate', header: APP_CONSTANTS.PROMOTIONDATE},
{ dataKey: 'promotionDuration', header: APP_CONSTANTS.PROMOTIONDURATION},
{ dataKey: 'evaluationGradeId', header: APP_CONSTANTS.EVALUATIONGRADEID},
{ dataKey: 'evaluationGradeName', header: APP_CONSTANTS.EVALUATIONGRADENAME},
{ dataKey: 'newSalary', header: APP_CONSTANTS.NEWSALARY},
{ dataKey: 'bonusAmount', header: APP_CONSTANTS.BONUSAMOUNT},
{ dataKey: 'promotionPercentageId', header: APP_CONSTANTS.PROMOTIONPERCENTAGEID},
{ dataKey: 'promotionPercentageName', header: APP_CONSTANTS.PROMOTIONPERCENTAGENAME},
    ]
  }

  submitEventHandler(eventData) {
    if (eventData.id) {
      this.emppromotionService.UpdateEmpPromotion(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.emppromotionService.AddEmpPromotion(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.emppromotionService.DeleteEmpPromotion(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.emppromotionService.GetAllEmpPromotions('').subscribe(
      (res) => {
        this.emppromotions = res;
      }
    )
  }
}
