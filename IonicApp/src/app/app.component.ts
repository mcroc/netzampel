import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppSettingsService } from '../services/appsettings.service';
import { FunctionModel } from '../models/function.model';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html',
  providers: [AppSettingsService]
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private appSettingsService: AppSettingsService) {
    var af1 = this.appSettingsService.getFunction('az1');
    if(af1 === null || af1 === undefined) {
      af1 = new FunctionModel('az1', "", "HttpTriggerNetzampel", "");
      this.appSettingsService.setFunction(af1);
    }

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
