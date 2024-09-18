import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { ChildStatus } from 'src/app/demo/models/constants/childstatus.model';
import { ChildStatusService } from 'src/app/demo/service/constants/childstatus.service';

@Component({
  selector: 'app-childstatus',
  templateUrl: './childstatus.component.html',
  styleUrls: ['./childstatus.component.css']
})
export class ChildstatusComponent implements OnInit {
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
  childStatusForm: FormGroup;
  name: string = '';
  childStatusDialog: boolean = false;

  deleteChildStatusDialog: boolean = false;

  deleteChildStatussDialog: boolean = false;

  childStatuss: ChildStatus[] = [];

  childStatus: ChildStatus = {};

  selectedChildstatuss: ChildStatus[] = [];
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService, private readonly childStatusService: ChildStatusService) {
    this.childStatusForm = this.fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.childStatusService.GetAllChildStatuss('').subscribe(
      (res) => {
        this.childStatuss = res;
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
    this.childStatus = {};
    this.childStatusDialog = true;
  }
  editChildstatus(childStatus: ChildStatus) {
    this.childStatus = { ...childStatus };
    this.childStatusDialog = true;
  }
  deleteSelectedChildstatus(childStatus: ChildStatus) {
    this.childStatus = childStatus;
    this.deleteChildstatus();
  }
  deleteChildstatus() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.childStatus.name + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.childStatusService.DeleteChildStatus(this.childStatus.id as string).subscribe(
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
    this.childStatusDialog = false;
  }

  saveChildStatus() {
    if (this.childStatusForm.valid) {
      if (this.childStatus.id) {
        this.childStatusService.UpdateChildStatus(this.childStatus).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.childStatusService.AddChildStatus(this.childStatus).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.childStatusDialog = false;
      this.childStatus = {};
    }
  }

  reload() {
    this.childStatusService.GetAllChildStatuss('').subscribe(
      (res) => {
        this.childStatuss = res;
      }
    )
  }
  get f() {
    return this.childStatusForm.controls;
  }
}
