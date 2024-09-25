import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { Person } from 'src/app/demo/models/employee/person.model';
import { PersonService } from 'src/app/demo/service/employee/person.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  cols: any[] = [];
  persons: Person[] = [];
  formStructure: IFormStructure[] = [];

  constructor(private messageService: MessageService,
    private readonly personService: PersonService) { }

  ngOnInit(): void {
    this.personService.GetAllPersons('').subscribe(
      (res) => {
        this.persons = res;
        this.initColumns();
        this.initFormStructure();
      }
    );
  }

  initFormStructure() {
    this.formStructure = [
{
        type: 'select',
        label: APP_CONSTANTS.IDENTITYUSER_NAME,
        name: 'identityUserId',
        value: '',
        options: [...this.identityUsers],
        placeHolder: APP_CONSTANTS.IDENTITYUSER_PLACE_HOLDER,
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: APP_CONSTANTS.FIELD_REQUIRED,
          },
        ],
      },
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
          },
        ],
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
System.Nullable`1[System.Int32]{
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
{ dataKey: 'identityUserId', header: APP_CONSTANTS.IDENTITYUSERID},
{ dataKey: 'birthDate', header: APP_CONSTANTS.BIRTHDATE},
{ dataKey: 'familyBookDate', header: APP_CONSTANTS.FAMILYBOOKDATE},
{ dataKey: 'imagePath', header: APP_CONSTANTS.IMAGEPATH},
{ dataKey: 'employmentStatusTypeId', header: APP_CONSTANTS.EMPLOYMENTSTATUSTYPEID},
{ dataKey: 'employmentStatusTypeName', header: APP_CONSTANTS.EMPLOYMENTSTATUSTYPENAME},
{ dataKey: 'genderId', header: APP_CONSTANTS.GENDERID},
{ dataKey: 'genderName', header: APP_CONSTANTS.GENDERNAME},
{ dataKey: 'nationalityId', header: APP_CONSTANTS.NATIONALITYID},
{ dataKey: 'nationalityName', header: APP_CONSTANTS.NATIONALITYNAME},
{ dataKey: 'maritalStatusId', header: APP_CONSTANTS.MARITALSTATUSID},
{ dataKey: 'maritalStatusName', header: APP_CONSTANTS.MARITALSTATUSNAME},
{ dataKey: 'bloodGroupId', header: APP_CONSTANTS.BLOODGROUPID},
{ dataKey: 'bloodGroupName', header: APP_CONSTANTS.BLOODGROUPNAME},
{ dataKey: 'cityId', header: APP_CONSTANTS.CITYID},
{ dataKey: 'cityName', header: APP_CONSTANTS.CITYNAME},
{ dataKey: 'registrationNumber', header: APP_CONSTANTS.REGISTRATIONNUMBER},
{ dataKey: 'firstName', header: APP_CONSTANTS.FIRSTNAME},
{ dataKey: 'lastName', header: APP_CONSTANTS.LASTNAME},
{ dataKey: 'fatherName', header: APP_CONSTANTS.FATHERNAME},
{ dataKey: 'motherName', header: APP_CONSTANTS.MOTHERNAME},
{ dataKey: 'birthPlace', header: APP_CONSTANTS.BIRTHPLACE},
{ dataKey: 'registrationPlaceAndNumber', header: APP_CONSTANTS.REGISTRATIONPLACEANDNUMBER},
{ dataKey: 'address', header: APP_CONSTANTS.ADDRESS},
{ dataKey: 'nationalNumber', header: APP_CONSTANTS.NATIONALNUMBER},
{ dataKey: 'idNumber', header: APP_CONSTANTS.IDNUMBER},
{ dataKey: 'civilRegistry', header: APP_CONSTANTS.CIVILREGISTRY},
{ dataKey: 'familyBookNumber', header: APP_CONSTANTS.FAMILYBOOKNUMBER},
{ dataKey: 'phone', header: APP_CONSTANTS.PHONE},
{ dataKey: 'email', header: APP_CONSTANTS.EMAIL},
{ dataKey: 'note', header: APP_CONSTANTS.NOTE},
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
    this.personService.GetAllPersons('').subscribe(
      (res) => {
        this.persons = res;
      }
    )
  }
}
