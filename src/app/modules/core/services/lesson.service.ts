import { Injectable } from '@angular/core';

import { Lesson, LessonStatus } from '../model';

import { StorageService } from './storage.service';

@Injectable()
export class LessonService {

  private lessons : Lesson[] = [
    {
      id: 0x01,
      title: 'Quand arroser sa plante ?',
      description: 'Cette leçon permet d\'apprendre quel est le meilleur moment pour arroser sa plante',
      difficulty: 1,
      sections: [
        {
          title: 'Niveau d\'humidité',
          paragraph: 'Le niveau d\'humidité détermine si vous avez besoin d\'arroser votre plante ou non.\nSi le niveau d\'humidité est inférieur à 30%, il est nécessaire d\'arroser votre plante.'
        },
        {
          title: 'À quelle heure ?',
          paragraph: 'Il n\'y a pas d\'heure précise pour arroser votre plante. Vous pouvez le faire quand vous voulez.'
        }
      ]
    },
    {
      id: 0x02,
      title: 'Comment arroser sa plante ?',
      description: 'Cette leçon permet d\'apprendre comment arroser sa plante',
      difficulty: 1,
      sections: []
    }
  ];

  constructor(
    private storageService: StorageService
  ) { }


  /**
   * Get all lessons
   * @return {Lesson[]} The lesson
   */
  getLessons = (): Lesson[] => {
    return this.lessons;
  }

	/**
	 * Get the lessons status
	 * @return {LessonStatus[]} The lessons status
	 */
  getLessonsStatus = (): LessonStatus[] => {
    let lessonsStatus = this.storageService.get('lessonsStatus');
    if (lessonsStatus) return lessonsStatus.map(lessonStatus => <LessonStatus>lessonStatus);
    else {
      let newLessonsStatus = [
        {
          id: 0x01,
          done: false
        },
        {
          id: 0x02,
          done: false
        }
      ];
      this.saveLessonsStatus(newLessonsStatus);
      return newLessonsStatus;
    }
  }

  /**
   * Toggle the lesson status
   * @param {number} id The lesson id
   * @return {void}
   */
  toggleLessonStatus = (id: number, force?: boolean): void => {
    let lessonsStatus = this.getLessonsStatus();
    lessonsStatus.forEach(lessonStatus => {
      if (lessonStatus.id === id) {
        if (force || force === false) {
          lessonStatus.done = force;
        } else {
          lessonStatus.done = !lessonStatus.done;
        }
      }
    });
    return this.saveLessonsStatus(lessonsStatus);
  }

  /**
	 * Save lessons status in storage
	 * @param {LessonStatus[]} lessonsStatus The lessons status to save
	 * @return {void}
   */
  saveLessonsStatus = (lessonsStatus: LessonStatus[]): void => {
    return this.storageService.set('lessonsStatus', lessonsStatus);
  }

}