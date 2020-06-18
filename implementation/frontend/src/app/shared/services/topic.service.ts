import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class TopicService {
  
  static path = environment.APIEndpoint + '/topic/';

  constructor(private http: HttpClient) { }

  getAll() : Observable<any> {
    return this.http.get(TopicService.path).pipe(
      map(res => {
        return res
      })
    )
  }

  getById(id: string) : Observable<any> {
    return this.http.get(TopicService.path + id).pipe(
      map(res => {
        return res
      })
    )
  }
}