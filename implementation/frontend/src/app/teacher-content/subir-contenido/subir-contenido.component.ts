import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/shared/services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LessonService } from 'src/app/shared/services';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-subir-contenido',
  templateUrl: './subir-contenido.component.html',
  styleUrls: ['./subir-contenido.component.css']
})
export class SubirContenidoComponent implements OnInit {

  contentUploadForm: FormGroup;

  topics : any;

  constructor(
    private formBuilder: FormBuilder,
    private lessonService: LessonService,
    private courseService: CourseService,
    public snackBar: MatSnackBar
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
      'topicId': 1
    }

    let video = this.fileVideo.value
    let document = this.filePdf.value

    this.lessonService.uploadVideo(video, document, request)
        .pipe()
        .subscribe(
          data => {
            console.log(data);
            this.contentUploadForm.reset;
            this.openSnackBar('Se subió el contenido con éxito 👍', 'X');
          },
          err => {
            console.log(err)
              this.openSnackBar('Ha ocurrido un error :c', 'Cerrar');
          }
        )
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  onCourseSelect() {
    const id = this.curso.value;
    this.courseService.getById(id)
      .pipe()
      .subscribe(
        data => {
          this.topics = data.topics;
          console.log(this.topics);
        },
        err => {
          this.openSnackBar('Ha ocurrido un error :c', 'Cerrar');
        }
      )
    this.tema.clearValidators;
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

  get fileVideo(){
    return this.contentUploadForm.get('fileVideo')
  }

  get filePdf(){
    return this.contentUploadForm.get('filePdf')
  }

}
