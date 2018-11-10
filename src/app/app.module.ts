import { NgModule, ErrorHandler, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';

import { NetworkConnectionType } from './modules/core/model';

import { AppService } from './modules/core/services/app.service';
import { APIService } from './modules/core/services/api.service';
import { ConfigService } from './modules/core/services/config.service';
import { LogService } from './modules/core/services/log.service';
import { NetworkService } from './modules/core/services/network.service';
import { SocketService } from './modules/core/services/socket.service';

import { CoreModule } from './modules/core/core.module';

export function initializeApp(
  apiService: APIService, 
  configService: ConfigService, 
  socketService: SocketService, 
  logService: LogService, 
  networkService: NetworkService,
  appService: AppService
 ) {
  return () => { 
    return new Promise((resolve, reject) => {
      apiService.initRoutes();
      configService.load('prod');
      apiService.loadConfig();
      logService.loadLogs();
      apiService.loadToken()
      .then(token => {
        socketService.loadConfig();
        if (networkService.getType() && networkService.getType() !== NetworkConnectionType.NONE) {
          socketService.initSocket();
        }
        resolve();
      })
      .catch(err => {
        console.error(err);
        reject(err);
      });
    });
  }
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    CoreModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    { 
      provide: APP_INITIALIZER, 
      useFactory: initializeApp, 
      deps: [
        APIService, 
        ConfigService, 
        SocketService, 
        LogService, 
        NetworkService
      ], 
      multi: true
    }
  ]
})
export class AppModule {}
