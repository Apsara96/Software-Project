import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService, clientID } from '../authentication.service';
import { Router } from '@angular/router';
import * as socketIo from 'socket.io-client';
import { SocketcommService } from '../../Chatt/chat/socketcomm.service';
import { Subscription, timer, pipe } from 'rxjs';
import { switchMap } from 'rxjs/operators';




@Component({
  selector: 'app-cli-appbar',
  templateUrl: './cli-appbar.component.html',
  styleUrls: ['./cli-appbar.component.css'],

})



export class CliAppbarComponent implements OnInit {

  constructor(private auth: AuthenticationService, private router: Router,private chatService:SocketcommService) { }

  client_data: clientID = {
    client_ID: this.auth.getUserDetails().id
  }
  chatNoti={
    id:0
  }

  countRequest: number = null
  countBid: number = null
  countAccept: number = null
  subscription1: Subscription;
  subscription2: Subscription;
  subscription3: Subscription;
  subscription4: Subscription;
  totalCount:number = 0
  chatCount:any
  ngOnInit() {
    this.chatNoti.id=this.auth.getUserDetails().id
    this.subscription1 = timer(0, 10000).pipe(
      switchMap(() =>this.auth.countRequest(this.client_data))
      ).subscribe(
      request => {
        this.countRequest = request
        this.totalCount = this.totalCount + request
      },
      err => {
        console.log(err)
      }
    )


    this.subscription2 = timer(0, 10000).pipe(
      switchMap(() =>this.auth.countBid(this.client_data))
      ).subscribe(
      request => {
        this.countBid = request
        this.totalCount = this.totalCount + request
      },
      err => {
        console.log(err)
      }
    )


    this.subscription3 = timer(0, 10000).pipe(
      switchMap(() =>this.auth.countAccept(this.client_data))
      ).subscribe(
        request => {
          this.countAccept = request
          this.totalCount = this.totalCount + request
        },
        err => {
          console.log(err)
        }
    )


    this.subscription4 = timer(0, 1000).pipe(
      switchMap(() =>this.chatService.chatNotification( this.chatNoti))
      ).subscribe(
        request => {
          this.chatCount = request
         console.log("chatCOunt:"+this.chatCount)
        },
        err => {
          console.log(err)
        }
    )
    

   
 }

  
 ngOnDestroy() {
  this.subscription1.unsubscribe()
  this.subscription2.unsubscribe()
  this.subscription3.unsubscribe()
  this.subscription4.unsubscribe()
}

  logout() {
    if(window.confirm("Do you want to logout")){
      this.auth.logout()
    }
  }


}
