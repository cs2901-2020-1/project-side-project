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

  commentVideo(comment: any) : Observable<any> {
    return this.http.post<any>(LessonService.path + 'comment', comment)
            .pipe(map(data => {
                return data
            }
        ))
  }
}