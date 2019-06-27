
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataProvider {

  constructor(public http: HttpClient) { }

  /**
   * --------------------------------------------------------
   * Get List of Users
   * --------------------------------------------------------
   */
  getUserList() {
    return Observable.create(observer => {
      return this.http.get('assets/data/data.json').subscribe((result: any) => {
        observer.next(result.Users);
        observer.complete();
      });
    });
  }
  getDogList() {
    return Observable.create(observer => {
      return this.http.get('assets/data/user.json').subscribe((result: any) => {
        observer.next(result.Users);
        observer.complete();
      });
    });
  }

  /**
   * --------------------------------------------------------
   * Slider Data
   * --------------------------------------------------------
   */
  profileSlider() {
    return [
      {
        "title": "Get Tinder Gold",
        "details": "See who likes you & more!"
      },
      {
        "title": "Get Matches Faster",
        "details": "Limit what others see tinder plus"
      },
      {
        "title": "Stand Out With Super Likes",
        "details": "You are 3x more likely to get a match"
      },
      {
        "title": "Swipe Around The World",
        "details": "Passport to anywhere with tinder plus"
      },
      {
        "title": "Control Your Profile",
        "details": "Limit what others see tinder plus"
      },
      {
        "title": "I Meant to Swipe Right",
        "details": "Get unlimited to Rewinds with tinder plus"
      },
      {
        "title": "Increase Your Chances",
        "details": "Get unlimited likes with tinder plus"
      }
    ]
  }
}
