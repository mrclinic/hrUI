import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { ModificationContractTypeService } from 'src/app/demo/service/constants/modificationcontracttype.service';
import { StartingTypeService } from 'src/app/demo/service/constants/startingtype.service';
import { EmpEmploymentStatusService } from 'src/app/demo/service/employee/empemploymentstatus.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-empemploymentstatus',
  templateUrl: './empemploymentstatus.component.html',
  styleUrls: ['./empemploymentstatus.component.css']
})
export class EmpEmploymentStatusComponent implements OnInit {
  cols: any[] = [];
  empemploymentstatuss: any[] = [];
  formStructure: IFormStructure[] = [];
  contractTypes: any[] = [];
  startingTypes: any[] = [];
  fetched: boolean = false;
  filter: string;
  canAdd: string = 'HR_EmpEmploymentStatus_CreateEmpEmploymentStatus';
  canEdit: string = 'HR_EmpEmploymentStatus_UpdateEmpEmploymentStatus';
  canSingleDelete: string = 'HR_EmpEmploymentStatus_DeleteEmpEmploymentStatus';
  @Input() personId: string;

  constructor(private messageService: MessageService,
    private readonly empemploymentstatusService: EmpEmploymentStatusService, private readonly modificationContractTypeService: ModificationContractTypeService,
    private readonly startingTypeService: StartingTypeService, private datePipe: DatePipe
  ) {
    this.initColumns();
  }
  transformDate(date: string | number | Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    this.filter = `Filters=EmployeeId==${this.personId}`;
    forkJoin([this.empemploymentstatusService.GetEmpEmploymentStatussInfo(this.filter),
    this.modificationContractTypeService.GetAllModificationContractTypes(''),
    this.startingTypeService.GetAllStartingTypes('')
    ])
      .subscribe(([empemploymentstatuss, contracttypes, startingTypes
      ]) => {
        this.empemploymentstatuss = this.mapItemList(empemploymentstatuss);

        this.contractTypes = contracttypes.map((item) => {
          return Object.assign(item, {
            label: item?.name,
            value: item?.id
          });
        });

        this.startingTypes = startingTypes.map((item) => {
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
        startingTypeName: item?.startingType?.name,
        startDate: this.transformDate(item?.startDate),
        contractDate: this.transformDate(item?.contractDate)
      });
    })
  }

  initFormStructure() {
    this.formStructure = [
      {
        type: 'Date',
        label: APP_CONSTANTS.STARTDATE,
        name: 'startDate',
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
        label: APP_CONSTANTS.STARTINGTYPE_NAME,
        name: 'startingTypeId',
        value: '',
        options: [...this.startingTypes],
        placeHolder: APP_CONSTANTS.STARTINGTYPE_PLACE_HOLDER,
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
      },
    ];
  }

  initColumns() {
    this.cols = [
      { dataKey: 'startDate', header: APP_CONSTANTS.STARTDATE },
      { dataKey: 'contractDate', header: APP_CONSTANTS.CONTRACTDATE },
      { dataKey: 'startingTypeName', header: APP_CONSTANTS.STARTINGTYPE_NAME },
      { dataKey: 'contractTypeName', header: APP_CONSTANTS.CONTRACTTYPE_NAME },
      { dataKey: 'contractNumber', header: APP_CONSTANTS.CONTRACTNUMBER },
      { dataKey: 'note', header: APP_CONSTANTS.NOTE }
    ]
  }

  submitEventHandler(eventData) {
    eventData = { ...eventData, employeeId: this.personId };
    if (eventData.id) {
      this.empemploymentstatusService.UpdateEmpEmploymentStatus(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.empemploymentstatusService.AddEmpEmploymentStatus(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.empemploymentstatusService.DeleteEmpEmploymentStatus(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.filter = `Filters=EmployeeId==${this.personId}`;
    this.empemploymentstatusService.GetEmpEmploymentStatussInfo(this.filter).subscribe(
      (res) => {
        this.empemploymentstatuss = this.mapItemList(res);
      }
    )
  }
}
