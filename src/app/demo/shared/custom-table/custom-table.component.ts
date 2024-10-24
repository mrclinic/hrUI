import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IFormStructure } from '../dynamic-form/from-structure-model';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form/dynamic-form.component';
import { Router } from '@angular/router';
import { UnsubscribeComponent } from '../unsubscribe/unsubscribe.component';
import { EmpDocService } from '../../service/employee/empdoc.service';
import { DynamicFilterComponent } from '../dynamic-form/dynamic-filter/dynamic-filter.component';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css']
})
export class CustomTableComponent extends UnsubscribeComponent implements OnInit {
  @Input() cols: any[] = [];
  @Input() canAdd: string = '';
  @Input() canEdit: string = '';
  @Input() canSingleDelete: string = '';
  @Input() canMultiDelete: boolean = true;
  @Input() hasCheckBox: boolean = true;
  selectedItems: any[] = [];
  @Input() tableData: any[] = [];
  @Input() hasPaginator: boolean = true;
  @Input() showCurrentPageReport: boolean = true;
  @Input() tableTitle: string = '';
  itemDialog: boolean = false;
  @Input() formStructure: IFormStructure[] = [];
  deleteItemDialog: boolean = false;
  deleteItemsDialog: boolean = false;
  item: any = {};
  selectedItemId: string;
  @Output() submitEventHandler = new EventEmitter<any>();
  @Output() deleteEventHandler = new EventEmitter<string>();
  @ViewChild(DynamicFormComponent) childComponent: DynamicFormComponent;
  @ViewChild(DynamicFilterComponent) childComponentFilter: DynamicFilterComponent;
  @Input() hasCustomCssClass: boolean = false;
  @Input() hasClickAbleRow: boolean = false;
  @Input() redirectUrlUpOnClick: string;
  @Input() queryParamName: string;
  selectedItem: any;
  @Input() personId: string;
  @Input() hasDocs: boolean = false;
  @Input() hasUploadAction: boolean = false;
  @Input() hasDownloadAction: boolean = false;
  @Output() uploadEventHandler = new EventEmitter<any>();
  @Input() hasFilter: boolean = true;
  isFiltering: boolean = false;
  @Input() formStructureFilter: IFormStructure[] = [];
  @Output() submitEventHandlerFilter = new EventEmitter<any>();

  constructor(private router: Router, private readonly empDocService: EmpDocService,) {
    super();
  }

  ngOnInit(): void {

  }
  onRowSelect(event: any) {
    if (!this.hasClickAbleRow) return;
    this.router.navigate([this.redirectUrlUpOnClick, event.data.id], {
      queryParams: { [this.queryParamName]: event.data.id },
    });

  }
  openNew() {
    this.childComponent.dynamicForm?.reset();
    this.item = {};
    this.selectedItemId = null;
    this.itemDialog = true;

  }
  editItem(item) {
    this.item = { ...item };
    this.selectedItemId = this.item?.id;
    this.itemDialog = true;
    this.childComponent.dynamicForm.patchValue({ ...this.item });
  }
  deleteSelectedItem(item) {
    this.item = item;
    this.deleteItemDialog = true;
  }

  deleteItem(item) {
    this.item = item;
    this.deleteItemDialog = true;
  }

  hideDialog() {
    this.itemDialog = false;
  }
  confirmDelete(item) {
    this.deleteEventHandler.emit(item?.id);
    this.deleteItemDialog = false;
  }

  deleteSelectedItems() {
    this.deleteItemsDialog = true;
  }
  confirmDeleteSelected() {
    this.deleteItemsDialog = false;
    let itemIdsToDelete = this.tableData.map((item) => { return item?.id });
  }
  saveItem() {
    this.childComponent.dynamicForm.markAllAsTouched();
    this.item = { ...this.childComponent.dynamicForm.value, id: this.selectedItemId };
    if (this.childComponent.dynamicForm.valid) {
      this.submitEventHandler.emit(this.item);
      this.itemDialog = false;
      this.item = {};
    }
  }

  uploadDoc() {
    this.uploadEventHandler.emit(true);
  }

  goToDocs(item) {
    this.router.navigate([
      'employees/docs',
      item.id,
      this.personId,
    ]);
  }

  downloadDoc(item) {
    this.empDocService.DownloadEmpDoc(item.id, item.fileType, item.name);
  }

  showFilter() {
    this.isFiltering = true;
  }
  hideFilter() {
    this.isFiltering = false;
    this.childComponentFilter.dynamicForm.reset();
    this.submitEventHandlerFilter.emit(null);
  }
  search() {
    this.isFiltering = false;
    this.submitEventHandlerFilter.emit(this.childComponentFilter.dynamicForm.value)
  }
}
