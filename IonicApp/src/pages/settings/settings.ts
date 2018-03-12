import { Component } from '@angular/core';
import { NavController, NavParams, Loading, IonicPage } from 'ionic-angular';
import { Http } from '@angular/http';
import { AppSettingsService } from '../../services/appsettings.service';
import { FunctionModel } from '../../models/function.model';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
  providers: [AppSettingsService]
})
export class SettingsPage {
  url:string = '';
  queue:string = '';
  code:string = '';

  constructor(public navCtrl: NavController, private appSettingsService: AppSettingsService) {

  }

  ngOnInit() {
    var af1 = this.appSettingsService.getFunction('az1');
    this.url = af1.url;
    this.queue = af1.queue;
    this.code = af1.code;
  }

  reset() {
    var af1 = this.appSettingsService.getFunction('az1');
    this.url = af1.url;
    this.queue = af1.queue;
    this.code = af1.code;
  }

  save() {
    event.preventDefault();
    var af1 = new FunctionModel('az1', this.url, this.queue, this.code);
    this.appSettingsService.setFunction(af1);
  }
}
