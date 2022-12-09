import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUserResponce } from '../models/iuser.model';

import { RegisterModel } from 'src/app/Store/registerModel';

@Injectable({
  providedIn: 'root'
})
export class DbcallingService {

  API_URL = environment.baseUrl;
  baseURL=this.API_URL;

  registerModel: RegisterModel;

  constructor(private _httpClient: HttpClient) { }

  getPaper(): Observable<any> {
    
    try {
      
      return this._httpClient.get<any>(this.baseURL + 'papermaster/getpaper', {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        })
        .pipe(
          timeout(120000),
          catchError((err) => {
            
            console.log('error ' +err)
            if (err.message.indexOf('Http failure response for') > 0) {
              return null;
            }
            
          })
        );
        
    } catch (err) {
      throw err;
    }
  }

  getOrientation(): Observable<any> {
    
    try {
      
      return this._httpClient.get<any>(this.baseURL + 'orientationmaster/getorientation', {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        })
        .pipe(
          timeout(120000),
          catchError((err) => {
            
            console.log('error ' +err)
            if (err.message.indexOf('Http failure response for') > 0) {
              return null;
            }
            
          })
        );
        
    } catch (err) {
      throw err;
    }
  }

  private handleError(errorResponce: HttpErrorResponse) {
    if (errorResponce.error instanceof ErrorEvent) {
      console.log("Client side Error ", errorResponce.error.message)
    }
    else {
      console.log("Server side Error ", errorResponce)
    }
    return throwError("something went wrong");
  }

  login(userId) {
    try {
      // let userid = JSON.stringify(userId)
      debugger;
      let userid = new HttpParams().set('userid',userId);
      debugger;
      return this._httpClient.get<any>((this.baseURL + 'login') , {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        params: userId,
      })
      debugger;
    } catch (err) {
      throw err;
    }
  }


  chkUserExists(mobNo: any): Observable<IUserResponce> {
    console.log(mobNo);
    debugger;
    var mobileNumber = JSON.stringify(mobNo);
    return this._httpClient.post<IUserResponce>(this.baseURL+"/register/checkUserExists",JSON.stringify(mobNo),{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
      .pipe(catchError(this.handleError));
  }

  registerUser(registerModel: any): Observable<RegisterModel> {
    debugger;
    var dataPass = JSON.stringify(registerModel);
    return this._httpClient.post<RegisterModel>(this.baseURL+"/register/registerUser", dataPass,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
      .pipe(catchError(this.handleError));
  }
}
