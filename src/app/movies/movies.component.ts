import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { RateDialogComponent } from './components/rate-dialog/rate-dialog.component';
import { MovieLocalRepository } from 'src/repositories';
import { Movie } from 'src/domain';

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
    private moviesService: MovieLocalRepository,
    private dialog: MatDialog
  ) {}

  async ngOnInit() {
    this.movies  = await this.moviesService.getAll('1', this.filter);
  }

  preview(id: number) {
    const selectedMovie = this.movies.find((m) => m.id === id);
    this.dialog
      .open(DialogComponent, {
        minWidth: '300px',
        data: { movie: selectedMovie },
      })
      .afterClosed()
      .subscribe(async () => {
        this.movies = await this.moviesService.getAll('1', this.filter);
      });
  }

  rate(id: number) {
    const selectedMovie = this.movies.find((m) => m.id === id);
    this.dialog
      .open(RateDialogComponent, {
        minWidth: '300px',
        data: { movie: selectedMovie },
      })
      .afterClosed()
      .subscribe(async () => {
        this.movies = await this.moviesService.getAll('1', this.filter);
      });
  }

  async delete(id: number) {
    await this.moviesService.delete(id.toString());
    this.movies = await this.moviesService.getAll('1', this.filter);
  }

  add() {
    this.preview(0);
  }

  async onSearchChange(e: Event) {
    this.filter.title = (e.target as HTMLInputElement).value;
    this.movies = await this.moviesService.getAll('1', this.filter);
  }

  async onYearChange(e: Event) {
    this.filter.year = +(e.target as HTMLInputElement).value;
    this.movies = await this.moviesService.getAll('1', this.filter);
  }

  async onRateChange(e: Event) {
    this.filter.rate = +(e.target as HTMLInputElement).value;
    this.movies = await this.moviesService.getAll('1', this.filter);
  }
}