import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { forkJoin, takeUntil } from 'rxjs';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { AuthServiceService } from 'src/app/demo/service/common/auth-service.service';
import { GeneralService } from 'src/app/demo/service/common/general-service.service';
import { RoleService } from 'src/app/demo/service/userManagment/role.service';
import { UserService } from 'src/app/demo/service/userManagment/user.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';
import { ActionDef, TABLE_ACTION } from 'src/app/demo/shared/models/action-def';
import { UnsubscribeComponent } from 'src/app/demo/shared/unsubscribe/unsubscribe.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [GeneralService]
})
export class UserComponent extends UnsubscribeComponent implements OnInit {
  users: any[] = [];
  cols: any[];
  roles: any[] = [];
  formStructure: IFormStructure[] = [];
  canAdd: string = 'UserManagment_User_CreateUser';
  canEdit: string = 'UserManagment_User_UpdateUser';
  canSingleDelete: string = 'UserManagment_User_DeleteUser';
  fetched: boolean = false;
  tableActions: ActionDef[] = [];
  formStructureFilter: IFormStructure[] = [];
  filter: string = 'Filters=';
  constructor(private messageService: MessageService, private router: Router,
    private readonly userService: UserService, private readonly roleService: RoleService,
    private readonly generalService: GeneralService, private readonly authServiceService: AuthServiceService
  ) {
    super();
    this.initColumns();
    this.initActions();
  }

  initActions() {
    this.tableActions = [
      {
        visible: this.authServiceService.checkPermission(this.canEdit),
        type: TABLE_ACTION.EDIT,
      },
      {
        visible: this.authServiceService.checkPermission(this.canAdd),
        type: TABLE_ACTION.Add,
      },
      {
        visible: this.authServiceService.checkPermission(this.canSingleDelete),
        type: TABLE_ACTION.DELETE,
      },
      {
        visible: this.authServiceService.checkPermission(this.canSingleDelete),
        type: TABLE_ACTION.NAVIGATE,
        redirectUrl: 'mgt/userProfiles/',
        queryParam: 'userId',
        icon: 'pi-user',
        tooltip: 'بروفايل المستخدم'
      }
    ]
  }

