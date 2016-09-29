import {Component} from '@angular/core';
import { Injectable } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Http } from '@angular/http';
import {Travel} from './travel.ts';
import { Headers, RequestOptions } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

@Component({
  selector: 'fountain-travel-form',
  template: require('./travelform.html')
  
})

@Injectable()
export class TravelListForm {
     constructor(public http: Http) { 
        this.http = http;
     }
    public model = new Travel("HongKong","2016-10-15T12:00:00Z","2016-10-21T12:00:00Z","Air","1500","50","50","500","500");
    
    onSubmit() {
        
       let travel = JSON.stringify(this.model );
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        console.log("form value" + travel);
        
        this.http.post("http://localhost:8080/travelbooking/editBooking", travel, options).toPromise()
             .then(this.extractData)
             .catch(this.handleError);
            console.log("request complete");
        
    }

    extractData() {
      
        console.log("request complete in extract");
      
    }
    handleError (error: any) {
      // In a real world app, we might use a remote logging infrastructure
      // We'd also dig deeper into the error to get a better message
      let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
        
      return Promise.reject(errMsg);
    }
}