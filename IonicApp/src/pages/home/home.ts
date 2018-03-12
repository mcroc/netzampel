import { Component, Directive } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';
import { DeviceService } from '../../services/device.service';
import { DeviceModel } from '../../models/device.model';
import { AppSettingsService } from '../../services/appsettings.service';
import { FunctionModel } from '../../models/function.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [DeviceService, AppSettingsService]
})
export class HomePage {
  deviceRed = new DeviceModel("red","rot", "danger");
  deviceYellow = new DeviceModel("yellow", "gelb", "dark");
  deviceGreen = new DeviceModel("green", "grün", "secondary");
  deviceList: Array<DeviceModel> = new Array<DeviceModel>(this.deviceRed, this.deviceYellow, this.deviceGreen); 
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private deviceService: DeviceService, private appSettingsService: AppSettingsService) {
    
  }

  switchDevice(device: any): void {
    for (let deviceFromList of this.deviceList) {
          //deviceFromList.checked = false;
          if(deviceFromList.name == device.name)
          {
            deviceFromList.checked = deviceFromList.checked ? false : true;
          } else {
            deviceFromList.checked = false;
          }

          if(deviceFromList.checked) {
            var af1 = this.appSettingsService.getFunction('az1');
            console.log("switchDevice");
            console.log(af1);
            this.deviceService.setAmpel(deviceFromList.name, af1);
          }
    }
  }
}
