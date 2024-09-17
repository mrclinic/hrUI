import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { FinancialIndicatorType } from 'src/app/models/hr/financialindicatortype.model';
import { University } from 'src/app/models/hr/University';
import { FinancialIndicatorTypeActions } from 'src/app/stateManagement/hr/actions/FinancialIndicatorType.action';
import { UniversityActions } from 'src/app/stateManagement/hr/actions/university.action';

@Component({
  selector: 'app-financialindicatortype',
  templateUrl: './financialindicatortype.component.html',
  styleUrls: ['./financialindicatortype.component.css']
})
export class FinancialIndicatorTypeComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  financialindicatortypes: FinancialIndicatorType[] = [];
  cols: any[];
  financialindicatortypeDialog: boolean;
  FinancialIndicatorType!: FinancialIndicatorType;
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
  financialindicatortypeForm: FormGroup;
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService) {
    this.financialindicatortypeForm = fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
    this.financialindicatortypeDialog = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.store.dispatch(new FinancialIndicatorTypeActions.GetFinancialIndicatorTypesInfo('')).subscribe(
      () => {
        this.financialindicatortypes = this.store.selectSnapshot<FinancialIndicatorType[]>((state) => state.users.financialindicatortypes);
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
    this.FinancialIndicatorType = {};
    this.submitted = false;
    this.financialindicatortypeDialog = true;
  }
  editFinancialIndicatorType(FinancialIndicatorType: FinancialIndicatorType) {
    this.FinancialIndicatorType = { ...FinancialIndicatorType };
    this.financialindicatortypeDialog = true;
  }
  deleteSelectedFinancialIndicatorType(FinancialIndicatorType: FinancialIndicatorType) {
    this.FinancialIndicatorType = FinancialIndicatorType;
    this.deleteFinancialIndicatorType();
  }
  deleteFinancialIndicatorType() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.FinancialIndicatorType.Place + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(new FinancialIndicatorTypeActions.DeleteFinancialIndicatorType(this.FinancialIndicatorType.Id as string)).subscribe(
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
    this.financialindicatortypeDialog = false;
    this.submitted = false;
  }

  saveFinancialIndicatorType() {
    this.submitted = true;
    if (this.financialindicatortypeForm.valid) {
      if (this.FinancialIndicatorType.Id) {
        delete this.FinancialIndicatorType.Request;
        this.store.dispatch(new FinancialIndicatorTypeActions.UpdateFinancialIndicatorType(this.FinancialIndicatorType)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        delete this.FinancialIndicatorType.Id;
        this.store.dispatch(new FinancialIndicatorTypeActions.AddFinancialIndicatorType(this.FinancialIndicatorType)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.financialindicatortypeDialog = false;
      this.FinancialIndicatorType = {};
    }
  }

  reload() {
    this.store.dispatch(new FinancialIndicatorTypeActions.GetFinancialIndicatorTypesInfo('')).subscribe(
      () => {
        this.financialindicatortypes = this.store.selectSnapshot<FinancialIndicatorType[]>((state) => state.users.financialindicatortypes);
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
    this.FinancialIndicatorType.RequestId = this.RequestId;
  }

  get f() {
    return this.financialindicatortypeForm.controls;
  }
}
