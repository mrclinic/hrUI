import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { MilitaryRankService } from 'src/app/demo/service/constants/militaryrank.service';
import { MilitarySpecializationService } from 'src/app/demo/service/constants/militaryspecialization.service';
import { EmpMilitaryServiceService } from 'src/app/demo/service/employee/empmilitaryservice.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-empmilitaryservice',
  templateUrl: './empmilitaryservice.component.html',
  styleUrls: ['./empmilitaryservice.component.css']
})
export class EmpMilitaryServiceComponent implements OnInit {
  cols: any[] = [];
  empmilitaryservices: any[] = [];
  formStructure: IFormStructure[] = [];
  militaryRanks: any[] = [];
  militarySpecializations: any[] = [];
  fetched: boolean = false;
  filter: string;
  canAdd: string = 'HR_EmpMilitaryService_CreateEmpMilitaryService';
  canEdit: string = 'HR_EmpMilitaryService_UpdateEmpMilitaryService';
  canSingleDelete: string = 'HR_EmpMilitaryService_DeleteEmpMilitaryService';
  @Input() personId: string;

  constructor(private messageService: MessageService,
    private readonly empmilitaryserviceService: EmpMilitaryServiceService,
    private readonly militaryRankService: MilitaryRankService,
    private readonly militarySpecializationService: MilitarySpecializationService, private datePipe: DatePipe) {
    this.initColumns();
  }

  transformDate(date: string | number | Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    this.filter = `Filters=EmployeeId==${this.personId}`;
    forkJoin([this.empmilitaryserviceService.GetEmpMilitaryServicesInfo(this.filter),
    this.militaryRankService.GetAllMilitaryRanks(''),
    this.militarySpecializationService.GetAllMilitarySpecializations('')
    ])
      .subscribe(([empmilitaryservices, militaryRanks, militarySpecializations
      ]) => {
        this.empmilitaryservices = this.mapItemList(empmilitaryservices);

        this.militaryRanks = militaryRanks.map((item) => {
          return Object.assign(item, {
            label: item?.name,
            value: item?.id
          });
        });

        this.militarySpecializations = militarySpecializations.map((item) => {
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
        militaryRankName: item?.militaryRank?.name,
        militarySpecializationName: item?.militarySpecialization?.name,
        startDate: this.transformDate(item?.startDate),
        endDate: this.transformDate(item?.endDate)
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
        type: 'select',
        label: APP_CONSTANTS.MILITARYRANK_NAME,
        name: 'militaryRankId',
        value: '',
        options: [...this.militaryRanks],
        placeHolder: APP_CONSTANTS.MILITARYRANK_PLACE_HOLDER,
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
        label: APP_CONSTANTS.MILITARYSPECIALIZATION_NAME,
        name: 'militarySpecializationId',
        value: '',
        options: [...this.militarySpecializations],
        placeHolder: APP_CONSTANTS.MILITARYSPECIALIZATION_PLACE_HOLDER,
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
        label: APP_CONSTANTS.MILITARYNUMBER,
        name: 'militaryNumber',
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
        label: APP_CONSTANTS.RESERVENUMBER,
        name: 'reserveNumber',
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
        label: APP_CONSTANTS.COHORTNUMBER,
        name: 'cohortNumber',
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
        label: APP_CONSTANTS.RECRUITMENTBRANCH,
        name: 'recruitmentBranch',
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
        label: APP_CONSTANTS.RECRUITMENTNUMBER,
        name: 'recruitmentNumber',
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
      { dataKey: 'militaryRankName', header: APP_CONSTANTS.MILITARYRANK_NAME },
      { dataKey: 'militarySpecializationName', header: APP_CONSTANTS.MILITARYSPECIALIZATION_NAME },
      { dataKey: 'militaryNumber', header: APP_CONSTANTS.MILITARYNUMBER },
      { dataKey: 'reserveNumber', header: APP_CONSTANTS.RESERVENUMBER },
      { dataKey: 'cohortNumber', header: APP_CONSTANTS.COHORTNUMBER },
      { dataKey: 'recruitmentBranch', header: APP_CONSTANTS.RECRUITMENTBRANCH },
      { dataKey: 'recruitmentNumber', header: APP_CONSTANTS.RECRUITMENTNUMBER },
      { dataKey: 'note', header: APP_CONSTANTS.NOTE }
    ]
  }

  submitEventHandler(eventData) {
    eventData = { ...eventData, employeeId: this.personId };
    if (eventData.id) {
      this.empmilitaryserviceService.UpdateEmpMilitaryService(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.empmilitaryserviceService.AddEmpMilitaryService(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.empmilitaryserviceService.DeleteEmpMilitaryService(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.filter = `Filters=EmployeeId==${this.personId}`;
    this.empmilitaryserviceService.GetEmpMilitaryServicesInfo(this.filter).subscribe(
      (res) => {
        this.empmilitaryservices = this.mapItemList(res);
      }
    )
  }
}
