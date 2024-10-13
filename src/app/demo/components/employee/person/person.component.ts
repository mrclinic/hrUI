import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { BloodGroupService } from 'src/app/demo/service/constants/bloodgroup.service';
import { CityService } from 'src/app/demo/service/constants/city.service';
import { EmploymentStatusTypeService } from 'src/app/demo/service/constants/employmentstatustype.service';
import { GenderService } from 'src/app/demo/service/constants/gender.service';
import { MaritalStatusService } from 'src/app/demo/service/constants/maritalstatus.service';
import { NationalityService } from 'src/app/demo/service/constants/nationality.service';
import { PersonService } from 'src/app/demo/service/employee/person.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  cols: any[] = [];
  persons: any[] = [];
  formStructure: IFormStructure[] = [];
  employmentStatusTypes: any[] = [];
  genders: any[] = [];
  nationalitys: any[] = [];
  maritalStatuss: any[] = [];
  bloodGroups: any[] = [];
  citys: any[] = [];
  fetched: boolean = false;
  canAdd: string = 'HR_Person_CreatePerson';
  canEdit: string = 'HR_Person_UpdatePerson';
  canSingleDelete: string = 'HR_Person_DeletePerson';
  hasClickAbleRow: boolean = true;
  redirectUrlUpOnClick: string = 'employees/employee-profile';
  queryParamName: string = 'personId';
  constructor(private messageService: MessageService,
    private readonly personService: PersonService,
    private readonly employmentStatusTypeService: EmploymentStatusTypeService,
    private readonly genderService: GenderService,
    private readonly nationalityService: NationalityService,
    private readonly maritalStatusService: MaritalStatusService,
    private readonly bloodGroupService: BloodGroupService,
    private readonly cityService: CityService,
    private datePipe: DatePipe
  ) {
    this.initColumns();
  }
  transformDate(date: string | number | Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    forkJoin([this.personService.GetPersonsInfo(''), this.employmentStatusTypeService.GetAllEmploymentStatusTypes(''),
    this.genderService.GetAllGenders(''),
    this.nationalityService.GetAllNationalitys(''), this.maritalStatusService.GetAllMaritalStatuss(''),
    this.bloodGroupService.GetAllBloodGroups(''), this.cityService.GetAllCitys('')])
      .subscribe(([persons, employmentStatusTypes, genders, nationalitys, maritalStatuss
        , bloodGroups, citys
      ]) => {
        this.persons = this.mapItemList(persons);
        this.employmentStatusTypes = employmentStatusTypes.map((item) => {
          return Object.assign(item, {
            label: item?.name,
            value: item?.id
          });
        });

        this.genders = genders.map((item) => {
          return Object.assign(item, {
            label: item?.name,
            value: item?.id
          });
        });

        this.nationalitys = nationalitys.map((item) => {
          return Object.assign(item, {
            label: item?.name,
            value: item?.id
          });
        });
        this.maritalStatuss = maritalStatuss.map((item) => {
          return Object.assign(item, {
            label: item?.name,
            value: item?.id
          });
        });
        this.bloodGroups = bloodGroups.map((item) => {
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
        this.initFormStructure();
        this.fetched = true;
      });
    this.initFormStructure();
  }

  initFormStructure() {
    this.formStructure = [
      {
        type: 'Date',
        label: APP_CONSTANTS.BIRTHDATE,
        name: 'birthDate',
        value: '',
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: APP_CONSTANTS.FIELD_REQUIRED,
          }
        ],
        format: 'yy-mm-dd',
        maxValue: new Date()
      },
      {
        type: 'Date',
        label: APP_CONSTANTS.FAMILYBOOKDATE,
        name: 'familyBookDate',
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
        type: 'text',
        label: APP_CONSTANTS.IMAGEPATH,
        name: 'imagePath',
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
        label: APP_CONSTANTS.EMPLOYMENTSTATUSTYPE_NAME,
        name: 'employmentStatusTypeId',
        value: '',
        options: [...this.employmentStatusTypes],
        placeHolder: APP_CONSTANTS.EMPLOYMENTSTATUSTYPE_PLACE_HOLDER,
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
        label: APP_CONSTANTS.GENDER_NAME,
        name: 'genderId',
        value: '',
        options: [...this.genders],
        placeHolder: APP_CONSTANTS.GENDER_PLACE_HOLDER,
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
        label: APP_CONSTANTS.NATIONALITY_NAME,
        name: 'nationalityId',
        value: '',
        options: [...this.nationalitys],
        placeHolder: APP_CONSTANTS.NATIONALITY_PLACE_HOLDER,
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
        label: APP_CONSTANTS.MARITALSTATUS_NAME,
        name: 'maritalStatusId',
        value: '',
        options: [...this.maritalStatuss],
        placeHolder: APP_CONSTANTS.MARITALSTATUS_PLACE_HOLDER,
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
        label: APP_CONSTANTS.BLOODGROUP_NAME,
        name: 'bloodGroupId',
        value: '',
        options: [...this.bloodGroups],
        placeHolder: APP_CONSTANTS.BLOODGROUP_PLACE_HOLDER,
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
        type: 'number',
        label: APP_CONSTANTS.REGISTRATIONNUMBER,
        name: 'registrationNumber',
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
        label: APP_CONSTANTS.FIRSTNAME,
        name: 'firstName',
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
        label: APP_CONSTANTS.LASTNAME,
        name: 'lastName',
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
        label: APP_CONSTANTS.FATHERNAME,
        name: 'fatherName',
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
        label: APP_CONSTANTS.MOTHERNAME,
        name: 'motherName',
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
        label: APP_CONSTANTS.BIRTHPLACE,
        name: 'birthPlace',
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
        label: APP_CONSTANTS.REGISTRATIONPLACEANDNUMBER,
        name: 'registrationPlaceAndNumber',
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
        label: APP_CONSTANTS.ADDRESS,
        name: 'address',
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
        label: APP_CONSTANTS.NATIONALNUMBER,
        name: 'nationalNumber',
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
          }
        ],
      },
      {
        type: 'text',
        label: APP_CONSTANTS.IDNUMBER,
        name: 'idNumber',
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
          }
        ],
      },
      {
        type: 'text',
        label: APP_CONSTANTS.CIVILREGISTRY,
        name: 'civilRegistry',
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
        label: APP_CONSTANTS.FAMILYBOOKNUMBER,
        name: 'familyBookNumber',
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
        label: APP_CONSTANTS.PHONE,
        name: 'phone',
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
        label: APP_CONSTANTS.EMAIL,
        name: 'email',
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
        type: 'textarea',
        label: APP_CONSTANTS.NOTE,
        name: 'note',
        value: '',
        validations: [],
      },
    ];
  }

  initColumns() {
    this.cols = [
      { dataKey: 'birthDate', header: APP_CONSTANTS.BIRTHDATE },
      { dataKey: 'familyBookDate', header: APP_CONSTANTS.FAMILYBOOKDATE },
      { dataKey: 'imagePath', header: APP_CONSTANTS.IMAGEPATH },
      { dataKey: 'employmentStatusTypeName', header: APP_CONSTANTS.EMPLOYMENTSTATUSTYPE_NAME },
      { dataKey: 'genderName', header: APP_CONSTANTS.GENDER_NAME },
      { dataKey: 'nationalityName', header: APP_CONSTANTS.NATIONALITY_NAME },
      { dataKey: 'maritalStatusName', header: APP_CONSTANTS.MARITALSTATUS_NAME },
      { dataKey: 'bloodGroupName', header: APP_CONSTANTS.BLOODGROUP_NAME },
      { dataKey: 'cityName', header: APP_CONSTANTS.CITY_NAME },
      { dataKey: 'registrationNumber', header: APP_CONSTANTS.REGISTRATIONNUMBER },
      { dataKey: 'firstName', header: APP_CONSTANTS.FIRSTNAME },
      { dataKey: 'lastName', header: APP_CONSTANTS.LASTNAME },
      { dataKey: 'fatherName', header: APP_CONSTANTS.FATHERNAME },
      { dataKey: 'motherName', header: APP_CONSTANTS.MOTHERNAME },
      { dataKey: 'birthPlace', header: APP_CONSTANTS.BIRTHPLACE },
      { dataKey: 'registrationPlaceAndNumber', header: APP_CONSTANTS.REGISTRATIONPLACEANDNUMBER },
      { dataKey: 'address', header: APP_CONSTANTS.ADDRESS },
      { dataKey: 'nationalNumber', header: APP_CONSTANTS.NATIONALNUMBER },
      { dataKey: 'idNumber', header: APP_CONSTANTS.IDNUMBER },
      { dataKey: 'civilRegistry', header: APP_CONSTANTS.CIVILREGISTRY },
      { dataKey: 'familyBookNumber', header: APP_CONSTANTS.FAMILYBOOKNUMBER },
      { dataKey: 'phone', header: APP_CONSTANTS.PHONE },
      { dataKey: 'email', header: APP_CONSTANTS.EMAIL },
      { dataKey: 'note', header: APP_CONSTANTS.NOTE },
    ]
  }

  submitEventHandler(eventData) {
    if (eventData.id) {
      this.personService.UpdatePerson(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.personService.AddPerson(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.personService.DeletePerson(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.personService.GetPersonsInfo('').subscribe(
      (res) => {
        this.persons = this.mapItemList(res);
      }
    )
  }
  mapItemList(items: any[]): any[] {
    return items.map((item) => {
      return Object.assign(item, {
        ...item,
        genderName: item?.gender?.name,
        employmentStatusTypeName: item?.employmentStatusType?.name,
        nationalityName: item?.nationality?.name,
        maritalStatusName: item?.maritalStatus?.name,
        bloodGroupName: item?.bloodGroup?.name,
        cityName: item?.city?.name,
        birthDate: this.transformDate(item?.birthDate),
        familyBookDate: this.transformDate(item?.familyBookDate)
      });
    })
  }
}
