import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { ModificationContractTypeService } from 'src/app/demo/service/constants/modificationcontracttype.service';
import { RelinquishmentReasonService } from 'src/app/demo/service/constants/relinquishmentreason.service';
import { EmpRelinquishmentService } from 'src/app/demo/service/employee/emprelinquishment.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-emprelinquishment',
  templateUrl: './emprelinquishment.component.html',
  styleUrls: ['./emprelinquishment.component.css']
})
export class EmpRelinquishmentComponent implements OnInit {
  cols: any[] = [];
  emprelinquishments: any[] = [];
  formStructure: IFormStructure[] = [];
  fetched: boolean = false;
  filter: string;
  canAdd: string = 'HR_EmpRelinquishment_CreateEmpRelinquishment';
  canEdit: string = 'HR_EmpRelinquishment_UpdateEmpRelinquishment';
  canSingleDelete: string = 'HR_EmpRelinquishment_DeleteEmpRelinquishment';
  @Input() personId: string;
  relinquishmentReasons: any;
  contractTypes: any;
  constructor(private messageService: MessageService, private datePipe: DatePipe,
    private readonly emprelinquishmentService: EmpRelinquishmentService,
    private readonly relinquishmentReasonService: RelinquishmentReasonService,
    private readonly modificationContractTypeService: ModificationContractTypeService
  ) {

    this.initColumns();
  }

  transformDate(date: string | number | Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    this.filter = `Filters=EmployeeId==${this.personId}`;
    forkJoin([this.emprelinquishmentService.GetEmpRelinquishmentsInfo(this.filter),
    this.relinquishmentReasonService.GetAllRelinquishmentReasons(''),
    this.modificationContractTypeService.GetAllModificationContractTypes('')
    ])
      .subscribe(([emprelinquishments, relinquishmentReasons, contractTypes
      ]) => {
        this.emprelinquishments = this.mapItemList(emprelinquishments);

        this.relinquishmentReasons = relinquishmentReasons.map((item) => {
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
        this.initFormStructure();
        this.fetched = true;
      });
  }

  mapItemList(items: any[]): any[] {
    return items.map((item) => {
      return Object.assign(item, {
        ...item,
        contractTypeName: item?.contractType?.name,
        relinquishmentReasonName: item?.relinquishmentReason?.name,
        relinquishmentDate: this.transformDate(item?.relinquishmentDate),
        contractDate: this.transformDate(item?.contractDate)
      });
    })
  }

  initFormStructure() {
    this.formStructure = [
      {
        type: 'Date',
        label: APP_CONSTANTS.RELINQUISHMENTDATE,
        name: 'relinquishmentDate',
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
        label: APP_CONSTANTS.RELINQUISHMENTREASON_NAME,
        name: 'relinquishmentReasonId',
        value: '',
        options: [...this.relinquishmentReasons],
        placeHolder: APP_CONSTANTS.RELINQUISHMENTREASON_PLACE_HOLDER,
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
      }
    ];
  }

  initColumns() {
    this.cols = [
      { dataKey: 'relinquishmentDate', header: APP_CONSTANTS.RELINQUISHMENTDATE },
      { dataKey: 'contractDate', header: APP_CONSTANTS.CONTRACTDATE },
      { dataKey: 'contractNumber', header: APP_CONSTANTS.CONTRACTNUMBER },
      { dataKey: 'note', header: APP_CONSTANTS.NOTE },
      { dataKey: 'contractTypeName', header: APP_CONSTANTS.CONTRACTTYPE_NAME },
      { dataKey: 'relinquishmentReasonName', header: APP_CONSTANTS.RELINQUISHMENTREASON_NAME },
      { dataKey: 'note', header: APP_CONSTANTS.NOTE }
    ]
  }

  submitEventHandler(eventData) {
    eventData = { ...eventData, employeeId: this.personId };
    if (eventData.id) {
      this.emprelinquishmentService.UpdateEmpRelinquishment(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.emprelinquishmentService.AddEmpRelinquishment(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.emprelinquishmentService.DeleteEmpRelinquishment(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.filter = `Filters=EmployeeId==${this.personId}`;
    this.emprelinquishmentService.GetEmpRelinquishmentsInfo(this.filter).subscribe(
      (res) => {
        this.emprelinquishments = this.mapItemList(res);
      }
    )
  }
}
