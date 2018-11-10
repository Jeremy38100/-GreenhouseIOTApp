import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { DeviceData } from '../../model';

import { AppService } from '../../services/app.service';

@Component({
  selector: 'stats',
  templateUrl: 'stats.html'
})
export class StatsPage {

  public lineChartData:Array<any> = [
    {data: [], label: 'Humidité'}
  ];
  public lineChartLabels:Array<any> = [];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  constructor(
    public navCtrl: NavController, 
    private appService: AppService,
    private toastCtrl: ToastController
  ) {
    this.getData();
  }

  getData = () => {
    this.appService.getApi().getDeviceData()
    .then(data => {
      console.log(data);
      this.lineChartData[0].data.length = 0;
      this.lineChartLabels.length = 0;
      data.forEach((deviceData: DeviceData) => {
        this.lineChartData[0].data.push(deviceData.data.humidity);
        this.lineChartLabels.push("");
      });
      console.log(this.lineChartData);
    })
    .catch(err => {
      console.error(err);
    });
  }

  chartClicked = (e:any):void => {
    console.log(e);
  }

}