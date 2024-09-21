import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { DeputationType } from 'src/app/demo/models/constants/deputationtype.model';
import { DeputationTypeService } from 'src/app/demo/service/constants/deputationtype.service';

@Component({
  selector: 'app-deputationType',
  templateUrl: './deputationType.component.html',
  styleUrls: ['./deputationType.component.css']
})
export class DeputationTypeComponent implements OnInit {
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
  departmentForm: FormGroup;
  name: string = '';
  departmentDialog: boolean = false;

  deleteDeputationTypeDialog: boolean = false;

  deleteDeputationTypesDialog: boolean = false;

  deputationTypes: DeputationType[] = [];

  deputationType: DeputationType = {};

  selectedDeputationTypes: DeputationType[] = [];
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService, private readonly deputationTypeervice: DeputationTypeService) {
    this.departmentForm = this.fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.deputationTypeervice.GetAllDeputationTypes('').subscribe(
      (res) => {
        this.deputationTypes = res;
      }
    );

  }
  initColumns() {
    this.cols = [
      { field: 'name', header: "الاسم", type: 'string' }
    ]
  }
  openNew() {
    this.departmentForm.reset();
    this.deputationType = {};
    this.departmentDialog = true;
  }
  editDeputationType(deputationType: DeputationType) {
    this.deputationType = { ...deputationType };
    this.departmentDialog = true;
  }
  deleteSelectedDeputationType(deputationType: DeputationType) {
    this.deputationType = deputationType;
    this.deleteDeputationType();
  }
  deleteDeputationType() {
    this.confirmationService.confirm({
      message: 'هل أنت متأكد من حذف' + this.deputationType.name + '?',
      header: 'تأكيد',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deputationTypeervice.DeleteDeputationType(this.deputationType.id as string).subscribe(
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
    this.departmentDialog = false;
  }

  saveDeputationType() {
    if (this.departmentForm.valid) {
      if (this.deputationType.id) {
        this.deputationTypeervice.UpdateDeputationType(this.deputationType).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية التعديل بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.deputationTypeervice.AddDeputationType(this.deputationType).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية الإضافة بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      this.departmentDialog = false;
      this.deputationType = {};
    }
  }

  reload() {
    this.deputationTypeervice.GetAllDeputationTypes('').subscribe(
      (res) => {
        this.deputationTypes = res;
      }
    )
  }
  get f() {
    return this.departmentForm.controls;
  }
}
