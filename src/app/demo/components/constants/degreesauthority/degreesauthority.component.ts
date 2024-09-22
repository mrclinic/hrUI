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

  degreesAuthorityForm: FormGroup;

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

  }
  initColumns() {
    this.cols = [
      { field: 'name', header: "الاسم", type: 'string' }
    ]
  }
  openNew() {
    this.degreesAuthorityForm.reset();
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
      message: 'هل أنت متأكد من حذف' + this.degreesAuthority.name + '?',
      header: 'تأكيد',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.degreesAuthorityService.DeleteDegreesAuthority(this.degreesAuthority.id as string).subscribe(
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
    this.degreesAuthorityDialog = false;
  }

  saveDegreesAuthority() {
    if (this.degreesAuthorityForm.valid) {
      if (this.degreesAuthority.id) {
        this.degreesAuthorityService.UpdateDegreesAuthority(this.degreesAuthority).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية التعديل بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.degreesAuthorityService.AddDegreesAuthority(this.degreesAuthority).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية الإضافة بنجاح', life: 3000 });
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
