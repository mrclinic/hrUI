import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { FinancialIndicatorType } from 'src/app/demo/models/constants/financialindicatortype.model';
import { FinancialIndicatorTypeService } from 'src/app/demo/service/constants/financialindicatortype.service';

@Component({
  selector: 'app-financialindicatortype',
  templateUrl: './financialindicatortype.component.html',
  styleUrls: ['./financialindicatortype.component.css']
})
export class FinancialIndicatorTypeComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  cols: any[];

  financialindicatortypeForm: FormGroup;

  financialindicatortypeDialog: boolean = false;

  deleteFinancialIndicatorTypeDialog: boolean = false;

  deleteFinancialIndicatorTypesDialog: boolean = false;

  financialindicatortypes: FinancialIndicatorType[] = [];

  FinancialIndicatorType: FinancialIndicatorType = {};

  selectedFinancialIndicatorTypes: FinancialIndicatorType[] = [];
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService, private readonly financialindicatortypeService: FinancialIndicatorTypeService) {
    this.financialindicatortypeForm = this.fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.financialindicatortypeService.GetAllFinancialIndicatorTypes('').subscribe(
      (res) => {
        this.financialindicatortypes = res;
      }
    );

  }
  initColumns() {
    this.cols = [
      { field: 'name', header: "الاسم", type: 'string' }
    ]
  }
  openNew() {
    this.financialindicatortypeForm.reset();
    this.FinancialIndicatorType = {};
    this.financialindicatortypeDialog = true;
  }
  editFinancialIndicatorType(FinancialIndicatorType: FinancialIndicatorType) {
    this.FinancialIndicatorType = { ...FinancialIndicatorType };
    this.financialindicatortypeDialog = true;
  }
  deleteSelectedFinancialIndicatorType(FinancialIndicatorType: FinancialIndicatorType) {
    this.FinancialIndicatorType = FinancialIndicatorType;
    this.deleteFinancialIndicatorType();
  }
  deleteFinancialIndicatorType() {
    this.confirmationService.confirm({
      message: 'هل أنت متأكد من حذف' + this.FinancialIndicatorType.name + '?',
      header: 'تأكيد',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.financialindicatortypeService.DeleteFinancialIndicatorType(this.FinancialIndicatorType.id as string).subscribe(
          (data) => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية الحذف بنجاح', life: 3000 });
            this.reload();
          }
        );
      },
      acceptLabel: 'نعم',
      rejectLabel: 'لا',
    });
  }

  hideDialog() {
    this.financialindicatortypeDialog = false;
  }

  saveFinancialIndicatorType() {
    if (this.financialindicatortypeForm.valid) {
      if (this.FinancialIndicatorType.id) {
        this.financialindicatortypeService.UpdateFinancialIndicatorType(this.FinancialIndicatorType).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية التعديل بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.financialindicatortypeService.AddFinancialIndicatorType(this.FinancialIndicatorType).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية الإضافة بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      this.financialindicatortypeDialog = false;
      this.FinancialIndicatorType = {};
    }
  }

  reload() {
    this.financialindicatortypeService.GetAllFinancialIndicatorTypes('').subscribe(
      (res) => {
        this.financialindicatortypes = res;
      }
    )
  }
  get f() {
    return this.financialindicatortypeForm.controls;
  }
}
