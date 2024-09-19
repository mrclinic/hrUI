import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Language } from 'src/app/demo/models/constants/language.model';
import { LanguageService } from 'src/app/demo/service/constants/language.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  cols: any[];
  CancelReason: string = '';
  ConfirmTitle: string = '';
  ConfirmMsg: string = '';
  Success: string = '';
  deleteSuccess: string = '';
  Yes: string = '';
  No: string = '';
  editSuccess: string = '';
  addSuccess: string = '';
  languageForm: FormGroup;
  name: string = '';
  languageDialog: boolean = false;

  deleteLanguageDialog: boolean = false;

  deleteLanguagesDialog: boolean = false;

  languages: Language[] = [];

  Language: Language = {};

  selectedLanguages: Language[] = [];
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService, private readonly languageService: LanguageService) {
    this.languageForm = this.fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.languageService.GetAllLanguages('').subscribe(
      (res) => {
        this.languages = res;
      }
    );
    this.translate.get('AppTitle').subscribe(
      () => {
        this.CancelReason = this.translate.instant('CancelReason');
        this.ConfirmTitle = this.translate.instant('ConfirmTitle');
        this.ConfirmMsg = this.translate.instant('ConfirmMsg');
        this.Success = this.translate.instant('Success');
        this.deleteSuccess = this.translate.instant('deleteSuccess');
        this.Yes = this.translate.instant('Yes');
        this.No = this.translate.instant('No');
        this.editSuccess = this.translate.instant('editSuccess');
        this.addSuccess = this.translate.instant('addSuccess');
        this.initColumns();
      }
    )
  }
  initColumns() {
    this.cols = [
      { field: 'name', header: "الاسم", type: 'string' }
    ]
  }
  openNew() {
    this.Language = {};
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
      message: this.ConfirmMsg + this.Language.name + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.languageService.DeleteLanguage(this.Language.id as string).subscribe(
          (data) => {
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
  }

  saveLanguage() {
    if (this.languageForm.valid) {
      if (this.Language.id) {
        this.languageService.UpdateLanguage(this.Language).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.languageService.AddLanguage(this.Language).subscribe(
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
    this.languageService.GetAllLanguages('').subscribe(
      (res) => {
        this.languages = res;
      }
    )
  }
  get f() {
    return this.languageForm.controls;
  }
}
