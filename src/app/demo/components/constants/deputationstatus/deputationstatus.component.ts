import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { DeputationStatus } from 'src/app/models/hr/deputationstatus.model';
import { University } from 'src/app/models/hr/University';
import { DeputationStatusActions } from 'src/app/stateManagement/hr/actions/DeputationStatus.action';
import { UniversityActions } from 'src/app/stateManagement/hr/actions/university.action';

@Component({
  selector: 'app-deputationstatus',
  templateUrl: './deputationstatus.component.html',
  styleUrls: ['./deputationstatus.component.css']
})
export class DeputationStatusComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  deputationstatuss: DeputationStatus[] = [];
  cols: any[];
  deputationstatusDialog: boolean;
  DeputationStatus!: DeputationStatus;
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
  deputationstatusForm: FormGroup;
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService) {
    this.deputationstatusForm = fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
    this.deputationstatusDialog = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.store.dispatch(new DeputationStatusActions.GetDeputationStatussInfo('')).subscribe(
      () => {
        this.deputationstatuss = this.store.selectSnapshot<DeputationStatus[]>((state) => state.users.deputationstatuss);
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
    this.DeputationStatus = {};
    this.submitted = false;
    this.deputationstatusDialog = true;
  }
  editDeputationStatus(DeputationStatus: DeputationStatus) {
    this.DeputationStatus = { ...DeputationStatus };
    this.deputationstatusDialog = true;
  }
  deleteSelectedDeputationStatus(DeputationStatus: DeputationStatus) {
    this.DeputationStatus = DeputationStatus;
    this.deleteDeputationStatus();
  }
  deleteDeputationStatus() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.DeputationStatus.Place + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(new DeputationStatusActions.DeleteDeputationStatus(this.DeputationStatus.Id as string)).subscribe(
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
    this.deputationstatusDialog = false;
    this.submitted = false;
  }

  saveDeputationStatus() {
    this.submitted = true;
    if (this.deputationstatusForm.valid) {
      if (this.DeputationStatus.Id) {
        delete this.DeputationStatus.Request;
        this.store.dispatch(new DeputationStatusActions.UpdateDeputationStatus(this.DeputationStatus)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        delete this.DeputationStatus.Id;
        this.store.dispatch(new DeputationStatusActions.AddDeputationStatus(this.DeputationStatus)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.deputationstatusDialog = false;
      this.DeputationStatus = {};
    }
  }

  reload() {
    this.store.dispatch(new DeputationStatusActions.GetDeputationStatussInfo('')).subscribe(
      () => {
        this.deputationstatuss = this.store.selectSnapshot<DeputationStatus[]>((state) => state.users.deputationstatuss);
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
    this.DeputationStatus.RequestId = this.RequestId;
  }

  get f() {
    return this.deputationstatusForm.controls;
  }
}
