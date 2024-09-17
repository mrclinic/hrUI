import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Qualification } from 'src/app/models/hr/qualification.model';
import { University } from 'src/app/models/hr/University';
import { QualificationActions } from 'src/app/stateManagement/hr/actions/Qualification.action';
import { UniversityActions } from 'src/app/stateManagement/hr/actions/university.action';

@Component({
  selector: 'app-qualification',
  templateUrl: './qualification.component.html',
  styleUrls: ['./qualification.component.css']
})
export class QualificationComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  qualifications: Qualification[] = [];
  cols: any[];
  qualificationDialog: boolean;
  Qualification!: Qualification;
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
  qualificationForm: FormGroup;
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService) {
    this.qualificationForm = fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
    this.qualificationDialog = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.store.dispatch(new QualificationActions.GetQualificationsInfo('')).subscribe(
      () => {
        this.qualifications = this.store.selectSnapshot<Qualification[]>((state) => state.users.qualifications);
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
    this.Qualification = {};
    this.submitted = false;
    this.qualificationDialog = true;
  }
  editQualification(Qualification: Qualification) {
    this.Qualification = { ...Qualification };
    this.qualificationDialog = true;
  }
  deleteSelectedQualification(Qualification: Qualification) {
    this.Qualification = Qualification;
    this.deleteQualification();
  }
  deleteQualification() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.Qualification.Place + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(new QualificationActions.DeleteQualification(this.Qualification.Id as string)).subscribe(
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
    this.qualificationDialog = false;
    this.submitted = false;
  }

  saveQualification() {
    this.submitted = true;
    if (this.qualificationForm.valid) {
      if (this.Qualification.Id) {
        delete this.Qualification.Request;
        this.store.dispatch(new QualificationActions.UpdateQualification(this.Qualification)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        delete this.Qualification.Id;
        this.store.dispatch(new QualificationActions.AddQualification(this.Qualification)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.qualificationDialog = false;
      this.Qualification = {};
    }
  }

  reload() {
    this.store.dispatch(new QualificationActions.GetQualificationsInfo('')).subscribe(
      () => {
        this.qualifications = this.store.selectSnapshot<Qualification[]>((state) => state.users.qualifications);
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
    this.Qualification.RequestId = this.RequestId;
  }

  get f() {
    return this.qualificationForm.controls;
  }
}
