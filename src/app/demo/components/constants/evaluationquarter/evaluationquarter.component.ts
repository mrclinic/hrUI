import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { EvaluationQuarter } from 'src/app/demo/models/constants/evaluationquarter.model';
import { EvaluationQuarterService } from 'src/app/demo/service/constants/evaluationquarter.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-evaluationquarter',
  templateUrl: './evaluationquarter.component.html',
  styleUrls: ['./evaluationquarter.component.css']
})
export class EvaluationQuarterComponent implements OnInit {
  cols: any[] = [];
  evaluationquarters: EvaluationQuarter[] = [];
  formStructure: IFormStructure[] = [];

  constructor(private messageService: MessageService,
    private readonly evaluationquarterService: EvaluationQuarterService) { }

  ngOnInit(): void {
    this.evaluationquarterService.GetAllEvaluationQuarters('').subscribe(
      (res) => {
        this.evaluationquarters = res;
        this.initColumns();
        this.initFormStructure();
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
      this.evaluationquarterService.UpdateEvaluationQuarter(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.evaluationquarterService.AddEvaluationQuarter(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.evaluationquarterService.DeleteEvaluationQuarter(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.evaluationquarterService.GetAllEvaluationQuarters('').subscribe(
      (res) => {
        this.evaluationquarters = res;
      }
    )
  }
}
