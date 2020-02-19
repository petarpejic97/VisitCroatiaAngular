import { Component, OnInit } from '@angular/core';
import { EventlistService } from './eventlist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.css'],
  providers: [EventlistService]
})
export class EventlistComponent implements OnInit {

  cityName:any;

  events: any;
  eventsCity: any;

  eventObject:any;

  constructor(public _EventlistService: EventlistService,
    private router: Router) { }

  ngOnInit() {
    this.cityName=localStorage.getItem("grad")

    this.dohvatiEvente();
  }

  dohvatiEvente() {
    this._EventlistService.dohvatiEvente().subscribe(res => {
      console.log(res);
      this.events = res;
      this.eventsCity = [];
      for (let event of this.events) {
        if (event.location === localStorage.getItem("grad")) {
          let eventCity = {
            'name': event.name,
            'id':event.id
          };
          this.eventsCity.push(eventCity);
          //console.log(this.eventsCity);
        }
      }
    });
  }
  deleteEvent(id:any){
    this._EventlistService.obrisiEvent(id).subscribe(res=>{  
   })
   location.reload();
  }
  
  editEvent(id){
    this._EventlistService.dohvatiEvent(id).subscribe(res=>{
      console.log(res)
      this.router.navigate(['/event/'+res['id']]);
    })
  }
}
