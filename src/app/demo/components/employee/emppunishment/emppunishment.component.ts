import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { EmpPunishment } from 'src/app/demo/models/employee/emppunishment.model';
import { GeneralService } from 'src/app/demo/service/common/general-service.service';
import { ModificationContractTypeService } from 'src/app/demo/service/constants/modificationcontracttype.service';
import { OrgDepartmentService } from 'src/app/demo/service/constants/org-department.service';
import { PunishmentTypeService } from 'src/app/demo/service/constants/punishmenttype.service';
import { EmpPunishmentService } from 'src/app/demo/service/employee/emppunishment.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-emppunishment',
  templateUrl: './emppunishment.component.html',
  styleUrls: ['./emppunishment.component.css']
})
export class EmpPunishmentComponent implements OnInit {
  cols: any[] = [];
  emppunishments: EmpPunishment[] = [];
  formStructure: IFormStructure[] = [];
  fetched: boolean = false;
  filter: string;
  canAdd: string = 'HR_EmpPunishment_CreateEmpPunishment';
  canEdit: string = 'HR_EmpPromotion_UpdateEmpPromotion';
  canSingleDelete: string = 'HR_EmpPromotion_DeleteEmpPromotion';
  @Input() personId: string;
  issuingDepartments: any;
  orderDepartments: any;
  contractTypes: any;
  punishmentTypes: any;
  constructor(private messageService: MessageService, private datePipe: DatePipe,
    private readonly emppunishmentService: EmpPunishmentService,
    private readonly orgDepartmentService: OrgDepartmentService,
    private readonly modificationContractTypeService: ModificationContractTypeService,
    private readonly punishmentTypeService: PunishmentTypeService, private readonly generalService: GeneralService) {
    this.initColumns();
  }

  transformDate(date: string | number | Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    this.filter = `Filters=EmployeeId==${this.personId}`;
    forkJoin([this.emppunishmentService.GetEmpPunishmentsInfo(this.filter),
    this.orgDepartmentService.GetAllOrgDepartments(''),
    this.modificationContractTypeService.GetAllModificationContractTypes(''),
    this.punishmentTypeService.GetAllPunishmentTypes('')
    ])
      .subscribe(([emppunishments, issuingDepartments, contractTypes, punishmentTypes
      ]) => {
        this.emppunishments = this.mapItemList(emppunishments);

        this.issuingDepartments = issuingDepartments.map((item) => {
          return Object.assign(item, {
            label: item?.name,
            value: item?.id
          });
        });
        this.orderDepartments = this.issuingDepartments;

        this.contractTypes = contractTypes.map((item) => {
          return Object.assign(item, {
            label: item?.name,
            value: item?.id
          });
        });
        this.punishmentTypes = punishmentTypes.map((item) => {
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
        issuingDepartmentName: item?.issuingOrgDepartment?.name,
        orderDepartmentName: item?.orderOrgDepartment?.name,
        contractTypeName: item?.contractType?.name,
        punishmentTypeName: item?.punishmentType?.name,
        executionDate: this.transformDate(item?.executionDate),
        orderDate: this.transformDate(item?.orderDate),
        contractDate: this.transformDate(item?.contractDate),
        isAppearingInRecordCard: this.generalService.getRadioOptionLabel(item?.isAppearingInRecordCard),
        isPercentage: this.generalService.getRadioOptionLabel(item?.isPercentage)
      });
    })
  }

  initFormStructure() {
    this.formStructure = [
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
        label: APP_CONSTANTS.ISSUINGDEPARTMENT_NAME,
        name: 'issuingDepartmentId',
        value: '',
        options: [...this.issuingDepartments],
        placeHolder: APP_CONSTANTS.ISSUINGDEPARTMENT_PLACE_HOLDER,
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
        type: 'select',
        label: APP_CONSTANTS.ORDERDEPARTMENT_NAME,
        name: 'orderDepartmentId',
        value: '',
        options: [...this.orderDepartments],
        placeHolder: APP_CONSTANTS.ORDERDEPARTMENT_PLACE_HOLDER,
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
        label: APP_CONSTANTS.ISAPPEARINGINRECORDCARD,
        name: 'isAppearingInRecordCard',
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
        type: 'select',
        label: APP_CONSTANTS.PUNISHMENTTYPE_NAME,
        name: 'punishmentTypeId',
        value: '',
        options: [...this.punishmentTypes],
        placeHolder: APP_CONSTANTS.PUNISHMENTTYPE_PLACE_HOLDER,
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
        type: 'radio',
        label: APP_CONSTANTS.ISPERCENTAGE,
        name: 'isPercentage',
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
        label: APP_CONSTANTS.REASON,
        name: 'reason',
        value: '',
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: APP_CONSTANTS.FIELD_REQUIRED,
          },
          {
            name: 'maxlength',
            validator: 'maxlength',
            message: APP_CONSTANTS.FIELD_MAX_LENGTH,
            value: 255
          }
        ],
      },
      {
        type: 'text',
        label: APP_CONSTANTS.ORDERCONTRACTNUMBER,
        name: 'orderContractNumber',
        value: '',
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: APP_CONSTANTS.FIELD_REQUIRED,
          },
          {
            name: 'maxlength',
            validator: 'maxlength',
            message: APP_CONSTANTS.FIELD_MAX_LENGTH,
            value: 255
          }
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
          {
            name: 'maxlength',
            validator: 'maxlength',
            message: APP_CONSTANTS.FIELD_MAX_LENGTH,
            value: 255
          }
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
      { dataKey: 'executionDate', header: APP_CONSTANTS.EXECUTIONDATE },
      { dataKey: 'orderDate', header: APP_CONSTANTS.ORDERDATE },
      { dataKey: 'contractDate', header: APP_CONSTANTS.CONTRACTDATE },
      { dataKey: 'issuingDepartmentName', header: APP_CONSTANTS.ISSUINGDEPARTMENT_NAME },
      { dataKey: 'durationInDays', header: APP_CONSTANTS.DURATIONINDAYS },
      { dataKey: 'orderDepartmentName', header: APP_CONSTANTS.ORDERDEPARTMENT_NAME },
      { dataKey: 'isAppearingInRecordCard', header: APP_CONSTANTS.ISAPPEARINGINRECORDCARD },
      { dataKey: 'contractTypeName', header: APP_CONSTANTS.CONTRACTTYPE_NAME },
      { dataKey: 'punishmentTypeName', header: APP_CONSTANTS.PUNISHMENTTYPE_NAME },
      { dataKey: 'percentageOrAmount', header: APP_CONSTANTS.PERCENTAGEORAMOUNT },
      { dataKey: 'isPercentage', header: APP_CONSTANTS.ISPERCENTAGE },
      { dataKey: 'reason', header: APP_CONSTANTS.REASON },
      { dataKey: 'orderContractNumber', header: APP_CONSTANTS.ORDERCONTRACTNUMBER },
      { dataKey: 'contractNumber', header: APP_CONSTANTS.CONTRACTNUMBER },
      { dataKey: 'note', header: APP_CONSTANTS.NOTE }
    ]
  }

  submitEventHandler(eventData) {
    eventData = { ...eventData, employeeId: this.personId };
    if (eventData.id) {
      this.emppunishmentService.UpdateEmpPunishment(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.emppunishmentService.AddEmpPunishment(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.emppunishmentService.DeleteEmpPunishment(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.filter = `Filters=EmployeeId==${this.personId}`;
    this.emppunishmentService.GetEmpPunishmentsInfo(this.filter).subscribe(
      (res) => {
        this.emppunishments = this.mapItemList(res);
      }
    )
  }
}
