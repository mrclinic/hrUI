import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { FinancialIndicatorTypeService } from 'src/app/demo/service/constants/financialindicatortype.service';
import { ModificationContractTypeService } from 'src/app/demo/service/constants/modificationcontracttype.service';
import { OrgDepartmentService } from 'src/app/demo/service/constants/org-department.service';
import { RewardTypeService } from 'src/app/demo/service/constants/rewardtype.service';
import { EmpRewardService } from 'src/app/demo/service/employee/empreward.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-empreward',
  templateUrl: './empreward.component.html',
  styleUrls: ['./empreward.component.css']
})
export class EmpRewardComponent implements OnInit {
  cols: any[] = [];
  emprewards: any[] = [];
  formStructure: IFormStructure[] = [];
  fetched: boolean = false;
  filter: string;
  canAdd: string = '';
  canEdit: string = '';
  canSingleDelete: string = '';
  @Input() personId: string;
  rewardTypes: any[] = [];
  departments: any[] = [];
  contractTypes: any[] = [];
  financialIndicatorTypes: any[] = [];
  constructor(private messageService: MessageService, private datePipe: DatePipe,
    private readonly emprewardService: EmpRewardService,
    private readonly rewardTypeService: RewardTypeService,
    private readonly orgDepartmentService: OrgDepartmentService,
    private readonly modificationContractTypeService: ModificationContractTypeService,
    private readonly financialIndicatorTypeService: FinancialIndicatorTypeService
  ) {
    this.initColumns();
  }

  transformDate(date: string | number | Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    this.filter = `Filters=EmployeeId==${this.personId}`;
    forkJoin([this.emprewardService.GetEmpRewardsInfo(this.filter),
    this.rewardTypeService.GetAllRewardTypes(''),
    this.orgDepartmentService.GetAllOrgDepartments(''),
    this.modificationContractTypeService.GetAllModificationContractTypes(''),
    this.financialIndicatorTypeService.GetAllFinancialIndicatorTypes('')
    ])
      .subscribe(([emprewards, rewardTypes, departments, contractTypes, financialIndicatorTypes
      ]) => {
        this.emprewards = this.mapItemList(emprewards);

        this.rewardTypes = rewardTypes.map((item) => {
          return Object.assign(item, {
            label: item?.name,
            value: item?.id
          });
        });

        this.departments = departments.map((item) => {
          return Object.assign(item, {
            label: item?.name,
            value: item?.id
          });
        });

        this.contractTypes = contractTypes.map((item) => {
          return Object.assign(item, {
            label: item?.name,
            value: item?.id
          });
        });

        this.financialIndicatorTypes = financialIndicatorTypes.map((item) => {
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
        contractTypeName: item?.contractType?.name,
        departmentName: item?.orgDepartment?.name,
        financialIndicatorTypeName: item?.financialIndicatorType?.name,
        rewardTypeName: item?.rewardType?.name,
        orderDate: this.transformDate(item?.orderDate),
        executionDate: this.transformDate(item?.executionDate),
        contractDate: this.transformDate(item?.contractDate)
      });
    })
  }

  initFormStructure() {
    this.formStructure = [
      {
        type: 'Date',
        label: APP_CONSTANTS.ORDERDATE,
        name: 'orderDate',
        value: '',
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: APP_CONSTANTS.FIELD_REQUIRED,
          },
        ],
        format: 'yy-mm-dd'
      },
      {
        type: 'Date',
        label: APP_CONSTANTS.EXECUTIONDATE,
        name: 'executionDate',
        value: '',
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: APP_CONSTANTS.FIELD_REQUIRED,
          },
        ],
        format: 'yy-mm-dd'
      },
      {
        type: 'Date',
        label: APP_CONSTANTS.CONTRACTDATE,
        name: 'contractDate',
        value: '',
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: APP_CONSTANTS.FIELD_REQUIRED,
          },
        ],
        format: 'yy-mm-dd'
      },
      {
        type: 'select',
        label: APP_CONSTANTS.REWARDTYPE_NAME,
        name: 'rewardTypeId',
        value: '',
        options: [...this.rewardTypes],
        placeHolder: APP_CONSTANTS.REWARDTYPE_PLACE_HOLDER,
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
        label: APP_CONSTANTS.CONTRACTTYPE_NAME,
        name: 'contractTypeId',
        value: '',
        options: [...this.contractTypes],
        placeHolder: APP_CONSTANTS.CONTRACTTYPE_PLACE_HOLDER,
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: APP_CONSTANTS.FIELD_REQUIRED,
          },
        ],
      },
      {
        type: 'number',
        label: APP_CONSTANTS.DURATIONINDAYS,
        name: 'durationInDays',
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
        type: 'number',
        label: APP_CONSTANTS.PERCENTAGEORAMOUNT,
        name: 'percentageOrAmount',
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
        label: APP_CONSTANTS.FINANCIALINDICATORTYPE_NAME,
        name: 'financialIndicatorTypeId',
        value: '',
        options: [...this.financialIndicatorTypes],
        placeHolder: APP_CONSTANTS.FINANCIALINDICATORTYPE_PLACE_HOLDER,
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
        label: APP_CONSTANTS.REASON,
        name: 'reason',
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
        type: 'text',
        label: APP_CONSTANTS.ORDERNUMBER,
        name: 'orderNumber',
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
        type: 'text',
        label: APP_CONSTANTS.CONTRACTNUMBER,
        name: 'contractNumber',
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
      { dataKey: 'orderDate', header: APP_CONSTANTS.ORDERDATE },
      { dataKey: 'executionDate', header: APP_CONSTANTS.EXECUTIONDATE },
      { dataKey: 'contractDate', header: APP_CONSTANTS.CONTRACTDATE },
      { dataKey: 'durationInDays', header: APP_CONSTANTS.DURATIONINDAYS },
      { dataKey: 'percentageOrAmount', header: APP_CONSTANTS.PERCENTAGEORAMOUNT },
      { dataKey: 'reason', header: APP_CONSTANTS.REASON },
      { dataKey: 'orderNumber', header: APP_CONSTANTS.ORDERNUMBER },
      { dataKey: 'contractNumber', header: APP_CONSTANTS.CONTRACTNUMBER },
      { dataKey: 'contractTypeName', header: APP_CONSTANTS.CONTRACTTYPE_NAME },
      { dataKey: 'departmentName', header: APP_CONSTANTS.department_NAME },
      { dataKey: 'financialIndicatorTypeName', header: APP_CONSTANTS.FINANCIALINDICATORTYPE_NAME },
      { dataKey: 'rewardTypeName', header: APP_CONSTANTS.REWARDTYPE_NAME },
      { dataKey: 'note', header: APP_CONSTANTS.NOTE }
    ]
  }

  submitEventHandler(eventData) {
    eventData = { ...eventData, employeeId: this.personId };
    if (eventData.id) {
      this.emprewardService.UpdateEmpReward(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.emprewardService.AddEmpReward(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.emprewardService.DeleteEmpReward(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.filter = `Filters=EmployeeId==${this.personId}`;
    this.emprewardService.GetEmpRewardsInfo(this.filter).subscribe(
      (res) => {
        this.emprewards = this.mapItemList(res);
      }
    )
  }
}
