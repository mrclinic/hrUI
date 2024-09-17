import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { ModificationContractType } from 'src/app/models/hr/modificationcontracttype.model';
import { University } from 'src/app/models/hr/University';
import { ModificationContractTypeActions } from 'src/app/stateManagement/hr/actions/ModificationContractType.action';
import { UniversityActions } from 'src/app/stateManagement/hr/actions/university.action';

@Component({
  selector: 'app-modificationcontracttype',
  templateUrl: './modificationcontracttype.component.html',
  styleUrls: ['./modificationcontracttype.component.css']
})
export class ModificationContractTypeComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  modificationcontracttypes: ModificationContractType[] = [];
  cols: any[];
  modificationcontracttypeDialog: boolean;
  ModificationContractType!: ModificationContractType;
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
  modificationcontracttypeForm: FormGroup;
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService) {
    this.modificationcontracttypeForm = fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
    this.modificationcontracttypeDialog = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.store.dispatch(new ModificationContractTypeActions.GetModificationContractTypesInfo('')).subscribe(
      () => {
        this.modificationcontracttypes = this.store.selectSnapshot<ModificationContractType[]>((state) => state.users.modificationcontracttypes);
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
    this.ModificationContractType = {};
    this.submitted = false;
    this.modificationcontracttypeDialog = true;
  }
  editModificationContractType(ModificationContractType: ModificationContractType) {
    this.ModificationContractType = { ...ModificationContractType };
    this.modificationcontracttypeDialog = true;
  }
  deleteSelectedModificationContractType(ModificationContractType: ModificationContractType) {
    this.ModificationContractType = ModificationContractType;
    this.deleteModificationContractType();
  }
  deleteModificationContractType() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.ModificationContractType.Place + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(new ModificationContractTypeActions.DeleteModificationContractType(this.ModificationContractType.Id as string)).subscribe(
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
    this.modificationcontracttypeDialog = false;
    this.submitted = false;
  }

  saveModificationContractType() {
    this.submitted = true;
    if (this.modificationcontracttypeForm.valid) {
      if (this.ModificationContractType.Id) {
        delete this.ModificationContractType.Request;
        this.store.dispatch(new ModificationContractTypeActions.UpdateModificationContractType(this.ModificationContractType)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        delete this.ModificationContractType.Id;
        this.store.dispatch(new ModificationContractTypeActions.AddModificationContractType(this.ModificationContractType)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.modificationcontracttypeDialog = false;
      this.ModificationContractType = {};
    }
  }

  reload() {
    this.store.dispatch(new ModificationContractTypeActions.GetModificationContractTypesInfo('')).subscribe(
      () => {
        this.modificationcontracttypes = this.store.selectSnapshot<ModificationContractType[]>((state) => state.users.modificationcontracttypes);
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
    this.ModificationContractType.RequestId = this.RequestId;
  }

  get f() {
    return this.modificationcontracttypeForm.controls;
  }
}
