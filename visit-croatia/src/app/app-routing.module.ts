import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CitiesComponent } from './cities/cities.component';
import { EventComponent } from './event/event.component';
import { EventlistComponent } from './eventlist/eventlist.component';
import { UpdateEventComponent } from './update-event/update-event.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'cities',
    component: CitiesComponent
  },
  {
    path:'event',
    component:EventComponent
  },
  {
    path:'eventlist',
    component:EventlistComponent
  },
  {
    path:'event/:_id',
    component:UpdateEventComponent
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
