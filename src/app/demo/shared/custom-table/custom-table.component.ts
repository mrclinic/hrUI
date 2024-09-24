import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IFormStructure } from '../dynamic-form/from-structure-model';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css']
})
export class CustomTableComponent implements OnInit {
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
  @Input() globalFilterFields: string[] = [];
  itemDialog: boolean = false;
  @Input() formStructure: IFormStructure[] = [];
  deleteItemDialog: boolean = false;
  deleteItemsDialog: boolean = false;
  item: any = {};
  selectedItemId: string;
  @Output() submitEventHandler = new EventEmitter<any>();
  @Output() deleteEventHandler = new EventEmitter<string>();
  @ViewChild(DynamicFormComponent) childComponent: DynamicFormComponent;
  constructor() { }

  ngOnInit(): void {

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
}
