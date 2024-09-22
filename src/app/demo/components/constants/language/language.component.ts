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

  languageForm: FormGroup;

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
  }
  initColumns() {
    this.cols = [
      { field: 'name', header: "الاسم", type: 'string' }
    ]
  }
  openNew() {
    this.languageForm.reset();
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
      message: 'هل أنت متأكد من حذف' + this.Language.name + '?',
      header: 'تأكيد',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.languageService.DeleteLanguage(this.Language.id as string).subscribe(
          (data) => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية الحذف بنجاح', life: 3000 });
            this.reload();
          }
        );
      },
      acceptLabel: 'نعم',
      rejectLabel: 'لا',
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
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية التعديل بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.languageService.AddLanguage(this.Language).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية الإضافة بنجاح', life: 3000 });
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
