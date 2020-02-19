import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  headers = new HttpHeaders();

  constructor(private _http: HttpClient) { }

  createEvent(a: any){
    console.log("usao")
    return this._http.post('http://localhost:9000/' + 'event', a).pipe();
  }

  uploadImg(a:any){
    console.log(a)
    return this._http.put('http://localhost:9000/event/uploadSlike2', a).pipe();
  }
}
