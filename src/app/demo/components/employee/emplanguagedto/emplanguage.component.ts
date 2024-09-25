import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { EmpLanguage } from 'src/app/demo/models/employee/emplanguage.model';
import { EmpLanguageService } from 'src/app/demo/service/employee/emplanguage.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-emplanguage',
  templateUrl: './emplanguage.component.html',
  styleUrls: ['./emplanguage.component.css']
})
export class EmpLanguageComponent implements OnInit {
  cols: any[] = [];
  emplanguages: EmpLanguage[] = [];
  formStructure: IFormStructure[] = [];

  constructor(private messageService: MessageService,
    private readonly emplanguageService: EmpLanguageService) { }

  ngOnInit(): void {
    this.emplanguageService.GetAllEmpLanguages('').subscribe(
      (res) => {
        this.emplanguages = res;
        this.initColumns();
        this.initFormStructure();
      }
    );
  }

  initFormStructure() {
    this.formStructure = [
{
        type: 'select',
        label: APP_CONSTANTS.LANGUAGE_NAME,
        name: 'languageId',
        value: '',
        options: [...this.languages],
        placeHolder: APP_CONSTANTS.LANGUAGE_PLACE_HOLDER,
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: APP_CONSTANTS.FIELD_REQUIRED,
          },
        ],
      },
{
        type: 'select',
        label: APP_CONSTANTS.LANGUAGELEVEL_NAME,
        name: 'languageLevelId',
        value: '',
        options: [...this.languageLevels],
        placeHolder: APP_CONSTANTS.LANGUAGELEVEL_PLACE_HOLDER,
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: APP_CONSTANTS.FIELD_REQUIRED,
          },
        ],
      },
{
        type: 'radio',
        label: APP_CONSTANTS.DISPLAYONRECORDCARD,
        name: 'displayOnRecordCard',
        value: '',
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: APP_CONSTANTS.FIELD_REQUIRED,
          },
        ],
      },
    ];
  }

  initColumns() {
    this.cols = [
{ dataKey: 'languageId', header: APP_CONSTANTS.LANGUAGEID},
{ dataKey: 'languageName', header: APP_CONSTANTS.LANGUAGENAME},
{ dataKey: 'languageLevelId', header: APP_CONSTANTS.LANGUAGELEVELID},
{ dataKey: 'languageLevelName', header: APP_CONSTANTS.LANGUAGELEVELNAME},
{ dataKey: 'displayOnRecordCard', header: APP_CONSTANTS.DISPLAYONRECORDCARD},
    ]
  }

  submitEventHandler(eventData) {
    if (eventData.id) {
      this.emplanguageService.UpdateEmpLanguage(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.emplanguageService.AddEmpLanguage(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.emplanguageService.DeleteEmpLanguage(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.emplanguageService.GetAllEmpLanguages('').subscribe(
      (res) => {
        this.emplanguages = res;
      }
    )
  }
}
