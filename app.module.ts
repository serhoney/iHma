import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Camera } from '@ionic-native/camera';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { SwingModule } from 'angular2-swing';
import { DataProvider } from '../providers/data/data';
import { GiphyProvider } from '../providers/giphy/giphy';

import { UserProfilePopover, UserDetailsPage } from '../pages/user-details/user-details';
import { ChatProvider } from '../providers/chat/chat';

//import firebase from 'firebase';
import { Facebook } from '@ionic-native/facebook';

import { NativeStorage } from '@ionic-native/native-storage';

import { Geolocation } from '@ionic-native/geolocation';
import { IonicStorageModule } from '@ionic/storage';
// import { from } from 'rxjs/observable/from';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map'

// import firebase from 'firebase';
// import { AngularFireModule } from '@angular/fire';
// import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

// import { UserprofileService } from '../providers/firebase-service/userprofile.service';


import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';
import { AppConfigProvider } from '../providers/app-config/app-config';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

import { GoogleMaps, Geocoder } from "@ionic-native/google-maps";

import { NativeGeocoder } from '@ionic-native/native-geocoder';


import { LandingPage } from '../pages/landing/landing';
import { HomePage } from '../pages/home/home';
import { AddRequestPage } from '../pages/add-request/add-request';
import { AdddogsPage } from '../pages/adddogs/adddogs';
import { ChatBoxPage } from '../pages/chat-box/chat-box';
import { DogSwipeDetailsPage } from '../pages/dog-swipe-details/dog-swipe-details';
import { EditDogPage } from '../pages/edit-dog/edit-dog';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { LocationPage } from '../pages/location/location';
import { MatchPage } from '../pages/match/match';
import { MatchesPage } from '../pages/matches/matches';
import { MatchesDogPage } from '../pages/matches-dog/matches-dog';
import { MyDogDetailsPage } from '../pages/my-dog-details/my-dog-details';
import { MydogUserDetailsPage } from '../pages/mydog-user-details/mydog-user-details'
import { MydoglistadoptedPage } from '../pages/mydoglistadopted/mydoglistadopted';
import { MydogpagePage } from '../pages/mydogpage/mydogpage';
import { MylocationPage } from '../pages/mylocation/mylocation';
import { MyrequestPage } from '../pages/myrequest/myrequest';
import { ProfilePage } from '../pages/profile/profile';
import { RequirementPage } from '../pages/requirement/requirement';
import { SettingsPage } from '../pages/settings/settings';
import { SwipePage } from '../pages/swipe/swipe';

import { MyChoosedPage } from '../pages/my-choosed/my-choosed';

// import { UserDetailsPage } from '../pages/user-details/user-details';


var config = {
  apiKey: "***************",
  authDomain: "************",
  databaseURL: "***************",
  projectId: "*************",
  storageBucket: "************",
  messagingSenderId: "*************"
  };

@NgModule({
  declarations: [
    MyApp,
    UserProfilePopover,
    LandingPage,
    HomePage,
    AddRequestPage,
    AdddogsPage,
    ChatBoxPage,
    DogSwipeDetailsPage,
    EditDogPage,
    EditProfilePage,
    LocationPage,
    MatchPage,
    MatchesPage,
    MatchesDogPage,
    MyDogDetailsPage,
    MydogUserDetailsPage,
    MydoglistadoptedPage,
    MydogpagePage,
    MylocationPage,
    MyrequestPage,
    ProfilePage,
    RequirementPage,
    SettingsPage,
    SwipePage,
    UserDetailsPage,
    MyChoosedPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    SwingModule,
    HttpClientModule,
    IonicStorageModule.forRoot({ name:'_test',driverOrder:['indexed','sqlite','websql']}),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    UserProfilePopover,
    LandingPage,
    HomePage,
    AddRequestPage,
    AdddogsPage,
    ChatBoxPage,
    DogSwipeDetailsPage,
    EditDogPage,
    EditProfilePage,
    LocationPage,
    MatchPage,
    MatchesPage,
    MatchesDogPage,
    MyDogDetailsPage,
    MydogUserDetailsPage,
    MydoglistadoptedPage,
    MydogpagePage,
    MylocationPage,
    MyrequestPage,
    ProfilePage,
    RequirementPage,
    SettingsPage,
    SwipePage,
    UserDetailsPage,
    MyChoosedPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpClient,
    Camera,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DataProvider,
    GiphyProvider,
    ChatProvider,
    Facebook,
    NativeStorage,
    Geolocation,
    // UserprofileService,
    ImagePicker,
    Crop,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppConfigProvider,
    FileTransfer,
    FileTransferObject,
    GoogleMaps,
    Geocoder,
    NativeGeocoder
  ]
})
export class AppModule { }
