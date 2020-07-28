import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {WebcamModule} from 'ngx-webcam';
// import { AppService } from './app.service'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CameraComponent } from './camera/camera.component';
import { LoginComponent } from './login/login.component';
import { AppService } from './app.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CameraComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    WebcamModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
