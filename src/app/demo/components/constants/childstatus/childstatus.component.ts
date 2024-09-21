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

  }
  initColumns() {
    this.cols = [
      { field: 'name', header: "الاسم", type: 'string' }
    ]
  }
  openNew() {
    this.childStatusForm.reset();
    this.childStatus = {};
    this.childStatusDialog = true;
  }
  editChildStatus(childStatus: ChildStatus) {
    this.childStatus = { ...childStatus };
    this.childStatusDialog = true;
    this.childStatusForm.patchValue({ name: this.childStatus.name });

  }
  deleteSelectedChildstatus(childStatus: ChildStatus) {
    this.childStatus = childStatus;
    this.deleteChildStatus();
  }
  deleteChildStatus() {
    this.confirmationService.confirm({
      message: 'هل أنت متأكد من حذف' + this.childStatus.name + '?',
      header: 'تأكيد',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.childStatusService.DeleteChildStatus(this.childStatus.id as string).subscribe(
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
    this.childStatusDialog = false;
  }

  saveChildStatus() {
    if (this.childStatusForm.valid) {
      if (this.childStatus.id) {
        this.childStatusService.UpdateChildStatus(this.childStatus).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية التعديل بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.childStatusService.AddChildStatus(this.childStatus).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية الإضافة بنجاح', life: 3000 });
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
