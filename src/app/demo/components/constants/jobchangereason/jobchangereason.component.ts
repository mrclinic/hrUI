import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { JobChangeReason } from 'src/app/models/hr/jobchangereason.model';
import { University } from 'src/app/models/hr/University';
import { JobChangeReasonActions } from 'src/app/stateManagement/hr/actions/JobChangeReason.action';
import { UniversityActions } from 'src/app/stateManagement/hr/actions/university.action';

@Component({
  selector: 'app-jobchangereason',
  templateUrl: './jobchangereason.component.html',
  styleUrls: ['./jobchangereason.component.css']
})
export class JobChangeReasonComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  jobchangereasons: JobChangeReason[] = [];
  cols: any[];
  jobchangereasonDialog: boolean;
  JobChangeReason!: JobChangeReason;
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
  jobchangereasonForm: FormGroup;
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService) {
    this.jobchangereasonForm = fb.group({
      modificationcontracttypeid: new FormControl('', [Validators.required]),
      modificationcontracttype: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
    this.jobchangereasonDialog = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.store.dispatch(new JobChangeReasonActions.GetJobChangeReasonsInfo('')).subscribe(
      () => {
        this.jobchangereasons = this.store.selectSnapshot<JobChangeReason[]>((state) => state.users.jobchangereasons);
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
      { field: 'modificationcontracttypeid', header: this.modificationcontracttypeid, type: 'string' },
      { field: 'modificationcontracttype', header: this.modificationcontracttype, type: 'hiastHRApi.Service.DTO.Constants.ModificationContractTypeDto' },
      { field: 'name', header: this.name, type: 'string' },
      { field: 'id', header: this.id, type: 'string' },

    ]
  }
  openNew() {
    this.JobChangeReason = {};
    this.submitted = false;
    this.jobchangereasonDialog = true;
  }
  editJobChangeReason(JobChangeReason: JobChangeReason) {
    this.JobChangeReason = { ...JobChangeReason };
    this.jobchangereasonDialog = true;
  }
  deleteSelectedJobChangeReason(JobChangeReason: JobChangeReason) {
    this.JobChangeReason = JobChangeReason;
    this.deleteJobChangeReason();
  }
  deleteJobChangeReason() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.JobChangeReason.Place + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(new JobChangeReasonActions.DeleteJobChangeReason(this.JobChangeReason.Id as string)).subscribe(
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
    this.jobchangereasonDialog = false;
    this.submitted = false;
  }

  saveJobChangeReason() {
    this.submitted = true;
    if (this.jobchangereasonForm.valid) {
      if (this.JobChangeReason.Id) {
        delete this.JobChangeReason.Request;
        this.store.dispatch(new JobChangeReasonActions.UpdateJobChangeReason(this.JobChangeReason)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        delete this.JobChangeReason.Id;
        this.store.dispatch(new JobChangeReasonActions.AddJobChangeReason(this.JobChangeReason)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.jobchangereasonDialog = false;
      this.JobChangeReason = {};
    }
  }

  reload() {
    this.store.dispatch(new JobChangeReasonActions.GetJobChangeReasonsInfo('')).subscribe(
      () => {
        this.jobchangereasons = this.store.selectSnapshot<JobChangeReason[]>((state) => state.users.jobchangereasons);
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
    this.JobChangeReason.RequestId = this.RequestId;
  }

  get f() {
    return this.jobchangereasonForm.controls;
  }
}
