import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { forkJoin, takeUntil } from 'rxjs';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { User } from 'src/app/demo/models/userManagment/User';
import { AuthServiceService } from 'src/app/demo/service/common/auth-service.service';
import { GenderService } from 'src/app/demo/service/constants/gender.service';
import { UserProfileService } from 'src/app/demo/service/userManagment/user.profile.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';
import { ActionDef, TABLE_ACTION } from 'src/app/demo/shared/models/action-def';
import { UnsubscribeComponent } from 'src/app/demo/shared/unsubscribe/unsubscribe.component';

@Component({
  selector: 'app-myProfile',
  templateUrl: './my.profile.component.html',
  styleUrls: ['./my.profile.component.css']
})
export class MyProfileComponent extends UnsubscribeComponent implements OnInit {
  genders: any[] = [];
  userId: string;
  filter: string;
  userProfiles: any[] = [];
  formStructure: IFormStructure[] = [];
  canAdd: string = 'UserManagment_UserProfile_CreateUserProfile';
  canEdit: string = 'UserManagment_UserProfile_UpdateUserProfile';
  canSingleDelete: string = 'UserManagment_UserProfile_DeleteUserProfile';
  tableActions: ActionDef[] = [];
  cols: any[] = [];
  fetched: boolean = false;
  constructor(private datePipe: DatePipe, private messageService: MessageService,
    private readonly userProfileService: UserProfileService, private readonly authServiceService: AuthServiceService,
    private readonly genderService: GenderService) {
    super();
    this.initColumns();
    this.initActions();
  }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('users.loggedUser') || '') as User;
    this.userId = user.id || '';
    this.filter = `Filters=userId==${this.userId}`;
    forkJoin([this.genderService.GetAllGenders(''), this.userProfileService.GetMyUserProfiles(this.filter)])
      .pipe(takeUntil(this.destroy$)).subscribe((([genders, userProfiles]) => {
        this.userProfiles = this.mapItemList(userProfiles);
        this.genders = genders.map((item) => {
          return Object.assign(item, {
            label: item?.name,
            value: item?.id
          });
        });
        this.initFormStructure();
        this.fetched = true;
      }));
  }

  initColumns() {
    this.cols = [
      { dataKey: 'fatherName', header: APP_CONSTANTS.FATHERNAME, type: 'string' },
      { dataKey: 'motherName', header: APP_CONSTANTS.MOTHERNAME, type: 'string' },
      { dataKey: 'birthPlace', header: APP_CONSTANTS.BIRTHPLACE, type: 'string' },
      { dataKey: 'birthDate', header: APP_CONSTANTS.BIRTHDATE, type: 'string' },
      { dataKey: 'genderName', header: APP_CONSTANTS.GENDER_NAME, type: 'string' },
      { dataKey: 'cardNumber', header: APP_CONSTANTS.cardNumber, type: 'string' },
      { dataKey: 'address', header: APP_CONSTANTS.ADDRESS, type: 'string' },
      { dataKey: 'userName', header: APP_CONSTANTS.userName, type: 'string' }
    ]
  }

  initFormStructure() {
    this.formStructure = [
      {
        type: 'text',
        label: APP_CONSTANTS.FATHERNAME,
        name: 'fatherName',
        value: '',
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: APP_CONSTANTS.FIELD_REQUIRED,
          },
          {
            name: 'maxlength',
            validator: 'maxlength',
            message: APP_CONSTANTS.FIELD_MAX_LENGTH,
            value: 100
          },
        ],
      },
      {
        type: 'text',
        label: APP_CONSTANTS.MOTHERNAME,
        name: 'motherName',
        value: '',
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: APP_CONSTANTS.FIELD_REQUIRED,
          },
          {
            name: 'maxlength',
            validator: 'maxlength',
            message: APP_CONSTANTS.FIELD_MAX_LENGTH,
            value: 100
          },
        ],
      },
      {
        type: 'text',
        label: APP_CONSTANTS.BIRTHPLACE,
        name: 'birthPlace',
        value: '',
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: APP_CONSTANTS.FIELD_REQUIRED,
          },
          {
            name: 'maxlength',
            validator: 'maxlength',
            message: APP_CONSTANTS.FIELD_MAX_LENGTH,
            value: 100
          },
        ],
      },
      {
        type: 'Date',
        label: APP_CONSTANTS.BIRTHDATE,
        name: 'birthDate',
        value: '',
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: APP_CONSTANTS.FIELD_REQUIRED,
          },
        ],
        format: 'yy-mm-dd',
        maxValue: new Date()
      },
      {
        type: 'autoComplete',
        label: APP_CONSTANTS.GENDER_NAME,
        name: 'genderId',
        value: '',
        options: [...this.genders],
        placeHolder: APP_CONSTANTS.GENDER_PLACE_HOLDER,
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
        label: APP_CONSTANTS.cardNumber,
        name: 'cardNumber',
        value: '',
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: APP_CONSTANTS.FIELD_REQUIRED,
          },
          {
            name: 'maxlength',
            validator: 'maxlength',
            message: APP_CONSTANTS.FIELD_MAX_LENGTH,
            value: 20
          },
        ],
      },
      {
        type: 'text',
        label: APP_CONSTANTS.ADDRESS,
        name: 'address',
        value: '',
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: APP_CONSTANTS.FIELD_REQUIRED,
          },
          {
            name: 'maxlength',
            validator: 'maxlength',
            message: APP_CONSTANTS.FIELD_MAX_LENGTH,
            value: 100
          },
        ],
      }
    ];
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
      }
    ]
  }

  submitEventHandler(eventData) {
    eventData.userId = this.userId;
    if (eventData.id) {
      this.userProfileService.UpdateUserProfile(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.userProfileService.AddUserProfile(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.userProfileService.DeleteUserProfile(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.filter = `Filters=UserId==${this.userId}`;
    this.userProfileService.GetMyUserProfiles(this.filter).subscribe(
      (userProfiles) => {
        this.userProfiles = this.mapItemList(userProfiles);
      }
    )
  }

  mapItemList(items: any[]): any[] {
    return items.map((item) => {
      return Object.assign(item, {
        ...item,
        userName: item?.user?.userName,
        genderName: item?.gender?.name,
        birthDate: this.transformDate(item?.birthDate)
      });
    })
  }

  transformDate(date: string | number | Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

}
