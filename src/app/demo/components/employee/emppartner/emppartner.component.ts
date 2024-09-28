import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { GenderService } from 'src/app/demo/service/constants/gender.service';
import { JobTitleService } from 'src/app/demo/service/constants/jobtitle.service';
import { NationalityService } from 'src/app/demo/service/constants/nationality.service';
import { OccurrencePartnerTypeService } from 'src/app/demo/service/constants/occurrencepartnertype.service';
import { EmpPartnerService } from 'src/app/demo/service/employee/emppartner.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-emppartner',
  templateUrl: './emppartner.component.html',
  styleUrls: ['./emppartner.component.css']
})
export class EmpPartnerComponent implements OnInit {
  cols: any[] = [];
  emppartners: any[] = [];
  formStructure: IFormStructure[] = [];
  fetched: boolean = false;
  filter: string;
  canAdd: string = '';
  canEdit: string = '';
  canSingleDelete: string = '';
  @Input() personId: string;
  genders: any;
  nationalitys: any;
  occurrenceTypes: any;
  partnerWorks: any;
  constructor(private messageService: MessageService,
    private readonly emppartnerService: EmpPartnerService, private datePipe: DatePipe,
    private readonly genderService: GenderService, private readonly nationalityService: NationalityService,
    private readonly occurrencePartnerTypeService: OccurrencePartnerTypeService,
    private readonly jobTitleService: JobTitleService
  ) {
    this.initColumns();
  }

  transformDate(date: string | number | Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    this.filter = `Filters=EmployeeId==${this.personId}`;
    forkJoin([this.emppartnerService.GetEmpPartnersInfo(this.filter),
    this.genderService.GetAllGenders(''),
    this.nationalityService.GetAllNationalitys(''),
    this.occurrencePartnerTypeService.GetAllOccurrencePartnerTypes(''),
    this.jobTitleService.GetAllJobTitles('')
    ])
      .subscribe(([emppartners, genders, nationalitys, occurrenceTypes, partnerWorks
      ]) => {
        this.emppartners = this.mapItemList(emppartners);

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

        this.occurrenceTypes = occurrenceTypes.map((item) => {
          return Object.assign(item, {
            label: item?.name,
            value: item?.id
          });
        });

        this.partnerWorks = partnerWorks.map((item) => {
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
        genderName: item?.gender?.name,
        nationalityName: item?.nationality?.name,
        occurrenceTypeName: item?.occurrenceType?.name,
        partnerWorkName: item?.partnerWork?.name,
        birthDate: this.transformDate(item?.birthDate),
        occurrenceDate: this.transformDate(item?.occurrenceDate)
      });
    })
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
        format: 'yy-mm-dd'
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
        format: 'yy-mm-dd'
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
      { dataKey: 'birthDate', header: APP_CONSTANTS.BIRTHDATE },
      { dataKey: 'occurrenceDate', header: APP_CONSTANTS.OCCURRENCEDATE },
      { dataKey: 'partnerOrder', header: APP_CONSTANTS.PARTNERORDER },
      { dataKey: 'genderName', header: APP_CONSTANTS.GENDER_NAME },
      { dataKey: 'nationalityName', header: APP_CONSTANTS.NATIONALITY_NAME },
      { dataKey: 'occurrenceTypeName', header: APP_CONSTANTS.OCCURRENCETYPE_NAME },
      { dataKey: 'partnerWorkName', header: APP_CONSTANTS.PARTNERWORK_NAME },
      { dataKey: 'motherName', header: APP_CONSTANTS.MOTHERNAME },
      { dataKey: 'name', header: APP_CONSTANTS.NAME },
      { dataKey: 'occurrenceContractNumber', header: APP_CONSTANTS.OCCURRENCECONTRACTNUMBER },
      { dataKey: 'note', header: APP_CONSTANTS.NOTE }
    ]
  }

  submitEventHandler(eventData) {
    eventData = { ...eventData, employeeId: this.personId };
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
    this.filter = `Filters=EmployeeId==${this.personId}`;
    this.emppartnerService.GetEmpPartnersInfo(this.filter).subscribe(
      (res) => {
        this.emppartners = this.mapItemList(res);
      }
    )
  }
}
