import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Userprofile } from '../../models/userprofile';
//import firebase from 'firebase';

import * as firebase from 'firebase/app';


@Injectable()
export class UserprofileService {

    private userprofileListRef = this.db.list<Userprofile>('userprofile_list');

    constructor(private db: AngularFireDatabase) { }


  encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux:any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpeg");
      callback(dataURL);
    };
    img.src = imageUri;
  };

  uploadImage(imageURI){
    return new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      let imageRef = storageRef.child('image').child('imageName');
      this.encodeImageUri(imageURI, function(image64){
        imageRef.putString(image64, 'data_url')
        .then(snapshot => {
          resolve(snapshot.downloadURL)
        }, err => {
          reject(err);
        })
      })
    })
  }

  addNote(userprofile: Userprofile) {
    return this.userprofileListRef.push(userprofile);
  }

  updateNote(userprofile: Userprofile) {
      return this.userprofileListRef.update(userprofile.id, userprofile);
  }
  // this.database.list('/Profiles', ref => ref.orderByChild('name').equalTo(Firstname));
  removeNote(userprofile: Userprofile) {
      return this.userprofileListRef.remove(userprofile.id);
  }


    getNoteList() {
      return this.userprofileListRef;
    }
    getNoteListById(id) {

   /*   var query = firebase.database().ref("userprofile_list").child("id").equalTo(id)
      .once('value', function(snapshot) {

      });
       return query;*/

      return this.db.list<Userprofile>('userprofile_list',ref => ref.child("id").equalTo(id));
    }


    /*checkUserandpush(userprofile: Userprofile){
      return this.db.list<Userprofile>('userprofile_list',ref => ref.child("id").equalTo(userprofile.id)

      );

    }/*]]*/
    datachecklist = [];

    checkUserandpush(userprofile: Userprofile){
     /* firebase.database().ref("userprofile_list").child("id").equalTo(userprofile.id)
      .once("value").then(function(snapshot) {
        this.datachecklist = [];
        snapshot.forEach(snap => {
          this.datachecklist.push(snap);
        })

         if(snapshot.numChildren() > 0){
          console.log("have");
        }
        else{
          this.userprofileListRef.push(userprofile);
        } firebase.database().ref("userprofile_list").child("id").equalTo(userprofile.id)
      .once('value', function(snapshot) {
        this.datachecklist = [];
        snapshot.forEach(function(child){
          this.datachecklist.push(child.val());
        })
      });      firebase.database().ref("userprofile_list").child("id").equalTo(userprofile.id)
      .on('value', snapshot =>
      {
         this.datachecklist  = [];
         snapshot.forEach(snap => {
           this.datachecklist.push(snap.val());
           return false;
         });
      });
      });*/

      /*
      var sss = this.db.list<Userprofile>('userprofile_list',ref => ref.child("id").equalTo(userprofile.id)
      .once('value')
      .then(snapshot => {
        snapshot.forEach(snap =>
            this.datachecklist.push(snap.val());
            return false;
          )

      }).catch(error => console.log(error));
      )
      );*/

      /*var sss = { };
      sss["id"] = 2;
      this.datachecklist.push(sss);*/
      return this.datachecklist;
    }
}
