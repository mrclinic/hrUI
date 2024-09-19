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
  CancelReason: string = '';
  ConfirmTitle: string = '';
  ConfirmMsg: string = '';
  Success: string = '';
  deleteSuccess: string = '';
  Yes: string = '';
  No: string = '';
  editSuccess: string = '';
  addSuccess: string = '';
  militaryspecializationForm: FormGroup;
  name: string = '';
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
      message: this.ConfirmMsg + this.MilitarySpecialization.name + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.militaryspecializationService.DeleteMilitarySpecialization(this.MilitarySpecialization.id as string).subscribe(
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
    this.militaryspecializationDialog = false;
  }

  saveMilitarySpecialization() {
    if (this.militaryspecializationForm.valid) {
      if (this.MilitarySpecialization.id) {
        this.militaryspecializationService.UpdateMilitarySpecialization(this.MilitarySpecialization).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.militaryspecializationService.AddMilitarySpecialization(this.MilitarySpecialization).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
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
