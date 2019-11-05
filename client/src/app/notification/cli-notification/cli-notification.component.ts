import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/user/authentication.service';
import { AuthNotificationService, clientID } from 'src/app/notification/auth-notification.service';
import { requestDetails, bidResponseDetails, requestDeveloperDetails } from 'src/app/home/auth-home.service';
import { Router } from '@angular/router';
import { Subscription, timer, pipe } from 'rxjs';
import { switchMap, delay } from 'rxjs/operators';


@Component({
  selector: 'app-cli-notification',
  templateUrl: './cli-notification.component.html',
  styleUrls: ['./cli-notification.component.css']
})
export class CliNotificationComponent implements OnInit {

  constructor(private auth: AuthenticationService, private route: Router, private authNot: AuthNotificationService) { }


  client_data:clientID={
    client_ID: 0
  }

  requestNotificationNew:requestDetails
  bidNotificationNew: bidResponseDetails
  developerAcceptNew: requestDeveloperDetails
  requestNotificationOld:requestDetails
  bidNotificationOld: bidResponseDetails
  developerAcceptOld: requestDeveloperDetails


  marked1:boolean = false
  marked2:boolean = false
  marked3:boolean = false
  marked4:boolean = false
  marked5:boolean = false
  marked6:boolean = false
  view:boolean = true
  view1:boolean = false
  view2:boolean = false
  view3:boolean = false

  subscription1: Subscription;
  subscription2: Subscription;
  subscription3: Subscription;
  subscription4: Subscription;
  subscription5: Subscription;
  subscription6: Subscription;

  
  ngOnInit() {

    this.client_data.client_ID=this.auth.getUserDetails().id


    this.subscription1 = timer(0, 10000).pipe(
      switchMap(() =>this.authNot.newAllRequest(this.client_data))
      ).subscribe(
        request=>{
          if(request!=''){
            this.requestNotificationNew = request
            this.marked1=true
          }else{
            this.requestNotificationNew = request
            this.marked1 = false
          }
        },
        err=>{
          console.log(err)
        }
    )


    this.subscription2 = timer(0, 10000).pipe(
      switchMap(() => this.authNot.newAllBid(this.client_data))
      ).subscribe(
        request=>{
          if(request!=''){
            this.bidNotificationNew = request
            this.marked2=true
          }else{
            this.bidNotificationNew = request
            this.marked2=false
          }
        },
        err=>{
          console.log(err)
        }
    )


    this.subscription3 = timer(0, 10000).pipe(
      switchMap(() =>this.authNot.newAllAcception(this.client_data))
      ).subscribe(
        request=>{
          if(request!=''){
            this.developerAcceptNew = request
            this.marked3=true
          }else{
            this.developerAcceptNew = request
            this.marked3=false
          }
        },
        err=>{
          console.log(err)
        }
    )


    this.subscription4 = timer(0, 10000).pipe(
      switchMap(() =>this.authNot.oldAllRequest(this.client_data))
      ).subscribe(
        request=>{
          if(request!=''){
            this.requestNotificationOld = request
            this.marked4=true
          }else{
            this.requestNotificationOld = request
            this.marked4=false
          }
        },
        err=>{
          console.log(err)
        }
    )


    this.subscription5 = timer(0, 10000).pipe(
      switchMap(() =>this.authNot.oldAllBid(this.client_data))
      ).subscribe(
        request=>{
          if(request!=''){
            this.bidNotificationOld = request
            this.marked5=true
          }else{
            this.bidNotificationOld = request
            this.marked5=false
          }
        },
        err=>{
          console.log(err)
        }
    )



    this.subscription6 = timer(0, 10000).pipe(
      switchMap(() => this.authNot.oldAllAcception(this.client_data))
      ).subscribe(
        request=>{
          if(request!=''){
            this.developerAcceptOld = request
            this.marked6=true
          }else{
            this.developerAcceptOld = request
            this.marked6=false
          }
        },
        err=>{
          console.log(err)
        }
      )


  }


  // proNot_ID: number;
  // bidNot_ID: number;
  // accNot_ID: number;

  async viewProjectRequest(not_ID:number){
    // this.proNot_ID = not_ID
    // this.view = false
    // this.view1 = true
    // this.view2 = false
    // this.view3 = false
    this.route.navigate(['/cliCatagory/notification'], { queryParams: { not_id: not_ID, type:1 } });
    await delay(500);
    window.location.reload()

  }

  async viewBidResponse(not_ID:number){
    // this.bidNot_ID = not_ID
    // this.view = false
    // this.view1 = false
    // this.view2 = true
    // this.view3 = false
    this.route.navigate(['/cliCatagory/notification'], { queryParams: { not_id: not_ID, type:2 } });
    await delay(500);
    window.location.reload()
  }

  async viewDevAccept(not_ID:number){
    // this.accNot_ID = not_ID
    // this.view = false
    // this.view1 = false
    // this.view2 = false
    // this.view3 = true
    this.route.navigate(['/cliCatagory/notification'], { queryParams: { not_id: not_ID, type:3 } });
    await delay(500);
    window.location.reload()
  }


   ngOnDestroy() {
  this.subscription1.unsubscribe()
  this.subscription2.unsubscribe()
  this.subscription3.unsubscribe()
  this.subscription4.unsubscribe()
  this.subscription5.unsubscribe()
  this.subscription6.unsubscribe()
}

}
