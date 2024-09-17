import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { EvaluationGrade } from 'src/app/models/hr/evaluationgrade.model';
import { University } from 'src/app/models/hr/University';
import { EvaluationGradeActions } from 'src/app/stateManagement/hr/actions/EvaluationGrade.action';
import { UniversityActions } from 'src/app/stateManagement/hr/actions/university.action';

@Component({
  selector: 'app-evaluationgrade',
  templateUrl: './evaluationgrade.component.html',
  styleUrls: ['./evaluationgrade.component.css']
})
export class EvaluationGradeComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  evaluationgrades: EvaluationGrade[] = [];
  cols: any[];
  evaluationgradeDialog: boolean;
  EvaluationGrade!: EvaluationGrade;
  submitted: boolean;
  Time: string = '';
  Place: string = '';
  DateLabel: string = '';
  Note: string = '';
  IsCancelled: string = '';
  IsDone: string = '';
  CancelReason: string = '';
  ConfirmTitle: string = '';
  ConfirmMsg: string = '';
  Success: string = '';
  deleteSuccess: string = '';
  Yes: string = '';
  No: string = '';
  editSuccess: string = '';
  addSuccess: string = '';
  RequestIdCol: string = '';
  RequestId: string = '';
  universities: University[] = [];
  evaluationgradeForm: FormGroup;
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService) {
    this.evaluationgradeForm = fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
    this.evaluationgradeDialog = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.store.dispatch(new EvaluationGradeActions.GetEvaluationGradesInfo('')).subscribe(
      () => {
        this.evaluationgrades = this.store.selectSnapshot<EvaluationGrade[]>((state) => state.users.evaluationgrades);
      }
    );
    this.translate.get('AppTitle').subscribe(
      () => {
        this.Time = this.translate.instant('Time');;
        this.Place = this.translate.instant('Place');
        this.DateLabel = this.translate.instant('Date');;
        this.Note = this.translate.instant('Note');
        this.IsCancelled = this.translate.instant('IsCancelled');
        this.IsDone = this.translate.instant('IsDone');
        this.CancelReason = this.translate.instant('CancelReason');
        this.ConfirmTitle = this.translate.instant('ConfirmTitle');
        this.ConfirmMsg = this.translate.instant('ConfirmMsg');
        this.Success = this.translate.instant('Success');
        this.deleteSuccess = this.translate.instant('deleteSuccess');
        this.Yes = this.translate.instant('Yes');
        this.No = this.translate.instant('No');
        this.editSuccess = this.translate.instant('editSuccess');
        this.addSuccess = this.translate.instant('addSuccess');
        this.RequestIdCol = this.translate.instant('RequestId');
        this.initColumns();
      }
    )
  }
  initColumns() {
    this.cols = [
      { field: 'name', header: this.name, type: 'string' },
      { field: 'id', header: this.id, type: 'string' },

    ]
  }
  openNew() {
    this.EvaluationGrade = {};
    this.submitted = false;
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
      message: this.ConfirmMsg + this.EvaluationGrade.Place + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(new EvaluationGradeActions.DeleteEvaluationGrade(this.EvaluationGrade.Id as string)).subscribe(
          data => {
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
    this.submitted = false;
  }

  saveEvaluationGrade() {
    this.submitted = true;
    if (this.evaluationgradeForm.valid) {
      if (this.EvaluationGrade.Id) {
        delete this.EvaluationGrade.Request;
        this.store.dispatch(new EvaluationGradeActions.UpdateEvaluationGrade(this.EvaluationGrade)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        delete this.EvaluationGrade.Id;
        this.store.dispatch(new EvaluationGradeActions.AddEvaluationGrade(this.EvaluationGrade)).subscribe(
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
    this.store.dispatch(new EvaluationGradeActions.GetEvaluationGradesInfo('')).subscribe(
      () => {
        this.evaluationgrades = this.store.selectSnapshot<EvaluationGrade[]>((state) => state.users.evaluationgrades);
      }
    )
  }

  searchUniversity(event: any) {
    let filter = "Filters=Name@=" + event.query;
    this.store.dispatch(new UniversityActions.GetAllUniversitys(filter)).subscribe(
      () => {
        this.universities = this.store.selectSnapshot<University[]>((state) => state.users.universities);
      }
    );
  }
  onSelectUniversity(event: any) {
    this.RequestId = event.Id;
    this.EvaluationGrade.RequestId = this.RequestId;
  }

  get f() {
    return this.evaluationgradeForm.controls;
  }
}
