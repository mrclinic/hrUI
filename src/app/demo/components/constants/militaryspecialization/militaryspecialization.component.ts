import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { MilitarySpecialization } from 'src/app/demo/models/constants/militaryspecialization.model';
import { MilitarySpecializationService } from 'src/app/demo/service/constants/militaryspecialization.service';

@Component({
  selector: 'app-militaryspecialization',
  templateUrl: './militaryspecialization.component.html',
  styleUrls: ['./militaryspecialization.component.css']
})
export class MilitarySpecializationComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  cols: any[];

  militaryspecializationForm: FormGroup;

  militaryspecializationDialog: boolean = false;

  deleteMilitarySpecializationDialog: boolean = false;

  deleteMilitarySpecializationsDialog: boolean = false;

  militaryspecializations: MilitarySpecialization[] = [];

  MilitarySpecialization: MilitarySpecialization = {};

  selectedMilitarySpecializations: MilitarySpecialization[] = [];
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService, private readonly militaryspecializationService: MilitarySpecializationService) {
    this.militaryspecializationForm = this.fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.militaryspecializationService.GetAllMilitarySpecializations('').subscribe(
      (res) => {
        this.militaryspecializations = res;
      }
    );
  }
  initColumns() {
    this.cols = [
      { field: 'name', header: "الاسم", type: 'string' }
    ]
  }
  openNew() {
    this.militaryspecializationForm.reset();
    this.MilitarySpecialization = {};
    this.militaryspecializationDialog = true;
  }
  editMilitarySpecialization(MilitarySpecialization: MilitarySpecialization) {
    this.MilitarySpecialization = { ...MilitarySpecialization };
    this.militaryspecializationDialog = true;
  }
  deleteSelectedMilitarySpecialization(MilitarySpecialization: MilitarySpecialization) {
    this.MilitarySpecialization = MilitarySpecialization;
    this.deleteMilitarySpecialization();
  }
  deleteMilitarySpecialization() {
    this.confirmationService.confirm({
      message: 'هل أنت متأكد من حذف' + this.MilitarySpecialization.name + '?',
      header: 'تأكيد',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.militaryspecializationService.DeleteMilitarySpecialization(this.MilitarySpecialization.id as string).subscribe(
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
    this.militaryspecializationDialog = false;
  }

  saveMilitarySpecialization() {
    if (this.militaryspecializationForm.valid) {
      if (this.MilitarySpecialization.id) {
        this.militaryspecializationService.UpdateMilitarySpecialization(this.MilitarySpecialization).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية التعديل بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.militaryspecializationService.AddMilitarySpecialization(this.MilitarySpecialization).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية الإضافة بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      this.militaryspecializationDialog = false;
      this.MilitarySpecialization = {};
    }
  }

  reload() {
    this.militaryspecializationService.GetAllMilitarySpecializations('').subscribe(
      (res) => {
        this.militaryspecializations = res;
      }
    )
  }
  get f() {
    return this.militaryspecializationForm.controls;
  }
}
