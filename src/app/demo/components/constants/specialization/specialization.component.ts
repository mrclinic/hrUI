import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Specialization } from 'src/app/models/hr/specialization.model';
import { University } from 'src/app/models/hr/University';
import { SpecializationActions } from 'src/app/stateManagement/hr/actions/Specialization.action';
import { UniversityActions } from 'src/app/stateManagement/hr/actions/university.action';

@Component({
  selector: 'app-specialization',
  templateUrl: './specialization.component.html',
  styleUrls: ['./specialization.component.css']
})
export class SpecializationComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  specializations: Specialization[] = [];
  cols: any[];
  specializationDialog: boolean;
  Specialization!: Specialization;
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
  specializationForm: FormGroup;
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService) {
    this.specializationForm = fb.group({
      qualificationid: new FormControl('', [Validators.required]),
      qualification: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
    this.specializationDialog = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.store.dispatch(new SpecializationActions.GetSpecializationsInfo('')).subscribe(
      () => {
        this.specializations = this.store.selectSnapshot<Specialization[]>((state) => state.users.specializations);
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
      { field: 'qualificationid', header: this.qualificationid, type: 'string' },
      { field: 'qualification', header: this.qualification, type: 'hiastHRApi.Service.DTO.Constants.QualificationDto' },
      { field: 'name', header: this.name, type: 'string' },
      { field: 'id', header: this.id, type: 'string' },

    ]
  }
  openNew() {
    this.Specialization = {};
    this.submitted = false;
    this.specializationDialog = true;
  }
  editSpecialization(Specialization: Specialization) {
    this.Specialization = { ...Specialization };
    this.specializationDialog = true;
  }
  deleteSelectedSpecialization(Specialization: Specialization) {
    this.Specialization = Specialization;
    this.deleteSpecialization();
  }
  deleteSpecialization() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.Specialization.Place + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(new SpecializationActions.DeleteSpecialization(this.Specialization.Id as string)).subscribe(
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
    this.specializationDialog = false;
    this.submitted = false;
  }

  saveSpecialization() {
    this.submitted = true;
    if (this.specializationForm.valid) {
      if (this.Specialization.Id) {
        delete this.Specialization.Request;
        this.store.dispatch(new SpecializationActions.UpdateSpecialization(this.Specialization)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        delete this.Specialization.Id;
        this.store.dispatch(new SpecializationActions.AddSpecialization(this.Specialization)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.specializationDialog = false;
      this.Specialization = {};
    }
  }

  reload() {
    this.store.dispatch(new SpecializationActions.GetSpecializationsInfo('')).subscribe(
      () => {
        this.specializations = this.store.selectSnapshot<Specialization[]>((state) => state.users.specializations);
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
    this.Specialization.RequestId = this.RequestId;
  }

  get f() {
    return this.specializationForm.controls;
  }
}
