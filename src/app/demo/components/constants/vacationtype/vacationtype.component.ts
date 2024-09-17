import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { VacationType } from 'src/app/models/hr/vacationtype.model';
import { University } from 'src/app/models/hr/University';
import { VacationTypeActions } from 'src/app/stateManagement/hr/actions/VacationType.action';
import { UniversityActions } from 'src/app/stateManagement/hr/actions/university.action';

@Component({
  selector: 'app-vacationtype',
  templateUrl: './vacationtype.component.html',
  styleUrls: ['./vacationtype.component.css']
})
export class VacationTypeComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  vacationtypes: VacationType[] = [];
  cols: any[];
  vacationtypeDialog: boolean;
  VacationType!: VacationType;
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
  vacationtypeForm: FormGroup;
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService) {
    this.vacationtypeForm = fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
    this.vacationtypeDialog = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.store.dispatch(new VacationTypeActions.GetVacationTypesInfo('')).subscribe(
      () => {
        this.vacationtypes = this.store.selectSnapshot<VacationType[]>((state) => state.users.vacationtypes);
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
    this.VacationType = {};
    this.submitted = false;
    this.vacationtypeDialog = true;
  }
  editVacationType(VacationType: VacationType) {
    this.VacationType = { ...VacationType };
    this.vacationtypeDialog = true;
  }
  deleteSelectedVacationType(VacationType: VacationType) {
    this.VacationType = VacationType;
    this.deleteVacationType();
  }
  deleteVacationType() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.VacationType.Place + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(new VacationTypeActions.DeleteVacationType(this.VacationType.Id as string)).subscribe(
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
    this.vacationtypeDialog = false;
    this.submitted = false;
  }

  saveVacationType() {
    this.submitted = true;
    if (this.vacationtypeForm.valid) {
      if (this.VacationType.Id) {
        delete this.VacationType.Request;
        this.store.dispatch(new VacationTypeActions.UpdateVacationType(this.VacationType)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        delete this.VacationType.Id;
        this.store.dispatch(new VacationTypeActions.AddVacationType(this.VacationType)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.vacationtypeDialog = false;
      this.VacationType = {};
    }
  }

  reload() {
    this.store.dispatch(new VacationTypeActions.GetVacationTypesInfo('')).subscribe(
      () => {
        this.vacationtypes = this.store.selectSnapshot<VacationType[]>((state) => state.users.vacationtypes);
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
    this.VacationType.RequestId = this.RequestId;
  }

  get f() {
    return this.vacationtypeForm.controls;
  }
}
