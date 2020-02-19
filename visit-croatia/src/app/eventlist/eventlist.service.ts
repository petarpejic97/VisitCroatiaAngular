import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EventlistService {

  constructor(private _http: HttpClient) { }

  dohvatiEvente(){
    return this._http.get('http://localhost:9000/' + 'event').pipe();
  }
  dohvatiEvent(id:any){
    return this._http.get('http://localhost:9000/event/'+id).pipe();
  }
  obrisiEvent(a:any){
    return this._http.delete('http://localhost:9000/event/'+a).pipe();
  }
}
