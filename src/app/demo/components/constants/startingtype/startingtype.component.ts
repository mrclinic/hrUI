import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { StartingType } from 'src/app/demo/models/constants/startingtype.model';
import { StartingTypeService } from 'src/app/demo/service/constants/startingtype.service';

@Component({
  selector: 'app-startingtype',
  templateUrl: './startingtype.component.html',
  styleUrls: ['./startingtype.component.css']
})
export class StartingTypeComponent implements OnInit {
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
  startingtypeForm: FormGroup;
  name: string = '';
  startingtypeDialog: boolean = false;

  deleteStartingTypeDialog: boolean = false;

  deleteStartingTypesDialog: boolean = false;

  startingtypes: StartingType[] = [];

  StartingType: StartingType = {};

  selectedStartingTypes: StartingType[] = [];
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService, private readonly startingtypeService: StartingTypeService) {
    this.startingtypeForm = this.fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.startingtypeService.GetAllStartingTypes('').subscribe(
      (res) => {
        this.startingtypes = res;
      }
    );
  }
  initColumns() {
    this.cols = [
      { field: 'name', header: "الاسم", type: 'string' }
    ]
  }
  openNew() {
    this.startingtypeForm.reset();
    this.StartingType = {};
    this.startingtypeDialog = true;
  }
  editStartingType(StartingType: StartingType) {
    this.StartingType = { ...StartingType };
    this.startingtypeDialog = true;
  }
  deleteSelectedStartingType(StartingType: StartingType) {
    this.StartingType = StartingType;
    this.deleteStartingType();
  }
  deleteStartingType() {
    this.confirmationService.confirm({
      message: 'هل أنت متأكد من حذف' + this.StartingType.name + '?',
      header: 'تأكيد',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.startingtypeService.DeleteStartingType(this.StartingType.id as string).subscribe(
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
    this.startingtypeDialog = false;
  }

  saveStartingType() {
    if (this.startingtypeForm.valid) {
      if (this.StartingType.id) {
        this.startingtypeService.UpdateStartingType(this.StartingType).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية التعديل بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.startingtypeService.AddStartingType(this.StartingType).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية الإضافة بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      this.startingtypeDialog = false;
      this.StartingType = {};
    }
  }

  reload() {
    this.startingtypeService.GetAllStartingTypes('').subscribe(
      (res) => {
        this.startingtypes = res;
      }
    )
  }
  get f() {
    return this.startingtypeForm.controls;
  }
}
