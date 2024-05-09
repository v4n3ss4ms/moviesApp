import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MovieDialogComponent } from './components';
import { RateDialogComponent } from './components';
import { DeleteMovieCmd, GetMoviesCollectionQry } from '../../application';
import { CommonModule } from '@angular/common';
import { MoviesStoreService } from '../services';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent {
  filter: { title?: string; year?: number; rate?: number } = {};
  movies$ = this.moviesStoreService.movies$;

  constructor(
    private getMoviesCollectionQry: GetMoviesCollectionQry,
    private deleteMovieCmd: DeleteMovieCmd,
    private moviesStoreService: MoviesStoreService,
    private dialog: MatDialog
  ) {
  }

  async ngOnInit() {
    await this.getMoviesCollection();
  }

  async getMoviesCollection() {
    const movies = await this.getMoviesCollectionQry.execute('1', this.filter);
    this.moviesStoreService.setMovies(movies);
  }

  preview(id: string) {
    const selectedMovie = this.moviesStoreService.getMovies().find((m) => m.id === id);
    this.dialog
      .open(MovieDialogComponent, {
        minWidth: '300px',
        data: { movie: selectedMovie },
      })
      .afterClosed()
      .subscribe(async () => {
        await this.getMoviesCollection();
      });
  }

  rate(id: string) {
    const selectedMovie = this.moviesStoreService.getMovies().find((m) => m.id === id);
    this.dialog
      .open(RateDialogComponent, {
        minWidth: '300px',
        data: { movie: selectedMovie },
      })
      .afterClosed()
      .subscribe(async () => {
        await this.getMoviesCollection();
      });
  }

  async delete(id: string) {
    await this.deleteMovieCmd.execute(id);
    this.moviesStoreService.deleteMovie(id);
  }

  add() {
    this.preview('0');
  }

  async onTitleChange(e: Event) {
    this.filter.title = (e.target as HTMLInputElement).value;
    await this.getMoviesCollection();
  }

  async onYearChange(e: Event) {
    this.filter.year = +(e.target as HTMLInputElement).value;
    await this.getMoviesCollection();
  }

  async onRateChange(e: Event) {
    this.filter.rate = +(e.target as HTMLInputElement).value;
    await this.getMoviesCollection();
  }
}
