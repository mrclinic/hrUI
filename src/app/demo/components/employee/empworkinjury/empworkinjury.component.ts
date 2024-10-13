import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { EmpWorkInjuryService } from 'src/app/demo/service/employee/empworkinjury.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-empworkinjury',
  templateUrl: './empworkinjury.component.html',
  styleUrls: ['./empworkinjury.component.css']
})
export class EmpWorkInjuryComponent implements OnInit {
  cols: any[] = [];
  empworkinjurys: any[] = [];
  formStructure: IFormStructure[] = [];
  fetched: boolean = false;
  filter: string;
  canAdd: string = 'HR_EmpWorkInjury_CreateEmpWorkInjury';
  canEdit: string = 'HR_EmpWorkInjury_UpdateEmpWorkInjury';
  canSingleDelete: string = 'HR_EmpWorkInjury_DeleteEmpWorkInjury';
  @Input() personId: string;
  constructor(private messageService: MessageService, private datePipe: DatePipe,
    private readonly empworkinjuryService: EmpWorkInjuryService) { }

  transformDate(date: string | number | Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    this.empworkinjuryService.GetAllEmpWorkInjurys('').subscribe(
      (res) => {
        this.fetched = true;
        this.empworkinjurys = this.mapItemList(res);
        this.initColumns();
        this.initFormStructure();
      }
    );
  }

  mapItemList(items: any[]): any[] {
    return items.map((item) => {
      return Object.assign(item, {
        ...item,
        contractDate: this.transformDate(item?.contractDate)
      });
    })
  }

  initFormStructure() {
    this.formStructure = [
      {
        type: 'Date',
        label: APP_CONSTANTS.CONTRACTDATE,
        name: 'contractDate',
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
        label: APP_CONSTANTS.DISABILITYRATIO,
        name: 'disabilityRatio',
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
        label: APP_CONSTANTS.LUMPSUMAMOUNT,
        name: 'lumpSumAmount',
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
        label: APP_CONSTANTS.MONTHLYAMOUNT,
        name: 'monthlyAmount',
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
        label: APP_CONSTANTS.INJURYTYPE,
        name: 'injuryType',
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
        label: APP_CONSTANTS.CONTRACTNUMBER,
        name: 'contractNumber',
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
      { dataKey: 'contractDate', header: APP_CONSTANTS.CONTRACTDATE },
      { dataKey: 'disabilityRatio', header: APP_CONSTANTS.DISABILITYRATIO },
      { dataKey: 'lumpSumAmount', header: APP_CONSTANTS.LUMPSUMAMOUNT },
      { dataKey: 'monthlyAmount', header: APP_CONSTANTS.MONTHLYAMOUNT },
      { dataKey: 'injuryType', header: APP_CONSTANTS.INJURYTYPE },
      { dataKey: 'contractNumber', header: APP_CONSTANTS.CONTRACTNUMBER },
      { dataKey: 'note', header: APP_CONSTANTS.NOTE }
    ]
  }

  submitEventHandler(eventData) {
    eventData = { ...eventData, employeeId: this.personId };
    if (eventData.id) {
      this.empworkinjuryService.UpdateEmpWorkInjury(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.empworkinjuryService.AddEmpWorkInjury(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.empworkinjuryService.DeleteEmpWorkInjury(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.filter = `Filters=EmployeeId==${this.personId}`;
    this.empworkinjuryService.GetAllEmpWorkInjurys(this.filter).subscribe(
      (res) => {
        this.empworkinjurys = this.mapItemList(res);
      }
    )
  }
}
