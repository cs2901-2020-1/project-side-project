import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './home/index/index.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { VideoComponent } from './video/video.component';
import { StudentDashboardComponent } from './dashboard/student-dashboard/student-dashboard.component';
import { TemasComponent } from './temas/temas.component';
import { AuthGuard, LogicGuard } from './shared/guards';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    canActivate: [LogicGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'video/:id',
    component: VideoComponent
  },
  {
    path: 'tema/:id',
    component: TemasComponent
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
