import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs/internal/Observable';
import { Role } from 'src/app/demo/models/userManagment/Role';
import { User } from 'src/app/demo/models/userManagment/User';
import { RoleActions } from 'src/app/demo/stateManagement/userManagment/actions/role.action';
import { UserActions } from 'src/app/demo/stateManagement/userManagment/actions/user.action';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  users: User[] = [];
  cols: any[];
  userDialog: boolean;
  user!: User;
  submitted: boolean;
  FNameHeader: string = '';
  LNameHeader: string = '';
  PhoneHeader: string = '';
  NatNumHeader: string = '';
  EmailAddressHeader: string = '';
  UserTokenHeader: string = '';
  IsActiveHeader: string = '';
  RoleIDHeader: string = '';
  usernameLabel: string = '';
  passwordLabel: string = '';
  ConfirmTitle: string = '';
  ConfirmMsg: string = '';
  Success: string = '';
  deleteSuccess: string = '';
  Yes: string = '';
  No: string = '';
  editSuccess: string = '';
  addSuccess: string = '';
  roles: Role[] = [];
  constructor(private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService) {
    this.cols = [];
    this.userDialog = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.store.dispatch(new UserActions.GetUsersInfo('')).subscribe(
      () => {
        this.users = this.store.selectSnapshot<User[]>((state) => state.users.users);
      }
    );
    this.translate.get('AppTitle').subscribe(
      (res) => {
        console.log(res)
        this.FNameHeader = this.translate.instant('FNameHeader');;
        this.LNameHeader = this.translate.instant('LNameHeader');
        this.PhoneHeader = this.translate.instant('PhoneHeader');
        this.NatNumHeader = this.translate.instant('NatNumHeader');
        this.EmailAddressHeader = this.translate.instant('EmailAddressHeader');
        this.UserTokenHeader = this.translate.instant('UserTokenHeader');
        this.IsActiveHeader = this.translate.instant('IsActiveHeader');
        this.RoleIDHeader = this.translate.instant('RoleIDHeader');
        this.usernameLabel = this.translate.instant('usernameLabel');
        this.passwordLabel = this.translate.instant('passwordLabel');
        this.ConfirmTitle = this.translate.instant('ConfirmTitle');
        this.ConfirmMsg = this.translate.instant('ConfirmMsg');
        this.Success = this.translate.instant('Success');
        this.deleteSuccess = this.translate.instant('deleteSuccess');
        this.Yes = this.translate.instant('Yes');
        this.No = this.translate.instant('No');
        this.editSuccess = this.translate.instant('editSuccess');
        this.addSuccess = this.translate.instant('addSuccess');
        console.log(this.FNameHeader)
        this.initColumns();
      }
    )
  }
  initColumns() {
    this.cols = [
      { field: 'fName', header: "الاسم الأول" },
      { field: 'lName', header: "الكنية" },
      { field: 'userName', header: "اسم المستخدم" },
      { field: 'phone', header: "رقم الهاتف" },
      { field: 'natNum', header: "الرقم الوطني" },
      { field: 'emailAddress', header: "البريد الالكتروني" },
      { field: 'isActive', header: "فعّال" },
      { field: 'roleID', header: "الدور" }
    ]
  }
  openNew() {
    this.user = {};
    this.submitted = false;
    this.userDialog = true;
  }
  editUser(user: User) {
    this.user = { ...user };
    this.userDialog = true;
  }
  deleteSelectedUser(user: User) {
    this.user = user;
    this.deleteUser();
  }
  deleteUser() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.user.FName + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(new UserActions.DeleteUser(this.user.id as string)).subscribe(
          () => {
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
    this.userDialog = false;
    this.submitted = false;
  }

  saveUser() {
    this.submitted = true;
    if (this.user.FName?.trim()) {
      if (this.user.id) {
        this.store.dispatch(new UserActions.UpdateUser(this.user)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        delete this.user.id;
        this.store.dispatch(new UserActions.AddUser(this.user)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.userDialog = false;
      this.user = {};
    }
  }

  reload() {
    this.store.dispatch(new UserActions.GetUsersInfo('')).subscribe(
      () => {
        this.users = this.store.selectSnapshot<User[]>((state) => state.users.users);
      }
    )
  }

  searchRole(event: any) {
    let filter = "Filters=DisplayName@=" + event.query;
    this.store.dispatch(new RoleActions.GetAllRoles(filter)).subscribe(
      () => {
        this.roles = this.store.selectSnapshot<Role[]>((state) => state.users.roles);
      }
    );
  }
  onSelectRole(event: any) {
    console.log(this.user)
    this.user.roleID = event.Id;
  }
}
