import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { MaritalStatus } from 'src/app/demo/models/constants/maritalstatus.model';
import { MaritalStatusService } from 'src/app/demo/service/constants/maritalstatus.service';

@Component({
  selector: 'app-maritalstatus',
  templateUrl: './maritalstatus.component.html',
  styleUrls: ['./maritalstatus.component.css']
})
export class MaritalStatusComponent implements OnInit {
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
  maritalstatusForm: FormGroup;
  name: string = '';
  maritalstatusDialog: boolean = false;

  deleteMaritalStatusDialog: boolean = false;

  deleteMaritalStatussDialog: boolean = false;

  maritalstatuss: MaritalStatus[] = [];

  MaritalStatus: MaritalStatus = {};

  selectedMaritalStatuss: MaritalStatus[] = [];
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService, private readonly maritalstatusService: MaritalStatusService) {
    this.maritalstatusForm = this.fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.maritalstatusService.GetAllMaritalStatuss('').subscribe(
      (res) => {
        this.maritalstatuss = res;
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
    this.MaritalStatus = {};
    this.maritalstatusDialog = true;
  }
  editMaritalStatus(MaritalStatus: MaritalStatus) {
    this.MaritalStatus = { ...MaritalStatus };
    this.maritalstatusDialog = true;
  }
  deleteSelectedMaritalStatus(MaritalStatus: MaritalStatus) {
    this.MaritalStatus = MaritalStatus;
    this.deleteMaritalStatus();
  }
  deleteMaritalStatus() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.MaritalStatus.name + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.maritalstatusService.DeleteMaritalStatus(this.MaritalStatus.id as string).subscribe(
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
    this.maritalstatusDialog = false;
  }

  saveMaritalStatus() {
    if (this.maritalstatusForm.valid) {
      if (this.MaritalStatus.id) {
        this.maritalstatusService.UpdateMaritalStatus(this.MaritalStatus).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.maritalstatusService.AddMaritalStatus(this.MaritalStatus).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.maritalstatusDialog = false;
      this.MaritalStatus = {};
    }
  }

  reload() {
    this.maritalstatusService.GetAllMaritalStatuss('').subscribe(
      (res) => {
        this.maritalstatuss = res;
      }
    )
  }
  get f() {
    return this.maritalstatusForm.controls;
  }
}
