import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Gender } from 'src/app/demo/models/constants/gender.model';
import { GenderService } from 'src/app/demo/service/constants/gender.service';

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrls: ['./gender.component.css']
})
export class GenderComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  cols: any[];

  genderForm: FormGroup;

  genderDialog: boolean = false;

  deleteGenderDialog: boolean = false;

  deleteGendersDialog: boolean = false;

  genders: Gender[] = [];

  Gender: Gender = {};

  selectedGenders: Gender[] = [];
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService, private readonly genderService: GenderService) {
    this.genderForm = this.fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.genderService.GetAllGenders('').subscribe(
      (res) => {
        this.genders = res;
      }
    );
  }
  initColumns() {
    this.cols = [
      { field: 'name', header: "الاسم", type: 'string' }
    ]
  }
  openNew() {
    this.genderForm.reset();
    this.Gender = {};
    this.genderDialog = true;
  }
  editGender(Gender: Gender) {
    this.Gender = { ...Gender };
    this.genderDialog = true;
  }
  deleteSelectedGender(Gender: Gender) {
    this.Gender = Gender;
    this.deleteGender();
  }
  deleteGender() {
    this.confirmationService.confirm({
      message: 'هل أنت متأكد من حذف' + this.Gender.name + '?',
      header: 'تأكيد',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.genderService.DeleteGender(this.Gender.id as string).subscribe(
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
    this.genderDialog = false;
  }

  saveGender() {
    if (this.genderForm.valid) {
      if (this.Gender.id) {
        this.genderService.UpdateGender(this.Gender).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية التعديل بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.genderService.AddGender(this.Gender).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية الإضافة بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      this.genderDialog = false;
      this.Gender = {};
    }
  }

  reload() {
    this.genderService.GetAllGenders('').subscribe(
      (res) => {
        this.genders = res;
      }
    )
  }
  get f() {
    return this.genderForm.controls;
  }
}
