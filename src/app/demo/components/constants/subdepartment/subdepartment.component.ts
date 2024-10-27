import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { SubDepartment } from 'src/app/demo/models/constants/subdepartment.model';
import { AuthServiceService } from 'src/app/demo/service/common/auth-service.service';
import { DepartmentService } from 'src/app/demo/service/constants/department.service';
import { SubDepartmentService } from 'src/app/demo/service/constants/subdepartment.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';
import { ActionDef, TABLE_ACTION } from 'src/app/demo/shared/models/action-def';

@Component({
  selector: 'app-subdepartment',
  templateUrl: './subdepartment.component.html',
  styleUrls: ['./subdepartment.component.css']
})
export class SubDepartmentComponent implements OnInit {
  cols: any[] = [];
  subdepartments: SubDepartment[] = [];
  formStructure: IFormStructure[] = [];
  canAdd: string = 'HR_SubDepartment_CreateSubDepartment';
  canEdit: string = 'HR_SubDepartment_UpdateSubDepartment';
  canSingleDelete: string = 'HR_SubDepartment_DeleteSubDepartment';
  departments: any[] = [];
  fetched: boolean = false;
  tableActions: ActionDef[] = [];
  constructor(private readonly authServiceService: AuthServiceService, private messageService: MessageService,
    private readonly subdepartmentService: SubDepartmentService,
    private readonly departmentService: DepartmentService) {
    this.initColumns();
  }

  ngOnInit(): void {
    forkJoin([this.subdepartmentService.GetSubDepartmentsInfo(''),
    this.departmentService.GetAllDepartments('')]).subscribe(([res, departments]) => {
      this.subdepartments = this.mapItemList(res);
      this.departments = departments.map((item) => {
        return Object.assign(item, {
          label: item?.name,
          value: item?.id
        });
      })
      this.initFormStructure();
      this.initActions();
      this.fetched = true;
    })
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
      },
      {
        type: 'select',
        label: APP_CONSTANTS.department_NAME,
        name: 'departmentId',
        value: '',
        options: [...this.departments],
        placeHolder: APP_CONSTANTS.department_PLACE_HOLDER,
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
      { dataKey: 'name', header: APP_CONSTANTS.NAME, type: 'string' },
      { dataKey: 'departmentName', header: APP_CONSTANTS.department_NAME, type: 'string' }
    ]
  }

  submitEventHandler(eventData) {
    if (eventData.id) {
      this.subdepartmentService.UpdateSubDepartment(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.subdepartmentService.AddSubDepartment(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.subdepartmentService.DeleteSubDepartment(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.subdepartmentService.GetSubDepartmentsInfo('').subscribe(
      (res) => {
        this.subdepartments = this.mapItemList(res);
      }
    )
  }
  mapItemList(items) {
    return items.map((item) => {
      return Object.assign(item, {
        ...item,
        departmentName: item?.department?.name
      });
    })
  }
}
