import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {WebcamModule} from 'ngx-webcam';
// import { AppService } from './app.service'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CameraComponent } from './camera/camera.component'

@NgModule({
  declarations: [
    AppComponent,
    CameraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WebcamModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
