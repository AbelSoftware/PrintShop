import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { localStorageSync } from 'ngrx-store-localstorage';
import { StoreModule } from '@ngrx/store';
import { Pagereducer } from './Store/PageStore/Page.Reducer';
import { AddClientProfileComponent } from './add-client-profile/add-client-profile.component';
import { AddShopProfileComponent } from './add-shop-profile/add-shop-profile.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { ShopInformationComponent } from './shop-information/shop-information.component';
import { CustomerRegisterComponent } from './customer-register/customer-register.component';



export function localStorageSyncReducer(rootReducer: any) {
  return localStorageSync({
    keys: [
      {
        PrintWebsite: {
          encrypt: (state) => btoa(state),
          decrypt: (state) => atob(state),
        },
      },
    ],
    rehydrate: true,
  })(rootReducer);
}

 const googleLoginOptions = {
  scope: 'profile email',
  plugin_name:'sample_pwa_login'
}; 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    SideNavComponent,
    HomeComponent,
    AddClientProfileComponent,
    AddShopProfileComponent,
    ShopInformationComponent,
    CustomerRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    SocialLoginModule,


    BrowserAnimationsModule,

    StoreModule.forRoot(
      { PrintWebsite: Pagereducer },
      { metaReducers: [localStorageSyncReducer],}
    ),

     ServiceWorkerModule.register('ngsw-worker.js', {
       enabled: environment.production,
       // Register the ServiceWorker as soon as the application is stable
       // or after 30 seconds (whichever comes first).
       registrationStrategy: 'registerWhenStable:30000'
     }),
    
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '969708128713-locoheomn096rnfdh9ietl2arme2icob.apps.googleusercontent.com',
              googleLoginOptions
            )
          }
        ]
      } as SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
