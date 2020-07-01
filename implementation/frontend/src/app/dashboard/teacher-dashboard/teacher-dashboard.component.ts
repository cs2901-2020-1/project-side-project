import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {

  contentUploadForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.contentUploadForm = this.formBuilder.group({
      curso: ['', Validators.required],
      tema: ['', Validators.required],
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      fileVideo: ['', Validators.required],
      filePdf: ['', Validators.required]
    });
  }

  onUpload(){
    let request = {
      'curso': this.curso.value,
      'tema': this.tema.value,
      'titulo': this.titulo.value,
      'descripcion': this.descripcion.value
    }
  }

  get curso(){
    return this.contentUploadForm.get('curso')
  }

  get tema(){
    return this.contentUploadForm.get('tema')
  }

  get titulo(){
    return this.contentUploadForm.get('titulo')
  }

  get descripcion(){
    return this.contentUploadForm.get('descripcion')
  }

}
