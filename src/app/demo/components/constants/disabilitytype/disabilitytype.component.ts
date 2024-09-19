import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { DisabilityType } from 'src/app/demo/models/constants/disabilitytype.model';
import { DisabilityTypeService } from 'src/app/demo/service/constants/disabilitytype.service';

@Component({
  selector: 'app-disabilityType',
  templateUrl: './disabilityType.component.html',
  styleUrls: ['./disabilityType.component.css']
})
export class DisabilityTypeComponent implements OnInit {
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
  disabilityTypeForm: FormGroup;
  name: string = '';
  disabilityTypeDialog: boolean = false;

  deleteDisabilityTypeDialog: boolean = false;

  deleteDisabilityTypesDialog: boolean = false;

  disabilityTypes: DisabilityType[] = [];

  disabilityType: DisabilityType = {};

  selectedDisabilityTypes: DisabilityType[] = [];
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService, private readonly disabilityTypeService: DisabilityTypeService) {
    this.disabilityTypeForm = this.fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.disabilityTypeService.GetAllDisabilityTypes('').subscribe(
      (res) => {
        this.disabilityTypes = res;
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
    this.disabilityType = {};
    this.disabilityTypeDialog = true;
  }
  editDisabilityType(disabilityType: DisabilityType) {
    this.disabilityType = { ...disabilityType };
    this.disabilityTypeDialog = true;
  }
  deleteSelectedDisabilityType(disabilityType: DisabilityType) {
    this.disabilityType = disabilityType;
    this.deleteDisabilityType();
  }
  deleteDisabilityType() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.disabilityType.name + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.disabilityTypeService.DeleteDisabilityType(this.disabilityType.id as string).subscribe(
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
    this.disabilityTypeDialog = false;
  }

  saveDisabilityType() {
    if (this.disabilityTypeForm.valid) {
      if (this.disabilityType.id) {
        this.disabilityTypeService.UpdateDisabilityType(this.disabilityType).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.disabilityTypeService.AddDisabilityType(this.disabilityType).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.disabilityTypeDialog = false;
      this.disabilityType = {};
    }
  }

  reload() {
    this.disabilityTypeService.GetAllDisabilityTypes('').subscribe(
      (res) => {
        this.disabilityTypes = res;
      }
    )
  }
  get f() {
    return this.disabilityTypeForm.controls;
  }
}
