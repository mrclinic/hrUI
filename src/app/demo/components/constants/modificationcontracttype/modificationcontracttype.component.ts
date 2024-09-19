import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { ModificationContractType } from 'src/app/demo/models/constants/modificationcontracttype.model';
import { ModificationContractTypeService } from 'src/app/demo/service/constants/modificationcontracttype.service';

@Component({
  selector: 'app-modificationcontracttype',
  templateUrl: './modificationcontracttype.component.html',
  styleUrls: ['./modificationcontracttype.component.css']
})
export class ModificationContractTypeComponent implements OnInit {
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
  modificationcontracttypeForm: FormGroup;
  name: string = '';
  modificationcontracttypeDialog: boolean = false;

  deleteModificationContractTypeDialog: boolean = false;

  deleteModificationContractTypesDialog: boolean = false;

  modificationcontracttypes: ModificationContractType[] = [];

  ModificationContractType: ModificationContractType = {};

  selectedModificationContractTypes: ModificationContractType[] = [];
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService
    , private readonly modificationcontracttypeService: ModificationContractTypeService) {
    this.modificationcontracttypeForm = this.fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.modificationcontracttypeService.GetAllModificationContractTypes('').subscribe(
      (res) => {
        this.modificationcontracttypes = res;
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
    this.ModificationContractType = {};
    this.modificationcontracttypeDialog = true;
  }
  editModificationContractType(ModificationContractType: ModificationContractType) {
    this.ModificationContractType = { ...ModificationContractType };
    this.modificationcontracttypeDialog = true;
  }
  deleteSelectedModificationContractType(ModificationContractType: ModificationContractType) {
    this.ModificationContractType = ModificationContractType;
    this.deleteModificationContractType();
  }
  deleteModificationContractType() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.ModificationContractType.name + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.modificationcontracttypeService.DeleteModificationContractType(this.ModificationContractType.id as string).subscribe(
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
    this.modificationcontracttypeDialog = false;
  }

  saveModificationContractType() {
    if (this.modificationcontracttypeForm.valid) {
      if (this.ModificationContractType.id) {
        this.modificationcontracttypeService.UpdateModificationContractType(this.ModificationContractType).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.modificationcontracttypeService.AddModificationContractType(this.ModificationContractType).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.modificationcontracttypeDialog = false;
      this.ModificationContractType = {};
    }
  }

  reload() {
    this.modificationcontracttypeService.GetAllModificationContractTypes('').subscribe(
      (res) => {
        this.modificationcontracttypes = res;
      }
    )
  }
  get f() {
    return this.modificationcontracttypeForm.controls;
  }
}
