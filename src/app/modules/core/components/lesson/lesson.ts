import { Component } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

import { Lesson, LessonStatus } from '../../model';

import { AppService } from '../../services/app.service';

@Component({
  selector: 'lesson',
  templateUrl: 'lesson.html'
})
export class LessonPage {

  public lesson: Lesson;
  public lessonStatus: LessonStatus;

  constructor(
    public navCtrl: NavController, 
    private appService: AppService,
    private toastCtrl: ToastController,
    private navParams: NavParams
  ) { }

  ionViewWillEnter = () => {
    this.lesson = <Lesson>this.navParams.get('lesson');
    this.lessonStatus = <LessonStatus>this.navParams.get('lessonStatus');
    console.log(this.lessonStatus);
  }

  checkLesson = () => {
    this.appService.toggleLessonStatus(this.lesson.id, true);
    let toast = this.toastCtrl.create({
      message: 'Bravo !',
      duration: 3000,
      position: 'bottom'
    });
    toast.onDidDismiss(() => {
      this.navCtrl.pop();
    })
    toast.present();
  }

}