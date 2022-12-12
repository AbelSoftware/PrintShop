/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbcallingService } from '../core/services/dbcalling.service';
import { PrintShopRegister } from '../Store/printshopregister';

import swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  submitted = false;
  errorMsg = '';

  shopRegister: PrintShopRegister
  dbResult: any = [];

  userType: any;

  constructor(private router: Router, private dbCallingService: DbcallingService) { 
    this.shopRegister = new PrintShopRegister
    this.userType = "Shop Owner"
  }

  ngOnInit(): void {  }

  registerClick() {
    debugger;
    this.shopRegister;

    if (
          this.shopRegister.User_Name && 
          this.shopRegister.Password &&
          this.shopRegister.Confirm_Password != ''
        ) {
          if (
            this.shopRegister.Password ==
            this.shopRegister.Confirm_Password
          ) {
            try {
              let objData={"Email": this.shopRegister.Email};
              this.dbCallingService.chkUserExists(objData).subscribe((res) => {
                debugger;
                  this.dbResult = res;
              
                  if (this.dbResult.data.length == 0) {
                    this.registerPrintShop();
                  } 
                  else {
                    if (this.dbResult.length > 0) {
                      var mobileNo = this.dbResult[0].User_Mobile;
                      if (mobileNo != '') {
                        swal.fire({
                          text: 'This User already Exists!',
                          icon: 'warning',
                        });
                      }
                      
                    }
                  }
                });
            } 
            catch (e) {
              this.errorMsg = 'False';
            }
          } else {
            swal.fire({
              text: 'Password & Confirm Password should be same!',
              icon: 'warning',
            });
          }
        }
  }

  registerPrintShop() { 
    debugger;
    this.dbCallingService.registerUser(this.shopRegister).subscribe((result) => {
      debugger;
      this.dbResult = result;

      if(this.dbResult.data.length > 0) {

        swal.fire({
          text: 'The Shop is Registered!',
          icon: 'success',
        });
      }

      this.shopRegister = new PrintShopRegister();
      this.router.navigateByUrl('/shopinformation');
    });
      
    
  }

  loginClick() {
    this.router.navigateByUrl('/login');
  }

  home() {
    this.router.navigateByUrl('');
  }

}
