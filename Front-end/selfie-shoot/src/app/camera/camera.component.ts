import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { AppService } from '../app.service';
@Component({
    selector: 'app-camera',
    templateUrl: './camera.component.html',
    styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit {
    public imageCapture = null;
    public showWebcam = true;
    public errors: WebcamInitError[] = [];
    // webcam snapshot trigger
    private trigger: Subject<void> = new Subject<void>();

    constructor(private appService: AppService) { }

    public ngOnInit(): void {
        const self = this;
        setInterval(() => {
            self.triggerSnapshot();
        }, 30000); // Capture image every 30 seconds.
    }

    public triggerSnapshot(): void {
        this.trigger.next();
    }

    // Check if any error and push it into errors array.
    public handleInitError(error: WebcamInitError): void {
        this.errors.push(error);
    }

    public handleImage(webcamImage: WebcamImage): void {
        // console.info('received webcam image', JSON.stringify(webcamImage));
        this.imageCapture = webcamImage.imageAsDataUrl;
        const imageObj = {
            user_id: this.appService.userId,
            image: webcamImage.imageAsDataUrl
        };
        this.appService.cameraImage(imageObj).subscribe( // Subscribe for the api response.
            (data: any) => {
                console.log('Image saved into DB successfully ', JSON.stringify(data));
            }, (err: any) => {
                console.log('Error saving image into DB ', JSON.stringify(err));
            });
    }

    public get triggerObservable(): Observable<void> {
        return this.trigger.asObservable();
    }

}