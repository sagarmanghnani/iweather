import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  night:boolean;
  clear:boolean;
  classes:any = {
    "default":true,
    "evening":false,
    "clearSky":false,
    "rainy":false,
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  ionViewWillEnter(){
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
