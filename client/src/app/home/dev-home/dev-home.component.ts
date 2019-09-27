import { Component, OnInit } from '@angular/core';
import { AuthHomeService } from '../auth-home.service'
import { ProjectDetails } from '../../project/auth-project.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-dev-home',
  templateUrl: './dev-home.component.html',
  styleUrls: ['./dev-home.component.css']
})
export class DevHomeComponent implements OnInit {

  constructor(private authHome: AuthHomeService,private router: Router,) { }

  designProject: ProjectDetails
  webProject: ProjectDetails
  writingProject: ProjectDetails
  dataProject: ProjectDetails
  otherProject: ProjectDetails


  HEROES = [
    {id: 1, name:'Superman'},
    {id: 2, name:'Batman'},
    {id: 5, name:'BatGirl'},
    {id: 3, name:'Robin'},
    {id: 4, name:'Flash'},
    {id: 6, name:'Flash'},
    {id: 7, name:'Flash'},
    {id: 2, name:'Batman'},
    {id: 5, name:'BatGirl'},
    {id: 3, name:'Robin'},
    {id: 4, name:'Flash'}
  ]

  ngOnInit() {
      this.authHome.webProject().subscribe(
        project=>{
            this.webProject = project
        },
        err => {
          console.error(err)
        }
      )

      this.authHome.designProject().subscribe(
        project=>{
            this.designProject = project
            
        },
        err => {
          console.error(err)
        }
      )

      this.authHome.writingProject().subscribe(
        project=>{
            this.writingProject = project
        },
        err => {
          console.error(err)
        }
      )

      this.authHome.dataProject().subscribe(
        project=>{
            this.dataProject = project
        },
        err => {
          console.error(err)
        }
      )

      this.authHome.otherProject().subscribe(
        project=>{
            this.otherProject = project
        },
        err => {
          console.error(err)
        }
      )
  }


  viewProject(projectID:number,clientID:number){
    this.router.navigate(['/dev_home/viewProject'], { queryParams: { pro_id: projectID,cli_id: clientID } })
  }

}
