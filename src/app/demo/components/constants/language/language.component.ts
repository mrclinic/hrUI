import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Language } from 'src/app/models/hr/language.model';
import { University } from 'src/app/models/hr/University';
import { LanguageActions } from 'src/app/stateManagement/hr/actions/Language.action';
import { UniversityActions } from 'src/app/stateManagement/hr/actions/university.action';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  languages: Language[] = [];
  cols: any[];
  languageDialog: boolean;
  Language!: Language;
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
  languageForm: FormGroup;
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService) {
    this.languageForm = fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
    this.languageDialog = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.store.dispatch(new LanguageActions.GetLanguagesInfo('')).subscribe(
      () => {
        this.languages = this.store.selectSnapshot<Language[]>((state) => state.users.languages);
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
    this.Language = {};
    this.submitted = false;
    this.languageDialog = true;
  }
  editLanguage(Language: Language) {
    this.Language = { ...Language };
    this.languageDialog = true;
  }
  deleteSelectedLanguage(Language: Language) {
    this.Language = Language;
    this.deleteLanguage();
  }
  deleteLanguage() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.Language.Place + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(new LanguageActions.DeleteLanguage(this.Language.Id as string)).subscribe(
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
    this.languageDialog = false;
    this.submitted = false;
  }

  saveLanguage() {
    this.submitted = true;
    if (this.languageForm.valid) {
      if (this.Language.Id) {
        delete this.Language.Request;
        this.store.dispatch(new LanguageActions.UpdateLanguage(this.Language)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        delete this.Language.Id;
        this.store.dispatch(new LanguageActions.AddLanguage(this.Language)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.languageDialog = false;
      this.Language = {};
    }
  }

  reload() {
    this.store.dispatch(new LanguageActions.GetLanguagesInfo('')).subscribe(
      () => {
        this.languages = this.store.selectSnapshot<Language[]>((state) => state.users.languages);
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
    this.Language.RequestId = this.RequestId;
  }

  get f() {
    return this.languageForm.controls;
  }
}
