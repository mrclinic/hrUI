import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { OccurrencePartnerType } from 'src/app/demo/models/constants/occurrencepartnertype.model';
import { OccurrencePartnerTypeService } from 'src/app/demo/service/constants/occurrencepartnertype.service';

@Component({
  selector: 'app-occurrencepartnertype',
  templateUrl: './occurrencepartnertype.component.html',
  styleUrls: ['./occurrencepartnertype.component.css']
})
export class OccurrencePartnerTypeComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  cols: any[];

  occurrencepartnertypeForm: FormGroup;

  occurrencepartnertypeDialog: boolean = false;

  deleteOccurrencePartnerTypeDialog: boolean = false;

  deleteOccurrencePartnerTypesDialog: boolean = false;

  occurrencepartnertypes: OccurrencePartnerType[] = [];

  OccurrencePartnerType: OccurrencePartnerType = {};

  selectedOccurrencePartnerTypes: OccurrencePartnerType[] = [];
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService, private readonly occurrencepartnertypeService: OccurrencePartnerTypeService) {
    this.occurrencepartnertypeForm = this.fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.occurrencepartnertypeService.GetAllOccurrencePartnerTypes('').subscribe(
      (res) => {
        this.occurrencepartnertypes = res;
      }
    );
  }
  initColumns() {
    this.cols = [
      { field: 'name', header: "الاسم", type: 'string' }
    ]
  }
  openNew() {
    this.occurrencepartnertypeForm.reset();
    this.OccurrencePartnerType = {};
    this.occurrencepartnertypeDialog = true;
  }
  editOccurrencePartnerType(OccurrencePartnerType: OccurrencePartnerType) {
    this.OccurrencePartnerType = { ...OccurrencePartnerType };
    this.occurrencepartnertypeDialog = true;
  }
  deleteSelectedOccurrencePartnerType(OccurrencePartnerType: OccurrencePartnerType) {
    this.OccurrencePartnerType = OccurrencePartnerType;
    this.deleteOccurrencePartnerType();
  }
  deleteOccurrencePartnerType() {
    this.confirmationService.confirm({
      message: 'هل أنت متأكد من حذف' + this.OccurrencePartnerType.name + '?',
      header: 'تأكيد',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.occurrencepartnertypeService.DeleteOccurrencePartnerType(this.OccurrencePartnerType.id as string).subscribe(
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
    this.occurrencepartnertypeDialog = false;
  }

  saveOccurrencePartnerType() {
    if (this.occurrencepartnertypeForm.valid) {
      if (this.OccurrencePartnerType.id) {
        this.occurrencepartnertypeService.UpdateOccurrencePartnerType(this.OccurrencePartnerType).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية التعديل بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.occurrencepartnertypeService.AddOccurrencePartnerType(this.OccurrencePartnerType).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية الإضافة بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      this.occurrencepartnertypeDialog = false;
      this.OccurrencePartnerType = {};
    }
  }

  reload() {
    this.occurrencepartnertypeService.GetAllOccurrencePartnerTypes('').subscribe(
      (res) => {
        this.occurrencepartnertypes = res;
      }
    )
  }
  get f() {
    return this.occurrencepartnertypeForm.controls;
  }
}
