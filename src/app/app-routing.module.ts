import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { AddClientProfileComponent } from './add-client-profile/add-client-profile.component';
import { AddShopProfileComponent } from './add-shop-profile/add-shop-profile.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { CustomerRegisterComponent } from './customer-register/customer-register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PrintshopProfileComponent } from './printshop-profile/printshop-profile.component';
import { RegisterComponent } from './register/register.component';
import { ShopInformationComponent } from './shop-information/shop-information.component';
import { SideNavComponent } from './side-nav/side-nav.component';

const routes: Routes = [
  {
    path: '',  component: SideNavComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'addclientprofile', component: AddClientProfileComponent },
      { path: 'addshopprofile', component: AddShopProfileComponent },
      { path: 'shopinformation', component: ShopInformationComponent },
      { path: 'printshopprofile', component: PrintshopProfileComponent },
      { path: 'customerprofile', component: CustomerProfileComponent },
      { path: 'aboutus', component: AboutUsComponent }

    ],
  },
  { path: 'home', component: SideNavComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'customerregister', component: CustomerRegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
