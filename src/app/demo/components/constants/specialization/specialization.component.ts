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
      message: this.ConfirmMsg + this.Specialization.name + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.specializationService.DeleteSpecialization(this.Specialization.id as string).subscribe(
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
    this.specializationDialog = false;
  }

  saveSpecialization() {
    if (this.specializationForm.valid) {
      if (this.Specialization.id) {
        this.specializationService.UpdateSpecialization(this.Specialization).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.specializationService.AddSpecialization(this.Specialization).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
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
