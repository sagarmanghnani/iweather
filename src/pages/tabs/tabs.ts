import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from '../home/home';
import {SettingsPage} from '../settings/settings';
import {AboutPage} from '../about/about';

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.home = HomePage;
    this.about = AboutPage;
    this.settings = SettingsPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
