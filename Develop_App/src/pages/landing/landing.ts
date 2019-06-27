import { Component,ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
//import { AngularFireAuth } from 'angularfire2/auth';
// import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
// import { UserprofileService } from '../../providers/firebase-service/userprofile.service';
import { isEmpty } from 'rxjs/operators';

import { AppConfigProvider } from '../../providers/app-config/app-config';

// import { DataProvider } from '../../providers/data/data';

import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

import { Http } from '@angular/http';
// import { HttpClient } from '@angular/common/http'
import 'rxjs/add/operator/map';

import { HomePage } from '../home/home';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

// @IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {
  userData: any;
  userSetting: any;
  userLocation : any;
  isLoggedIn:boolean = false;
  users: any;
  coords = {lat: 0, lng: 0};
  ImgURL : any;

  // userData ={
  //   id          : "",
  //   first_name  : "",
  //   last_name   : "",
  //   username    : "",
  //   gender      : "",
  //   birthday    : "",
  //   email       : "",
  //   picture     : "",
  //   lat         : 0,
  //   lng         : 0
  // }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams ,
    public platform:Platform,
    public geolocation: Geolocation,
    private storage: Storage,
    // public userprofileService: UserprofileService,
    public appConfig:AppConfigProvider,
    public http: Http,
    private fire:AngularFireAuth,
    public ref: ChangeDetectorRef,
    public fb: Facebook
    ) {
       this.getlocation();
    }
  getlocation(){
    var options = {
      enableHighAccuracy: true,
      timeout: 60000,
      maximumAge: Infinity
      // maximumAge: 3600

    };
    this.geolocation.getCurrentPosition(options).then((resp) => {
      this.coords= {lat: resp.coords.latitude, lng: resp.coords.longitude};
      console.log(this.coords);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  // loginWithFB(){
    // this.fire.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())
    // .then( () => {
    //   this.fire.auth.getRedirectResult().then( res =>{
    //     this.facebook.name = res.user.displayName;
    //     this.ref.detectChanges();
    //     console.log(res);
    //   });
    // })

    // this.fire.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    // .then(res => {
    //   if(res.user){
    //     this.navCtrl.setRoot('HomePage');
    //   }
    //   console.log(res);
    //   this.facebook.name = res.user.displayName;
    //   this.ref.detectChanges();
    //   alert(this.facebook.name);
    // })
  // }

  logoutOfFacebook(){
    this.fire.auth.signOut();
  }

  login_android(){
    this.fire.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())
    .then( () => {
      this.fire.auth.getRedirectResult().then( (res:any) =>{
        if(res.user){
          var userData = {
            id          : res.user.providerData[0].uid,
            first_name  : res.user.providerData[0].first_name || "",
            last_name   : res.user.providerData[0].last_name || "",
            username    : res.user.providerData[0].displayName,
            gender      : res.user.providerData[0].gender || "",
            birthday    : res.user.providerData[0].birthday || "",
            email       : res.user.providerData[0].email,
            picture     : res.user.providerData[0].photoURL+"?width=800",
            lat         : this.coords.lat,
            lng         : this.coords.lng
            }
        }

        console.log(userData);

        var webservice = this.appConfig.webAPI+"/webservice/ws_check_login.php";
        var data = JSON.stringify(userData);

        this.http.post(webservice,data)
        .subscribe((data:any)=>{
          // console.log(data.results)
          // var response = JSON.parse(data["_body"]);
          // var response = data;

          var response = JSON.parse(data["_body"]);

          if(response.results){

            userData.id =response.results[0].no;
            console.log(userData);

            this.ref.detectChanges();


            this.navCtrl.setRoot(HomePage,{userData : userData});

            // this.modalCtrl.create('MydogpagePage').present();
            // this.navCtrl.setRoot(MydogpagePage, {}, { animate: true, direction: 'back' });
          }
        },error=>{
          console.log(error);
        })

        console.log(this.userData)
        this.ref.detectChanges();
      });
    })
  }

  loginAction()
  {

    if (this.platform.is('cordova')) {
      this.fb.logout();
      // Login with permissions
      this.fb.login(['public_profile', 'email'])
      .then( (res: FacebookLoginResponse) => {
          // The connection was successful
          if(res.status == "connected") {
              // Get user ID and Token
              var fb_id = res.authResponse.userID;
              var fb_token = res.authResponse.accessToken;
              this.fb.api("/me?fields=id,name,email,gender,birthday,first_name,last_name,picture.width(650).height(730).as(picture_large)", []).then((user) => {
                  // Get the connected user details
                  var userData = {
                  id          : user.id,
                  first_name  : user.first_name,
                  last_name   : user.last_name,
                  username    : user.name,
                  gender      : user.gender,
                  birthday    : user.birthday,
                  email       : user.email,
                  picture     : user['picture_large']['data']['url'],
                  lat         : this.coords.lat,
                  lng         : this.coords.lng
                  }

                  console.log(userData);

                  var webservice = this.appConfig.webAPI+"/webservice/ws_check_login.php";
                  var data = JSON.stringify(userData);

                  this.http.post(webservice,data)
                  .subscribe((data:any)=>{
                    // console.log(data.results)
                    // var response = JSON.parse(data["_body"]);
                    // var response = data;

                    var response = JSON.parse(data["_body"]);

                    if(response.results){

                      userData.id =response.results[0].no;
                      console.log(userData);

                      this.ref.detectChanges();

                      setTimeout(()=>{
                        this.storage.set('userData',userData)
                      },4000);

                      this.navCtrl.setRoot(HomePage,{userData : userData});

                      // this.modalCtrl.create('MydogpagePage').present();
                      // this.navCtrl.setRoot(MydogpagePage, {}, { animate: true, direction: 'back' });
                    }
                  },error=>{
                    console.log(error);
                  })


              });




          }
          // An error occurred while loging-in
          else {
              console.log("An error occurred...");
          }
      })
      .catch((e) => {
          console.log('Error logging into Facebook', e);
      });
    }
    else{
      console.log("xxxx");

      this.fire.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())
      .then( () => {
        this.fire.auth.getRedirectResult().then( (res:any) =>{
          if(res.user){
            var userData = {
              id          : res.user.providerData[0].uid,
              first_name  : res.user.providerData[0].first_name || "",
              last_name   : res.user.providerData[0].last_name || "",
              username    : res.user.providerData[0].displayName,
              gender      : res.user.providerData[0].gender || "",
              birthday    : res.user.providerData[0].birthday || "",
              email       : res.user.providerData[0].email,
              picture     : res.user.providerData[0].photoURL+"?width=800",
              lat         : this.coords.lat,
              lng         : this.coords.lng
              }
          }

          console.log(userData);

          var webservice = this.appConfig.webAPI+"/webservice/ws_check_login.php";
          var data = JSON.stringify(userData);

          this.http.post(webservice,data)
          .subscribe((data:any)=>{
            // console.log(data.results)
            // var response = JSON.parse(data["_body"]);
            // var response = data;

            var response = JSON.parse(data["_body"]);

            if(response.results){

              userData.id =response.results[0].no;
              console.log(userData);

              this.ref.detectChanges();


              this.navCtrl.setRoot(HomePage,{userData : userData});

              // this.modalCtrl.create('MydogpagePage').present();
              // this.navCtrl.setRoot(MydogpagePage, {}, { animate: true, direction: 'back' });
            }
          },error=>{
            console.log(error);
          })

          console.log(this.userData)
          this.ref.detectChanges();
        });
      })

      // this.fire.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      // .then((res:any) => {
      //   if(res.user){
      //     var userData = {
      //       id          : res.user.providerData[0].uid,
      //       first_name  : res.user.providerData[0].first_name || "",
      //       last_name   : res.user.providerData[0].last_name || "",
      //       username    : res.user.providerData[0].displayName,
      //       gender      : res.user.providerData[0].gender || "",
      //       birthday    : res.user.providerData[0].birthday || "",
      //       email       : res.user.providerData[0].email,
      //       picture     : res.user.providerData[0].photoURL+"?width=800",
      //       lat         : this.coords.lat,
      //       lng         : this.coords.lng
      //       }

      //       console.log(userData);

      //       var webservice = this.appConfig.webAPI+"/webservice/ws_check_login.php";
      //       var data = JSON.stringify(userData);

      //       this.http.post(webservice,data)
      //       .subscribe((data:any)=>{
      //         // console.log(data.results)
      //         // var response = JSON.parse(data["_body"]);
      //         // var response = data;

      //         var response = JSON.parse(data["_body"]);

      //         if(response.results){

      //           userData.id =response.results[0].no;
      //           console.log(userData);

      //           this.ref.detectChanges();


      //           this.navCtrl.setRoot(HomePage,{userData : userData});

      //           // this.modalCtrl.create('MydogpagePage').present();
      //           // this.navCtrl.setRoot(MydogpagePage, {}, { animate: true, direction: 'back' });
      //         }
      //       },error=>{
      //         console.log(error);
      //       })
      //   }
      // })

    }

  }


  loginWithFB() {
    // this.storage.clear();

    this.ImgURL = this.appConfig.webAPI+"/upload777/img";
    this.userData = {
      id: 1,
      email: "test@test.com",
      first_name: "TestName",
      last_name: "TestLast",
      picture: "https://graph.facebook.com/10216268699326823/picture?width=800",
      username: "Test",
      about : "XZXZ",
      setting_no : 2,
      location_no : 1,
      lat : this.coords.lat,
      lng : this.coords.lng
      //////////////////////////////////////////
      // id: 2,
      // email: "xxxx@xx.xxx",
      // first_name: "XXXX",
      // last_name: "ZZZZ",
      // picture: "https://graph.facebook.com/10216268699326823/picture?width=800",
      // username: "CXZ",
      // about : "XZXZ",
      // setting_no : 3,
      // location_no : 29,
      // lat : this.coords.lat,
      // lng : this.coords.lng

      /////////////////////////////////////////
      // id: 3,
      // email: "idtest_3@xx.xxx",
      // first_name: "test3",
      // last_name: "Last3",
      // picture: this.ImgURL+"/profile3.jpg",
      // username: "test3",
      // about : "ID TEST 3",
      // lat : this.coords.lat,
      // lng : this.coords.lng
    }


    // this.userData = JSON.stringify({
    //   id: 1,
    //   email: "test@test.com",
    //   first_name: "TestName",
    //   last_name: "TestLast",
    //   picture: this.ImgURL+"/profile.jpg",
    //   username: "Test",
    //   about : "XZXZ",
    //   setting_no : 2,
    //   location_no : 1,
    //   lat : this.coords.lat,
    //   lng : this.coords.lng
    // });


    setTimeout(()=>{
      this.storage.set('userData',this.userData)
    },4000);


   this.navCtrl.setRoot(HomePage,{userData : this.userData});

    /*

    if (this.platform.is('cordova')) {
    this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
      this.facebook.api('me?fields=id,name,email,first_name,last_name,picture.width(650).height(730).as(picture_large)'
      , []).then(profile => {
        this.userData = {
          id: profile['id'],
          email: profile['email'],
          first_name: profile['first_name'],
          last_name: profile['last_name'],
          picture: profile['picture_large']['data']['url'],
          username: profile['name']
        }
        this.userData.location = {
          latitude: this.coords['lat'],
          longitude: this.coords['long']
        }


        this.userprofileService.addNote(this.userData).then(ref => {
          console.log(ref);
        });

        /*
        var ccc = this.userprofileService.checkUserandpush(this.userData);
        var sss = this.userprofileService.getNoteList();

        if(ccc.length > 0){

        }
        else{
             this.userprofileService.addNote(this.userData).then(ref => {
          console.log(ref);
        });
        }

        this.storage.set('userData',this.userData);
      });
      this.navCtrl.setRoot('HomePage');
    });
    }
    */
  }

}

