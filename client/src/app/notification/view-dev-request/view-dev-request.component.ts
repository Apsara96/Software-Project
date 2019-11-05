import { Component, OnInit } from '@angular/core';
import { AuthNotificationService, viewCliReq } from '../auth-notification.service';
import { AuthenticationService } from 'src/app/user/authentication.service';
import { requestDetails } from 'src/app/home/auth-home.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CliViewNotificationComponent } from 'src/app/notification/cli-view-notification/cli-view-notification.component'
import { ProjectHomeComponent } from 'src/app/project/project-home/project-home.component'

@Component({
  selector: 'app-view-dev-request',
  templateUrl: './view-dev-request.component.html',
  styleUrls: ['./view-dev-request.component.css']
})

export class ViewDevRequestComponent implements OnInit {

  request_data:viewCliReq={
    notification_ID:0,
    client_ID:0
  }

  Not_details:requestDetails

  constructor(
    private authNot: AuthNotificationService, 
    private auth: AuthenticationService, 
    private route: ActivatedRoute,
    private cliNot: CliViewNotificationComponent,
    private proHome: ProjectHomeComponent,
    private router: Router,
    ) { }

  ngOnInit() {

    this.request_data.client_ID = this.auth.getUserDetails().id

 
      this.request_data.notification_ID = this.cliNot.proNot_ID

    this.authNot.viewRequestProject(this.request_data).subscribe(
      res=>{
        console.log(res)
        this.Not_details = res
      }
    )
  }

  goToProject( Pro_id){
    this.router.navigateByUrl('/cliCatagory/project')
  }

}
