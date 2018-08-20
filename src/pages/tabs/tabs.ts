import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from '../home/home';
import {SettingsPage} from '../settings/settings';
import {AboutPage} from '../about/about';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  home:any;
  about:any;
  settings:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage) {
    this.home = HomePage;
    this.about = AboutPage;
    this.settings = SettingsPage;
  }
  night:boolean;
  clear:boolean;
  classes:any = {
    "default":true,
    "evening":false,
    "clearSky":false,
    "rainy":false,
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
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

}
