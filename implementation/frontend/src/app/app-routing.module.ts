import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './home/index/index.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { VideoComponent } from './student-content/video/video.component';
import { TemasComponent } from './student-content/temas/temas.component';
import { AuthGuard, LogicGuard } from './shared/guards';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { SubirContenidoComponent } from './teacher-content/subir-contenido/subir-contenido.component'

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
    path: 'subir-contenido',
    component: SubirContenidoComponent
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
