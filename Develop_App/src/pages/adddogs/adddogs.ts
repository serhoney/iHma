/**
 * This file represents a component of Edit Profile
 * File path - '../../../../src/pages/edit-profile/edit-profile'
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,ToastController,normalizeURL,ModalController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
// import { UserprofileService } from '../../providers/firebase-service/userprofile.service';

import { AppConfigProvider } from '../../providers/app-config/app-config';

import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';


import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'


// import { map } from 'rxjs/operators';
// import 'rxjs/add/operator/map'
// import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';
// import { empty } from 'rxjs/observable/empty';
// import { isEmpty } from 'rxjs/operator/isEmpty';

import { MydogpagePage } from '../mydogpage/mydogpage';
import { HomePage } from '../home/home';

// @IonicPage()
@Component({
  selector: 'page-adddogs',
  templateUrl: 'adddogs.html',
})
export class AdddogsPage {
  public base64Image: string;

  objArrayColor: any;
  objArrayDogBreed: any;

  img1: any;
  img2: any;
  img3: any;
  img4: any;
  img5: any;
  img6: any;

  url_img1: any;
  url_img2: any;
  url_img3: any;
  url_img4: any;
  url_img5: any;
  url_img6: any;

  ages: any;
  years: any;
  months: any;

  photoSrc:any;

  form:any;

  date : any;

  userData : any = {};

  visibility: Boolean = true;
  userId : any;
  province_name : any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private camera: Camera,
    public modalCtrl: ModalController,

    public imagePicker: ImagePicker,
    public cropService: Crop,
    public toastCtrl: ToastController,
    // public userprofileService: UserprofileService,
    public appConfig:AppConfigProvider,
    private nativeGeocoder: NativeGeocoder,
    private transfer: FileTransfer,
    private storage:Storage,

    public http: HttpClient,
    public http2: Http ){
    this.form = {};

    this.url_img1 = "";
    this.url_img2 = "";
    this.url_img3 = "";
    this.url_img4 = "";
    this.url_img5 = "";
    this.url_img6 = "";

    this.date = new Date();
    console.log(this.date.toISOString());
    let me = this;

      this.userId = this.navParams.get('userData');

      this.userData ={
        id  : this.userId.id,
        lat : this.userId.lat,
        lng : this.userId.lng
      }
      // setTimeout(()=>{
        // this.storage.get('userData').then((val) => {
        //   me.userData ={
        //     id: val.id,
        //     lat : val.lat,
        //     lng : val.lng
        //   }
        //   });
      //},1000);

      var webservicedogcolor = this.appConfig.webAPI+"/webservice/ws_list_color.php";
      this.http.get(webservicedogcolor)
      .pipe(
        map(res => res)
      ).subscribe((data:any) => {
            this.objArrayColor = data.results;
            console.log(this.objArrayColor);
          });

      var webservicedogbreed = this.appConfig.webAPI+"/webservice/ws_list_dog_breed.php";
      this.http.get(webservicedogbreed)
      .pipe(
        map(res => res)
      ).subscribe((data:any) => {
            this.objArrayDogBreed = data.results;
            console.log(this.objArrayColor);
          });

      // var webservicedogcolor = this.appConfig.webAPI+"/webservice/ws_list_color.php";
      // this.http.get(webservicedogcolor)
      // .map(res => res.json())
      // .subscribe(data => {
      //     // console.log(data.results);
      //      this.objArrayColor = data.results;
      // });

      // var webserviceDogBreed = this.appConfig.webAPI+"/webservice/ws_list_dog_breed.php";
      // this.http.get(webserviceDogBreed)
      // .map(res => res.json())
      // .subscribe(data => {
      //     console.log(data.results);
      //      this.objArrayDogBreed = data.results;
      // });


    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    this.nativeGeocoder.reverseGeocode(this.userData.lat , this.userData.lng , options)
      .then((result: NativeGeocoderReverseResult[]) => {
       console.log(result[0]);
      this.province_name = result[0].administrativeArea;
      console.log(this.province_name);
      })
      .catch((error: any) => console.log(error));

  }

  ngAfterViewInit(): void {
    // this.ages = {years : this.ages/12, months : this.ages%12};
    this.form.txt_ages = 0;
    // this.years = this.ages/12;
    // this.months = this.ages%12;
  }


  /**
   * --------------------------------------------------------------
   * Open Gallery & Select Photo
   * --------------------------------------------------------------
   * @method    takePhoto
   * @param     num    Image Number
   */
  takePhoto(num) {


    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      // allowEdit: true,
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: false,
      correctOrientation:true
      };

      this.camera.getPicture(options).then((imageData) => {
        if (num == 1) {
          this.img1 = normalizeURL(imageData);
          console.log(this.img1);
        }
        if (num == 2) {
          this.img2 = normalizeURL(imageData);
        }
        if (num == 3) {
          this.img3 = normalizeURL(imageData);
        }
        if (num == 4) {
          this.img4 = normalizeURL(imageData);
        }
        if (num == 5) {
          this.img5 = normalizeURL(imageData);
        }
        if (num == 6) {
          this.img6 = normalizeURL(imageData);
        }
      }, (err) => {
      console.log(err);
      });
  }

  /**
   * This function dismiss the popup modal
   */
  dismiss() {
    // this.viewCtrl.dismiss();
    this.navCtrl.setRoot(HomePage,{userData : this.userId});
  }


  adddogs(){

   // console.log(this.userData);

    if (this.img1) {
      this.uploadimg(1,this.img1);
      this.url_img1 = "img1_"+this.form.txt_dogname +this.date.toISOString()+".jpg";
    }

    if (this.img2) {
      this.uploadimg(2,this.img2);
      this.url_img2 = "img2_"+this.form.txt_dogname +this.date.toISOString()+".jpg";
    }

    if (this.img3) {
      this.uploadimg(3,this.img3);
      this.url_img3 = "img3_"+this.form.txt_dogname +this.date.toISOString()+".jpg";
    }

    if (this.img4) {
      this.uploadimg(4,this.img4);
      this.url_img4 = "img4_"+this.form.txt_dogname +this.date.toISOString()+".jpg";
    }

    if (this.img5) {
      this.uploadimg(5,this.img5);
      this.url_img5 = "img5_"+this.form.txt_dogname +this.date.toISOString()+".jpg";
    }

    if (this.img6) {
      this.uploadimg(6,this.img6);
      this.url_img6 = "img6_"+this.form.txt_dogname +this.date.toISOString()+".jpg";
    }

    if(this.form.txt_dogname == undefined){
      this.showtoast("Please fill dog's name");
      return
    }
    if(this.form.txt_ages == undefined){
      this.showtoast("Please fill dog's ages");
      return
    }
    if(this.form.txt_breed == undefined){
      this.showtoast("Please fill dog's breed");
      return
    }
    if(this.form.txt_color == undefined){
      this.showtoast("Please fill dog's color");
      return
    }
    if(this.form.txt_gender == undefined){
      this.showtoast("Please fill dog's gender");
      return
    }
    if(this.form.txt_dogabout == undefined){
      this.form.txt_dogabout = "";
    }


    var data = JSON.stringify({
      var_dogname:this.form.txt_dogname,
      var_dogages:this.form.txt_ages,
      var_dogbreed:this.form.txt_breed,
      var_dogcolor:this.form.txt_color,
      var_doggender:this.form.txt_gender,
      var_dogabout:this.form.txt_dogabout,
      var_doglat:this.userData.lat,
      var_doglng:this.userData.lng,
      var_province:this.province_name,
      var_doguser:this.userData.id,
      var_urlimg1:this.url_img1,
      var_urlimg2:this.url_img2,
      var_urlimg3:this.url_img3,
      var_urlimg4:this.url_img4,
      var_urlimg5:this.url_img5,
      var_urlimg6:this.url_img6
    });
    console.log(data);
    var webservice = this.appConfig.webAPI+"/webservice/ws_add_dog.php";

    this.http2.post(webservice,data)
    .subscribe(data=>{
      var response = JSON.parse(data["_body"]);
      console.log(response.results);
      if(response.results=="success_insert"){
        // this.modalCtrl.create('MydogpagePage').present();
        // this.navCtrl.setRoot(MydogpagePage, {}, { animate: true, direction: 'back' });
        this.navCtrl.setRoot(MydogpagePage,{ userData : this.userId });
      //  this.modalCtrl.create(MydogpagePage,{ userData : this.userData }).present();

      }
    },error=>{
      console.log(error);
    })
  }

  showtoast(msg){
    let toast = this.toastCtrl.create({
      message: msg ,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  uploadimg(num,img){
    var webservice_upload = this.appConfig.webAPI+"/upload777/upload.php";
    //Upload img
    const fileTransfer: FileTransferObject = this.transfer.create();
    let options: FileUploadOptions = {
    fileKey: 'myCameraImg',
    fileName : "img"+num+"_"+this.form.txt_dogname +this.date.toISOString()
    // fileName : "img1_"+this.form.txt_dogname +this.date.toISOString()
    };

    fileTransfer.upload(img,webservice_upload, options)
      .then((data) => {
        //this.img1 = 'assets/imgs/camera.png';
        // alert('upload success');
      }, (err) => {
        alert('err');
        console.log(err);
      });
    console.log('upload');
  }

}
