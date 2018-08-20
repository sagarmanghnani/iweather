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
