/* eslint-disable @ngrx/no-typed-global-store */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { DbcallingService } from '../core/services/dbcalling.service';
import { LoginModel } from '../Store/LoginModel';
import { PrintShopRegister } from '../Store/printshopregister';


@Component({
  selector: 'app-printshop-profile',
  templateUrl: './printshop-profile.component.html',
  styleUrls: ['./printshop-profile.component.css']
})
export class PrintshopProfileComponent implements OnInit {

  shopRegister: PrintShopRegister;
  loginModel: LoginModel;

  userProfile: any = [];

  constructor(
    private router: Router,
    private dbCallingservice: DbcallingService,
    private store: Store<any>
  ) { 
    this.shopRegister = new PrintShopRegister();
  }

  ngOnInit(): void {
    debugger;
    try{
      debugger;
      var result1 = this.store.source['value']['PrintWebsite'].filter((x) => {
        return x.viewName  == 'Login';
      });

      if (result1.length > 0) {
        this.loginModel = Object.assign({}, result1[0]);
        if (+this.loginModel.User_Id > 0) {
          if(this.loginModel.User_Name != '') {
            this.router.navigateByUrl('printshopprofile');
          }
        }
      }
    }
    catch(e) { }

    this.viewProfile();
  }

  viewProfile() {
    this.dbCallingservice.viewProfileDetails(this.loginModel).subscribe((result) => {
      debugger;
      this.userProfile = result;
      if(this.userProfile.data.length > 0) {
        debugger;
        if(this.userProfile.data[0].Shop_Id > 0 ) {
          this.shopRegister = this.userProfile.data[0];
        }
      }
    });
  }

  DeleteClick() {
    
    Swal.fire({
      title: ('Are you sure'),
      text: ('Do you want to delete'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: ('Yes'),
      cancelButtonText: ('No')
    }).then((result) => {
      if (result.value) {
        this.deleteProfile();
      } 
      else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          ('Cancelled'),
          ('your record is safe'),
          'error'
        );
      }
    });
  }


  deleteProfile() { 
    debugger;
  }

  home() {
    this.router.navigateByUrl('');
  }

}
