import { Injectable } from '@angular/core';

@Injectable()
export class AppConfigProvider {
  webAPI:any;
  constructor() {
    console.log('Hello AppConfigProvider Provider');
    this.webAPI = 'http://www.ihma-application.com/www_web_api';
  }

}
