import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'
import { AuthenticationService } from '../user/authentication.service';

export interface ProjectDetails {
  id: number
  client_ID: number
  project_name: string
  project_category: string
  project_description: string
  payment: string
  exp: number
  iat: number
}

export interface ProjectPayload {
  id: number
  client_ID: number
  project_name: string
  project_category: string
  project_description: string
  payment: string
}

export interface BidDetails {
  id: number
  project_ID: number
  maximum_value: string
  start_date: string
  exp: number
  iat: number
}

export interface BidPayload {
  id: number
  project_ID: number
  maximum_value: string
  start_date: string
}

export interface ConfirmedPro {
  id: number
  developer_ID: number
  client_ID: number
  project_ID: number
  category: string
  isCompleted: boolean
}





@Injectable()
export class AuthProjectService {

  

  constructor(private http: HttpClient, private router: Router, private auth: AuthenticationService) { }

  public uploadAttachment(fd): Observable<any> {
    return this.http.post(`/users/project/attachment`, fd)
  }

  public addProject(project: ProjectPayload): Observable<any> {
    return this.http.post(`/users/project/addProject`, project)
  }

  public viewAllCurrentProject(): Observable<any> {
    return this.http.get(`/users/viewAllCurrentProject`, {
      headers: { Authorization: ` ${this.auth.getToken()}` }
    })
  }

  public viewAllConfiremedProject(): Observable<any> {
    return this.http.get(`/users/viewAllConfirmedProject`, {
      headers: { Authorization: ` ${this.auth.getToken()}` }
    })
  }

  public viewAllCompletedProject(): Observable<any> {
    return this.http.get(`/users/viewAllCompletedProject`, {
      headers: { Authorization: ` ${this.auth.getToken()}` }
    })
  }

  public viewProject(project: ProjectPayload): Observable<any> {
    return this.http.post(`/users/project/viewProject`, project)
  }

  public editProject(project: ProjectPayload): Observable<any> {
    return this.http.post(`/users/project/editProject`, project)
  }

  public deleteProject(project: ProjectPayload): Observable<any> {
    return this.http.post(`/users/project/deleteProject`, project)
  }

  public addBid(bid: BidPayload): Observable<any> {
    return this.http.post(`/users/project/startBid`, bid)
  }


  public viewBid(bid: BidPayload): Observable<any> {
    return this.http.post(`/users/project/viewBid`, bid)
  }

  public editBid(bid: BidPayload): Observable<any> {
    return this.http.post(`/users/project/editBid`, bid)
  }

  public viewBidRequest(project: ProjectPayload): Observable<any> {
    return this.http.post(`/users/project/viewBidReq`, project)
  }

  public viewProjectRequest(project: ProjectPayload): Observable<any> {
    return this.http.post(`/users/project/viewProReq`, project)
  }

  public viewRequestDeveloper(project: ProjectPayload): Observable<any> {
    return this.http.post(`/users/project/viewReqDev`, project)
  }

  public ConfirmedProject(details: ConfirmedPro): Observable<any> {
    return this.http.post(`/users/project/acceptPro`, details)
  }


  public fix_cur_pro(): Observable<any> {
    return this.http.get(`/users/devPro/fix_cur_pro`, {
      headers: { Authorization: `${this.auth.getToken()}` }
    })
  }

  public bid_cur_pro(): Observable<any> {
    return this.http.get(`/users/devPro/bid_cur_pro`, {
      headers: { Authorization: `${this.auth.getToken()}` }
    })
  }

  public rec_cur_pro(): Observable<any> {
    return this.http.get(`/users/devPro/rec_cur_pro`, {
      headers: { Authorization: `${this.auth.getToken()}` }
    })
  }

  public fix_con_pro(): Observable<any> {
    return this.http.get(`/users/devPro/fix_con_pro`, {
      headers: { Authorization: `${this.auth.getToken()}` }
    })
  }

  public bid_con_pro(): Observable<any> {
    return this.http.get(`/users/devPro/bid_con_pro`, {
      headers: { Authorization: `${this.auth.getToken()}` }
    })
  }

  public rec_con_pro(): Observable<any> {
    return this.http.get(`/users/devPro/rec_con_pro`, {
      headers: { Authorization: `${this.auth.getToken()}` }
    })
  }


  public fix_com_pro(): Observable<any> {
    return this.http.get(`/users/devPro/fix_com_pro`, {
      headers: { Authorization: `${this.auth.getToken()}` }
    })
  }

  public bid_com_pro(): Observable<any> {
    return this.http.get(`/users/devPro/bid_com_pro`, {
      headers: { Authorization: `${this.auth.getToken()}` }
    })
  }

  public rec_com_pro(): Observable<any> {
    return this.http.get(`/users/devPro/rec_com_pro`, {
      headers: { Authorization: `${this.auth.getToken()}` }
    })
  }

  public view_fix_pro(details): Observable<any> {
    return this.http.post(`/users/devPro/view_fix_pro`,details)
  }

  public view_bid_pro(details): Observable<any> {
    return this.http.post(`/users/devPro/view_bid_pro`,details)
  }

  public view_rec_pro(details): Observable<any> {
    return this.http.post(`/users/devPro/view_rec_pro`,details)
  }
  public send_rate(rateDetails){
    return this.http.post(`/users/rating/rateUser`,rateDetails)
  }

  public send_feedback(feedbackDetails){
    return this.http.post(`/users/rating/cligiveFeedback`,feedbackDetails)
  }

  public dev_send_feedback(feedbackDetails){
    return this.http.post(`/users/rating/devgiveFeedback`,feedbackDetails)
  }

}