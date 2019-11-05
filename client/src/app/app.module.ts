import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import { CKEditorModule } from 'ckeditor4-angular';
// import { PdfViewerModule } from 'ng2-pdf-viewer';


import { AppComponent } from './app.component'
import { LoginComponent } from './user/login/login.component'
import { CliRegisterComponent } from './user/cli-register/cli-register.component'
import { DevRegisterComponent } from './user/dev-register/dev-register.component'
import { SkillComponent } from './user/skill/skill.component'
import { AuthenticationService } from './user/authentication.service'
import { AuthGuardService } from './user/auth-guard.service'
import { AddProjectComponent } from './project/add-project/add-project.component';
import { CliAppbarComponent } from './user/cli-appbar/cli-appbar.component';
import { DevAppbarComponent } from './user/dev-appbar/dev-appbar.component';
import { CliProfileComponent } from './user/cli-profile/cli-profile.component';
import { DevProfileComponent } from './user/dev-profile/dev-profile.component';
import { UserTypeComponent } from './user/user-type/user-type.component';
import { EditSkillComponent } from './user/edit-skill/edit-skill.component';
import { ProjectHomeComponent } from './project/project-home/project-home.component';
import { AuthProjectService } from './project/auth-project.service';
import { ViewProjectComponent } from './project/view-project/view-project.component';
import { AddBidComponent } from './project/add-bid/add-bid.component';
import { DevEditProfileComponent } from './user/dev-edit-profile/dev-edit-profile.component';
import { CliEditProfileComponent } from './user/cli-edit-profile/cli-edit-profile.component';
import { DevHomeComponent } from './home/dev-home/dev-home.component';
import { CliHomeComponent } from './home/cli-home/cli-home.component';
import { AuthHomeService } from './home/auth-home.service';
import { DevViewProjectComponent } from './home/dev-view-project/dev-view-project.component';
import { DevCompetitionComponent } from './competition/dev-competition/dev-competition.component';
import { CliViewDevComponent } from './home/cli-view-dev/cli-view-dev.component';
import { CliNotificationComponent } from './notification/cli-notification/cli-notification.component';
import { DevNotificationComponent } from './notification/dev-notification/dev-notification.component';
import { AuthNotificationService } from './notification/auth-notification.service';
import { ViewBidRequestComponent } from './notification/view-bid-request/view-bid-request.component';
import { ViewClientRequestComponent } from './notification/view-client-request/view-client-request.component';
import { ViewDevRequestComponent } from './notification/view-dev-request/view-dev-request.component';
import { ConfirmedProjectComponent } from './confirm-pro/confirmed-project/confirmed-project.component';
import { AuthConfProService } from './confirm-pro/auth-conf-pro.service';
import { ViewDevAcceptComponent } from './notification/view-dev-accept/view-dev-accept.component';
import { AddCompetitionComponent } from './competition/add-competition/add-competition.component';
import { AuthCompetitonService } from './competition/auth-competiton.service'
import { AdminComponent } from './admin/admin.component'
import { BanedUsersComponent } from './admin/baned-users/baned-users.component'
import { AddAdsComponent } from './admin/add-ads/add-ads.component'
import { AuthAdminService } from './admin/auth-admin.service';
import { ViewAccBidComponent } from './notification/view-acc-bid/view-acc-bid.component';
import { ViewAccProComponent } from './notification/view-acc-pro/view-acc-pro.component';
import { ProfileImageComponent } from './user/profile-image/profile-image.component';
import { VerifyEmailComponent } from './user/verify-email/verify-email.component';
import { StartPageComponent } from './pages/start-page/start-page.component';
import { CliCatagoryComponent } from './pages/cli-catagory/cli-catagory.component';
import { DevCatagoryComponent } from './pages/dev-catagory/dev-catagory.component';
import { AdminCatagoryComponent } from './pages/admin-catagory/admin-catagory.component';
import { DevProjectComponent } from './project/dev-project/dev-project.component';
import { FooterComponent } from './user/footer/footer.component'
import { ChatComponent } from './Chatt/chat/chat.component'
import { ChatInterfaceComponent } from './Chatt/chat-interface/chat-interface.component';
import { DevViewMyProjectComponent } from './project/dev-view-my-project/dev-view-my-project.component';
import { VerifyMsgComponent } from './user/verify-msg/verify-msg.component';
import { VerifyForgotpwdComponent } from './user/verify-forgotpwd/verify-forgotpwd.component';
import { EnterNewPasswordComponent } from './user/enter-new-password/enter-new-password.component';
import { VerifyNewEmailComponent } from './user/verify-new-email/verify-new-email.component';
import { CliViewNotificationComponent } from './notification/cli-view-notification/cli-view-notification.component'
import { CliAllComponent } from './home/cli-all/cli-all.component';
import { DevAllComponent } from './home/dev-all/dev-all.component';

