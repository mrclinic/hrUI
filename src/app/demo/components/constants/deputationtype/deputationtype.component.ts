import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { DeputationType } from 'src/app/models/hr/deputationtype.model';
import { University } from 'src/app/models/hr/University';
import { DeputationTypeActions } from 'src/app/stateManagement/hr/actions/DeputationType.action';
import { UniversityActions } from 'src/app/stateManagement/hr/actions/university.action';

@Component({
  selector: 'app-deputationtype',
  templateUrl: './deputationtype.component.html',
  styleUrls: ['./deputationtype.component.css']
})
export class DeputationTypeComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  deputationtypes: DeputationType[] = [];
  cols: any[];
  deputationtypeDialog: boolean;
  DeputationType!: DeputationType;
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
  deputationtypeForm: FormGroup;
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService) {
    this.deputationtypeForm = fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
    this.deputationtypeDialog = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.store.dispatch(new DeputationTypeActions.GetDeputationTypesInfo('')).subscribe(
      () => {
        this.deputationtypes = this.store.selectSnapshot<DeputationType[]>((state) => state.users.deputationtypes);
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
    this.DeputationType = {};
    this.submitted = false;
    this.deputationtypeDialog = true;
  }
  editDeputationType(DeputationType: DeputationType) {
    this.DeputationType = { ...DeputationType };
    this.deputationtypeDialog = true;
  }
  deleteSelectedDeputationType(DeputationType: DeputationType) {
    this.DeputationType = DeputationType;
    this.deleteDeputationType();
  }
  deleteDeputationType() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.DeputationType.Place + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(new DeputationTypeActions.DeleteDeputationType(this.DeputationType.Id as string)).subscribe(
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
    this.deputationtypeDialog = false;
    this.submitted = false;
  }

  saveDeputationType() {
    this.submitted = true;
    if (this.deputationtypeForm.valid) {
      if (this.DeputationType.Id) {
        delete this.DeputationType.Request;
        this.store.dispatch(new DeputationTypeActions.UpdateDeputationType(this.DeputationType)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        delete this.DeputationType.Id;
        this.store.dispatch(new DeputationTypeActions.AddDeputationType(this.DeputationType)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.deputationtypeDialog = false;
      this.DeputationType = {};
    }
  }

  reload() {
    this.store.dispatch(new DeputationTypeActions.GetDeputationTypesInfo('')).subscribe(
      () => {
        this.deputationtypes = this.store.selectSnapshot<DeputationType[]>((state) => state.users.deputationtypes);
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
    this.DeputationType.RequestId = this.RequestId;
  }

  get f() {
    return this.deputationtypeForm.controls;
  }
}
