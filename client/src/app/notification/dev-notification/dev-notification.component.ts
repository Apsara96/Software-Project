import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../user/authentication.service';
import { AuthNotificationService, developerID } from 'src/app/notification/auth-notification.service';
import { requestDeveloperDetails } from 'src/app/home/auth-home.service';
import { Subscription, timer, pipe } from 'rxjs';
import { switchMap, delay } from 'rxjs/operators';

@Component({
  selector: 'app-dev-notification',
  templateUrl: './dev-notification.component.html',
  styleUrls: ['./dev-notification.component.css']
})
export class DevNotificationComponent implements OnInit {

  constructor(private auth: AuthenticationService, private route: Router, private authNot: AuthNotificationService) { }

  developer_data:developerID={
    developer_ID: 0
  }

  requestNotificationNew:requestDeveloperDetails
  requestNotificationOld:requestDeveloperDetails
  accProReqNew
  accProReqOld
  accBidReqNew
  accBidReqOld

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

    this.developer_data.developer_ID=this.auth.getUserDetails().id

    this.subscription1 = timer(0, 10000).pipe(
      switchMap(() =>this.authNot.newAllRequestDeveloper(this.developer_data))
      ).subscribe(
        request=>{
          if(request!=''){
          this.requestNotificationNew=request
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
      switchMap(() =>this.authNot.newAllAcceptProReq(this.developer_data))
      ).subscribe(
        result=>{
          if(result!=''){
            this.accProReqNew=result
            this.marked2=true
          }else{
            this.accProReqNew=result
            this.marked2 = false
          }
        },
        err=>{
          console.log(err)
        }
    )


    this.subscription3 = timer(0, 10000).pipe(
      switchMap(() =>this.authNot.newAllAcceptBidReq(this.developer_data))
      ).subscribe(
        result=>{
          if(result!=''){
            this.accBidReqNew=result
            this.marked3=true
            }else{
              this.accBidReqNew=result
              this.marked3=false
            }
        },
        err=>{
          console.log(err)
        }
    )


    this.subscription4 = timer(0, 10000).pipe(
      switchMap(() =>this.authNot.oldAllRequestDeveloper(this.developer_data))
      ).subscribe(
        request=>{
          if(request!=''){
          this.requestNotificationOld=request
          this.marked4=true
          }else{
            this.requestNotificationOld=request
          this.marked4=false
          }
        },
        err=>{
          console.log(err)
        }
    )


    this.subscription5 = timer(0, 10000).pipe(
      switchMap(() =>this.authNot.oldAllAcceptProReq(this.developer_data))
      ).subscribe(
        result=>{
          if(result!=''){
            this.accProReqOld=result
            this.marked5=true
            }else{
              this.accProReqOld=result
              this.marked5=false
            }
        },
        err=>{
          console.log(err)
        }
    )


    this.subscription5 = timer(0, 10000).pipe(
      switchMap(() =>this.authNot.oldAllAcceptBidReq(this.developer_data))
      ).subscribe(
        result=>{
          if(result!=''){
            this.accBidReqOld=result
            this.marked6=true
            }else{
              this.accBidReqOld=result
              this.marked6=false
            }
        },
        err=>{
          console.log(err)
        }
    )

  }


  // accNot_ID: number;
  // bidNot_ID: number;
  // cliNot_ID: number;


  async viewClientRequest(not_ID:number){
    // this.cliNot_ID = not_ID
    // this.view = false
    // this.view1 = false
    // this.view2 = false
    // this.view3 = true
    this.route.navigate(['/devCatagory/notification'], { queryParams: { not_id: not_ID, type:1 } });
    await delay(500);
    window.location.reload()
  }


  async viewAccProReq(not_ID:number){
    // this.accNot_ID = not_ID
    // this.view = false
    // this.view1 = true
    // this.view2 = false
    // this.view3 = false
    this.route.navigate(['/devCatagory/notification'], { queryParams: { not_id: not_ID, type:2 } });
    await delay(500);
    window.location.reload()
  }

  async viewAccBidReq(not_ID:number){
    // this.bidNot_ID = not_ID
    // this.view = false
    // this.view1 = false
    // this.view2 = true
    // this.view3 = false
    this.route.navigate(['/devCatagory/notification'], { queryParams: { not_id: not_ID, type:3 } });
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
