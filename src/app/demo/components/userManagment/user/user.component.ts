import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private confirmationService: ConfirmationService, private router: Router) {
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
        this.initColumns();
      }
    );

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
      message: 'هل أنت متأكد من حذف' + this.user.FName + '?',
      header: 'تأكيد',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(new UserActions.DeleteUser(this.user.id as string)).subscribe(
          () => {
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
    this.userDialog = false;
    this.submitted = false;
  }

  saveUser() {
    this.submitted = true;
    if (this.user.FName?.trim()) {
      if (this.user.id) {
        this.store.dispatch(new UserActions.UpdateUser(this.user)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية التعديل بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      else {
        delete this.user.id;
        this.store.dispatch(new UserActions.AddUser(this.user)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية الإضافة بنجاح', life: 3000 });
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
    let filter = "filters=displayName@=" + event.query;
    this.store.dispatch(new RoleActions.GetAllRoles(filter)).subscribe(
      () => {
        this.roles = this.store.selectSnapshot<Role[]>((state) => state.users.roles);
      }
    );
  }
  onSelectRole(event: any) {
    this.user.roleID = event.Id;
  }
  goToProfile(user) {
    this.router.navigate(['mgt/userProfiles/', user.id], {
      queryParams: { userId: user.id },
    });
  }
}
