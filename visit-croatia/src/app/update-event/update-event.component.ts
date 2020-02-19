import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UpdateEventService } from './update-event.service';
import {SelectItem} from 'primeng/api';
import * as moment from 'moment'

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css'],
  providers: [UpdateEventService]
})
export class UpdateEventComponent implements OnInit {

  korisnik:any;
  event: any;
  parametriSlanje: any;

  types: SelectItem[];
  selectedType: string = 'Bussines';
  locations:SelectItem[];
  selectedLocation:string="Vinkovci"
  
  type: string;
  location:string;

  eventId:any;

  tempDate:Date;

  constructor(public _updateEventService: UpdateEventService,
    private router: Router,
    private _route: ActivatedRoute
    ) {
      this.eventId = this._route.snapshot.params['_id'];
      //console.log(this.eventId);
    }

  ngOnInit() 
  {
    this.korisnik = {
      'name': localStorage.getItem('ime'),
      'email': localStorage.getItem('email'),
      'phone': localStorage.getItem('telefon')
    }

    this.event={
      'name' : '',
      'dateStart': new Date(),
      'time': new Date(),
      'location': '',
      'type': ''
      }

    this.types = [
      {label: 'Business', value: 'Business'},
      {label: 'Cultural manifestation', value: 'Cultural manifestation'},
      {label: 'Art', value: 'Art'},
      {label: 'Show', value: 'Show'},
      {label: 'Film', value: 'Film'},
      {label: 'Music', value: 'music'},
      {label: 'Party', value: 'Party'},
      {label: 'Sport', value: 'Sport'},
      {label: 'Education', value: 'Education'},
      {label: 'Other', value: 'Other'}
      ];

     this.locations = [
      {label: 'Vinkovci', value: 'Vinkovci'},
      {label: 'Zagreb', value: 'Zagreb'},
      {label: 'Split', value: 'Split'},
      {label: 'Zadar', value: 'Zadar'},
      {label: 'Osijek', value: 'Osijek'},
      {label: 'Rijeka', value: 'Rijeka'}
      ];

    this.dohvatiEvent();
  }

  dohvatiEvent() {
    this._updateEventService.dohvatiEvent(this.eventId).subscribe(res => {
      this.event={
      'name' : res['name'],
      'dateStart':new Date(res['dateStart']),
      'time': moment(res['dateStart']).format("HH:mm"),
      'location':res['location'],
      'type':res['type']
      }
      this.selectedLocation = this.event.location;
      this.selectedType=this.event.type; 
    });
  }

  updateEvent()
  {
    if (typeof this.event.time == 'object'){

    let hours = Number(moment(this.event.time).format("HH:mm").substr(0,2))
    let minutes = Number(moment(this.event.time).format("HH:mm").substr(3,5))
    this.event.time=new Date(this.event.time)
    this.parametriSlanje={
      'name':this.event.name,
      'dateStart':this.event.dateStart,
      'location':this.selectedLocation,
      'type':this.selectedType,
      'createdBy':localStorage.getItem("ime"),
    }
    this.parametriSlanje.dateStart.setHours(hours)
    this.parametriSlanje.dateStart.setMinutes(minutes)
    this.parametriSlanje.dateStart=moment(this.parametriSlanje.dateStart).format("YYYY-MM-DDTHH:mm:00.000");
    console.log(this.parametriSlanje)
    this._updateEventService.updateEvent(this.eventId, this.parametriSlanje).subscribe(res => {
       console.log(res)
       this.router.navigate(['/eventlist']);
    });
  }

  else if (typeof this.event.time == 'string'){
    this.parametriSlanje={
      'name':this.event.name,
      'dateStart':this.event.dateStart,
      'location':this.selectedLocation,
      'type':this.selectedType,
      'createdBy':localStorage.getItem("ime"),
    }
    this._updateEventService.updateEvent(this.eventId, this.parametriSlanje).subscribe(res => {
    console.log(res)
     this.router.navigate(['/eventlist']);
    });
    }
  }

  logoff(){
    this.router.navigate(['/login']);
  }
}
