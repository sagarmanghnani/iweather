import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {TabsPage} from '../tabs/tabs';
import {HomePage} from '../home/home';
import { Storage } from '@ionic/storage'; 
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  city:string;
  country:string;
  location:FormGroup;
  submitAttempt:boolean = false;
  night:boolean;
  clear:boolean;
  classes:any = {
    "default":true,
    "evening":false,
    "clearSky":false,
    "rainy":false,
  }
  constructor(public navCtrl: NavController,
     public navParams: NavParams, 
     public formBuilder:FormBuilder, 
     public appctrl:App,
    public storage:Storage,
  ) 
  {
    this.location = formBuilder.group({
      city:['', Validators.compose([Validators.pattern('[a-zA-z]*'), Validators.required])],
      country:['', Validators.compose([Validators.pattern('[a-zA-z]*'),Validators.required])]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
    this.storage.get('aboutCondition').then((val) => {
      this.night = val.nights;
      this.clear = val.clear;
      if(this.clear && this.night)
      {
        this.classes.default = false;
        this.classes.evening = true;
      }
      else if(this.clear && !this.night)
      {
        this.classes.default = false;
        this.classes.clearSky = true;      
       }
      else if(!this.clear && !this.night)
      {
        this.classes.default = false;
        this.classes.rainy = true;
        
      }
      else if(!this.clear && this.night)
      {
        this.classes.default = false;
        this.classes.evening = true;
        
      }
      else
      {
        this.classes.default = true;
        
      }
      
    });
   }
  




  submit()
  {
    var place = {
      city:this.location.get('city').value,
      country:this.location.get('country').value,
    }
    
    this.storage.set('place', JSON.stringify(place));
    this.submitAttempt = true;
    this.appctrl.getRootNav().push(TabsPage);
  }
}
