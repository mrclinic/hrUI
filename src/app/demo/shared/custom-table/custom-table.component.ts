import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IFormStructure } from '../dynamic-form/from-structure-model';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form/dynamic-form.component';
import { Router } from '@angular/router';
import { UnsubscribeComponent } from '../unsubscribe/unsubscribe.component';
import { EmpDocService } from '../../service/employee/empdoc.service';
import { DynamicFilterComponent } from '../dynamic-form/dynamic-filter/dynamic-filter.component';
import { ActionDef, TABLE_ACTION } from '../models/action-def';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css']
})
export class CustomTableComponent extends UnsubscribeComponent implements OnInit {

  //Inputs
  @Input() cols: any[] = [];
  @Input() tableData: any[] = [];
  @Input() hasPaginator: boolean = true;
  @Input() showCurrentPageReport: boolean = true;
  @Input() tableTitle: string = '';
  @Input() formStructure: IFormStructure[] = [];
  @Input() hasCustomCssClass: boolean = false;
  @Input() hasClickAbleRow: boolean = false;
  @Input() redirectUrlUpOnClick: string;
  @Input() queryParamName: string;
  @Input() personId: string;
  @Input() hasFilter: boolean = true;
  @Input() formStructureFilter: IFormStructure[] = [];
  @Input() tableActions: ActionDef[] = [];

  //outputs
  @Output() submitEventHandler = new EventEmitter<any>();
  @Output() deleteEventHandler = new EventEmitter<string>();
  @Output() uploadEventHandler = new EventEmitter<any>();
  @Output() submitEventHandlerFilter = new EventEmitter<any>();
  @Output() openDialogEventHandler = new EventEmitter<any>();

  //variables
  itemDialog: boolean = false;
  deleteItemDialog: boolean = false;
  item: any = {};
  selectedItemId: string;
  selectedItem: any;
  isFiltering: boolean = false;
  isFiltered: boolean = false;
  //viewchilds
  @ViewChild(DynamicFormComponent) childComponent: DynamicFormComponent;
  @ViewChild(DynamicFilterComponent) childComponentFilter: DynamicFilterComponent;

  constructor(private router: Router, private readonly empDocService: EmpDocService,) {
    super();
  }

  ngOnInit(): void {
    this.tableActions = this.tableActions.filter((p) => p.visible == true);
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

  viewInfo(item, action) {
    this.router.navigate([
      action.redirectUrl,
      item.id,
      this.personId
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
    this.isFiltered = false;
    this.childComponentFilter.dynamicForm.reset();
    this.submitEventHandlerFilter.emit(null);
  }

  search() {
    this.isFiltering = false;
    this.isFiltered = true;
    this.submitEventHandlerFilter.emit(this.childComponentFilter.dynamicForm.value);
  }

  goToAction(item, action) {
    this.router.navigate([action.redirectUrl, item.id], {
      queryParams: { [action.queryParam]: item.id },
    });
  }

  hasAddAction() {
    return this.tableActions.filter((p) => p.type == TABLE_ACTION.Add || p.type == TABLE_ACTION.UPLOAD).length >= 0;
  }

  openDialog(item) {
    this.openDialogEventHandler.emit(item);
  }

  clearFilter() {
    this.isFiltered = false;
    this.childComponentFilter.dynamicForm.reset();
    this.submitEventHandlerFilter.emit(null);
  }
}
