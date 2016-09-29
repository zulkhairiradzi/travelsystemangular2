import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';
import {TravelDashboardComponent} from './traveldashboard';
import {TravelListComponent} from './travellist';
import {TravelListForm} from './travelform';
import { FormsModule }   from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
      FormsModule
  ],
  declarations: [
      TravelDashboardComponent,
      TravelListComponent,
      TravelListForm
            
  ],
  exports: [
      TravelDashboardComponent,
      TravelListForm
      
  ]
})
export class TravelModule {}
