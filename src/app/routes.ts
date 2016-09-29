/// <reference path="../../typings/index.d.ts"/>

import {Component} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main';
import {TravelListForm} from './travel/travelform';
@Component({
  selector: 'fountain-root',
  template: '<router-outlet></router-outlet>'
})
export class RootComponent {}

export const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
    {
    path: 'form',
    component: TravelListForm
  },
];

export const routing = RouterModule.forRoot(routes);
