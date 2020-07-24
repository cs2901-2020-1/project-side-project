import { Component, OnInit } from '@angular/core';
import { LessonService, AuthService } from '../../shared/services';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import * as fileSaver from 'file-saver';

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

  commentId : number;

  index : number;

  sub_index : number;

  show_textarea : boolean = false;

  response_area : any;

  valid_subcomment : boolean = false;

  name_tag : boolean = false;

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
          this.lesson.pdfPath = environment.APIEndpoint + '/files/' + data.documentPath
          this.comments.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          console.log(this.lesson.videoPath)
          console.log(this.lesson.pdfPath)
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

  downloadVideo() {
    console.log("This video file:")
    console.log(this.lesson.videoPath)
    this.lessonService.downloadContent(this.lesson.videoPath).subscribe(response => {
			fileSaver.saveAs(response, '');
		}), error => console.log('Error downloading the file'),
                 () => console.info('File downloaded successfully');
  }


  downloadPdf() {
    console.log("This pdf file:")
    console.log(this.lesson.pdfPath)
    this.lessonService.downloadContent(this.lesson.pdfPath).subscribe(response => {
			fileSaver.saveAs(response, '');
		}), error => console.log('Error downloading the file'),
                 () => console.info('File downloaded successfully');
  }

  responder(id : number, indx : number) {
    if (this.commentId == id && this.show_textarea && this.sub_index == undefined ) {
      this.show_textarea = false;
      return;
    }
    this.name_tag = false;
    this.show_textarea = true;
    this.commentId = id;
    this.index = indx;
    console.log("Comentario " + id);
    this.sub_index = undefined;
  }

  responder_sub(id : number, indx : number, sub_id : number) {
    if (this.sub_index == sub_id && this.show_textarea) {
      this.show_textarea = false;
      return;
    }
    if (this.response_area) this.response_area.value = '';
    this.show_textarea = true;
    this.commentId = id;
    this.index = indx;
    this.sub_index = sub_id;
    this.name_tag = true;
    console.log("Comentario " + id + "\nSub comentario " + sub_id);
  }

  touchArea() {
    let user_to = '';
    if (this.name_tag) user_to = this.comments[this.index].subcomments[this.sub_index].username;
    let subcomment = {
      commentId: this.commentId,
      username: this.authService.currentUserFullName(),
      user_to: user_to,
      content: this.response_area.value
    }
    this.lessonService.subcomment(subcomment)
      .pipe()
      .subscribe(
        data => {
          this.comments[this.index].subcomments.push(data)
          this.response_area.value = '';
          this.name_tag = false;
          this.sub_index = undefined;
          this.chackSubcontent();
        },
        err => {
          this.openSnackBar('Ha ocurrido un error :c', 'Cerrar');
        }
      )
  }

  chackSubcontent() {
    this.valid_subcomment = this.response_area.value.length > 1;
  }

  responseArea() {
    if (document.getElementById(''+ this.index) != null) {
      this.response_area = document.getElementById(''+ this.index).getElementsByClassName('typing')[0];
    }
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
