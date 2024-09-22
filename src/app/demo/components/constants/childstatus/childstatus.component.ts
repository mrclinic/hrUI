import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  cols: any[] = [];
  childStatusForm: FormGroup;
  childStatusDialog: boolean = false;
  deleteChildStatusDialog: boolean = false;
  deleteChildStatussDialog: boolean = false;
  childStatuss: ChildStatus[] = [];
  childStatus: ChildStatus = {};
  selectedChildstatuss: ChildStatus[] = [];
  selectedChildStatusId: string;

  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private readonly childStatusService: ChildStatusService) {
  }

  ngOnInit(): void {
    this.childStatusForm = this.fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.childStatusService.GetAllChildStatuss('').subscribe(
      (res) => {
        this.childStatuss = res;
      }
    );
    this.initColumns();
  }
  initColumns() {
    this.cols = [
      { field: 'name', header: "الاسم", type: 'string' }
    ]
  }
  openNew() {
    this.childStatusForm.reset();
    this.childStatus = {};
    this.selectedChildStatusId = null;
    this.childStatusDialog = true;
  }
  editChildStatus(childStatus: ChildStatus) {
    this.childStatus = { ...childStatus };
    this.selectedChildStatusId = this.childStatus?.id;
    this.childStatusDialog = true;
    this.childStatusForm.patchValue({ name: this.childStatus.name });

  }
  deleteSelectedChildstatus(childStatus: ChildStatus) {
    this.childStatus = childStatus;
    this.deleteChildStatusDialog = true;
  }
  deleteChildStatus(childStatus: ChildStatus) {
    this.deleteChildStatusDialog = true;
    this.childStatus = childStatus;
    this.childStatusService.DeleteChildStatus(this.childStatus.id as string).subscribe(
      (data) => {
        this.deleteChildStatusDialog = false;
        this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية الحذف بنجاح', life: 3000 });
        this.reload();
      }
    );
  }

  hideDialog() {
    this.childStatusDialog = false;
  }
  confirmDelete(childStatus) {
    this.deleteChildStatus(childStatus);
  }

  deleteSelectedChildStatuss() {
    this.deleteChildStatussDialog = true;
  }
  confirmDeleteSelected() {
    this.deleteChildStatussDialog = false;
    let itemIdsToDelete = this.selectedChildstatuss.map((item) => { return item?.id });
  }

  saveChildStatus() {
    this.childStatus = { ...this.childStatusForm.value, id: this.selectedChildStatusId }
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
        delete this.childStatus.id;
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
