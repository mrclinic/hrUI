import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { DisabilityType } from 'src/app/models/hr/disabilitytype.model';
import { University } from 'src/app/models/hr/University';
import { DisabilityTypeActions } from 'src/app/stateManagement/hr/actions/DisabilityType.action';
import { UniversityActions } from 'src/app/stateManagement/hr/actions/university.action';

@Component({
  selector: 'app-disabilitytype',
  templateUrl: './disabilitytype.component.html',
  styleUrls: ['./disabilitytype.component.css']
})
export class DisabilityTypeComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  disabilitytypes: DisabilityType[] = [];
  cols: any[];
  disabilitytypeDialog: boolean;
  DisabilityType!: DisabilityType;
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
  disabilitytypeForm: FormGroup;
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService) {
    this.disabilitytypeForm = fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
    this.disabilitytypeDialog = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.store.dispatch(new DisabilityTypeActions.GetDisabilityTypesInfo('')).subscribe(
      () => {
        this.disabilitytypes = this.store.selectSnapshot<DisabilityType[]>((state) => state.users.disabilitytypes);
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
    this.DisabilityType = {};
    this.submitted = false;
    this.disabilitytypeDialog = true;
  }
  editDisabilityType(DisabilityType: DisabilityType) {
    this.DisabilityType = { ...DisabilityType };
    this.disabilitytypeDialog = true;
  }
  deleteSelectedDisabilityType(DisabilityType: DisabilityType) {
    this.DisabilityType = DisabilityType;
    this.deleteDisabilityType();
  }
  deleteDisabilityType() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.DisabilityType.Place + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(new DisabilityTypeActions.DeleteDisabilityType(this.DisabilityType.Id as string)).subscribe(
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
    this.disabilitytypeDialog = false;
    this.submitted = false;
  }

  saveDisabilityType() {
    this.submitted = true;
    if (this.disabilitytypeForm.valid) {
      if (this.DisabilityType.Id) {
        delete this.DisabilityType.Request;
        this.store.dispatch(new DisabilityTypeActions.UpdateDisabilityType(this.DisabilityType)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        delete this.DisabilityType.Id;
        this.store.dispatch(new DisabilityTypeActions.AddDisabilityType(this.DisabilityType)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.disabilitytypeDialog = false;
      this.DisabilityType = {};
    }
  }

  reload() {
    this.store.dispatch(new DisabilityTypeActions.GetDisabilityTypesInfo('')).subscribe(
      () => {
        this.disabilitytypes = this.store.selectSnapshot<DisabilityType[]>((state) => state.users.disabilitytypes);
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
    this.DisabilityType.RequestId = this.RequestId;
  }

  get f() {
    return this.disabilitytypeForm.controls;
  }
}
