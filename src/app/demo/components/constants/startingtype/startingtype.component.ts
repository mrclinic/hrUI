import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { StartingType } from 'src/app/models/hr/startingtype.model';
import { University } from 'src/app/models/hr/University';
import { StartingTypeActions } from 'src/app/stateManagement/hr/actions/StartingType.action';
import { UniversityActions } from 'src/app/stateManagement/hr/actions/university.action';

@Component({
  selector: 'app-startingtype',
  templateUrl: './startingtype.component.html',
  styleUrls: ['./startingtype.component.css']
})
export class StartingTypeComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  startingtypes: StartingType[] = [];
  cols: any[];
  startingtypeDialog: boolean;
  StartingType!: StartingType;
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
  startingtypeForm: FormGroup;
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService) {
    this.startingtypeForm = fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
    this.startingtypeDialog = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.store.dispatch(new StartingTypeActions.GetStartingTypesInfo('')).subscribe(
      () => {
        this.startingtypes = this.store.selectSnapshot<StartingType[]>((state) => state.users.startingtypes);
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
    this.StartingType = {};
    this.submitted = false;
    this.startingtypeDialog = true;
  }
  editStartingType(StartingType: StartingType) {
    this.StartingType = { ...StartingType };
    this.startingtypeDialog = true;
  }
  deleteSelectedStartingType(StartingType: StartingType) {
    this.StartingType = StartingType;
    this.deleteStartingType();
  }
  deleteStartingType() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.StartingType.Place + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(new StartingTypeActions.DeleteStartingType(this.StartingType.Id as string)).subscribe(
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
    this.startingtypeDialog = false;
    this.submitted = false;
  }

  saveStartingType() {
    this.submitted = true;
    if (this.startingtypeForm.valid) {
      if (this.StartingType.Id) {
        delete this.StartingType.Request;
        this.store.dispatch(new StartingTypeActions.UpdateStartingType(this.StartingType)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        delete this.StartingType.Id;
        this.store.dispatch(new StartingTypeActions.AddStartingType(this.StartingType)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.startingtypeDialog = false;
      this.StartingType = {};
    }
  }

  reload() {
    this.store.dispatch(new StartingTypeActions.GetStartingTypesInfo('')).subscribe(
      () => {
        this.startingtypes = this.store.selectSnapshot<StartingType[]>((state) => state.users.startingtypes);
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
    this.StartingType.RequestId = this.RequestId;
  }

  get f() {
    return this.startingtypeForm.controls;
  }
}
