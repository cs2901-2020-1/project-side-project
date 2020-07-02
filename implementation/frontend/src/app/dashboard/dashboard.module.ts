import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { NavbarModule } from '../navbar/navbar.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    StudentDashboardComponent,
    DashboardComponent,
    TeacherDashboardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    BrowserModule,
    RouterModule,
    NavbarModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class DashboardModule { }
