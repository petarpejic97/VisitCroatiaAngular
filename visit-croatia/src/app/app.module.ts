import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CitiesComponent } from './cities/cities.component';
import { EventComponent } from './event/event.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { EventlistComponent } from './eventlist/eventlist.component';
import { UpdateEventComponent } from './update-event/update-event.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CitiesComponent,
    EventComponent,
    EventlistComponent,
    UpdateEventComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    DropdownModule
  ],
  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
