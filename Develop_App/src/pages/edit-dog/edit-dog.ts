import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, normalizeURL , ModalController} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { AppConfigProvider } from '../../providers/app-config/app-config';
// import { Http } from '@angular/http';
// import 'rxjs/add/operator/map';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Storage } from '@ionic/storage';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { MydogpagePage } from '../mydogpage/mydogpage';

// @IonicPage()
@Component({
  selector: 'page-edit-dog',
  templateUrl: 'edit-dog.html',
})
export class EditDogPage {

  public base64Image: string;
  img1: any;
  img2: any;
  img3: any;
  img4: any;
  img5: any;
  img6: any;

  img_new1: any;
  img_new2: any;
  img_new3: any;
  img_new4: any;
  img_new5: any;
  img_new6: any;

  url_img1: any;
  url_img2: any;
  url_img3: any;
  url_img4: any;
  url_img5: any;
  url_img6: any;

  ages: any;
  visibility: Boolean = true;
  ImgURL: any;
  objArrayData: any;
  form:any = {};
  doginvisible:any;
  dogactivate:any;

  date : any;
  userData : any = {};
  userId : any;

  objArrayColor: any;
  objArrayDogBreed: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private camera: Camera,
    public appConfig:AppConfigProvider,
    private storage:Storage,
    private transfer: FileTransfer,
    public modalCtrl: ModalController,
    public http: HttpClient) {

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
       // },1000);


      // this.form.txt_gender = 1;
      this.ImgURL = this.appConfig.webAPI+"/upload777/img";

      this.objArrayData = this.navParams.get('passObj');
      this.form.txt_ages = this.objArrayData.dog_ages;

      this.url_img1 = this.objArrayData.img1;
      this.url_img2 = this.objArrayData.img2;
      this.url_img3 = this.objArrayData.img3;
      this.url_img4 = this.objArrayData.img4;
      this.url_img5 = this.objArrayData.img5;
      this.url_img6 = this.objArrayData.img6;

      this.form.txt_breed = this.objArrayData.dog_breed;
      this.form.txt_color = this.objArrayData.dog_color;
      this.form.txt_gender = this.objArrayData.dog_gender;
      if(this.objArrayData.invisible=="1"){this.form.txt_invisible = true;} else this.form.txt_invisible = false;
      if(this.objArrayData.activate=="1"){this.form.txt_activate = true;} else this.form.txt_activate = false;

      console.log(this.objArrayData);
      if(this.objArrayData.img1!=""){this.img1 = this.ImgURL+"/"+this.objArrayData.img1;}
      if(this.objArrayData.img2!=""){this.img2 = this.ImgURL+"/"+this.objArrayData.img2;}
      if(this.objArrayData.img3!=""){this.img3 = this.ImgURL+"/"+this.objArrayData.img3;}
      if(this.objArrayData.img4!=""){this.img4 = this.ImgURL+"/"+this.objArrayData.img4;}
      if(this.objArrayData.img5!=""){this.img5 = this.ImgURL+"/"+this.objArrayData.img5;}
      if(this.objArrayData.img6!=""){this.img6 = this.ImgURL+"/"+this.objArrayData.img6;}

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
      //      this.objArrayColor = data.results;
      // });

      // var webserviceDogBreed = this.appConfig.webAPI+"/webservice/ws_list_dog_breed.php";
      // this.http.get(webserviceDogBreed)
      // .map(res => res.json())
      // .subscribe(data => {
      //     // console.log(data.results);
      //      this.objArrayDogBreed = data.results;
      // });


    }

  ngAfterViewInit(): void {
    this.ages = 12;
  }

  uploadimg(num,img){
    var webservice_upload = this.appConfig.webAPI+"/upload777/upload.php";
    //Upload img
    const fileTransfer: FileTransferObject = this.transfer.create();
    let options: FileUploadOptions = {
      fileKey: 'myCameraImg',
      //fileName : img
      fileName : "img"+num+"_"+this.form.txt_dogname +this.date.toISOString()
    // fileName : "img1_"+this.form.txt_dogname +this.date.toISOString()
    };

    fileTransfer.upload(img,webservice_upload, options)
      .then((data) => {
        //this.img1 = 'assets/imgs/camera.png';
      }, (err) => {
        console.log(err);
      });
    console.log('upload');
  }

  saveEdit(){
    if(this.form.txt_invisible == true){
      this.doginvisible = 1;
    }else {this.doginvisible = 0;}

    if(this.form.txt_activate == true){
      this.dogactivate = 1;
    }else {this.dogactivate = 0;}


    if (this.img_new1) {
      this.uploadimg(1,this.img_new1);
      console.log(this.img_new1);
      this.url_img1 = "img1_"+this.form.txt_dogname +this.date.toISOString()+".jpg";
    }

    if (this.img_new2){
      this.uploadimg(2,this.img_new2);
      this.url_img2 = "img2_"+this.form.txt_dogname +this.date.toISOString()+".jpg";
    }

    if (this.img_new3){
      this.uploadimg(3,this.img_new3);
      this.url_img3 = "img3_"+this.form.txt_dogname +this.date.toISOString()+".jpg";
    }

    if (this.img_new4) {
      this.uploadimg(4,this.img_new4);
      this.url_img4 = "img4_"+this.form.txt_dogname +this.date.toISOString()+".jpg";
    }

    if (this.img_new5) {
      this.uploadimg(5,this.img_new5);
      this.url_img5 = "img5_"+this.form.txt_dogname +this.date.toISOString()+".jpg";
    }

    if (this.img_new6) {
      this.uploadimg(6,this.img_new6);
      this.url_img6 = "img6_"+this.form.txt_dogname +this.date.toISOString()+".jpg";
    }

    var data = JSON.stringify({
      var_dogid:this.objArrayData.dog_id,
      var_dogname:this.form.txt_dogname,
      var_dogages:this.form.txt_ages,
      var_dogbreed:this.form.txt_breed,
      var_dogcolor:this.form.txt_color,
      var_doggender:this.form.txt_gender,
      var_dogabout:this.form.txt_dogabout,
      var_doginvisible:this.doginvisible,
      var_dogactivate:this.dogactivate,
      var_doglat:this.userData.lat,
      var_doglng:this.userData.lng,
      var_doguser:this.userData.id,
      var_urlimg1:this.url_img1 || "",
      var_urlimg2:this.url_img2 || "",
      var_urlimg3:this.url_img3 || "",
      var_urlimg4:this.url_img4 || "",
      var_urlimg5:this.url_img5 || "",
      var_urlimg6:this.url_img6 || ""
    });
    console.log(data);

    var webservice = this.appConfig.webAPI+"/webservice/ws_update_dog.php";

    this.http.post(webservice,data)
    .subscribe((data:any)=>{
      // console.log(data.results)
      // var response = JSON.parse(data["_body"]);
      var response = data;
      console.log(response)
      if(response.results=="success_update"){
        console.log(response.results);
        // this.modalCtrl.create('MydogpagePage').present();
        this.navCtrl.setRoot(MydogpagePage, {userData : this.userId}, { animate: true, direction: 'back' });
      }
    },error=>{
      console.log(error);
    })
  }

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
          console.log(this.img1);
          this.img_new1 = normalizeURL(imageData);
          console.log(this.img_new1);
          this.img1= this.img_new1;
        }
        if (num == 2) {
          this.img_new2 = normalizeURL(imageData);
          this.img2= this.img_new2;
        }
        if (num == 3) {
          this.img_new3 = normalizeURL(imageData);
          this.img3= this.img_new3;
        }
        if (num == 4) {
          this.img_new4 = normalizeURL(imageData);
          this.img4= this.img_new4;
        }
        if (num == 5) {
          this.img_new5 = normalizeURL(imageData);
          this.img5= this.img_new5;
        }
        if (num == 6) {
          this.img_new6 = normalizeURL(imageData);
          this.img6= this.img_new6;
        }
      }, (err) => {
      console.log(err);
      });
  }


  /**
   * This function dismiss the popup modal
   */
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
