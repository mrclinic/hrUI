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
    this.translate.get('AppTitle').subscribe(
      () => {
        this.CancelReason = this.translate.instant('CancelReason');
        this.ConfirmTitle = this.translate.instant('ConfirmTitle');
        this.ConfirmMsg = this.translate.instant('ConfirmMsg');
        this.Success = this.translate.instant('Success');
        this.deleteSuccess = this.translate.instant('deleteSuccess');
        this.Yes = this.translate.instant('Yes');
        this.No = this.translate.instant('No');
        this.editSuccess = this.translate.instant('editSuccess');
        this.addSuccess = this.translate.instant('addSuccess');
        this.initColumns();
      }
    )
  }
  initColumns() {
    this.cols = [
      { field: 'name', header: "الاسم", type: 'string' }
    ]
  }
  openNew() {
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
      message: this.ConfirmMsg + this.FinancialImpact.name + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.financialimpactService.DeleteFinancialImpact(this.FinancialImpact.id as string).subscribe(
          (data) => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.deleteSuccess, life: 3000 });
            this.reload();
          }
        );
      },
      acceptLabel: this.Yes,
      rejectLabel: this.No,
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
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.financialimpactService.AddFinancialImpact(this.FinancialImpact).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
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
