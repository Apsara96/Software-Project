import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload, userID } from '../authentication.service';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-cli-register',
  templateUrl: './cli-register.component.html',
  styleUrls: ['./cli-register.component.css']
})
export class CliRegisterComponent implements OnInit {
  ngOnInit() {}

  marked = true
  precontact_no = '';
  postcontact_no = '';
   load=false
  credentials: TokenPayload = {
    id: 0,
    first_name: '',
    last_name: '',
    user_type:'Client',
    email: '',
    password: '',
    gender: '',
    contact_no:'',
    profile_img: '',
    isActivated: false
  };

  confirm_password:string = ''

  constructor(private auth: AuthenticationService, private router: Router,
    private log: LoginComponent) {}

  register() {

    this.credentials.contact_no = this.precontact_no+"-"+this.postcontact_no
          this.auth.cli_register(this.credentials).subscribe(
            () => {
              this.marked = false
              this.auth.sendEmail(this.credentials).subscribe(
                msg =>{
                  this.router.navigateByUrl('/pleaseVerify')
                }
              )  
            },
            err => {
              console.error(err);
            }
          );
          
  }

  checkMatch(){
    if(this.credentials.password!=this.confirm_password){
      return true;
    }else{
      return false;
    }
  }
  loadSpin(){
    this.load=true
  } 



}
