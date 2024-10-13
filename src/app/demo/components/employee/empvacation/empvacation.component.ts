import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { GeneralService } from 'src/app/demo/service/common/general-service.service';
import { FinancialImpactService } from 'src/app/demo/service/constants/financialimpact.service';
import { ForcedVacationTypeService } from 'src/app/demo/service/constants/forcedvacationtype.service';
import { ModificationContractTypeService } from 'src/app/demo/service/constants/modificationcontracttype.service';
import { VacationTypeService } from 'src/app/demo/service/constants/vacationtype.service';
import { EmpVacationService } from 'src/app/demo/service/employee/empvacation.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-empvacation',
  templateUrl: './empvacation.component.html',
  styleUrls: ['./empvacation.component.css'],
  providers: [GeneralService]
})
export class EmpVacationComponent implements OnInit {
  cols: any[] = [];
  empvacations: any[] = [];
  formStructure: IFormStructure[] = [];
  fetched: boolean = false;
  filter: string;
  canAdd: string = 'HR_EmpVacation_CreateEmpVacation';
  canEdit: string = 'HR_EmpVacation_UpdateEmpVacation';
  canSingleDelete: string = 'HR_EmpVacation_DeleteEmpVacation';
  @Input() personId: string;
  vacationTypes: any[] = [];
  contractTypes: any[] = [];
  financialImpacts: any[] = [];
  forcedVacationTypes: any[] = [];
  modificationContractTypes: any[] = [];
  constructor(private messageService: MessageService, private datePipe: DatePipe,
    private readonly empvacationService: EmpVacationService,
    private readonly vacationTypeService: VacationTypeService,
    private readonly modificationContractTypeService: ModificationContractTypeService,
    private readonly financialImpactService: FinancialImpactService,
    private readonly forcedVacationTypeService: ForcedVacationTypeService
    , private readonly generalService: GeneralService
  ) {

    this.initColumns();
  }

