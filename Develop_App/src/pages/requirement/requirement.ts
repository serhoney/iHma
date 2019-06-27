import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

// @IonicPage()
@Component({
  selector: 'page-requirement',
  templateUrl: 'requirement.html',
})
export class RequirementPage {

  ages: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {
  }


  ngAfterViewInit(): void {
    this.ages = { lower: 1, upper: 120 };
  }

  /**
   * This function dismiss the popup modal
   */
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
