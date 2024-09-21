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
  }
  initColumns() {
    this.cols = [
      { field: 'name', header: "الاسم", type: 'string' }
    ]
  }
  openNew() {
    this.modificationcontracttypeForm.reset();
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
      message: 'هل أنت متأكد من حذف' + this.ModificationContractType.name + '?',
      header: 'تأكيد',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.modificationcontracttypeService.DeleteModificationContractType(this.ModificationContractType.id as string).subscribe(
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
    this.modificationcontracttypeDialog = false;
  }

  saveModificationContractType() {
    if (this.modificationcontracttypeForm.valid) {
      if (this.ModificationContractType.id) {
        this.modificationcontracttypeService.UpdateModificationContractType(this.ModificationContractType).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية التعديل بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.modificationcontracttypeService.AddModificationContractType(this.ModificationContractType).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية الإضافة بنجاح', life: 3000 });
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
