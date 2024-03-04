import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tasks } from '../Store/Model/Task.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  baseurl = 'http://localhost:3000/task';
  
  constructor(private http: HttpClient) {}

  GetAll(): Observable<Tasks[]> {
    return this.http.get<Tasks[]>(this.baseurl);
  }

  Getbycode(code: string) {
    return this.http.get<Tasks>(`${this.baseurl}/${code}`);
  }

  Delete(code: string): Observable<any> {
    return this.http.delete(`${this.baseurl}/${code}`);
  }

  Update(data: Tasks)  {
    return this.http.put(`${this.baseurl}/${data.id}`, data);
  }

  Create(data: Tasks){
    return this.http.post(this.baseurl, data);
  }
}
