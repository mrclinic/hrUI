import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  ElementRef,
  OnInit
} from '@angular/core';
import { AuthServiceService } from '../../service/auth-service.service';

@Directive({
  selector: '[hasPermission]'
})
export class HasPermissionDirective implements OnInit {
  private permissions = [];
  private logicalOp = 'AND';
  private isHidden = true;
  private currentUserPermissions = [];

  constructor(
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authServiceService: AuthServiceService
  ) {

  }

  ngOnInit() {
    this.updateView();
    this.currentUserPermissions = this.authServiceService.getCurrentUserPermissions();
  }

  @Input()
  set hasPermission(val) {
    this.permissions = val;
    this.updateView();
  }

  @Input()
  set hasPermissionOp(permop) {
    this.logicalOp = permop;
    this.updateView();
  }

  private updateView() {
    if (this.checkPermission()) {
      if (this.isHidden) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.isHidden = false;
      }
    } else {
      this.isHidden = true;
      this.viewContainer.clear();
    }
  }

  private checkPermission() {
    //just for development purpose
    return true;
    let hasPermission = false;
    if (this.currentUserPermissions?.length > 0) {
      for (const checkPermission of this.permissions) {
        const permissionFound = this.currentUserPermissions.find(x => x === checkPermission);
        if (permissionFound) {
          hasPermission = true;
          if (this.logicalOp === 'OR') {
            break;
          }
          if (this.logicalOp === 'NOT') {
            hasPermission = false;
            break;
          }
        } else {
          hasPermission = false;
          if (this.logicalOp === 'AND') {
            break;
          }
          if (this.logicalOp === 'NOT') {
            hasPermission = true;
            break;
          }
        }
      }
    }
    return hasPermission;
  }
}
