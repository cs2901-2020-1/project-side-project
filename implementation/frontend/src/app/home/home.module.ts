import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PictureBoxComponent } from './picture-box/picture-box.component';
import { IndexComponent } from './index/index.component';
import { AppRoutingModule } from '../app-routing.module';
import { ImageService } from '../shared/services';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { GalleryComponent } from './gallery/gallery.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [PictureBoxComponent, IndexComponent, NavbarComponent, GalleryComponent],
  imports: [
    AppRoutingModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  providers: [
    ImageService
  ]
})
export class HomeModule { }
