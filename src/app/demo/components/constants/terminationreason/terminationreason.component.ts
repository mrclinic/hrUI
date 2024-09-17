import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { TerminationReason } from 'src/app/models/hr/terminationreason.model';
import { University } from 'src/app/models/hr/University';
import { TerminationReasonActions } from 'src/app/stateManagement/hr/actions/TerminationReason.action';
import { UniversityActions } from 'src/app/stateManagement/hr/actions/university.action';

@Component({
  selector: 'app-terminationreason',
  templateUrl: './terminationreason.component.html',
  styleUrls: ['./terminationreason.component.css']
})
export class TerminationReasonComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  terminationreasons: TerminationReason[] = [];
  cols: any[];
  terminationreasonDialog: boolean;
  TerminationReason!: TerminationReason;
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
  terminationreasonForm: FormGroup;
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService) {
    this.terminationreasonForm = fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
    this.terminationreasonDialog = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.store.dispatch(new TerminationReasonActions.GetTerminationReasonsInfo('')).subscribe(
      () => {
        this.terminationreasons = this.store.selectSnapshot<TerminationReason[]>((state) => state.users.terminationreasons);
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
    this.TerminationReason = {};
    this.submitted = false;
    this.terminationreasonDialog = true;
  }
  editTerminationReason(TerminationReason: TerminationReason) {
    this.TerminationReason = { ...TerminationReason };
    this.terminationreasonDialog = true;
  }
  deleteSelectedTerminationReason(TerminationReason: TerminationReason) {
    this.TerminationReason = TerminationReason;
    this.deleteTerminationReason();
  }
  deleteTerminationReason() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.TerminationReason.Place + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(new TerminationReasonActions.DeleteTerminationReason(this.TerminationReason.Id as string)).subscribe(
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
    this.terminationreasonDialog = false;
    this.submitted = false;
  }

  saveTerminationReason() {
    this.submitted = true;
    if (this.terminationreasonForm.valid) {
      if (this.TerminationReason.Id) {
        delete this.TerminationReason.Request;
        this.store.dispatch(new TerminationReasonActions.UpdateTerminationReason(this.TerminationReason)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        delete this.TerminationReason.Id;
        this.store.dispatch(new TerminationReasonActions.AddTerminationReason(this.TerminationReason)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.terminationreasonDialog = false;
      this.TerminationReason = {};
    }
  }

  reload() {
    this.store.dispatch(new TerminationReasonActions.GetTerminationReasonsInfo('')).subscribe(
      () => {
        this.terminationreasons = this.store.selectSnapshot<TerminationReason[]>((state) => state.users.terminationreasons);
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
    this.TerminationReason.RequestId = this.RequestId;
  }

  get f() {
    return this.terminationreasonForm.controls;
  }
}