import { VeiwAllDevComponent } from './home/veiw-all-dev/veiw-all-dev.component'
import { ViewMoreProjectComponent } from './home/view-more-project/view-more-project.component';
import { DevViewNotificationComponent } from './notification/dev-view-notification/dev-view-notification.component';
import { AdminDevProComponent } from './admin/admin-dev-pro/admin-dev-pro.component';




const routes: Routes = [

  {path: '' ,redirectTo:'/home/login',pathMatch:'full'},
  {path: 'home/:type' , component: StartPageComponent},
  {path: 'cliCatagory/:type' , component: CliCatagoryComponent},
  {path: 'devCatagory/:type' , component: DevCatagoryComponent},
  {path: 'adminCatagory/:type' , component: AdminCatagoryComponent},
  {path: 'verify', component: VerifyEmailComponent },
  {path: 'pleaseVerify', component: VerifyMsgComponent },
  {path: 'verifyPwd', component: VerifyForgotpwdComponent },
  {path: 'verifyNewEmail', component: VerifyNewEmailComponent },
  // {path: 'changePwd', component: EnterNewPasswordComponent},
  // { path: 'dev_profile', component: DevProfileComponent, canActivate: [AuthGuardService]},
  // { path: 'cli_profile', component: CliProfileComponent, canActivate: [AuthGuardService]},
  // { path: 'admin', component: AdminComponent, canActivate: [AuthGuardService]},
  // { path: 'project' , component: ProjectHomeComponent },
  // { path: 'project/addProject' , component: AddProjectComponent },
  // { path: 'project/viewProject' , component: ViewProjectComponent },
  // { path: 'project/startBid' , component: AddBidComponent },
  // { path: 'dev_home' , component: DevHomeComponent },
  // { path: 'cli_home' , component: CliHomeComponent },
  // { path: 'dev_home/viewProject' , component: DevViewProjectComponent },
  // { path: 'dev_competition' , component: AddCompetitionComponent },
  // { path: 'cli_home/viewDeveloper' , component: CliViewDevComponent },
  // { path: 'dev_home/notification' , component: DevNotificationComponent },
  // { path: 'cli_home/notification' , component: CliNotificationComponent },
  // { path: 'cli_home/notification/bidRequest' , component: ViewBidRequestComponent },
  // { path: 'cli_home/notification/projectRequest' , component: ViewDevRequestComponent },
  // { path: 'dev_home/notification/clientRequest' , component: ViewClientRequestComponent },
  // { path: 'confirmed_project' , component: ConfirmedProjectComponent },
  // { path: 'cli_home/notification/devAccept' , component: ViewDevAcceptComponent },
  // { path: 'dev_home/notification/acceptedBidReq' , component: ViewAccBidComponent },
  // { path: 'dev_home/notification/acceptedProReq' , component: ViewAccProComponent },
  // { path: 'admin/baned_users', component: BanedUsersComponent},
  // { path: 'admin/add_ads', component: AddAdsComponent},
    ]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CliRegisterComponent,
    DevRegisterComponent,
    SkillComponent,
    AddProjectComponent,
    CliAppbarComponent,
    DevAppbarComponent,
    CliProfileComponent,
    DevProfileComponent,
    UserTypeComponent,
    EditSkillComponent,
    ProjectHomeComponent,
    ViewProjectComponent,
    AddBidComponent,
    DevEditProfileComponent,
    CliEditProfileComponent,
    DevHomeComponent,
    CliHomeComponent,
    DevViewProjectComponent,
    DevCompetitionComponent,
    CliViewDevComponent,
    CliNotificationComponent,
    DevNotificationComponent,
    ViewBidRequestComponent,
    ViewClientRequestComponent,
    ViewDevRequestComponent,
    ConfirmedProjectComponent,
    ViewDevAcceptComponent,
    AddCompetitionComponent,
    AdminComponent,
    BanedUsersComponent,
    AddAdsComponent,
    ViewAccBidComponent,
    ViewAccProComponent,
    ProfileImageComponent,
    VerifyEmailComponent,
    StartPageComponent,
    CliCatagoryComponent,
    DevCatagoryComponent,
    AdminCatagoryComponent,
    DevProjectComponent,
    ChatComponent,
    ChatInterfaceComponent,
    FooterComponent,
    DevViewMyProjectComponent,
    VerifyMsgComponent,
    VerifyForgotpwdComponent,
    EnterNewPasswordComponent,
    VerifyNewEmailComponent,
    CliViewNotificationComponent,
    CliAllComponent,
    DevAllComponent,
    
    VeiwAllDevComponent,
    ViewMoreProjectComponent,
    DevViewNotificationComponent,
    AdminDevProComponent,
   
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    CKEditorModule,
    // PdfViewerModule
  ],
  exports: [RouterModule],
  providers: [
    AuthenticationService,
    AuthGuardService,
    AuthProjectService,
    AuthHomeService, 
    AuthNotificationService,
    AuthConfProService,
    AuthCompetitonService,
    AuthAdminService,
    ProjectHomeComponent


  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
