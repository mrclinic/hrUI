import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { LanguageLevel } from 'src/app/demo/models/constants/languagelevel.model';
import { LanguageLevelService } from 'src/app/demo/service/constants/languagelevel.service';

@Component({
  selector: 'app-languagelevel',
  templateUrl: './languagelevel.component.html',
  styleUrls: ['./languagelevel.component.css']
})
export class LanguageLevelComponent implements OnInit {
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
  languagelevelForm: FormGroup;
  name: string = '';
  languagelevelDialog: boolean = false;

  deleteLanguageLevelDialog: boolean = false;

  deleteLanguageLevelsDialog: boolean = false;

  languagelevels: LanguageLevel[] = [];

  LanguageLevel: LanguageLevel = {};

  selectedLanguageLevels: LanguageLevel[] = [];
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService, private readonly languagelevelService: LanguageLevelService) {
    this.languagelevelForm = this.fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.languagelevelService.GetAllLanguageLevels('').subscribe(
      (res) => {
        this.languagelevels = res;
      }
    );
  }
  initColumns() {
    this.cols = [
      { field: 'name', header: "الاسم", type: 'string' }
    ]
  }
  openNew() {
    this.languagelevelForm.reset();
    this.LanguageLevel = {};
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
      message: 'هل أنت متأكد من حذف' + this.LanguageLevel.name + '?',
      header: 'تأكيد',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.languagelevelService.DeleteLanguageLevel(this.LanguageLevel.id as string).subscribe(
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
    this.languagelevelDialog = false;
  }

  saveLanguageLevel() {
    if (this.languagelevelForm.valid) {
      if (this.LanguageLevel.id) {
        this.languagelevelService.UpdateLanguageLevel(this.LanguageLevel).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية التعديل بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.languagelevelService.AddLanguageLevel(this.LanguageLevel).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية الإضافة بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      this.languagelevelDialog = false;
      this.LanguageLevel = {};
    }
  }

  reload() {
    this.languagelevelService.GetAllLanguageLevels('').subscribe(
      (res) => {
        this.languagelevels = res;
      }
    )
  }
  get f() {
    return this.languagelevelForm.controls;
  }
}
