import { NgModule } from '@angular/core';

import { HomePage } from './components/home/home';
import { SettingsPage } from './components/settings/settings';
import { TabsPage } from './components/tabs/tabs';
import { StatsPage } from './components/stats/stats';
import { LessonsPage } from './components/lessons/lessons';
import { LessonPage } from './components/lesson/lesson';

import { IonicModule } from 'ionic-angular';
import { ChartsModule } from 'ng2-charts';
import { Ionic2RatingModule } from 'ionic2-rating';

import { APIService } from './services/api.service';
import { AppService } from './services/app.service';
import { ConfigService } from './services/config.service';
import { HttpService } from './services/http.service';
import { LessonService } from './services/lesson.service';
import { LogService } from './services/log.service';
import { NetworkService } from './services/network.service';
import { SocketService } from './services/socket.service';
import { StorageService } from './services/storage.service';

import { Network } from '@ionic-native/network';

@NgModule({
  declarations: [
    HomePage,
    SettingsPage,
    TabsPage,
    StatsPage,
    LessonsPage,
    LessonPage
  ],
  entryComponents: [
    HomePage,
    SettingsPage,
    TabsPage,
    StatsPage,
    LessonsPage,
    LessonPage
  ],
  imports: [
    IonicModule,
    ChartsModule,
    Ionic2RatingModule
  ],
  exports: [
  ],
  providers: [
    APIService,
    AppService,
    ConfigService,
    HttpService,
    LessonService,
    LogService,
    NetworkService,
    SocketService,
    StorageService,
    Network
  ]
})
export class CoreModule {};
