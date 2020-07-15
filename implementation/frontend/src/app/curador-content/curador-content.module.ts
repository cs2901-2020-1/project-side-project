import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewContentComponent } from './review-content/review-content.component';
import { NavbarModule } from '../navbar/navbar.module';
import { MaterialModule } from '../material.module';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ReviewContentComponent],
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    NavbarModule,
    MaterialModule
  ]
})
export class CuradorContentModule { }
