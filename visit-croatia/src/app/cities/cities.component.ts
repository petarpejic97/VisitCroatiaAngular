import { Component, OnInit } from '@angular/core';
import { CitiesService } from './cities.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css'],
  providers: [CitiesService]
})
export class CitiesComponent implements OnInit {

  korisnik: any;

  constructor(public _citiesService: CitiesService,
    private router: Router) {}

  ngOnInit() {
    
    this.korisnik = {
      'name': localStorage.getItem('ime'),
      'email': localStorage.getItem('email'),
      'phone': localStorage.getItem('telefon')
    }

    this.dohvatiKorisnika();
  }

  dohvatiKorisnika(){
    this._citiesService.dohvatiKorisnika({"id":"5d076b9cb455aa35908ea3d8"}).subscribe(res => {
      console.log(res);
    });
  }

  createEvent(){
    this.router.navigate(['/event']);
  }
  logoff(){
    this.router.navigate(['/login']);
    localStorage.clear();
  }
  openZagreb(){
    this.router.navigate(['/eventlist']);
    localStorage.setItem("grad","Zagreb");
  }
  openSplit(){
    this.router.navigate(['/eventlist']);
    localStorage.setItem("grad","Split");
  }
  openVinkovci(){
    this.router.navigate(['/eventlist']);
    localStorage.setItem("grad","Vinkovci");
  }
}
