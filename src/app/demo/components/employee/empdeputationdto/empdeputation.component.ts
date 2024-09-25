import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { EmpDeputation } from 'src/app/demo/models/employee/empdeputation.model';
import { EmpDeputationService } from 'src/app/demo/service/employee/empdeputation.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-empdeputation',
  templateUrl: './empdeputation.component.html',
  styleUrls: ['./empdeputation.component.css']
})
export class EmpDeputationComponent implements OnInit {
  cols: any[] = [];
  empdeputations: EmpDeputation[] = [];
  formStructure: IFormStructure[] = [];

  constructor(private messageService: MessageService,
    private readonly empdeputationService: EmpDeputationService) { }

  ngOnInit(): void {
    this.empdeputationService.GetAllEmpDeputations('').subscribe(
      (res) => {
        this.empdeputations = res;
        this.initColumns();
        this.initFormStructure();
      }
    );
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
        ],
      },
    ];
  }

  initColumns() {
    this.cols = [
{ dataKey: 'startDate', header: APP_CONSTANTS.STARTDATE},
{ dataKey: 'endDate', header: APP_CONSTANTS.ENDDATE},
{ dataKey: 'returnDate', header: APP_CONSTANTS.RETURNDATE},
{ dataKey: 'deputationDecisionDate', header: APP_CONSTANTS.DEPUTATIONDECISIONDATE},
{ dataKey: 'executiveContractDate', header: APP_CONSTANTS.EXECUTIVECONTRACTDATE},
{ dataKey: 'startAfterReturnDate', header: APP_CONSTANTS.STARTAFTERRETURNDATE},
{ dataKey: 'countryId', header: APP_CONSTANTS.COUNTRYID},
{ dataKey: 'countryName', header: APP_CONSTANTS.COUNTRYNAME},
{ dataKey: 'cityId', header: APP_CONSTANTS.CITYID},
{ dataKey: 'cityName', header: APP_CONSTANTS.CITYNAME},
{ dataKey: 'universityId', header: APP_CONSTANTS.UNIVERSITYID},
{ dataKey: 'universityName', header: APP_CONSTANTS.UNIVERSITYNAME},
{ dataKey: 'deputationObjectiveId', header: APP_CONSTANTS.DEPUTATIONOBJECTIVEID},
{ dataKey: 'deputationObjectiveName', header: APP_CONSTANTS.DEPUTATIONOBJECTIVENAME},
{ dataKey: 'deputationStatusId', header: APP_CONSTANTS.DEPUTATIONSTATUSID},
{ dataKey: 'deputationStatusName', header: APP_CONSTANTS.DEPUTATIONSTATUSNAME},
{ dataKey: 'deputationTypeId', header: APP_CONSTANTS.DEPUTATIONTYPEID},
{ dataKey: 'deputationTypeName', header: APP_CONSTANTS.DEPUTATIONTYPENAME},
{ dataKey: 'duration', header: APP_CONSTANTS.DURATION},
{ dataKey: 'deputationDecisionNumber', header: APP_CONSTANTS.DEPUTATIONDECISIONNUMBER},
{ dataKey: 'requiredSpecialization', header: APP_CONSTANTS.REQUIREDSPECIALIZATION},
{ dataKey: 'executiveContractNumber', header: APP_CONSTANTS.EXECUTIVECONTRACTNUMBER},
{ dataKey: 'assignedEntity', header: APP_CONSTANTS.ASSIGNEDENTITY},
{ dataKey: 'deputationReason', header: APP_CONSTANTS.DEPUTATIONREASON},
    ]
  }

  submitEventHandler(eventData) {
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
    this.empdeputationService.GetAllEmpDeputations('').subscribe(
      (res) => {
        this.empdeputations = res;
      }
    )
  }
}
