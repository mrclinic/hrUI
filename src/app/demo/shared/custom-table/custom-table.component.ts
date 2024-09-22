import { Component, EventEmitter, input, Input, OnInit, Output, output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css']
})
export class CustomTableComponent implements OnInit {
  @Input() cols: any[] = [];
  @Input() canAdd: boolean = true;
  @Input() canEdit: boolean = true;
  @Input() canSingleDelete: boolean = true;
  @Input() canMultiDelete: boolean = true;
  @Input() hasCheckBox: boolean = true;
  selectedItems: any[] = [];
  @Input() tableData: any[] = [];
  @Input() hasPaginator: boolean = true;
  @Input() showCurrentPageReport: boolean = true;
  @Input() tableTitle: string = '';
  @Input() globalFilterFields: string[] = [];
  itemDialog: boolean = false;
  @Input() itemForm: FormGroup;
  deleteItemDialog: boolean = false;
  deleteItemsDialog: boolean = false;
  item: any = {};
  selectedItemId: string;
  @Output() submitEventHandler = new EventEmitter<any>();
  @Output() deleteEventHandler = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {

  }

  openNew() {
    this.itemForm?.reset();
    this.item = {};
    this.selectedItemId = null;
    this.itemDialog = true;

  }
  editItem(item) {
    this.item = { ...item };
    this.selectedItemId = this.item?.id;
    this.itemDialog = true;
    this.itemForm.patchValue({ ...this.item });
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
    this.item = { ...this.itemForm.value, id: this.selectedItemId };
    if (this.itemForm.valid) {
      this.submitEventHandler.emit(this.item);
      this.itemDialog = false;
      this.item = {};
    }
  }

  get f() {
    return this.itemForm.controls;
  }
}
