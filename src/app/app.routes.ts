import { Routes } from '@angular/router';
import { ActorsComponent } from './actors/actors.component';
import { MoviesComponent } from "./movies/movies.component";

export const routes: Routes = [
  { path: 'actors', component: ActorsComponent },
  { path: 'movies', component: MoviesComponent },
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
];
