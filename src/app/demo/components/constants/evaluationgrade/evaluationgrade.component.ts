import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { EvaluationGrade } from 'src/app/demo/models/constants/evaluationgrade.model';
import { EvaluationGradeService } from 'src/app/demo/service/constants/evaluationgrade.service';

@Component({
  selector: 'app-evaluationgrade',
  templateUrl: './evaluationgrade.component.html',
  styleUrls: ['./evaluationgrade.component.css']
})
export class EvaluationGradeComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  cols: any[];
  CancelReason: string = '';
  ConfirmTitle: string = '';
  ConfirmMsg: string = '';
  Success: string = '';
  deleteSuccess: string = '';
  Yes: string = '';
  No: string = '';
  editSuccess: string = '';
  addSuccess: string = '';
  evaluationgradeForm: FormGroup;
  name: string = '';
  evaluationgradeDialog: boolean = false;

  deleteEvaluationGradeDialog: boolean = false;

  deleteEvaluationGradesDialog: boolean = false;

  evaluationgrades: EvaluationGrade[] = [];

  EvaluationGrade: EvaluationGrade = {};

  selectedEvaluationGrades: EvaluationGrade[] = [];
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService, private readonly evaluationgradeService: EvaluationGradeService) {
    this.evaluationgradeForm = this.fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.evaluationgradeService.GetAllEvaluationGrades('').subscribe(
      (res) => {
        this.evaluationgrades = res;
      }
    );
    this.translate.get('AppTitle').subscribe(
      () => {
        this.CancelReason = this.translate.instant('CancelReason');
        this.ConfirmTitle = this.translate.instant('ConfirmTitle');
        this.ConfirmMsg = this.translate.instant('ConfirmMsg');
        this.Success = this.translate.instant('Success');
        this.deleteSuccess = this.translate.instant('deleteSuccess');
        this.Yes = this.translate.instant('Yes');
        this.No = this.translate.instant('No');
        this.editSuccess = this.translate.instant('editSuccess');
        this.addSuccess = this.translate.instant('addSuccess');
        this.initColumns();
      }
    )
  }
  initColumns() {
    this.cols = [
      { field: 'name', header: "الاسم", type: 'string' }
    ]
  }
  openNew() {
    this.EvaluationGrade = {};
    this.evaluationgradeDialog = true;
  }
  editEvaluationGrade(EvaluationGrade: EvaluationGrade) {
    this.EvaluationGrade = { ...EvaluationGrade };
    this.evaluationgradeDialog = true;
  }
  deleteSelectedEvaluationGrade(EvaluationGrade: EvaluationGrade) {
    this.EvaluationGrade = EvaluationGrade;
    this.deleteEvaluationGrade();
  }
  deleteEvaluationGrade() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.EvaluationGrade.name + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.evaluationgradeService.DeleteEvaluationGrade(this.EvaluationGrade.id as string).subscribe(
          (data) => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.deleteSuccess, life: 3000 });
            this.reload();
          }
        );
      },
      acceptLabel: this.Yes,
      rejectLabel: this.No,
    });
  }

  hideDialog() {
    this.evaluationgradeDialog = false;
  }

  saveEvaluationGrade() {
    if (this.evaluationgradeForm.valid) {
      if (this.EvaluationGrade.id) {
        this.evaluationgradeService.UpdateEvaluationGrade(this.EvaluationGrade).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.evaluationgradeService.AddEvaluationGrade(this.EvaluationGrade).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.evaluationgradeDialog = false;
      this.EvaluationGrade = {};
    }
  }

  reload() {
    this.evaluationgradeService.GetAllEvaluationGrades('').subscribe(
      (res) => {
        this.evaluationgrades = res;
      }
    )
  }
  get f() {
    return this.evaluationgradeForm.controls;
  }
}
