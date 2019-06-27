import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, ToastController } from 'ionic-angular';

// import { DataProvider } from '../../providers/data/data';
// import { User } from '../../models/user';
import { Direction, StackConfig, SwingStackComponent, SwingCardComponent } from 'angular2-swing';


import { AppConfigProvider } from '../../providers/app-config/app-config';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { DogSwipeDetailsPage } from '../dog-swipe-details/dog-swipe-details';
import { HomePage } from '../home/home';

// @IonicPage()
@Component({
  selector: 'page-swipe',
  templateUrl: 'swipe.html',
})
export class SwipePage {

  // objArrayData: Array<User> = [];
  objArrayData: any = [];
  userSetting : any;
  ImgURL:any;
  userData : any ;
  msgstatus : any ;

  @ViewChild('myswing1') swingStack: SwingStackComponent;
  @ViewChildren('mycards1') swingCards: QueryList<SwingCardComponent>;

  // Array list of users
  // users: Array<User> = [];

  // Swing Card Configuration
  stackConfig: StackConfig;

  // Recent Swipe User
  swipeDog: any = '';
  userId: any;
  swipe: any;

  constructor(
    //private dataProvider: DataProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public appConfig:AppConfigProvider,
    private storage:Storage,
    public http: Http
    ) {
      this.objArrayData = [];
      this.msgstatus ="Finding dogs near you...";
      // this.cardConfig();
      // this.getLoading();
    this.swipe = this.navParams.get('swipe');
    console.log(this.swipe);
    }

  ngOnInit() {
    this.userId = this.navParams.get('userData');
    this.cardConfig();
    this.getLoading();

  }

  getLoading(){
    var webservice ="";
    if(this.swipe == 0){
       webservice = this.appConfig.webAPI+"/webservice/ws_list_dog_swipe.php";
    }else{
       webservice = this.appConfig.webAPI+"/webservice/ws_list_dog_swipe_req.php";
    }

      // var webservice_latlng = this.appConfig.webAPI+"/webservice/ws_list_latlng_swiping.php";
      let me = this;
      this.ImgURL = this.appConfig.webAPI+"/upload777/img";

        this.userData = JSON.stringify({
           var_id: this.userId.id,
           var_reqno : this.swipe
         });

         this.http.post(webservice,this.userData)
         .subscribe(data=>{
           var response = JSON.parse(data["_body"]);
           console.log(response.results);
           if(response.results != "have no dog"){
            this.objArrayData = response.results;
            if(this.objArrayData.length == 0 ){
              this.showtoast("no dog near you");
            }
            console.log(this.objArrayData.length);
            this.swipe = 0;
           }
           else {
              this.showtoast("no dog near you");
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

  /**
   * --------------------------------------------------------------
   * Set card stack configuration
   * --------------------------------------------------------------
   * @method    getUserList
   *
   * See https://github.com/ksachdeva/angular2-swing
   * See https://github.com/gajus/swing
   */
  cardConfig() {
    this.stackConfig = {
      allowedDirections: [Direction.UP, Direction.DOWN, Direction.LEFT, Direction.RIGHT],
      throwOutConfidence: (offsetX, offsetY, element) => {
        return Math.min(Math.max(Math.abs(offsetX) / (element.offsetWidth / 2), Math.abs(offsetY) / (element.offsetHeight / 2)), 1);
      },
      transform: (element, x, y, r) => {
        this.onItemMove(element, x, y, r);
      },
      throwOutDistance: (d) => {
        return 800;
      }
    };
  }

  /**
   * --------------------------------------------------------------
   * Called whenever we drag an element
   * --------------------------------------------------------------
   * @method    onItemMove
   */
  onItemMove(element, x, y, r) {
    var color = '';
   // var abs = Math.abs(x);
    //let min = Math.trunc(Math.min(16 * 16 - abs, 16 * 16));
    element.style.background = color;
    element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;
  }

  /**
   * --------------------------------------------------------------
   *  Like/Dislike
   * --------------------------------------------------------------
   * @method    like    This method remove user from card stack and boolean status value
   * determine like/dislike decision.
   * @param     status
   */
  like(status: boolean) {

    // Currently removed user from card
    // let removedUser = this.users.pop();
    let removedUser = this.objArrayData.pop();

    // If status is true, current user like this `removedUser` user otherwise dislike
    if (status) {
      this.swipeDog = removedUser;
      this.goToMatchPage(this.swipeDog);
    //For recalling dog informations
      if(this.objArrayData.length == 0){
        console.log('refresh...');
        setTimeout(()=>{
          this.getLoading();
        },3000);
      }

    } else {
      this.swipeDog = removedUser;

    //For recalling dog informations
      if(this.objArrayData.length == 0){
        console.log('refresh...');
        setTimeout(()=>{
          this.getLoading();
        },3000);
      }
    }
  }

  /**
   * --------------------------------------------------------------
   *  Go To Match Page
   * --------------------------------------------------------------
   * @method    goToMatchPage
   */
  goToMatchPage(dogs) {
    // this.modalCtrl.create('MatchPage', { dogs: dogs , userdata : this.userData }).present();

    let user_no = JSON.parse(this.userData)
    var data = JSON.stringify({
      var_dogid:dogs.dog_id,
      var_doguserno:dogs.dog_userno,
      var_userno:user_no.var_id
    });
    console.log(data);

    var webservice = this.appConfig.webAPI+"/webservice/ws_add_matching_adopted.php";

    this.http.post(webservice,data)
    .subscribe(data=>{
      var response = JSON.parse(data["_body"]);
      console.log(response.results);
      if(response.results=="success_insert"){
        // this.modalCtrl.create('MydogpagePage').present();
        // this.navCtrl.setRoot(MydogpagePage, {}, { animate: true, direction: 'back' });
        // this.navCtrl.setRoot('MydogpagePage');
        this.showtoast("Already Match");
      }
    },error=>{
      console.log(error);
    })


  }

  /**
   * --------------------------------------------------------------
   *  Open Profile Details Page
   * --------------------------------------------------------------
   * @method    goToProfileDetailsPage
   */
  goToDogDetailsPage(dogs) {
    this.modalCtrl.create(DogSwipeDetailsPage, { dogs: dogs , userdata : this.userData }).present();
    // this.modalCtrl.create('DogSwipeDetailsPage').present();
    // console.log(dogs,this.userData);
    // console.log(this.objArrayData.length);

  }

  /**
   * --------------------------------------------------------------
   *  Refresh Card
   * --------------------------------------------------------------
   * @method    refresh
   */
  // refresh() {
  //   this.getUserList();
  // }
}

