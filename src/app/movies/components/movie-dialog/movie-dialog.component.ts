import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActorDto, MovieDto } from 'src/domain';
import { DialogComponent } from '../../../components';
import { CreateMovieCmd, DeleteMovieCmd, EditMovieCmd, GetActorsCollectionQry } from '../../../../application';
import { MoviesStoreService } from '../../../services';

export interface DialogData {
  movie: MovieDto;
}

@Component({
  selector: 'app-movie-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, DialogComponent],
  templateUrl: './movie-dialog.component.html',
  styleUrls: ['./movie-dialog.component.scss'],
})
export class MovieDialogComponent {
  public actors: ActorDto[] = [];
  public isEdit: boolean = false;
  public submitted: boolean = false;
  public formGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    year: new FormControl(1900, [Validators.required]),
    actors: new FormControl([] as string[], []),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private createMovieCmd: CreateMovieCmd,
    private editMovieCmd: EditMovieCmd,
    private getActorsCollectionQry: GetActorsCollectionQry,
    private deleteMovieCmd: DeleteMovieCmd,
    private moviesStoreService: MoviesStoreService,
    private dialogRef: MatDialogRef<MovieDialogComponent>
  ) {
    this.formGroup.patchValue({ ...this.data.movie });
  }

  async ngOnInit() {
    this.actors = await this.getActorsCollectionQry.execute('1');
    this.isEdit = !!this.data.movie?.id;
  }

  async submit() {
    this.submitted = true;
    this.formGroup.markAllAsTouched();
    if (!this.formGroup.valid) {
      return;
    }
    if (this.isEdit) {
      const updatedMovie = await this.editMovieCmd.execute(
        this.data.movie.id,
        this.formGroup.value as Partial<MovieDto>
      );
      this.moviesStoreService.editMovie(this.data.movie.id,updatedMovie)
    } else {
      const newMovie = await this.createMovieCmd.execute(this.formGroup.value as Partial<MovieDto>);
      this.moviesStoreService.addMovie(newMovie);
    }
    this.dialogRef.close();
  }

  async delete() {
    await this.deleteMovieCmd.execute(this.data.movie.id);
    this.moviesStoreService.deleteMovie(this.data.movie.id);
    this.dialogRef.close();
  }
}
