import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../../user/authentication.service';
import { ProjectDetails,BidDetails } from '../../project/auth-project.service';
import { AuthHomeService, ViewProjectObject, bidResponseDetails, requestDetails } from '../auth-home.service'
import { ActivatedRoute } from '@angular/router';
import { DevHomeComponent } from '../../home/dev-home/dev-home.component';
import { SocketcommService } from '../../Chatt/chat/socketcomm.service';



@Component({
  selector: 'app-dev-view-project',
  templateUrl: './dev-view-project.component.html',
  styleUrls: ['./dev-view-project.component.css']
})
export class DevViewProjectComponent implements OnInit {

  marked1=true
  marked2=false
  marked3=true
  marked4=false
  view1 = true
  view2 = false
  currentDate = new Date();
  newDate:Date
  diff:number
  

  public chat={
    rEmail:'',
    uName : '',
    uId : 0,
    rId : 0
  }
  friendDetails={
    u_id:0,
    friend_id:0
  }
  userName:string;
  userId:number;




  constructor(
    private auth: AuthenticationService,
    private route: ActivatedRoute,
     private authHome: AuthHomeService,
     private chatService:SocketcommService,
     private devHome: DevHomeComponent) { }

  viewdetails: ViewProjectObject={
    project_ID: 0,
    client_ID : 0,
    developer_ID:0
  }

  details={
    project_ID: 0 
  }


  credentials:bidResponseDetails={
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
    this.viewdetails.project_ID = this.devHome.project_ID


    this.route.queryParams.subscribe(params => {

      this.details.project_ID = this.devHome.project_ID

      this.authHome.dev_getProject(this.details).subscribe(
        project=>{
         
          this.viewdetails.client_ID = project.user.id
          this.project = project

          if(this.project.payment == ''){
            this.view1 = false
            this.view2 = true
            
            this.authHome.dev_getBid(this.viewdetails).subscribe(
              bid=>{
                this.bid = bid
                this.newDate = new Date(this.bid.start_date);
                this.diff = Math.ceil((this.currentDate.valueOf() - this.newDate.valueOf())/(1000 * 3600 * 24));
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
      
    })

    
    this.authHome.getBid(this.viewdetails).subscribe(
      bid=>{
        this.bids=bid
          this.marked1=false
          this.marked2=true
        
      },
      err=>{
        console.error(err)
      }
      
    )

    
    this.authHome.getRequest(this.viewdetails).subscribe(
      request=>{
          this.marked3=false
          this.marked4=true
      },
      err=>{
        console.log(err)
      }
  )


  }

  gotoChat(){
    console.log('went to chat');

    this.details.project_ID = this.devHome.project_ID

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


  logout(){
    this.auth.logout()
  }


  sendRequest(){

    if(window.confirm('Do you want to send request?')){

    this.requestProject.developer_ID=this.auth.getUserDetails().id

      this.requestProject.project_ID = this.devHome.project_ID

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
    
  }


  cancleRequest(){
    if(window.confirm('Do you want to cancle request?')){

    this.requestProject.developer_ID=this.auth.getUserDetails().id

    this.requestProject.project_ID = this.devHome.project_ID

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

  }

  
  

  sendBid(){

    if(window.confirm('Do you want to send bid?')){
    this.credentials.developer_ID=this.auth.getUserDetails().id
 
      this.credentials.project_ID = this.devHome.project_ID

    this.authHome.sendBid(this.credentials).subscribe(
      bid=>{
        this.ngOnInit()
        
      },
      err=>{
        console.log(err)
      }
    )
    }
  }


  bidAgain(){

    if(window.confirm('Do you want to change bid?')){
    this.credentials.developer_ID=this.auth.getUserDetails().id

    this.credentials.project_ID = this.devHome.project_ID

    this.authHome.editBid(this.credentials).subscribe(
      result=>{
        this.ngOnInit()
      },
      err=>{
        console.log(err)
      }
    )

    }
  }


  deleteBid(){

    if(window.confirm('Do you want to delete bid?')){

    this.viewdetails.developer_ID=this.auth.getUserDetails().id
    this.viewdetails.project_ID = this.devHome.project_ID

    this.authHome.deleteBid(this.viewdetails).subscribe(
      result=>{
        window.location.reload();
      },
      err=>{
        console.log(err)
      }
    )


    }
  }


  backToHome(){
    this.devHome.marked = true
  }



}
