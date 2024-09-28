import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { ModificationContractTypeService } from 'src/app/demo/service/constants/modificationcontracttype.service';
import { EmpWorkPlaceService } from 'src/app/demo/service/employee/empworkplace.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-empworkplace',
  templateUrl: './empworkplace.component.html',
  styleUrls: ['./empworkplace.component.css']
})
export class EmpWorkPlaceComponent implements OnInit {
  cols: any[] = [];
  empworkplaces: any[] = [];
  formStructure: IFormStructure[] = [];
  fetched: boolean = false;
  filter: string;
  canAdd: string = '';
  canEdit: string = '';
  canSingleDelete: string = '';
  @Input() personId: string;
  contractTypes: any[] = [];
  constructor(private messageService: MessageService, private datePipe: DatePipe,
    private readonly empworkplaceService: EmpWorkPlaceService,
    private readonly modificationContractTypeService: ModificationContractTypeService) {
    this.initColumns();
  }

  transformDate(date: string | number | Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    this.filter = `Filters=EmployeeId==${this.personId}`;
    forkJoin([this.empworkplaceService.GetEmpWorkPlacesInfo(this.filter),
    this.modificationContractTypeService.GetAllModificationContractTypes('')
    ])
      .subscribe(([empworkplaces, contractTypes
      ]) => {
        this.empworkplaces = this.mapItemList(empworkplaces);

        this.contractTypes = contractTypes.map((item) => {
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
        contractTypeName: item?.contractType?.name,
        dateOfStart: this.transformDate(item?.dateOfStart),
        dateOfRelinquishment: this.transformDate(item?.dateOfRelinquishment),
        dateOfContract: this.transformDate(item?.dateOfContract)
      });
    })
  }

  initFormStructure() {
    this.formStructure = [
      {
        type: 'Date',
        label: APP_CONSTANTS.DATEOFSTART,
        name: 'dateOfStart',
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
        label: APP_CONSTANTS.DATEOFRELINQUISHMENT,
        name: 'dateOfRelinquishment',
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
        label: APP_CONSTANTS.DATEOFCONTRACT,
        name: 'dateOfContract',
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
        label: APP_CONSTANTS.CONTRACTTYPE_NAME,
        name: 'contractTypeId',
        value: '',
        options: [...this.contractTypes],
        placeHolder: APP_CONSTANTS.CONTRACTTYPE_PLACE_HOLDER,
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
        label: APP_CONSTANTS.CONTRACTNUMBER,
        name: 'contractNumber',
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
      { dataKey: 'dateOfStart', header: APP_CONSTANTS.DATEOFSTART },
      { dataKey: 'dateOfRelinquishment', header: APP_CONSTANTS.DATEOFRELINQUISHMENT },
      { dataKey: 'dateOfContract', header: APP_CONSTANTS.DATEOFCONTRACT },
      { dataKey: 'contractNumber', header: APP_CONSTANTS.CONTRACTNUMBER },
      { dataKey: 'contractTypeName', header: APP_CONSTANTS.CONTRACTTYPE_NAME },
      { dataKey: 'note', header: APP_CONSTANTS.NOTE }
    ]
  }

  submitEventHandler(eventData) {
    eventData = { ...eventData, employeeId: this.personId };
    if (eventData.id) {
      this.empworkplaceService.UpdateEmpWorkPlace(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.empworkplaceService.AddEmpWorkPlace(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.empworkplaceService.DeleteEmpWorkPlace(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.filter = `Filters=EmployeeId==${this.personId}`;
    this.empworkplaceService.GetEmpWorkPlacesInfo(this.filter).subscribe(
      (res) => {
        this.empworkplaces = this.mapItemList(res);
      }
    )
  }
}
