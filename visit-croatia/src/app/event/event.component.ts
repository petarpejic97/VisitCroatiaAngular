import { Component, OnInit, ModuleWithComponentFactories } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from './event.service';
import {SelectItem} from 'primeng/api';
import * as moment from 'moment'
import { Button } from 'protractor';
import { DeprecatedI18NPipesModule } from '@angular/common';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
  providers: [EventService]
})
export class EventComponent implements OnInit {

  korisnik:any;
  event: any;
  parametriSlanje: any;

  types: SelectItem[];
  locations:SelectItem[];

  selectedType: string ="";
  selectedLocation:string="";

  error: boolean = false;
  errorPass:string;

  constructor( public _eventService: EventService,
    private router: Router) { }

  ngOnInit() {
    
    this.korisnik = {
      'name': localStorage.getItem('ime'),
      'email': localStorage.getItem('email'),
      'phone': localStorage.getItem('telefon')
    }
    this.event = {
      'name': "",
      'dateStart': new Date(),
      'time': new Date(0,0)
    }
    this.types = [
      {label: 'Business', value: 'Business'},
      {label: 'Cultural manifestation', value: 'Cultural manifestation'},
      {label: 'Art', value: 'Art'},
      {label: 'Show', value: 'Show'},
      {label: 'Film', value: 'Film'},
      {label: 'Music', value: 'Music'},
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
      {label: 'Slavonski Brod', value: 'Slavonski Brod'},
      {label: 'Rijeka', value: 'Rijeka'},
      {label: 'Pula', value: 'Pula'},
      {label: 'Varaždin', value: 'Varaždin'},
      {label: 'Vukovar', value: 'Vukovar'},
      {label: 'Sisak', value: 'Sisak'},
      {label: 'Šibenik', value: 'Šibenik'},
      {label: 'Dubrovnik', value: 'Dubrovnik'},
      {label: 'Velika Gorica', value: 'Velika Gorica'},
      {label: 'Bjelovar', value: 'Bjelovar'},
      {label: 'Koprivnica', value: 'Koprivnica'},
      {label: 'Đakovo', value: 'Đakovo'},
      {label: 'Karlovac', value: 'Karlovac'},
      {label: 'Kaštela', value: 'Kaštela'},
      {label: 'Sesvete', value: 'Sesvete'},

  ];

  }
  createEvent(){
    let hours = Number(moment(this.event.time).format("HH:mm").substr(0,2))
    let minutes = Number(moment(this.event.time).format("HH:mm").substr(3,5))
    console.log(typeof this.event.time)
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
    this.checkFields();
  }

  checkFields(){

    if(this.event.name === "" || this.selectedLocation === "" ||this.selectedType === "" ){
      this.error=true;
      this.errorPass="Some fields are empty!"
    }
    // else if(this.event.dateStart < (new Date()){
    //   this.error=true;
    //   this.errorPass="Date isn't correct!"
    // }
    else{
        this.error=false;
        this.errorPass="";
        this._eventService.createEvent(this.parametriSlanje).subscribe(res => {
        });
        location.reload();
        }
  }

  logoff(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  randomImg() {
    if(this.selectedType === "Education")
    document.getElementById('img-container').innerHTML = '<img src="https://source.unsplash.com/collection/6782142/" style="height: 100%;object-fit: cover; width:100%"; >';
    
    else if(this.selectedType === "Party")
    document.getElementById('img-container').innerHTML = '<img src="https://source.unsplash.com/collection/6782141/" style="height: 100%;object-fit: cover; width:100%"; >';
    
    else if(this.selectedType === "Film")
    document.getElementById('img-container').innerHTML = '<img src="https://source.unsplash.com/collection/6782136/" style="height: 100%;object-fit: cover; width:100%"; >';
    
    else if(this.selectedType === "Music")
    document.getElementById('img-container').innerHTML = '<img src="https://source.unsplash.com/collection/6782134/" style="height: 100%;object-fit: cover; width:100%"; >';
   
    else if(this.selectedType === "Show")
    document.getElementById('img-container').innerHTML = '<img src="https://source.unsplash.com/collection/6782129/" style="height: 100%;object-fit: cover; width:100%"; >';
    
    else if(this.selectedType === "Art")
    document.getElementById('img-container').innerHTML = '<img src="https://source.unsplash.com/collection/6782125/" style="height: 100%;object-fit: cover; width:100%"; >';
   
    else if(this.selectedType === "Cultural manifestation")
    document.getElementById('img-container').innerHTML = '<img src="https://source.unsplash.com/collection/6782123/" style="height: 100%;object-fit: cover; width:100%"; >';
   
    else if(this.selectedType === "Business")
    document.getElementById('img-container').innerHTML = '<img src="https://source.unsplash.com/collection/6782120/" style="height: 100%;object-fit: cover; width:100%"; >';

    else if(this.selectedType === "Sport")
    document.getElementById('img-container').innerHTML = '<img src="https://source.unsplash.com/collection/6782119/" style="height: 100%;object-fit: cover; width:100%"; >';
    
    else 
    document.getElementById('img-container').innerHTML = '<img src="https://source.unsplash.com/random" style="height: 100%;object-fit: cover; width:100%"; >';
  }

}
