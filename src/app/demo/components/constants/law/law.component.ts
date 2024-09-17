import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Law } from 'src/app/models/hr/law.model';
import { University } from 'src/app/models/hr/University';
import { LawActions } from 'src/app/stateManagement/hr/actions/Law.action';
import { UniversityActions } from 'src/app/stateManagement/hr/actions/university.action';

@Component({
  selector: 'app-law',
  templateUrl: './law.component.html',
  styleUrls: ['./law.component.css']
})
export class LawComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  laws: Law[] = [];
  cols: any[];
  lawDialog: boolean;
  Law!: Law;
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
  lawForm: FormGroup;
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService) {
    this.lawForm = fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
    this.lawDialog = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.store.dispatch(new LawActions.GetLawsInfo('')).subscribe(
      () => {
        this.laws = this.store.selectSnapshot<Law[]>((state) => state.users.laws);
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
    this.Law = {};
    this.submitted = false;
    this.lawDialog = true;
  }
  editLaw(Law: Law) {
    this.Law = { ...Law };
    this.lawDialog = true;
  }
  deleteSelectedLaw(Law: Law) {
    this.Law = Law;
    this.deleteLaw();
  }
  deleteLaw() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.Law.Place + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(new LawActions.DeleteLaw(this.Law.Id as string)).subscribe(
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
    this.lawDialog = false;
    this.submitted = false;
  }

  saveLaw() {
    this.submitted = true;
    if (this.lawForm.valid) {
      if (this.Law.Id) {
        delete this.Law.Request;
        this.store.dispatch(new LawActions.UpdateLaw(this.Law)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        delete this.Law.Id;
        this.store.dispatch(new LawActions.AddLaw(this.Law)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.lawDialog = false;
      this.Law = {};
    }
  }

  reload() {
    this.store.dispatch(new LawActions.GetLawsInfo('')).subscribe(
      () => {
        this.laws = this.store.selectSnapshot<Law[]>((state) => state.users.laws);
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
    this.Law.RequestId = this.RequestId;
  }

  get f() {
    return this.lawForm.controls;
  }
}
