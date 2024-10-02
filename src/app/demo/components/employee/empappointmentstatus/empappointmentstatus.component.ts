import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { DisabilityTypeService } from 'src/app/demo/service/constants/disabilitytype.service';
import { HealthyStatusService } from 'src/app/demo/service/constants/healthystatus.service';
import { InsuranceSystemService } from 'src/app/demo/service/constants/insurancesystem.service';
import { JobCategoryService } from 'src/app/demo/service/constants/jobcategory.service';
import { LawService } from 'src/app/demo/service/constants/law.service';
import { ModificationContractTypeService } from 'src/app/demo/service/constants/modificationcontracttype.service';
import { StartingTypeService } from 'src/app/demo/service/constants/startingtype.service';
import { EmpAppointmentStatusService } from 'src/app/demo/service/employee/empappointmentstatus.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-empappointmentstatus',
  templateUrl: './empappointmentstatus.component.html',
  styleUrls: ['./empappointmentstatus.component.css']
})
export class EmpAppointmentStatusComponent implements OnInit {
  cols: any[] = [];
  empappointmentstatuss: any[] = [];
  formStructure: IFormStructure[] = [];
  insuranceSystems: any[] = [];
  appointmentContractTypes: any[] = [];
  laws: any[] = [];
  healthyStatuss: any[] = [];
  disabilityTypes: any[] = [];
  jobCategorys: any[] = [];
  modificationContractTypes: any[] = [];
  startingTypes: any[] = [];
  fetched: boolean = false;
  canAdd: string = '';
  canEdit: string = '';
  canSingleDelete: string = '';
  @Input() personId: string;
  filter: string = '';
  constructor(private messageService: MessageService,
    private readonly empappointmentstatusService: EmpAppointmentStatusService,
    private readonly insuranceSystemService: InsuranceSystemService,
    private readonly modificationContractTypeService: ModificationContractTypeService,
    private readonly lawService: LawService,
    private readonly healthyStatusService: HealthyStatusService,
    private readonly disabilityTypeService: DisabilityTypeService,
    private readonly jobCategoryService: JobCategoryService, private readonly startingTypeService: StartingTypeService,
    private datePipe: DatePipe
  ) {
    this.initColumns();
  }
  transformDate(date: string | number | Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
  ngOnInit(): void {
    this.filter = `Filters=EmployeeId==${this.personId}`;
    forkJoin([this.empappointmentstatusService.GetEmpAppointmentStatussInfo(this.filter), this.insuranceSystemService.GetAllInsuranceSystems(''),
    this.modificationContractTypeService.GetAllModificationContractTypes(''),
    this.lawService.GetAllLaws(''), this.healthyStatusService.GetAllHealthyStatuss(''),
    this.disabilityTypeService.GetAllDisabilityTypes(''), this.jobCategoryService.GetAllJobCategorys(''),
    this.startingTypeService.GetAllStartingTypes('')
    ])
      .subscribe(([empappointmentstatuss, insuranceSystems, appointmentContractTypes, laws, healthyStatuss
        , disabilityTypes, jobCategorys, startingTypes
      ]) => {
        this.empappointmentstatuss = this.mapItemList(empappointmentstatuss);
        this.insuranceSystems = insuranceSystems.map((item) => {
          return Object.assign(item, {
            label: item?.name,
            value: item?.id
          });
        });

        this.appointmentContractTypes = appointmentContractTypes.map((item) => {
          return Object.assign(item, {
            label: item?.name,
            value: item?.id
          });
        });
        this.modificationContractTypes = this.appointmentContractTypes;

        this.laws = laws.map((item) => {
          return Object.assign(item, {
            label: item?.name,
            value: item?.id
          });
        });
        this.healthyStatuss = healthyStatuss.map((item) => {
          return Object.assign(item, {
            label: item?.name,
            value: item?.id
          });
        });
        this.disabilityTypes = disabilityTypes.map((item) => {
          return Object.assign(item, {
            label: item?.name,
            value: item?.id
          });
        });
        this.jobCategorys = jobCategorys.map((item) => {
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
        insuranceSystemName: item?.insuranceSystem?.name,
        lawName: item?.law?.name,
        healthyStatusName: item?.healthyStatus?.name,
        disabilityTypeName: item?.disabilityType?.name,
        jobCategoryName: item?.jobCategory?.name,
        modificationContractTypeName: item?.modificationContractType?.name,
        appointmentContractTypeName: item?.appointmentContractType?.name,
        startingTypeName: item?.startingType?.name,
        dateOfAppointmentDecision: this.transformDate(item?.dateOfAppointmentDecision),
        dateOfAppointmentVisa: this.transformDate(item?.dateOfAppointmentVisa),
        dateOfInsuranceStart: this.transformDate(item?.dateOfInsuranceStart),
        dateOfModifiedAppointmentVisaDate: this.transformDate(item?.dateOfModifiedAppointmentVisaDate)
      });
    })
  }

  initFormStructure() {
    this.formStructure = [
      {
        type: 'Date',
        label: APP_CONSTANTS.DATEOFAPPOINTMENTDECISION,
        name: 'dateOfAppointmentDecision',
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
        label: APP_CONSTANTS.DATEOFMODIFIEDAPPOINTMENTVISADATE,
        name: 'dateOfModifiedAppointmentVisaDate',
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
        label: APP_CONSTANTS.DATEOFINSURANCESTART,
        name: 'dateOfInsuranceStart',
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
        label: APP_CONSTANTS.GENERALREGISTRYNUMBER,
        name: 'generalRegistryNumber',
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
        label: APP_CONSTANTS.INSURANCESYSTEM_NAME,
        name: 'insuranceSystemId',
        value: '',
        options: [...this.insuranceSystems],
        placeHolder: APP_CONSTANTS.INSURANCESYSTEM_PLACE_HOLDER,
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
        label: APP_CONSTANTS.ENGINEERSSYNDICATENUMBER,
        name: 'engineersSyndicateNumber',
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
        label: APP_CONSTANTS.APPOINTMENTCONTRACTTYPE_NAME,
        name: 'appointmentContractTypeId',
        value: '',
        options: [...this.appointmentContractTypes],
        placeHolder: APP_CONSTANTS.APPOINTMENTCONTRACTTYPE_PLACE_HOLDER,
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
        label: APP_CONSTANTS.LAW_NAME,
        name: 'lawId',
        value: '',
        options: [...this.laws],
        placeHolder: APP_CONSTANTS.LAW_PLACE_HOLDER,
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
        label: APP_CONSTANTS.HEALTHYSTATUS_NAME,
        name: 'healthyStatusId',
        value: '',
        options: [...this.healthyStatuss],
        placeHolder: APP_CONSTANTS.HEALTHYSTATUS_PLACE_HOLDER,
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
        label: APP_CONSTANTS.DISABILITYTYPE_NAME,
        name: 'disabilityTypeId',
        value: '',
        options: [...this.disabilityTypes],
        placeHolder: APP_CONSTANTS.DISABILITYTYPE_PLACE_HOLDER,
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
        label: APP_CONSTANTS.JOBCATEGORY_NAME,
        name: 'jobCategoryId',
        value: '',
        options: [...this.jobCategorys],
        placeHolder: APP_CONSTANTS.JOBCATEGORY_PLACE_HOLDER,
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
        type: 'text',
        label: APP_CONSTANTS.INSURANCENUMBER,
        name: 'insuranceNumber',
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
            value: 10
          },
        ],
      },
      {
        type: 'text',
        label: APP_CONSTANTS.APPOINTMENCONTRACTNUMBER,
        name: 'appointmenContractNumber',
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
        label: APP_CONSTANTS.APPOINTMENCONTRACTNUMBER,
        name: 'appointmentContractVisaNumber',
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
        label: APP_CONSTANTS.APPOINTMENCONTRACTNUMBER,
        name: 'modifiedAppointmentContractNumber',
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
      { dataKey: 'dateOfAppointmentDecision', header: APP_CONSTANTS.DATEOFAPPOINTMENTDECISION },
      { dataKey: 'dateOfAppointmentVisa', header: APP_CONSTANTS.DATEOFAPPOINTMENTVISA },
      { dataKey: 'dateOfModifiedAppointmentVisaDate', header: APP_CONSTANTS.DATEOFMODIFIEDAPPOINTMENTVISADATE },
      { dataKey: 'dateOfInsuranceStart', header: APP_CONSTANTS.DATEOFINSURANCESTART },
      { dataKey: 'generalRegistryNumber', header: APP_CONSTANTS.GENERALREGISTRYNUMBER },
      { dataKey: 'insuranceSystemName', header: APP_CONSTANTS.INSURANCESYSTEM_NAME },
      { dataKey: 'engineersSyndicateNumber', header: APP_CONSTANTS.ENGINEERSSYNDICATENUMBER },
      { dataKey: 'appointmentContractTypeName', header: APP_CONSTANTS.APPOINTMENTCONTRACTTYPE_NAME },
      { dataKey: 'lawName', header: APP_CONSTANTS.LAW_NAME },
      { dataKey: 'healthyStatusName', header: APP_CONSTANTS.HEALTHYSTATUS_NAME },
      { dataKey: 'disabilityTypeName', header: APP_CONSTANTS.DISABILITYTYPE_NAME },
      { dataKey: 'jobCategoryName', header: APP_CONSTANTS.JOBCATEGORY_NAME },
      { dataKey: 'modificationContractTypeName', header: APP_CONSTANTS.ModificationContractType_NAME },
      { dataKey: 'startingTypeName', header: APP_CONSTANTS.STARTINGTYPE_NAME },
      { dataKey: 'insuranceNumber', header: APP_CONSTANTS.INSURANCENUMBER },
      { dataKey: 'appointmenContractNumber', header: APP_CONSTANTS.APPOINTMENCONTRACTNUMBER },
      { dataKey: 'appointmentContractVisaNumber', header: APP_CONSTANTS.APPOINTMENTCONTRACTVISANUMBER },
      { dataKey: 'modifiedAppointmentContractNumber', header: APP_CONSTANTS.MODIFIEDAPPOINTMENTCONTRACTNUMBER },
      { dataKey: 'note', header: APP_CONSTANTS.NOTE }
    ]
  }

  submitEventHandler(eventData) {
    eventData = { ...eventData, employeeId: this.personId };
    if (eventData.id) {
      this.empappointmentstatusService.UpdateEmpAppointmentStatus(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.empappointmentstatusService.AddEmpAppointmentStatus(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.empappointmentstatusService.DeleteEmpAppointmentStatus(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.filter = `Filters=EmployeeId==${this.personId}`;
    this.empappointmentstatusService.GetEmpAppointmentStatussInfo(this.filter).subscribe(
      (res) => {
        this.empappointmentstatuss = this.mapItemList(res);
      }
    )
  }
}
