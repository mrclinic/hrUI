import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { MilitaryRank } from 'src/app/demo/models/constants/militaryrank.model';
import { AuthServiceService } from 'src/app/demo/service/common/auth-service.service';
import { MilitaryRankService } from 'src/app/demo/service/constants/militaryrank.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';
import { ActionDef, TABLE_ACTION } from 'src/app/demo/shared/models/action-def';

@Component({
  selector: 'app-militaryrank',
  templateUrl: './militaryrank.component.html',
  styleUrls: ['./militaryrank.component.css']
})
export class MilitaryRankComponent implements OnInit {
  cols: any[] = [];
  militaryranks: MilitaryRank[] = [];
  formStructure: IFormStructure[] = [];
  canAdd: string = 'HR_MilitaryRank_CreateMilitaryRank';
  canEdit: string = 'HR_MilitaryRank_UpdateMilitaryRank';
  canSingleDelete: string = 'HR_MilitaryRank_DeleteMilitaryRank';
  tableActions: ActionDef[] = [];
  constructor(private readonly authServiceService: AuthServiceService, private messageService: MessageService,
    private readonly militaryrankService: MilitaryRankService) {
    this.initColumns();
    this.initFormStructure();
    this.initActions();
  }

  ngOnInit(): void {
    this.militaryrankService.GetAllMilitaryRanks('').subscribe(
      (res) => {
        this.militaryranks = res
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
      this.militaryrankService.UpdateMilitaryRank(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.militaryrankService.AddMilitaryRank(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.militaryrankService.DeleteMilitaryRank(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.militaryrankService.GetAllMilitaryRanks('').subscribe(
      (res) => {
        this.militaryranks = res;
      }
    )
  }
}
