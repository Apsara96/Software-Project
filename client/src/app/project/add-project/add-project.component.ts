import { Component, OnInit } from '@angular/core';
import { AuthProjectService, ProjectPayload, BidPayload } from '../auth-project.service'
import { Router } from '@angular/router';
import { AuthenticationService, UserDetails } from 'src/app/user/authentication.service';
import { ReplaySubject } from 'rxjs';
import { ProjectHomeComponent } from '../project-home/project-home.component';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  marked1 = false
  marked2 = false
  marked3 = false

  catagory=['Web development','Mobile development','Data science',
'Software development','Block chain','Machine learning','Natural language processing',
'Digital marketing','Multimedia designing','Robotics']

  constructor(
    private authPro: AuthProjectService,
    private router: Router,
    private auth: AuthenticationService,
    private proHome: ProjectHomeComponent
  ) { }

  details: UserDetails
  project_details: ProjectPayload
  bid_details: BidPayload
  attach: File = null
  load=false
  ngOnInit() {
  }

  credentials: ProjectPayload = {
    id: 0,
    client_ID: 0,
    project_name: '',
    project_category: 'Other',
    project_description: '',
    payment: ''

  }

  credential: BidPayload = {
    id: 0,
    project_ID: 0,
    maximum_value: '',
    start_date: ''

  }

  onFileSelected(event) {
    this.attach = <File>event.target.files[0]
  }

  AddProject() {

    this.credentials.client_ID = this.auth.getUserDetails().id




    if (this.attach != null) {
      const fd = new FormData()
      fd.append('attachment', this.attach, this.attach.name)

      this.authPro.uploadAttachment(fd).subscribe(
        Reply => {
          this.authPro.addProject(this.credentials).subscribe(
            project => {
              this.project_details = project

              if (project.project.payment == '') {

                this.credential.project_ID = project.project.id
                this.authPro.addBid(this.credential).subscribe(
                  bid => {
                    this.bid_details = bid
                    window.location.reload()
                  }
                )
              } else {
                window.location.reload()
              }

            },
            err => {
              console.error(err)
            }
          )
        }
      )
    } else {

      this.authPro.addProject(this.credentials).subscribe(
        project => {
          this.project_details = project

          if (project.project.payment == '') {

            this.credential.project_ID = project.project.id
            
            this.authPro.addBid(this.credential).subscribe(
              bid => {
                this.bid_details = bid
                window.location.reload()
              }
            )
          } else {
            window.location.reload()
          }

        },
        err => {
          console.error(err)
        }
      )

    }



  }


  fixedPrice() {
    this.marked1 = true
    this.marked2 = false
    this.marked3 = true
  }

  startBid() {
    this.marked1 = false
    this.marked2 = true
    this.marked3 = true
  }

  backToProject() {
    this.proHome.marked = true
  }

  loadSpin(){
    this.load=true
  } 
}
