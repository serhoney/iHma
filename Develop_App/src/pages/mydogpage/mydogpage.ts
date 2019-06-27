

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';

import { AppConfigProvider } from '../../providers/app-config/app-config';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';


import { HomePage } from '../home/home';
import { MydoglistadoptedPage } from '../mydoglistadopted/mydoglistadopted';
import { EditDogPage } from '../edit-dog/edit-dog';



// @IonicPage()
@Component({
  selector: 'page-mydogpage',
  templateUrl: 'mydogpage.html',
})
export class MydogpagePage {

  objArrayData: any;
  objArrayDataClosed: any;
  ImgURL:any;
  userData : any ;
  userId: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public appConfig:AppConfigProvider,
    private storage:Storage,
    public http: Http) {

      this.ImgURL = this.appConfig.webAPI+"/upload777/img";


      //setTimeout(()=>{

        this.userId = this.navParams.get('userData');
        this.getDogList();
          // });
     // },1000);


      // console.log(webservice);
      // this.http.get(webservice)
      // .map(res => res.json())
      // .subscribe(data => {
      //     console.log(data.results);
      //      this.objArrayData = data.results;
      // });

     }
  getDogList(){

    var webservice = this.appConfig.webAPI+"/webservice/ws_list_mydogs.php";
    var webservice2 = this.appConfig.webAPI+"/webservice/ws_list_mydogs_closed.php";

        // this.storage.get('userData').then((val) => {
          this.userData = JSON.stringify({
            var_id: this.userId.id
          });

          this.http.post(webservice,this.userData)
          .subscribe(data=>{
            console.log(JSON.parse(data["_body"]))
            var response = JSON.parse(data["_body"]);
            this.objArrayData = response.results;
            if(response.results){
              console.log(response.results);
            }
          },error=>{
            console.log(error);
          })

          this.http.post(webservice2,this.userData)
          .subscribe(data=>{
            console.log(JSON.parse(data["_body"]))
            var response2 = JSON.parse(data["_body"]);
            this.objArrayDataClosed = response2.results;
            if(response2.results){
              console.log(response2.results);
            }
          },error=>{
            console.log(error);
          })
  }
  btnDetail(record) {
    console.log(record);
  }

  dismiss() {
    // this.viewCtrl.dismiss({userData : this.userId});
    // this.navCtrl.setRoot(HomePage);
    this.navCtrl.setRoot(HomePage,{userData : this.userId});
  }

  /**
   * --------------------------------------------------------------
   * Open MyDogDetails Page
   * --------------------------------------------------------------
   * @method    MyDogDetails
   */
  openMyDogDetailsPage(dogs) {
   this.modalCtrl.create(MydoglistadoptedPage,{ dog_id: dogs.dog_id ,userData : this.userId}).present();
  }

  /**
   * --------------------------------------------------------------
   * Open MydogPage
   * --------------------------------------------------------------
   * @method    MydogPage
   */
  openEditDogPage(dogs) {
    // this.modalCtrl.create(EditDogPage,{ passObj: dogs ,userData : this.userId}).present();

    let modal = this.modalCtrl.create(EditDogPage,{ passObj: dogs ,userData : this.userId });
    modal.onDidDismiss(() => {
      this.getDogList();
    });
    modal.present();


  }

}

