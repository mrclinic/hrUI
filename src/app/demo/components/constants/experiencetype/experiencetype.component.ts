import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { ExperienceType } from 'src/app/models/hr/experiencetype.model';
import { University } from 'src/app/models/hr/University';
import { ExperienceTypeActions } from 'src/app/stateManagement/hr/actions/ExperienceType.action';
import { UniversityActions } from 'src/app/stateManagement/hr/actions/university.action';

@Component({
  selector: 'app-experiencetype',
  templateUrl: './experiencetype.component.html',
  styleUrls: ['./experiencetype.component.css']
})
export class ExperienceTypeComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  experiencetypes: ExperienceType[] = [];
  cols: any[];
  experiencetypeDialog: boolean;
  ExperienceType!: ExperienceType;
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
  experiencetypeForm: FormGroup;
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService) {
    this.experiencetypeForm = fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
    this.experiencetypeDialog = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.store.dispatch(new ExperienceTypeActions.GetExperienceTypesInfo('')).subscribe(
      () => {
        this.experiencetypes = this.store.selectSnapshot<ExperienceType[]>((state) => state.users.experiencetypes);
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
    this.ExperienceType = {};
    this.submitted = false;
    this.experiencetypeDialog = true;
  }
  editExperienceType(ExperienceType: ExperienceType) {
    this.ExperienceType = { ...ExperienceType };
    this.experiencetypeDialog = true;
  }
  deleteSelectedExperienceType(ExperienceType: ExperienceType) {
    this.ExperienceType = ExperienceType;
    this.deleteExperienceType();
  }
  deleteExperienceType() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.ExperienceType.Place + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(new ExperienceTypeActions.DeleteExperienceType(this.ExperienceType.Id as string)).subscribe(
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
    this.experiencetypeDialog = false;
    this.submitted = false;
  }

  saveExperienceType() {
    this.submitted = true;
    if (this.experiencetypeForm.valid) {
      if (this.ExperienceType.Id) {
        delete this.ExperienceType.Request;
        this.store.dispatch(new ExperienceTypeActions.UpdateExperienceType(this.ExperienceType)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        delete this.ExperienceType.Id;
        this.store.dispatch(new ExperienceTypeActions.AddExperienceType(this.ExperienceType)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.experiencetypeDialog = false;
      this.ExperienceType = {};
    }
  }

  reload() {
    this.store.dispatch(new ExperienceTypeActions.GetExperienceTypesInfo('')).subscribe(
      () => {
        this.experiencetypes = this.store.selectSnapshot<ExperienceType[]>((state) => state.users.experiencetypes);
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
    this.ExperienceType.RequestId = this.RequestId;
  }

  get f() {
    return this.experiencetypeForm.controls;
  }
}
