import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { RewardType } from 'src/app/models/hr/rewardtype.model';
import { University } from 'src/app/models/hr/University';
import { RewardTypeActions } from 'src/app/stateManagement/hr/actions/RewardType.action';
import { UniversityActions } from 'src/app/stateManagement/hr/actions/university.action';

@Component({
  selector: 'app-rewardtype',
  templateUrl: './rewardtype.component.html',
  styleUrls: ['./rewardtype.component.css']
})
export class RewardTypeComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  rewardtypes: RewardType[] = [];
  cols: any[];
  rewardtypeDialog: boolean;
  RewardType!: RewardType;
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
  rewardtypeForm: FormGroup;
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService) {
    this.rewardtypeForm = fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
    this.rewardtypeDialog = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.store.dispatch(new RewardTypeActions.GetRewardTypesInfo('')).subscribe(
      () => {
        this.rewardtypes = this.store.selectSnapshot<RewardType[]>((state) => state.users.rewardtypes);
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
    this.RewardType = {};
    this.submitted = false;
    this.rewardtypeDialog = true;
  }
  editRewardType(RewardType: RewardType) {
    this.RewardType = { ...RewardType };
    this.rewardtypeDialog = true;
  }
  deleteSelectedRewardType(RewardType: RewardType) {
    this.RewardType = RewardType;
    this.deleteRewardType();
  }
  deleteRewardType() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.RewardType.Place + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(new RewardTypeActions.DeleteRewardType(this.RewardType.Id as string)).subscribe(
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
    this.rewardtypeDialog = false;
    this.submitted = false;
  }

  saveRewardType() {
    this.submitted = true;
    if (this.rewardtypeForm.valid) {
      if (this.RewardType.Id) {
        delete this.RewardType.Request;
        this.store.dispatch(new RewardTypeActions.UpdateRewardType(this.RewardType)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        delete this.RewardType.Id;
        this.store.dispatch(new RewardTypeActions.AddRewardType(this.RewardType)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.rewardtypeDialog = false;
      this.RewardType = {};
    }
  }

  reload() {
    this.store.dispatch(new RewardTypeActions.GetRewardTypesInfo('')).subscribe(
      () => {
        this.rewardtypes = this.store.selectSnapshot<RewardType[]>((state) => state.users.rewardtypes);
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
    this.RewardType.RequestId = this.RequestId;
  }

  get f() {
    return this.rewardtypeForm.controls;
  }
}
