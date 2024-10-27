import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { BloodGroup } from 'src/app/demo/models/constants/bloodgroup.model';
import { AuthServiceService } from 'src/app/demo/service/common/auth-service.service';
import { BloodGroupService } from 'src/app/demo/service/constants/bloodgroup.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';
import { ActionDef, TABLE_ACTION } from 'src/app/demo/shared/models/action-def';

@Component({
  selector: 'app-bloodgroup',
  templateUrl: './bloodgroup.component.html',
  styleUrls: ['./bloodgroup.component.css']
})
export class BloodGroupComponent implements OnInit {
  cols: any[] = [];
  bloodgroups: BloodGroup[] = [];
  formStructure: IFormStructure[] = [];
  canAdd: string = 'HR_BloodGroup_CreateBloodGroup';
  canEdit: string = 'HR_BloodGroup_UpdateBloodGroup';
  canSingleDelete: string = 'HR_BloodGroup_DeleteBloodGroup';
  tableActions: ActionDef[] = [];

  constructor(private messageService: MessageService,
    private readonly bloodgroupService: BloodGroupService, private readonly authServiceService: AuthServiceService) {
    this.initColumns();
    this.initFormStructure();
    this.initActions();
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
  ngOnInit(): void {
    this.bloodgroupService.GetAllBloodGroups('').subscribe(
      (res) => {
        this.bloodgroups = res
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
      this.bloodgroupService.UpdateBloodGroup(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.bloodgroupService.AddBloodGroup(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.bloodgroupService.DeleteBloodGroup(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.bloodgroupService.GetAllBloodGroups('').subscribe(
      (res) => {
        this.bloodgroups = res;
      }
    )
  }
}
