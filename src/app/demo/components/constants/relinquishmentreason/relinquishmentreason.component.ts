import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { RelinquishmentReason } from 'src/app/models/hr/relinquishmentreason.model';
import { University } from 'src/app/models/hr/University';
import { RelinquishmentReasonActions } from 'src/app/stateManagement/hr/actions/RelinquishmentReason.action';
import { UniversityActions } from 'src/app/stateManagement/hr/actions/university.action';

@Component({
  selector: 'app-relinquishmentreason',
  templateUrl: './relinquishmentreason.component.html',
  styleUrls: ['./relinquishmentreason.component.css']
})
export class RelinquishmentReasonComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  relinquishmentreasons: RelinquishmentReason[] = [];
  cols: any[];
  relinquishmentreasonDialog: boolean;
  RelinquishmentReason!: RelinquishmentReason;
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
  relinquishmentreasonForm: FormGroup;
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService) {
    this.relinquishmentreasonForm = fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
    this.relinquishmentreasonDialog = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.store.dispatch(new RelinquishmentReasonActions.GetRelinquishmentReasonsInfo('')).subscribe(
      () => {
        this.relinquishmentreasons = this.store.selectSnapshot<RelinquishmentReason[]>((state) => state.users.relinquishmentreasons);
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
    this.RelinquishmentReason = {};
    this.submitted = false;
    this.relinquishmentreasonDialog = true;
  }
  editRelinquishmentReason(RelinquishmentReason: RelinquishmentReason) {
    this.RelinquishmentReason = { ...RelinquishmentReason };
    this.relinquishmentreasonDialog = true;
  }
  deleteSelectedRelinquishmentReason(RelinquishmentReason: RelinquishmentReason) {
    this.RelinquishmentReason = RelinquishmentReason;
    this.deleteRelinquishmentReason();
  }
  deleteRelinquishmentReason() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.RelinquishmentReason.Place + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(new RelinquishmentReasonActions.DeleteRelinquishmentReason(this.RelinquishmentReason.Id as string)).subscribe(
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
    this.relinquishmentreasonDialog = false;
    this.submitted = false;
  }

  saveRelinquishmentReason() {
    this.submitted = true;
    if (this.relinquishmentreasonForm.valid) {
      if (this.RelinquishmentReason.Id) {
        delete this.RelinquishmentReason.Request;
        this.store.dispatch(new RelinquishmentReasonActions.UpdateRelinquishmentReason(this.RelinquishmentReason)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        delete this.RelinquishmentReason.Id;
        this.store.dispatch(new RelinquishmentReasonActions.AddRelinquishmentReason(this.RelinquishmentReason)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.relinquishmentreasonDialog = false;
      this.RelinquishmentReason = {};
    }
  }

  reload() {
    this.store.dispatch(new RelinquishmentReasonActions.GetRelinquishmentReasonsInfo('')).subscribe(
      () => {
        this.relinquishmentreasons = this.store.selectSnapshot<RelinquishmentReason[]>((state) => state.users.relinquishmentreasons);
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
    this.RelinquishmentReason.RequestId = this.RequestId;
  }

  get f() {
    return this.relinquishmentreasonForm.controls;
  }
}
