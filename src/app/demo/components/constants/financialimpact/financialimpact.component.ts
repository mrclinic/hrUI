import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { FinancialImpact } from 'src/app/models/hr/financialimpact.model';
import { University } from 'src/app/models/hr/University';
import { FinancialImpactActions } from 'src/app/stateManagement/hr/actions/FinancialImpact.action';
import { UniversityActions } from 'src/app/stateManagement/hr/actions/university.action';

@Component({
  selector: 'app-financialimpact',
  templateUrl: './financialimpact.component.html',
  styleUrls: ['./financialimpact.component.css']
})
export class FinancialImpactComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  financialimpacts: FinancialImpact[] = [];
  cols: any[];
  financialimpactDialog: boolean;
  FinancialImpact!: FinancialImpact;
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
  financialimpactForm: FormGroup;
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService) {
    this.financialimpactForm = fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
    this.financialimpactDialog = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.store.dispatch(new FinancialImpactActions.GetFinancialImpactsInfo('')).subscribe(
      () => {
        this.financialimpacts = this.store.selectSnapshot<FinancialImpact[]>((state) => state.users.financialimpacts);
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
    this.FinancialImpact = {};
    this.submitted = false;
    this.financialimpactDialog = true;
  }
  editFinancialImpact(FinancialImpact: FinancialImpact) {
    this.FinancialImpact = { ...FinancialImpact };
    this.financialimpactDialog = true;
  }
  deleteSelectedFinancialImpact(FinancialImpact: FinancialImpact) {
    this.FinancialImpact = FinancialImpact;
    this.deleteFinancialImpact();
  }
  deleteFinancialImpact() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.FinancialImpact.Place + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(new FinancialImpactActions.DeleteFinancialImpact(this.FinancialImpact.Id as string)).subscribe(
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
    this.financialimpactDialog = false;
    this.submitted = false;
  }

  saveFinancialImpact() {
    this.submitted = true;
    if (this.financialimpactForm.valid) {
      if (this.FinancialImpact.Id) {
        delete this.FinancialImpact.Request;
        this.store.dispatch(new FinancialImpactActions.UpdateFinancialImpact(this.FinancialImpact)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        delete this.FinancialImpact.Id;
        this.store.dispatch(new FinancialImpactActions.AddFinancialImpact(this.FinancialImpact)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.financialimpactDialog = false;
      this.FinancialImpact = {};
    }
  }

  reload() {
    this.store.dispatch(new FinancialImpactActions.GetFinancialImpactsInfo('')).subscribe(
      () => {
        this.financialimpacts = this.store.selectSnapshot<FinancialImpact[]>((state) => state.users.financialimpacts);
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
    this.FinancialImpact.RequestId = this.RequestId;
  }

  get f() {
    return this.financialimpactForm.controls;
  }
}
