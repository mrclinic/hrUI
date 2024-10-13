import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { EvaluationGradeService } from 'src/app/demo/service/constants/evaluationgrade.service';
import { EvaluationQuarterService } from 'src/app/demo/service/constants/evaluationquarter.service';
import { EmpPerformanceEvaluationService } from 'src/app/demo/service/employee/empperformanceevaluation.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-empperformanceevaluation',
  templateUrl: './empperformanceevaluation.component.html',
  styleUrls: ['./empperformanceevaluation.component.css']
})
export class EmpPerformanceEvaluationComponent implements OnInit {
  cols: any[] = [];
  empperformanceevaluations: any[] = [];
  formStructure: IFormStructure[] = [];
  evaluationGrades: any[] = [];
  evaluationQuarters: any[] = [];
  fetched: boolean = false;
  filter: string;
  canAdd: string = 'HR_EmpPerformanceEvaluation_CreateEmpPerformanceEvaluation';
  canEdit: string = 'HR_EmpPerformanceEvaluation_UpdateEmpPerformanceEvaluation';
  canSingleDelete: string = 'HR_EmpPerformanceEvaluation_DeleteEmpPerformanceEvaluation';
  @Input() personId: string;
  constructor(private messageService: MessageService, private datePipe: DatePipe,
    private readonly empperformanceevaluationService: EmpPerformanceEvaluationService,
    private readonly evaluationGradeService: EvaluationGradeService,
    private readonly evaluationQuarterService: EvaluationQuarterService
  ) {
    this.initColumns();
  }

  transformDate(date: string | number | Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
  ngOnInit(): void {
    this.filter = `Filters=EmployeeId==${this.personId}`;
    forkJoin([this.empperformanceevaluationService.GetEmpPerformanceEvaluationsInfo(this.filter),
    this.evaluationGradeService.GetAllEvaluationGrades(''),
    this.evaluationQuarterService.GetAllEvaluationQuarters('')
    ])
      .subscribe(([empperformanceevaluations, evaluationGrades, evaluationQuarters
      ]) => {
        this.empperformanceevaluations = this.mapItemList(empperformanceevaluations);

        this.evaluationGrades = evaluationGrades.map((item) => {
          return Object.assign(item, {
            label: item?.name,
            value: item?.id
          });
        });

        this.evaluationQuarters = evaluationQuarters.map((item) => {
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
        evaluationQuarterName: item?.evaluationQuarter?.name,
        reportDate: this.transformDate(item?.reportDate),
        promotionDate: this.transformDate(item?.promotionDate)
      });
    })
  }

  initFormStructure() {
    this.formStructure = [
      {
        type: 'Date',
        label: APP_CONSTANTS.REPORTDATE,
        name: 'reportDate',
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
        type: 'select',
        label: APP_CONSTANTS.EVALUATIONQUARTER_NAME,
        name: 'evaluationQuarterId',
        value: '',
        options: [...this.evaluationQuarters],
        placeHolder: APP_CONSTANTS.EVALUATIONQUARTER_PLACE_HOLDER,
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
        label: APP_CONSTANTS.REPORTNUMBER,
        name: 'reportNumber',
        value: '',
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: APP_CONSTANTS.FIELD_REQUIRED,
          },
          {
            name: 'maxlength',
            validator: 'maxlength',
            message: APP_CONSTANTS.FIELD_MAX_LENGTH,
            value: 255
          }
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
      { dataKey: 'reportDate', header: APP_CONSTANTS.REPORTDATE },
      { dataKey: 'promotionDate', header: APP_CONSTANTS.PROMOTIONDATE },
      { dataKey: 'evaluationGradeName', header: APP_CONSTANTS.EVALUATIONGRADE_NAME },
      { dataKey: 'evaluationQuarterName', header: APP_CONSTANTS.EVALUATIONQUARTER_NAME },
      { dataKey: 'reportNumber', header: APP_CONSTANTS.REPORTNUMBER },
      { dataKey: 'note', header: APP_CONSTANTS.NOTE }
    ]
  }

  submitEventHandler(eventData) {
    eventData = { ...eventData, employeeId: this.personId };
    if (eventData.id) {
      this.empperformanceevaluationService.UpdateEmpPerformanceEvaluation(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.empperformanceevaluationService.AddEmpPerformanceEvaluation(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.empperformanceevaluationService.DeleteEmpPerformanceEvaluation(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.filter = `Filters=EmployeeId==${this.personId}`;
    this.empperformanceevaluationService.GetEmpPerformanceEvaluationsInfo(this.filter).subscribe(
      (res) => {
        this.empperformanceevaluations = this.mapItemList(res);
      }
    )
  }
}
