import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { SettingsPage } from '../settings/settings';
import { MydogpagePage } from '../mydogpage/mydogpage';
import { AdddogsPage } from '../adddogs/adddogs';
import { AddRequestPage } from '../add-request/add-request';
import { MyrequestPage } from '../myrequest/myrequest';
import { MyChoosedPage } from '../my-choosed/my-choosed';

//import { UserprofileService } from '../../providers/firebase-service/userprofile.service';
//import { Geolocation } from '@ionic-native/geolocation';


// @IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  sliderData: any;
  userData : any = {};
  userSetting : any ={};
  email : any;
  userId : any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private dataProvider: DataProvider,
    public modalCtrl: ModalController,
    private storage:Storage,
    //public  userprofileService: UserprofileService,
    //private geolocation: Geolocation
    ) {
    }

  /** Do any initialization */
  // ionViewDidLoad() {
    ngOnInit() {


        this.userId = this.navParams.get('userData');

        this.userData ={
          id: this.userId.id,
          email: this.userId.email,
          first_name: this.userId.first_name,
          last_name: this.userId.last_name,
          picture: this.userId.picture,
          username: this.userId.username,
          lat : this.userId.lat,
          lng : this.userId.lng
        }
        console.log(this.userData);
        // this.storage.get('userData').then((val) => {
        //   this.userData ={
        //     id: val.id,
        //     email: val.email,
        //     first_name: val.first_name,
        //     last_name: val.last_name,
        //     picture: val.picture,
        //     username: val.username,
        //     lat : val.lat,
        //     lng : val.lng
        //   }
        //   console.log("xxxdata");
        //   console.log(this.userData);
        // });


      // this.storage.get('userSetting').then((data) => {
      //   this.userSetting ={
      //     setting_no: data.setting_no,
      //     max_dist: data.max_dist,
      //     min_age: data.min_age,
      //     max_age: data.max_age
      //   }
      //   console.log(this.userSetting);
      //  });

  }

  addnotes(){
    /*this.userprofileService.addNote(this.userData).then(ref => {
      console.log(ref);
    });*/
  }

  /**
   * --------------------------------------------------------------
   * Slider Data
   * --------------------------------------------------------------
   * @method    getSliderData
   */
  getSliderData() {
    this.sliderData = this.dataProvider.profileSlider();
  }

  /**
   * --------------------------------------------------------------
   * Open Edit Profile Page
   * --------------------------------------------------------------
   * @method    openEditProfilePage
   */
  openEditProfilePage() {
    this.modalCtrl.create(EditProfilePage,{ user_no : this.userData }).present();
  }
  /**
   * --------------------------------------------------------------
   * Open Settings Page
   * --------------------------------------------------------------
   * @method    openSettingsPage
   */
  openSettingsPage() {

    // this.modalCtrl.create('SettingsPage').present();
    this.modalCtrl.create(SettingsPage,{ user_no : this.userData }).present();

  }

  /**
   * --------------------------------------------------------------
   * Open MyChoosedDogs Page
   * --------------------------------------------------------------
   * @method    openMyDogsPage
   */
  openMyChoosedPage() {
    this.modalCtrl.create(MyChoosedPage,{ userData : this.userData }).present();
  }

  /**
   * --------------------------------------------------------------
   * Open MyDogs Page
   * --------------------------------------------------------------
   * @method    openMyDogsPage
   */
  openMyDogsPage() {
    this.modalCtrl.create(MydogpagePage,{ userData : this.userData }).present();
  }

  /**
   * --------------------------------------------------------------
   * Open Add Dogs Page
   * --------------------------------------------------------------
   * @method    openAddDogsPage
   */
  openAddDogsPage() {
    this.modalCtrl.create(AdddogsPage,{ userData : this.userData }).present();
  }

  /**
   * --------------------------------------------------------------
   * Open Requirement Page
   * --------------------------------------------------------------
   * @method    RequirementPage
   */
  openAddRequestPage() {
    // this.modalCtrl.create(AddRequestPage).present();
    this.modalCtrl.create(AddRequestPage,{ userData : this.userData }).present();

  }

  /**
   * --------------------------------------------------------------
   * Open My Request Page
   * --------------------------------------------------------------
   * @method    openMyRequest
   */
  openMyrequestPage() {
    this.modalCtrl.create(MyrequestPage,{ userData : this.userData }).present();
    // this.navCtrl.setRoot(MyrequestPage,{ userData : this.userData });

  }


}


