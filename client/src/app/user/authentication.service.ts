import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'

export interface UserDetails {
  id: number
  first_name: string
  last_name: string
  user_type: string
  email: string
  password: string
  gender: string
  contact_no: string
  profile_img: string
  isActivated: boolean
  exp: number
  iat: number
}

interface TokenResponse {
  token: string
}

export interface TokenPayload {
  id: number
  first_name: string
  last_name: string
  user_type: string
  email: string
  password: string
  gender: string
  contact_no: string
  profile_img: string
  isActivated: boolean
}


export interface SkillPayload{
  web_skill1: string,
  web_skill2: string,
  web_skill3: string,
  web_skill4: string,
  web_skill5: string,
  web_skill6: string,
  design_skill1: string,
  design_skill2: string,
  design_skill3: string,
  design_skill4: string,
  design_skill5: string,
  design_skill6: string,
  writing_skill1: string,
  writing_skill2: string,
  writing_skill3: string,
  writing_skill4: string,
  writing_skill5: string,
  writing_skill6: string,
  data_skill1: string,
  data_skill2: string,
  data_skill3: string,
  data_skill4: string,
  other_skill: string,

  
};


export interface skillDetails{
  id: number
  user_ID: number
  user_email: string
  web_skill: string
  design_skill: string
  writing_skill: string
  data_skill: string
  other_skill: string
  exp: number
  iat: number
};

export interface skillObject{
  id: number,
  user_ID: number,
  user_email: string,
  web_skill: string,
  design_skill: string,
  writing_skill: string,
  data_skill: string,
  other_skill: string
};

export interface clientID{
  client_ID: number,
};

export interface developerID{
  developer_ID: number,
};

export interface userID{
  user_ID: number,
  image_name: string
};

@Injectable()
export class AuthenticationService {
  private token: string

  constructor(private http: HttpClient, private router: Router) {}
  
  img_link = "http://localhost:3000/"

  private saveToken(token: string): void {
    localStorage.setItem('usertoken', token)
    this.token = token
  }

  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('usertoken')
    }
    return this.token
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken()
    let payload
    if (token) {
      payload = token.split('.')[1]
      payload = window.atob(payload)
      return JSON.parse(payload)
    } else {
      return null
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails()
    if (user) {
      return user.exp > Date.now() / 1000
    } else {
      return false
    }
  }


  public dev_register(user: TokenPayload): Observable<any> {
      return this.http.post(`/users/dev_register`, user)
  }


  public cli_register(user: TokenPayload): Observable<any> {
    return this.http.post(`/users/cli_register`, user)
  }


  public SaveSkill(skill): Observable<any> {
    return this.http.post(`/users/skill`, skill)
  }

  public SaveTechnology(techno): Observable<any> {
    return this.http.post(`/users/techno`, techno)
  }

  public sendEmail(user): Observable<any>{
    return this.http.post(`/users/register/send`, user)
  }


  public verifyEmail(verify_details): Observable<any>{
    return this.http.post(`/users/verify`,verify_details)
  }


  public login(user: TokenPayload): Observable<any> {
    const base = this.http.post(`/users`, user)

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token)
        }
        return data
      })
    )

    return request
  }


  public profile(): Observable<any> {
    return this.http.get(`/users/profile`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }

  public skillprofile(): Observable<any> {
    return this.http.get(`/users/skillprofile`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }

  public technoprofile(): Observable<any> {
    return this.http.get(`/users/technoprofile`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }


  public editProf(user: TokenPayload): Observable<any> {

    const base = this.http.post(`/users/editProf`, user)

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token)
        }
        return data
      })
    )

    return request
  }

  public updateSkill(skill): Observable<any> {
    return this.http.post(`/users/updateSkill`, skill)
  }

  public updateTechnology(techno): Observable<any> {
    return this.http.post(`/users/updateTechnology`, techno)
  }
  
  public logout(): void {
    this.token = ''
    window.localStorage.removeItem('usertoken')

  }



  public countRequest(client_ID:clientID): Observable<any> {
    return this.http.post(`/users/cli_home/countRequest`, client_ID)
  }


  public countBid(client_ID:clientID): Observable<any> {
    return this.http.post(`/users/cli_home/countBid`, client_ID)
  }

  public countAccept(client_ID:clientID): Observable<any> {
    return this.http.post(`/users/cli_home/countAccept`, client_ID)
  }

  public countRequestDeveloper(developer_ID:developerID): Observable<any> {
    return this.http.post(`/users/dev_home/countRequestDeveloper`, developer_ID)
  }


  public countAcceptBidReq(request_Data: developerID): Observable<any>{
    return this.http.post(`/users/dev_home/countAcceptBidReq`,request_Data)
  }

  public countAcceptProReq(request_Data: developerID): Observable<any>{
    return this.http.post(`/users/dev_home/countAccProReq`,request_Data)
  }

  public sendUserID(userData:userID):Observable<any>{
    return  this.http.post(`/users/sendID`,userData)
  }

  public uploadProfileImage(fd):Observable<any>{
    return this.http.post(`/users/proImage`,fd)
  }


  public forgotPassword(email):Observable<any>{
    return this.http.post(`/users/forgotPwd`,email)
  }

  public newPassword(data):Observable<any>{
    return this.http.post(`/users/newPwd`,data)
  }


  public getPassword(): Observable<any> {
    return this.http.get(`/users/getPwd`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }

  public changePassword(details):Observable<any>{
    const base= this.http.post(`/users/changePwd`,details)

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token)
        }
        return data
      })
    )

    return request
  }


  public sendNewEmail(details): Observable<any>{
    return this.http.post(`/users/sendNewEmail`, details)
  }


  public updateEmail(details): Observable<any>{
    return this.http.post(`/users/updateEmail`, details)
  }

  public devGetFeedback():Observable<any>{
    return this.http.get(`/users/rating/devgetFeedback`,{
      headers: { Authorization: ` ${this.getToken()}` }
      })
  }


}





