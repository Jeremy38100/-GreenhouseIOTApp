import { Component } from '@angular/core';
import { NavController, PopoverController, LoadingController, Events } from 'ionic-angular';

import { NetworkConnectionType, AppEvents, DeviceData } from '../../model';

import { AppService } from '../../services/app.service';
import { LogService } from '../../services/log.service';

import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public displayNetworkError: boolean = false;
  public lastData: DeviceData;

  constructor(
    public navCtrl: NavController, 
    private popoverCtrl: PopoverController,
    private appService: AppService,
    private logService: LogService,
    private loadingCtrl: LoadingController,
    private events: Events
  ) {}

  ionViewDidLoad(){
    this.initNetworkListener();
    setTimeout(() => {
      this.refreshData();
    }, 500);
    this.initSocketListener();
  }
  
  doRefresh = (event) => {
  	this.refreshData(event);
  }

  refreshData = (refresher?) => {
    if (refresher) {
      refresher.complete();
    }
    if (this.appService.getNetworkType() && this.appService.getNetworkType() !== NetworkConnectionType.NONE) {
      this.getCurrentData();
      this.displayNetworkError = false;
    } else {
      this.displayNetworkError = true;
    }
  }

  initSocketListener = () => {
    this.appService.onSocketMessage().subscribe(message => {
      let deviceData = <DeviceData>message;
      this.lastData = deviceData;
    });
  }

  goToSettings = () => {
    this.navCtrl.setRoot(SettingsPage);
  }

  getCurrentData = () => {
    this.appService.getApi().getLastDeviceData()
    .then(data => {
      console.log(data);
      this.lastData = <DeviceData>data;
    })
    .catch(err => {
      console.error(err);
    });
  }

  initNetworkListener = (): void => {
    this.events.subscribe(AppEvents.NETWORK_CONNECT, () => {
      this.displayNetworkError = false;
    });
    this.events.subscribe(AppEvents.NETWORK_DISCONNECT, () => {
      this.displayNetworkError = true;
    });
  }

}
