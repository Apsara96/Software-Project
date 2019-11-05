import { Component, OnInit } from '@angular/core';
import { UserDetails, AuthenticationService,userID } from '../../user/authentication.service';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { AuthAdminService } from '../auth-admin.service'

@Component({
  selector: 'app-baned-users',
  templateUrl: './baned-users.component.html',
  styleUrls: ['./baned-users.component.css']
})

export class BanedUsersComponent implements OnInit {
  details
  detail
  banedDetails={
    banedEmail:''
  }
  marked=true
  type
  ID
  constructor(private auth: AuthenticationService, private router: Router,private http: HttpClient, private authAdm: AuthAdminService,private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activateRoute.queryParams.subscribe(params => {
      this.type = params['xx'];
    })
    console.log("type:" + this.type)
    if(localStorage.getItem('usertoken'))
    {
      if(this.type == 2){
      this.authAdm.allClients().subscribe(
        users=>{
          this.details = users
        }
      )}

      if(this.type == 1){
      this.authAdm.allDevelopers().subscribe(
        users=>{
          this.details = users
        }
      )}



    }
    else{
      this.router.navigateByUrl('/')
  }



}


banedUser(banedEmail:string){
  this.banedDetails.banedEmail=banedEmail
  
  this.authAdm.banedUser(this.banedDetails).subscribe(
    result => {
      this.ngOnInit();
    }
  )
 
}

activateUser(banedEmail:string){
  this.banedDetails.banedEmail=banedEmail
  
  this.authAdm.activateUser(this.banedDetails).subscribe(
    result => {
      this.ngOnInit();
    }
  )

  
 
}
view(id){
  this.ID = id
  console.log("id:"+this.ID)

this.marked = false
}
}
