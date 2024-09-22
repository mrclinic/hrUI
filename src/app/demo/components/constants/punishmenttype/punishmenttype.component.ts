import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { forkJoin, Observable } from 'rxjs';
import { PunishmentType } from 'src/app/demo/models/constants/punishmenttype.model';
import { FinancialImpactService } from 'src/app/demo/service/constants/financialimpact.service';
import { PunishmentTypeService } from 'src/app/demo/service/constants/punishmenttype.service';

@Component({
  selector: 'app-punishmenttype',
  templateUrl: './punishmenttype.component.html',
  styleUrls: ['./punishmenttype.component.css']
})
export class PunishmentTypeComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  cols: any[];

  punishmenttypeForm: FormGroup;

  punishmenttypeDialog: boolean = false;

  deletePunishmentTypeDialog: boolean = false;

  deletePunishmentTypesDialog: boolean = false;

  punishmenttypes: PunishmentType[] = [];

  PunishmentType: PunishmentType = {};

  selectedPunishmentTypes: PunishmentType[] = [];
  items: any[] | undefined;
  filteredItems: any[] | undefined;

  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService,
    private readonly punishmenttypeService: PunishmentTypeService,
    private readonly financialImpactService: FinancialImpactService) {
    this.punishmenttypeForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      financialimpactid: new FormControl('', [Validators.required])

    });
    this.cols = [];
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    forkJoin([this.punishmenttypeService.GetAllPunishmentTypes(''), this.financialImpactService.GetAllFinancialImpacts('')])
      .subscribe(([punishmenttypes, items]) => {
        this.punishmenttypes = punishmenttypes;
        this.items = items;
      });
  }
  initColumns() {
    this.cols = [
      { field: 'name', header: "الاسم", type: 'string' },
      { field: 'financialimpactid', header: "نوع الانعكاس المالي" }
    ]
  }
  openNew() {
    this.punishmenttypeForm.reset();
    this.PunishmentType = {};
    this.punishmenttypeDialog = true;
  }
  editPunishmentType(PunishmentType: PunishmentType) {
    this.PunishmentType = { ...PunishmentType };
    this.punishmenttypeDialog = true;
  }
  deleteSelectedPunishmentType(PunishmentType: PunishmentType) {
    this.PunishmentType = PunishmentType;
    this.deletePunishmentType();
  }
  deletePunishmentType() {
    this.confirmationService.confirm({
      message: 'هل أنت متأكد من حذف' + this.PunishmentType.name + '?',
      header: 'تأكيد',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.punishmenttypeService.DeletePunishmentType(this.PunishmentType.id as string).subscribe(
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
    this.punishmenttypeDialog = false;
  }

  savePunishmentType() {
    if (this.punishmenttypeForm.valid) {
      if (this.PunishmentType.id) {
        this.punishmenttypeService.UpdatePunishmentType(this.PunishmentType).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية التعديل بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.punishmenttypeService.AddPunishmentType(this.PunishmentType).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية الإضافة بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      this.punishmenttypeDialog = false;
      this.PunishmentType = {};
    }
  }

  reload() {
    this.punishmenttypeService.GetAllPunishmentTypes('').subscribe(
      (res) => {
        this.punishmenttypes = res;
      }
    )
  }
  get f() {
    return this.punishmenttypeForm.controls;
  }
  filterItems(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.items as any[])?.length; i++) {
      let country = (this.items as any[])[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.filteredItems = filtered;
  }
}
