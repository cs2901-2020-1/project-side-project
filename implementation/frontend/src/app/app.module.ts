import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { MaterialModule } from './material.module';
import { VideoComponent } from './video/video.component';
import { RouterModule } from '@angular/router';
import { TemasComponent } from './temas/temas.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { NavbarModule } from './navbar/navbar.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    VideoComponent,
    TemasComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HomeModule,
    DashboardModule,
    AuthModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    NavbarModule,
    SharedModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
