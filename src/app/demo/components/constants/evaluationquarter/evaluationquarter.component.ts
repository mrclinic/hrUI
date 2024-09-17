import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { EvaluationQuarter } from 'src/app/models/hr/evaluationquarter.model';
import { University } from 'src/app/models/hr/University';
import { EvaluationQuarterActions } from 'src/app/stateManagement/hr/actions/EvaluationQuarter.action';
import { UniversityActions } from 'src/app/stateManagement/hr/actions/university.action';

@Component({
  selector: 'app-evaluationquarter',
  templateUrl: './evaluationquarter.component.html',
  styleUrls: ['./evaluationquarter.component.css']
})
export class EvaluationQuarterComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  evaluationquarters: EvaluationQuarter[] = [];
  cols: any[];
  evaluationquarterDialog: boolean;
  EvaluationQuarter!: EvaluationQuarter;
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
  evaluationquarterForm: FormGroup;
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService) {
    this.evaluationquarterForm = fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
    this.evaluationquarterDialog = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.store.dispatch(new EvaluationQuarterActions.GetEvaluationQuartersInfo('')).subscribe(
      () => {
        this.evaluationquarters = this.store.selectSnapshot<EvaluationQuarter[]>((state) => state.users.evaluationquarters);
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
    this.EvaluationQuarter = {};
    this.submitted = false;
    this.evaluationquarterDialog = true;
  }
  editEvaluationQuarter(EvaluationQuarter: EvaluationQuarter) {
    this.EvaluationQuarter = { ...EvaluationQuarter };
    this.evaluationquarterDialog = true;
  }
  deleteSelectedEvaluationQuarter(EvaluationQuarter: EvaluationQuarter) {
    this.EvaluationQuarter = EvaluationQuarter;
    this.deleteEvaluationQuarter();
  }
  deleteEvaluationQuarter() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.EvaluationQuarter.Place + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(new EvaluationQuarterActions.DeleteEvaluationQuarter(this.EvaluationQuarter.Id as string)).subscribe(
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
    this.evaluationquarterDialog = false;
    this.submitted = false;
  }

  saveEvaluationQuarter() {
    this.submitted = true;
    if (this.evaluationquarterForm.valid) {
      if (this.EvaluationQuarter.Id) {
        delete this.EvaluationQuarter.Request;
        this.store.dispatch(new EvaluationQuarterActions.UpdateEvaluationQuarter(this.EvaluationQuarter)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        delete this.EvaluationQuarter.Id;
        this.store.dispatch(new EvaluationQuarterActions.AddEvaluationQuarter(this.EvaluationQuarter)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.evaluationquarterDialog = false;
      this.EvaluationQuarter = {};
    }
  }

  reload() {
    this.store.dispatch(new EvaluationQuarterActions.GetEvaluationQuartersInfo('')).subscribe(
      () => {
        this.evaluationquarters = this.store.selectSnapshot<EvaluationQuarter[]>((state) => state.users.evaluationquarters);
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
    this.EvaluationQuarter.RequestId = this.RequestId;
  }

  get f() {
    return this.evaluationquarterForm.controls;
  }
}
