import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { Language } from 'src/app/demo/models/constants/language.model';
import { LanguageService } from 'src/app/demo/service/constants/language.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {
  cols: any[] = [];
  languages: Language[] = [];
  formStructure: IFormStructure[] = [];
  canAdd: string = 'HR_Language_CreateLanguage';
  canEdit: string = 'HR_Language_UpdateLanguage';
  canSingleDelete: string = 'HR_Language_DeleteLanguage';

  constructor(private messageService: MessageService,
    private readonly languageService: LanguageService) {
    this.initColumns();
    this.initFormStructure();
  }

  ngOnInit(): void {
    this.languageService.GetAllLanguages('').subscribe(
      (res) => {
        this.languages = res
      }
    );
  }

  initFormStructure() {
    this.formStructure = [
      {
        type: 'text',
        label: APP_CONSTANTS.NAME,
        name: 'name',
        value: '',
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: APP_CONSTANTS.FIELD_REQUIRED,
          },
        ],
      }
    ];
  }

  initColumns() {
    this.cols = [
      { dataKey: 'name', header: APP_CONSTANTS.NAME, type: 'string' }
    ]
  }

  submitEventHandler(eventData) {
    if (eventData.id) {
      this.languageService.UpdateLanguage(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.languageService.AddLanguage(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.languageService.DeleteLanguage(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.languageService.GetAllLanguages('').subscribe(
      (res) => {
        this.languages = res;
      }
    )
  }
}
