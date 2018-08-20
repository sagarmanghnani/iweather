import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the WeatherreportProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WeatherreportProvider {
  apiKey = "3cf05012b4055608cf3b66234acc1f43";
  url;
  constructor(public http: Http) {
    console.log('Hello WeatherreportProvider Provider');
  }

  getWeather(city,country)
  {
    return this.http.get("https://api.openweathermap.org/data/2.5/weather?q="+city+","+country+"&appid="+this.apiKey+"").map(res => res.json());
  }
}
