import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, Platform, ViewController,NavParams, NavController , ModalController , ToastController} from "ionic-angular";
import {GoogleMaps, GoogleMap, LatLng, GoogleMapsEvent, Environment,GoogleMapOptions ,CameraPosition, Marker, GeocoderResult, Geocoder, GeocoderRequest, BaseArrayClass} from "@ionic-native/google-maps";

import { AppConfigProvider } from '../../providers/app-config/app-config';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { MylocationPage } from '../mylocation/mylocation';

// import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
// import { Geocoder, GeocoderRequest } from '@ionic-native';


// declare var google;
// @IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})

export class LocationPage {

  userData : any = {};
  userSetting : any ={};
  objArrayData : any ={};
  userSelectedLocation : any;

  location_marker : any;

  map: GoogleMap;
  markerlatlong: any;
  userLocation : any;


  constructor(
    private platform:Platform,
    private googleMaps:GoogleMaps,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public appConfig:AppConfigProvider,
    private storage:Storage,
    public http: Http,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    // private nativeGeocoder: NativeGeocoder
    ) {
      // this.objArrayData = this.navParams.get('passObj');
      // console.log(this.objArrayData)
    }

  ngOnInit() {
    this.objArrayData = this.navParams.get('passObj');
    this.userSelectedLocation = this.navParams.get('userSelectedLocation');
  }

  // ionViewDidLoad(){
  //   this.loadmap();
  // }


  ionViewWillLeave() {
    const nodeList = document.querySelectorAll('._gmaps_cdv_');
    for (let k = 0; k < nodeList.length; ++k) {
        nodeList.item(k).classList.remove('_gmaps_cdv_');
    }
  }

  ngAfterViewInit() {
    this.platform.ready().then(() => this.loadmap());
  }

  showtoast(msg){
    let toast = this.toastCtrl.create({
      message: msg ,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
  SaveLocation(){
    console.log(this.objArrayData[0]);


    if(this.markerlatlong == undefined){
      this.showtoast("Please select a location");
      return
    }

    var webservice = this.appConfig.webAPI+"/webservice/ws_add_location.php";

      var data = JSON.stringify({
        var_userno:this.objArrayData[0].user_no,
        var_lat:this.markerlatlong.lat,
        var_lng:this.markerlatlong.lng,
        var_locality:this.location_marker.locality || this.location_marker.subLocality || "" ,
        var_city:this.location_marker.subAdminArea || "",
        var_province:this.location_marker.adminArea || "ไม่ทราบ"
      });

      console.log(this.objArrayData[0]);
      console.log(this.userSelectedLocation);

      this.http.post(webservice,data)
      .subscribe(data=>{
        var response = JSON.parse(data["_body"]);
        if(response.results=="success_insert"){
          // this.modalCtrl.create('MydogpagePage').present();
          // this.navCtrl.setRoot(MydogpagePage, {}, { animate: true, direction: 'back' });
          // console.log(response.results);
          // console.log(this.objArrayData[0].user_no);


          // this.modalCtrl.create(MylocationPage,{ passObj: this.objArrayData[0], userSelectedLocation : this.userSelectedLocation }).present();
          this.viewCtrl.dismiss({ passObj: this.objArrayData[0], userSelectedLocation : this.userSelectedLocation });

          // this.modalCtrl.create('MylocationPage',{ passObj: this.objArrayData[0] }).present();


          // this.navCtrl.setRoot('MylocationPage',{}, { animate: true, direction: 'back' });
          // this.modalCtrl.create('MylocationPage',{ passObj: this.userData }).present();
        }
      },error=>{
        console.log(error);
      })


  }

  loadmap(){
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE' : '********************',
      'API_KEY_FOR_BROWSER_DEBUG' : '********************'
    });

    let position: LatLng = new LatLng(parseFloat(this.objArrayData[0].lat), parseFloat(this.objArrayData[0].lng));

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: position.lat,
          lng: position.lng
        },
        zoom: 12,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);
    // this.map = GoogleMaps.create('map_canvas',
    //           { camera: { target : [ {lat: position.lat , lng: position.lng } ] , zoom: 20, tilt: 30  }}
    // );

    // ADD MAKER
    // this.map.one(GoogleMapsEvent.MAP_READY)
    // .then(() => {

    this.map.on(GoogleMapsEvent.MAP_READY)
              .subscribe(() => {
                console.log('Map is ready!');

                this.map.addMarker({
                  title: 'Your Location',
                  icon: 'red',
                  animation: 'DROP',
                  draggable:true,
                  position: {
                    lat: position.lat,
                    lng: position.lng
                  }
                })
                .then(marker => {
                  marker.on(GoogleMapsEvent.MARKER_DRAG_END)
                    .subscribe(() => {

                      this.markerlatlong = marker.getPosition();

                      console.log(this.markerlatlong);


                        Geocoder.geocode({
                          position:  {"lat": this.markerlatlong.lat , "lng": this.markerlatlong.lng }
                        }).then((result) => {
                          console.log(result);
                          this.location_marker = result[0];
                          console.log(this.location_marker);
                        })
                        .catch((error) => {
                          console.error("geocoder", error);
                        });
                    });
                });
              });
    }

  /**
   * This function dismiss the popup modal
   */
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
