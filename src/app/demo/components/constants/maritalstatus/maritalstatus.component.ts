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

  maritalstatusForm: FormGroup;

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
  }
  initColumns() {
    this.cols = [
      { field: 'name', header: "الاسم", type: 'string' }
    ]
  }
  openNew() {
    this.maritalstatusForm.reset();
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
      message: 'هل أنت متأكد من حذف' + this.MaritalStatus.name + '?',
      header: 'تأكيد',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.maritalstatusService.DeleteMaritalStatus(this.MaritalStatus.id as string).subscribe(
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
    this.maritalstatusDialog = false;
  }

  saveMaritalStatus() {
    if (this.maritalstatusForm.valid) {
      if (this.MaritalStatus.id) {
        this.maritalstatusService.UpdateMaritalStatus(this.MaritalStatus).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية التعديل بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.maritalstatusService.AddMaritalStatus(this.MaritalStatus).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية الإضافة بنجاح', life: 3000 });
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
