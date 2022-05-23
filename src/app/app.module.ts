import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MessagesErrorComponent } from './components/form/messages-error/messages-error.component';
import { HttpClientModule } from '@angular/common/http';
import { PanelModule } from 'primeng/panel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuModule } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { ImageModule } from 'primeng/image';
import { AvatarModule } from 'primeng/avatar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {InputNumberModule} from 'primeng/inputnumber';
import {ConfirmationService, MessageService} from 'primeng/api';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import {InputMaskModule} from 'primeng/inputmask';
import { CheckboxModule } from 'primeng/checkbox';
import {FileUploadModule} from 'primeng/fileupload';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from '../environments/environment';

import { LogoutComponent } from './components/auth/logout/logout.component';
import { SpinnerComponent } from './components/util/spinner/spinner.component';
import { HeaderComponent } from './components/portfolio/header/header.component';
import { AboutComponent } from './components/portfolio/about/about.component';
import { ExperienceComponent } from './components/portfolio/experience/experience.component';
import { EducationComponent } from './components/portfolio/education/education.component';
import { SkillsComponent } from './components/portfolio/skills/skills.component';
import { ProjectsComponent } from './components/portfolio/projects/projects.component';
import { LoginComponent } from './components/auth/modal/login/login.component';
import { ModalProjectComponent } from './components/portfolio/modal/modal-project/modal-project.component';
import { ModalSkillComponent } from './components/portfolio/modal/modal-skill/modal-skill.component';
import { ModalItemComponent } from './components/portfolio/modal/modal-item/modal-item.component';
import { ModalEducationComponent } from './components/portfolio/modal/modal-education/modal-education.component';
import { ModalExperienceComponent } from './components/portfolio/modal/modal-experience/modal-experience.component';
import { IconEditDeleteComponent } from './components/portfolio/icon-edit-delete/icon-edit-delete.component';
import { ModalAboutComponent } from './components/portfolio/modal/modal-about/modal-about.component';
import { IconEditComponent } from './components/portfolio/icon-edit/icon-edit.component';
import { IconAddComponent } from './components/portfolio/icon-add/icon-add.component';
import { ModalDataComponent } from './components/portfolio/modal/modal-data/modal-data.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PortfolioComponent,
    MessagesErrorComponent,
    LogoutComponent,
    SpinnerComponent,
    HeaderComponent,
    AboutComponent,
    ExperienceComponent,
    EducationComponent,
    SkillsComponent,
    ProjectsComponent,
    ModalProjectComponent,
    ModalSkillComponent,
    ModalItemComponent,
    ModalEducationComponent,
    ModalExperienceComponent,
    IconEditDeleteComponent,
    ModalAboutComponent,
    IconEditComponent,
    IconAddComponent,
    ModalDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ProgressSpinnerModule,
    PanelModule,
    BrowserAnimationsModule,
    MenuModule,
    DialogModule,
    ToastModule,
    RippleModule,
    ImageModule,
    AvatarModule,
    ProgressBarModule,
    InputTextareaModule,
    ConfirmDialogModule,
    InputNumberModule,
    DynamicDialogModule,
    InputMaskModule,
    CheckboxModule,
    FileUploadModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  providers: [ConfirmationService, MessageService, DialogService, DynamicDialogRef],
  bootstrap: [AppComponent]
})
export class AppModule { }
