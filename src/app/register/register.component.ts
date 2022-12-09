/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbcallingService } from '../core/services/dbcalling.service';
import { RegisterModel } from '../Store/registerModel';

import swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerModel: RegisterModel;
  submitted = false;
  errorMsg = '';

  userTypeData = [
    {id: 1, user: "ShopOwner"},
    {id: 2, user: "Customer"}
  ];

  dbResult: any = [];

  userType: any;

  constructor(private router: Router, private dbCallingService: DbcallingService) { 
    this.registerModel = new RegisterModel();
  }

  ngOnInit(): void {  }

  regClick() {
    debugger;
    var usertyope = this.userType;
    this.submitted = true;

    if (
      this.registerModel.mobileNo &&
      this.registerModel.password &&
      this.registerModel.confirmPassword != ''
    ) {
      if (
        this.registerModel.password ==
        this.registerModel.confirmPassword
      ) {
        try {
          // let objData={"Mobile_No": this.registerModel.mobileNo};
          // this.dbCallingService.chkUserExists(objData).subscribe((res) => {
          //     this.dbResult = res.data;
          
          //     if (this.dbResult == undefined) {
                this.saveUsers();
          //     } 
          //     else {
          //       if (this.dbResult.length > 0) {
          //         var mobileNo = this.dbResult[0].User_Mobile;
          //         if (mobileNo != '') {
          //           swal.fire({
          //             text: 'This User already Exists!',
          //             icon: 'warning',
          //           });
          //         }
          //         this.registerModel = new RegisterModel();
          //       }
          //     }
          //   });
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

  saveUsers() {
    debugger;
    let objData= {
      "userName": this.registerModel.userName,
      "mobileNo": this.registerModel.mobileNo,
      "password": this.registerModel.password      
    };
    this.dbCallingService.registerUser(objData).subscribe((result) => {
      debugger;
      this.dbResult = result;
    });
      
    
  }

  loginClick() {
    this.router.navigateByUrl('/login');
  }

  home() {
    this.router.navigateByUrl('');
  }

}
