import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LessonService} from '../../shared/services';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lesson-content',
  templateUrl: './lesson-content.component.html',
  styleUrls: ['./lesson-content.component.css']
})
export class LessonContentComponent implements OnInit {

  lesson : any;

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
