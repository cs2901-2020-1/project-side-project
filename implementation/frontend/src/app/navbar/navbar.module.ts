import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { StudentNavbarComponent } from './student-navbar/student-navbar.component';
import { RouterModule } from '@angular/router';
import { DefaultNavbarComponent } from './default-navbar/default-navbar.component';
import { TeacherNavbarComponent } from './teacher-navbar/teacher-navbar.component';



@NgModule({
  declarations: [
    NavbarComponent,
    StudentNavbarComponent,
    DefaultNavbarComponent,
    TeacherNavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule { }
