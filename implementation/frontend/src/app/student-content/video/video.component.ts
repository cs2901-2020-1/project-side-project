import { Component, OnInit } from '@angular/core';
import { LessonService, AuthService } from '../../shared/services';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  lesson: any;

  id: number;

  comments: any[] = [];

  form: FormGroup;

  like: Boolean = false;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      public snackBar: MatSnackBar,
      private authService: AuthService,
      private lessonService: LessonService) {
    this.getRouteParams();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      content: ['', Validators.required]
    });
  }

  getRouteParams() {
    const id = this.route.snapshot.paramMap.get('id');
    this.id = +id

    this.lessonService.getById(id)
      .pipe()
      .subscribe(
        data => {
          this.lesson = data
          this.like = data.like
          this.comments = data.comments
          this.lesson.videoPath = environment.APIEndpoint + '/files/' + data.videoPath
          this.comments.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        },
        err => {
          this.openSnackBar('Ha ocurrido un error :c', 'Cerrar');
        }
      )
  }

  onComment() {
    let comment = {
      'userId': this.authService.currentUserId(),
      'lessonId': this.id,
      'content': this.content.value
    }
    this.lessonService.commentVideo(comment)
      .pipe()
      .subscribe(
        data => {
          this.form.reset()
          this.comments.push(data)
          this.comments.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        },
        err => {
          this.openSnackBar('Ha ocurrido un error :c', 'Cerrar');
        }
      )
  }

  onLike() {
    let like = {
      'userId': this.authService.currentUserId(),
      'lessonId': this.id,
      'like': !this.like
    }
    this.lessonService.likeVideo(like)
      .pipe()
      .subscribe(
        data => {
          this.like = data.like
          if (this.like) {
            this.lesson.numLikes += 1
          } else {
            this.lesson.numLikes -= 1
          }
        },
        err => {
          this.openSnackBar('Ha ocurrido un error :c', 'Cerrar');
        }
      )
  }

  get content(){
    return this.form.get('content')
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
