export class FunctionModel {
    name: string;
    url: string;
    queue: string;
    code: string;
   constructor(name: string, url: string, queue: string, code: string) { 
        this.url = url;
        this.name = name;
        this.queue = queue;
        this.code = code;
   }
}