import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { MilitaryRank } from 'src/app/demo/models/constants/militaryrank.model';
import { MilitaryRankService } from 'src/app/demo/service/constants/militaryrank.service';

@Component({
  selector: 'app-militaryrank',
  templateUrl: './militaryrank.component.html',
  styleUrls: ['./militaryrank.component.css']
})
export class MilitaryRankComponent implements OnInit {
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
  militaryrankForm: FormGroup;
  name: string = '';
  militaryrankDialog: boolean = false;

  deleteMilitaryRankDialog: boolean = false;

  deleteMilitaryRanksDialog: boolean = false;

  militaryranks: MilitaryRank[] = [];

  MilitaryRank: MilitaryRank = {};

  selectedMilitaryRanks: MilitaryRank[] = [];
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService, private readonly militaryrankService: MilitaryRankService) {
    this.militaryrankForm = this.fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.militaryrankService.GetAllMilitaryRanks('').subscribe(
      (res) => {
        this.militaryranks = res;
      }
    );
  }
  initColumns() {
    this.cols = [
      { field: 'name', header: "الاسم", type: 'string' }
    ]
  }
  openNew() {
    this.militaryrankForm.reset();
    this.MilitaryRank = {};
    this.militaryrankDialog = true;
  }
  editMilitaryRank(MilitaryRank: MilitaryRank) {
    this.MilitaryRank = { ...MilitaryRank };
    this.militaryrankDialog = true;
  }
  deleteSelectedMilitaryRank(MilitaryRank: MilitaryRank) {
    this.MilitaryRank = MilitaryRank;
    this.deleteMilitaryRank();
  }
  deleteMilitaryRank() {
    this.confirmationService.confirm({
      message: 'هل أنت متأكد من حذف' + this.MilitaryRank.name + '?',
      header: 'تأكيد',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.militaryrankService.DeleteMilitaryRank(this.MilitaryRank.id as string).subscribe(
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
    this.militaryrankDialog = false;
  }

  saveMilitaryRank() {
    if (this.militaryrankForm.valid) {
      if (this.MilitaryRank.id) {
        this.militaryrankService.UpdateMilitaryRank(this.MilitaryRank).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية التعديل بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.militaryrankService.AddMilitaryRank(this.MilitaryRank).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية الإضافة بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      this.militaryrankDialog = false;
      this.MilitaryRank = {};
    }
  }

  reload() {
    this.militaryrankService.GetAllMilitaryRanks('').subscribe(
      (res) => {
        this.militaryranks = res;
      }
    )
  }
  get f() {
    return this.militaryrankForm.controls;
  }
}
