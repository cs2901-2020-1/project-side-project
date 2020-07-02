import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {

  contentUploadForm: FormGroup;
  SERVER_URL = "http://localhost:8080/lesson/video";

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private httpClient: HttpClient
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
      'title': this.titulo.value,
      'description': this.descripcion.value,
      'topicId': this.tema.value,
      'curso': this.curso.value
    }

    const formDataVideo = new FormData();
    const formDataPdf = new FormData();
    const formDataReq = new FormData();
    formDataVideo.append('videoFile', this.contentUploadForm.get('fileVideo').value);
    formDataPdf.append('pdfFile', this.contentUploadForm.get('filePdf').value);
    
    this.httpClient.post<any>(this.SERVER_URL, formDataVideo).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

  onVideoFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.contentUploadForm.get('fileVideo').setValue(file);
    }
  }

  onPdfFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.contentUploadForm.get('filePdf').setValue(file);
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
