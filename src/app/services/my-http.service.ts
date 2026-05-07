import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpOptions } from '@capacitor/core';

//injects the service to be used in all pages
@Injectable({
  providedIn: 'root',
})
export class MyHttpService {
  
  constructor() {}
  //get is the request to a url, httpOptions has the url stored
  //needs to be async to wait for the reply before finishing operation
  public async get(options: HttpOptions) {
    //CapacitorHttp makes the request and returns the response to the requestor at any page
    return await CapacitorHttp.get(options)
  }
}
