import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {

  constructor(private http: HttpClient) { }

  getTasksNow() {
    this.http.get<{message: string}>('http://localhost:3000/getTasks')
    .subscribe(response => {
      console.log('response: ' + response.message);
    });
  }
}
