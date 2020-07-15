import { Component, OnInit } from '@angular/core';
import { LessonService, AuthService, AppLessonService } from '../../shared/services';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-review-content',
  templateUrl: './review-content.component.html',
  styleUrls: ['./review-content.component.css']
})
export class ReviewContentComponent implements OnInit {

  // lessons : any;
  lessons : any = [
	  {
    course : "Curso",
    lessonId: "500",
		topic : "Topic",
		approved : null,
		date : 'August 19, 1975 23:15:30',
		title : "Title"
	  }
	]

  constructor(
    public snackBar: MatSnackBar,
    private applessonService: AppLessonService) {
  }

  ngOnInit(): void {
    this.getLessons();
  }
  
  getLessons() : void {
    this.applessonService.getReqAppLessons().pipe()
      .subscribe(
        data => {
          console.log("Get unappoved lessons:")
          console.log(data)
          // this.lessons = data;
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
