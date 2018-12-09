import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DeviceData, Settings, DisplayMethod } from '../../model';

import { AppService } from '../../services/app.service';

import * as moment from 'moment';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'stats',
  templateUrl: 'stats.html'
})
export class StatsPage {

  public lineChartData:Array<any> = [
    {data: [], label: 'Humidité (%)'}
  ];
  public lineChartLabels:Array<any> = [];
  public lineChartOptions:any = {
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 100
        }
      }]
    }
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
  public settings: Settings;
  public isDataAvailable: boolean = false;
  public displayMethods: string[] = Object.keys(DisplayMethod).map((key) => DisplayMethod[key]);
  private data: DeviceData[];
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  constructor(
    public navCtrl: NavController, 
    private appService: AppService
  ) {}

  ionViewWillEnter(){
    console.log("Init data");
    this.initData();
  }

  initData = () => {
    this.settings = this.appService.getSettings();
    this.getData();
  }

  getData = () => {
    this.appService.getApi().getDeviceData()
    .then(data => {
      this.data = data;
      this.setData();
    })
    .catch(err => {
      console.error(err);
    });
  }

  reloadChart = () => {
    console.log("Updating chart");
    if (this.chart !== undefined) {
      this.chart.chart.update();
    }
    this.isDataAvailable = true;
  }

  setData = () => {
    this.isDataAvailable = false;
    this.lineChartData[0].data.length = 0;
    this.lineChartLabels.length = 0;

    switch (this.settings.displayMethod) {
      case DisplayMethod.LAST_HOUR:
        this.setLastHourData(this.data);
        break;
      case DisplayMethod.LAST_DAY:
        this.setLastDayData(this.data);
        break;
      case DisplayMethod.LAST_WEEK:
        this.setLastWeekData(this.data);
        break;
      case DisplayMethod.LAST_MONTH:
        this.setLastMonthData(this.data);
        break;
      default:
        break;
    }
    console.log(this.lineChartData);
    this.reloadChart();
  }

  setLastHourData = (data: any[]) => {
    let occurences = [];
    for (let i = 0; i < 12; i++) {
      occurences.push(0);
      let date = moment().subtract(i * 5, 'minutes');
      this.lineChartData[0].data.push(0);
      this.lineChartLabels.splice(0, 0, date.format('HH:mm'));
    }
    data.forEach((deviceData: DeviceData) => {
      let date = moment(deviceData.createdDate);
      if (date.isBetween(moment().subtract(60, 'minutes'), moment())) {
        let index = Math.round((60 - moment().minute() + moment(deviceData.createdDate).minute() - 1) / 5);
        index = (index >= 12 ? index - 12 : index);
        occurences[index] = occurences[index] + 1;
        this.lineChartData[0].data[index] += 100 - (deviceData.data.humidity / 1024) * 100;
      }
    });
    for (let i = 0; i < this.lineChartData[0].data.length; i++) {
      this.lineChartData[0].data[i] = this.lineChartData[0].data[i] / (occurences[i] ? occurences[i] : 1)
    }
  }

  setLastDayData = (data: any[]) => {
    let occurences = [];
    for (let i = 0; i < 24; i++) {
      occurences.push(0);
      let hour = moment().subtract(i, 'hours');
      this.lineChartData[0].data.push(0);
      this.lineChartLabels.splice(0, 0, hour.format('HH') + ':00');
    }
    data.forEach((deviceData: DeviceData) => {
      let date = moment(deviceData.createdDate);
      if (date.isBetween(moment().subtract(1, 'days'), moment())) {
        let index = 24 - moment().hour() + moment(deviceData.createdDate).hour() - 1;
        index = (index >= 24 ? index - 24 : index);
        occurences[index] = occurences[index] + 1;
        this.lineChartData[0].data[index] += 100 - (deviceData.data.humidity / 1024) * 100;
      }
    });
    for (let i = 0; i < this.lineChartData[0].data.length; i++) {
      this.lineChartData[0].data[i] = this.lineChartData[0].data[i] / (occurences[i] ? occurences[i] : 1)
    }
  }

  setLastWeekData = (data: any[]) => {
    let occurences = [];
    for (let i = 0; i < 7; i++) {
      occurences.push(0);
      let day = moment().subtract(i, 'day');
      this.lineChartData[0].data.push(0);
      this.lineChartLabels.splice(0, 0, day.format('DD/MM'));
    }
    data.forEach((deviceData: DeviceData) => {
      let date = moment(deviceData.createdDate);
      if (date.isBetween(moment().subtract(7, 'days'), moment())) {
        let index = 7 - moment().date() + moment(deviceData.createdDate).date() - 1;
        index = (index >= 7 ? index - 7 : index);
        occurences[index] = occurences[index] + 1;
        this.lineChartData[0].data[index] += 100 - (deviceData.data.humidity / 1024) * 100;
      }
    });
    for (let i = 0; i < this.lineChartData[0].data.length; i++) {
      this.lineChartData[0].data[i] = (this.lineChartData[0].data[i] / (occurences[i] ? occurences[i] : 1)).toFixed(1);
    }
  }

  setLastMonthData = (data: any[]) => {
    let occurences = [];
    for (let i = 0; i < 30; i++) {
      occurences.push(0);
      let day = moment().subtract(i, 'day');
      this.lineChartData[0].data.push(0);
      this.lineChartLabels.splice(0, 0, day.format('DD/MM'));
    }
    data.forEach((deviceData: DeviceData) => {
      let date = moment(deviceData.createdDate);
      if (date.isBetween(moment().subtract(30, 'days'), moment())) {
        let index = 30 - moment().date() + moment(deviceData.createdDate).date() - 1;
        index = (index > 30 ? index - 30 : index);
        occurences[index] = occurences[index] + 1;
        this.lineChartData[0].data[index] += (deviceData.data.humidity / 1024) * 100;
      }
    });
    for (let i = 0; i < this.lineChartData[0].data.length; i++) {
      this.lineChartData[0].data[i] = (this.lineChartData[0].data[i] / (occurences[i] ? occurences[i] : 1)).toFixed(1);
    }
  }

  getStringFromDisplayMethod = (method: string) => {
    switch (method) {
      case DisplayMethod.LAST_HOUR:
        return "Sur les 60 dernières minutes";
      case DisplayMethod.LAST_DAY:
        return "Sur les 24 dernières heures";
      case DisplayMethod.LAST_WEEK:
        return "Sur les 7 derniers jours";
      case DisplayMethod.LAST_MONTH:
        return "Sur les 30 derniers jours";
      default:
        return "";
    }
  }

  onMethodChanged = () => {
    this.appService.saveSettings(this.settings);
    this.setData();
  }

  chartClicked = (e:any):void => {
    console.log(e);
  }

}