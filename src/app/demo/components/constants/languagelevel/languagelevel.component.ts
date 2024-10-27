import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { LanguageLevel } from 'src/app/demo/models/constants/languagelevel.model';
import { AuthServiceService } from 'src/app/demo/service/common/auth-service.service';
import { LanguageLevelService } from 'src/app/demo/service/constants/languagelevel.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';
import { ActionDef, TABLE_ACTION } from 'src/app/demo/shared/models/action-def';

@Component({
  selector: 'app-languagelevel',
  templateUrl: './languagelevel.component.html',
  styleUrls: ['./languagelevel.component.css']
})
export class LanguageLevelComponent implements OnInit {
  cols: any[] = [];
  languagelevels: LanguageLevel[] = [];
  formStructure: IFormStructure[] = [];
  canAdd: string = 'HR_LanguageLevel_CreateLanguageLevel';
  canEdit: string = 'HR_LanguageLevel_UpdateLanguageLevel';
  canSingleDelete: string = 'HR_LanguageLevel_DeleteLanguageLevel';
  tableActions: ActionDef[] = [];
  constructor(private readonly authServiceService: AuthServiceService, private messageService: MessageService,
    private readonly languagelevelService: LanguageLevelService) {
    this.initColumns();
    this.initFormStructure();
    this.initActions();
  }

  ngOnInit(): void {
    this.languagelevelService.GetAllLanguageLevels('').subscribe(
      (res) => {
        this.languagelevels = res
      }
    );
  }

  initActions() {
    this.tableActions = [
      {
        visible: this.authServiceService.checkPermission(this.canEdit),
        type: TABLE_ACTION.EDIT,
      },
      {
        visible: this.authServiceService.checkPermission(this.canAdd),
        type: TABLE_ACTION.Add,
      },
      {
        visible: this.authServiceService.checkPermission(this.canSingleDelete),
        type: TABLE_ACTION.DELETE,
      }
    ]
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
      this.languagelevelService.UpdateLanguageLevel(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.languagelevelService.AddLanguageLevel(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.languagelevelService.DeleteLanguageLevel(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.languagelevelService.GetAllLanguageLevels('').subscribe(
      (res) => {
        this.languagelevels = res;
      }
    )
  }
}
