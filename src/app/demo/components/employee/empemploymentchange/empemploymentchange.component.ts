import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { JobChangeReasonService } from 'src/app/demo/service/constants/jobchangereason.service';
import { JobTitleService } from 'src/app/demo/service/constants/jobtitle.service';
import { ModificationContractTypeService } from 'src/app/demo/service/constants/modificationcontracttype.service';
import { EmpEmploymentChangeService } from 'src/app/demo/service/employee/empemploymentchange.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-empemploymentchange',
  templateUrl: './empemploymentchange.component.html',
  styleUrls: ['./empemploymentchange.component.css']
})
export class EmpEmploymentChangeComponent implements OnInit {
  cols: any[] = [];
  empemploymentchanges: any[] = [];
  formStructure: IFormStructure[] = [];
  canAdd: string = '';
  canEdit: string = '';
  canSingleDelete: string = '';
  @Input() personId: string;
  filter: string = '';
  fetched: boolean = false;
  jobChangeReasons: any[] = [];
  modificationContractTypes: any[] = [];
  jobTitles: any[] = [];
  constructor(private messageService: MessageService, private datePipe: DatePipe,
    private readonly empemploymentchangeService: EmpEmploymentChangeService,
    private readonly jobChangeReasonService: JobChangeReasonService,
    private readonly modificationContractTypeService: ModificationContractTypeService,
    private readonly jobTitleService: JobTitleService) {
    this.initColumns();
  }

  transformDate(date: string | number | Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    this.filter = `Filters=EmployeeId==${this.personId}`;
    forkJoin([this.empemploymentchangeService.GetEmpEmploymentChangesInfo(this.filter),
    this.jobChangeReasonService.GetAllJobChangeReasons(''),
    this.modificationContractTypeService.GetAllModificationContractTypes(''),
    this.jobTitleService.GetAllJobTitles('')
    ])
      .subscribe(([empemploymentchanges, jobChangeReasons, modificationContractTypes, jobTitles
      ]) => {
        this.empemploymentchanges = this.mapItemList(empemploymentchanges);

        this.jobChangeReasons = jobChangeReasons.map((item) => {
          return Object.assign(item, {
            label: item?.name,
            value: item?.id
          });
        });

        this.modificationContractTypes = modificationContractTypes.map((item) => {
          return Object.assign(item, {
            label: item?.name,
            value: item?.id
          });
        });

        this.jobTitles = jobTitles.map((item) => {
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
        jobChangeReasonName: item?.jobChangeReason?.name,
        modificationContractTypeName: item?.modificationContractType?.name,
        jobTitleName: item?.jobTitle?.name,
        dateOfAppointmentVisa: this.transformDate(item?.dateOfAppointmentVisa),
        dateOfStart: this.transformDate(item?.dateOfStart),
        dateOfChange: this.transformDate(item?.dateOfChange),
        dateOfContract: this.transformDate(item?.dateOfContract)
      });
    })
  }

  initFormStructure() {
    this.formStructure = [
      {
        type: 'Date',
        label: APP_CONSTANTS.DATEOFAPPOINTMENTVISA,
        name: 'dateOfAppointmentVisa',
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
        label: APP_CONSTANTS.DATEOFSTART,
        name: 'dateOfStart',
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
        label: APP_CONSTANTS.DATEOFCHANGE,
        name: 'dateOfChange',
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
        label: APP_CONSTANTS.DATEOFCONTRACT,
        name: 'dateOfContract',
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
        type: 'number',
        label: APP_CONSTANTS.SALARY,
        name: 'salary',
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
        label: APP_CONSTANTS.INSURANCESALARY,
        name: 'insuranceSalary',
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
        label: APP_CONSTANTS.JOBCHANGEREASON_NAME,
        name: 'jobChangeReasonId',
        value: '',
        options: [...this.jobChangeReasons],
        placeHolder: APP_CONSTANTS.JOBCHANGEREASON_PLACE_HOLDER,
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
        label: APP_CONSTANTS.ModificationContractType_NAME,
        name: 'modificationContractTypeId',
        value: '',
        options: [...this.modificationContractTypes],
        placeHolder: APP_CONSTANTS.ModificationContractType_PLACE_HOLDER,
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
        label: APP_CONSTANTS.JOBTITLE_NAME,
        name: 'jobTitleId',
        value: '',
        options: [...this.jobTitles],
        placeHolder: APP_CONSTANTS.JOBTITLE_PLACE_HOLDER,
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
        label: APP_CONSTANTS.WORKPLACE,
        name: 'workplace',
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
            value: 500
          }
        ],
      },
      {
        type: 'text',
        label: APP_CONSTANTS.VISANUMBER,
        name: 'visaNumber',
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
      { dataKey: 'dateOfAppointmentVisa', header: APP_CONSTANTS.DATEOFAPPOINTMENTVISA },
      { dataKey: 'dateOfStart', header: APP_CONSTANTS.DATEOFSTART },
      { dataKey: 'dateOfChange', header: APP_CONSTANTS.DATEOFCHANGE },
      { dataKey: 'dateOfContract', header: APP_CONSTANTS.DATEOFCONTRACT },
      { dataKey: 'salary', header: APP_CONSTANTS.SALARY },
      { dataKey: 'insuranceSalary', header: APP_CONSTANTS.INSURANCESALARY },
      { dataKey: 'jobChangeReasonName', header: APP_CONSTANTS.JOBCHANGEREASON_NAME },
      { dataKey: 'modificationContractTypeName', header: APP_CONSTANTS.ModificationContractType_NAME },
      { dataKey: 'jobTitleName', header: APP_CONSTANTS.JOBTITLE_NAME },
      { dataKey: 'workplace', header: APP_CONSTANTS.WORKPLACE },
      { dataKey: 'visaNumber', header: APP_CONSTANTS.VISANUMBER },
      { dataKey: 'contractNumber', header: APP_CONSTANTS.CONTRACTNUMBER },
      { dataKey: 'note', header: APP_CONSTANTS.NOTE }
    ]
  }

  submitEventHandler(eventData) {
    eventData = { ...eventData, employeeId: this.personId };
    if (eventData.id) {
      this.empemploymentchangeService.UpdateEmpEmploymentChange(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.empemploymentchangeService.AddEmpEmploymentChange(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.empemploymentchangeService.DeleteEmpEmploymentChange(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.filter = `Filters=EmployeeId==${this.personId}`;
    this.empemploymentchangeService.GetEmpEmploymentChangesInfo('').subscribe(
      (res) => {
        this.empemploymentchanges = this.mapItemList(res);
      }
    )
  }
}