  transformDate(date: string | number | Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    this.filter = `Filters=EmployeeId==${this.personId}`;
    forkJoin([this.empvacationService.GetEmpVacationsInfo(this.filter),
    this.vacationTypeService.GetAllVacationTypes(''),
    this.modificationContractTypeService.GetAllModificationContractTypes(''),
    this.financialImpactService.GetAllFinancialImpacts(''),
    this.forcedVacationTypeService.GetAllForcedVacationTypes('')
    ])
      .subscribe(([empvacations, vacationTypes, contractTypes, financialImpacts, forcedVacationTypes
      ]) => {
        this.empvacations = this.mapItemList(empvacations);

        this.vacationTypes = vacationTypes.map((item) => {
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
        this.modificationContractTypes = this.contractTypes;

        this.financialImpacts = financialImpacts.map((item) => {
          return Object.assign(item, {
            label: item?.name,
            value: item?.id
          });
        });

        this.forcedVacationTypes = forcedVacationTypes.map((item) => {
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
        startDate: this.transformDate(item?.startDate),
        contractDate: this.transformDate(item?.contractDate),
        endDate: this.transformDate(item?.endDate),
        modificationContractDate: this.transformDate(item?.modificationContractDate),
        actualReturnDate: this.transformDate(item?.actualReturnDate),
        contractTypeName: item?.contractType?.name,
        financialImpactName: item?.financialImpact?.name,
        modificationContractTypeName: item?.modificationContractType?.name,
        vacationTypeName: item?.vacationType?.name,
        isAppearingInRecordCard: this.generalService.getRadioOptionLabel(item?.isAppearingInRecordCard),
        isIncludedInServiceDuration: this.generalService.getRadioOptionLabel(item?.isIncludedInServiceDuration),
        forcedVacationTypeName: item?.forcedVacationType?.name
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
        type: 'Date',
        label: APP_CONSTANTS.ENDDATE,
        name: 'endDate',
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
        label: APP_CONSTANTS.MODIFICATIONCONTRACTDATE,
        name: 'modificationContractDate',
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
        label: APP_CONSTANTS.ACTUALRETURNDATE,
        name: 'actualReturnDate',
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
        label: APP_CONSTANTS.VACATIONTYPE_NAME,
        name: 'vacationTypeId',
        value: '',
        options: [...this.vacationTypes],
        placeHolder: APP_CONSTANTS.VACATIONTYPE_PLACE_HOLDER,
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
        label: APP_CONSTANTS.VACATIONYEAR,
        name: 'vacationYear',
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
        label: APP_CONSTANTS.financialImpact_NAME,
        name: 'financialImpactId',
        value: '',
        options: [...this.financialImpacts],
        placeHolder: APP_CONSTANTS.financialImpact_PLACE_HOLDER,
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
        label: APP_CONSTANTS.FORCEDVACATIONTYPE_NAME,
        name: 'forcedVacationTypeId',
        value: '',
        options: [...this.forcedVacationTypes],
        placeHolder: APP_CONSTANTS.FORCEDVACATIONTYPE_PLACE_HOLDER,
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
        label: APP_CONSTANTS.ISINCLUDEDINSERVICEDURATION,
        name: 'isIncludedInServiceDuration',
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
        type: 'number',
        label: APP_CONSTANTS.DAY,
        name: 'day',
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
        label: APP_CONSTANTS.MONTH,
        name: 'month',
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
        label: APP_CONSTANTS.YEAR,
        name: 'year',
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
        label: APP_CONSTANTS.MODIFICATIONCONTRACTNUMBER,
        name: 'modificationContractNumber',
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
      { dataKey: 'endDate', header: APP_CONSTANTS.ENDDATE },
      { dataKey: 'modificationContractDate', header: APP_CONSTANTS.MODIFICATIONCONTRACTDATE },
      { dataKey: 'actualReturnDate', header: APP_CONSTANTS.ACTUALRETURNDATE },
      { dataKey: 'durationInDays', header: APP_CONSTANTS.DURATIONINDAYS },
      { dataKey: 'vacationYear', header: APP_CONSTANTS.VACATIONYEAR },
      { dataKey: 'isAppearingInRecordCard', header: APP_CONSTANTS.ISAPPEARINGINRECORDCARD },
      { dataKey: 'isIncludedInServiceDuration', header: APP_CONSTANTS.ISINCLUDEDINSERVICEDURATION },
      { dataKey: 'day', header: APP_CONSTANTS.DAY },
      { dataKey: 'month', header: APP_CONSTANTS.MONTH },
      { dataKey: 'year', header: APP_CONSTANTS.YEAR },
      { dataKey: 'contractNumber', header: APP_CONSTANTS.CONTRACTNUMBER },
      { dataKey: 'modificationContractNumber', header: APP_CONSTANTS.MODIFICATIONCONTRACTNUMBER },
      { dataKey: 'contractTypeName', header: APP_CONSTANTS.CONTRACTTYPE_NAME },
      { dataKey: 'financialImpactName', header: APP_CONSTANTS.financialImpact_NAME },
      { dataKey: 'forcedVacationTypeName', header: APP_CONSTANTS.FORCEDVACATIONTYPE_NAME },
      { dataKey: 'modificationContractTypeName', header: APP_CONSTANTS.ModificationContractType_NAME },
      { dataKey: 'vacationTypeName', header: APP_CONSTANTS.VACATIONTYPE_NAME },
      { dataKey: 'note', header: APP_CONSTANTS.NOTE }
    ]
  }

  submitEventHandler(eventData) {
    eventData = { ...eventData, employeeId: this.personId };
    if (eventData.id) {
      this.empvacationService.UpdateEmpVacation(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.empvacationService.AddEmpVacation(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.empvacationService.DeleteEmpVacation(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.filter = `Filters=EmployeeId==${this.personId}`;
    this.empvacationService.GetEmpVacationsInfo(this.filter).subscribe(
      (res) => {
        this.empvacations = this.mapItemList(res);
      }
    )
  }
}
