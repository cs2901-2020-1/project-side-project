import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemasComponent } from './temas/temas.component';
import { VideoComponent } from './video/video.component';
import { RouterModule } from '@angular/router';
import { NavbarModule } from '../navbar/navbar.module';
import { MaterialModule } from '../material.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TemasComponent,
    VideoComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NavbarModule,
    MaterialModule,
  ]
})
export class StudentContentModule { }
