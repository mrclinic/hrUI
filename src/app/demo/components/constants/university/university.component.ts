import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { University } from 'src/app/models/hr/university.model';
import { University } from 'src/app/models/hr/University';
import { UniversityActions } from 'src/app/stateManagement/hr/actions/University.action';
import { UniversityActions } from 'src/app/stateManagement/hr/actions/university.action';

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.css']
})
export class UniversityComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  universitys: University[] = [];
  cols: any[];
  universityDialog: boolean;
  University!: University;
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
  universityForm: FormGroup;
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService) {
    this.universityForm = fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
    this.universityDialog = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.store.dispatch(new UniversityActions.GetUniversitysInfo('')).subscribe(
      () => {
        this.universitys = this.store.selectSnapshot<University[]>((state) => state.users.universitys);
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
    this.University = {};
    this.submitted = false;
    this.universityDialog = true;
  }
  editUniversity(University: University) {
    this.University = { ...University };
    this.universityDialog = true;
  }
  deleteSelectedUniversity(University: University) {
    this.University = University;
    this.deleteUniversity();
  }
  deleteUniversity() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.University.Place + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(new UniversityActions.DeleteUniversity(this.University.Id as string)).subscribe(
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
    this.universityDialog = false;
    this.submitted = false;
  }

  saveUniversity() {
    this.submitted = true;
    if (this.universityForm.valid) {
      if (this.University.Id) {
        delete this.University.Request;
        this.store.dispatch(new UniversityActions.UpdateUniversity(this.University)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        delete this.University.Id;
        this.store.dispatch(new UniversityActions.AddUniversity(this.University)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.universityDialog = false;
      this.University = {};
    }
  }

  reload() {
    this.store.dispatch(new UniversityActions.GetUniversitysInfo('')).subscribe(
      () => {
        this.universitys = this.store.selectSnapshot<University[]>((state) => state.users.universitys);
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
    this.University.RequestId = this.RequestId;
  }

  get f() {
    return this.universityForm.controls;
  }
}
