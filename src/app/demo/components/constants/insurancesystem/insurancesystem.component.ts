import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { InsuranceSystem } from 'src/app/demo/models/constants/insurancesystem.model';
import { InsuranceSystemService } from 'src/app/demo/service/constants/insurancesystem.service';

@Component({
  selector: 'app-insurancesystem',
  templateUrl: './insurancesystem.component.html',
  styleUrls: ['./insurancesystem.component.css']
})
export class InsuranceSystemComponent implements OnInit {
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
  insurancesystemForm: FormGroup;
  name: string = '';
  insurancesystemDialog: boolean = false;

  deleteInsuranceSystemDialog: boolean = false;

  deleteInsuranceSystemsDialog: boolean = false;

  insurancesystems: InsuranceSystem[] = [];

  InsuranceSystem: InsuranceSystem = {};

  selectedInsuranceSystems: InsuranceSystem[] = [];
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService, private readonly insurancesystemService: InsuranceSystemService) {
    this.insurancesystemForm = this.fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.insurancesystemService.GetAllInsuranceSystems('').subscribe(
      (res) => {
        this.insurancesystems = res;
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
    this.InsuranceSystem = {};
    this.insurancesystemDialog = true;
  }
  editInsuranceSystem(InsuranceSystem: InsuranceSystem) {
    this.InsuranceSystem = { ...InsuranceSystem };
    this.insurancesystemDialog = true;
  }
  deleteSelectedInsuranceSystem(InsuranceSystem: InsuranceSystem) {
    this.InsuranceSystem = InsuranceSystem;
    this.deleteInsuranceSystem();
  }
  deleteInsuranceSystem() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.InsuranceSystem.name + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.insurancesystemService.DeleteInsuranceSystem(this.InsuranceSystem.id as string).subscribe(
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
    this.insurancesystemDialog = false;
  }

  saveInsuranceSystem() {
    if (this.insurancesystemForm.valid) {
      if (this.InsuranceSystem.id) {
        this.insurancesystemService.UpdateInsuranceSystem(this.InsuranceSystem).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.insurancesystemService.AddInsuranceSystem(this.InsuranceSystem).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.insurancesystemDialog = false;
      this.InsuranceSystem = {};
    }
  }

  reload() {
    this.insurancesystemService.GetAllInsuranceSystems('').subscribe(
      (res) => {
        this.insurancesystems = res;
      }
    )
  }
  get f() {
    return this.insurancesystemForm.controls;
  }
}
