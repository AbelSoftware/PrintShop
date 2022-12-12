import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddClientProfileComponent } from './add-client-profile/add-client-profile.component';
import { AddShopProfileComponent } from './add-shop-profile/add-shop-profile.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
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
    ],
  },
  { path: 'home', component: SideNavComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
