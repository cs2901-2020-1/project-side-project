import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class LessonService {
  
  static path = environment.APIEndpoint + '/lesson/';

  constructor(private http: HttpClient) { }

  getAll() : Observable<any> {
    return this.http.get(LessonService.path).pipe(
      map(res => {
        return res
      })
    )
  }

  getById(id: string) : Observable<any> {
    return this.http.get(LessonService.path + id).pipe(
      map(res => {
        return res
      })
    )
  }

  getTeacherLessons(userId: number) : Observable<any> {
    return this.http.get(LessonService.path + 'teacher/' + userId).pipe(
      map(data => {
        return data
      })
    )
  }

  commentVideo(comment: any) : Observable<any> {
    return this.http.post<any>(LessonService.path + 'comment', comment)
            .pipe(map(data => {
                return data
            }
        ))
  }

  likeVideo(like: any) : Observable<any> {
    return this.http.post<any>(LessonService.path + 'like', like)
            .pipe(map(data => {
                return data
            }
        ))
  }

  uploadVideo(document: any, video: any, request: any) : Observable<any> {
    
    let formData = new FormData();
    formData.append('video', video);
    formData.append('doc', document);
    formData.append('request', new Blob([JSON.stringify(request)]));
    
    return this.http.post<any>(LessonService.path + 'video', formData)
            .pipe(map(data => {
                return data
            }
        ))
  }
}