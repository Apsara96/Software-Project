import { Component, OnInit } from '@angular/core';
import { UserDetails, AuthenticationService,userID } from '../user/authentication.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { AuthAdminService } from './auth-admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
 devcount
 clicount
 AllUsers
 banedDetails={
  banedEmail:''
}
type
  constructor(private auth: AuthenticationService, private router: Router,private http: HttpClient,private authAdm: AuthAdminService) { }
   showD=false
   showC=false

  ngOnInit() {
  if(localStorage.getItem('usertoken'))
  {
    this.authAdm.countOfDev().subscribe(
      dev=>{
        this.devcount = dev
      }
    )
    this.authAdm.countOfCli().subscribe(
      cli=>{
        this.clicount = cli
      }
    )
  }
  else{
   this.router.navigateByUrl('/')
 }
  }
 
  showDev(ty){
    this.showD=true
   this.showC=false
   this.type=ty
   this.router.navigate(['/adminCatagory/baned_users'],{queryParams:{xx:this.type}})
  }
  showCli(ty){
    this.showD=false
   this.showC=true
   this.type=ty
   this.router.navigate(['/adminCatagory/baned_users'],{queryParams:{xx:this.type}})

  }
 
  

}
