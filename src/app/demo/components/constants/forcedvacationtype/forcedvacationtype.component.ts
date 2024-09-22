import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { ForcedVacationType } from 'src/app/demo/models/constants/forcedvacationtype.model';
import { ForcedVacationTypeService } from 'src/app/demo/service/constants/forcedvacationtype.service';

@Component({
  selector: 'app-forcedvacationtype',
  templateUrl: './forcedvacationtype.component.html',
  styleUrls: ['./forcedvacationtype.component.css']
})
export class ForcedVacationTypeComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  cols: any[];

  forcedvacationtypeForm: FormGroup;

  forcedvacationtypeDialog: boolean = false;

  deleteForcedVacationTypeDialog: boolean = false;

  deleteForcedVacationTypesDialog: boolean = false;

  forcedvacationtypes: ForcedVacationType[] = [];

  ForcedVacationType: ForcedVacationType = {};

  selectedForcedVacationTypes: ForcedVacationType[] = [];
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService, private readonly forcedvacationtypeService: ForcedVacationTypeService) {
    this.forcedvacationtypeForm = this.fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.forcedvacationtypeService.GetAllForcedVacationTypes('').subscribe(
      (res) => {
        this.forcedvacationtypes = res;
      }
    );

  }
  initColumns() {
    this.cols = [
      { field: 'name', header: "الاسم", type: 'string' }
    ]
  }
  openNew() {
    this.forcedvacationtypeForm.reset();
    this.ForcedVacationType = {};
    this.forcedvacationtypeDialog = true;
  }
  editForcedVacationType(ForcedVacationType: ForcedVacationType) {
    this.ForcedVacationType = { ...ForcedVacationType };
    this.forcedvacationtypeDialog = true;
  }
  deleteSelectedForcedVacationType(ForcedVacationType: ForcedVacationType) {
    this.ForcedVacationType = ForcedVacationType;
    this.deleteForcedVacationType();
  }
  deleteForcedVacationType() {
    this.confirmationService.confirm({
      message: 'هل أنت متأكد من حذف' + this.ForcedVacationType.name + '?',
      header: 'تأكيد',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.forcedvacationtypeService.DeleteForcedVacationType(this.ForcedVacationType.id as string).subscribe(
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
    this.forcedvacationtypeDialog = false;
  }

  saveForcedVacationType() {
    if (this.forcedvacationtypeForm.valid) {
      if (this.ForcedVacationType.id) {
        this.forcedvacationtypeService.UpdateForcedVacationType(this.ForcedVacationType).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية التعديل بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.forcedvacationtypeService.AddForcedVacationType(this.ForcedVacationType).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية الإضافة بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      this.forcedvacationtypeDialog = false;
      this.ForcedVacationType = {};
    }
  }

  reload() {
    this.forcedvacationtypeService.GetAllForcedVacationTypes('').subscribe(
      (res) => {
        this.forcedvacationtypes = res;
      }
    )
  }
  get f() {
    return this.forcedvacationtypeForm.controls;
  }
}
