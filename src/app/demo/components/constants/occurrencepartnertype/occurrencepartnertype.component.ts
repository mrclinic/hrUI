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
  CancelReason: string = '';
  ConfirmTitle: string = '';
  ConfirmMsg: string = '';
  Success: string = '';
  deleteSuccess: string = '';
  Yes: string = '';
  No: string = '';
  editSuccess: string = '';
  addSuccess: string = '';
  occurrencepartnertypeForm: FormGroup;
  name: string = '';
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
      message: this.ConfirmMsg + this.OccurrencePartnerType.name + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.occurrencepartnertypeService.DeleteOccurrencePartnerType(this.OccurrencePartnerType.id as string).subscribe(
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
    this.occurrencepartnertypeDialog = false;
  }

  saveOccurrencePartnerType() {
    if (this.occurrencepartnertypeForm.valid) {
      if (this.OccurrencePartnerType.id) {
        this.occurrencepartnertypeService.UpdateOccurrencePartnerType(this.OccurrencePartnerType).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.occurrencepartnertypeService.AddOccurrencePartnerType(this.OccurrencePartnerType).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
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
