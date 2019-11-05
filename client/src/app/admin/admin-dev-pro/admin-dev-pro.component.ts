import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthHomeService, ViewDeveloperObject, requestDeveloperDetails } from '../../home/auth-home.service'
import { AuthenticationService, UserDetails, skillDetails } from '../../user/authentication.service';
import { AuthProjectService, ProjectDetails } from '../../project/auth-project.service';
import { BanedUsersComponent } from '../baned-users/baned-users.component';
import { SocketcommService } from '../../Chatt/chat/socketcomm.service';

@Component({
  selector: 'app-admin-dev-pro',
  templateUrl: './admin-dev-pro.component.html',
  styleUrls: ['./admin-dev-pro.component.css']
})
export class AdminDevProComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private authHome: AuthHomeService,
    private auth: AuthenticationService,
    private authPro: AuthProjectService,
    private chatService: SocketcommService,
    private baneUser: BanedUsersComponent
  ) { }

  viewdetails: ViewDeveloperObject = {
    user_ID: 0,
    skill_ID: 0
  }

  chatEmail: string;
  chatName: string;
  public chat = {
    rEmail: '',
    uName: '',
    uId: 0,
    rId: 0
  }
  friendDetails = {
    u_id: 0,
    friend_id: 0
  }

  developer: UserDetails
  technos
  projects: ProjectDetails
  requested_developers: requestDeveloperDetails

  type: string

  web = false
  design = false
  writing = false
  data = false


  credentials: requestDeveloperDetails = {
    client_ID: 0,
    project_ID: 0,
    developer_ID: 0,
    isViewed: false,
    isAccepted: false
  }
  userName: string;
  userId: number;
 mar
  marked1 = true
  marked2 = false

  details = {
    user_ID: 0
  }


  ngOnInit() {
    this.userName = this.auth.getUserDetails().first_name
    this.userId = this.auth.getUserDetails().id
    this.details.user_ID = this.baneUser.ID

    this.credentials.client_ID = this.auth.getUserDetails().id
    this.credentials.developer_ID = this.baneUser.ID

    this.authHome.cli_getDeveloper(this.details).subscribe(
      user => {
        this.developer = user
        console.log(this.developer)
      },
      err => {
        console.error(err)
      }
    )

    this.authHome.cli_getTechno(this.details).subscribe(
      techno => {
        this.technos = techno
        console.log(this.technos)
      },
      err => {
        console.error(err)
      }
    )


    this.authPro.viewAllCurrentProject().subscribe(
      project => {
        this.projects = project
      },
      err => {
        console.log(err)
      }
    )

    this.authHome.cli_getAllRequest(this.credentials).subscribe(
      requested_developers => {
        this.marked1 = false
        this.marked2 = true
        this.requested_developers = requested_developers
      },
      err => {
        console.log(err)
      }
    )

  }


  requestDeveloper() {

    if (window.confirm("Do you want to request the developer?")) {

      this.credentials.client_ID = this.auth.getUserDetails().id


      this.credentials.developer_ID = this.baneUser.ID



      this.authHome.cli_sendRequest(this.credentials).subscribe(
        request => {
          this.marked1 = false
          this.marked2 = true
          this.ngOnInit()
        },
        err => {
          window.alert("You have requested for this already!")
        }
      )

    }
  }


  BackToHome(){
    this.baneUser.marked = true
  }



  gotoChat() {
    console.log('went to chat');
    this.authHome.cli_getDeveloper(this.details).subscribe(
      user => {
        this.developer = user;
        this.chat.rEmail = this.developer.email;
        this.chat.uName = this.userName;
        this.chat.uId = this.userId;
        this.chat.rId = this.developer.id
        console.log("developer email:" + this.chat.rEmail + ' user name:' + this.chat.uName + ' uId:' + this.chat.uId + ' rid:' + this.chat.rId);
        this.friendDetails.u_id = this.userId;
        this.friendDetails.friend_id = this.developer.id;
        console.log("userid:" + this.friendDetails.u_id + " frendid" + this.friendDetails.friend_id);

        this.chatService.checkFriend(this.friendDetails).subscribe(
          xx => {
            console.log(xx);
          }
        );
        this.chatService.checkStatus(this.chat);
      },
      err => {
        console.error(err)
      }
    )
  }


}
