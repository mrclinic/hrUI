import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { EmpMilitaryServiceSuspension } from 'src/app/demo/models/employee/empmilitaryservicesuspension.model';
import { EmpMilitaryServiceSuspensionService } from 'src/app/demo/service/employee/empmilitaryservicesuspension.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-empmilitaryservicesuspension',
  templateUrl: './empmilitaryservicesuspension.component.html',
  styleUrls: ['./empmilitaryservicesuspension.component.css']
})
export class EmpMilitaryServiceSuspensionComponent implements OnInit {
  cols: any[] = [];
  empmilitaryservicesuspensions: EmpMilitaryServiceSuspension[] = [];
  formStructure: IFormStructure[] = [];
  fetched: boolean = false;
  filter: string;
  canAdd: string = '';
  canEdit: string = '';
  canSingleDelete: string = '';
  @Input() personId: string;
  constructor(private messageService: MessageService, private datePipe: DatePipe,
    private readonly empmilitaryservicesuspensionService: EmpMilitaryServiceSuspensionService) { }

  transformDate(date: string | number | Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    this.filter = `Filters=EmployeeId==${this.personId}`;
    this.empmilitaryservicesuspensionService.GetAllEmpMilitaryServiceSuspensions(this.filter).subscribe(
      (res) => {
        this.fetched = true;
        this.empmilitaryservicesuspensions = this.mapItemList(res);
        this.initColumns();
        this.initFormStructure();
      }
    );
  }
  mapItemList(items: any[]): any[] {
    return items.map((item) => {
      return Object.assign(item, {
        ...item,
        suspensionDate: this.transformDate(item?.suspensionDate),
        suspensionContractDate: this.transformDate(item?.suspensionContractDate),
        returnToServiceDate: this.transformDate(item?.returnToServiceDate),
        returnContractDate: this.transformDate(item?.returnContractDate)
      });
    })
  }
  initFormStructure() {
    this.formStructure = [
      {
        type: 'Date',
        label: APP_CONSTANTS.SUSPENSIONDATE,
        name: 'suspensionDate',
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
        label: APP_CONSTANTS.SUSPENSIONCONTRACTDATE,
        name: 'suspensionContractDate',
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
        label: APP_CONSTANTS.RETURNTOSERVICEDATE,
        name: 'returnToServiceDate',
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
        label: APP_CONSTANTS.RETURNCONTRACTDATE,
        name: 'returnContractDate',
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
        label: APP_CONSTANTS.SUSPENSIONCONTRACTNUMBER,
        name: 'suspensionContractNumber',
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
        label: APP_CONSTANTS.RETURNCONTRACTNUMBER,
        name: 'returnContractNumber',
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
      { dataKey: 'suspensionDate', header: APP_CONSTANTS.SUSPENSIONDATE },
      { dataKey: 'suspensionContractDate', header: APP_CONSTANTS.SUSPENSIONCONTRACTDATE },
      { dataKey: 'returnToServiceDate', header: APP_CONSTANTS.RETURNTOSERVICEDATE },
      { dataKey: 'returnContractDate', header: APP_CONSTANTS.RETURNCONTRACTDATE },
      { dataKey: 'suspensionContractNumber', header: APP_CONSTANTS.SUSPENSIONCONTRACTNUMBER },
      { dataKey: 'returnContractNumber', header: APP_CONSTANTS.RETURNCONTRACTNUMBER },
      { dataKey: 'note', header: APP_CONSTANTS.NOTE }
    ]
  }

  submitEventHandler(eventData) {
    eventData = { ...eventData, employeeId: this.personId };
    if (eventData.id) {
      this.empmilitaryservicesuspensionService.UpdateEmpMilitaryServiceSuspension(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.empmilitaryservicesuspensionService.AddEmpMilitaryServiceSuspension(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.empmilitaryservicesuspensionService.DeleteEmpMilitaryServiceSuspension(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.filter = `Filters=EmployeeId==${this.personId}`;
    this.empmilitaryservicesuspensionService.GetAllEmpMilitaryServiceSuspensions(this.filter).subscribe(
      (res) => {
        this.empmilitaryservicesuspensions = this.mapItemList(res);
      }
    )
  }
}
