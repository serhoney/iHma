import { Component, ViewChild , ChangeDetectorRef} from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Content, Slides } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
// import { Chat } from '../../models/chat';
// import { ChatProvider } from '../../providers/chat/chat';
// import { GiphyProvider } from '../../providers/giphy/giphy';

// import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { AngularFireDatabase } from 'angularfire2/database';


import { AppConfigProvider } from '../../providers/app-config/app-config';
import { Http } from '@angular/http';
import { HomePage } from '../home/home';
import { MatchesDogPage } from '../matches-dog/matches-dog';

// import { DatePipe } from '@angular/common';
// @IonicPage()
@Component({
  selector: 'page-chat-box',
  templateUrl: 'chat-box.html',
})
export class ChatBoxPage {

  @ViewChild(Content) content: Content;
  @ViewChild('mySlider') slider: Slides;

  // Chat Form that handles sending of messages
  chatForm: FormGroup;

  // Array List of Chat History
  // chats: Array<Chat> = [];

  // List of chat reply message
  //chatReplyMessages: any = this.chatProvider.randomChatReplyMsg();

  // List of GIF
  // gifs: any = [];

  // GIF Images Limit
  // limit: number = 25;

  // Search GIF Image
  // searchText: string;

  // Show/Hide GIF Slider Contents
  // showGif: Boolean = false;


  /////////////////////////////////////
  myTimeStamp :any;
  // sub;
  messages:object[]=[];
  userData : any;
  chatroom : any;
  userid: any;
  user:any;
  user_status:any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    // private chatProvider: ChatProvider,
    // private giphyProvider: GiphyProvider,
    private formBuilder: FormBuilder,
    public db:AngularFireDatabase,

    public detectorRef: ChangeDetectorRef,

