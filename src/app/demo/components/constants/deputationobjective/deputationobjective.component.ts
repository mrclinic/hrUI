import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { DeputationObjective } from 'src/app/demo/models/constants/deputationobjective.model';
import { DeputationObjectiveService } from 'src/app/demo/service/constants/deputationobjective.service';

@Component({
  selector: 'app-deputationobjective',
  templateUrl: './deputationobjective.component.html',
  styleUrls: ['./deputationobjective.component.css']
})
export class DeputationobjectiveComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  cols: any[];

  deputationobjectiveForm: FormGroup;

  deputationobjectiveDialog: boolean = false;

  deleteDeputationobjectiveDialog: boolean = false;

  deleteDeputationobjectivesDialog: boolean = false;

  deputationobjectives: DeputationObjective[] = [];

  deputationobjective: DeputationObjective = {};

  selectedDeputationobjectives: DeputationObjective[] = [];
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService, private readonly deputationobjectiveService: DeputationObjectiveService) {
    this.deputationobjectiveForm = this.fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.deputationobjectiveService.GetAllDeputationObjectives('').subscribe(
      (res) => {
        this.deputationobjectives = res;
      }
    );

  }
  initColumns() {
    this.cols = [
      { field: 'name', header: "الاسم", type: 'string' }
    ]
  }
  openNew() {
    this.deputationobjectiveForm.reset();
    this.deputationobjective = {};
    this.deputationobjectiveDialog = true;
  }
  editDeputationobjective(deputationobjective: DeputationObjective) {
    this.deputationobjective = { ...deputationobjective };
    this.deputationobjectiveDialog = true;
  }
  deleteSelectedDeputationobjective(deputationobjective: DeputationObjective) {
    this.deputationobjective = deputationobjective;
    this.deleteDeputationobjective();
  }
  deleteDeputationobjective() {
    this.confirmationService.confirm({
      message: 'هل أنت متأكد من حذف' + this.deputationobjective.name + '?',
      header: 'تأكيد',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deputationobjectiveService.DeleteDeputationObjective(this.deputationobjective.id as string).subscribe(
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
    this.deputationobjectiveDialog = false;
  }

  saveDeputationobjective() {
    if (this.deputationobjectiveForm.valid) {
      if (this.deputationobjective.id) {
        this.deputationobjectiveService.UpdateDeputationObjective(this.deputationobjective).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية التعديل بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.deputationobjectiveService.AddDeputationObjective(this.deputationobjective).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية الإضافة بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      this.deputationobjectiveDialog = false;
      this.deputationobjective = {};
    }
  }

  reload() {
    this.deputationobjectiveService.GetAllDeputationObjectives('').subscribe(
      (res) => {
        this.deputationobjectives = res;
      }
    )
  }
  get f() {
    return this.deputationobjectiveForm.controls;
  }
}
