import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';


//injecting storage so this service can be used to save and store data across all pages
@Injectable({
  providedIn: 'root',
})
export class DataService {
  //injecting the service storage and initializing it
  constructor(private storage: Storage) {
    this.init();
  }

  //creates the storgage before it can store any data
  async init() {
    await this.storage.create();
  }

    //set method, values are stored using a key string and a value anything
  async set(key: string, value:any) {
    await this.storage.set(key, value);
  }

    //get method, loads values from storage searching for the string key
  async get(key:string) {
    return await this.storage.get(key)
  }
}
