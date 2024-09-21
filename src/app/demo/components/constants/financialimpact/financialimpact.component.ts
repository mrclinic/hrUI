import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { FinancialImpact } from 'src/app/demo/models/constants/financialimpact.model';
import { FinancialImpactService } from 'src/app/demo/service/constants/financialimpact.service';

@Component({
  selector: 'app-financialimpact',
  templateUrl: './financialimpact.component.html',
  styleUrls: ['./financialimpact.component.css']
})
export class FinancialImpactComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  cols: any[];
  CancelReason: string = '';
  ConfirmTitle: string = '';
  ConfirmMsg: string = '';
  Success: string = '';
  deleteSuccess: string = '';
  Yes: string = '';
  No: string = '';
  editSuccess: string = '';
  addSuccess: string = '';
  financialimpactForm: FormGroup;
  name: string = '';
  financialimpactDialog: boolean = false;

  deleteFinancialImpactDialog: boolean = false;

  deleteFinancialImpactsDialog: boolean = false;

  financialimpacts: FinancialImpact[] = [];

  FinancialImpact: FinancialImpact = {};

  selectedFinancialImpacts: FinancialImpact[] = [];
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService, private readonly financialimpactService: FinancialImpactService) {
    this.financialimpactForm = this.fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.financialimpactService.GetAllFinancialImpacts('').subscribe(
      (res) => {
        this.financialimpacts = res;
      }
    );
  }
  initColumns() {
    this.cols = [
      { field: 'name', header: "الاسم", type: 'string' }
    ]
  }
  openNew() {
    this.financialimpactForm.reset();
    this.FinancialImpact = {};
    this.financialimpactDialog = true;
  }
  editFinancialImpact(FinancialImpact: FinancialImpact) {
    this.FinancialImpact = { ...FinancialImpact };
    this.financialimpactDialog = true;
  }
  deleteSelectedFinancialImpact(FinancialImpact: FinancialImpact) {
    this.FinancialImpact = FinancialImpact;
    this.deleteFinancialImpact();
  }
  deleteFinancialImpact() {
    this.confirmationService.confirm({
      message: 'هل أنت متأكد من حذف' + this.FinancialImpact.name + '?',
      header: 'تأكيد',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.financialimpactService.DeleteFinancialImpact(this.FinancialImpact.id as string).subscribe(
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
    this.financialimpactDialog = false;
  }

  saveFinancialImpact() {
    if (this.financialimpactForm.valid) {
      if (this.FinancialImpact.id) {
        this.financialimpactService.UpdateFinancialImpact(this.FinancialImpact).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية التعديل بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.financialimpactService.AddFinancialImpact(this.FinancialImpact).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية الإضافة بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      this.financialimpactDialog = false;
      this.FinancialImpact = {};
    }
  }

  reload() {
    this.financialimpactService.GetAllFinancialImpacts('').subscribe(
      (res) => {
        this.financialimpacts = res;
      }
    )
  }
  get f() {
    return this.financialimpactForm.controls;
  }
}
