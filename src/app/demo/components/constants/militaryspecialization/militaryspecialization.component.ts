import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { MilitarySpecialization } from 'src/app/models/hr/militaryspecialization.model';
import { University } from 'src/app/models/hr/University';
import { MilitarySpecializationActions } from 'src/app/stateManagement/hr/actions/MilitarySpecialization.action';
import { UniversityActions } from 'src/app/stateManagement/hr/actions/university.action';

@Component({
  selector: 'app-militaryspecialization',
  templateUrl: './militaryspecialization.component.html',
  styleUrls: ['./militaryspecialization.component.css']
})
export class MilitarySpecializationComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  militaryspecializations: MilitarySpecialization[] = [];
  cols: any[];
  militaryspecializationDialog: boolean;
  MilitarySpecialization!: MilitarySpecialization;
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
  militaryspecializationForm: FormGroup;
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService) {
    this.militaryspecializationForm = fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
    this.militaryspecializationDialog = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.store.dispatch(new MilitarySpecializationActions.GetMilitarySpecializationsInfo('')).subscribe(
      () => {
        this.militaryspecializations = this.store.selectSnapshot<MilitarySpecialization[]>((state) => state.users.militaryspecializations);
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
    this.MilitarySpecialization = {};
    this.submitted = false;
    this.militaryspecializationDialog = true;
  }
  editMilitarySpecialization(MilitarySpecialization: MilitarySpecialization) {
    this.MilitarySpecialization = { ...MilitarySpecialization };
    this.militaryspecializationDialog = true;
  }
  deleteSelectedMilitarySpecialization(MilitarySpecialization: MilitarySpecialization) {
    this.MilitarySpecialization = MilitarySpecialization;
    this.deleteMilitarySpecialization();
  }
  deleteMilitarySpecialization() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.MilitarySpecialization.Place + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(new MilitarySpecializationActions.DeleteMilitarySpecialization(this.MilitarySpecialization.Id as string)).subscribe(
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
    this.militaryspecializationDialog = false;
    this.submitted = false;
  }

  saveMilitarySpecialization() {
    this.submitted = true;
    if (this.militaryspecializationForm.valid) {
      if (this.MilitarySpecialization.Id) {
        delete this.MilitarySpecialization.Request;
        this.store.dispatch(new MilitarySpecializationActions.UpdateMilitarySpecialization(this.MilitarySpecialization)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        delete this.MilitarySpecialization.Id;
        this.store.dispatch(new MilitarySpecializationActions.AddMilitarySpecialization(this.MilitarySpecialization)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.militaryspecializationDialog = false;
      this.MilitarySpecialization = {};
    }
  }

  reload() {
    this.store.dispatch(new MilitarySpecializationActions.GetMilitarySpecializationsInfo('')).subscribe(
      () => {
        this.militaryspecializations = this.store.selectSnapshot<MilitarySpecialization[]>((state) => state.users.militaryspecializations);
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
    this.MilitarySpecialization.RequestId = this.RequestId;
  }

  get f() {
    return this.militaryspecializationForm.controls;
  }
}
