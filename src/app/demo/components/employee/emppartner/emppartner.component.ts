import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { EmpPartner } from 'src/app/demo/models/employee/emppartner.model';
import { EmpPartnerService } from 'src/app/demo/service/employee/emppartner.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-emppartner',
  templateUrl: './emppartner.component.html',
  styleUrls: ['./emppartner.component.css']
})
export class EmpPartnerComponent implements OnInit {
  cols: any[] = [];
  emppartners: EmpPartner[] = [];
  formStructure: IFormStructure[] = [];

  constructor(private messageService: MessageService,
    private readonly emppartnerService: EmpPartnerService) { }

  ngOnInit(): void {
    this.emppartnerService.GetAllEmpPartners('').subscribe(
      (res) => {
        this.emppartners = res;
        this.initColumns();
        this.initFormStructure();
      }
    );
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
          },
        ],
      },
{
        type: 'Date',
        label: APP_CONSTANTS.OCCURRENCEDATE,
        name: 'occurrenceDate',
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
        label: APP_CONSTANTS.PARTNERORDER,
        name: 'partnerOrder',
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
        label: APP_CONSTANTS.OCCURRENCETYPE_NAME,
        name: 'occurrenceTypeId',
        value: '',
        options: [...this.occurrenceTypes],
        placeHolder: APP_CONSTANTS.OCCURRENCETYPE_PLACE_HOLDER,
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
        label: APP_CONSTANTS.PARTNERWORK_NAME,
        name: 'partnerWorkId',
        value: '',
        options: [...this.partnerWorks],
        placeHolder: APP_CONSTANTS.PARTNERWORK_PLACE_HOLDER,
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
        label: APP_CONSTANTS.NAME,
        name: 'name',
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
        label: APP_CONSTANTS.OCCURRENCECONTRACTNUMBER,
        name: 'occurrenceContractNumber',
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
{ dataKey: 'birthDate', header: APP_CONSTANTS.BIRTHDATE},
{ dataKey: 'occurrenceDate', header: APP_CONSTANTS.OCCURRENCEDATE},
{ dataKey: 'partnerOrder', header: APP_CONSTANTS.PARTNERORDER},
{ dataKey: 'genderId', header: APP_CONSTANTS.GENDERID},
{ dataKey: 'genderName', header: APP_CONSTANTS.GENDERNAME},
{ dataKey: 'nationalityId', header: APP_CONSTANTS.NATIONALITYID},
{ dataKey: 'nationalityName', header: APP_CONSTANTS.NATIONALITYNAME},
{ dataKey: 'occurrenceTypeId', header: APP_CONSTANTS.OCCURRENCETYPEID},
{ dataKey: 'occurrenceTypeName', header: APP_CONSTANTS.OCCURRENCETYPENAME},
{ dataKey: 'partnerWorkId', header: APP_CONSTANTS.PARTNERWORKID},
{ dataKey: 'partnerWorkName', header: APP_CONSTANTS.PARTNERWORKNAME},
{ dataKey: 'motherName', header: APP_CONSTANTS.MOTHERNAME},
{ dataKey: 'name', header: APP_CONSTANTS.NAME},
{ dataKey: 'occurrenceContractNumber', header: APP_CONSTANTS.OCCURRENCECONTRACTNUMBER},
    ]
  }

  submitEventHandler(eventData) {
    if (eventData.id) {
      this.emppartnerService.UpdateEmpPartner(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.emppartnerService.AddEmpPartner(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.emppartnerService.DeleteEmpPartner(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.emppartnerService.GetAllEmpPartners('').subscribe(
      (res) => {
        this.emppartners = res;
      }
    )
  }
}
