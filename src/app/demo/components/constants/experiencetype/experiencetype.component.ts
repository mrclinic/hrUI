import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { ExperienceType } from 'src/app/demo/models/constants/experiencetype.model';
import { ExperienceTypeService } from 'src/app/demo/service/constants/experiencetype.service';

@Component({
  selector: 'app-experiencetype',
  templateUrl: './experiencetype.component.html',
  styleUrls: ['./experiencetype.component.css']
})
export class ExperienceTypeComponent implements OnInit {
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
  experiencetypeForm: FormGroup;
  name: string = '';
  experiencetypeDialog: boolean = false;

  deleteExperienceTypeDialog: boolean = false;

  deleteExperienceTypesDialog: boolean = false;

  experiencetypes: ExperienceType[] = [];

  ExperienceType: ExperienceType = {};

  selectedExperienceTypes: ExperienceType[] = [];
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService, private readonly experiencetypeService: ExperienceTypeService) {
    this.experiencetypeForm = this.fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.experiencetypeService.GetAllExperienceTypes('').subscribe(
      (res) => {
        this.experiencetypes = res;
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
    this.ExperienceType = {};
    this.experiencetypeDialog = true;
  }
  editExperienceType(ExperienceType: ExperienceType) {
    this.ExperienceType = { ...ExperienceType };
    this.experiencetypeDialog = true;
  }
  deleteSelectedExperienceType(ExperienceType: ExperienceType) {
    this.ExperienceType = ExperienceType;
    this.deleteExperienceType();
  }
  deleteExperienceType() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.ExperienceType.name + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.experiencetypeService.DeleteExperienceType(this.ExperienceType.id as string).subscribe(
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
    this.experiencetypeDialog = false;
  }

  saveExperienceType() {
    if (this.experiencetypeForm.valid) {
      if (this.ExperienceType.id) {
        this.experiencetypeService.UpdateExperienceType(this.ExperienceType).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.experiencetypeService.AddExperienceType(this.ExperienceType).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.experiencetypeDialog = false;
      this.ExperienceType = {};
    }
  }

  reload() {
    this.experiencetypeService.GetAllExperienceTypes('').subscribe(
      (res) => {
        this.experiencetypes = res;
      }
    )
  }
  get f() {
    return this.experiencetypeForm.controls;
  }
}
