/* eslint-disable @ngrx/no-typed-global-store */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoginModel } from '../Store/LoginModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userDetails:any = [];
  
  loginModel: LoginModel;

  constructor(
    private router: Router,
    private store: Store<any>
    ) { 
      this.loginModel = new LoginModel();
    }

  ngOnInit(): void {  
    debugger;
    const storage = localStorage.getItem('google_auth');

    if (storage) {
      this.userDetails = JSON.parse(storage);
    } else {
      // this.signOut();
      this.router.navigateByUrl('/');
    }

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

  signUp() { 
    this.router.navigateByUrl('/login');
  }

  signOut(): void {
    debugger;
    localStorage.removeItem('google_auth');
    this.router.navigateByUrl('/login').then();
  }

}
