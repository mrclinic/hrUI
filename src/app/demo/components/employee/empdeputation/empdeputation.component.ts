import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { CityService } from 'src/app/demo/service/constants/city.service';
import { CountryService } from 'src/app/demo/service/constants/country.service';
import { DeputationObjectiveService } from 'src/app/demo/service/constants/deputationobjective.service';
import { DeputationStatusService } from 'src/app/demo/service/constants/deputationstatus.service';
import { DeputationTypeService } from 'src/app/demo/service/constants/deputationtype.service';
import { UniversityService } from 'src/app/demo/service/constants/university.service';
import { EmpDeputationService } from 'src/app/demo/service/employee/empdeputation.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-empdeputation',
  templateUrl: './empdeputation.component.html',
  styleUrls: ['./empdeputation.component.css']
})
export class EmpDeputationComponent implements OnInit {
  cols: any[] = [];
  empdeputations: any[] = [];
  formStructure: IFormStructure[] = [];
  countrys: any[] = [];
  citys: any[] = [];
  universitys: any[] = [];
  deputationObjectives: any[] = [];
  deputationStatuss: any[] = [];
  deputationTypes: any[] = [];
  canAdd: string = 'HR_EmpDeputation_CreateEmpDeputation';
  canEdit: string = 'HR_EmpDeputation_UpdateEmpDeputation';
  canSingleDelete: string = 'HR_EmpDeputation_DeleteEmpDeputation';
  @Input() personId: string;
  filter: string = '';
  fetched: boolean = false;
  constructor(private messageService: MessageService, private datePipe: DatePipe,
    private readonly empdeputationService: EmpDeputationService,
    private readonly countryService: CountryService, private readonly cityService: CityService,
    private readonly universityService: UniversityService, private readonly deputationObjectiveService: DeputationObjectiveService,
    private readonly deputationStatusService: DeputationStatusService, private readonly deputationTypeService: DeputationTypeService
  ) {
    this.initColumns();
  }

