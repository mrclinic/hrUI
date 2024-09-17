import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { PunishmentType } from 'src/app/models/hr/punishmenttype.model';
import { University } from 'src/app/models/hr/University';
import { PunishmentTypeActions } from 'src/app/stateManagement/hr/actions/PunishmentType.action';
import { UniversityActions } from 'src/app/stateManagement/hr/actions/university.action';

@Component({
  selector: 'app-punishmenttype',
  templateUrl: './punishmenttype.component.html',
  styleUrls: ['./punishmenttype.component.css']
})
export class PunishmentTypeComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  punishmenttypes: PunishmentType[] = [];
  cols: any[];
  punishmenttypeDialog: boolean;
  PunishmentType!: PunishmentType;
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
  punishmenttypeForm: FormGroup;
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService) {
    this.punishmenttypeForm = fb.group({
      financialimpactid: new FormControl('', [Validators.required]),
      financialimpact: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
    this.punishmenttypeDialog = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.store.dispatch(new PunishmentTypeActions.GetPunishmentTypesInfo('')).subscribe(
      () => {
        this.punishmenttypes = this.store.selectSnapshot<PunishmentType[]>((state) => state.users.punishmenttypes);
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
      { field: 'financialimpactid', header: this.financialimpactid, type: 'string' },
      { field: 'financialimpact', header: this.financialimpact, type: 'hiastHRApi.Service.DTO.Constants.FinancialImpactDto' },
      { field: 'name', header: this.name, type: 'string' },
      { field: 'id', header: this.id, type: 'string' },

    ]
  }
  openNew() {
    this.PunishmentType = {};
    this.submitted = false;
    this.punishmenttypeDialog = true;
  }
  editPunishmentType(PunishmentType: PunishmentType) {
    this.PunishmentType = { ...PunishmentType };
    this.punishmenttypeDialog = true;
  }
  deleteSelectedPunishmentType(PunishmentType: PunishmentType) {
    this.PunishmentType = PunishmentType;
    this.deletePunishmentType();
  }
  deletePunishmentType() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.PunishmentType.Place + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(new PunishmentTypeActions.DeletePunishmentType(this.PunishmentType.Id as string)).subscribe(
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
    this.punishmenttypeDialog = false;
    this.submitted = false;
  }

  savePunishmentType() {
    this.submitted = true;
    if (this.punishmenttypeForm.valid) {
      if (this.PunishmentType.Id) {
        delete this.PunishmentType.Request;
        this.store.dispatch(new PunishmentTypeActions.UpdatePunishmentType(this.PunishmentType)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        delete this.PunishmentType.Id;
        this.store.dispatch(new PunishmentTypeActions.AddPunishmentType(this.PunishmentType)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.punishmenttypeDialog = false;
      this.PunishmentType = {};
    }
  }

  reload() {
    this.store.dispatch(new PunishmentTypeActions.GetPunishmentTypesInfo('')).subscribe(
      () => {
        this.punishmenttypes = this.store.selectSnapshot<PunishmentType[]>((state) => state.users.punishmenttypes);
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
    this.PunishmentType.RequestId = this.RequestId;
  }

  get f() {
    return this.punishmenttypeForm.controls;
  }
}
