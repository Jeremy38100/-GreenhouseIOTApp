import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { Settings, DisplayMethod } from '../../model';

import { AppService } from '../../services/app.service';

@Component({
  selector: 'settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  public settings : Settings;
  public refreshing: boolean = false;
  public debug: boolean;
  public displayMethods: string[] = Object.keys(DisplayMethod).map((key) => DisplayMethod[key]);

  constructor(
    public navCtrl: NavController, 
    private appService: AppService,
    private toastCtrl: ToastController
  ) { }

  ionViewDidEnter(){
    this.settings = this.appService.getSettings();

    this.debug = this.appService.getDebug();
  }

  save = () => {
    this.appService.saveSettings(this.settings)
    this.toastCtrl.create({
      message: 'Settings saved.',
      duration: 3000,
      position: 'bottom'
    }).present();
  }

}