  transformDate(date: string | number | Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    this.filter = `Filters=EmployeeId==${this.personId}`;
    forkJoin([this.empdeputationService.GetEmpDeputationsInfo(this.filter),
    this.countryService.GetAllCountrys(''), this.cityService.GetAllCitys(''),
    this.universityService.GetAllUniversitys(''),
    this.deputationObjectiveService.GetAllDeputationObjectives(''), this.deputationStatusService.GetAllDeputationStatuss(''),
    this.deputationTypeService.GetAllDeputationTypes(''),
    ])
      .subscribe(([empdeputations, countrys, citys, universitys, deputationObjectives, deputationStatuss, deputationTypes
      ]) => {
        this.empdeputations = this.mapItemList(empdeputations);

        this.countrys = countrys.map((item) => {
          return Object.assign(item, {
            label: item?.name,
            value: item?.id
          });
        });

        this.citys = citys.map((item) => {
          return Object.assign(item, {
            label: item?.name,
            value: item?.id
          });
        });
        this.universitys = universitys.map((item) => {
          return Object.assign(item, {
            label: item?.name,
            value: item?.id
          });
        });

        this.deputationObjectives = deputationObjectives.map((item) => {
          return Object.assign(item, {
            label: item?.name,
            value: item?.id
          });
        });
        this.deputationStatuss = deputationStatuss.map((item) => {
          return Object.assign(item, {
            label: item?.name,
            value: item?.id
          });
        });

        this.deputationTypes = deputationTypes.map((item) => {
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
        countryName: item?.country?.name,
        cityName: item?.city?.name,
        universityName: item?.university?.name,
        deputationObjectiveName: item?.deputationObjective?.name,
        deputationStatusName: item?.deputationStatus?.name,
        deputationTypeName: item?.deputationType?.name,
        startDate: this.transformDate(item?.startDate),
        endDate: this.transformDate(item?.endDate),
        returnDate: this.transformDate(item?.returnDate),
        deputationDecisionDate: this.transformDate(item?.deputationDecisionDate),
        executiveContractDate: this.transformDate(item?.executiveContractDate),
        startAfterReturnDate: this.transformDate(item?.startAfterReturnDate)
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
        label: APP_CONSTANTS.RETURNDATE,
        name: 'returnDate',
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
        label: APP_CONSTANTS.DEPUTATIONDECISIONDATE,
        name: 'deputationDecisionDate',
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
        label: APP_CONSTANTS.EXECUTIVECONTRACTDATE,
        name: 'executiveContractDate',
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
        label: APP_CONSTANTS.STARTAFTERRETURNDATE,
        name: 'startAfterReturnDate',
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
        label: APP_CONSTANTS.COUNTRY_NAME,
        name: 'countryId',
        value: '',
        options: [...this.countrys],
        placeHolder: APP_CONSTANTS.COUNTRY_PLACE_HOLDER,
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
        label: APP_CONSTANTS.CITY_NAME,
        name: 'cityId',
        value: '',
        options: [...this.citys],
        placeHolder: APP_CONSTANTS.CITY_PLACE_HOLDER,
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
        label: APP_CONSTANTS.UNIVERSITY_NAME,
        name: 'universityId',
        value: '',
        options: [...this.universitys],
        placeHolder: APP_CONSTANTS.UNIVERSITY_PLACE_HOLDER,
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
        label: APP_CONSTANTS.DEPUTATIONOBJECTIVE_NAME,
        name: 'deputationObjectiveId',
        value: '',
        options: [...this.deputationObjectives],
        placeHolder: APP_CONSTANTS.DEPUTATIONOBJECTIVE_PLACE_HOLDER,
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
        label: APP_CONSTANTS.DEPUTATIONSTATUS_NAME,
        name: 'deputationStatusId',
        value: '',
        options: [...this.deputationStatuss],
        placeHolder: APP_CONSTANTS.DEPUTATIONSTATUS_PLACE_HOLDER,
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
        label: APP_CONSTANTS.DEPUTATIONTYPE_NAME,
        name: 'deputationTypeId',
        value: '',
        options: [...this.deputationTypes],
        placeHolder: APP_CONSTANTS.DEPUTATIONTYPE_PLACE_HOLDER,
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
        label: APP_CONSTANTS.DURATION,
        name: 'duration',
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
            value: 50
          },
        ],
      },
      {
        type: 'text',
        label: APP_CONSTANTS.DEPUTATIONDECISIONNUMBER,
        name: 'deputationDecisionNumber',
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
        label: APP_CONSTANTS.REQUIREDSPECIALIZATION,
        name: 'requiredSpecialization',
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
        label: APP_CONSTANTS.EXECUTIVECONTRACTNUMBER,
        name: 'executiveContractNumber',
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
        label: APP_CONSTANTS.ASSIGNEDENTITY,
        name: 'assignedEntity',
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
        label: APP_CONSTANTS.DEPUTATIONREASON,
        name: 'deputationReason',
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
      { dataKey: 'endDate', header: APP_CONSTANTS.ENDDATE },
      { dataKey: 'returnDate', header: APP_CONSTANTS.RETURNDATE },
      { dataKey: 'deputationDecisionDate', header: APP_CONSTANTS.DEPUTATIONDECISIONDATE },
      { dataKey: 'executiveContractDate', header: APP_CONSTANTS.EXECUTIVECONTRACTDATE },
      { dataKey: 'startAfterReturnDate', header: APP_CONSTANTS.STARTAFTERRETURNDATE },
      { dataKey: 'countryName', header: APP_CONSTANTS.COUNTRY_NAME },
      { dataKey: 'cityName', header: APP_CONSTANTS.CITY_NAME },
      { dataKey: 'universityName', header: APP_CONSTANTS.UNIVERSITY_NAME },
      { dataKey: 'deputationObjectiveName', header: APP_CONSTANTS.DEPUTATIONOBJECTIVE_NAME },
      { dataKey: 'deputationStatusName', header: APP_CONSTANTS.DEPUTATIONSTATUS_NAME },
      { dataKey: 'deputationTypeName', header: APP_CONSTANTS.DEPUTATIONTYPE_NAME },
      { dataKey: 'duration', header: APP_CONSTANTS.DURATION },
      { dataKey: 'deputationDecisionNumber', header: APP_CONSTANTS.DEPUTATIONDECISIONNUMBER },
      { dataKey: 'requiredSpecialization', header: APP_CONSTANTS.REQUIREDSPECIALIZATION },
      { dataKey: 'executiveContractNumber', header: APP_CONSTANTS.EXECUTIVECONTRACTNUMBER },
      { dataKey: 'assignedEntity', header: APP_CONSTANTS.ASSIGNEDENTITY },
      { dataKey: 'deputationReason', header: APP_CONSTANTS.DEPUTATIONREASON },
      { dataKey: 'note', header: APP_CONSTANTS.NOTE }
    ]
  }

  submitEventHandler(eventData) {
    eventData = { ...eventData, employeeId: this.personId };
    if (eventData.id) {
      this.empdeputationService.UpdateEmpDeputation(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.empdeputationService.AddEmpDeputation(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.empdeputationService.DeleteEmpDeputation(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.filter = `Filters=EmployeeId==${this.personId}`;
    this.empdeputationService.GetEmpDeputationsInfo(this.filter).subscribe(
      (res) => {
        this.empdeputations = this.mapItemList(res);
      }
    )
  }
}
