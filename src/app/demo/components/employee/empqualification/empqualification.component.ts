import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { CountryService } from 'src/app/demo/service/constants/country.service';
import { DegreesAuthorityService } from 'src/app/demo/service/constants/degreesauthority.service';
import { QualificationService } from 'src/app/demo/service/constants/qualification.service';
import { SpecializationService } from 'src/app/demo/service/constants/specialization.service';
import { EmpQualificationService } from 'src/app/demo/service/employee/empqualification.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-empqualification',
  templateUrl: './empqualification.component.html',
  styleUrls: ['./empqualification.component.css']
})
export class EmpQualificationComponent implements OnInit {
  cols: any[] = [];
  empqualifications: any[] = [];
  formStructure: IFormStructure[] = [];
  fetched: boolean = false;
  filter: string;
  canAdd: string = '';
  canEdit: string = '';
  canSingleDelete: string = '';
  @Input() personId: string;
  specializations: any[] = [];
  degreesAuthoritys: any[] = [];
  countrys: any[] = [];
  qualifications: any[] = [];
  constructor(private messageService: MessageService, private datePipe: DatePipe,
    private readonly empqualificationService: EmpQualificationService,
    private readonly specializationService: SpecializationService,
    private readonly degreesAuthorityService: DegreesAuthorityService,
    private readonly countryService: CountryService, private readonly qualificationService: QualificationService
  ) {
    this.initColumns();
  }

  transformDate(date: string | number | Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    this.filter = `Filters=EmployeeId==${this.personId}`;
    forkJoin([this.empqualificationService.GetEmpQualificationsInfo(this.filter),
    this.specializationService.GetAllSpecializations(''),
    this.degreesAuthorityService.GetAllDegreesAuthoritys(''),
    this.countryService.GetAllCountrys(''),
    this.qualificationService.GetAllQualifications('')
    ])
      .subscribe(([empqualifications, specializations, degreesAuthoritys, countrys, qualifications
      ]) => {
        this.empqualifications = this.mapItemList(empqualifications);

        this.specializations = specializations.map((item) => {
          return Object.assign(item, {
            label: item?.name,
            value: item?.id
          });
        });

        this.degreesAuthoritys = degreesAuthoritys.map((item) => {
          return Object.assign(item, {
            label: item?.name,
            value: item?.id
          });
        });

        this.countrys = countrys.map((item) => {
          return Object.assign(item, {
            label: item?.name,
            value: item?.id
          });
        });

        this.qualifications = qualifications.map((item) => {
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
        degreesAuthorityName: item?.degreesAuthority?.name,
        qualificationName: item?.qualification?.name,
        specializationName: item?.specialization?.name,
        degreeDate: this.transformDate(item?.degreeDate),
        equivalenceDegreeContractDate: this.transformDate(item?.equivalenceDegreeContractDate)
      });
    })
  }

  initFormStructure() {
    this.formStructure = [
      {
        type: 'Date',
        label: APP_CONSTANTS.DEGREEDATE,
        name: 'degreeDate',
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
        label: APP_CONSTANTS.EQUIVALENCEDEGREECONTRACTDATE,
        name: 'equivalenceDegreeContractDate',
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
        label: APP_CONSTANTS.SPECIALIZATION_NAME,
        name: 'specializationId',
        value: '',
        options: [...this.specializations],
        placeHolder: APP_CONSTANTS.SPECIALIZATION_PLACE_HOLDER,
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
        label: APP_CONSTANTS.DEGREESAUTHORITY_NAME,
        name: 'degreesAuthorityId',
        value: '',
        options: [...this.degreesAuthoritys],
        placeHolder: APP_CONSTANTS.DEGREESAUTHORITY_PLACE_HOLDER,
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
        label: APP_CONSTANTS.qualification_NAME,
        name: 'qualificationId',
        value: '',
        options: [...this.qualifications],
        placeHolder: APP_CONSTANTS.qualification_PLACE_HOLDER,
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
        label: APP_CONSTANTS.SUBSPECIALIZATION,
        name: 'subSpecialization',
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
        label: APP_CONSTANTS.EQUIVALENCECONTRACTNUMBER,
        name: 'equivalenceContractNumber',
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
      { dataKey: 'degreeDate', header: APP_CONSTANTS.DEGREEDATE },
      { dataKey: 'equivalenceDegreeContractDate', header: APP_CONSTANTS.EQUIVALENCEDEGREECONTRACTDATE },
      { dataKey: 'subSpecialization', header: APP_CONSTANTS.SUBSPECIALIZATION },
      { dataKey: 'equivalenceContractNumber', header: APP_CONSTANTS.EQUIVALENCECONTRACTNUMBER },
      { dataKey: 'degreesAuthorityName', header: APP_CONSTANTS.DEGREESAUTHORITY_NAME },
      { dataKey: 'qualificationName', header: APP_CONSTANTS.qualification_NAME },
      { dataKey: 'specializationName', header: APP_CONSTANTS.SPECIALIZATION_NAME },
      { dataKey: 'note', header: APP_CONSTANTS.NOTE }
    ]
  }

  submitEventHandler(eventData) {
    eventData = { ...eventData, employeeId: this.personId };
    if (eventData.id) {
      this.empqualificationService.UpdateEmpQualification(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.empqualificationService.AddEmpQualification(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.empqualificationService.DeleteEmpQualification(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.filter = `Filters=EmployeeId==${this.personId}`;
    this.empqualificationService.GetEmpQualificationsInfo(this.filter).subscribe(
      (res) => {
        this.empqualifications = this.mapItemList(res);
      }
    )
  }
}
