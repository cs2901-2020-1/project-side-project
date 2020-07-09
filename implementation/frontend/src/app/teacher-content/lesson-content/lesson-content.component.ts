import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { LessonService} from '../../shared/services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lesson-content',
  templateUrl: './lesson-content.component.html',
  styleUrls: ['./lesson-content.component.css']
})
export class LessonContentComponent implements OnInit {

  lesson : any;

  pdfPath : any;

  videoPath : any;

  videoLoad : boolean = false;

  constructor(
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private lessonService: LessonService) {
      this.getRouteParams();
  }

  ngOnInit(): void {
  }

  getRouteParams() {
    const lessonId = this.route.snapshot.paramMap.get('id');

    this.lessonService.getTeacherLesson(+lessonId)
      .pipe()
      .subscribe(
        data => {
          this.lesson = data;
          this.lesson.videoPath = environment.APIEndpoint + '/files/' + data.videoPath;
          this.lesson.documentPath = environment.APIEndpoint + '/files/' + data.documentPath;
          console.log(this.lesson);
        },
        err => {
          this.openSnackBar('Ha ocurrido un error :c', 'Cerrar');
        }
      )
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

}
