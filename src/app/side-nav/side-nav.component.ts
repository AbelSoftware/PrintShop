import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from '../Store/LoginModel';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent implements OnInit {
  loginModel: LoginModel;
  userDetails: any = [];

  constructor(private router: Router) {
    this.loginModel = new LoginModel();
  }

  ngOnInit(): void {
    debugger;
    const storage = localStorage.getItem('google_auth');

    if (storage) {
      this.userDetails = JSON.parse(storage);
    } else {
      this.userDetails = [];
    }
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

  editProfileClick(temp: LoginModel) {}
  logoutClick() {
    debugger;
    localStorage.removeItem('google_auth');
    this.router.navigateByUrl('/login').then();
  }

  close() {}
}
