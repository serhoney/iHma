import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MydogUserDetailsPage } from '../mydog-user-details/mydog-user-details';

// @IonicPage()
@Component({
  selector: 'page-my-dog-details',
  templateUrl: 'my-dog-details.html',
})
export class MyDogDetailsPage {

  public base64Image: string;
  img1: any = '../my-dog-details/assets/imgs/001.jpg';
  img2: any = '../my-dog-details/assets/imgs/002.jpg';
  img3: any = '../my-dog-details/assets/imgs/003.jpg';
  img4: any = '../my-dog-details/assets/imgs/004.jpg';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private camera: Camera,
    public modalCtrl: ModalController) {
    }

  takePhoto(num) {
    // Camera Options
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 500,
      targetHeight: 500
    }
    this.camera.getPicture(options).then((base64String: string) => {
      this.base64Image = "data:image/*;base64," + base64String;

      if (num == 1) {
        this.img1 = this.base64Image;
      }
      if (num == 2) {
        this.img2 = this.base64Image;
      }
      if (num == 3) {
        this.img3 = this.base64Image;
      }
      if (num == 4) {
        this.img4 = this.base64Image;
      }
    }, (err) => {
      console.log(err);
    });
  }


  /**
   * --------------------------------------------------------------
   *  Open Profile Details Page
   * --------------------------------------------------------------
   * @method    goToMyDogUserDetailsPage
   */
  goToUserDetailsPage() {
    this.modalCtrl.create(MydogUserDetailsPage).present();
  }

  /**
   * This function dismiss the popup modal
   */
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
