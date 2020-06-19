import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { AppRoutingModule } from '../app-routing.module';
import { ImageService } from '../shared/services';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarModule } from '../navbar/navbar.module';
import { MaterialModule } from '../material.module';



@NgModule({
  declarations: [
    IndexComponent,
    
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    NavbarModule
  ],
  providers: [
    ImageService
  ]
})
export class HomeModule { }
