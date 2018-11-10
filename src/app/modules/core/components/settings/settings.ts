import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { Settings } from '../../model';

import { AppService } from '../../services/app.service';

@Component({
  selector: 'settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  public settings : Settings;
  public refreshing: boolean = false;
  public debug: boolean;

  constructor(
    public navCtrl: NavController, 
    private appService: AppService,
    private toastCtrl: ToastController
  ) {
    this.appService.getSettings().then(settings => {
      this.settings = settings;
      console.log(this.settings);
    })
    .catch(err => console.error(err));
    this.debug = this.appService.getDebug();
  }

  save = () => {
    this.appService.saveSettings(this.settings)
    .then(() => {
      console.log("settings saved");
      this.toastCtrl.create({
        message: 'Settings saved.',
        duration: 3000,
        position: 'bottom'
      }).present();
    })
    .catch(err => console.error(err));
  }

}