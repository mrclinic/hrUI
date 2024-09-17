import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { InsuranceSystem } from 'src/app/models/hr/insurancesystem.model';
import { University } from 'src/app/models/hr/University';
import { InsuranceSystemActions } from 'src/app/stateManagement/hr/actions/InsuranceSystem.action';
import { UniversityActions } from 'src/app/stateManagement/hr/actions/university.action';

@Component({
  selector: 'app-insurancesystem',
  templateUrl: './insurancesystem.component.html',
  styleUrls: ['./insurancesystem.component.css']
})
export class InsuranceSystemComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  insurancesystems: InsuranceSystem[] = [];
  cols: any[];
  insurancesystemDialog: boolean;
  InsuranceSystem!: InsuranceSystem;
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
  insurancesystemForm: FormGroup;
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService) {
    this.insurancesystemForm = fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
    this.insurancesystemDialog = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.store.dispatch(new InsuranceSystemActions.GetInsuranceSystemsInfo('')).subscribe(
      () => {
        this.insurancesystems = this.store.selectSnapshot<InsuranceSystem[]>((state) => state.users.insurancesystems);
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
    this.InsuranceSystem = {};
    this.submitted = false;
    this.insurancesystemDialog = true;
  }
  editInsuranceSystem(InsuranceSystem: InsuranceSystem) {
    this.InsuranceSystem = { ...InsuranceSystem };
    this.insurancesystemDialog = true;
  }
  deleteSelectedInsuranceSystem(InsuranceSystem: InsuranceSystem) {
    this.InsuranceSystem = InsuranceSystem;
    this.deleteInsuranceSystem();
  }
  deleteInsuranceSystem() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.InsuranceSystem.Place + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(new InsuranceSystemActions.DeleteInsuranceSystem(this.InsuranceSystem.Id as string)).subscribe(
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
    this.insurancesystemDialog = false;
    this.submitted = false;
  }

  saveInsuranceSystem() {
    this.submitted = true;
    if (this.insurancesystemForm.valid) {
      if (this.InsuranceSystem.Id) {
        delete this.InsuranceSystem.Request;
        this.store.dispatch(new InsuranceSystemActions.UpdateInsuranceSystem(this.InsuranceSystem)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        delete this.InsuranceSystem.Id;
        this.store.dispatch(new InsuranceSystemActions.AddInsuranceSystem(this.InsuranceSystem)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.insurancesystemDialog = false;
      this.InsuranceSystem = {};
    }
  }

  reload() {
    this.store.dispatch(new InsuranceSystemActions.GetInsuranceSystemsInfo('')).subscribe(
      () => {
        this.insurancesystems = this.store.selectSnapshot<InsuranceSystem[]>((state) => state.users.insurancesystems);
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
    this.InsuranceSystem.RequestId = this.RequestId;
  }

  get f() {
    return this.insurancesystemForm.controls;
  }
}
