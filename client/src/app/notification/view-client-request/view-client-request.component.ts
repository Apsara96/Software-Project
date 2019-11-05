import { Component, OnInit } from '@angular/core';
import { AuthNotificationService, viewDevReq } from '../auth-notification.service'
import { AuthenticationService } from 'src/app/user/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { requestDeveloperDetails } from 'src/app/home/auth-home.service';
import { DevViewNotificationComponent } from 'src/app/notification/dev-view-notification/dev-view-notification.component'

@Component({
  selector: 'app-view-client-request',
  templateUrl: './view-client-request.component.html',
  styleUrls: ['./view-client-request.component.css']
})
export class ViewClientRequestComponent implements OnInit {

  constructor(
    private authNot: AuthNotificationService, 
    private auth: AuthenticationService, 
    private route: ActivatedRoute, 
    private router: Router,
    private devNot: DevViewNotificationComponent
    ) { }

  request_data:viewDevReq={
    notification_ID:0,
    developer_ID:0
  }

  Not_details:requestDeveloperDetails

  marked1 = true
  marked2 = false

  ngOnInit() {

    this.request_data.developer_ID = this.auth.getUserDetails().id

    this.request_data.notification_ID = this.devNot.cliNot_ID


    this.authNot.viewRequestDeveloper(this.request_data).subscribe(
      res=>{
        this.Not_details = res

        if(this.Not_details.isAccepted == true){
          this.marked1 = false,
          this.marked2 = true
        }
      }
    )

  }


  acceptRequest(){

    if(window.confirm('Do you want to accept project the request?')){
    this.request_data.developer_ID = this.auth.getUserDetails().id

    this.request_data.notification_ID = this.devNot.cliNot_ID


    this.authNot.acceptRequestDeveloper(this.request_data).subscribe(
      result=>{
        if(result.success == 1){
          this.ngOnInit()
        }else{
          window.alert('The project is already accepted by another user')
        }
      },
      err=>{
        console.log(err)
      }
    )
    }

    
  }


  BackToNotification(){

  }

}
