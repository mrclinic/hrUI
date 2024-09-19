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
  CancelReason: string = '';
  ConfirmTitle: string = '';
  ConfirmMsg: string = '';
  Success: string = '';
  deleteSuccess: string = '';
  Yes: string = '';
  No: string = '';
  editSuccess: string = '';
  addSuccess: string = '';
  punishmenttypeForm: FormGroup;
  name: string = '';
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
      { field: 'name', header: "الاسم", type: 'string' },
      { field: 'financialimpactid', header: "نوع الانعكاس المالي" }
    ]
  }
  openNew() {
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
      message: this.ConfirmMsg + this.PunishmentType.name + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.punishmenttypeService.DeletePunishmentType(this.PunishmentType.id as string).subscribe(
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
    this.punishmenttypeDialog = false;
  }

  savePunishmentType() {
    if (this.punishmenttypeForm.valid) {
      if (this.PunishmentType.id) {
        this.punishmenttypeService.UpdatePunishmentType(this.PunishmentType).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.punishmenttypeService.AddPunishmentType(this.PunishmentType).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
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
