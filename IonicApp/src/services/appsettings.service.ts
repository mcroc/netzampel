import { Injectable } from "@angular/core";
import 'rxjs/Rx';

import { Http, Response } from "@angular/http";
import { FunctionModel } from '../models/function.model';

@Injectable()
export class AppSettingsService {

    constructor(
        private http: Http) {        
    }

    getAll(): Array<FunctionModel> {
        var functions = new Array<FunctionModel>();
        var json = localStorage.getItem('af1');
        if(json !== undefined && json !== null) {
            functions.push(JSON.parse(json));
        }
        var json = localStorage.getItem('af2');
        if(json !== undefined && json !== null) {
            functions.push(JSON.parse(json));
        }
        var json = localStorage.getItem('af3');
        if(json !== undefined && json !== null) {
            functions.push(JSON.parse(json));
        }
        return functions;
    }

    getFunction(name: string): FunctionModel {
        console.log("getFunction -> " + name);
        var json = localStorage.getItem(name);
        console.log(JSON.parse(json));
        return JSON.parse(json);
    }
    
    setFunction(azureFunction: FunctionModel): boolean {
        console.log(azureFunction);
        localStorage.setItem(azureFunction.name, JSON.stringify(azureFunction));
        return true;
    }
}
