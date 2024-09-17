import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { LanguageLevel } from 'src/app/models/hr/languagelevel.model';
import { University } from 'src/app/models/hr/University';
import { LanguageLevelActions } from 'src/app/stateManagement/hr/actions/LanguageLevel.action';
import { UniversityActions } from 'src/app/stateManagement/hr/actions/university.action';

@Component({
  selector: 'app-languagelevel',
  templateUrl: './languagelevel.component.html',
  styleUrls: ['./languagelevel.component.css']
})
export class LanguageLevelComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  languagelevels: LanguageLevel[] = [];
  cols: any[];
  languagelevelDialog: boolean;
  LanguageLevel!: LanguageLevel;
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
  languagelevelForm: FormGroup;
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService) {
    this.languagelevelForm = fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
    this.languagelevelDialog = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.store.dispatch(new LanguageLevelActions.GetLanguageLevelsInfo('')).subscribe(
      () => {
        this.languagelevels = this.store.selectSnapshot<LanguageLevel[]>((state) => state.users.languagelevels);
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
    this.LanguageLevel = {};
    this.submitted = false;
    this.languagelevelDialog = true;
  }
  editLanguageLevel(LanguageLevel: LanguageLevel) {
    this.LanguageLevel = { ...LanguageLevel };
    this.languagelevelDialog = true;
  }
  deleteSelectedLanguageLevel(LanguageLevel: LanguageLevel) {
    this.LanguageLevel = LanguageLevel;
    this.deleteLanguageLevel();
  }
  deleteLanguageLevel() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.LanguageLevel.Place + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(new LanguageLevelActions.DeleteLanguageLevel(this.LanguageLevel.Id as string)).subscribe(
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
    this.languagelevelDialog = false;
    this.submitted = false;
  }

  saveLanguageLevel() {
    this.submitted = true;
    if (this.languagelevelForm.valid) {
      if (this.LanguageLevel.Id) {
        delete this.LanguageLevel.Request;
        this.store.dispatch(new LanguageLevelActions.UpdateLanguageLevel(this.LanguageLevel)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        delete this.LanguageLevel.Id;
        this.store.dispatch(new LanguageLevelActions.AddLanguageLevel(this.LanguageLevel)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.languagelevelDialog = false;
      this.LanguageLevel = {};
    }
  }

  reload() {
    this.store.dispatch(new LanguageLevelActions.GetLanguageLevelsInfo('')).subscribe(
      () => {
        this.languagelevels = this.store.selectSnapshot<LanguageLevel[]>((state) => state.users.languagelevels);
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
    this.LanguageLevel.RequestId = this.RequestId;
  }

  get f() {
    return this.languagelevelForm.controls;
  }
}
