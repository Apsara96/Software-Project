import { Component, OnInit } from '@angular/core';
import { UserDetails, AuthenticationService,userID } from '../authentication.service';
import { Router } from '@angular/router';
import { Url } from 'url';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-cli-profile',
  templateUrl: './cli-profile.component.html',
  styleUrls: ['./cli-profile.component.css']
})
export class CliProfileComponent implements OnInit {

  details: UserDetails

  marked1 = true
  marked2 = false

  profileImage:File = null
  id: number
  fileUrl: Url

  userData:userID={
    user_ID:0,
    image_name: ''
  }


  current_password: ''
  current_password1: ''
  password: ''

  pwdData={
    id: 0,
    password: ''
  }

  confirm_password:string = ''

  emailData={
    id: 0,
    email: ''
  }
  feedback: any;
  

  constructor(private auth: AuthenticationService, private router: Router) {}

  ngOnInit() {
    if(localStorage.getItem('usertoken')){
      this.marked1 = true
      this.marked2 = false
      this.auth.profile().subscribe(
        user => {
          this.details = user
        },
        err => {
          console.error(err)
        })
        
    }else{
      this.router.navigateByUrl("/home/login");
    }

    this.auth.getPassword().subscribe(
      result=>{
        this.password = result.password
      }
    )


    this.auth.cliGetFeedback().subscribe(
      result=>{
        this.feedback = result
        console.log(result)
      }
    )

  }

  showEditProf(){
    this.marked1 = false
    this.marked2 = true
  }

  cancleEditProfile(marked1,marked2){
    this.marked1 = marked1
    this.marked2 = marked2
  }

  onFileSelected(event){
    this.profileImage=<File>event.target.files[0]

    this.userData.user_ID = this.auth.getUserDetails().id;
    this.userData.image_name = this.details.profile_img
    console.log(this.userData)
    const fd = new FormData()
    fd.append('profileImage', this.profileImage,this.profileImage.name)
    
    this.auth.sendUserID(this.userData).subscribe(
      res=>{

      }
    )

    this.auth.uploadProfileImage(fd).subscribe(
      user=>{
        window.location.reload()
      }
    )
  }


  CheckPassword(){

    if(this.current_password == this.password){
      return true;
    }else{
      return false;
    }
  }

  CheckPassword1(){

    if(this.current_password1 == this.password){
      return true;
    }else{
      return false;
    }
  }

  ChangePassword(){

    this.pwdData.id = this.auth.getUserDetails().id

    console.log(this.pwdData)
    
    this.auth.changePassword(this.pwdData).subscribe(
      result=>{
        window.location.reload()
      }
    )
  }

  checkMatch(){
    if(this.pwdData.password!=this.confirm_password){
      return true;
    }else{
      return false;
    }
  }


  ChangeEmail(){
    this.emailData.id = this.auth.getUserDetails().id

    this.auth.sendNewEmail(this.emailData).subscribe(
      msg =>{
        this.router.navigateByUrl('/pleaseVerify')
      }
    )  

  }

}
