import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { BranchService } from 'src/app/demo/service/constants/branch.service';
import { DepartmentService } from 'src/app/demo/service/constants/department.service';
import { SubDepartmentService } from 'src/app/demo/service/constants/subdepartment.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';


@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {
  cols: any[] = [];
  branchs: any[] = [];
  departments: any[] | undefined;
  subdepartments: any[] | undefined;
  formStructure: IFormStructure[] = [];
  canAdd: string = '';
  canEdit: string = '';
  canSingleDelete: string = '';
  fetched: boolean = false;
  constructor(private messageService: MessageService,
    private readonly branchService: BranchService,
    private readonly departmentService: DepartmentService,
    private readonly subDepartmentService: SubDepartmentService) {
    this.initColumns();
  }

  ngOnInit(): void {
    forkJoin([this.branchService.GetBranchsInfo(''), this.departmentService.GetAllDepartments(''),
    this.subDepartmentService.GetAllSubDepartments('')])
      .subscribe(([branches, departments, subdepartments]) => {
        this.branchs = this.mapItemList(branches);
        this.departments = departments.map((item) => {
          return Object.assign(item, {
            label: item?.name,
            value: item?.id
          });
        });

        this.subdepartments = subdepartments.map((item) => {
          return Object.assign(item, {
            label: item?.name,
            value: item?.id
          });
        });

        this.initFormStructure();
        this.fetched = true;
      });
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
      },
      {
        type: 'select',
        label: APP_CONSTANTS.subdepartment_NAME,
        name: 'subDepartmentId',
        value: '',
        options: [...this.subdepartments],
        placeHolder: APP_CONSTANTS.subdepartment_PLACE_HOLDER,
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
      { dataKey: 'departmentName', header: APP_CONSTANTS.department_NAME, type: 'string' },
      { dataKey: 'subdepartmentName', header: APP_CONSTANTS.subdepartment_NAME, type: 'string' }
    ]
  }
  submitEventHandler(eventData) {
    if (eventData.id) {
      this.branchService.UpdateBranch(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.branchService.AddBranch(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.branchService.DeleteBranch(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.branchService.GetBranchsInfo('').subscribe(
      (res) => {
        this.branchs = this.mapItemList(res);
      }
    )
  }
  mapItemList(items) {
    return items.map((item) => {
      return Object.assign(item, {
        ...item,
        departmentName: item?.department?.name,
        subdepartmentName: item?.subDepartment?.name
      });
    })
  }
}
