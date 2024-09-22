import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { TerminationReason } from 'src/app/demo/models/constants/terminationreason.model';
import { TerminationReasonService } from 'src/app/demo/service/constants/terminationreason.service';

@Component({
  selector: 'app-terminationreason',
  templateUrl: './terminationreason.component.html',
  styleUrls: ['./terminationreason.component.css']
})
export class TerminationReasonComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  cols: any[];

  terminationreasonForm: FormGroup;

  terminationreasonDialog: boolean = false;

  deleteTerminationReasonDialog: boolean = false;

  deleteTerminationReasonsDialog: boolean = false;

  terminationreasons: TerminationReason[] = [];

  TerminationReason: TerminationReason = {};

  selectedTerminationReasons: TerminationReason[] = [];
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService, private readonly terminationreasonService: TerminationReasonService) {
    this.terminationreasonForm = this.fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.terminationreasonService.GetAllTerminationReasons('').subscribe(
      (res) => {
        this.terminationreasons = res;
      }
    );

  }
  initColumns() {
    this.cols = [
      { field: 'name', header: "الاسم", type: 'string' }
    ]
  }
  openNew() {
    this.terminationreasonForm.reset();
    this.TerminationReason = {};
    this.terminationreasonDialog = true;
  }
  editTerminationReason(TerminationReason: TerminationReason) {
    this.TerminationReason = { ...TerminationReason };
    this.terminationreasonDialog = true;
  }
  deleteSelectedTerminationReason(TerminationReason: TerminationReason) {
    this.TerminationReason = TerminationReason;
    this.deleteTerminationReason();
  }
  deleteTerminationReason() {
    this.confirmationService.confirm({
      message: 'هل أنت متأكد من حذف' + this.TerminationReason.name + '?',
      header: 'تأكيد',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.terminationreasonService.DeleteTerminationReason(this.TerminationReason.id as string).subscribe(
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
    this.terminationreasonDialog = false;
  }

  saveTerminationReason() {
    if (this.terminationreasonForm.valid) {
      if (this.TerminationReason.id) {
        this.terminationreasonService.UpdateTerminationReason(this.TerminationReason).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية التعديل بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.terminationreasonService.AddTerminationReason(this.TerminationReason).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية الإضافة بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      this.terminationreasonDialog = false;
      this.TerminationReason = {};
    }
  }

  reload() {
    this.terminationreasonService.GetAllTerminationReasons('').subscribe(
      (res) => {
        this.terminationreasons = res;
      }
    )
  }
  get f() {
    return this.terminationreasonForm.controls;
  }
}
