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
      message: this.ConfirmMsg + this.Law.name + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.lawService.DeleteLaw(this.Law.id as string).subscribe(
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
    this.lawDialog = false;
  }

  saveLaw() {
    if (this.lawForm.valid) {
      if (this.Law.id) {
        this.lawService.UpdateLaw(this.Law).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.lawService.AddLaw(this.Law).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
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
