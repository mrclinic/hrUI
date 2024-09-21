import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Specialization } from 'src/app/demo/models/constants/specialization.model';
import { SpecializationService } from 'src/app/demo/service/constants/specialization.service';

@Component({
  selector: 'app-specialization',
  templateUrl: './specialization.component.html',
  styleUrls: ['./specialization.component.css']
})
export class SpecializationComponent implements OnInit {
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
  specializationForm: FormGroup;
  name: string = '';
  specializationDialog: boolean = false;

  deleteSpecializationDialog: boolean = false;

  deleteSpecializationsDialog: boolean = false;

  specializations: Specialization[] = [];

  Specialization: Specialization = {};

  selectedSpecializations: Specialization[] = [];
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService, private readonly specializationService: SpecializationService) {
    this.specializationForm = this.fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.specializationService.GetAllSpecializations('').subscribe(
      (res) => {
        this.specializations = res;
      }
    );

  }
  initColumns() {
    this.cols = [
      { field: 'name', header: "الاسم", type: 'string' }
    ]
  }
  openNew() {
    this.specializationForm.reset();
    this.Specialization = {};
    this.specializationDialog = true;
  }
  editSpecialization(Specialization: Specialization) {
    this.Specialization = { ...Specialization };
    this.specializationDialog = true;
  }
  deleteSelectedSpecialization(Specialization: Specialization) {
    this.Specialization = Specialization;
    this.deleteSpecialization();
  }
  deleteSpecialization() {
    this.confirmationService.confirm({
      message: 'هل أنت متأكد من حذف' + this.Specialization.name + '?',
      header: 'تأكيد',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.specializationService.DeleteSpecialization(this.Specialization.id as string).subscribe(
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
    this.specializationDialog = false;
  }

  saveSpecialization() {
    if (this.specializationForm.valid) {
      if (this.Specialization.id) {
        this.specializationService.UpdateSpecialization(this.Specialization).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية التعديل بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.specializationService.AddSpecialization(this.Specialization).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية الإضافة بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      this.specializationDialog = false;
      this.Specialization = {};
    }
  }

  reload() {
    this.specializationService.GetAllSpecializations('').subscribe(
      (res) => {
        this.specializations = res;
      }
    )
  }
  get f() {
    return this.specializationForm.controls;
  }
}
