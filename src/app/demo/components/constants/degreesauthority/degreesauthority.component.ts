import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { DegreesAuthority } from 'src/app/demo/models/constants/degreesauthority.model';
import { DegreesAuthorityService } from 'src/app/demo/service/constants/degreesauthority.service';


@Component({
  selector: 'app-degreesAuthority',
  templateUrl: './degreesAuthority.component.html',
  styleUrls: ['./degreesAuthority.component.css']
})
export class DegreesAuthorityComponent implements OnInit {
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
  degreesAuthorityForm: FormGroup;
  name: string = '';
  degreesAuthorityDialog: boolean = false;

  deleteDegreesAuthorityDialog: boolean = false;

  deleteDegreesAuthoritysDialog: boolean = false;

  degreesAuthoritys: DegreesAuthority[] = [];

  degreesAuthority: DegreesAuthority = {};

  selectedDegreesAuthoritys: DegreesAuthority[] = [];
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService, private readonly degreesAuthorityService: DegreesAuthorityService) {
    this.degreesAuthorityForm = this.fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.degreesAuthorityService.GetAllDegreesAuthoritys('').subscribe(
      (res) => {
        this.degreesAuthoritys = res;
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
    this.degreesAuthority = {};
    this.degreesAuthorityDialog = true;
  }
  editDegreesAuthority(degreesAuthority: DegreesAuthority) {
    this.degreesAuthority = { ...degreesAuthority };
    this.degreesAuthorityDialog = true;
  }
  deleteSelectedDegreesAuthority(degreesAuthority: DegreesAuthority) {
    this.degreesAuthority = degreesAuthority;
    this.deleteDegreesAuthority();
  }
  deleteDegreesAuthority() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.degreesAuthority.name + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.degreesAuthorityService.DeleteDegreesAuthority(this.degreesAuthority.id as string).subscribe(
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
    this.degreesAuthorityDialog = false;
  }

  saveDegreesAuthority() {
    if (this.degreesAuthorityForm.valid) {
      if (this.degreesAuthority.id) {
        this.degreesAuthorityService.UpdateDegreesAuthority(this.degreesAuthority).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.degreesAuthorityService.AddDegreesAuthority(this.degreesAuthority).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.degreesAuthorityDialog = false;
      this.degreesAuthority = {};
    }
  }

  reload() {
    this.degreesAuthorityService.GetAllDegreesAuthoritys('').subscribe(
      (res) => {
        this.degreesAuthoritys = res;
      }
    )
  }
  get f() {
    return this.degreesAuthorityForm.controls;
  }
}
