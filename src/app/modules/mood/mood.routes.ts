import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/mood-board/mood-board.component').then(
        (m) => m.MoodBoardComponent,
      ),
  },
];
