import { NgModule } from "@angular/core";
import { CustomTableComponent } from "./custom-table/custom-table.component";
import { PrimengModule } from "src/primeng/primeng.module";
import { PermissionListComponent } from "../dialogs/permissions.dialog/permissions.dialog";
import { CommonModule } from "@angular/common";
import { DynamicFormComponent } from "./dynamic-form/dynamic-form/dynamic-form.component";
import { CustomTreeComponent } from "./custom-tree/custom-tree.component";
import { HasPermissionDirective } from "./directives/has-permission.directive";
import { FileUploadComponent } from "../dialogs/docs.dialog/docs.dialog";
import { UploadFileDialogComponent } from "../dialogs/docs.dialog/upload-dialog/upload-doc.dialog";
import { DynamicFilterComponent } from "./dynamic-form/dynamic-filter/dynamic-filter.component";

@NgModule({
  declarations: [
    CustomTableComponent, PermissionListComponent, DynamicFormComponent,
    CustomTreeComponent, HasPermissionDirective, FileUploadComponent,
    UploadFileDialogComponent, DynamicFilterComponent
  ],
  exports: [
    CustomTableComponent, PermissionListComponent, DynamicFormComponent,
    CustomTreeComponent, HasPermissionDirective, FileUploadComponent,
    UploadFileDialogComponent, DynamicFilterComponent
  ],
  imports: [
    PrimengModule, CommonModule
  ]
})
export class SharedModule { }
