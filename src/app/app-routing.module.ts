import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasklistingComponent } from './component/tasklisting/tasklisting.component';
import { HomeComponent } from './component/home/home.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { authGuard } from './guard/auth.guard';

import { MaskComponent } from './componemt/mask/mask.component';



const routes: Routes = [
  {path:'',component:HomeComponent,canActivate:[authGuard]},
  {path:'task',component:TasklistingComponent,canActivate:[authGuard]},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'mask',component:MaskComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
