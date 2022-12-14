/* eslint-disable @ngrx/prefer-action-creator-in-dispatch */
/* eslint-disable @ngrx/no-typed-global-store */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from '../Store/LoginModel';

import { User } from '../core/models/iuser.model';
import { size } from '../core/models/isize.model';
import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from 'angularx-social-login';
import Swal from 'sweetalert2';
import { OperationdataServiceService } from '../core/services/operationdata.service.service';

import * as pageStore from 'src/app/Store/PageStore/Page.Actions';
import { Store } from '@ngrx/store';
import { DbcallingService } from '../core/services/dbcalling.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginModel: LoginModel;
  sizeList: size[];
  submitted = false;
  id: any;
  UserList: User[];
  user: SocialUser;

  dbResult: any = [];

  constructor(
    private router: Router,
    private store: Store<any>,
    private authService: SocialAuthService,
    private dbCallingService: DbcallingService
  ) {
    debugger;
    this.loginModel = new LoginModel();
  }

  ngOnInit(): void {
    debugger;
    this.authService.authState.subscribe((user) => {
      this.user = user;
    });

    try{
      debugger;
      var result1 = this.store.source['value']['PrintWebsite'].filter((x) => {
        return x.viewName  == 'Login';
      });

      if (result1.length > 0) {

        this.loginModel = Object.assign({}, result1[0]);

        if (+this.loginModel.User_Id > 0) {
          if(this.loginModel.User_Name != '') {
            this.router.navigateByUrl('home');
          }
        }
      }
    }
    catch(e) { }
  }

  loginClick() {
    debugger;
    this.submitted = true;
    if(this.loginModel.User_Email != '' || this.loginModel.User_Mobile != '') {
        if(this.loginModel.User_Pass != '') {
          this.dbCallingService.getLoginUser(this.loginModel).subscribe((res) => {
            debugger;
            this.dbResult = res.data;
            if(this.dbResult.length > 0) { 
              if(this.dbResult[0].User_Id > 0) {
                this.loginModel = this.dbResult[0];
                this.loginModel.viewName = "Login";
                this.store.dispatch(new pageStore.OpenPage(Object.assign({} , this.loginModel)));

                this.router.navigateByUrl('/home')
              }
            }
          });
        }
    }
  }

  forgotPasswordClick() {
    this.router.navigateByUrl('/forgotpassword');
  }

  home() {
    this.router.navigateByUrl('');
  }

  regClick() {
    this.router.navigateByUrl('/home');
  }

  loginWithGmail(): void {
    debugger;
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data) => {
      debugger;
      localStorage.setItem('google_auth', JSON.stringify(data));
      debugger;
      this.router.navigateByUrl('/home');
      debugger;
    });
  }

  loginWithFacebook() {}
}