    public appConfig:AppConfigProvider,
    public http: Http,

    ) {

      this.user_status = this.navParams.get('user_status');
      this.userData = this.navParams.get('userData');
      this.userid = this.navParams.get('userid');
      this.user = this.navParams.get('User');
      console.log("userid",this.userid);
      console.log("userdata",this.userData);
      console.log("user",this.user);

      this.chatroom = this.userData.dog_id+this.userData.dog_userno+this.userData.user_no;
      console.log(this.chatroom);

      this.setupChatForm();
      this.getChatHistory();


      // if(this.userData.chat_no != null){
      //   this.getChatHistory();
      // }
      // else{
      //   console.log("xxxx");
      // }

    }

  /**
   * --------------------------------------------------------------
   * Get Chat History
   * --------------------------------------------------------------
   * @method    getChatHistory
   */
  getChatHistory() {
    this.db.list('/chat/'+this.chatroom).valueChanges().subscribe((data) => {
      this.messages = data;
      console.log(data);
      },(err)=>{
       console.log("probleme : ", err)
    });

    // this.db.list('/chat/'+this.chatroom, ref => ref.orderByChild('receiver').equalTo(this.userid.dog_userid)).snapshotChanges()
    // .subscribe(actions => {
    //   console.log(actions);
    //     actions.forEach(action => {
    //       // here you get the key
    //       console.log(action.key);
    //       // this.db.list('/paperCode').update(action.key, { points: 10 });
    //     });
    // });

    this.scrollToBottom();

  }

  // var lastmsg = this.messages[this.messages.length - 1];
  // console.log(lastmsg);

  /**
   * --------------------------------------------------------------
   * Send Chat Message
   * --------------------------------------------------------------
   * @method    sendMsg
   */
  sendMsg() {

    let message = this.chatForm.controls['message'].value;
    var receiver ;
    if(this.userid.dog_userid == this.userData.dog_userno){
       receiver = this.userData.user_no;
    }else{
       receiver = this.userData.dog_userno;
    }

    if (message) {
      this.db.list('/chat/'+this.chatroom).push({
        sender : this.userid.dog_userid,
        receiver : receiver,
        id : this.userid.dog_userid,
        dog_owner: this.userData.dog_userno,
        username: this.userid.dog_username,
        message: message,
        status: "Unread",
        timestamp:Date.now()
      }).then( () => {

      })

      // Clear input field
      this.chatForm.controls['message'].setValue('');

      setTimeout(() => this.scrollToBottom(), 100);

    }
  }

  /** Do any initialization */
  // ngOnInit() {

  //   this.userData = this.navParams.get('userData');

  //   // const datePipe = new DatePipe('en-US');
  //   // const myFormattedDate = datePipe.transform(Date.now(), 'yyyy-MM-dd, HH:mm:SS');
  //   // console.log(myFormattedDate);

  //   this.setupChatForm();
  //   this.getChatHistory();
  // }

  // ionViewDidLoad(){
  //  this.db.list('/chat/001').push({
  //    id : this.userData.id,
  //    username: this.userData.username,
  //    message:"msgTest",
  //    timestamp:Date.now()
  //  })
  // }



  // getChatHistory() {
  //   this.chatProvider.getChatHistoryData().subscribe((data) => {
  //     this.chats = data;
  //     this.scrollToBottom();
  //   })
  // }


  /**
   * --------------------------------------------------------------
   * Chat Form
   * --------------------------------------------------------------
   * @method    setupChatForm
   */
  setupChatForm() {
    // Setup form
    this.chatForm = this.formBuilder.group({
      message: ['', Validators.required]
    });
  }

  /**
   * This function dismiss the popup modal
   */
  dismiss() {
    // this.viewCtrl.dismiss();

    if(this.messages){
      var lastmsg:any = this.messages[this.messages.length - 1];
      console.log(lastmsg);

      var data = JSON.stringify({
        var_chatroomname:this.chatroom,
        var_user_no:this.userData.dog_userno,
        var_adopted_no:this.userData.user_no,
        var_dog_no:this.userData.dog_id,
        var_id : this.userid.dog_userid,
        var_lastsender:lastmsg.id,
        var_lastmsg:lastmsg.message
      });

      var webservicelMsg = this.appConfig.webAPI+"/webservice/ws_add_last_msg.php";

      this.http.post(webservicelMsg,data)
      .subscribe(data=>{
        var response = JSON.parse(data["_body"]);
        if(response.results=="success"){
          this.detectorRef.detectChanges();
          if(this.user_status==1){
            this.navCtrl.setRoot(HomePage, {opentab: 2 , userData : this.user});
          }else{
            this.viewCtrl.dismiss();
          }
          // this.viewCtrl.dismiss();
        }
      },error=>{
        console.log(error);
      })
    }
    else{

      this.detectorRef.detectChanges();
      if(this.user_status==1){
      this.navCtrl.setRoot(HomePage, {opentab: 2 , userData : this.user});
      }else{
        this.viewCtrl.dismiss();
      }

     // this.viewCtrl.dismiss();
    }

  }


  /**
   * --------------------------------------------------------------
   * Get Gifs
   * --------------------------------------------------------------
   * @method    getGifs
   */
  // getGifs() {
  //   this.giphyProvider.getTrendingGifs(this.limit).subscribe(
  //     (data: any) => {
  //       this.gifs.push(...data.data);
  //       this.limit = this.limit + 5;
  //       this.scrollToBottom();
  //     }
  //   )
  // }

  /**
   * --------------------------------------------------------------
   * Search Gifs
   * --------------------------------------------------------------
   * @method    getGifs
   */
  // searchGifs() {
  //   this.giphyProvider.searchGif(this.searchText).subscribe(
  //     (data: any) => {
  //       this.gifs = data.data;
  //       this.scrollToBottom();
  //     }
  //   )
  // }

  /**
   * --------------------------------------------------------------
   * Input Box Focus
   * --------------------------------------------------------------
   * @method    onMessageInputFocus
   */
  onMessageInputFocus() {
    setTimeout(() => this.scrollToBottom(), 100);
  }

  /**
   * --------------------------------------------------------------
   * Send Gif Image Message
   * --------------------------------------------------------------
   * @method    sendGif
   */
  // sendGif() {

  //   // Selected Gif Image Index
  //   let theClickedIndex = this.slider.clickedIndex;

  //   // Selected Gif Image
  //   let msgGifImg = this.gifs[theClickedIndex].images.preview_gif.url;

  //   if (msgGifImg) {
  //     this.chats.push({
  //       senderName: "ขนปุย",
  //       receiverName: "Kaimook",
  //       image: msgGifImg,
  //       status: "sent",
  //       timestamp: new Date()
  //     });
  //   }

  //   setTimeout(() => this.scrollToBottom(), 100);

  //   //this.replyMessage();
  // }

  /**
   * --------------------------------------------------------------
   * Reply Back Chat Message
   * --------------------------------------------------------------
   * @method    replyMessage
   */
  /*
  replyMessage() {

    let replyMes = this.chatReplyMessages[Math.floor(Math.random() * this.chatReplyMessages.length)];

    // Simulate response after delay
    setTimeout(() => {
      this.chats.push({
        senderName: "ขนปุย",
        receiverName: "Kaimook",
        message: replyMes,
        status: "received",
        timestamp: new Date()
      })
      this.scrollToBottom();
    }, 1000);

  }*/


  /**
   * --------------------------------------------------------------
   * Scroll To Bottom
   * --------------------------------------------------------------
   * @method    scrollToBottom
   */
  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400)
  }
}
