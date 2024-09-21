import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Law } from 'src/app/demo/models/constants/law.model';
import { LawService } from 'src/app/demo/service/constants/law.service';

@Component({
  selector: 'app-law',
  templateUrl: './law.component.html',
  styleUrls: ['./law.component.css']
})
export class LawComponent implements OnInit {
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
  lawForm: FormGroup;
  name: string = '';
  lawDialog: boolean = false;

  deleteLawDialog: boolean = false;

  deleteLawsDialog: boolean = false;

  laws: Law[] = [];

  Law: Law = {};

  selectedLaws: Law[] = [];
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService, private readonly lawService: LawService) {
    this.lawForm = this.fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.lawService.GetAllLaws('').subscribe(
      (res) => {
        this.laws = res;
      }
    );
  }
  initColumns() {
    this.cols = [
      { field: 'name', header: "الاسم", type: 'string' }
    ]
  }
  openNew() {
    this.lawForm.reset();
    this.Law = {};
    this.lawDialog = true;
  }
  editLaw(Law: Law) {
    this.Law = { ...Law };
    this.lawDialog = true;
  }
  deleteSelectedLaw(Law: Law) {
    this.Law = Law;
    this.deleteLaw();
  }
  deleteLaw() {
    this.confirmationService.confirm({
      message: 'هل أنت متأكد من حذف' + this.Law.name + '?',
      header: 'تأكيد',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.lawService.DeleteLaw(this.Law.id as string).subscribe(
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
    this.lawDialog = false;
  }

  saveLaw() {
    if (this.lawForm.valid) {
      if (this.Law.id) {
        this.lawService.UpdateLaw(this.Law).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية التعديل بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.lawService.AddLaw(this.Law).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية الإضافة بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      this.lawDialog = false;
      this.Law = {};
    }
  }

  reload() {
    this.lawService.GetAllLaws('').subscribe(
      (res) => {
        this.laws = res;
      }
    )
  }
  get f() {
    return this.lawForm.controls;
  }
}