  initFormStructure() {
    this.formStructure = [
      {
        type: 'text',
        label: APP_CONSTANTS.fName,
        name: 'fName',
        value: '',
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: APP_CONSTANTS.FIELD_REQUIRED,
          },
        ],
      },
      {
        type: 'text',
        label: APP_CONSTANTS.lName,
        name: 'lName',
        value: '',
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: APP_CONSTANTS.FIELD_REQUIRED,
          },
        ],
      },
      {
        type: 'text',
        label: APP_CONSTANTS.userName,
        name: 'userName',
        value: '',
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: APP_CONSTANTS.FIELD_REQUIRED,
          },
        ],
      },
      {
        type: 'text',
        label: APP_CONSTANTS.passWord,
        name: 'passWord',
        value: '',
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: APP_CONSTANTS.FIELD_REQUIRED,
          },
        ],
      },
      {
        type: 'text',
        label: APP_CONSTANTS.phone,
        name: 'phone',
        value: '',
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: APP_CONSTANTS.FIELD_REQUIRED,
          },
        ],
      },
      {
        type: 'text',
        label: APP_CONSTANTS.natNum,
        name: 'natNum',
        value: '',
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: APP_CONSTANTS.FIELD_REQUIRED,
          },
        ],
      },
      {
        type: 'text',
        label: APP_CONSTANTS.emailAddress,
        name: 'emailAddress',
        value: '',
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: APP_CONSTANTS.FIELD_REQUIRED,
          },
        ],
      },
      {
        type: 'radio',
        label: APP_CONSTANTS.isActive,
        name: 'isActive',
        value: '',
        options: [...this.generalService.getRadioOptions()],
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: APP_CONSTANTS.FIELD_REQUIRED,
          },
        ],
      },
      {
        type: 'autoComplete',
        label: APP_CONSTANTS.roleName,
        name: 'roleID',
        value: '',
        options: [...this.roles],
        placeHolder: APP_CONSTANTS.COUNTRY_PLACE_HOLDER,
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: APP_CONSTANTS.FIELD_REQUIRED,
          },
        ],
      }
    ];
  }

  ngOnInit(): void {
    forkJoin([this.userService.GetUsersInfo(''), this.roleService.GetAllRoles('')])
      .pipe(takeUntil(this.destroy$)).subscribe(([users, roles]) => {
        this.users = this.mapItemList(users);
        this.roles = roles.map((item) => {
          return Object.assign(item, {
            label: item?.name,
            value: item?.id
          });
        })
        this.initFormStructure();
        this.initFormStructureFilter();
        this.fetched = true;
      })
  }

  initFormStructureFilter() {
    this.formStructureFilter = [
      {
        type: 'text',
        label: APP_CONSTANTS.fName,
        name: 'FName',
        value: ''
      },
      {
        type: 'text',
        label: APP_CONSTANTS.lName,
        name: 'LName',
        value: ''
      },
      {
        type: 'text',
        label: APP_CONSTANTS.userName,
        name: 'UserName',
        value: ''
      },
      {
        type: 'text',
        label: APP_CONSTANTS.phone,
        name: 'Phone',
        value: ''
      },
      {
        type: 'text',
        label: APP_CONSTANTS.natNum,
        name: 'NatNum',
        value: ''
      },
      {
        type: 'text',
        label: APP_CONSTANTS.emailAddress,
        name: 'EmailAddress',
        value: ''
      },
      {
        type: 'radio',
        label: APP_CONSTANTS.isActive,
        name: 'IsActive',
        value: '',
        options: [...this.generalService.getRadioOptions()]
      },
      {
        type: 'autoComplete',
        label: APP_CONSTANTS.roleName,
        name: 'RoleID',
        value: '',
        options: [...this.roles],
        placeHolder: APP_CONSTANTS.COUNTRY_PLACE_HOLDER
      }
    ];
  }

  mapItemList(items) {
    return items.map((item) => {
      return Object.assign(item, {
        ...item,
        roleName: item?.role?.name
      });
    })
  }

  initColumns() {
    this.cols = [
      { dataKey: 'fName', header: APP_CONSTANTS.fName, type: 'string' },
      { dataKey: 'lName', header: APP_CONSTANTS.lName, type: 'string' },
      { dataKey: 'userName', header: APP_CONSTANTS.userName, type: 'string' },
      { dataKey: 'phone', header: APP_CONSTANTS.phone, type: 'string' },
      { dataKey: 'natNum', header: APP_CONSTANTS.natNum, type: 'string' },
      { dataKey: 'emailAddress', header: APP_CONSTANTS.emailAddress, type: 'string' },
      { dataKey: 'isActive', header: APP_CONSTANTS.isActive, type: 'string' },
      { dataKey: 'roleName', header: APP_CONSTANTS.roleName, type: 'string' }
    ]
  }

  reload() {
    this.userService.GetUsersInfo(this.filter).subscribe(
      (users) => {
        this.users = this.mapItemList(users);
      }
    )
  }

  submitEventHandler(eventData) {
    if (eventData.id) {
      this.userService.UpdateUser(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.userService.AddUser(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.userService.DeleteUser(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  goToProfile(user) {
    this.router.navigate(['mgt/userProfiles/', user.id], {
      queryParams: { userId: user.id },
    });
  }

  submitEventHandlerFilter(eventData) {
    this.filter = 'Filters=';
    if (eventData) {
      let filterStr = '';
      Object.keys(eventData).forEach(key => {
        if (eventData[key])
          filterStr += `,${key}==${eventData[key]}`
      });
      this.filter = this.filter.concat(filterStr);
    }
    this.reload();
  }
}
