import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LessonPage } from '../lesson/lesson';

import { Lesson, LessonStatus } from '../../model';

import { AppService } from '../../services/app.service';

@Component({
  selector: 'lessons',
  templateUrl: 'lessons.html'
})
export class LessonsPage {

  public refreshing: boolean = false;
  public debug: boolean;
  public lessons: Lesson[];
  public lessonsStatus: LessonStatus[];
  public score: number = 0;
  public math = Math;

  constructor(
    public navCtrl: NavController, 
    private appService: AppService
  ) { }

  ionViewWillEnter = () => {
    this.score = 0;
    this.lessons = this.appService.getLessons();
    this.lessons.sort((lesson1, lesson2) => {
      return lesson1.difficulty - lesson2.difficulty;
    });
    this.lessonsStatus = this.appService.getLessonsStatus();
    this.lessonsStatus.forEach(lessonStatus => {
      if (lessonStatus.done) {
        this.score++;
      }
    });
  }
  
  open = (lesson: Lesson) => {
    this.navCtrl.push(LessonPage, {lesson: lesson, lessonStatus: this.getStatusByLesson(lesson)});
  }

  getStatusByLesson = (lesson: Lesson): boolean => {
    return this.lessonsStatus.filter(lessonStatus => lesson.id === lessonStatus.id)[0].done;
  }

}
