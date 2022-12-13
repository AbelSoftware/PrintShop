/* eslint-disable @ngrx/prefer-action-creator-in-dispatch */
/* eslint-disable @ngrx/no-typed-global-store */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from '../Store/LoginModel';

import {User } from '../core/models/iuser.model'
import { size } from '../core/models/isize.model';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import Swal from 'sweetalert2';
import { OperationdataServiceService } from '../core/services/operationdata.service.service';

import * as pageStore from 'src/app/Store/PageStore/Page.Actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginModel: LoginModel;
  sizeList: size[];
  submitted = false;
  id:any;
  UserList: User[];
  user: SocialUser;

  constructor(
    private router: Router, 
    private store: Store<any>,
    private authService: SocialAuthService,
    private operationDataService: OperationdataServiceService
    ) { 
      debugger;
    this.loginModel = new LoginModel();
  }

  ngOnInit(): void {
    debugger;
    this.authService.authState.subscribe(user => {
      this.user = user;
    });
   
  }

  loginClick() {
        this.submitted = true;
          let objData={"User_Id": 1};
     
           debugger;
        this.operationDataService.getUsers(objData).subscribe((result)=>{
         // this.UserList=result.data;
         debugger;
          console.log("status:"+result.data[0].User_Name);
          })
  
          this.operationDataService.getSize().subscribe((result) => {
             this.sizeList = result.data;
             debugger;
             console.log(result);
             console.log("Size:"+result.data[0].Size_Name);
  
            },
            (err) => console.log(err)
          );
  
        //console.log("in:"+this.UserList);
  
        
      }

  forgotPasswordClick() { 
    this.router.navigateByUrl('/forgotpassword');
  }

  home() { 
    this.router.navigateByUrl('');
  }

  regClick() { 
    this.router.navigateByUrl('/register');
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

  loginWithFacebook() { 
   
  }
}