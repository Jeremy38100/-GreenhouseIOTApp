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
          paragraph: '<p>Le niveau d\'humidité détermine si vous avez besoin d\'arroser votre plante ou non.\nSi le niveau d\'humidité est inférieur à 30%, il est nécessaire d\'arroser votre plante.</p>'
        },
        {
          title: 'À quelle heure ?',
          paragraph: '<p>Il n\'y a pas d\'heure précise pour arroser votre plante. Vous pouvez le faire quand vous voulez.</p>'
        }
      ]
    },
    {
      id: 0x02,
      title: 'Comment arroser sa plante ?',
      description: 'Cette leçon permet d\'apprendre comment arroser sa plante',
      difficulty: 1,
      sections: []
    },
    {
      id:0x03,
      title: "Le cycle de l'eau",
      description : "Cette leçon permet de s'initier au cycle de l'eau",
      difficulty: 2,
      sections: [
        {
          title: "Le cycle de l'eau",
          paragraph: "<p>Le cycle de l’eau est un échange continu d’eau entre la mer, l’atmosphère et la terre. L’eau passe par une série de changements d’états qui constituent les étapes du cycle de l’eau :</p>"
          + "<ul>"
          + "<li>l’évaporation : sous l’effet de la chaleur du Soleil et du vent, l’eau des lacs, des rivières et des océans s’évapore. La vapeur d’eau s’élève dans le ciel</li>"
          + "<li>la condensation : En altitude, l’air froid fait condenser la vapeur d’eau qui se transforme en petites gouttelettes, formant ainsi les nuages.</li>"
          + "<li>les précipitations : Lorsque les gouttelettes des nuages deviennent trop lourdes, elles tombent sous forme de pluie, de neige ou de grêle.</li>"
          + "<li>l’infiltration : Une partie de l’eau des précipitations pénètre dans la terre, formant ainsi des réserves d’eau souterraines, les nappes phréatiques.<li>"
          + "<li>le ruissellement : L’autre partie de l’eau des précipitations s’écoule en surface, alimentant ainsi les rivières, les fleuves, jusqu’aux océans.</li>"
          + "</ul>"
        }
      ]
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
        },
        {
          id: 0x03,
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