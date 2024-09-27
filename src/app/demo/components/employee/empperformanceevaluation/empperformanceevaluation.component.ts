import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { EmpPerformanceEvaluation } from 'src/app/demo/models/employee/empperformanceevaluation.model';
import { EmpPerformanceEvaluationService } from 'src/app/demo/service/employee/empperformanceevaluation.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-empperformanceevaluation',
  templateUrl: './empperformanceevaluation.component.html',
  styleUrls: ['./empperformanceevaluation.component.css']
})
export class EmpPerformanceEvaluationComponent implements OnInit {
  cols: any[] = [];
  empperformanceevaluations: EmpPerformanceEvaluation[] = [];
  formStructure: IFormStructure[] = [];

  constructor(private messageService: MessageService,
    private readonly empperformanceevaluationService: EmpPerformanceEvaluationService) { }

  ngOnInit(): void {
    this.empperformanceevaluationService.GetAllEmpPerformanceEvaluations('').subscribe(
      (res) => {
        this.empperformanceevaluations = res;
        this.initColumns();
        this.initFormStructure();
      }
    );
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
        ],
      },
    ];
  }

  initColumns() {
    this.cols = [
{ dataKey: 'reportDate', header: APP_CONSTANTS.REPORTDATE},
{ dataKey: 'promotionDate', header: APP_CONSTANTS.PROMOTIONDATE},
{ dataKey: 'evaluationGradeId', header: APP_CONSTANTS.EVALUATIONGRADEID},
{ dataKey: 'evaluationGradeName', header: APP_CONSTANTS.EVALUATIONGRADENAME},
{ dataKey: 'evaluationQuarterId', header: APP_CONSTANTS.EVALUATIONQUARTERID},
{ dataKey: 'evaluationQuarterName', header: APP_CONSTANTS.EVALUATIONQUARTERNAME},
{ dataKey: 'reportNumber', header: APP_CONSTANTS.REPORTNUMBER},
    ]
  }

  submitEventHandler(eventData) {
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
    this.empperformanceevaluationService.GetAllEmpPerformanceEvaluations('').subscribe(
      (res) => {
        this.empperformanceevaluations = res;
      }
    )
  }
}
