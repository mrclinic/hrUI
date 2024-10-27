import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { EvaluationGrade } from 'src/app/demo/models/constants/evaluationgrade.model';
import { AuthServiceService } from 'src/app/demo/service/common/auth-service.service';
import { EvaluationGradeService } from 'src/app/demo/service/constants/evaluationgrade.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';
import { ActionDef, TABLE_ACTION } from 'src/app/demo/shared/models/action-def';

@Component({
  selector: 'app-evaluationgrade',
  templateUrl: './evaluationgrade.component.html',
  styleUrls: ['./evaluationgrade.component.css']
})
export class EvaluationGradeComponent implements OnInit {
  cols: any[] = [];
  evaluationgrades: EvaluationGrade[] = [];
  formStructure: IFormStructure[] = [];
  canAdd: string = 'HR_EmpAssignment_CreateEmpAssignment';
  canEdit: string = 'HR_EmpAssignment_UpdateEmpAssignment';
  canSingleDelete: string = 'HR_EmpAssignment_DeleteEmpAssignment';
  tableActions: ActionDef[] = [];
  constructor(private readonly authServiceService: AuthServiceService, private messageService: MessageService,
    private readonly evaluationgradeService: EvaluationGradeService) {
    this.initColumns();
    this.initFormStructure();
    this.initActions();
  }

  ngOnInit(): void {
    this.evaluationgradeService.GetAllEvaluationGrades('').subscribe(
      (res) => {
        this.evaluationgrades = res
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
      this.evaluationgradeService.UpdateEvaluationGrade(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.evaluationgradeService.AddEvaluationGrade(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.evaluationgradeService.DeleteEvaluationGrade(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.evaluationgradeService.GetAllEvaluationGrades('').subscribe(
      (res) => {
        this.evaluationgrades = res;
      }
    )
  }
}
