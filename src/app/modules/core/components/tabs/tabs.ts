import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { StatsPage } from '../stats/stats';
import { SettingsPage } from '../settings/settings';
import { LessonsPage } from './../lessons/lessons';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  homePage = HomePage;
  statsPage = StatsPage;
  settingsPage = SettingsPage;
  lessonsPage = LessonsPage;

  constructor() {

  }
}
