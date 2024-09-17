import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { MilitaryRank } from 'src/app/models/hr/militaryrank.model';
import { University } from 'src/app/models/hr/University';
import { MilitaryRankActions } from 'src/app/stateManagement/hr/actions/MilitaryRank.action';
import { UniversityActions } from 'src/app/stateManagement/hr/actions/university.action';

@Component({
  selector: 'app-militaryrank',
  templateUrl: './militaryrank.component.html',
  styleUrls: ['./militaryrank.component.css']
})
export class MilitaryRankComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  militaryranks: MilitaryRank[] = [];
  cols: any[];
  militaryrankDialog: boolean;
  MilitaryRank!: MilitaryRank;
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
  militaryrankForm: FormGroup;
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService) {
    this.militaryrankForm = fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
    this.militaryrankDialog = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.store.dispatch(new MilitaryRankActions.GetMilitaryRanksInfo('')).subscribe(
      () => {
        this.militaryranks = this.store.selectSnapshot<MilitaryRank[]>((state) => state.users.militaryranks);
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
    this.MilitaryRank = {};
    this.submitted = false;
    this.militaryrankDialog = true;
  }
  editMilitaryRank(MilitaryRank: MilitaryRank) {
    this.MilitaryRank = { ...MilitaryRank };
    this.militaryrankDialog = true;
  }
  deleteSelectedMilitaryRank(MilitaryRank: MilitaryRank) {
    this.MilitaryRank = MilitaryRank;
    this.deleteMilitaryRank();
  }
  deleteMilitaryRank() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.MilitaryRank.Place + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(new MilitaryRankActions.DeleteMilitaryRank(this.MilitaryRank.Id as string)).subscribe(
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
    this.militaryrankDialog = false;
    this.submitted = false;
  }

  saveMilitaryRank() {
    this.submitted = true;
    if (this.militaryrankForm.valid) {
      if (this.MilitaryRank.Id) {
        delete this.MilitaryRank.Request;
        this.store.dispatch(new MilitaryRankActions.UpdateMilitaryRank(this.MilitaryRank)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        delete this.MilitaryRank.Id;
        this.store.dispatch(new MilitaryRankActions.AddMilitaryRank(this.MilitaryRank)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.militaryrankDialog = false;
      this.MilitaryRank = {};
    }
  }

  reload() {
    this.store.dispatch(new MilitaryRankActions.GetMilitaryRanksInfo('')).subscribe(
      () => {
        this.militaryranks = this.store.selectSnapshot<MilitaryRank[]>((state) => state.users.militaryranks);
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
    this.MilitaryRank.RequestId = this.RequestId;
  }

  get f() {
    return this.militaryrankForm.controls;
  }
}
