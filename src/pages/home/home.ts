import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import {WeatherreportProvider} from '../../providers/weatherreport/weatherreport';
import { Chart } from 'chart.js';
import { Storage } from '@ionic/storage'; 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    @ViewChild('doughnutCanvas')doughnutCanvas;
    doughnout:any;
    currentTemp:number;
    maxTemp:number;
    minTemp:number;
    description:any;
    wind:any;
    humidity:any;
    tempObj:any;
    country:string;
    city:string;
    error:any;
    time:any;
    evening:boolean = false;
    clearSky:boolean = true;
    classes:any = {
      "default":true,
      "evening":false,
      "clearSky":false,
      "rainy":false,
    }
    color:string[];
    
  constructor(public navCtrl: NavController, public weatherreport:WeatherreportProvider, public storage:Storage) {
    
    this.storage.get('place').then((val)=>{
      val = JSON.parse(val);
      if(val!=null)
        {
          this.city = val.city;
          this.country = val.country;
        }
      else
        {
          this.city = "Pali";
          this.country = "India";
        }
    
    weatherreport.getWeather(this.city, this.country).subscribe(res =>{
      this.getTime();
      if(res.coord)
      {
      this.currentTemp = Math.round(res.main.temp - 273.15);
      this.description = res.weather[0].main;
      this.maxTemp = Math.round(res.main.temp_max - 273.15);
      this.minTemp = Math.round(res.main.temp_min - 273.15);
      this.wind = Math.round(res.wind.speed);
      this.humidity = Math.round(res.main.humidity);
      if(this.description != "Clear")
      {
        this.clearSky = false;
      }
      this.setCss();
      this.doughnout = new Chart(this.doughnutCanvas.nativeElement,{
        type: 'doughnut',
        data:{
          labels:['Humidity'],
          datasets:[{
            //label:['Humidity', 'Not'],
            data:[this.humidity, (100 - this.humidity)],
            backgroundColor:this.color,
            borderWidth:1,
            
          }]
        },
        options:{
          cutoutPercentage:80,
          responsive: true,
          maintainAspectRatio: false,
        }
        

      })
      //place here too
    }
    else
    {
      alert("error occured here");
    }
  })
  //place here
});
  }

  getTime()
  {
    var d = new Date();
    this.time = d.getHours();
    if(this.time > 12)
    {
      this.time -= 12;
      if(this.time > 6)
      {
        this.evening = true;
      }
    }

  }
  
  setCss()
  {
    //this color array is created to change the color of doghnut chart.js
    
    if(this.clearSky && this.evening)
    {
      this.classes.default = false;
      this.classes.evening = true;
      this.color = ['#212121', '#616161'];
    }
    else if(this.clearSky && !this.evening)
    {
      this.classes.default = false;
      this.classes.clearSky = true;
      this.color = ['#FF8F00', '#FFB300'];
    }
    else if(!this.clearSky && !this.evening)
    {
      this.classes.default = false;
      this.classes.rainy = true;
      this.color = ['#0277BD', '#039BE5'];
    }
    else if(!this.clearSky && this.evening)
    {
      this.classes.default = false;
      this.classes.evening = true;
      this.color = ['#212121', '#616161'];
    }
    else
    {
      this.classes.default = true;
      this.color = ['#FF8F00', '#FFB300'];
    }
  }
}


