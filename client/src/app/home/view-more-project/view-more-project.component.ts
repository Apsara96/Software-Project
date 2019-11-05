import { Component, OnInit } from '@angular/core';
import { DevAllComponent } from '../dev-all/dev-all.component'
import { AuthenticationService, UserDetails } from '../../user/authentication.service';
import { ProjectDetails, BidDetails } from '../../project/auth-project.service';
import { AuthHomeService, ViewProjectObject, bidResponseDetails, requestDetails } from '../auth-home.service'
import { ActivatedRoute } from '@angular/router';
import { SocketcommService } from '../../Chatt/chat/socketcomm.service';

@Component({
  selector: 'app-view-more-project',
  templateUrl: './view-more-project.component.html',
  styleUrls: ['./view-more-project.component.css']
})
export class ViewMoreProjectComponent implements OnInit {

  constructor(
    private all: DevAllComponent,
    private auth: AuthenticationService,
    private route: ActivatedRoute,
    private authHome: AuthHomeService,
    private chatService: SocketcommService
  ) { }


  marked1=true
  marked2=false
  marked3=true
  marked4=false
  view1 = true
  view2 = false
  currentDate = new Date();
  newDate: Date
  diff: number

  viewdetails: ViewProjectObject = {
    project_ID: 0,
    client_ID: 0,
    developer_ID: 0
  }

  details = {
    project_ID: 0
  }

  credentials: bidResponseDetails = {
    developer_ID: 0,
    project_ID: 0,
    bid_value: 0,
    isViewed: false,
    isAccepted: false
  }


  project: ProjectDetails
  client: UserDetails
  bid: BidDetails

  bids: bidResponseDetails


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
  userName: string;
  userId: number;


  requestProject:requestDetails={
    developer_ID:0,
    project_ID:0,
    isViewed: false,
    isAccepted: false
  }

  ngOnInit() {

    this.userName = this.auth.getUserDetails().first_name
    this.userId = this.auth.getUserDetails().id

    this.viewdetails.developer_ID = this.auth.getUserDetails().id
    this.viewdetails.project_ID = this.all.project_ID
    this.details.project_ID = this.all.project_ID

    this.authHome.dev_getProject(this.details).subscribe(
      project => {

        this.viewdetails.client_ID = project.user.id
        this.project = project

        if (this.project.payment == '') {
          this.view1 = false
          this.view2 = true

          this.authHome.dev_getBid(this.viewdetails).subscribe(
            bid => {
              this.bid = bid
              this.newDate = new Date(this.bid.start_date);
              this.diff = Math.ceil((this.currentDate.valueOf() - this.newDate.valueOf()) / (1000 * 3600 * 24));
            },
            err => {
              console.error(err)
            }
          )
        }
      },
      err => {
        console.error(err)
      }
    )


    this.authHome.getBid(this.viewdetails).subscribe(
      bid => {
        this.bids = bid
        this.marked1 = false
        this.marked2 = true

      },
      err => {
        console.error(err)
      }

    )


    this.authHome.getRequest(this.viewdetails).subscribe(
      request => {
        this.marked3 = false
        this.marked4 = true
      },
      err => {
        console.log(err)
      }
    )
  }




  gotoChat(){
    console.log('went to chat');

    this.details.project_ID = this.all.project_ID

    this.authHome.dev_getProject(this.details).subscribe(
      project=>{
   
        this.client=project.user;
        this.chat.rEmail=this.client.email;
        this.chat.uName=this.userName;
        this.chat.uId=this.userId;
        this.chat.rId=this.client.id
        console.log("developer email:"+this.chat.rEmail+' user name:'+this.chat.uName+' uId:'+this.chat.uId+' rid:'+this.chat.rId);
        this.friendDetails.u_id=this.userId;
        this.friendDetails.friend_id=this.client.id;
        console.log("userid:"+this.friendDetails.u_id+" frendid"+ this.friendDetails.friend_id);
      
        this.chatService.checkFriend(this.friendDetails).subscribe(
          xx=>{
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



  sendRequest(){

    this.requestProject.developer_ID=this.auth.getUserDetails().id

      this.requestProject.project_ID = this.all.project_ID

    this.authHome.sendRequest(this.requestProject).subscribe(
        request=>{
          this.marked3=false
          this.marked4=true
        },
        err=>{
          console.log(err)
        }
    )
    
  }


  cancleRequest(){
    this.requestProject.developer_ID=this.auth.getUserDetails().id

      this.requestProject.project_ID = this.all.project_ID

    this.authHome.cancleRequest(this.requestProject).subscribe(
        request=>{
            this.marked3=true
            this.marked4=false
        },
        err=>{
          console.log(err)
        }
    )

  }



  sendBid(){
    this.credentials.developer_ID=this.auth.getUserDetails().id
 
      this.credentials.project_ID = this.all.project_ID

      console.log(this.credentials)

    this.authHome.sendBid(this.credentials).subscribe(
      bid=>{
        this.ngOnInit()
        
      },
      err=>{
        console.log(err)
      }
    )
  }


  bidAgain(){
    this.credentials.developer_ID=this.auth.getUserDetails().id

    this.credentials.project_ID = this.all.project_ID

    this.authHome.editBid(this.credentials).subscribe(
      ()=>{
        
      },
      err=>{
        console.log(err)
      }
    )

    this.ngOnInit()
  }


  deleteBid(){
    this.route.queryParams.subscribe(params => {
      this.viewdetails.project_ID = params['pro_id'];
      this.viewdetails.client_ID = params['cli_id'];
    })

    this.viewdetails.developer_ID=this.auth.getUserDetails().id

    this.authHome.deleteBid(this.viewdetails).subscribe(
      ()=>{
        window.location.reload();
      },
      err=>{
        console.log(err)
      }
    )

   
  }


  back(){
    this.all.marked = true
  }

  


}
