import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { GeneralService } from 'src/app/demo/service/common/general-service.service';
import { LanguageService } from 'src/app/demo/service/constants/language.service';
import { LanguageLevelService } from 'src/app/demo/service/constants/languagelevel.service';
import { EmpLanguageService } from 'src/app/demo/service/employee/emplanguage.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-emplanguage',
  templateUrl: './emplanguage.component.html',
  styleUrls: ['./emplanguage.component.css'],
  providers: [GeneralService]
})
export class EmpLanguageComponent implements OnInit {
  cols: any[] = [];
  emplanguages: any[] = [];
  formStructure: IFormStructure[] = [];
  fetched: boolean = false;
  filter: string;
  canAdd: string = 'HR_EmpLanguage_CreateEmpLanguage';
  canEdit: string = 'HR_EmpLanguage_UpdateEmpLanguage';
  canSingleDelete: string = 'HR_EmpLanguage_DeleteEmpLanguage';
  @Input() personId: string;
  languages: any[] = [];
  languageLevels: any[] = [];
  constructor(private messageService: MessageService,
    private readonly emplanguageService: EmpLanguageService, private readonly languageService: LanguageService
    , private readonly languageLevelService: LanguageLevelService, private readonly generalService: GeneralService) {
    this.initColumns();
  }

  ngOnInit(): void {
    this.filter = `Filters=EmployeeId==${this.personId}`;
    forkJoin([this.emplanguageService.GetEmpLanguagesInfo(this.filter),
    this.languageService.GetAllLanguages(''), this.languageLevelService.GetAllLanguageLevels('')
    ])
      .subscribe(([emplanguages, languages, languageLevels
      ]) => {
        this.emplanguages = this.mapItemList(emplanguages);

        this.languages = languages.map((item) => {
          return Object.assign(item, {
            label: item?.name,
            value: item?.id
          });
        });

        this.languageLevels = languageLevels.map((item) => {
          return Object.assign(item, {
            label: item?.name,
            value: item?.id
          });
        });
        this.initFormStructure();
        this.fetched = true;
      });
  }

  mapItemList(items: any[]): any[] {
    return items.map((item) => {
      return Object.assign(item, {
        ...item,
        languageName: item?.language?.name,
        languageLevelName: item?.languageLevel?.name,
        displayOnRecordCard: this.generalService.getRadioOptionLabel(item?.displayOnRecordCard)
      });
    })
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
        options: [...this.generalService.getRadioOptions()],
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: APP_CONSTANTS.FIELD_REQUIRED,
          },
        ],
      },
      {
        type: 'text',
        label: APP_CONSTANTS.NOTE,
        name: 'note',
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
      { dataKey: 'languageName', header: APP_CONSTANTS.LANGUAGE_NAME },
      { dataKey: 'languageLevelName', header: APP_CONSTANTS.LANGUAGELEVEL_NAME },
      { dataKey: 'displayOnRecordCard', header: APP_CONSTANTS.DISPLAYONRECORDCARD },
      { dataKey: 'note', header: APP_CONSTANTS.NOTE }
    ]
  }

  submitEventHandler(eventData) {
    eventData = { ...eventData, employeeId: this.personId };
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
    this.filter = `Filters=EmployeeId==${this.personId}`;
    this.emplanguageService.GetEmpLanguagesInfo(this.filter).subscribe(
      (res) => {
        this.emplanguages = this.mapItemList(res);
      }
    )
  }
}
