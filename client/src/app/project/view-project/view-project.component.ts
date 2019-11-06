import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthProjectService, ProjectPayload, ProjectDetails, BidPayload, BidDetails, ConfirmedPro } from '../auth-project.service'
import { AuthenticationService } from '../../user/authentication.service';
import { ProjectHomeComponent } from '../../project/project-home/project-home.component'

declare let paypal: any;

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {

  pro_id: number;
  projects: ProjectDetails;
  bids: BidDetails
  marked1 = true
  marked2 = false
  marked3 = false
  marked4 = false

  rateSelect = false
  rateValue = 0

  credentials: ProjectPayload = {
    id: 0,
    client_ID: 0,
    project_name: '',
    project_category: '',
    project_description: '',
    payment: ''
  }

  credential: BidPayload = {
    id: 0,
    project_ID: 0,
    maximum_value: '',
    start_date: ''

  }

  confirmedPro: ConfirmedPro = {
    id: 0,
    developer_ID: 0,
    client_ID: 0,
    project_ID: 0,
    category: '',
    isCompleted: false
  }

  projectRequest;
  bidRequest;
  requestDeveloper;
  pdfSrc: string

    
  acceptance = {
    id:0,
    first_name:'',
    last_name:''
  }
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

  set1 = true

  catagory=['Web development','Mobile development','Data science',
  'Software development','Block chain','Machine learning','Natural language processing',
  'Digital marketing','Multimedia designing','Robotics']

  constructor(
    private router: Router,
    private authpro: AuthProjectService,
    private route: ActivatedRoute,
    private auth: AuthenticationService,
    private proHome: ProjectHomeComponent
  ) { }

  ngOnInit() {
    if (window.localStorage.getItem('usertoken')) {

      // this.route.queryParams.subscribe(params => {
      //   this.pro_id = params['pro_id'];
      //   this.credentials.id = this.pro_id
      //   this.credential.project_ID = this.pro_id
      // })

      this.credentials.id = this.proHome.projectDetails.project_ID
      this.credential.project_ID = this.proHome.projectDetails.project_ID


      this.authpro.viewProject(this.credentials).subscribe(
        project => {
          this.projects = project
          this.credentials.project_name = this.projects.project_name
          this.credentials.project_category = this.projects.project_category
          this.credentials.project_description = this.projects.project_description
          //this.pdfSrc = "http://localhost:3000/".concat(project.attachment)
          this.pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf"

          if (this.projects.payment == '') {
            this.marked4 = true
            this.marked3 = false
            this.authpro.viewBid(this.credential).subscribe(
              bid => {
                this.bids = bid
                this.credential.maximum_value = this.bids.maximum_value
                this.credential.start_date = this.bids.start_date
              }
            )

            this.authpro.viewBidRequest(this.credentials).subscribe(
              result => {
                this.bidRequest = result
              }
            )

          } else {
            this.marked3 = true
            this.marked4 = false
            this.credentials.payment = this.projects.payment

            this.authpro.viewProjectRequest(this.credentials).subscribe(
              result => {
                this.projectRequest = result
              }
            )
          }


          this.authpro.viewRequestDeveloper(this.credentials).subscribe(
            result => {
              this.requestDeveloper = result
            }
          )




        },
        err => {
          console.error(err)
        }
      )

    } else {
      this.router.navigateByUrl('/');
    }
  }

  onClick() {

    this.authpro.viewProject(this.credentials).subscribe(
      project => {
        if (project.isShowed == true) {
          this.marked1 = false
          this.marked2 = true
        } else {
          window.alert("You can not edit any accepeted project")
        }
      })
  }


  EditProject() {


    this.authpro.editProject(this.credentials).subscribe(
      result => {
        this.ngOnInit()
      },
      err => {
        console.error(err);
      }
    )

    if (this.credentials.payment == '') {
      this.authpro.editBid(this.credential).subscribe(
        result => {
          this.ngOnInit()
        },
        err => {
          console.error(err);
        }
      )
    }
    this.marked1 = true
    this.marked2 = false
  }

  CancleEditProject() {
    this.marked1 = true
    this.marked2 = false
  }


  deleteProject() {

    this.authpro.viewProject(this.credentials).subscribe(
      project => {
          if (window.confirm('Do you want to delete the project')) {
            this.authpro.deleteProject(this.credentials).subscribe(

            )
           window.location.reload()
          }
      })
  }


  AcceptProReq(dev_ID: number, category: string) {

    if(window.confirm('Do you want to accept the request?')){
    this.confirmedPro.developer_ID = dev_ID
    this.confirmedPro.client_ID = this.auth.getUserDetails().id
    this.confirmedPro.project_ID = this.credentials.id
    this.confirmedPro.category = category

    this.authpro.ConfirmedProject(this.confirmedPro).subscribe(
      () => {
        window.location.reload()
      }
    )
    }

  }

  AcceptBidReq(dev_ID: number, category: string) {
    if(window.confirm('Do you want to accept the Bid?')){
    this.confirmedPro.developer_ID = dev_ID
    this.confirmedPro.client_ID = this.auth.getUserDetails().id
    this.confirmedPro.project_ID = this.credentials.id
    this.confirmedPro.category = category

    this.authpro.ConfirmedProject(this.confirmedPro).subscribe(
      () => {
        window.location.reload()
      }
    )
    }

  }


  backToProject() {
    this.proHome.wholeMarked = true
  }


  valueAssign(id,first_name,last_name){
    this.acceptance.id=id
    this.acceptance.first_name = first_name
    this.acceptance.last_name = last_name
  }


  addScript: boolean = false;
  paypalLoad: boolean = true;
  
  finalAmount: number = 1;
 
  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'Af8Sy1dWqC2jpYFk15zomB6IXHSqwOTf5en_Q2vSJfATs_uiTIfBw6NYqAUjTnwQytHMdTzGvdoWYsrR',
      production: '<your-production-key here>'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.finalAmount, currency: 'USD' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        //Do something when payment is successful.
      })
    }
  };
 
  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        this.paypalLoad = false;
      })
    }
  }
  
  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');    
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }
  

  rate(val){
    this.rateValue=val;
  }

  sendRate(){
    console.log('rate:'+this.rateValue)
    this.rateDetails.dev_Id=this.acceptance.id
    this.rateDetails.rating = this.rateValue
    this.authpro.send_rate(this.rateDetails).subscribe((res)=>{
      console.log('rate respond:'+res);
      this.set1 = false
   })
  }


  sendFeedback(){

    this.model.developer_ID = this.acceptance.id
    this.model.client_ID = this.auth.getUserDetails().id
    this.model.project_ID =this.proHome.projectDetails.project_ID

    this.authpro.send_feedback(this.model).subscribe(
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
