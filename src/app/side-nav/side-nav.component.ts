/* eslint-disable @ngrx/prefer-action-creator-in-dispatch */
/* eslint-disable @ngrx/no-typed-global-store */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoginModel } from '../Store/LoginModel';
import * as pageStore from 'src/app/Store/PageStore/Page.Actions';
import { DbcallingService } from '../core/services/dbcalling.service';
import { PrintShopRegister } from '../Store/printshopregister';
import { CustomerRegister } from '../Store/customerregister';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent implements OnInit {
  loginModel: LoginModel;
  prinshopUser: PrintShopRegister;
  customerUser: CustomerRegister;


  userDetails: any = [];
  userProfile: any = [];

  constructor(
    private router: Router, 
    private store: Store<any>,
    private dbCallingservice: DbcallingService
    ) {
    this.loginModel = new LoginModel();
    this.prinshopUser = new PrintShopRegister();
    this.customerUser = new CustomerRegister();
  }

  ngOnInit(): void {
    debugger;
    const storage = localStorage.getItem('google_auth');

    if (storage) {
      this.userDetails = JSON.parse(storage);
    } else {
      this.userDetails = [];
    }

    try{
      debugger;
      var result1 = this.store.source['value']['PrintWebsite'].filter((x) => {
        return x.viewName  == 'Login';
      });
      debugger;
      if (result1.length > 0) {

        this.loginModel = Object.assign({}, result1[0]);
        debugger;
        if (+this.loginModel.User_Id > 0) {
          if(this.loginModel.User_Name != '') {
            this.router.navigateByUrl('home');
          }
        }
      }
    }
    catch(e) { }
  }

  home() {
    this.router.navigateByUrl('/home');
  }

  servicesClick() {
    this.router.navigateByUrl('/services');
  }

  aboutUsClick() {
    this.router.navigateByUrl('/aboutus');
  }

  loginClick() {
    this.router.navigateByUrl('/login');
  }

  registerPrintShop() {
    this.router.navigateByUrl('/register');
  }

  registerCustomer() { 
    this.router.navigateByUrl('/customerregister');
  }

  editProfileClick() {
    debugger;

    if(this.loginModel.User_Type == 1) {
      this.router.navigateByUrl('/printshopprofile');
    }

    debugger;

    if(this.loginModel.User_Type == 2) {
      this.router.navigateByUrl('/customerprofile');
    }
    
  }
  logoutClick() {
    debugger;
    localStorage.removeItem('google_auth');
    this.router.navigateByUrl('/login').then();

    debugger;
    this.loginModel = new LoginModel();
    this.store.dispatch(new pageStore.OpenPage(Object.assign({}, this.loginModel)));
    this.router.navigateByUrl('login');

    
  }

  close() {}
}
