import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { EvaluationGradeService } from 'src/app/demo/service/constants/evaluationgrade.service';
import { PromotionPercentageService } from 'src/app/demo/service/constants/promotionpercentage.service';
import { EmpPromotionService } from 'src/app/demo/service/employee/emppromotion.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-emppromotion',
  templateUrl: './emppromotion.component.html',
  styleUrls: ['./emppromotion.component.css']
})
export class EmpPromotionComponent implements OnInit {
  cols: any[] = [];
  emppromotions: any[] = [];
  formStructure: IFormStructure[] = [];
  fetched: boolean = false;
  filter: string;
  canAdd: string = '';
  canEdit: string = '';
  canSingleDelete: string = '';
  @Input() personId: string;
  evaluationGrades: any[] = [];
  promotionPercentages: any[] = [];

  constructor(private messageService: MessageService, private datePipe: DatePipe,
    private readonly emppromotionService: EmpPromotionService,
    private readonly evaluationGradeService: EvaluationGradeService,
    private readonly promotionPercentageService: PromotionPercentageService) {
    this.initColumns();
  }

  transformDate(date: string | number | Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    this.filter = `Filters=EmployeeId==${this.personId}`;
    forkJoin([this.emppromotionService.GetEmpPromotionsInfo(this.filter),
    this.evaluationGradeService.GetAllEvaluationGrades(''),
    this.promotionPercentageService.GetAllPromotionPercentages('')
    ])
      .subscribe(([emppromotions, evaluationGrades, promotionPercentages
      ]) => {
        this.emppromotions = this.mapItemList(emppromotions);

        this.evaluationGrades = evaluationGrades.map((item) => {
          return Object.assign(item, {
            label: item?.name,
            value: item?.id
          });
        });

        this.promotionPercentages = promotionPercentages.map((item) => {
          return Object.assign(item, {
            label: item?.name,
            value: item?.id
          });
        });
        this.initFormStructure();
        this.fetched = true;
      });
  }

  mapItemList(items: any[]): any[] {
    return items.map((item) => {
      return Object.assign(item, {
        ...item,
        evaluationGradeName: item?.evaluationGrade?.name,
        promotionPercentageName: item?.promotionPercentage?.name,
        promotionDate: this.transformDate(item?.promotionDate)
      });
    })
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
        format: 'yy-mm-dd'
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
      {
        type: 'text',
        label: APP_CONSTANTS.NOTE,
        name: 'note',
        value: '',
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
      { dataKey: 'promotionDate', header: APP_CONSTANTS.PROMOTIONDATE },
      { dataKey: 'promotionDuration', header: APP_CONSTANTS.PROMOTIONDURATION },
      { dataKey: 'evaluationGradeName', header: APP_CONSTANTS.EVALUATIONGRADE_NAME },
      { dataKey: 'newSalary', header: APP_CONSTANTS.NEWSALARY },
      { dataKey: 'bonusAmount', header: APP_CONSTANTS.BONUSAMOUNT },
      { dataKey: 'promotionPercentageName', header: APP_CONSTANTS.PROMOTIONPERCENTAGE_NAME },
      { dataKey: 'note', header: APP_CONSTANTS.NOTE }
    ]
  }

  submitEventHandler(eventData) {
    eventData = { ...eventData, employeeId: this.personId };
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
    this.filter = `Filters=EmployeeId==${this.personId}`;
    this.emppromotionService.GetEmpPromotionsInfo(this.filter).subscribe(
      (res) => {
        this.emppromotions = this.mapItemList(res);
      }
    )
  }
}
