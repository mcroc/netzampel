import { Injectable } from "@angular/core";
import 'rxjs/Rx';

import { Http, Response } from "@angular/http";
import { FunctionModel } from '../models/function.model';

@Injectable()
export class DeviceService {

    constructor(
        private http: Http) {        
    }

    setAmpel(color: string, azureFunction: FunctionModel): Promise<any> {
        //var url = 'https://netzampel.azurewebsites.net/api/HttpTriggerRed?name=' + deviceFromList.name + '&code=vyKer3nl2IUPhVDRCOy6eJ9wNwetvBCuatvjFazhJPYamXzs1EOPbQ==';
        var url = azureFunction.url;
        console.log("setAmpel -> " + url);
        if(!url.endsWith('/')) {
            url = url + '/';
        }
        url = url + azureFunction.queue;
        console.log("setAmpel -> " + url);
        return this.http.get(url + '?name=' + color + '&code=' + azureFunction.code)
            .toPromise()
            .then((response: Response) => {
                return true;
            })
            .catch(this.handleErrorPromise);
    }
    
    private handleErrorPromise(error: any): Promise<void> {
        try {
            error = JSON.parse(error._body);
        } catch (e) {
        }

        let errMsg = error.errorMessage
            ? error.errorMessage
            : error.message
            ? error.message
            : error._body
            ? error._body
            : error.status
            ? `${error.status} - ${error.statusText}`
            : 'unknown server error';

        //return Promise.reject(errMsg);
        return Promise.resolve();
    }
}
