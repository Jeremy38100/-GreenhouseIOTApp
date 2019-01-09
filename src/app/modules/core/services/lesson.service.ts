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
      sections: [
        {
          title: "La petite astuce",
          paragraph: "<p>Le test le plus connu est de toucher la terre avec le doigt. Si la terre est sèche, la plante a besoin d’eau. Par contre, si la terre est encore mouillée, attendre avant de l’arroser de nouveau.</p>"
          + "<p>Autre test, quand le pot est très léger et que la terre se décolle du contour du contenant, la plante manque d'eau.</p>"
          + "<br/>"
          + "<p>Une chose est sûre, il faut bien s'assurer qu'une plante a soif avant de l’arroser</p>"
        }
      ]
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
          + "<li>l’infiltration : Une partie de l’eau des précipitations pénètre dans la terre, formant ainsi des réserves d’eau souterraines, les nappes phréatiques.</li>"
          + "<li>le ruissellement : L’autre partie de l’eau des précipitations s’écoule en surface, alimentant ainsi les rivières, les fleuves, jusqu’aux océans.</li>"
          + "</ul>"
        }
      ]
    },
    {
      id:0x04,
      title: "La Photosynthèse",
      description : "Les soleil et les plantes",
      difficulty: 3,
      sections: [
        {
          title: "La Photosynthèse",
          paragraph: "<p>La photosynthèse est le phénomène qui caractérise tous les végétaux et leur permet d’exister et de se développer.  C’est une réaction chimique dans les cellules des feuilles (la plupart du temps) des plantes qui transforme le dioxyde de carbone ( C02 ) et l’eau (H20) en sucre en Oxygène (02). La lumière ( énergie solaire) rentre aussi dans la formule et permet la transformation.</p>"
          + "<p>Le C02 est est capté dans l’air et l’eau est fournit par la sève avec pleins d’autres minéraux. Avec ces minéraux et le sucre produit la plante va pouvoir fabriquer tous les tissus qui la constituent.</p>"
          + "<p>Les capteurs de Cultive-moi permettent de se rendre compte de ce phénomène avec les mesures sur l’oxygène et le dioxyde de carbone : tu peux les voir évoluer tout au long de la journée !</p>"
          + "<div class='imageContainer'><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Photosynth%C3%A8se_fr.svg/220px-Photosynth%C3%A8se_fr.svg.png'/></div>"
        }
      ]
    },
    {
      id:0x05,
      title: "Couleur des plantes et fruits",
      description : "Utiliser sa vue",
      difficulty: 3,
      sections: [
        {
          title: "Chlorophylle",
          paragraph: "<p>La chlorophylle est une cellule présente dans les feuilles des plantes, plus précisément dans des poches appelées chloroplastes. Elle est l’élément au centre de la réaction de la photosynthèse.</p>"
          + "<p>C’est un pigment et c’est ce qui donne aux feuilles leur couleur verte !</p>"
          + "<p>Mais ils existent d’autres pigments qui font partis du même groupe de cellule ( le type chlorophylle ), comme par exemple le carotène qui a une couleur jaune légèrement orangée !</p>"
          + "<div class='imageContainer'><img src='http://img.over-blog-kiwi.com/1/05/16/82/20150524/ob_3e91a7_5897-eau-et-chlorophylle-wallfizz.jpg'/></div>"
        },
        {
          title: "Maturation",
          paragraph: "<p>Tu as déjà pu observé que les fruits changeaient de couleur lorsqu’ils devenaient mûres. En effet, petit à petit dans ces fruits la chlorophylle disparaît petit à petit pour laisser la place à d’autres pigments. Lors de cette maturation, le changement de couleur évolue en même temps que l’attendrissement de la chair.</p>"
          + "<p>Tout cela est dépend de la température, de la lumière et du niveau d’oxygène et de gaz carbonique</p>"
          + "<p>Avec Cultive-moi tu as la possibilité de mettre en place un capteur de la couleur. Utilisé avec les bonnes catégories de végétaux, comme par exemple un plant de tomate tu pourra avoir l’information sur ton application de l’état des fruits.</p>"
          + "<div class='imageContainer'><img src='https://www.jardipartage.fr/wp-content/uploads/2013/08/quand-cueillir-les-tomates-cerises.jpg'/></div>"
        }
      ]
    },
    {
      id:0x06,
      title: "Les saisons",
      description : "Il y en a 4",
      difficulty: 2,
      sections: [
        {
          title: "Les 4 saisons",
          paragraph: "<p>Toi aussi tu as pu remarquer que la lumière sur ta plante n’était pas toujours la même tout au long de l’année ? C’est les différentes saisons qui rythment le cours de la vie. Elles proviennent de la rotation de la Terre autour du soleil ( en 365 jours) combiné à l’inclinaison de la planète : l’énergie qui provient du soleil ne se réparti pas de la même façon.</p>"
          + "<p>Les 4 saisons ont des périodes définies dans le calendrier et sont rythmées par les équinoxes et solstices</p>"
          + "<p>L’équinoxe correspond au moment où le soleil est le plus près de l’équateur : la Terre (  en prenant les pôles ) est en angle droit avec les rayons du soleil</p>"
          + "<p>Les solstices sont le moment où les rayons du soleil touchent la Terre avec l'angle le plus incliné.Il y a le solstice d'été qui représente la journée la plus longue et le solstice d'hiver la plus courte.</p>"
          + "<div class='imageContainer'><img src='https://p5.storage.canalblog.com/59/36/1074115/82171543_o.jpg'/></div>"
        }
      ]
    },
    {
      id:0x07,
      title: "Comment bien placer ma plante",
      description : "Parlons feng shui",
      difficulty: 2,
      sections: [
        {
          title: "Le placement",
          paragraph: "<p>La lumière est un facteur essentiel pour que ma plante grandisse. En effet, l’énergie ( issue de de la lumière) est \“l’étincelle\” qui déclenche la réaction de la photosynthèse.  Il faut donc accorder un soin tout particulier à l’emplacement de ma plante pour qu’elle capte le maximum de lumière possible. On appelle ça l’exposition et tu peux la visualiser grâce au capteur de luminosité.</p>"
          + "<p>Dans ton jardin, sur ton balcon ou près de la fenêtre , veille à bien donner à ta plante toute la lumière qu’elle mérite !</p>"
          + "<div class='imageContainer'><img src='https://fac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2FFAC.2Fvar.2Ffemmeactuelle.2Fstorage.2Fimages.2Fjardin.2Fplante-d-interieur.2Fplantes-et-fleurs-pour-une-maison-feng-shui-15891.2F11849741-1-fre-FR.2Fplantes-et-fleurs-pour-une-maison-feng-shui.2Ejpg/748x372/quality/90/crop-from/center/plantes-et-fleurs-pour-une-maison-feng-shui.jpeg'/></div>"
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
        },
        {
          id: 0x04,
          done: false
        },
        {
          id: 0x05,
          done: false
        },
        {
          id: 0x06,
          done: false
        },
        {
          id: 0x07,
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