import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { EmpMilitaryServiceCohortService } from 'src/app/demo/service/employee/empmilitaryservicecohort.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-empmilitaryservicecohort',
  templateUrl: './empmilitaryservicecohort.component.html',
  styleUrls: ['./empmilitaryservicecohort.component.css']
})
export class EmpMilitaryServiceCohortComponent implements OnInit {
  cols: any[] = [];
  empmilitaryservicecohorts: any[] = [];
  formStructure: IFormStructure[] = [];
  fetched: boolean = false;
  filter: string;
  canAdd: string = '';
  canEdit: string = '';
  canSingleDelete: string = '';
  @Input() personId: string;
  constructor(private messageService: MessageService,
    private readonly empmilitaryservicecohortService: EmpMilitaryServiceCohortService
    , private datePipe: DatePipe) { }

  transformDate(date: string | number | Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    this.filter = `Filters=EmployeeId==${this.personId}`;
    this.empmilitaryservicecohortService.GetAllEmpMilitaryServiceCohorts(this.filter).subscribe(
      (res) => {
        this.fetched = true;
        this.empmilitaryservicecohorts = this.mapItemList(res);
        this.initColumns();
        this.initFormStructure();
      }
    );
  }

  mapItemList(items: any[]): any[] {
    return items.map((item) => {
      return Object.assign(item, {
        ...item,
        startDate: this.transformDate(item?.startDate),
        startContractDate: this.transformDate(item?.startContractDate),
        endContractDate: this.transformDate(item?.endContractDate),
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
        label: APP_CONSTANTS.STARTCONTRACTDATE,
        name: 'startContractDate',
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
        label: APP_CONSTANTS.ENDCONTRACTDATE,
        name: 'endContractDate',
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
        label: APP_CONSTANTS.STARTCONTRACTNUMBER,
        name: 'startContractNumber',
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
        label: APP_CONSTANTS.ENDCONTRACTNUMBER,
        name: 'endContractNumber',
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
      { dataKey: 'startDate', header: APP_CONSTANTS.STARTDATE },
      { dataKey: 'startContractDate', header: APP_CONSTANTS.STARTCONTRACTDATE },
      { dataKey: 'endDate', header: APP_CONSTANTS.ENDDATE },
      { dataKey: 'endContractDate', header: APP_CONSTANTS.ENDCONTRACTDATE },
      { dataKey: 'startContractNumber', header: APP_CONSTANTS.STARTCONTRACTNUMBER },
      { dataKey: 'endContractNumber', header: APP_CONSTANTS.ENDCONTRACTNUMBER },
      { dataKey: 'note', header: APP_CONSTANTS.NOTE }
    ]
  }

  submitEventHandler(eventData) {
    eventData = { ...eventData, employeeId: this.personId };
    if (eventData.id) {
      this.empmilitaryservicecohortService.UpdateEmpMilitaryServiceCohort(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.empmilitaryservicecohortService.AddEmpMilitaryServiceCohort(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.empmilitaryservicecohortService.DeleteEmpMilitaryServiceCohort(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.filter = `Filters=EmployeeId==${this.personId}`;
    this.empmilitaryservicecohortService.GetAllEmpMilitaryServiceCohorts(this.filter).subscribe(
      (res) => {
        this.empmilitaryservicecohorts = this.mapItemList(res);
      }
    )
  }
}
