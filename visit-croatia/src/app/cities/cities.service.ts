import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(private _http: HttpClient) { }

  dohvatiKorisnika(a:any){
    return this._http.get('http://localhost:9000/user2s',a).pipe();
  }
}
