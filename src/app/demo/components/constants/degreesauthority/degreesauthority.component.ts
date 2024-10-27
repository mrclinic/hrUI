import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { DegreesAuthority } from 'src/app/demo/models/constants/degreesauthority.model';
import { AuthServiceService } from 'src/app/demo/service/common/auth-service.service';
import { DegreesAuthorityService } from 'src/app/demo/service/constants/degreesauthority.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';
import { ActionDef, TABLE_ACTION } from 'src/app/demo/shared/models/action-def';

@Component({
  selector: 'app-degreesauthority',
  templateUrl: './degreesauthority.component.html',
  styleUrls: ['./degreesauthority.component.css']
})
export class DegreesAuthorityComponent implements OnInit {
  cols: any[] = [];
  degreesauthoritys: DegreesAuthority[] = [];
  formStructure: IFormStructure[] = [];
  canAdd: string = 'HR_DegreesAuthority_CreateDegreesAuthority';
  canEdit: string = 'HR_DegreesAuthority_UpdateDegreesAuthority';
  canSingleDelete: string = 'HR_DegreesAuthority_DeleteDegreesAuthority';
  tableActions: ActionDef[] = [];
  constructor(private readonly authServiceService: AuthServiceService, private messageService: MessageService,
    private readonly degreesauthorityService: DegreesAuthorityService) {
    this.initColumns();
    this.initFormStructure();
    this.initActions();
  }

  ngOnInit(): void {
    this.degreesauthorityService.GetAllDegreesAuthoritys('').subscribe(
      (res) => {
        this.degreesauthoritys = res
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
      this.degreesauthorityService.UpdateDegreesAuthority(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.degreesauthorityService.AddDegreesAuthority(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.degreesauthorityService.DeleteDegreesAuthority(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.degreesauthorityService.GetAllDegreesAuthoritys('').subscribe(
      (res) => {
        this.degreesauthoritys = res;
      }
    )
  }
}
