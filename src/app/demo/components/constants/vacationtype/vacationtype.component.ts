import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { VacationType } from 'src/app/demo/models/constants/vacationtype.model';
import { VacationTypeService } from 'src/app/demo/service/constants/vacationtype.service';

@Component({
  selector: 'app-vacationtype',
  templateUrl: './vacationtype.component.html',
  styleUrls: ['./vacationtype.component.css']
})
export class VacationTypeComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  cols: any[];

  vacationtypeForm: FormGroup;

  vacationtypeDialog: boolean = false;

  deleteVacationTypeDialog: boolean = false;

  deleteVacationTypesDialog: boolean = false;

  vacationtypes: VacationType[] = [];

  VacationType: VacationType = {};

  selectedVacationTypes: VacationType[] = [];
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService, private readonly vacationtypeService: VacationTypeService) {
    this.vacationtypeForm = this.fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.vacationtypeService.GetAllVacationTypes('').subscribe(
      (res) => {
        this.vacationtypes = res;
      }
    );

  }
  initColumns() {
    this.cols = [
      { field: 'name', header: "الاسم", type: 'string' }
    ]
  }
  openNew() {
    this.vacationtypeForm.reset();
    this.VacationType = {};
    this.vacationtypeDialog = true;
  }
  editVacationType(VacationType: VacationType) {
    this.VacationType = { ...VacationType };
    this.vacationtypeDialog = true;
  }
  deleteSelectedVacationType(VacationType: VacationType) {
    this.VacationType = VacationType;
    this.deleteVacationType();
  }
  deleteVacationType() {
    this.confirmationService.confirm({
      message: 'هل أنت متأكد من حذف' + this.VacationType.name + '?',
      header: 'تأكيد',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.vacationtypeService.DeleteVacationType(this.VacationType.id as string).subscribe(
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
    this.vacationtypeDialog = false;
  }

  saveVacationType() {
    if (this.vacationtypeForm.valid) {
      if (this.VacationType.id) {
        this.vacationtypeService.UpdateVacationType(this.VacationType).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية التعديل بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.vacationtypeService.AddVacationType(this.VacationType).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية الإضافة بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      this.vacationtypeDialog = false;
      this.VacationType = {};
    }
  }

  reload() {
    this.vacationtypeService.GetAllVacationTypes('').subscribe(
      (res) => {
        this.vacationtypes = res;
      }
    )
  }
  get f() {
    return this.vacationtypeForm.controls;
  }
}
