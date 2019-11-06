import { Component, OnInit } from '@angular/core';
import { AuthProjectService } from '../auth-project.service';
import { AuthenticationService } from 'src/app/user/authentication.service';
import { Router } from '@angular/router';
import { DevProjectComponent } from 'src/app/project/dev-project/dev-project.component'
import { flatMap } from 'rxjs/operators';
import { AuthHomeService } from 'src/app/home/auth-home.service';


@Component({
  selector: 'app-dev-view-my-project',
  templateUrl: './dev-view-my-project.component.html',
  styleUrls: ['./dev-view-my-project.component.css']
})
export class DevViewMyProjectComponent implements OnInit {

  constructor(
    private authPro: AuthProjectService,
    private router: Router,
    private auth: AuthenticationService,
    private devPro: DevProjectComponent,
    private authHome: AuthHomeService
  ) { }


  view_details={
    notID:0
  }

  fixPro
  bidPro
  recPro

  marked1
  marked2
  marked3

  requestProject={
    developer_ID:0,
    project_ID:0,
    isViewed: false,
    isAccepted: false
  }

  viewdetails={
    project_ID: 0,
    client_ID : 0,
    developer_ID:0
  }

  credentials={
    developer_ID: 0,
    project_ID: 0,
    bid_value: 0,
    isViewed: false,
    isAccepted: false
  }

  set1 = true

  rateSelect = false
  rateValue = 0

  rateDetails = {
    dev_Id: 0,
    rating :0
  }


  public model = {
    editorData: '',
    client_ID: 0,
    project_ID: 0,
    developer_ID: 0
  }



  ngOnInit() {

    this.requestProject.developer_ID=this.auth.getUserDetails().id

    if(this.devPro.type == 1){

      this.marked1 = true
      this.marked2 = false
      this.marked3 = false

      this.view_details.notID = this.devPro.fixID

      this.authPro.view_fix_pro(this.view_details).subscribe(
        project =>{
          this.fixPro = project
          this.requestProject.project_ID = project.project.id
          this.model.project_ID = project.project.id
          this.model.client_ID = project.project.user.id
        }
      )

    }else if(this.devPro.type == 2){

      this.marked1 = false
      this.marked2 = true
      this.marked3 = false

      this.view_details.notID = this.devPro.bidID

      this.authPro.view_bid_pro(this.view_details).subscribe(
        project =>{
          this.bidPro = project
          this.credentials.developer_ID = this.auth.getUserDetails().id
          this.credentials.project_ID = project.project.id
          this.viewdetails.client_ID = project.project.user.id
          this.viewdetails.project_ID = project.project.id
          this.viewdetails.developer_ID = this.auth.getUserDetails().id

          this.rateDetails.dev_Id =project.project.user.id

          this.model.project_ID = project.project.id
          this.model.client_ID = project.project.user.id
        }
      )

    }else if(this.devPro.type == 3){

      this.marked1 = false
      this.marked2 = false
      this.marked3 = true

      this.view_details.notID = this.devPro.recID

      this.authPro.view_rec_pro(this.view_details).subscribe(
        project =>{
          this.recPro = project

          this.model.project_ID = project.project.id
          this.model.client_ID = project.project.user.id
        }
      )
    }
  }


  BackToProject(){
      this.devPro.marked = true
  }


  cancleRequest(){

    if(window.confirm('Do you want to cancle the request?')){

    this.authHome.cancleRequest(this.requestProject).subscribe(
        request=>{
            window.location.reload()
        },
        err=>{
          console.log(err)
        }
    )
    }

  }


  bidAgain(){

    if(window.confirm('Do you want to edit the bid?')){

    this.authHome.editBid(this.credentials).subscribe(
      result=>{
        window.alert('You have successfully updated bid!')
        this.ngOnInit()
      },
      err=>{
        console.log(err)
      }
    )
    }
    
  }


  deleteBid(){

    if(window.confirm('Do you want to delete the bid?')){

    this.authHome.deleteBid(this.viewdetails).subscribe(
      ()=>{
        window.location.reload();
      },
      err=>{
        console.log(err)
      }
    )


  }

}


sendRate(){

  this.rateDetails.rating = this.rateValue
  this.rateDetails.dev_Id = this.model.client_ID

  console.log(this.rateDetails);
  this.authPro.send_rate(this.rateDetails).subscribe((res)=>{
    console.log('rate respond:'+res);
    this.set1 = false
  })
}

rate(val){
  this.rateValue=val;
}

sendFeedback(){

  this.model.developer_ID = this.auth.getUserDetails().id

  this.authPro.dev_send_feedback(this.model).subscribe(
    result => {
      this.set1 = true
      window.location.reload()
    },
    err => {
      console.error(err);
    }
  )
  
}

}



