import {Component, Inject, Injectable, Input} from '@angular/core';
import {DatePipe} from "@angular/common";
import {Http} from '@angular/http';

@Component({
  selector: 'fountain-travel-list',
  template: require('./travellist.html')
})
export class TravelListComponent {
    public data = "";
    constructor(public http:Http) {
       http.get("http://localhost:8080/travelbooking/getPendingBooking")
            .subscribe((data)=> {
                setTimeout(()=> {
                    this.data = data.json();
                }, 1000);
            });
        
    }
     
     parseData(date) {
         
         console.log("the date is" + date);
         
         return new Date(date);
             
     }
}
