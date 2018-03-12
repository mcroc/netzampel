export class DeviceModel {
    name: string;
    label: string;
    color: string;
    checked: boolean;
   constructor(name: string,label: string, color: string) { 
        this.checked = false;
        this.color = color;
        this.name = name;
        this.label = label;
   }
}