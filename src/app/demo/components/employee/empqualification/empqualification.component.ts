import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { EmpQualification } from 'src/app/demo/models/employee/empqualification.model';
import { EmpQualificationService } from 'src/app/demo/service/employee/empqualification.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-empqualification',
  templateUrl: './empqualification.component.html',
  styleUrls: ['./empqualification.component.css']
})
export class EmpQualificationComponent implements OnInit {
  cols: any[] = [];
  empqualifications: EmpQualification[] = [];
  formStructure: IFormStructure[] = [];

  constructor(private messageService: MessageService,
    private readonly empqualificationService: EmpQualificationService) { }

  ngOnInit(): void {
    this.empqualificationService.GetAllEmpQualifications('').subscribe(
      (res) => {
        this.empqualifications = res;
        this.initColumns();
        this.initFormStructure();
      }
    );
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
        label: APP_CONSTANTS.QUALIFICATION_NAME,
        name: 'qualificationId',
        value: '',
        options: [...this.qualifications],
        placeHolder: APP_CONSTANTS.QUALIFICATION_PLACE_HOLDER,
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
        ],
      },
    ];
  }

  initColumns() {
    this.cols = [
{ dataKey: 'degreeDate', header: APP_CONSTANTS.DEGREEDATE},
{ dataKey: 'equivalenceDegreeContractDate', header: APP_CONSTANTS.EQUIVALENCEDEGREECONTRACTDATE},
{ dataKey: 'specializationId', header: APP_CONSTANTS.SPECIALIZATIONID},
{ dataKey: 'degreesAuthorityId', header: APP_CONSTANTS.DEGREESAUTHORITYID},
{ dataKey: 'countryId', header: APP_CONSTANTS.COUNTRYID},
{ dataKey: 'qualificationId', header: APP_CONSTANTS.QUALIFICATIONID},
{ dataKey: 'subSpecialization', header: APP_CONSTANTS.SUBSPECIALIZATION},
{ dataKey: 'equivalenceContractNumber', header: APP_CONSTANTS.EQUIVALENCECONTRACTNUMBER},
{ dataKey: 'degreesAuthorityName', header: APP_CONSTANTS.DEGREESAUTHORITYNAME},
{ dataKey: 'employeeName', header: APP_CONSTANTS.EMPLOYEENAME},
{ dataKey: 'qualificationName', header: APP_CONSTANTS.QUALIFICATIONNAME},
{ dataKey: 'specializationName', header: APP_CONSTANTS.SPECIALIZATIONNAME},
    ]
  }

  submitEventHandler(eventData) {
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
    this.empqualificationService.GetAllEmpQualifications('').subscribe(
      (res) => {
        this.empqualifications = res;
      }
    )
  }
}
