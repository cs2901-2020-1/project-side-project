import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnContentComponent } from './own-content/own-content.component';
import { SubirContenidoComponent } from './subir-contenido/subir-contenido.component';
import { RouterModule } from '@angular/router';
import { NavbarModule } from '../navbar/navbar.module';
import { MaterialModule } from '../material.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SubirContenidoComponent,
    OwnContentComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NavbarModule,
    MaterialModule
  ],
  exports: [
    SubirContenidoComponent,
    OwnContentComponent
  ]
})
export class TeacherContentModule { }
