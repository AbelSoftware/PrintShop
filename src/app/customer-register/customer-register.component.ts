import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbcallingService } from '../core/services/dbcalling.service';
import { CustomerRegister } from '../Store/customerregister';

import swal from 'sweetalert2';

@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.component.html',
  styleUrls: ['./customer-register.component.css']
})
export class CustomerRegisterComponent implements OnInit {

  submitted = false;
  errorMsg = '';

  CustomerRegister: CustomerRegister
  dbResult: any = [];

  userType: any;

  constructor(private router: Router, private dbCallingService: DbcallingService) { 
    this.CustomerRegister = new CustomerRegister
    this.userType = {id: 2, type: "Cutomer"};
  }

  ngOnInit(): void {
    debugger;
  }
  registerClick() {
    debugger;
    this.CustomerRegister;

    if (
          this.CustomerRegister.User_Name && 
          this.CustomerRegister.Password &&
          this.CustomerRegister.Confirm_Password != ''
        ) {
          if (
            this.CustomerRegister.Password ==
            this.CustomerRegister.Confirm_Password
          ) {
            try {
              let objData={"Email": this.CustomerRegister.Email, "userType": this.userType.id, "userName": this.CustomerRegister.User_Name};
              this.dbCallingService.chkUserExists(objData).subscribe((res) => {
                debugger;
                  this.dbResult = res;
              
                  if (this.dbResult.data.length == 0) {
                    this.CustomerRegistration();
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

  
  CustomerRegistration() { 
    debugger;
    this.dbCallingService.registerCustomerUser(this.CustomerRegister).subscribe((result) => {
      debugger;
      this.dbResult = result;

      if(this.dbResult.data.length > 0) {

        swal.fire({
          text: 'The Customer is Registered!',
          icon: 'success',
        });
      }

      this.CustomerRegister = new CustomerRegister();
      this.router.navigateByUrl('/login');
    });
      
    
  }

  home() {
    this.router.navigateByUrl(''); 
  }

  loginClick() {
    this.router.navigateByUrl('/login'); 
  }

}
