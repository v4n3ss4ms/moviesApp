import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MovieDialogComponent } from './components';
import { RateDialogComponent } from './components';
import { Movie } from 'src/domain';
import { DeleteMovieCmd, GetMoviesCollectionQry } from '../../application';

@Component({
  selector: 'app-movies',
  standalone: true,
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent {
  movies: Movie[] = [];
  filter: { title?: string; year?: number; rate?: number } = {};

  constructor(
    private geMoviesCollectionQry: GetMoviesCollectionQry,
    private deleteMovieCmd: DeleteMovieCmd,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.geMoviesCollectionQry.execute('1', this.filter).subscribe(movies => {
      this.movies = movies;
    });
  }

  preview(id: string) {
    const selectedMovie = this.movies.find((m) => m.id === id);
    this.dialog
      .open(MovieDialogComponent, {
        minWidth: '300px',
        data: { movie: selectedMovie },
      })
      .afterClosed()
      .subscribe(() => {
        this.geMoviesCollectionQry.execute('1', this.filter).subscribe(movies => {
          this.movies = movies;
        });
      });
  }

  rate(id: string) {
    const selectedMovie = this.movies.find((m) => m.id === id);
    this.dialog
      .open(RateDialogComponent, {
        minWidth: '300px',
        data: { movie: selectedMovie },
      })
      .afterClosed()
      .subscribe(() => {
        this.geMoviesCollectionQry.execute('1', this.filter).subscribe(movies => {
          this.movies = movies;
        });
      });
  }

  delete(id: string) {
    this.deleteMovieCmd.execute(id);
    this.geMoviesCollectionQry.execute('1', this.filter).subscribe(movies => {
      this.movies = movies;
    });
  }

  add() {
    this.preview('0');
  }

  onTitleChange(e: Event) {
    this.filter.title = (e.target as HTMLInputElement).value;
    this.geMoviesCollectionQry.execute('1', this.filter).subscribe(movies => {
      this.movies = movies;
    });
  }

  onYearChange(e: Event) {
    this.filter.year = +(e.target as HTMLInputElement).value;
    this.geMoviesCollectionQry.execute('1', this.filter).subscribe(movies => {
      this.movies = movies;
    });
  }

  onRateChange(e: Event) {
    this.filter.rate = +(e.target as HTMLInputElement).value;
    this.geMoviesCollectionQry.execute('1', this.filter).subscribe(movies => {
      this.movies = movies;
    });
  }
}
