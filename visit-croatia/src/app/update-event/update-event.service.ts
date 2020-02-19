import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UpdateEventService {

  headers = new HttpHeaders();

  constructor(private _http: HttpClient) { }

  updateEvent(id:any,a: any){
    return this._http.put('http://localhost:9000/event/uredi/' + id , a).pipe();
  }
  dohvatiEvent(id:any){
    return this._http.get('http://localhost:9000/event/' + id).pipe();
  }
}
