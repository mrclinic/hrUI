import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { OccurrencePartnerType } from 'src/app/models/hr/occurrencepartnertype.model';
import { University } from 'src/app/models/hr/University';
import { OccurrencePartnerTypeActions } from 'src/app/stateManagement/hr/actions/OccurrencePartnerType.action';
import { UniversityActions } from 'src/app/stateManagement/hr/actions/university.action';

@Component({
  selector: 'app-occurrencepartnertype',
  templateUrl: './occurrencepartnertype.component.html',
  styleUrls: ['./occurrencepartnertype.component.css']
})
export class OccurrencePartnerTypeComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  occurrencepartnertypes: OccurrencePartnerType[] = [];
  cols: any[];
  occurrencepartnertypeDialog: boolean;
  OccurrencePartnerType!: OccurrencePartnerType;
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
  occurrencepartnertypeForm: FormGroup;
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService) {
    this.occurrencepartnertypeForm = fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
    this.occurrencepartnertypeDialog = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.store.dispatch(new OccurrencePartnerTypeActions.GetOccurrencePartnerTypesInfo('')).subscribe(
      () => {
        this.occurrencepartnertypes = this.store.selectSnapshot<OccurrencePartnerType[]>((state) => state.users.occurrencepartnertypes);
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
    this.OccurrencePartnerType = {};
    this.submitted = false;
    this.occurrencepartnertypeDialog = true;
  }
  editOccurrencePartnerType(OccurrencePartnerType: OccurrencePartnerType) {
    this.OccurrencePartnerType = { ...OccurrencePartnerType };
    this.occurrencepartnertypeDialog = true;
  }
  deleteSelectedOccurrencePartnerType(OccurrencePartnerType: OccurrencePartnerType) {
    this.OccurrencePartnerType = OccurrencePartnerType;
    this.deleteOccurrencePartnerType();
  }
  deleteOccurrencePartnerType() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.OccurrencePartnerType.Place + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(new OccurrencePartnerTypeActions.DeleteOccurrencePartnerType(this.OccurrencePartnerType.Id as string)).subscribe(
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
    this.occurrencepartnertypeDialog = false;
    this.submitted = false;
  }

  saveOccurrencePartnerType() {
    this.submitted = true;
    if (this.occurrencepartnertypeForm.valid) {
      if (this.OccurrencePartnerType.Id) {
        delete this.OccurrencePartnerType.Request;
        this.store.dispatch(new OccurrencePartnerTypeActions.UpdateOccurrencePartnerType(this.OccurrencePartnerType)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        delete this.OccurrencePartnerType.Id;
        this.store.dispatch(new OccurrencePartnerTypeActions.AddOccurrencePartnerType(this.OccurrencePartnerType)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.occurrencepartnertypeDialog = false;
      this.OccurrencePartnerType = {};
    }
  }

  reload() {
    this.store.dispatch(new OccurrencePartnerTypeActions.GetOccurrencePartnerTypesInfo('')).subscribe(
      () => {
        this.occurrencepartnertypes = this.store.selectSnapshot<OccurrencePartnerType[]>((state) => state.users.occurrencepartnertypes);
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
    this.OccurrencePartnerType.RequestId = this.RequestId;
  }

  get f() {
    return this.occurrencepartnertypeForm.controls;
  }
}
