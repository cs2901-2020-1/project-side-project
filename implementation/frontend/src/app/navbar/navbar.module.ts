import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { StudentNavbarComponent } from './student-navbar/student-navbar.component';
import { RouterModule } from '@angular/router';
import { DefaultNavbarComponent } from './default-navbar/default-navbar.component';



@NgModule({
  declarations: [
    NavbarComponent,
    StudentNavbarComponent,
    DefaultNavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule { }
